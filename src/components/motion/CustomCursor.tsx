import { useEffect, useRef } from "react";
import { useCursorPreference } from "../../hooks/useCursorPreference";

/**
 * Selectors are matched with `closest()` from the pointer event target
 * (event delegation), so elements rendered after mount are handled too.
 */
const INTERACTIVE_SELECTOR =
  'a[href], button, select, summary, label[for], [role="button"], [data-cursor], input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]';
const TEXT_INPUT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable=""], [contenteditable="true"]';

/** CSS class on <html> that hides the native cursor. Always removed on cleanup. */
const ACTIVE_CLASS = "custom-cursor-active";

type CursorState = "default" | "interactive" | "card" | "text";

/**
 * CustomCursor — a small dot that tracks the pointer exactly plus a ring that
 * follows with easing. Only DOM transforms are written in a single
 * requestAnimationFrame loop that sleeps when the cursor has settled.
 *
 * The native cursor is hidden only while the custom cursor is actually visible
 * (after the first mouse move, on fine-pointer desktop, motion allowed, user
 * preference on). It is restored on leave, blur, disable and unmount.
 */
const CustomCursor = () => {
  const { enabled } = useCursorPreference();
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const html = document.documentElement;
    if (!enabled || !root || !dot || !ring) return;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isSupported = () =>
      pointerQuery.matches && desktopQuery.matches && !reducedQuery.matches;

    const target = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let visible = false;
    let state: CursorState = "default";
    let raf = 0;
    let lastTime = 0;

    const paint = () => {
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x.toFixed(2)}px, ${ringPos.y.toFixed(2)}px, 0)`;
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 1 / 60;
      lastTime = now;
      const factor = 1 - Math.exp(-dt * 14);
      ringPos.x += (target.x - ringPos.x) * factor;
      ringPos.y += (target.y - ringPos.y) * factor;

      const settled =
        Math.abs(target.x - ringPos.x) < 0.1 && Math.abs(target.y - ringPos.y) < 0.1;
      if (settled) {
        ringPos.x = target.x;
        ringPos.y = target.y;
        lastTime = 0;
      }
      paint();
      if (!settled && visible) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const setState = (next: CursorState) => {
      if (next === state) return;
      state = next;
      root.dataset.state = next;
    };

    const show = () => {
      if (visible) return;
      visible = true;
      ringPos.x = target.x;
      ringPos.y = target.y;
      paint();
      root.dataset.visible = "true";
      html.classList.add(ACTIVE_CLASS);
    };

    const hide = () => {
      visible = false;
      delete root.dataset.visible;
      delete root.dataset.pressed;
      html.classList.remove(ACTIVE_CLASS);
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      lastTime = 0;
    };

    const inspect = (eventTarget: EventTarget | null) => {
      const el = eventTarget instanceof Element ? eventTarget : null;
      if (!el) return setState("default");
      if (el.closest(TEXT_INPUT_SELECTOR)) return setState("text");
      const interactive = el.closest(INTERACTIVE_SELECTOR);
      if (!interactive) return setState("default");
      setState(interactive.getAttribute("data-cursor") === "card" ? "card" : "interactive");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !isSupported()) {
        if (visible) hide();
        return;
      }
      target.x = event.clientX;
      target.y = event.clientY;
      inspect(event.target);
      show();
      wake();
    };

    const onPointerOver = (event: PointerEvent) => {
      if (visible && event.pointerType === "mouse") inspect(event.target);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (visible && event.pointerType === "mouse") root.dataset.pressed = "true";
    };
    const onPointerUp = () => {
      delete root.dataset.pressed;
    };

    // Mouse left the browser content area.
    const onMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) hide();
    };
    const onVisibility = () => {
      if (document.hidden) hide();
    };
    const onMediaChange = () => {
      if (!isSupported()) hide();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", hide, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVisibility);
    pointerQuery.addEventListener("change", onMediaChange);
    desktopQuery.addEventListener("change", onMediaChange);
    reducedQuery.addEventListener("change", onMediaChange);

    return () => {
      hide();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", hide);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVisibility);
      pointerQuery.removeEventListener("change", onMediaChange);
      desktopQuery.removeEventListener("change", onMediaChange);
      reducedQuery.removeEventListener("change", onMediaChange);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} aria-hidden="true" className="custom-cursor" data-state="default">
      <div ref={ringRef} className="custom-cursor-pos">
        <span className="custom-cursor-ring" />
      </div>
      <div ref={dotRef} className="custom-cursor-pos">
        <span className="custom-cursor-dot" />
      </div>
    </div>
  );
};

export default CustomCursor;

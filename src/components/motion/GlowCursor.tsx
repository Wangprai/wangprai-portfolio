import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], summary, label[for], [data-cursor="interactive"]';
const TEXT_INPUT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';

const GlowCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot || typeof window === "undefined") return;

    const pointerQuery = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    const desktopQuery = window.matchMedia?.("(min-width: 768px)");
    const reducedQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const isAllowed = () =>
      Boolean(pointerQuery?.matches) &&
      Boolean(desktopQuery?.matches) &&
      !reducedQuery?.matches;

    const ringPos = { x: -120, y: -120 };
    const target = { x: -120, y: -120 };
    let ringScale = 1;
    let targetRingScale = 1;
    let dotScale = 1;
    let targetDotScale = 1;
    let visible = false;
    let hovering = false;
    let pressed = false;
    let overTextInput = false;
    let raf = 0;
    let lastTime = 0;

    const syncScales = () => {
      if (pressed) {
        targetRingScale = hovering ? 1.15 : 0.82;
        targetDotScale = 0.85;
      } else if (hovering) {
        targetRingScale = 1.42;
        targetDotScale = 0.55;
      } else {
        targetRingScale = 1;
        targetDotScale = 1;
      }
    };

    const setVisibility = (show: boolean) => {
      visible = show;
      const opacity = show ? (overTextInput ? "0.25" : "1") : "0";
      ring.style.opacity = opacity;
      dot.style.opacity = show ? (overTextInput ? "0" : "1") : "0";
    };

    const hide = () => {
      hovering = false;
      pressed = false;
      overTextInput = false;
      ring.removeAttribute("data-hover");
      ring.removeAttribute("data-pressed");
      syncScales();
      setVisibility(false);
    };

    const paint = () => {
      ring.style.transform = `translate3d(${ringPos.x.toFixed(1)}px, ${ringPos.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`;
      dot.style.transform = `translate3d(${target.x.toFixed(1)}px, ${target.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${dotScale.toFixed(3)})`;
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = lastTime ? Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000)) : 1 / 60;
      lastTime = now;

      // Frame-rate-independent smoothing for outer glowing violet ring
      const posFactor = 1 - Math.exp(-dt * 15);
      const scaleFactor = 1 - Math.exp(-dt * 18);

      ringPos.x += (target.x - ringPos.x) * posFactor;
      ringPos.y += (target.y - ringPos.y) * posFactor;
      ringScale += (targetRingScale - ringScale) * scaleFactor;
      dotScale += (targetDotScale - dotScale) * scaleFactor;

      paint();

      const settled =
        Math.abs(target.x - ringPos.x) < 0.25 &&
        Math.abs(target.y - ringPos.y) < 0.25 &&
        Math.abs(targetRingScale - ringScale) < 0.004 &&
        Math.abs(targetDotScale - dotScale) < 0.004;

      if (!settled && visible) {
        raf = requestAnimationFrame(tick);
      } else {
        ringPos.x = target.x;
        ringPos.y = target.y;
        ringScale = targetRingScale;
        dotScale = targetDotScale;
        paint();
        lastTime = 0;
      }
    };

    const wake = () => {
      if (!raf) {
        lastTime = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const inspectTarget = (eventTarget: EventTarget | null) => {
      const element = eventTarget instanceof Element ? eventTarget : null;
      const nextHover = Boolean(element?.closest(INTERACTIVE_SELECTOR));
      const nextTextInput = Boolean(element?.closest(TEXT_INPUT_SELECTOR));

      if (nextHover !== hovering) {
        hovering = nextHover;
        if (hovering) ring.setAttribute("data-hover", "true");
        else ring.removeAttribute("data-hover");
        syncScales();
      }

      if (nextTextInput !== overTextInput) {
        overTextInput = nextTextInput;
        if (visible) setVisibility(true);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !isAllowed()) {
        if (visible) hide();
        return;
      }

      target.x = event.clientX;
      target.y = event.clientY;

      inspectTarget(event.target);

      if (!visible) {
        ringPos.x = target.x;
        ringPos.y = target.y;
        ringScale = targetRingScale;
        dotScale = targetDotScale;
        paint();
        setVisibility(true);
      }

      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !isAllowed() || !visible) return;
      pressed = true;
      ring.setAttribute("data-pressed", "true");
      syncScales();
      wake();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (!pressed) return;
      pressed = false;
      ring.removeAttribute("data-pressed");
      syncScales();
      wake();
    };

    const onMediaChange = () => {
      if (!isAllowed() && visible) hide();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", hide, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    pointerQuery?.addEventListener("change", onMediaChange);
    desktopQuery?.addEventListener("change", onMediaChange);
    reducedQuery?.addEventListener("change", onMediaChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      pointerQuery?.removeEventListener("change", onMediaChange);
      desktopQuery?.removeEventListener("change", onMediaChange);
      reducedQuery?.removeEventListener("change", onMediaChange);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[80] opacity-0"
        style={{ willChange: "transform, opacity" }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[80] opacity-0"
        style={{ willChange: "transform, opacity" }}
      />
    </>
  );
};

export default GlowCursor;

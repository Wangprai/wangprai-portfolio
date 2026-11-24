import { useEffect, useRef } from "react";

type CursorState = "default" | "interactive" | "card" | "external";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], summary, label[for], [data-cursor="interactive"]';
const CARD_SELECTOR = '[data-cursor="card"]';
const TEXT_INPUT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';

/**
 * GlowCursor — Futuristic violet orbital cursor with three GPU-composited layers:
 * 1. Ambient trailing violet aura (illuminates surfaces smoothly).
 * 2. Precision orbital reticle with context-aware states (default, interactive,
 *    card lens with micro-label, external link, pressed pulse).
 * 3. Instant luminous diamond core.
 *
 * Preserves native cursor behavior, never intercepts pointer events, disables
 * automatically on touch/coarse pointers and `prefers-reduced-motion`.
 */
const GlowCursor = () => {
  const auraRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aura = auraRef.current;
    const reticle = reticleRef.current;
    const label = labelRef.current;
    const core = coreRef.current;
    if (!aura || !reticle || !label || !core || typeof window === "undefined") return;

    const pointerQuery = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    const desktopQuery = window.matchMedia?.("(min-width: 768px)");
    const reducedQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const isAllowed = () =>
      Boolean(pointerQuery?.matches) &&
      Boolean(desktopQuery?.matches) &&
      !reducedQuery?.matches;

    const auraPos = { x: -160, y: -160 };
    const reticlePos = { x: -160, y: -160 };
    const target = { x: -160, y: -160 };

    let reticleScale = 1;
    let targetReticleScale = 1;
    let coreScale = 1;
    let targetCoreScale = 1;
    let coreRot = 45;
    let targetCoreRot = 45;

    let visible = false;
    let state: CursorState = "default";
    let pressed = false;
    let overTextInput = false;
    let raf = 0;
    let lastTime = 0;

    const syncTargets = () => {
      if (pressed) {
        targetReticleScale = state === "card" ? 1.52 : state === "interactive" ? 1.12 : 0.78;
        targetCoreScale = 0.7;
        targetCoreRot = 135;
        return;
      }

      if (state === "card") {
        targetReticleScale = 1.72;
        targetCoreScale = 0;
        targetCoreRot = 90;
      } else if (state === "external") {
        targetReticleScale = 1.48;
        targetCoreScale = 0.55;
        targetCoreRot = 90;
      } else if (state === "interactive") {
        targetReticleScale = 1.44;
        targetCoreScale = 0.5;
        targetCoreRot = 90;
      } else {
        targetReticleScale = 1;
        targetCoreScale = 1;
        targetCoreRot = 45;
      }
    };

    const setVisibility = (show: boolean) => {
      visible = show;
      if (!show) {
        aura.style.opacity = "0";
        reticle.style.opacity = "0";
        core.style.opacity = "0";
        return;
      }

      aura.style.opacity = overTextInput ? "0.18" : state === "default" ? "0.8" : "1";
      reticle.style.opacity = overTextInput ? "0.2" : "1";
      core.style.opacity = overTextInput || state === "card" ? "0" : "1";
    };

    const hide = () => {
      state = "default";
      pressed = false;
      overTextInput = false;
      reticle.removeAttribute("data-state");
      reticle.removeAttribute("data-pressed");
      syncTargets();
      setVisibility(false);
    };

    const paint = () => {
      aura.style.transform = `translate3d(${auraPos.x.toFixed(1)}px, ${auraPos.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      reticle.style.transform = `translate3d(${reticlePos.x.toFixed(1)}px, ${reticlePos.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${reticleScale.toFixed(3)})`;
      core.style.transform = `translate3d(${target.x.toFixed(1)}px, ${target.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${coreRot.toFixed(1)}deg) scale(${coreScale.toFixed(3)})`;
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = lastTime ? Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000)) : 1 / 60;
      lastTime = now;

      const auraFactor = 1 - Math.exp(-dt * 6.5);
      const reticleFactor = 1 - Math.exp(-dt * 15.5);
      const scaleFactor = 1 - Math.exp(-dt * 17);

      auraPos.x += (target.x - auraPos.x) * auraFactor;
      auraPos.y += (target.y - auraPos.y) * auraFactor;
      reticlePos.x += (target.x - reticlePos.x) * reticleFactor;
      reticlePos.y += (target.y - reticlePos.y) * reticleFactor;
      reticleScale += (targetReticleScale - reticleScale) * scaleFactor;
      coreScale += (targetCoreScale - coreScale) * scaleFactor;
      coreRot += (targetCoreRot - coreRot) * scaleFactor;

      paint();

      const settled =
        Math.abs(target.x - auraPos.x) < 0.35 &&
        Math.abs(target.y - auraPos.y) < 0.35 &&
        Math.abs(target.x - reticlePos.x) < 0.25 &&
        Math.abs(target.y - reticlePos.y) < 0.25 &&
        Math.abs(targetReticleScale - reticleScale) < 0.004 &&
        Math.abs(targetCoreScale - coreScale) < 0.004 &&
        Math.abs(targetCoreRot - coreRot) < 0.3;

      if (!settled && visible) {
        raf = requestAnimationFrame(tick);
      } else {
        auraPos.x = target.x;
        auraPos.y = target.y;
        reticlePos.x = target.x;
        reticlePos.y = target.y;
        reticleScale = targetReticleScale;
        coreScale = targetCoreScale;
        coreRot = targetCoreRot;
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
      const interactiveEl = element?.closest(INTERACTIVE_SELECTOR) ?? null;
      const cardEl = element?.closest(CARD_SELECTOR) ?? null;
      const nextTextInput = Boolean(element?.closest(TEXT_INPUT_SELECTOR));

      let nextState: CursorState = "default";
      if (interactiveEl) {
        const isExternal =
          interactiveEl.tagName === "A" && interactiveEl.getAttribute("target") === "_blank";
        nextState = isExternal ? "external" : "interactive";
      } else if (cardEl) {
        nextState = "card";
        const customLabel = cardEl.getAttribute("data-cursor-label");
        label.textContent = customLabel || "VIEW";
      }

      if (nextState !== state) {
        state = nextState;
        if (state === "default") reticle.removeAttribute("data-state");
        else reticle.setAttribute("data-state", state);
        syncTargets();
        if (visible) setVisibility(true);
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
        auraPos.x = target.x;
        auraPos.y = target.y;
        reticlePos.x = target.x;
        reticlePos.y = target.y;
        reticleScale = targetReticleScale;
        coreScale = targetCoreScale;
        coreRot = targetCoreRot;
        paint();
        setVisibility(true);
      }

      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !isAllowed() || !visible) return;
      pressed = true;
      reticle.setAttribute("data-pressed", "true");
      syncTargets();
      wake();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !pressed) return;
      pressed = false;
      reticle.removeAttribute("data-pressed");
      syncTargets();
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
        ref={auraRef}
        aria-hidden="true"
        className="cursor-aura pointer-events-none fixed left-0 top-0 z-[78] opacity-0"
        style={{ willChange: "transform, opacity" }}
      />
      <div
        ref={reticleRef}
        aria-hidden="true"
        className="cursor-reticle pointer-events-none fixed left-0 top-0 z-[80] opacity-0"
        style={{ willChange: "transform, opacity" }}
      >
        <span className="cursor-reticle-orbit" />
        <span className="cursor-reticle-ring" />
        <span ref={labelRef} className="cursor-reticle-label">
          VIEW
        </span>
      </div>
      <div
        ref={coreRef}
        aria-hidden="true"
        className="cursor-core pointer-events-none fixed left-0 top-0 z-[81] opacity-0"
        style={{ willChange: "transform, opacity" }}
      />
    </>
  );
};

export default GlowCursor;

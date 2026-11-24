import { useEffect, useRef } from "react";
import { useTheme } from "../../hooks/useTheme";

const GlowCursor = () => {
  const haloRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const el = haloRef.current;
    if (!el || typeof window === "undefined") return;

    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (!finePointer || reducedMotion) return;

    const pos = { x: -400, y: -400 };
    const target = { x: -400, y: -400 };
    let active = false;
    let raf = 0;

    const tick = () => {
      raf = 0;
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      el.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0) translate(-50%, -50%)`;

      const settled =
        Math.abs(target.x - pos.x) < 0.3 && Math.abs(target.y - pos.y) < 0.3;
      if (!settled && active) {
        raf = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!active) {
        pos.x = target.x;
        pos.y = target.y;
        active = true;
        el.style.opacity = "1";
      }
      wake();
    };

    const onLeave = () => {
      active = false;
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  const gradient =
    theme === "dark"
      ? "radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, rgba(167, 139, 250, 0.05) 38%, transparent 72%)"
      : "radial-gradient(circle, rgba(109, 40, 217, 0.08) 0%, rgba(139, 92, 246, 0.03) 38%, transparent 72%)";

  return (
    <div
      ref={haloRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 h-[420px] w-[420px] rounded-full opacity-0 transition-opacity duration-300"
      style={{ background: gradient, willChange: "transform, opacity" }}
    />
  );
};

export default GlowCursor;

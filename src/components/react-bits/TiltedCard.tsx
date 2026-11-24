import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

/**
 * TiltedCard — dependency-free adaptation of React Bits "Tilted Card"
 * (https://reactbits.dev/components/tilted-card).
 *
 * Provides smooth spring-damped 3D perspective tilt with a dynamic specular
 * glare sheen on fine-pointer desktop devices. Automatically disables on
 * touch devices and respects `prefers-reduced-motion`.
 */
export interface TiltedCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxTilt?: number;
  scaleOnHover?: number;
  glareOpacity?: number;
  perspective?: number;
  disabled?: boolean;
}

const TiltedCard = ({
  children,
  className = "",
  maxTilt = 8,
  scaleOnHover = 1.015,
  glareOpacity = 0.16,
  perspective = 1000,
  disabled = false,
  ...rest
}: TiltedCardProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const glare = glareRef.current;
    if (!outer || !inner || !glare || disabled || typeof window === "undefined") return;

    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (!finePointer || reduced) return;

    let raf = 0;
    let last = 0;
    const current = { rx: 0, ry: 0, s: 1, gx: 50, gy: 50, ga: 0 };
    const target = { rx: 0, ry: 0, s: 1, gx: 50, gy: 50, ga: 0 };

    const paint = () => {
      inner.style.transform = `perspective(${perspective}px) rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg) scale3d(${current.s.toFixed(4)}, ${current.s.toFixed(4)}, 1)`;
      glare.style.opacity = current.ga.toFixed(3);
      glare.style.background = `radial-gradient(circle 280px at ${current.gx.toFixed(1)}% ${current.gy.toFixed(1)}%, hsl(270 100% 88% / 0.9), transparent 72%)`;
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, Math.max(0.001, (now - last) / 1000)) : 1 / 60;
      last = now;
      const k = 1 - Math.exp(-dt * 12);

      current.rx += (target.rx - current.rx) * k;
      current.ry += (target.ry - current.ry) * k;
      current.s += (target.s - current.s) * k;
      current.gx += (target.gx - current.gx) * k;
      current.gy += (target.gy - current.gy) * k;
      current.ga += (target.ga - current.ga) * k;

      paint();

      const settled =
        Math.abs(target.rx - current.rx) < 0.03 &&
        Math.abs(target.ry - current.ry) < 0.03 &&
        Math.abs(target.s - current.s) < 0.0008 &&
        Math.abs(target.ga - current.ga) < 0.003;

      if (!settled) {
        raf = requestAnimationFrame(tick);
      } else {
        Object.assign(current, target);
        paint();
        last = 0;
      }
    };

    const wake = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = outer.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

      target.rx = (0.5 - py) * maxTilt * 2;
      target.ry = (px - 0.5) * maxTilt * 2;
      target.s = scaleOnHover;
      target.gx = px * 100;
      target.gy = py * 100;
      target.ga = glareOpacity;
      wake();
    };

    const onPointerLeave = () => {
      target.rx = 0;
      target.ry = 0;
      target.s = 1;
      target.ga = 0;
      wake();
    };

    outer.addEventListener("pointermove", onPointerMove, { passive: true });
    outer.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      outer.removeEventListener("pointermove", onPointerMove);
      outer.removeEventListener("pointerleave", onPointerLeave);
      inner.style.transform = "";
      glare.style.opacity = "0";
    };
  }, [disabled, glareOpacity, maxTilt, perspective, scaleOnHover]);

  return (
    <div ref={outerRef} className={`relative ${className}`} {...rest}>
      <div
        ref={innerRef}
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ willChange: "transform" }}
      >
        {children}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 mix-blend-soft-light"
        />
      </div>
    </div>
  );
};

export default TiltedCard;

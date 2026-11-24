import { useEffect, useRef } from "react";

/**
 * ParticlesField — dependency-free adaptation of React Bits "Particles"
 * (https://reactbits.dev/backgrounds/particles).
 *
 * Lightweight Canvas 2D constellation field with subtle pointer magnetism and
 * glowing violet nodes. Pauses automatically when offscreen or hidden, adapts
 * density to viewport size, and renders a single static frame for reduced-motion.
 */
interface ParticlesFieldProps {
  theme: "dark" | "light";
  count?: number;
  connectDistance?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  hueShift: number;
}

const ParticlesField = ({
  theme,
  count = 44,
  connectDistance = 120,
  className = "",
}: ParticlesFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx || typeof window === "undefined") return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;

    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };
    let particles: Particle[] = [];

    const seedParticles = () => {
      const mobileScale = width < 768 ? 0.55 : 1;
      const targetCount = Math.max(14, Math.round(count * mobileScale));
      particles = Array.from({ length: targetCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.6 + 0.75,
        alpha: Math.random() * 0.5 + 0.25,
        hueShift: Math.random(),
      }));
    };

    const drawFrame = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);
      const isLight = themeRef.current === "light";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (animate) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -12) p.x = width + 12;
          else if (p.x > width + 12) p.x = -12;
          if (p.y < -12) p.y = height + 12;
          else if (p.y > height + 12) p.y = -12;

          if (pointer.active && finePointer) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const distSq = dx * dx + dy * dy;
            if (distSq > 1 && distSq < 22500) {
              const dist = Math.sqrt(distSq);
              const pull = (1 - dist / 150) * 0.015;
              p.x += (dx / dist) * pull * 16;
              p.y += (dy / dist) * pull * 16;
            }
          }
        }

        const nodeColor = isLight
          ? p.hueShift > 0.65
            ? `rgba(124, 58, 237, ${(p.alpha * 0.55).toFixed(2)})`
            : `rgba(139, 92, 246, ${(p.alpha * 0.45).toFixed(2)})`
          : p.hueShift > 0.72
            ? `rgba(192, 132, 252, ${(p.alpha * 0.9).toFixed(2)})`
            : p.hueShift > 0.35
              ? `rgba(167, 139, 250, ${(p.alpha * 0.85).toFixed(2)})`
              : `rgba(125, 211, 252, ${(p.alpha * 0.65).toFixed(2)})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      }

      // Subtle constellation filaments between nearby nodes
      const maxDist = width < 768 ? connectDistance * 0.75 : connectDistance;
      const maxDistSq = maxDist * maxDist;

      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const strength = 1 - Math.sqrt(distSq) / maxDist;
            const lineAlpha = strength * (isLight ? 0.14 : 0.19);
            ctx.strokeStyle = isLight
              ? `rgba(124, 58, 237, ${lineAlpha.toFixed(3)})`
              : `rgba(167, 139, 250, ${lineAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const tick = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      drawFrame(!reduced);
      if (!reduced) {
        raf = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (!raf && visible && !document.hidden) {
        raf = requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
      drawFrame(false);
      wake();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = container.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibility = () => {
      wake();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) wake();
    });
    intersection.observe(container);

    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);

    resize();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [connectDistance, count]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default ParticlesField;

import { memo, useEffect, useRef } from "react";

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
  darkColor: string;
  lightColor: string;
}

const LINE_BUCKETS = 8;
const DARK_LINE_STYLES = Array.from({ length: LINE_BUCKETS }, (_, idx) => {
  const alpha = ((idx + 0.5) / LINE_BUCKETS) * 0.19;
  return `rgba(167, 139, 250, ${alpha.toFixed(3)})`;
});
const LIGHT_LINE_STYLES = Array.from({ length: LINE_BUCKETS }, (_, idx) => {
  const alpha = ((idx + 0.5) / LINE_BUCKETS) * 0.14;
  return `rgba(124, 58, 237, ${alpha.toFixed(3)})`;
});

const ParticlesField = ({
  theme,
  count = 44,
  connectDistance = 120,
  className = "",
}: ParticlesFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);
  const redrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    themeRef.current = theme;
    redrawRef.current?.();
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx || typeof window === "undefined") return;

    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery?.matches ?? false;
    const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;

    let width = 0;
    let height = 0;
    let dpr = 0;
    let raf = 0;
    let resizeRaf = 0;
    let visible = typeof IntersectionObserver === "undefined";
    const pointer = { x: -9999, y: -9999, active: false };
    let particles: Particle[] = [];
    const buckets: number[][] = Array.from({ length: LINE_BUCKETS }, () => []);

    const seedParticles = () => {
      const mobileScale = width < 768 ? 0.55 : 1;
      const targetCount = Math.max(14, Math.round(count * mobileScale));
      particles = Array.from({ length: targetCount }, () => {
        const alpha = Math.random() * 0.5 + 0.25;
        const hueShift = Math.random();
        const lightColor =
          hueShift > 0.65
            ? `rgba(124, 58, 237, ${(alpha * 0.55).toFixed(2)})`
            : `rgba(139, 92, 246, ${(alpha * 0.45).toFixed(2)})`;
        const darkColor =
          hueShift > 0.72
            ? `rgba(192, 132, 252, ${(alpha * 0.9).toFixed(2)})`
            : hueShift > 0.35
              ? `rgba(167, 139, 250, ${(alpha * 0.85).toFixed(2)})`
              : `rgba(125, 211, 252, ${(alpha * 0.65).toFixed(2)})`;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: Math.random() * 1.6 + 0.75,
          darkColor,
          lightColor,
        };
      });
    };

    const drawFrame = (animate: boolean) => {
      if (width <= 0 || height <= 0) return;
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

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? p.lightColor : p.darkColor;
        ctx.fill();
      }

      // Subtle constellation filaments batched by opacity bucket
      const maxDist = width < 768 ? connectDistance * 0.75 : connectDistance;
      const maxDistSq = maxDist * maxDist;
      const lineStyles = isLight ? LIGHT_LINE_STYLES : DARK_LINE_STYLES;

      for (let b = 0; b < LINE_BUCKETS; b++) {
        buckets[b].length = 0;
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const strength = 1 - Math.sqrt(distSq) / maxDist;
            const bucketIdx = Math.min(LINE_BUCKETS - 1, Math.floor(strength * LINE_BUCKETS));
            const coords = buckets[bucketIdx];
            coords.push(a.x, a.y, b.x, b.y);
          }
        }
      }

      ctx.lineWidth = 0.7;
      for (let b = 0; b < LINE_BUCKETS; b++) {
        const coords = buckets[b];
        if (coords.length === 0) continue;
        ctx.strokeStyle = lineStyles[b];
        ctx.beginPath();
        for (let k = 0; k < coords.length; k += 4) {
          ctx.moveTo(coords[k], coords[k + 1]);
          ctx.lineTo(coords[k + 2], coords[k + 3]);
        }
        ctx.stroke();
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
      const nextWidth = Math.max(1, container.clientWidth);
      const nextHeight = Math.max(1, container.clientHeight);
      const nextDpr = Math.min(window.devicePixelRatio || 1, 1.5);
      if (nextWidth === width && nextHeight === height && nextDpr === dpr) {
        return;
      }
      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
      if (visible) {
        drawFrame(false);
        wake();
      }
    };

    const scheduleResize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        resize();
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!visible || event.pointerType !== "mouse") return;
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

    const onMotionChange = (event: MediaQueryListEvent) => {
      reduced = event.matches;
      if (visible) {
        if (reduced) {
          cancelAnimationFrame(raf);
          raf = 0;
          drawFrame(false);
        } else {
          wake();
        }
      }
    };

    redrawRef.current = () => {
      if (visible && reduced) {
        drawFrame(false);
      }
    };

    const resizeObserver = new ResizeObserver(scheduleResize);
    resizeObserver.observe(container);

    const intersection = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) {
        if (reduced) drawFrame(false);
        else wake();
      }
    });
    intersection.observe(container);

    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery?.addEventListener?.("change", onMotionChange);

    resize();

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      redrawRef.current = null;
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery?.removeEventListener?.("change", onMotionChange);
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

export default memo(ParticlesField);

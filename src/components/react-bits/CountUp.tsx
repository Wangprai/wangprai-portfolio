import { useEffect, useRef, useState } from "react";

/**
 * CountUp — dependency-free adaptation of React Bits "Count Up"
 * (https://reactbits.dev/text-animations/count-up).
 *
 * The original uses `motion` springs; this version uses a single
 * requestAnimationFrame loop with an ease-out curve, starts only when the
 * number scrolls into view, and writes to the DOM directly (no re-renders).
 * The value is decorative: callers should expose the final value to assistive
 * technology separately (this element is aria-hidden).
 */
interface CountUpProps {
  from: number;
  to: number;
  durationMs?: number;
  className?: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);

const CountUp = ({ from, to, durationMs = 1400, className = "" }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [initial] = useState(() =>
    prefersReducedMotion() || typeof IntersectionObserver === "undefined" ? to : from
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || initial === to) return;

    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(from + (to - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(to);
    };
  }, [from, to, durationMs, initial]);

  return (
    <span ref={ref} aria-hidden="true" className={`tabular-nums ${className}`}>
      {initial}
    </span>
  );
};

export default CountUp;

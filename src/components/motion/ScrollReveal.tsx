import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Viewport reveal wrapper (dependency-free adaptation of React Bits
 * "Animated Content" / "Fade Content").
 *
 * - `variant` picks the entrance style for the wrapper itself.
 * - Descendants with `.reveal-item` (and an optional `--i` index) stagger in
 *   once the wrapper is revealed; `.reveal-line` / `.reveal-line-y` draw in.
 * - Reduced-motion users and browsers without IntersectionObserver get the
 *   final state immediately.
 */
export type RevealVariant = "up" | "blur" | "scale" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  variant?: RevealVariant;
}

const HIDDEN: Record<RevealVariant, string> = {
  up: "opacity-0 translate-y-4",
  blur: "opacity-0 translate-y-2 blur-[6px]",
  scale: "opacity-0 scale-[0.96]",
  left: "opacity-0 -translate-x-5",
  right: "opacity-0 translate-x-5",
};

const revealCallbacks = new Map<Element, () => void>();
let sharedRevealObserver: IntersectionObserver | null = null;

const getRevealObserver = () => {
  if (!sharedRevealObserver) {
    sharedRevealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const callback = revealCallbacks.get(entry.target);
          sharedRevealObserver?.unobserve(entry.target);
          revealCallbacks.delete(entry.target);
          callback?.();
        }
        if (revealCallbacks.size === 0 && sharedRevealObserver) {
          sharedRevealObserver.disconnect();
          sharedRevealObserver = null;
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
  }
  return sharedRevealObserver;
};

const observeReveal = (el: Element, onReveal: () => void) => {
  revealCallbacks.set(el, onReveal);
  getRevealObserver().observe(el);
  return () => {
    if (!revealCallbacks.has(el)) return;
    revealCallbacks.delete(el);
    sharedRevealObserver?.unobserve(el);
    if (revealCallbacks.size === 0 && sharedRevealObserver) {
      sharedRevealObserver.disconnect();
      sharedRevealObserver = null;
    }
  };
};

const ScrollReveal = ({
  children,
  className = "",
  delayMs = 0,
  variant = "up",
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    return reduced || typeof IntersectionObserver === "undefined";
  });

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    return observeReveal(el, () => setVisible(true));
  }, [visible]);

  return (
    <div
      ref={ref}
      data-reveal={visible ? "shown" : "hidden"}
      className={`transition-[opacity,translate,scale,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100" : `${HIDDEN[variant]} will-change-[opacity,translate]`
      }${className ? ` ${className}` : ""}`}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

import { useEffect, useRef } from "react";

/**
 * DecryptedText — dependency-free adaptation of React Bits "Decrypted Text"
 * (https://reactbits.dev/text-animations/decrypted-text).
 *
 * Progressively resolves scrambled monospace characters into the real text
 * when mounted or scrolled into view using direct DOM updates (zero React
 * re-renders). Preserves full semantic text for screen readers and immediately
 * renders static text for reduced-motion users or non-Latin scripts.
 */
interface DecryptedTextProps {
  text: string;
  className?: string;
  speedMs?: number;
  delayMs?: number;
  animateOnView?: boolean;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>{}[]";

const hasNonAscii = (value: string) => /[^\x20-\x7E]/.test(value);

const DecryptedText = ({
  text,
  className = "",
  speedMs = 28,
  delayMs = 0,
  animateOnView = false,
}: DecryptedTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const displayEl = displayRef.current;
    if (!displayEl) return;

    displayEl.textContent = text;

    const reduced =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);

    if (reduced || hasNonAscii(text)) {
      return;
    }

    let timer = 0;
    let interval = 0;
    let observer: IntersectionObserver | null = null;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      let revealCount = 0;

      timer = window.setTimeout(() => {
        interval = window.setInterval(() => {
          revealCount += 1;
          displayEl.textContent = text
            .split("")
            .map((char, index) => {
              if (char === " " || index < revealCount) return char;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("");

          if (revealCount >= text.length) {
            window.clearInterval(interval);
            displayEl.textContent = text;
          }
        }, speedMs);
      }, delayMs);
    };

    if (animateOnView && typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            run();
          }
        },
        { threshold: 0.35 }
      );
      observer.observe(containerRef.current);
    } else {
      run();
    }

    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
      window.clearInterval(interval);
      displayEl.textContent = text;
    };
  }, [text, speedMs, delayMs, animateOnView]);

  return (
    <span ref={containerRef} className={className}>
      <span className="sr-only">{text}</span>
      <span ref={displayRef} aria-hidden="true">
        {text}
      </span>
    </span>
  );
};

export default DecryptedText;

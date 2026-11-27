import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { observeOffscreenPause } from "../../utils/viewportObserver";

/**
 * StarBorder — dependency-free adaptation of React Bits "Star Border"
 * (https://reactbits.dev/animations/star-border).
 *
 * Wraps a surface or button in a travelling violet plasma border beam: a
 * compositor-rotated conic gradient inside a static border-only mask
 * (`.border-beam-ring` / `.border-beam-spin` in index.css).
 * Pauses automatically via a shared IntersectionObserver when scrolled offscreen.
 */
interface StarBorderProps {
  children: ReactNode;
  className?: string;
  speedSeconds?: number;
}

const StarBorder = ({ children, className = "", speedSeconds = 7.5 }: StarBorderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeOffscreenPause(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`border-beam ${className}`}
      style={{ "--beam-speed": `${speedSeconds}s` } as CSSProperties}
    >
      {/* First child so stacking matches the former ::before pseudo-element. */}
      <span aria-hidden="true" className="border-beam-ring">
        <span className="border-beam-spin" />
      </span>
      {children}
    </div>
  );
};

export default StarBorder;

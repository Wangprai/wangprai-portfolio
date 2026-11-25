import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { observeOffscreenPause } from "../../utils/viewportObserver";

/**
 * StarBorder — dependency-free adaptation of React Bits "Star Border"
 * (https://reactbits.dev/animations/star-border).
 *
 * Wraps a surface or button in a travelling violet plasma border beam using
 * CSS Houdini `@property --beam-angle` (`.border-beam` in index.css).
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
      {children}
    </div>
  );
};

export default StarBorder;

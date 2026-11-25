import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { observeOffscreenPause } from "../../utils/viewportObserver";

/**
 * ShinyText — dependency-free adaptation of React Bits "Shiny Text"
 * (https://reactbits.dev/text-animations/shiny-text).
 *
 * Uses a GPU-friendly CSS gradient sweep (`.shiny-text` in index.css) tuned
 * to both Dark and Light violet palettes. Automatically stops animation when
 * `prefers-reduced-motion: reduce` is active and pauses when scrolled offscreen.
 */
type ShinyTextTag = "span" | "p" | "div" | "h1" | "h2" | "h3";

interface ShinyTextProps {
  children: ReactNode;
  as?: ShinyTextTag;
  className?: string;
  durationSeconds?: number;
}

const ShinyText = ({
  children,
  as: Tag = "span",
  className = "",
  durationSeconds = 5.5,
}: ShinyTextProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeOffscreenPause(el);
  }, []);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={`shiny-text ${className}`}
      style={{ "--shiny-duration": `${durationSeconds}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
};

export default ShinyText;

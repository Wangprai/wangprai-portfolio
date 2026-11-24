import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * ShinyText — dependency-free adaptation of React Bits "Shiny Text"
 * (https://reactbits.dev/text-animations/shiny-text).
 *
 * Uses a GPU-friendly CSS gradient sweep (`.shiny-text` in index.css) tuned
 * to both Dark and Light violet palettes. Automatically stops animation when
 * `prefers-reduced-motion: reduce` is active.
 */
interface ShinyTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  durationSeconds?: number;
}

const ShinyText = ({
  children,
  as: Tag = "span",
  className = "",
  durationSeconds = 5.5,
}: ShinyTextProps) => {
  return (
    <Tag
      className={`shiny-text ${className}`}
      style={{ "--shiny-duration": `${durationSeconds}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
};

export default ShinyText;

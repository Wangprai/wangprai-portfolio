import type { CSSProperties, ReactNode } from "react";

/**
 * StarBorder — dependency-free adaptation of React Bits "Star Border"
 * (https://reactbits.dev/animations/star-border).
 *
 * Wraps a surface or button in a travelling violet plasma border beam using
 * CSS Houdini `@property --beam-angle` (`.border-beam` in index.css).
 */
interface StarBorderProps {
  children: ReactNode;
  className?: string;
  speedSeconds?: number;
}

const StarBorder = ({ children, className = "", speedSeconds = 7.5 }: StarBorderProps) => {
  return (
    <div
      className={`border-beam ${className}`}
      style={{ "--beam-speed": `${speedSeconds}s` } as CSSProperties}
    >
      {children}
    </div>
  );
};

export default StarBorder;

import type { CSSProperties } from "react";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
}

/**
 * Section heading. When rendered inside <ScrollReveal>, the meta row, accent
 * line and title stagger in (`.reveal-item` / `.reveal-line` in index.css).
 */
const SectionHeading = ({ index, title, subtitle }: SectionHeadingProps) => {
  return (
    <div className="mb-10 md:mb-12">
      <div className="flex items-center gap-3 mb-2">
        <span
          className="reveal-item font-mono text-xs sm:text-sm font-semibold tracking-wider text-primary bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded-md"
          style={{ "--i": 0, "--base": "0ms" } as CSSProperties}
        >
          {index}
        </span>
        {subtitle && (
          <span
            className="reveal-item font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
            style={{ "--i": 1, "--base": "0ms" } as CSSProperties}
          >
            {subtitle}
          </span>
        )}
        <span
          aria-hidden="true"
          className="reveal-line hidden sm:block h-px flex-1 bg-gradient-to-r from-primary/50 via-border/70 to-transparent ml-2"
        />
      </div>
      <h2
        className="reveal-item text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight"
        style={{ "--i": 2, "--base": "0ms" } as CSSProperties}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;

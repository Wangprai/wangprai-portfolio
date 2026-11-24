import type { CSSProperties } from "react";
import DecryptedText from "./react-bits/DecryptedText";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
}

/**
 * Architectural futuristic section heading.
 * Staggers smoothly inside `<ScrollReveal>` with glowing violet index badge,
 * decoded technical subtitle, and sweeping hairline rule.
 */
const SectionHeading = ({ index, title, subtitle }: SectionHeadingProps) => {
  return (
    <div className="mb-12 md:mb-14">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="reveal-item inline-flex items-center gap-1.5 font-mono text-xs sm:text-[13px] font-semibold tracking-wider text-primary bg-primary/12 border border-primary/35 px-3 py-1 rounded-lg shadow-[0_0_20px_-8px_hsl(var(--primary)/0.65)]"
          style={{ "--i": 0, "--base": "0ms" } as CSSProperties}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          {index}
        </span>

        {subtitle && (
          <DecryptedText
            text={subtitle}
            animateOnView
            speedMs={24}
            className="reveal-item font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] text-muted-foreground"
          />
        )}

        <span
          aria-hidden="true"
          className="reveal-line hidden sm:block h-px flex-1 bg-gradient-to-r from-primary/60 via-accent/30 to-transparent ml-2"
        />
      </div>

      <h2
        className="reveal-item text-3xl sm:text-4xl md:text-[2.65rem] font-bold text-foreground tracking-tight leading-[1.15]"
        style={{ "--i": 2, "--base": "0ms" } as CSSProperties}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;

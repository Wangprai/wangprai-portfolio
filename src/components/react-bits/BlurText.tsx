import type { CSSProperties, ElementType } from "react";

/**
 * BlurText — dependency-free adaptation of React Bits "Blur Text"
 * (https://reactbits.dev/text-animations/blur-text).
 *
 * The original relies on the `motion` package; this version uses a single CSS
 * keyframe (`.blur-word` in index.css) so no runtime animation library is
 * needed. The full text is always present for assistive technology, the
 * animation starts on first paint (no JS gating), and reduced-motion users get
 * the static final state via the global media query.
 */
interface BlurTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay before the first word starts (ms). */
  delayMs?: number;
  /** Stagger between words (ms). */
  stepMs?: number;
}

const BlurText = ({
  text,
  as: Tag = "p",
  className = "",
  delayMs = 0,
  stepMs = 90,
}: BlurTextProps) => {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      {/* key={text} replays the reveal when the language changes */}
      <span key={text} aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span
              className="blur-word"
              style={{ "--d": `${delayMs + index * stepMs}ms` } as CSSProperties}
            >
              {word}
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
};

export default BlurText;

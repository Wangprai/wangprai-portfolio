import type { SVGProps } from "react";

/**
 * Lightweight inline icons for technologies that have no logo in the
 * installed icon packs. Oracle uses the Simple Icons path; the others are
 * simplified, monochrome representations (no official lightweight SVG was
 * available) drawn with `currentColor`.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  focusable: false,
} as const;

export const OracleIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M16.412 4.412h-8.82a7.588 7.588 0 0 0-.008 15.176h8.828a7.588 7.588 0 0 0 0-15.176zm-.193 12.502H7.786a4.915 4.915 0 0 1 0-9.828h8.433a4.914 4.914 0 1 1 0 9.828z" />
  </svg>
);

/** Simplified Elysia mark: stylised "E" in a rounded tile. */
export const ElysiaIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 2 20.5 6.5v11L12 22l-8.5-4.5v-11L12 2Zm-3.2 5.2v9.6h6.4v-2.1h-4V12.7h3.4v-2h-3.4V9.3h3.9V7.2H8.8Z" />
  </svg>
);

/** Simplified Matplotlib mark: polar plot with radial bars. */
export const MatplotlibIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 0 1 8 8h-8V4Zm-1 .1V11H4.1A8 8 0 0 1 11 4.1ZM4.1 13H11v6.9A8 8 0 0 1 4.1 13Zm8.9 6.9V13h6.9a8 8 0 0 1-6.9 6.9Z" />
  </svg>
);

/** Simplified Seaborn mark: distribution bars over a smooth curve. */
export const SeabornIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 20h18v1.6H3V20Zm1.5-1.5V14h2.6v4.5H4.500Zm3.7 0V9.5h2.600v9H8.200Zm3.700 0V5h2.600v13.500h-2.600Zm3.700 0v-7h2.600v7h-2.600Z" />
    <path
      d="M3.500 14c3-.2 4-8 8.500-8.200 3.500-.2 3.800 6 8.500 6.200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.400"
      strokeLinecap="round"
    />
  </svg>
);

/** Simplified Go Fiber mark: lightning bolt in a hexagon outline. */
export const GoFiberIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 1.5 21 6.750v10.500L12 22.500 3 17.250V6.750L12 1.500Zm0 2.300L5 7.900v8.200l7 4.100 7-4.100V7.900L12 3.800Zm1.600 3.200-4.200 6h2.700l-.9 4.500 4.300-6.200h-2.700l.8-4.300Z" />
  </svg>
);

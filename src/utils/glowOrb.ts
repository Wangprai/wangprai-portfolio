import type { CSSProperties } from "react";

/**
 * Soft glow orbs without `filter: blur()`.
 *
 * A large blur filter (100px+) is very expensive to rasterize, and is
 * re-filtered every frame when the element animates. A uniformly filled disk
 * of radius R blurred with standard deviation σ has a known radial falloff, so
 * we paint that falloff directly as gradient stops on `.glow-orb::before`
 * (see index.css), which extends 3σ past the host box like the blur did.
 *
 * Values are computed once per orb at module load.
 */

const STOPS = 14;

/** Exponentially scaled modified Bessel function I0(x)·e^(-x) (Abramowitz & Stegun 9.8.1/9.8.2). */
const i0e = (x: number) => {
  if (x <= 3.75) {
    const t = (x / 3.75) ** 2;
    const i0 =
      1 +
      t * (3.5156229 + t * (3.0899424 + t * (1.2067492 + t * (0.2659732 + t * (0.0360768 + t * 0.0045813)))));
    return i0 * Math.exp(-x);
  }
  const t = 3.75 / x;
  return (
    (0.39894228 +
      t * (0.01328592 +
        t * (0.00225319 +
          t * (-0.00157565 +
            t * (0.00916281 + t * (-0.02057706 + t * (0.02635537 + t * (-0.01647633 + t * 0.00392377)))))))) /
    Math.sqrt(x)
  );
};

/** Coverage at distance r of a disk of radius k blurred by a unit Gaussian (all in σ units). */
const diskFalloff = (k: number, r: number) => {
  const n = 96;
  const h = k / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const p = (i + 0.5) * h;
    sum += p * Math.exp(-((p - r) ** 2) / 2) * i0e(r * p);
  }
  return Math.min(1, sum * h);
};

/** Falloff sampled across `closest-side` of a box padded by 3σ (0% = center, 100% = padded edge). */
const profile = (radiusPx: number, blurPx: number) => {
  const k = radiusPx / blurPx;
  return Array.from({ length: STOPS }, (_, i) => {
    const u = i / (STOPS - 1);
    return { at: +(u * 100).toFixed(2), value: diskFalloff(k, u * (k + 3)) };
  });
};

const colorStops = (color: string, alphaPct: number, radiusPx: number, blurPx: number) =>
  `radial-gradient(closest-side, ${profile(radiusPx, blurPx)
    .map(({ at, value }) => `color-mix(in oklab, ${color} ${(alphaPct * value).toFixed(3)}%, transparent) ${at}%`)
    .join(", ")})`;

const maskStops = (radiusPx: number, blurPx: number) =>
  `radial-gradient(closest-side, ${profile(radiusPx, blurPx)
    .map(({ at, value }) => `rgb(0 0 0 / ${value.toFixed(4)}) ${at}%`)
    .join(", ")})`;

type GlowOrbOptions = {
  /** The original `blur-[Npx]` value (σ). */
  blurPx: number;
  /** Disk radius (half the element size). For an ellipse, the geometric mean of both half-axes. */
  radiusPx: number;
  /** Radius from the `md` breakpoint up, if the element changes size there. */
  radiusMdPx?: number;
} & (
  | { /** Solid fill, e.g. `hsl(var(--primary))`. */ color: string; /** Tailwind opacity modifier, e.g. 22 for `/22`. */ alphaPct: number }
  | { /** Gradient fill painted under the falloff mask. */ fill: string }
);

export const glowOrb = (options: GlowOrbOptions): CSSProperties => {
  const { blurPx, radiusPx, radiusMdPx } = options;
  const vars: Record<string, string> = { "--orb-blur": `${blurPx}px` };
  if ("color" in options) {
    vars["--orb-bg"] = colorStops(options.color, options.alphaPct, radiusPx, blurPx);
    if (radiusMdPx) vars["--orb-bg-md"] = colorStops(options.color, options.alphaPct, radiusMdPx, blurPx);
  } else {
    vars["--orb-bg"] = options.fill;
    vars["--orb-mask"] = maskStops(radiusPx, blurPx);
    if (radiusMdPx) vars["--orb-mask-md"] = maskStops(radiusMdPx, blurPx);
  }
  return vars as CSSProperties;
};

import { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from "react";

const GradientASCII = lazy(() => import("../react-bits/GradientASCII"));

// Tonal ramps tuned for the "pinch" wave shape so dark and light themes both
// preserve legible, low-contrast ASCII texture without dark voids or harsh edges.
const DARK_COLORS = ["#2e1065", "#5b21b6", "#7c3aed", "#a855f7", "#c4b5fd"];
const LIGHT_COLORS = ["#f3e8ff", "#ddd6fe", "#c4b5fd", "#a78bfa", "#7c3aed"];
const ASCII_FONT =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

const isCoarsePointer = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(pointer: coarse)").matches ?? false);

const getTargetDpr = (coarse: boolean) =>
  typeof window !== "undefined"
    ? coarse
      ? 1
      : Math.min(window.devicePixelRatio || 1, 1.25)
    : 1;

/**
 * Atmospheric Gradient ASCII background for the Skills section only.
 * - Feathers softly upward across the Experience -> Skills seam and fades to
 *   transparent along all outer edges so there is no detached box boundary.
 * - Preloads once the section is within 900px of the viewport so shaders are
 *   ready before scroll-in, while GradientASCII's own IntersectionObserver
 *   pauses the WebGL loop whenever offscreen.
 * - Cross-fades from a subtle static fallback to the live WebGL canvas once
 *   the first frame draws, and keeps the fallback if WebGL2 fails.
 * - Non-interactive (`pointer-events-none`, `aria-hidden`) so clicks, hover
 *   states, and keyboard focus are never intercepted.
 */
const SkillsBackground = ({ theme }: { theme: "dark" | "light" }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [coarse] = useState(isCoarsePointer);
  const [dpr] = useState(() => getTargetDpr(coarse));
  const isLight = theme === "light";

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const handleReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsReady(false);
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute -top-28 inset-x-0 bottom-0 z-0 select-none"
    >
      {/* Subtle top atmospheric violet bridge connecting Experience -> Skills */}
      <div
        className={`absolute inset-x-0 top-0 h-72 transition-opacity duration-500 ${
          isLight ? "opacity-75" : "opacity-100"
        }`}
        style={{
          background: isLight
            ? "radial-gradient(ellipse 74% 85% at 50% 42%, hsl(var(--primary) / 0.085) 0%, hsl(var(--accent) / 0.035) 48%, transparent 78%)"
            : "radial-gradient(ellipse 76% 85% at 50% 42%, hsl(var(--primary) / 0.14) 0%, hsl(var(--accent) / 0.05) 48%, transparent 78%)",
        }}
      />

      {/* Dual-axis feathered mask: smoothly fades top, bottom, and side edges */}
      <div className="skills-ascii-mask-y absolute inset-0 overflow-hidden">
        <div className="skills-ascii-mask-x absolute inset-0">
          {/* Static fallback: fades out cleanly once WebGL renders its first frame */}
          <div
            className={`skills-ascii-fallback absolute inset-0 transition-opacity duration-700 ${
              isReady && !hasError ? "opacity-0" : "opacity-60"
            }`}
          />

          {shouldMount && !hasError && (
            <Suspense fallback={null}>
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  isReady
                    ? isLight
                      ? "opacity-32"
                      : "opacity-48"
                    : "opacity-0"
                }`}
              >
                <GradientASCII
                  colors={isLight ? LIGHT_COLORS : DARK_COLORS}
                  lightMode={isLight}
                  shape="pinch"
                  characters=" .:-=+*#%@"
                  fontFamily={ASCII_FONT}
                  cellSize={16}
                  density={isLight ? 0.62 : 0.8}
                  glyphOpacity={isLight ? 0.52 : 0.74}
                  gradientOpacity={isLight ? 0.22 : 0.42}
                  glow={isLight ? 0.08 : 0.22}
                  flicker={0.12}
                  softness={0.95}
                  scale={1.85}
                  flow={0.75}
                  speed={0.42}
                  grain={0.03}
                  mouseInteraction={!coarse}
                  scrambleRadius={0.07}
                  clickEffect="none"
                  intro={false}
                  dpr={dpr}
                  onReady={handleReady}
                  onError={handleError}
                />
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SkillsBackground);

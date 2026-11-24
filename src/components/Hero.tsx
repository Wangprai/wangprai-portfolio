import type { CSSProperties } from "react";
import { ArrowDownRight, FileText, Mail, Terminal } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import Aurora from "./react-bits/Aurora";
import BlurText from "./react-bits/BlurText";
import Magnet from "./react-bits/Magnet";

const DARK_AURORA_STOPS = ["#5B21B6", "#8B5CF6", "#C084FC", "#4F46E5"];
const LIGHT_AURORA_STOPS = ["#7C3AED", "#A78BFA", "#C4B5FD", "#818CF8"];

/** Inline style helper for the staggered `.hero-enter` entrance. */
const enter = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const Hero = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-[min(100svh,940px)] flex items-center overflow-hidden section-padding pt-32 md:pt-36 pb-20"
    >
      {/* Static CSS Fallback + React Bits WebGL Aurora Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[-8%] h-[26rem] w-[26rem] md:h-[34rem] md:w-[34rem] rounded-full bg-primary/18 blur-[120px] animate-aurora-float"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[78%] opacity-90"
      >
        <Aurora
          colorStops={isLight ? LIGHT_AURORA_STOPS : DARK_AURORA_STOPS}
          amplitude={isLight ? 0.72 : 0.9}
          blend={isLight ? 0.68 : 0.6}
          speed={0.45}
          height={0.48}
          glow={0.65}
          layers={2}
          opacity={isLight ? 0.34 : 0.52}
          lightMode={isLight}
          dpr={1.5}
          mouseInteraction={false}
          intro={false}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-tech-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_38%,black_30%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-14 items-center">
        {/* Primary Editorial Column */}
        <div className="max-w-2xl">
          <div
            className="hero-enter inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 backdrop-blur-sm px-3.5 py-1.5 mb-6"
            style={enter(0)}
          >
            <Terminal size={14} className="text-primary shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs sm:text-sm font-medium text-primary">
              {t.hero.greeting}
            </span>
          </div>

          <BlurText
            as="h1"
            text={t.hero.name}
            delayMs={80}
            stepMs={120}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-foreground leading-[1.08] mb-4"
          />

          <p
            className="hero-enter text-2xl sm:text-3xl md:text-4xl font-bold text-gradient leading-tight mb-4"
            style={enter(260)}
          >
            {t.hero.tagline}
          </p>

          <p
            className="hero-enter font-mono text-xs sm:text-sm text-primary/90 dark:text-primary mb-5 tracking-tight"
            style={enter(340)}
          >
            {t.hero.subTagline}
          </p>

          <p
            className="hero-enter text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mb-7"
            style={enter(420)}
          >
            {t.hero.description}
          </p>

          {/* Engineering Focus Pills */}
          <ul
            aria-label="Engineering focus areas"
            className="flex flex-wrap gap-2 mb-9"
          >
            {t.hero.focusAreas.map((area, index) => (
              <li
                key={area}
                style={enter(480 + index * 50)}
                className={`hero-enter font-mono text-xs px-3 py-1.5 rounded-lg border transition-colors duration-200 hover:border-primary/60 ${
                  index < 3
                    ? "border-primary/35 bg-primary/10 text-foreground"
                    : "border-border bg-card/70 text-muted-foreground"
                }`}
              >
                {area}
              </li>
            ))}
          </ul>

          {/* Primary Actions */}
          <div
            className="hero-enter flex flex-wrap items-center gap-3.5"
            style={enter(600)}
          >
            <Magnet padding={44} magnetStrength={5} maxOffset={9}>
              <a
                href="#projects"
                className="group/cta relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3.5 text-sm sm:text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow duration-300"
              >
                {/* Subtle sheen sweep on hover/focus */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-120%] group-hover/cta:translate-x-[420%] group-focus-visible/cta:translate-x-[420%] transition-transform duration-700 ease-out"
                />
                <span className="relative">{t.hero.viewWork}</span>
                <ArrowDownRight
                  size={17}
                  aria-hidden="true"
                  className="relative transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:translate-y-0.5"
                />
              </a>
            </Magnet>

            <a
              href="#contact"
              className="group/mail inline-flex items-center justify-center gap-2 rounded-xl border border-primary/50 bg-card/70 backdrop-blur-sm px-6 py-3.5 text-sm sm:text-base font-medium text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
            >
              <Mail
                size={16}
                className="text-primary transition-transform duration-300 group-hover/mail:-rotate-12"
                aria-hidden="true"
              />
              <span>{t.hero.getInTouch}</span>
            </a>

            <a
              href="/docs/Wangprai_Resume-SE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <FileText size={16} aria-hidden="true" />
              <span>{t.hero.viewResume}</span>
            </a>
          </div>
        </div>

        {/* Abstract Futuristic Geometric Visual Accent (Desktop) */}
        <div
          aria-hidden="true"
          className="hero-enter hidden lg:flex items-center justify-center relative"
          style={enter(320)}
        >
          <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
            <div className="absolute inset-2 rounded-full border border-primary/20" />
            <div className="absolute inset-9 rounded-full border border-dashed border-primary/30 animate-spin-slow" />
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent blur-2xl" />

            <Magnet
              padding={90}
              magnetStrength={14}
              maxOffset={6}
              tilt={5}
              exclusive={false}
              wrapperClassName="w-[82%]"
            >
              <div className="relative w-full glass-card p-6 border-primary/30 shadow-2xl shadow-primary/10">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/70">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    profile.ts
                  </span>
                </div>

                <div className="font-mono text-xs leading-6 space-y-1 text-muted-foreground">
                  <p className="hero-enter" style={enter(480)}>
                    <span className="text-primary">const</span>{" "}
                    <span className="text-foreground">engineer</span> = {"{"}
                  </p>
                  <p className="hero-enter pl-4" style={enter(550)}>
                    role: <span className="text-primary">&quot;Software Engineer&quot;</span>,
                  </p>
                  <p className="hero-enter pl-4" style={enter(620)}>
                    focus: [
                    <span className="text-foreground">&quot;Frontend&quot;</span>,{" "}
                    <span className="text-foreground">&quot;Backend&quot;</span>,{" "}
                    <span className="text-foreground">&quot;Full Stack&quot;</span>],
                  </p>
                  <p className="hero-enter pl-4" style={enter(690)}>
                    stack: [
                    <span className="text-foreground">&quot;TypeScript&quot;</span>,{" "}
                    <span className="text-foreground">&quot;React&quot;</span>,{" "}
                    <span className="text-foreground">&quot;Python&quot;</span>],
                  </p>
                  <p className="hero-enter pl-4" style={enter(760)}>
                    background: <span className="text-foreground">&quot;CS · Data &amp; AI&quot;</span>,
                  </p>
                  <p className="hero-enter" style={enter(830)}>
                    {"};"}
                    <span className="ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-primary/80 animate-caret" />
                  </p>
                </div>
              </div>
            </Magnet>
          </div>
        </div>
      </div>

      {/* Scroll cue (tall desktop/tablet viewports only) */}
      <a
        href="#about"
        className="hero-enter group/cue absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:[@media(min-height:820px)]:flex flex-col items-center gap-2 rounded-lg px-2 py-1 font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors"
        style={enter(900)}
      >
        <span
          aria-hidden="true"
          className="flex h-8 w-5 justify-center rounded-full border border-current/50 pt-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-primary animate-scroll-dot" />
        </span>
        <span>{t.hero.scrollCue}</span>
      </a>
    </section>
  );
};

export default Hero;

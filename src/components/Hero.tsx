import { ArrowDownRight, FileText, Mail, Terminal } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import Aurora from "./react-bits/Aurora";
import Magnet from "./react-bits/Magnet";

const DARK_AURORA_STOPS = ["#5B21B6", "#8B5CF6", "#C084FC", "#4F46E5"];
const LIGHT_AURORA_STOPS = ["#7C3AED", "#A78BFA", "#C4B5FD", "#818CF8"];

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
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 backdrop-blur-sm px-3.5 py-1.5 mb-6 animate-fade-in">
            <Terminal size={14} className="text-primary shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs sm:text-sm font-medium text-primary">
              {t.hero.greeting}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-foreground leading-[1.08] mb-4 animate-fade-in-up">
            {t.hero.name}
          </h1>

          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient leading-tight mb-4 animate-fade-in-up">
            {t.hero.tagline}
          </p>

          <p className="font-mono text-xs sm:text-sm text-primary/90 dark:text-primary mb-5 tracking-tight">
            {t.hero.subTagline}
          </p>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mb-7">
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
                className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-colors ${
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
          <div className="flex flex-wrap items-center gap-3.5">
            <Magnet padding={44} magnetStrength={5} maxOffset={9}>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm sm:text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-95 transition-opacity"
              >
                <span>{t.hero.viewWork}</span>
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
            </Magnet>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/50 bg-card/70 backdrop-blur-sm px-6 py-3.5 text-sm sm:text-base font-medium text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
            >
              <Mail size={16} className="text-primary" aria-hidden="true" />
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
          className="hidden lg:flex items-center justify-center relative"
        >
          <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center">
            <div className="absolute inset-2 rounded-full border border-primary/20" />
            <div className="absolute inset-9 rounded-full border border-dashed border-primary/30" />
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/20 via-accent/15 to-transparent blur-2xl" />

            <div className="relative w-[82%] glass-card p-6 border-primary/30 shadow-2xl shadow-primary/10">
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
                <p>
                  <span className="text-primary">const</span>{" "}
                  <span className="text-foreground">engineer</span> = {"{"}
                </p>
                <p className="pl-4">
                  role: <span className="text-primary">&quot;Software Engineer&quot;</span>,
                </p>
                <p className="pl-4">
                  focus: [
                  <span className="text-foreground">&quot;Frontend&quot;</span>,{" "}
                  <span className="text-foreground">&quot;Backend&quot;</span>,{" "}
                  <span className="text-foreground">&quot;Full Stack&quot;</span>],
                </p>
                <p className="pl-4">
                  stack: [
                  <span className="text-foreground">&quot;TypeScript&quot;</span>,{" "}
                  <span className="text-foreground">&quot;React&quot;</span>,{" "}
                  <span className="text-foreground">&quot;Python&quot;</span>],
                </p>
                <p className="pl-4">
                  background: <span className="text-foreground">&quot;CS · Data &amp; AI&quot;</span>,
                </p>
                <p>{"};"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

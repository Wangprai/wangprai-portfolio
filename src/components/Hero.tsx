import { memo, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowDownRight,
  Cpu,
  Database,
  FileText,
  Layers,
  Mail,
  Server,
  Terminal,
} from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import { observeOffscreenPause } from "../utils/viewportObserver";
import Aurora from "./react-bits/Aurora";
import BlurText from "./react-bits/BlurText";
import DecryptedText from "./react-bits/DecryptedText";
import Magnet from "./react-bits/Magnet";
import ParticlesField from "./react-bits/ParticlesField";
import ShinyText from "./react-bits/ShinyText";
import StarBorder from "./react-bits/StarBorder";
import TiltedCard from "./react-bits/TiltedCard";
import { glowOrb } from "../utils/glowOrb";

const HERO_ORB_TOP = glowOrb({ blurPx: 140, radiusPx: 240, radiusMdPx: 320, color: "hsl(var(--primary))", alphaPct: 22 });
const HERO_ORB_BOTTOM = glowOrb({ blurPx: 130, radiusPx: 192, radiusMdPx: 256, color: "hsl(var(--accent))", alphaPct: 14 });
const HERO_CONSOLE_GLOW = glowOrb({
  blurPx: 64,
  radiusPx: 176,
  // Tailwind's bg-gradient-to-tr from-primary/25 via-accent/18 to-sky-400/12, inset by the 3σ glow margin
  fill: "linear-gradient(to top right in oklab, color-mix(in oklab, hsl(var(--primary)) 25%, transparent) 271px, color-mix(in oklab, hsl(var(--accent)) 18%, transparent) 50%, color-mix(in oklab, var(--color-sky-400) 12%, transparent) calc(100% - 271px))",
});

const DARK_AURORA_STOPS = ["#4C1D95", "#7C3AED", "#C084FC", "#38BDF8", "#6D28D9"];
const LIGHT_AURORA_STOPS = ["#7C3AED", "#A78BFA", "#C084FC", "#818CF8"];

const STACK_LAYERS = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Layers,
    items: ["React", "TypeScript", "Tailwind CSS"],
    accent: "text-primary",
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    items: ["ElysiaJS (Bun)", "Node.js", "FastAPI", "Laravel"],
    accent: "text-accent",
  },
  {
    id: "data",
    label: "Data & DB",
    icon: Database,
    items: ["PostgreSQL", "Oracle", "Socket.io"],
    accent: "text-sky-400 dark:text-sky-300",
  },
  {
    id: "ai",
    label: "Applied AI",
    icon: Cpu,
    items: ["PyTorch", "Transformers", "Hugging Face"],
    accent: "text-primary",
  },
] as const;

const enter = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const StackLayerExplorer = memo(() => {
  const [activeLayer, setActiveLayer] = useState<string>("frontend");
  const currentItems = STACK_LAYERS.find((l) => l.id === activeLayer)?.items;

  return (
    <div className="pt-4 border-t border-border/75">
      <div className="grid grid-cols-2 gap-2 mb-3">
        {STACK_LAYERS.map((layer) => {
          const Icon = layer.icon;
          const isSelected = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              type="button"
              onMouseEnter={() => setActiveLayer(layer.id)}
              onFocus={() => setActiveLayer(layer.id)}
              onClick={() => setActiveLayer(layer.id)}
              aria-pressed={isSelected}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-left font-mono text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-primary/60 bg-primary/14 text-foreground shadow-[0_0_20px_-8px_hsl(var(--primary)/0.6)]"
                  : "border-border/70 bg-background/45 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <Icon
                size={13}
                aria-hidden="true"
                className={isSelected ? layer.accent : "text-muted-foreground"}
              />
              <span>{layer.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Layer Readout */}
      <div className="rounded-xl border border-primary/25 bg-background/60 px-3.5 py-2.5 min-h-[46px] flex flex-wrap items-center gap-1.5">
        {currentItems?.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-primary/12 text-primary border border-primary/25"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
});

const Hero = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    return observeOffscreenPause(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="relative min-h-[min(100svh,980px)] flex items-center overflow-hidden section-padding pt-32 md:pt-36 pb-24"
    >
      {/* Layer 1: Deep Atmospheric Violet Backlight Orbs */}
      <div
        aria-hidden="true"
        className="pause-offscreen pointer-events-none absolute -top-36 right-[-6%] h-[30rem] w-[30rem] md:h-[40rem] md:w-[40rem] rounded-full glow-orb animate-aurora-float"
        style={HERO_ORB_TOP}
      />
      <div
        aria-hidden="true"
        className="pause-offscreen pointer-events-none absolute bottom-[-14%] left-[-10%] h-[24rem] w-[24rem] md:h-[32rem] md:w-[32rem] rounded-full glow-orb animate-pulse-glow"
        style={HERO_ORB_BOTTOM}
      />

      {/* Layer 2: Interactive WebGL2 React Bits Aurora */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[86%] opacity-95"
      >
        <Aurora
          colorStops={isLight ? LIGHT_AURORA_STOPS : DARK_AURORA_STOPS}
          amplitude={isLight ? 0.76 : 1.05}
          blend={isLight ? 0.68 : 0.58}
          speed={0.48}
          height={0.54}
          glow={0.85}
          brightness={isLight ? 0.95 : 1.15}
          layers={3}
          opacity={isLight ? 0.36 : 0.62}
          lightMode={isLight}
          dpr={1.5}
          mouseInteraction={true}
          intro={false}
        />
      </div>

      {/* Layer 3: Interactive Violet Constellation Particles Field */}
      <ParticlesField theme={theme} count={46} connectDistance={128} />

      {/* Layer 4: Architectural Grid + Vignette Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-tech-grid [mask-image:radial-gradient(ellipse_78%_68%_at_50%_40%,black_34%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent"
      />

      {/* Foreground Composition */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.18fr_0.82fr] gap-12 lg:gap-14 items-center">
        {/* Left Editorial Hero Column */}
        <div className="max-w-2xl">
          {/* Terminal Greeting Pill */}
          <div
            className="hero-enter inline-flex items-center gap-2.5 rounded-full border border-primary/40 bg-card/75 backdrop-blur-xl px-4 py-1.5 mb-7 shadow-[0_0_24px_-8px_hsl(var(--primary)/0.55)]"
            style={enter(0)}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="pause-offscreen absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Terminal size={13} className="text-primary shrink-0" aria-hidden="true" />
            <DecryptedText
              text={t.hero.greeting}
              speedMs={30}
              className="font-mono text-xs sm:text-sm font-medium text-primary"
            />
          </div>

          {/* Primary Name Display */}
          <BlurText
            as="h1"
            text={t.hero.name}
            delayMs={70}
            stepMs={115}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.35rem] font-bold tracking-tight text-foreground leading-[1.06] mb-4"
          />

          {/* Primary Software Engineer Role with Flowing Metallic Sheen */}
          <div className="hero-enter flex flex-wrap items-center gap-3 mb-4" style={enter(240)}>
            <ShinyText
              as="p"
              durationSeconds={5.2}
              className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold leading-tight tracking-tight"
            >
              {t.hero.tagline}
            </ShinyText>
            <span
              aria-hidden="true"
              className="hidden sm:inline-block h-px w-12 bg-gradient-to-r from-primary/80 to-transparent"
            />
          </div>

          <p
            className="hero-enter font-mono text-xs sm:text-sm text-primary/95 dark:text-primary/95 mb-5 tracking-tight leading-relaxed"
            style={enter(310)}
          >
            {t.hero.subTagline}
          </p>

          <p
            className="hero-enter text-muted-foreground text-base sm:text-[17px] leading-relaxed max-w-xl mb-7"
            style={enter(390)}
          >
            {t.hero.description}
          </p>

          {/* Focus Area Signal Pills */}
          <ul aria-label="Engineering focus areas" className="flex flex-wrap gap-2 mb-9">
            {t.hero.focusAreas.map((area, index) => (
              <li
                key={area}
                style={enter(450 + index * 45)}
                className={`hero-enter inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-250 hover:-translate-y-0.5 ${
                  index < 3
                    ? "border-primary/40 bg-primary/12 text-foreground shadow-[0_0_20px_-10px_hsl(var(--primary)/0.65)] hover:border-primary/80 hover:bg-primary/18"
                    : "border-border/90 bg-card/75 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    index < 3 ? "bg-primary" : "bg-muted-foreground/60"
                  }`}
                />
                {area}
              </li>
            ))}
          </ul>

          {/* Distinctive CTA Row */}
          <div
            className="hero-enter flex flex-wrap items-center gap-3.5"
            style={enter(570)}
          >
            <Magnet padding={48} magnetStrength={4.5} maxOffset={10}>
              <StarBorder speedSeconds={5.5} className="rounded-xl">
                <a
                  href="#projects"
                  className="group/cta relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-primary via-violet-500 to-accent px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-[0_10px_36px_-8px_hsl(var(--primary)/0.72)] hover:shadow-[0_14px_42px_-6px_hsl(var(--primary)/0.9)] transition-all duration-300"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover/cta:translate-x-[420%] group-focus-visible/cta:translate-x-[420%] transition-transform duration-700 ease-out"
                  />
                  <span className="relative">{t.hero.viewWork}</span>
                  <ArrowDownRight
                    size={18}
                    aria-hidden="true"
                    className="relative transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:translate-y-0.5"
                  />
                </a>
              </StarBorder>
            </Magnet>

            <Magnet padding={34} magnetStrength={6} maxOffset={6}>
              <a
                href="#contact"
                className="group/mail inline-flex items-center justify-center gap-2 rounded-xl border border-primary/45 bg-card/75 backdrop-blur-xl px-6 py-3.5 text-sm sm:text-base font-medium text-foreground hover:border-primary hover:bg-primary/12 hover:shadow-[0_0_24px_-8px_hsl(var(--primary)/0.55)] transition-all"
              >
                <Mail
                  size={16}
                  className="text-primary transition-transform duration-300 group-hover/mail:-rotate-12"
                  aria-hidden="true"
                />
                <span>{t.hero.getInTouch}</span>
              </a>
            </Magnet>

            <a
              href="/docs/Wangprai_Resume-SE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group/pdf inline-flex items-center justify-center gap-2 rounded-xl border border-transparent hover:border-border/80 hover:bg-card/60 px-4 py-3.5 text-sm font-medium text-muted-foreground hover:text-primary transition-all"
            >
              <FileText
                size={16}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/pdf:-translate-y-0.5"
              />
              <span>{t.hero.viewResume}</span>
            </a>
          </div>
        </div>

        {/* Right Interactive 3D Engineering Spatial Console (Desktop & Large Tablet) */}
        <div
          className="hero-enter relative hidden lg:flex items-center justify-center"
          style={enter(280)}
        >
          <div className="relative w-full max-w-[430px] py-4 flex items-center justify-center">
            {/* Dual Counter-Rotating Orbital Rings */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-full border border-primary/18"
            />
            <div
              aria-hidden="true"
              className="pause-offscreen pointer-events-none absolute inset-2 rounded-full border border-dashed border-primary/32 animate-spin-slow"
            />
            <div
              aria-hidden="true"
              className="pause-offscreen pointer-events-none absolute inset-10 rounded-full border border-dotted border-accent/28 animate-spin-reverse"
            />
            <div
              aria-hidden="true"
              className="pause-offscreen pointer-events-none absolute inset-12 rounded-full glow-orb animate-pulse-glow"
              style={HERO_CONSOLE_GLOW}
            />

            <TiltedCard maxTilt={7} scaleOnHover={1.02} glareOpacity={0.22} className="w-full">
              <StarBorder speedSeconds={8} className="rounded-2xl">
                <div className="relative w-full glass-card rounded-2xl p-6 border-primary/35 shadow-[0_28px_70px_-24px_hsl(263_85%_8%/0.8)]">
                  {/* Console Window Bar */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/75">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400/70" />
                    </div>
                    <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
                      engineer.architecture.ts
                    </span>
                  </div>

                  {/* Typed Profile Definition */}
                  <div className="font-mono text-xs leading-6 space-y-1 text-muted-foreground mb-5">
                    <p className="hero-enter" style={enter(460)}>
                      <span className="text-primary">export const</span>{" "}
                      <span className="text-foreground font-semibold">wangprai</span> = {"{"}
                    </p>
                    <p className="hero-enter pl-4" style={enter(520)}>
                      role: <span className="text-primary">&quot;Software Engineer&quot;</span>,
                    </p>
                    <p className="hero-enter pl-4" style={enter(580)}>
                      focus: [
                      <span className="text-foreground">&quot;Frontend&quot;</span>,{" "}
                      <span className="text-foreground">&quot;Backend&quot;</span>,{" "}
                      <span className="text-foreground">&quot;Full Stack&quot;</span>],
                    </p>
                    <p className="hero-enter pl-4" style={enter(640)}>
                      education: <span className="text-foreground">&quot;B.S. CS · KKU&quot;</span>,
                    </p>
                    <p className="hero-enter pl-4" style={enter(700)}>
                      appliedAI: <span className="text-accent">&quot;NLP · Document AI&quot;</span>,
                    </p>
                    <p className="hero-enter" style={enter(760)}>
                      {"};"}
                      <span className="pause-offscreen ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-primary animate-caret" />
                    </p>
                  </div>

                  {/* Interactive Stack Layer Explorer */}
                  <StackLayerExplorer />
                </div>
              </StarBorder>
            </TiltedCard>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Tall Viewports) */}
      <a
        href="#about"
        className="hero-enter group/cue absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:[@media(min-height:800px)]:flex flex-col items-center gap-2 rounded-lg px-3 py-1 font-mono text-[11px] text-muted-foreground hover:text-primary transition-colors"
        style={enter(860)}
      >
        <span
          aria-hidden="true"
          className="flex h-8 w-5 justify-center rounded-full border border-current/50 pt-1.5 group-hover/cue:border-primary transition-colors"
        >
          <span className="pause-offscreen h-1.5 w-1 rounded-full bg-primary animate-scroll-dot" />
        </span>
        <span>{t.hero.scrollCue}</span>
      </a>
    </section>
  );
};

export default Hero;

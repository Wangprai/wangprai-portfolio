import type { CSSProperties } from "react";
import { Building2, Calendar, TrendingUp } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import ScrollReveal from "./motion/ScrollReveal";
import CountUp from "./react-bits/CountUp";
import SpotlightCard from "./react-bits/SpotlightCard";
import StarBorder from "./react-bits/StarBorder";
import SectionHeading from "./SectionHeading";
import { glowOrb } from "../utils/glowOrb";

const EXPERIENCE_ORB = glowOrb({ blurPx: 130, radiusPx: 208, color: "hsl(var(--accent))", alphaPct: 10 });

const INTERNSHIP_STACK = [
  "TypeScript",
  "React",
  "ElysiaJS",
  "PHP",
  "Laravel",
  "PostgreSQL",
  "Oracle",
  "Donut Model",
] as const;

const parseAccuracyRange = (value: string) => {
  const match = value.match(/(\d+)%\s*([^\d\s%]+)\s*(\d+)%/);
  if (!match) return null;
  return {
    from: Number(match[1]),
    arrow: match[2],
    to: Number(match[3]),
  };
};

const Experience = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();
  const highlight = parseAccuracyRange(t.experience.highlightValue);

  const jobs = [
    {
      role: t.experience.jobs.intern.role,
      company: "Daikin Industries (Thailand) Ltd.",
      period: t.experience.jobs.intern.period,
      bullets: t.experience.jobs.intern.bullets,
    },
  ];

  return (
    <section id="experience" className="section-horizon section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-[26rem] w-[26rem] rounded-full glow-orb"
        style={EXPERIENCE_ORB}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="02"
            title={t.experience.title}
            subtitle={t.experience.subtitle}
          />
        </ScrollReveal>

        <ScrollReveal delayMs={70} className="relative pl-6 sm:pl-10 space-y-8">
          {/* Glowing Vertical Timeline Conduit */}
          <span
            aria-hidden="true"
            className="reveal-line-y absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-primary via-accent/60 to-primary/10 shadow-[0_0_14px_hsl(var(--primary)/0.6)]"
          />

          {jobs.map((job) => (
            <div key={job.company + job.period} className="relative">
              {/* Pulsing Timeline Node */}
              <span
                aria-hidden="true"
                className="absolute -left-[31px] sm:-left-[47px] top-9 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background shadow-[0_0_20px_hsl(var(--primary)/0.85)]"
              >
                <span className="absolute inset-0 rounded-full bg-primary/65 animate-ping [animation-iteration-count:3]" />
              </span>

              <StarBorder speedSeconds={9} className="rounded-2xl">
                <SpotlightCard
                  theme={theme}
                  spotlightColor={theme === "dark" ? "#a855f7" : "#7c3aed"}
                  intensity={theme === "dark" ? 0.14 : 0.1}
                  borderGlow={0.7}
                  spotlightSize={320}
                  className="p-6 sm:p-8 lg:p-9"
                >
                  {/* Header Grid: Identity + Verified Accuracy Metric Pod */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-7 mb-7 border-b border-border/75">
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/14 text-primary border border-primary/35">
                          {t.experience.internshipBadge}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground bg-secondary/60 border border-border/70 px-3 py-1 rounded-full">
                          <Calendar size={13} className="text-primary" aria-hidden="true" />
                          {job.period}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                        {job.role}
                      </h3>

                      <p className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-gradient">
                        <Building2 size={17} className="text-primary shrink-0" aria-hidden="true" />
                        <span>{job.company}</span>
                      </p>
                    </div>

                    {/* Verified Factual Donut Accuracy Pod */}
                    <div className="lg:min-w-[270px] rounded-2xl border border-primary/35 bg-gradient-to-br from-primary/12 via-background/70 to-accent/10 p-4 sm:p-5 shadow-[0_10px_30px_-14px_hsl(var(--primary)/0.45)]">
                      <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-muted-foreground mb-2">
                        <span className="inline-flex items-center gap-1.5">
                          <TrendingUp size={13} className="text-primary" aria-hidden="true" />
                          <span>{t.experience.highlightLabel}</span>
                        </span>
                      </div>

                      <p className="font-mono text-2xl sm:text-[1.7rem] font-bold text-foreground tracking-tight mb-3">
                        {highlight ? (
                          <>
                            <span className="sr-only">{t.experience.highlightValue}</span>
                            <span aria-hidden="true" className="inline-flex items-baseline gap-2">
                              <span className="text-muted-foreground text-lg font-semibold">
                                {highlight.from}%
                              </span>
                              <span className="text-primary text-base">{highlight.arrow}</span>
                              <span className="text-primary">
                                <CountUp from={highlight.from} to={highlight.to} />%
                              </span>
                            </span>
                          </>
                        ) : (
                          t.experience.highlightValue
                        )}
                      </p>

                      {/* Proportional Visual Comparison for 87% -> 92% */}
                      {highlight && (
                        <div aria-hidden="true" className="space-y-1.5">
                          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full rounded-full bg-muted-foreground/45"
                              style={{ width: `${highlight.from}%` }}
                            />
                          </div>
                          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-sky-400 shadow-[0_0_12px_hsl(var(--primary)/0.75)]"
                              style={{ width: `${highlight.to}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3-Pillar Engineering Deliverables Grid */}
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
                    {job.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="reveal-item group/pillar rounded-xl border border-border/75 bg-background/50 hover:border-primary/45 hover:bg-primary/[0.06] p-4 sm:p-5 transition-all duration-250 flex flex-col gap-3"
                        style={{ "--i": idx, "--base": "180ms" } as CSSProperties}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] font-semibold text-primary bg-primary/12 border border-primary/25 px-2 py-0.5 rounded-md">
                            0{idx + 1}
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground truncate">
                            {t.experience.deliverableTags[idx]}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground group-hover/pillar:text-foreground/95 leading-relaxed transition-colors">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Verified Stack Used in Role */}
                  <div className="pt-5 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground shrink-0">
                      {t.experience.stackLabel}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {INTERNSHIP_STACK.map((tech, idx) => (
                        <li
                          key={tech}
                          className="reveal-item font-mono text-xs px-3 py-1 rounded-lg bg-secondary/80 text-secondary-foreground border border-border/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:bg-primary/10"
                          style={{ "--i": idx * 0.5, "--base": "320ms" } as CSSProperties}
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </StarBorder>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Experience;

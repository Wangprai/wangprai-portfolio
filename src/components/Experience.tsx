import type { CSSProperties } from "react";
import { Building2, Calendar, TrendingUp } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import ScrollReveal from "./motion/ScrollReveal";
import CountUp from "./react-bits/CountUp";
import SectionHeading from "./SectionHeading";

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
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="02"
            title={t.experience.title}
            subtitle={t.experience.subtitle}
          />
        </ScrollReveal>

        <ScrollReveal delayMs={70} className="relative pl-6 sm:pl-9 space-y-8">
          {/* Timeline rail draws downward on reveal */}
          <span
            aria-hidden="true"
            className="reveal-line-y absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/70 via-primary/35 to-primary/10"
          />
          {jobs.map((job) => (
            <div key={job.company + job.period}>
              <article className="group/job relative glass-card p-6 sm:p-8 hover:border-primary/45 transition-colors duration-300">
                {/* Timeline node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] sm:-left-[43px] top-8 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary ring-4 ring-background shadow-[0_0_16px_hsl(var(--primary)/0.65)]"
                >
                  <span className="absolute inset-0 rounded-full bg-primary/60 animate-ping [animation-iteration-count:3]" />
                </span>

                {/* Top Metadata Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-6 mb-6 border-b border-border/70">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/12 text-primary border border-primary/25">
                        {t.experience.internshipBadge}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                        <Calendar size={13} className="text-primary" aria-hidden="true" />
                        {job.period}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {job.role}
                    </h3>
                    <p className="mt-1 inline-flex items-center gap-2 text-sm sm:text-base font-medium text-primary">
                      <Building2 size={15} aria-hidden="true" />
                      <span>{job.company}</span>
                    </p>
                  </div>

                  {/* Verified Factual Accuracy Outcome Callout */}
                  <div className="self-start rounded-xl border border-primary/30 bg-primary/8 px-4 py-3">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground mb-0.5">
                      <TrendingUp size={13} className="text-primary" aria-hidden="true" />
                      <span>{t.experience.highlightLabel}</span>
                    </div>
                    <p className="font-mono text-lg sm:text-xl font-bold text-primary">
                      {highlight ? (
                        <>
                          <span className="sr-only">{t.experience.highlightValue}</span>
                          <span aria-hidden="true">
                            {highlight.from}% {highlight.arrow}{" "}
                            <CountUp from={highlight.from} to={highlight.to} />%
                          </span>
                        </>
                      ) : (
                        t.experience.highlightValue
                      )}
                    </p>
                  </div>
                </div>

                {/* Contributions */}
                <ul className="space-y-3.5 mb-6">
                  {job.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="reveal-item flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
                      style={{ "--i": idx, "--base": "220ms" } as CSSProperties}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Verified Technologies Used in Role */}
                <div className="pt-5 border-t border-border/60">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                    {t.experience.stackLabel}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {INTERNSHIP_STACK.map((tech, idx) => (
                      <li
                        key={tech}
                        className="reveal-item font-mono text-xs px-3 py-1 rounded-lg bg-secondary/75 text-secondary-foreground border border-border/70 transition-colors duration-200 hover:border-primary/50 hover:text-primary"
                        style={{ "--i": idx * 0.6, "--base": "420ms" } as CSSProperties}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Experience;

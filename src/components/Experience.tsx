import { Building2, Calendar, TrendingUp } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import ScrollReveal from "./motion/ScrollReveal";
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

const Experience = () => {
  const { t } = usePersonalData();

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

        <div className="relative pl-6 sm:pl-9 border-l border-primary/30 space-y-8">
          {jobs.map((job) => (
            <ScrollReveal key={job.company + job.period} delayMs={70}>
              <article className="relative glass-card p-6 sm:p-8 hover:border-primary/45 transition-colors duration-300">
                {/* Timeline node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] sm:-left-[43px] top-8 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary ring-4 ring-background shadow-[0_0_16px_hsl(var(--primary)/0.65)]"
                />

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
                      {t.experience.highlightValue}
                    </p>
                  </div>
                </div>

                {/* Contributions */}
                <ul className="space-y-3.5 mb-6">
                  {job.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
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
                    {INTERNSHIP_STACK.map((tech) => (
                      <li
                        key={tech}
                        className="font-mono text-xs px-3 py-1 rounded-lg bg-secondary/75 text-secondary-foreground border border-border/70"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

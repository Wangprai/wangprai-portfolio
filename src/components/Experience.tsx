import { usePersonalData } from "../hooks/usePersonalData";

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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <span className="font-mono text-primary text-lg">03.</span>
          {t.experience.title}
          <span className="hidden md:block h-px bg-border flex-1 ml-4" />
        </h2>
        <div className="mt-10 space-y-6">
          {jobs.map((job) => (
            <div key={job.company + job.period} className="glass-card p-6 md:p-8 hover:border-primary/30 transition-colors duration-300">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {job.role} <span className="text-primary">@ {job.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
              </div>
              <ul className="space-y-2">
                {job.bullets.map((b, i) => (
                  <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                    <span className="text-primary mt-1">▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
import { usePersonalData } from "../hooks/usePersonalData";

const Education = () => {
  const { t } = usePersonalData();

  return (
    <section id="education" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <span className="font-mono text-primary text-lg">02.</span>
          {t.education.title}
          <span className="hidden md:block h-px bg-border flex-1 ml-4" />
        </h2>
        <div className="mt-10 space-y-6">
          <div className="glass-card p-6 md:p-8 hover:border-primary/30 transition-colors duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {t.education.degree}
            </h3>
            <p className="text-sm text-primary mb-2">
              {t.education.university}
            </p>
            <span className="font-mono text-xs text-muted-foreground">
              {t.education.graduation}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

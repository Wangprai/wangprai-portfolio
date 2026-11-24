import { GraduationCap } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import ScrollReveal from "./motion/ScrollReveal";
import SectionHeading from "./SectionHeading";

const Education = () => {
  const { t } = usePersonalData();

  return (
    <section id="education" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="05"
            title={t.education.title}
            subtitle={t.education.subtitle}
          />
        </ScrollReveal>

        <ScrollReveal delayMs={70}>
          <div className="glass-card p-6 sm:p-8 md:p-9 hover:border-primary/45 transition-colors duration-300 grid md:grid-cols-[auto_1fr_auto] gap-6 items-start md:items-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/12 border border-primary/30 text-primary shrink-0">
              <GraduationCap size={26} aria-hidden="true" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-snug">
                {t.education.degree}
              </h3>
              <p className="text-sm sm:text-base font-medium text-primary">
                {t.education.university}
              </p>
            </div>

            <div className="flex flex-wrap md:flex-col md:items-end gap-2">
              <span className="font-mono text-xs font-medium px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary">
                {t.education.graduation}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Education;

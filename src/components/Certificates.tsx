import { Award, Calendar } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import ScrollReveal from "./motion/ScrollReveal";
import SectionHeading from "./SectionHeading";

const Certificates = () => {
  const { t } = usePersonalData();

  return (
    <section id="certificates" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="06"
            title={t.certificates.title}
            subtitle={t.certificates.subtitle}
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {t.certificates.items.map((cert, index) => (
            <ScrollReveal key={cert.name} delayMs={index * 70}>
              <article className="h-full glass-card p-6 sm:p-7 hover:border-primary/45 transition-colors duration-300 flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/12 border border-primary/30 text-primary shrink-0 mt-0.5">
                  <Award size={20} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                      <Calendar size={12} aria-hidden="true" />
                      {cert.date}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cert.issuer}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;

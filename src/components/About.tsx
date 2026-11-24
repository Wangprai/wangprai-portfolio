import { Briefcase, GraduationCap, Layers } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import profile from "../assets/profile.png";
import ScrollReveal from "./motion/ScrollReveal";
import SectionHeading from "./SectionHeading";

const About = () => {
  const { t } = usePersonalData();

  const snapshotItems = [
    {
      icon: GraduationCap,
      label: t.about.snapshot.degreeLabel,
      value: t.about.snapshot.degreeValue,
    },
    {
      icon: Briefcase,
      label: t.about.snapshot.experienceLabel,
      value: t.about.snapshot.experienceValue,
    },
    {
      icon: Layers,
      label: t.about.snapshot.focusLabel,
      value: t.about.snapshot.focusValue,
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="01"
            title={t.about.title}
            subtitle={t.about.subtitle}
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1.35fr_0.85fr] gap-10 lg:gap-14 items-start">
          {/* Editorial Storytelling Column */}
          <ScrollReveal delayMs={60} className="order-2 lg:order-1 space-y-5">
            <p className="text-base sm:text-lg text-foreground/95 leading-relaxed font-medium">
              {t.about.p1}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t.about.p2}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t.about.p3}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t.about.p4}
            </p>
          </ScrollReveal>

          {/* Framed Portrait & Factual Snapshot */}
          <ScrollReveal delayMs={120} className="order-1 lg:order-2 flex flex-col items-center lg:items-stretch gap-6">
            <div className="relative group w-56 h-56 sm:w-64 sm:h-64 lg:w-full lg:max-w-[290px] lg:mx-auto lg:h-auto lg:aspect-square">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/35 via-accent/20 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl border border-primary/50 translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"
              />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
                <img
                  src={profile}
                  alt="Wangprai Jullapech"
                  width={290}
                  height={290}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-full glass-card p-5 space-y-3.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                {t.about.snapshot.title}
              </p>
              <dl className="space-y-3">
                {snapshotItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon size={14} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <dt className="font-mono text-[11px] text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;

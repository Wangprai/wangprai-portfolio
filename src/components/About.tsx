import type { CSSProperties } from "react";
import { Briefcase, GraduationCap, Layers } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import profile from "../assets/profile.png";
import ScrollReveal from "./motion/ScrollReveal";
import SectionHeading from "./SectionHeading";

const About = () => {
  const { t } = usePersonalData();

  const snapshotItems = [
    {
      id: "degree",
      icon: GraduationCap,
      label: t.about.snapshot.degreeLabel,
      value: t.about.snapshot.degreeValue,
    },
    {
      id: "experience",
      icon: Briefcase,
      label: t.about.snapshot.experienceLabel,
      value: t.about.snapshot.experienceValue,
    },
    {
      id: "focus",
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
            <p
              className="reveal-item text-base sm:text-lg text-foreground/95 leading-relaxed font-medium"
              style={{ "--i": 0 } as CSSProperties}
            >
              {t.about.p1}
            </p>
            {[t.about.p2, t.about.p3, t.about.p4].map((paragraph, idx) => (
              <p
                key={idx}
                className="reveal-item text-sm sm:text-base text-muted-foreground leading-relaxed"
                style={{ "--i": idx + 1 } as CSSProperties}
              >
                {paragraph}
              </p>
            ))}
          </ScrollReveal>

          {/* Framed Portrait & Factual Snapshot */}
          <ScrollReveal
            delayMs={120}
            variant="scale"
            className="order-1 lg:order-2 flex flex-col items-center lg:items-stretch gap-6"
          >
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
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>

            <div className="w-full glass-card p-5 space-y-3.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                {t.about.snapshot.title}
              </p>
              <dl className="space-y-3">
                {snapshotItems.map(({ id, icon: Icon, label, value }, idx) => (
                  <div
                    key={id}
                    className="reveal-item group/snap flex items-start gap-3"
                    style={{ "--i": idx, "--base": "260ms" } as CSSProperties}
                  >
                    <span className="mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary shrink-0 transition-colors duration-300 group-hover/snap:bg-primary group-hover/snap:text-primary-foreground">
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

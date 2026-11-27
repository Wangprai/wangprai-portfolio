import type { CSSProperties } from "react";
import { Award, Calendar, GraduationCap, Landmark } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import ScrollReveal from "./motion/ScrollReveal";
import SpotlightCard from "./react-bits/SpotlightCard";
import SectionHeading from "./SectionHeading";
import { glowOrb } from "../utils/glowOrb";

const EDUCATION_ORB = glowOrb({ blurPx: 120, radiusPx: 176, color: "hsl(var(--primary))", alphaPct: 10 });

const Education = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();

  return (
    <section id="education" className="section-horizon section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-[22rem] w-[22rem] rounded-full glow-orb"
        style={EDUCATION_ORB}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="05"
            title={t.education.title}
            subtitle={t.education.subtitle}
          />
        </ScrollReveal>

        <ScrollReveal delayMs={70} variant="blur">
          <SpotlightCard
            theme={theme}
            spotlightColor={theme === "dark" ? "#a855f7" : "#7c3aed"}
            intensity={theme === "dark" ? 0.16 : 0.11}
            borderGlow={0.72}
            spotlightSize={320}
            className="group relative p-7 sm:p-9 md:p-11 overflow-hidden"
          >
            {/* Subtle Architectural Monogram Watermark */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute -right-4 -bottom-6 font-display text-[7rem] sm:text-[9.5rem] font-bold tracking-tighter leading-none text-primary/[0.06] dark:text-primary/[0.07]"
            >
              2025
            </div>

            {/* Top Left Accent Stripe */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary via-accent to-transparent"
            />

            <div className="relative z-10 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-start md:items-center">
              {/* Academic Crest Pod */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/15 border border-primary/40 text-primary shrink-0 shadow-[0_0_28px_-8px_hsl(var(--primary)/0.75)] transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                <GraduationCap size={30} aria-hidden="true" />
              </div>

              {/* Degree & Institution Hierarchy */}
              <div className="space-y-2.5">
                <div
                  className="reveal-item flex flex-wrap items-center gap-2"
                  style={{ "--i": 0, "--base": "90ms" } as CSSProperties}
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/35 bg-primary/14 text-primary">
                    <Award size={12} aria-hidden="true" />
                    {t.education.honorsTag}
                  </span>
                </div>

                <h3
                  className="reveal-item text-xl sm:text-2xl md:text-[1.75rem] font-bold text-foreground leading-snug tracking-tight"
                  style={{ "--i": 1, "--base": "90ms" } as CSSProperties}
                >
                  {t.education.degree}
                </h3>

                <p
                  className="reveal-item inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-gradient"
                  style={{ "--i": 2, "--base": "90ms" } as CSSProperties}
                >
                  <Landmark size={16} className="text-primary shrink-0" aria-hidden="true" />
                  <span>{t.education.university}</span>
                </p>
              </div>

              {/* Graduation Stamp */}
              <div
                className="reveal-item flex flex-wrap md:flex-col md:items-end gap-2"
                style={{ "--i": 3, "--base": "90ms" } as CSSProperties}
              >
                <span className="inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] font-semibold px-4 py-2 rounded-xl border border-primary/35 bg-background/75 text-foreground shadow-[0_6px_20px_-10px_hsl(var(--primary)/0.5)]">
                  <Calendar size={14} className="text-primary" aria-hidden="true" />
                  <span>{t.education.graduation}</span>
                </span>
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Education;

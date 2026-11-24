import type { CSSProperties } from "react";
import { Award, Calendar, ShieldCheck } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import ScrollReveal from "./motion/ScrollReveal";
import SpotlightCard from "./react-bits/SpotlightCard";
import TiltedCard from "./react-bits/TiltedCard";
import SectionHeading from "./SectionHeading";

const Certificates = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();

  return (
    <section id="certificates" className="section-horizon section-padding relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="06"
            title={t.certificates.title}
            subtitle={t.certificates.subtitle}
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {t.certificates.items.map((cert, index) => (
            <ScrollReveal key={cert.name} delayMs={index * 90} variant="scale">
              <TiltedCard maxTilt={5} scaleOnHover={1.015} glareOpacity={0.16} className="h-full">
                <SpotlightCard
                  theme={theme}
                  spotlightColor={theme === "dark" ? "#c084fc" : "#7c3aed"}
                  intensity={theme === "dark" ? 0.16 : 0.1}
                  borderGlow={0.75}
                  spotlightSize={250}
                  className="group relative h-full p-6 sm:p-7 pl-8 sm:pl-9 overflow-hidden"
                >
                  {/* Vertical Credential Ribbon Bar */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-accent to-primary/30"
                  />

                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Seal Badge */}
                    <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/14 border border-primary/35 text-primary shrink-0 mt-0.5 shadow-[0_0_22px_-8px_hsl(var(--primary)/0.65)] transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Award size={22} aria-hidden="true" />
                    </div>

                    <div className="min-w-0 flex-1 space-y-2.5">
                      <div
                        className="reveal-item flex flex-wrap items-center justify-between gap-2"
                        style={{ "--i": 0, "--base": "90ms" } as CSSProperties}
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          CERT // 0{index + 1}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-primary bg-primary/12 border border-primary/25 px-2.5 py-0.5 rounded-full">
                          <Calendar size={12} aria-hidden="true" />
                          {cert.date}
                        </span>
                      </div>

                      <h3
                        className="reveal-item text-lg sm:text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors"
                        style={{ "--i": 1, "--base": "90ms" } as CSSProperties}
                      >
                        {cert.name}
                      </h3>

                      <p
                        className="reveal-item inline-flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                        style={{ "--i": 2, "--base": "90ms" } as CSSProperties}
                      >
                        <ShieldCheck
                          size={15}
                          className="text-primary shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{cert.issuer}</span>
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;

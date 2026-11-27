import type { CSSProperties } from "react";
import { Briefcase, GraduationCap, Layers, Sparkles } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import profile from "../assets/profile.png";
import profileWebp from "../assets/profile.webp";
import ScrollReveal from "./motion/ScrollReveal";
import SpotlightCard from "./react-bits/SpotlightCard";
import TiltedCard from "./react-bits/TiltedCard";
import SectionHeading from "./SectionHeading";

const About = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();

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
    <section id="about" className="section-horizon section-padding relative overflow-hidden">
      {/* Subtle Ambient Violet Depth Pool */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-[-12%] h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[130px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="01"
            title={t.about.title}
            subtitle={t.about.subtitle}
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-10 lg:gap-14 items-start">
          {/* Editorial Storytelling Column */}
          <ScrollReveal delayMs={60} className="order-2 lg:order-1 space-y-6">
            {/* Lead Editorial Statement with Luminous Vertical Bar */}
            <div
              className="reveal-item relative pl-5 sm:pl-6 border-l-2 border-primary/80"
              style={{ "--i": 0 } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-[3px] top-0 h-12 w-[4px] rounded-full bg-gradient-to-b from-primary via-accent to-transparent blur-[2px]"
              />
              <p className="text-lg sm:text-xl md:text-[1.35rem] text-foreground font-semibold leading-relaxed">
                {t.about.p1}
              </p>
            </div>

            {/* Narrative Body */}
            <div className="space-y-4.5 pl-0 sm:pl-6">
              {[t.about.p2, t.about.p3].map((paragraph, idx) => (
                <p
                  key={idx}
                  className="reveal-item text-sm sm:text-base text-muted-foreground leading-relaxed"
                  style={{ "--i": idx + 1 } as CSSProperties}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Closing Engineering Perspective Callout */}
            <div
              className="reveal-item relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/80 to-accent/6 p-5 sm:p-6"
              style={{ "--i": 3 } as CSSProperties}
            >
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 text-primary">
                  <Sparkles size={15} aria-hidden="true" />
                </span>
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                  {t.about.p4}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Framed 3D Portrait & Factual Profile Snapshot */}
          <ScrollReveal
            delayMs={120}
            variant="scale"
            className="order-1 lg:order-2 flex flex-col items-center lg:items-stretch gap-6"
          >
            {/* Interactive 3D Holographic Portrait Frame */}
            <div className="w-60 sm:w-68 lg:w-full lg:max-w-[320px] mx-auto">
              <TiltedCard maxTilt={8} scaleOnHover={1.02} glareOpacity={0.2}>
                <div className="relative group aspect-square rounded-2xl">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/35 via-accent/20 to-sky-400/15 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl border border-primary/45 translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"
                  />
                  <div className="hud-corners relative w-full h-full rounded-2xl overflow-hidden border border-primary/35 bg-card shadow-2xl">
                    <picture>
                      <source srcSet={profileWebp} type="image/webp" />
                      <img
                        src={profile}
                        alt="Wangprai Jullapech"
                        width={320}
                        height={320}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </picture>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/85 via-background/30 to-transparent"
                    />
                    <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-md bg-background/75 border border-primary/35 text-primary font-semibold">
                        Wangprai J.
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-background/70 border border-border/70 text-muted-foreground">
                        B.S. CS · 2025
                      </span>
                    </div>
                  </div>
                </div>
              </TiltedCard>
            </div>

            {/* Factual Snapshot Card */}
            <SpotlightCard
              theme={theme}
              spotlightColor={theme === "dark" ? "#a855f7" : "#7c3aed"}
              intensity={theme === "dark" ? 0.14 : 0.1}
              borderGlow={0.6}
              spotlightSize={220}
              className="w-full p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/70">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">
                  {t.about.snapshot.title}
                </p>
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              </div>

              <dl className="space-y-3.5">
                {snapshotItems.map(({ id, icon: Icon, label, value }, idx) => (
                  <div
                    key={id}
                    className="reveal-item group/snap flex items-start gap-3"
                    style={{ "--i": idx, "--base": "220ms" } as CSSProperties}
                  >
                    <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-xl bg-primary/12 border border-primary/25 text-primary shrink-0 transition-all duration-300 group-hover/snap:bg-primary group-hover/snap:text-primary-foreground group-hover/snap:scale-105">
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="text-xs sm:text-sm font-medium text-foreground leading-snug mt-0.5">
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;

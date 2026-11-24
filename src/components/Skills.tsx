import { useState, type CSSProperties } from "react";
import { BrainCircuit, Code2, Layers, Sparkles, Wrench } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import ScrollReveal from "./motion/ScrollReveal";
import SpotlightCard from "./react-bits/SpotlightCard";
import SectionHeading from "./SectionHeading";

const Skills = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const mainCategories = [
    {
      id: "languages",
      title: t.skills.languages,
      icon: Code2,
      colSpan: "md:col-span-5",
      featured: true,
      accentBar: "from-primary via-violet-400 to-transparent",
      skills: ["Python", "JavaScript", "TypeScript", "Java (Basic)", "PHP", "SQL"],
    },
    {
      id: "devframeworks",
      title: t.skills.devframeworks,
      icon: Layers,
      colSpan: "md:col-span-7",
      featured: true,
      accentBar: "from-accent via-primary to-sky-400/70",
      skills: ["React", "Node.js", "Express", "Elysia.js (Bun)", "Tailwind CSS", "FastAPI"],
    },
    {
      id: "tools",
      title: t.skills.tools,
      icon: Wrench,
      colSpan: "md:col-span-6",
      featured: false,
      accentBar: "from-primary/70 via-border to-transparent",
      skills: ["Git", "Docker", "Hugging Face", "PostgreSQL", "Oracle", "JWT"],
    },
    {
      id: "dsaiframeworks",
      title: t.skills.dsaiframeworks,
      icon: BrainCircuit,
      colSpan: "md:col-span-6",
      featured: false,
      accentBar: "from-sky-400/70 via-primary/50 to-transparent",
      skills: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "PyTorch"],
    },
  ];

  const learningSkills = ["Go", "Next.js", "NestJS"];

  return (
    <section id="skills" className="section-horizon section-padding relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-20 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[140px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="03"
            title={t.skills.title}
            subtitle={t.skills.subtitle}
          />
        </ScrollReveal>

        {/* Interactive Category Focus Controls */}
        <ScrollReveal delayMs={40} className="mb-7">
          <div
            role="group"
            aria-label={t.skills.title}
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              aria-pressed={activeCategory === "all"}
              className={`font-mono text-xs px-3.5 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeCategory === "all"
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_0_20px_-6px_hsl(var(--primary)/0.75)] font-semibold"
                  : "border-border/80 bg-card/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {t.skills.allFilter}
            </button>
            {mainCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(isSelected ? "all" : cat.id)}
                  aria-pressed={isSelected}
                  className={`font-mono text-xs px-3.5 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/15 text-primary shadow-[0_0_18px_-6px_hsl(var(--primary)/0.55)] font-semibold"
                      : "border-border/80 bg-card/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Asymmetric Architectural Bento Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {mainCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isDimmed = activeCategory !== "all" && activeCategory !== cat.id;
            const isHighlighted = activeCategory === cat.id;

            return (
              <ScrollReveal
                key={cat.id}
                delayMs={idx * 55}
                variant="blur"
                className={`${cat.colSpan} transition-opacity duration-300 ${
                  isDimmed ? "opacity-40" : "opacity-100"
                }`}
              >
                <SpotlightCard
                  theme={theme}
                  spotlightColor={theme === "dark" ? "#a855f7" : "#7c3aed"}
                  intensity={cat.featured ? (theme === "dark" ? 0.18 : 0.12) : 0.12}
                  borderGlow={isHighlighted ? 0.95 : cat.featured ? 0.72 : 0.55}
                  spotlightSize={260}
                  className={`group h-full p-6 sm:p-7 transition-transform duration-300 hover:-translate-y-1 ${
                    isHighlighted ? "ring-1 ring-primary/60" : ""
                  }`}
                >
                  {/* Top Luminous Gradient Edge Accent */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${cat.accentBar}`}
                  />

                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:scale-105 shrink-0 ${
                          cat.featured
                            ? "bg-primary/14 border-primary/35 text-primary shadow-[0_0_20px_-8px_hsl(var(--primary)/0.65)]"
                            : "bg-secondary/80 border-border text-primary"
                        }`}
                      >
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <h3 className="font-mono text-sm sm:text-[15px] font-semibold text-foreground leading-snug">
                        {cat.title}
                      </h3>
                    </div>

                    <span className="font-mono text-[11px] text-muted-foreground px-2 py-0.5 rounded-md bg-secondary/65 border border-border/70 shrink-0">
                      {cat.skills.length}
                    </span>
                  </div>

                  <ul className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, skillIdx) => (
                      <li
                        key={skill}
                        style={{ "--i": skillIdx * 0.5, "--base": "90ms" } as CSSProperties}
                        className={`reveal-item group/chip inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] px-3.5 py-2 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                          cat.featured
                            ? "bg-primary/10 border-primary/28 text-foreground hover:border-primary/75 hover:bg-primary/18 hover:shadow-[0_6px_18px_-8px_hsl(var(--primary)/0.65)]"
                            : "bg-secondary/65 border-border/80 text-secondary-foreground hover:border-primary/55 hover:bg-primary/10 hover:text-foreground"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full transition-transform duration-200 group-hover/chip:scale-125 ${
                            cat.featured ? "bg-primary" : "bg-primary/65"
                          }`}
                        />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}

          {/* Currently Learning Radar Strip */}
          <ScrollReveal delayMs={220} className="md:col-span-12">
            <div className="group relative overflow-hidden rounded-2xl border border-dashed border-primary/45 bg-gradient-to-r from-primary/10 via-card/75 to-accent/10 px-6 py-5 sm:px-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 hover:border-primary/75">
              <div className="flex items-center gap-3.5">
                <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/15 border border-primary/35 text-primary shrink-0 transition-transform duration-300 group-hover:rotate-12">
                  <Sparkles size={18} aria-hidden="true" />
                </span>
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <h3 className="font-mono text-sm font-semibold text-foreground">
                    {t.skills.learning}
                  </h3>
                </div>
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {learningSkills.map((skill, skillIdx) => (
                  <li
                    key={skill}
                    style={{ "--i": skillIdx, "--base": "120ms" } as CSSProperties}
                    className="reveal-item font-mono text-xs sm:text-[13px] px-4 py-1.5 rounded-xl border border-primary/40 bg-background/75 text-primary font-semibold shadow-[0_4px_16px_-8px_hsl(var(--primary)/0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Skills;

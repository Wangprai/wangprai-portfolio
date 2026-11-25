import { memo, useMemo, useState, type CSSProperties } from "react";
import { Sparkles } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import ScrollReveal from "./motion/ScrollReveal";
import SpotlightCard from "./react-bits/SpotlightCard";
import SectionHeading from "./SectionHeading";
import SkillsBackground from "./skills/SkillsBackground";
import {
  LEARNING_SKILLS,
  SKILL_CATEGORIES,
  type Skill,
} from "./skills/skillData";

const ALL = "all";

const SkillBadge = memo(({
  skill,
  theme,
  index,
  showIcon,
  featured,
  learning = false,
}: {
  skill: Skill;
  theme: "dark" | "light";
  index: number;
  showIcon: boolean;
  featured?: boolean;
  learning?: boolean;
}) => {
  const Icon = skill.icon;
  const iconColor = theme === "dark" ? skill.color.dark : skill.color.light;

  const tone = learning
    ? "border-dashed border-primary/45 bg-background/75 text-foreground hover:border-primary hover:bg-primary/10"
    : featured
      ? "border-primary/28 bg-primary/10 text-foreground hover:border-primary/75 hover:bg-primary/18 hover:shadow-[0_6px_18px_-8px_hsl(var(--primary)/0.65)]"
      : "border-border/80 bg-secondary/65 text-secondary-foreground hover:border-primary/55 hover:bg-primary/10 hover:text-foreground";

  if (!showIcon) {
    return (
      <li
        style={{ "--i": index * 0.4, "--base": "55ms" } as CSSProperties}
        className={`reveal-item group/chip inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] px-3.5 py-2 rounded-xl border backdrop-blur-[2px] transition-all duration-200 hover:-translate-y-0.5 ${tone}`}
      >
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full shrink-0 transition-transform duration-200 group-hover/chip:scale-125 ${
            learning || featured ? "bg-primary" : "bg-primary/65"
          }`}
        />
        <span className="leading-tight">{skill.name}</span>
      </li>
    );
  }

  return (
    <li
      style={{ "--i": index * 0.45, "--base": "55ms" } as CSSProperties}
      className={`reveal-item group/chip flex items-center gap-3 min-w-0 font-mono text-xs sm:text-[13px] px-3.5 py-3 rounded-xl border backdrop-blur-[2px] transition-all duration-200 hover:-translate-y-0.5 ${tone}`}
    >
      <span
        aria-hidden="true"
        style={{ color: iconColor }}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background/80 border border-border/70 shadow-xs transition-transform duration-200 group-hover/chip:scale-110"
      >
        <Icon size={19} aria-hidden="true" focusable="false" />
      </span>
      <span className="min-w-0 break-words font-medium leading-tight">
        {skill.name}
      </span>
    </li>
  );
});

const Skills = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const isAll = activeCategory === ALL;
  const visibleCategories = useMemo(
    () => (isAll ? SKILL_CATEGORIES : SKILL_CATEGORIES.filter((cat) => cat.id === activeCategory)),
    [isAll, activeCategory]
  );

  const filterBase =
    "font-mono text-xs px-3.5 py-2 rounded-xl border transition-all duration-200 cursor-pointer min-h-10";
  const filterActive =
    "border-primary bg-primary text-primary-foreground shadow-[0_0_20px_-6px_hsl(var(--primary)/0.75)] font-semibold";
  const filterIdle =
    "border-border/80 bg-card/75 backdrop-blur-sm text-muted-foreground hover:border-primary/50 hover:text-foreground";

  return (
    <section id="skills" className="section-padding relative overflow-x-clip">
      <SkillsBackground theme={theme} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="03"
            title={t.skills.title}
            subtitle={t.skills.subtitle}
          />
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal delayMs={40} className="mb-7">
          <div
            role="group"
            aria-label={t.skills.title}
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              onClick={() => setActiveCategory(ALL)}
              aria-pressed={isAll}
              className={`${filterBase} ${isAll ? filterActive : filterIdle}`}
            >
              {t.skills.allFilter}
            </button>
            {SKILL_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(isSelected ? ALL : cat.id)}
                  aria-pressed={isSelected}
                  className={`${filterBase} ${isSelected ? filterActive : filterIdle}`}
                >
                  {t.skills[cat.filterKey]}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Filtered category panel; remounts per filter to replay the transition */}
        <ScrollReveal variant="blur">
          <div
            key={activeCategory}
            className="skills-panel grid grid-cols-1 md:grid-cols-12 gap-5"
          >
            {visibleCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className={isAll ? cat.colSpan : "md:col-span-12"}
                >
                  <SpotlightCard
                    theme={theme}
                    spotlightColor={theme === "dark" ? "#a855f7" : "#7c3aed"}
                    intensity={theme === "dark" ? 0.18 : 0.12}
                    borderGlow={isAll ? (cat.featured ? 0.72 : 0.55) : 0.9}
                    spotlightSize={260}
                    className="group h-full p-5 sm:p-7 transition-transform duration-300 hover:-translate-y-1"
                  >
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
                        <h3 className="font-mono text-sm sm:text-[15px] font-semibold text-foreground leading-snug min-w-0 break-words">
                          {t.skills[cat.titleKey]}
                        </h3>
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground px-2 py-0.5 rounded-md bg-secondary/65 border border-border/70 shrink-0">
                        {cat.skills.length}
                      </span>
                    </div>

                    <ul
                      className={
                        isAll
                          ? "flex flex-wrap gap-2.5"
                          : "grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5"
                      }
                    >
                      {cat.skills.map((skill, i) => (
                        <SkillBadge
                          key={skill.name}
                          skill={skill}
                          theme={theme}
                          index={i}
                          showIcon={!isAll}
                          featured={cat.featured}
                        />
                      ))}
                    </ul>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Currently Learning (separate from the main categories) */}
        <ScrollReveal delayMs={120} className="mt-5">
          <div className="group relative overflow-hidden rounded-2xl border border-dashed border-primary/45 bg-gradient-to-r from-primary/10 via-card/80 to-accent/10 backdrop-blur-sm px-5 py-5 sm:px-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 hover:border-primary/75">
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
              {LEARNING_SKILLS.map((skill, i) => (
                <SkillBadge
                  key={skill.name}
                  skill={skill}
                  theme={theme}
                  index={i}
                  showIcon={!isAll}
                  learning
                />
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Skills;

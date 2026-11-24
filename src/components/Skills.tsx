import { BrainCircuit, Code2, Layers, Sparkles, Wrench } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import ScrollReveal from "./motion/ScrollReveal";
import SectionHeading from "./SectionHeading";

const Skills = () => {
  const { t } = usePersonalData();

  const mainCategories = [
    {
      title: t.skills.languages,
      icon: Code2,
      colSpan: "md:col-span-5",
      featured: true,
      skills: ["Python", "JavaScript", "TypeScript", "Java (Basic)", "PHP", "SQL"],
    },
    {
      title: t.skills.devframeworks,
      icon: Layers,
      colSpan: "md:col-span-7",
      featured: true,
      skills: ["React", "Node.js", "Express", "Elysia.js (Bun)", "Tailwind CSS", "FastAPI"],
    },
    {
      title: t.skills.tools,
      icon: Wrench,
      colSpan: "md:col-span-6",
      featured: false,
      skills: ["Git", "Docker", "Hugging Face", "PostgreSQL", "Oracle", "JWT"],
    },
    {
      title: t.skills.dsaiframeworks,
      icon: BrainCircuit,
      colSpan: "md:col-span-6",
      featured: false,
      skills: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "PyTorch"],
    },
  ];

  const learningSkills = ["Go", "Next.js", "NestJS"];

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="03"
            title={t.skills.title}
            subtitle={t.skills.subtitle}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {mainCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal
                key={cat.title}
                delayMs={idx * 55}
                className={cat.colSpan}
              >
                <div
                  className={`h-full glass-card p-6 sm:p-7 transition-colors duration-300 hover:border-primary/45 ${
                    cat.featured ? "border-primary/25" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border ${
                        cat.featured
                          ? "bg-primary/12 border-primary/30 text-primary"
                          : "bg-secondary/80 border-border text-primary"
                      }`}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <h3 className="font-mono text-sm font-semibold text-foreground">
                      {cat.title}
                    </h3>
                  </div>

                  <ul className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill}
                        className={`font-mono text-xs sm:text-[13px] px-3.5 py-2 rounded-xl border transition-colors ${
                          cat.featured
                            ? "bg-primary/8 border-primary/25 text-foreground hover:border-primary/60"
                            : "bg-secondary/65 border-border/80 text-secondary-foreground hover:border-primary/40"
                        }`}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}

          {/* Currently Learning Strip */}
          <ScrollReveal delayMs={220} className="md:col-span-12">
            <div className="rounded-2xl border border-dashed border-primary/35 bg-primary/5 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary/12 text-primary shrink-0">
                  <Sparkles size={17} aria-hidden="true" />
                </span>
                <h3 className="font-mono text-sm font-semibold text-foreground">
                  {t.skills.learning}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-2.5">
                {learningSkills.map((skill) => (
                  <li
                    key={skill}
                    className="font-mono text-xs sm:text-[13px] px-3.5 py-1.5 rounded-lg border border-primary/30 bg-card/80 text-primary font-medium"
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

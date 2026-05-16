import { usePersonalData } from "../hooks/usePersonalData";

const Skills = () => {
  const { t } = usePersonalData();

  const skillCategories = [
    { title: t.skills.languages, skills: ["Python", "JavaScript", "TypeScript", "Java (Basic)", "PHP", "SQL"] },
    { title: t.skills.devframeworks, skills: ["React", "Node.js", "Express", "Elysia.js (Bun)", "Tailwind CSS", "FastAPI"] },
    { title: t.skills.dsaiframeworks, skills: ["Numpy", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "PyTorch"] },
    { title: t.skills.tools, skills: ["Git", "Docker", "Hugging Face", "PostgreSQL", "Oracle", "JWT"] },
    { title: t.skills.learning, skills: ["Go", "Next.js", "NestJS"] },
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <span className="font-mono text-primary text-lg">04.</span>
          {t.skills.title}
          <span className="hidden md:block h-px bg-border flex-1 ml-4" />
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="glass-card p-6">
              <h3 className="text-primary font-mono text-sm mb-4">{cat.title}</h3>
              <ul className="grid grid-cols-2 gap-2">
                {cat.skills.map((skill) => (
                  <li key={skill} className="text-muted-foreground text-sm flex items-center gap-2">
                    <span className="text-primary text-xs">▹</span>{skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

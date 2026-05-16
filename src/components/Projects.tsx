import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { usePersonalData } from "../hooks/usePersonalData";

const Projects = () => {
  const { t } = usePersonalData();

  const projects = [
    { title: "Document Understanding Transformer (Donut model)", description: t.projects.donutmodel, tech: ["Python", "PyTorch", "Transformers", "Hugging Face", "Wandb"]},
    { title: "IOT Meeting Room Reservation", description: t.projects.iotmeetingroomreservation, tech: ["React", "TypeScript", "ElysiaJS", "Ant Design", "Oracle", "Socket.io"]},
    { title: "DaikinThai Website", description: t.projects.daikinthai, tech: ["PHP", "Laravel", "Bootstrap", "MySQL"]},
    { title: "Automatic Speech Recognition for Thai (ASR model)", description: t.projects.asrmodel, tech: ["Python", "PyTorch", "PyThaiNLP", "Transformers", "Hugging Face"], github: "https://github.com/Wangprai/asr-with-llm.git", huggingface: "https://huggingface.co/Wangprai/wav2vec2-th" },
    { title: "Salary Growth in Data Science Career", description: t.projects.salarygrowth, tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"], github: "https://github.com/Wangprai/Salary-growth-in-data-science-career.git"},
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <span className="font-mono text-primary text-lg">05.</span>
          {t.projects.title}
          <span className="hidden md:block h-px bg-border flex-1 ml-4" />
        </h2>
        <div className="mt-10 grid gap-6">
          {projects.map((project) => (
            <div key={project.title} className="glass-card p-6 md:p-8 hover:border-primary/30 transition-colors duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><FaGithub size={20} /></a>
                  )}
                  {project.huggingface && (
                    <a href={project.huggingface} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><SiHuggingface size={20} /></a>
                  )}
                  {/* {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><FaExternalLinkAlt size={20} /></a>
                  )} */}
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

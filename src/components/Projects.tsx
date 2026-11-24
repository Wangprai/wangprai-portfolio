import { useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  AudioLines,
  BarChart3,
  Globe,
  LayoutDashboard,
  ScanText,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import ScrollReveal from "./motion/ScrollReveal";
import ProjectModal, { type ProjectItem } from "./ProjectModal";
import SpotlightCard from "./react-bits/SpotlightCard";
import SectionHeading from "./SectionHeading";

const Projects = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const projects: (ProjectItem & { icon: typeof Globe; featured: boolean })[] = [
    {
      id: "iotmeetingroomreservation",
      title: "IOT Meeting Room Reservation",
      category: t.projects.categories.fullstack,
      description: t.projects.iotmeetingroomreservation,
      highlights: t.projects.highlights.iotmeetingroomreservation,
      tech: ["React", "TypeScript", "ElysiaJS", "Ant Design", "Oracle", "Socket.io"],
      icon: Globe,
      featured: true,
    },
    {
      id: "daikinthai",
      title: "DaikinThai Website",
      category: t.projects.categories.backendWeb,
      description: t.projects.daikinthai,
      highlights: t.projects.highlights.daikinthai,
      tech: ["PHP", "Laravel", "Bootstrap", "MySQL"],
      icon: LayoutDashboard,
      featured: true,
    },
    {
      id: "donutmodel",
      title: "Document Understanding Transformer (Donut model)",
      category: t.projects.categories.aiMl,
      description: t.projects.donutmodel,
      highlights: t.projects.highlights.donutmodel,
      tech: ["Python", "PyTorch", "Transformers", "Hugging Face", "Wandb"],
      icon: ScanText,
      featured: false,
    },
    {
      id: "asrmodel",
      title: "Automatic Speech Recognition for Thai (ASR model)",
      category: t.projects.categories.aiMl,
      description: t.projects.asrmodel,
      highlights: t.projects.highlights.asrmodel,
      tech: ["Python", "PyTorch", "PyThaiNLP", "Transformers", "Hugging Face"],
      github: "https://github.com/Wangprai/asr-with-llm.git",
      huggingface: "https://huggingface.co/Wangprai/wav2vec2-th",
      icon: AudioLines,
      featured: false,
    },
    {
      id: "salarygrowth",
      title: "Salary Growth in Data Science Career",
      category: t.projects.categories.dataAnalysis,
      description: t.projects.salarygrowth,
      highlights: t.projects.highlights.salarygrowth,
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
      github: "https://github.com/Wangprai/Salary-growth-in-data-science-career.git",
      icon: BarChart3,
      featured: false,
    },
  ];

  const activeProject =
    projects.find((project) => project.id === selectedProjectId) ?? null;

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            index="04"
            title={t.projects.title}
            subtitle={t.projects.subtitle}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const colSpan = project.featured
              ? "lg:col-span-3"
              : "lg:col-span-2";

            return (
              <ScrollReveal
                key={project.id}
                delayMs={index * 55}
                className={colSpan}
              >
                <SpotlightCard
                  theme={theme}
                  spotlightColor={theme === "dark" ? "#a78bfa" : "#7c3aed"}
                  intensity={theme === "dark" ? 0.16 : 0.12}
                  borderGlow={0.65}
                  spotlightSize={260}
                  className="h-full p-6 sm:p-7 flex flex-col justify-between group transition-transform duration-300 ease-out hover:-translate-y-1.5"
                >
                  <div>
                    {/* Top Bar: Category + External Verified Links */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="inline-flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary/12 border border-primary/25 text-primary shrink-0 transition-[transform,background-color,color,border-color] duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                          {project.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} — GitHub`}
                            title="GitHub"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border/80 bg-background/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <FaGithub size={15} aria-hidden="true" />
                          </a>
                        )}
                        {project.huggingface && (
                          <a
                            href={project.huggingface}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} — Hugging Face`}
                            title="Hugging Face"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border/80 bg-background/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <SiHuggingface size={15} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer: Stack & Minimal Modal Trigger */}
                  <div className="space-y-4 pt-4 border-t border-border/60">
                    <ul className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech, techIdx) => (
                        <li
                          key={tech}
                          style={{ "--i": techIdx * 0.45, "--base": "120ms" } as CSSProperties}
                          className="reveal-item font-mono text-[11px] text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-md transition-colors duration-200 group-hover:border-primary/35"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => setSelectedProjectId(project.id)}
                      className="group/btn inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>{t.projects.viewDetails}</span>
                      <ArrowUpRight
                        size={14}
                        className="text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setSelectedProjectId(null)}
      />
    </section>
  );
};

export default Projects;

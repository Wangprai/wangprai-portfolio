import { useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  AudioLines,
  BarChart3,
  Globe,
  LayoutDashboard,
  ScanText,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import ScrollReveal from "./motion/ScrollReveal";
import ProjectModal, { type ProjectItem } from "./ProjectModal";
import SpotlightCard from "./react-bits/SpotlightCard";
import StarBorder from "./react-bits/StarBorder";
import SectionHeading from "./SectionHeading";

type ProjectFilter = "all" | "web" | "aiData";

/**
 * Abstract geometric architectural motifs — strictly stylized vector art
 * representing each project's technical domain (never fake UI screenshots).
 */
const ProjectMotif = ({ id }: { id: string }) => {
  if (id === "iotmeetingroomreservation") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 360 112"
        className="w-full h-full text-primary"
        fill="none"
      >
        <defs>
          <linearGradient id="motif-iot" x1="0" y1="0" x2="360" y2="112" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path d="M40 56 H135 L180 30 H245 L312 56" stroke="url(#motif-iot)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M40 56 H135 L180 82 H245 L312 56" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" />
        <circle cx="40" cy="56" r="18" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
        <circle cx="40" cy="56" r="6" fill="currentColor" fillOpacity="0.85" />
        <circle cx="180" cy="30" r="11" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
        <circle cx="180" cy="30" r="4" fill="currentColor" />
        <circle cx="180" cy="82" r="11" stroke="#c084fc" strokeOpacity="0.45" strokeWidth="1.2" />
        <circle cx="180" cy="82" r="4" fill="#c084fc" />
        <circle cx="312" cy="56" r="22" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="312" cy="56" r="12" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
        <circle cx="312" cy="56" r="5" fill="#38bdf8" />
      </svg>
    );
  }

  if (id === "daikinthai") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 360 112"
        className="w-full h-full text-primary"
        fill="none"
      >
        <rect x="28" y="20" width="92" height="72" rx="10" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.3" />
        <line x1="42" y1="38" x2="104" y2="38" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="54" x2="88" y2="54" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="70" x2="96" y2="70" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
        <path d="M120 56 H168" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 3" />
        <rect x="168" y="26" width="60" height="60" rx="12" stroke="#c084fc" strokeOpacity="0.6" strokeWidth="1.5" />
        <circle cx="198" cy="56" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M228 56 H274" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 3" />
        <rect x="274" y="22" width="58" height="28" rx="8" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
        <rect x="274" y="62" width="58" height="28" rx="8" stroke="#38bdf8" strokeOpacity="0.45" strokeWidth="1.2" />
      </svg>
    );
  }

  if (id === "donutmodel") {
    return (
      <svg aria-hidden="true" viewBox="0 0 280 68" className="w-full h-full text-primary" fill="none">
        <rect x="14" y="12" width="44" height="44" rx="8" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
        <line x1="24" y1="24" x2="48" y2="24" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="34" x2="42" y2="34" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="24" y1="44" x2="46" y2="44" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M68 34 H114" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="3 3" />
        <polygon points="140,12 162,23 162,45 140,56 118,45 118,23" stroke="#c084fc" strokeOpacity="0.65" strokeWidth="1.3" />
        <circle cx="140" cy="34" r="5" fill="currentColor" />
        <path d="M168 34 H212" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="3 3" />
        <rect x="218" y="16" width="48" height="36" rx="8" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx="232" cy="34" r="3" fill="#38bdf8" />
        <line x1="240" y1="34" x2="256" y2="34" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "asrmodel") {
    const heights = [12, 24, 38, 22, 46, 30, 52, 26, 40, 18, 34, 48, 24, 30, 16];
    return (
      <svg aria-hidden="true" viewBox="0 0 280 68" className="w-full h-full text-primary" fill="none">
        {heights.map((h, i) => (
          <rect
            key={i}
            x={26 + i * 16}
            y={(68 - h) / 2}
            width="6"
            height={h}
            rx="3"
            fill="currentColor"
            fillOpacity={i % 3 === 0 ? 0.78 : 0.36}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 280 68" className="w-full h-full text-primary" fill="none">
      <path
        d="M18 52 C56 48, 72 26, 112 34 C150 42, 178 16, 218 22 C240 25, 252 14, 264 12"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="112" cy="34" r="4" fill="currentColor" />
      <circle cx="218" cy="22" r="4.5" fill="#c084fc" />
      <circle cx="264" cy="12" r="4" fill="#38bdf8" />
      <line x1="18" y1="58" x2="264" y2="58" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
    </svg>
  );
};

const Projects = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const projects: (ProjectItem & {
    icon: typeof Globe;
    featured: boolean;
    group: "web" | "aiData";
    indexLabel: string;
  })[] = [
    {
      id: "iotmeetingroomreservation",
      indexLabel: "01",
      title: "IOT Meeting Room Reservation",
      category: t.projects.categories.fullstack,
      description: t.projects.iotmeetingroomreservation,
      highlights: t.projects.highlights.iotmeetingroomreservation,
      tech: ["React", "TypeScript", "ElysiaJS", "Ant Design", "Oracle", "Socket.io"],
      icon: Globe,
      featured: true,
      group: "web",
    },
    {
      id: "daikinthai",
      indexLabel: "02",
      title: "DaikinThai Website",
      category: t.projects.categories.backendWeb,
      description: t.projects.daikinthai,
      highlights: t.projects.highlights.daikinthai,
      tech: ["PHP", "Laravel", "Bootstrap", "MySQL"],
      icon: LayoutDashboard,
      featured: true,
      group: "web",
    },
    {
      id: "donutmodel",
      indexLabel: "03",
      title: "Document Understanding Transformer (Donut model)",
      category: t.projects.categories.aiMl,
      description: t.projects.donutmodel,
      highlights: t.projects.highlights.donutmodel,
      tech: ["Python", "PyTorch", "Transformers", "Hugging Face", "Wandb"],
      icon: ScanText,
      featured: false,
      group: "aiData",
    },
    {
      id: "asrmodel",
      indexLabel: "04",
      title: "Automatic Speech Recognition for Thai (ASR model)",
      category: t.projects.categories.aiMl,
      description: t.projects.asrmodel,
      highlights: t.projects.highlights.asrmodel,
      tech: ["Python", "PyTorch", "PyThaiNLP", "Transformers", "Hugging Face"],
      github: "https://github.com/Wangprai/asr-with-llm.git",
      huggingface: "https://huggingface.co/Wangprai/wav2vec2-th",
      icon: AudioLines,
      featured: false,
      group: "aiData",
    },
    {
      id: "salarygrowth",
      indexLabel: "05",
      title: "Salary Growth in Data Science Career",
      category: t.projects.categories.dataAnalysis,
      description: t.projects.salarygrowth,
      highlights: t.projects.highlights.salarygrowth,
      tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
      github: "https://github.com/Wangprai/Salary-growth-in-data-science-career.git",
      icon: BarChart3,
      featured: false,
      group: "aiData",
    },
  ];

  const visibleProjects =
    filter === "all" ? projects : projects.filter((p) => p.group === filter);

  const activeProject =
    projects.find((project) => project.id === selectedProjectId) ?? null;

  const filterOptions: { id: ProjectFilter; label: string; count: number }[] = [
    { id: "all", label: t.projects.filters.all, count: projects.length },
    {
      id: "web",
      label: t.projects.filters.web,
      count: projects.filter((p) => p.group === "web").length,
    },
    {
      id: "aiData",
      label: t.projects.filters.aiData,
      count: projects.filter((p) => p.group === "aiData").length,
    },
  ];

  return (
    <section id="projects" className="section-horizon section-padding relative overflow-hidden">
      {/* Ambient Violet Stage Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[22rem] w-[48rem] rounded-full bg-primary/12 blur-[140px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <ScrollReveal className="[&>div]:mb-0">
            <SectionHeading
              index="04"
              title={t.projects.title}
              subtitle={t.projects.subtitle}
            />
          </ScrollReveal>

          {/* Interactive Domain Filter Pills */}
          <ScrollReveal delayMs={60}>
            <div
              role="group"
              aria-label={t.projects.title}
              className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-md p-1.5"
            >
              {filterOptions.map((option) => {
                const isSelected = filter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFilter(option.id)}
                    aria-pressed={isSelected}
                    className={`inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold shadow-[0_6px_20px_-6px_hsl(var(--primary)/0.8)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                    }`}
                  >
                    <span>{option.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {option.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* 2-Tier Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6">
          {visibleProjects.map((project, index) => {
            const Icon = project.icon;
            const isFlagship = project.featured && filter !== "aiData";
            const colSpan =
              filter === "web"
                ? "lg:col-span-3"
                : filter === "aiData"
                  ? "lg:col-span-2"
                  : project.featured
                    ? "lg:col-span-3"
                    : "lg:col-span-2";

            const cardContent = (
              <SpotlightCard
                theme={theme}
                spotlightColor={theme === "dark" ? "#a855f7" : "#7c3aed"}
                intensity={isFlagship ? (theme === "dark" ? 0.2 : 0.13) : theme === "dark" ? 0.16 : 0.11}
                borderGlow={isFlagship ? 0.88 : 0.68}
                spotlightSize={isFlagship ? 300 : 250}
                data-cursor="card"
                data-cursor-label="VIEW"
                onClick={() => setSelectedProjectId(project.id)}
                className="h-full p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-pointer"
              >
                <div>
                  {/* Abstract Domain Architectural Visual Banner (Never Fake Screenshots) */}
                  <div
                    className={`relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background/80 to-accent/10 mb-5 ${
                      isFlagship ? "h-28 px-4 py-2" : "h-20 px-3 py-1.5"
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-dot-matrix opacity-55"
                    />
                    <div className="relative z-10 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                      <ProjectMotif id={project.id} />
                    </div>

                    {/* Corner Index & Featured Pill */}
                    <div className="absolute top-2.5 left-3 right-3 z-20 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-semibold tracking-widest text-primary bg-background/80 backdrop-blur-md border border-primary/30 px-2 py-0.5 rounded-md">
                        PRJ // {project.indexLabel}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/15 backdrop-blur-md border border-primary/35 px-2.5 py-0.5 rounded-full">
                          <Sparkles size={10} aria-hidden="true" />
                          {t.projects.featuredBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category + Verified External Links */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="inline-flex items-center gap-2.5 min-w-0">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-primary/12 border border-primary/30 text-primary shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-medium truncate">
                        {project.category}
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-2 shrink-0"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} — GitHub`}
                          title="GitHub"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border/80 bg-background/70 text-muted-foreground hover:text-primary hover:border-primary/60 hover:-translate-y-0.5 transition-all duration-200"
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
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border/80 bg-background/70 text-muted-foreground hover:text-primary hover:border-primary/60 hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <SiHuggingface size={15} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`${
                      isFlagship ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                    } font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-3`}
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Footer: Stack & Minimal Modal Trigger */}
                <div className="space-y-4 pt-4 border-t border-border/70">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech, techIdx) => (
                      <li
                        key={tech}
                        style={{ "--i": techIdx * 0.45, "--base": "100ms" } as CSSProperties}
                        className="reveal-item font-mono text-[11px] text-primary bg-primary/10 border border-primary/22 px-2.5 py-0.5 rounded-md transition-colors duration-200 group-hover:border-primary/45"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedProjectId(project.id);
                    }}
                    className="group/btn inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{t.projects.viewDetails}</span>
                    <ArrowUpRight
                      size={15}
                      className="text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </SpotlightCard>
            );

            return (
              <ScrollReveal
                key={project.id}
                delayMs={index * 55}
                className={colSpan}
              >
                {isFlagship ? (
                  <StarBorder speedSeconds={10} className="h-full rounded-2xl">
                    {cardContent}
                  </StarBorder>
                ) : (
                  cardContent
                )}
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

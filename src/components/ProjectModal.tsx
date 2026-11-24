import { useEffect, useRef } from "react";
import { ExternalLink, Lock, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { usePersonalData } from "../hooks/usePersonalData";

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: readonly string[];
  tech: readonly string[];
  github?: string;
  huggingface?: string;
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { t } = usePersonalData();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog
    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasLinks = Boolean(project.github || project.huggingface);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-xl max-h-[88svh] overflow-y-auto rounded-2xl border border-primary/35 bg-card text-card-foreground shadow-2xl shadow-black/45 p-6 sm:p-7 animate-modal-in"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-border/80">
          <div className="min-w-0">
            <span className="inline-block font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/12 text-primary border border-primary/25 mb-2.5">
              {project.category}
            </span>
            <h3
              id="project-modal-title"
              className="text-xl sm:text-2xl font-bold text-foreground leading-snug"
            >
              {project.title}
            </h3>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t.projects.closeModal}
            className="group/close inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-secondary/60 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors shrink-0 cursor-pointer"
          >
            <X
              size={18}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/close:rotate-90"
            />
          </button>
        </div>

        {/* Summary */}
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Key Details & Contribution */}
        <div className="mb-6">
          <h4 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">
            {t.projects.highlightsLabel}
          </h4>
          <ul className="space-y-2.5">
            {project.highlights.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-foreground/90 leading-relaxed"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack */}
        <div className="mb-6">
          <h4 className="font-mono text-xs uppercase tracking-wider text-primary mb-3">
            {t.projects.techStackLabel}
          </h4>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="font-mono text-xs px-3 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Verified Links */}
        <div className="pt-5 border-t border-border/80">
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
            {t.projects.linksLabel}
          </h4>
          {hasLinks ? (
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95 transition-opacity"
                >
                  <FaGithub size={16} aria-hidden="true" />
                  <span>{t.projects.openGithub}</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
              {project.huggingface && (
                <a
                  href={project.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/45 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <SiHuggingface size={16} aria-hidden="true" />
                  <span>{t.projects.openHuggingFace}</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          ) : (
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Lock size={14} className="text-primary shrink-0" aria-hidden="true" />
              <span>{t.projects.noPublicLinks}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

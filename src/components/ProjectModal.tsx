import { useEffect, useRef } from "react";
import { ExternalLink, Layers, Lock, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { usePersonalData } from "../hooks/usePersonalData";
import StarBorder from "./react-bits/StarBorder";

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

/**
 * Minimal Modal for Project Details (confirmed design preference — not full-screen).
 * Supports Escape-to-close, focus trapping, focus restoration, and responsive touch scrolling.
 */
const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { t } = usePersonalData();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

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
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/72 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <StarBorder speedSeconds={8} className="w-full max-w-xl rounded-2xl animate-modal-in">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={(event) => event.stopPropagation()}
          className="relative w-full max-h-[88svh] overflow-y-auto rounded-2xl border border-primary/35 bg-card/98 text-card-foreground shadow-[0_32px_90px_-20px_rgba(4,2,16,0.9)] p-6 sm:p-7"
        >
          {/* Ambient Top Violet Horizon Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-36 w-72 rounded-full bg-primary/20 blur-[60px]"
          />

          {/* Header */}
          <div className="relative flex items-start justify-between gap-4 pb-5 mb-5 border-b border-border/80">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full bg-primary/14 text-primary border border-primary/30 mb-3">
                <Layers size={11} aria-hidden="true" />
                {project.category}
              </span>
              <h3
                id="project-modal-title"
                className="text-xl sm:text-2xl font-bold text-foreground leading-snug tracking-tight"
              >
                {project.title}
              </h3>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={t.projects.closeModal}
              className="group/close inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-secondary/70 text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all shrink-0 cursor-pointer"
            >
              <X
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/close:rotate-90"
              />
            </button>
          </div>

          {/* Summary */}
          <p className="relative text-sm sm:text-[15px] text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Key Details & Contribution */}
          <div className="relative mb-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-primary font-semibold mb-3">
              {t.projects.highlightsLabel}
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-border/65 bg-background/55 px-3.5 py-2.5 text-sm text-foreground/90 leading-relaxed"
                >
                  <span className="mt-0.5 font-mono text-[11px] font-semibold text-primary shrink-0">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="relative mb-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-primary font-semibold mb-3">
              {t.projects.techStackLabel}
            </h4>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-xs px-3 py-1 rounded-lg bg-primary/12 text-primary border border-primary/25 font-medium"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Links */}
          <div className="relative pt-5 border-t border-border/80">
            <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">
              {t.projects.linksLabel}
            </h4>
            {hasLinks ? (
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:opacity-95 transition-opacity"
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
                    className="inline-flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/12 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <SiHuggingface size={16} aria-hidden="true" />
                    <span>{t.projects.openHuggingFace}</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            ) : (
              <p className="inline-flex items-center gap-2 rounded-xl border border-border/75 bg-secondary/50 px-3.5 py-2 text-xs sm:text-sm text-muted-foreground">
                <Lock size={14} className="text-primary shrink-0" aria-hidden="true" />
                <span>{t.projects.noPublicLinks}</span>
              </p>
            )}
          </div>
        </div>
      </StarBorder>
    </div>
  );
};

export default ProjectModal;

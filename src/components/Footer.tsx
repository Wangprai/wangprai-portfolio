import { ArrowUp } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { usePersonalData } from "../hooks/usePersonalData";

const socials = [
  { icon: FaGithub, href: "https://github.com/Wangprai", label: "GitHub" },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/wangprai-jullapech-2483a9378/",
    label: "LinkedIn",
  },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/B.Boszi14",
    label: "Facebook",
  },
];

const Footer = () => {
  const { t } = usePersonalData();

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="border-t border-border/70 bg-card/35 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Identity / Wordmark */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <a
            href="#top"
            className="font-mono text-base font-semibold text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary">&lt;</span>
            Wangprai
            <span className="text-primary"> /&gt;</span>
          </a>
          <p className="font-mono text-xs text-muted-foreground">
            {t.footer.builtBy} © {new Date().getFullYear()}
          </p>
        </div>

        {/* Icon-Only Social Links with Accessible Tooltips */}
        <div className="flex items-center justify-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <div key={label} className="relative group">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border/80 bg-card/70 text-muted-foreground hover:text-primary hover:border-primary/50 hover:-translate-y-0.5 transition-all"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1 font-mono text-[11px] text-popover-foreground shadow-md opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Footer-Only Back to Top Control */}
        <div className="flex justify-center sm:justify-end">
          <button
            type="button"
            onClick={handleBackToTop}
            aria-label={t.footer.backToTop}
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-4 py-2.5 font-mono text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/50 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

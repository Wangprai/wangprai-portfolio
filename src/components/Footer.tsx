import { ArrowUp } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { usePersonalData } from "../hooks/usePersonalData";
import Magnet from "./react-bits/Magnet";

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
    <footer className="section-horizon relative bg-card/45 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-11 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Identity / Wordmark */}
        <div className="flex flex-col items-center sm:items-start gap-1.5">
          <a
            href="#top"
            className="group inline-flex items-center gap-1.5 font-mono text-base font-semibold text-foreground hover:text-primary transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
            <span className="text-primary">&lt;</span>
            <span>Wangprai</span>
            <span className="text-primary">/&gt;</span>
          </a>
          <p className="font-mono text-xs text-muted-foreground">
            {t.footer.builtBy} · {t.footer.role} © {new Date().getFullYear()}
          </p>
        </div>

        {/* Icon-Only Social Links with Accessible Tooltips */}
        <div className="flex items-center justify-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <Magnet key={label} padding={24} magnetStrength={5} maxOffset={5}>
              <div className="relative group">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border/80 bg-card/80 text-muted-foreground hover:text-primary hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.65)] transition-all"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-primary/30 bg-popover px-2.5 py-1 font-mono text-[11px] text-popover-foreground shadow-md opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
                >
                  {label}
                </span>
              </div>
            </Magnet>
          ))}
        </div>

        {/* Footer-Only Back to Top Control */}
        <div className="flex justify-center sm:justify-end">
          <Magnet padding={24} magnetStrength={5} maxOffset={5}>
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label={t.footer.backToTop}
              className="group inline-flex items-center gap-2 rounded-xl border border-primary/35 bg-primary/10 px-4 py-2.5 font-mono text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_22px_-6px_hsl(var(--primary)/0.7)] transition-all cursor-pointer"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp
                size={14}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            </button>
          </Magnet>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

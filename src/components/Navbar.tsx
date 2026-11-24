import { useEffect, useRef, useState } from "react";
import { FileText, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";

const SECTION_IDS = [
  "about",
  "experience",
  "skills",
  "projects",
  "education",
  "certificates",
  "contact",
] as const;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const progressRef = useRef<HTMLDivElement>(null);
  const { lang, t, toggleLang } = usePersonalData();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: "about", label: t.nav.about, href: "#about" },
    { id: "experience", label: t.nav.experience, href: "#experience" },
    { id: "skills", label: t.nav.skills, href: "#skills" },
    { id: "projects", label: t.nav.projects, href: "#projects" },
    { id: "education", label: t.nav.education, href: "#education" },
    { id: "certificates", label: t.nav.certificates, href: "#certificates" },
    { id: "contact", label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
      if (window.scrollY < 140) {
        setActiveSection("");
      }
      if (progressRef.current) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        progressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const themeAriaLabel =
    theme === "dark" ? t.nav.switchThemeToLight : t.nav.switchThemeToDark;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/70 shadow-sm shadow-black/5"
          : "bg-background/45 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="max-w-6xl mx-auto px-5 sm:px-6 h-[var(--nav-height)] flex items-center justify-between gap-3"
      >
        <a
          href="#top"
          className="group inline-flex items-center gap-1 font-mono text-base sm:text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors shrink-0"
        >
          <span className="text-primary transition-transform duration-200 group-hover:-translate-x-0.5">
            &lt;
          </span>
          <span>Wangprai</span>
          <span className="text-primary transition-transform duration-200 group-hover:translate-x-0.5">
            /&gt;
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={`group/nav relative px-2.5 xl:px-3 py-2 text-[13px] xl:text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary transition-transform duration-300 ease-out origin-center ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover/nav:scale-x-75 group-hover/nav:opacity-50"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Desktop controls */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeAriaLabel}
            title={themeAriaLabel}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border/80 bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
          >
            <span key={theme} className="inline-flex animate-icon-swap">
              {theme === "dark" ? (
                <Sun size={16} aria-hidden="true" />
              ) : (
                <Moon size={16} aria-hidden="true" />
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.switchLangLabel}
            title={t.nav.switchLangLabel}
            className="group/lang inline-flex items-center gap-1.5 h-9 px-2.5 rounded-lg border border-border/80 bg-card/60 font-mono text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
          >
            <Globe
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/lang:rotate-12"
            />
            <span>{lang === "en" ? "EN" : "TH"}</span>
          </button>

          <a
            href="/docs/Wangprai_Resume-SE.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group/res inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-primary/60 bg-primary/10 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
          >
            <FileText
              size={14}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/res:-translate-y-0.5"
            />
            <span>{t.nav.resume}</span>
          </a>
        </div>

        {/* Tablet & Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeAriaLabel}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border/80 bg-card/60 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <span key={theme} className="inline-flex animate-icon-swap">
              {theme === "dark" ? (
                <Sun size={17} aria-hidden="true" />
              ) : (
                <Moon size={17} aria-hidden="true" />
              )}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.nav.switchLangLabel}
            className="inline-flex items-center gap-1 h-10 px-2.5 rounded-lg border border-border/80 bg-card/60 font-mono text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <Globe size={14} aria-hidden="true" />
            <span>{lang === "en" ? "TH" : "EN"}</span>
          </button>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border/80 bg-card/60 text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <span key={isOpen ? "open" : "closed"} className="inline-flex animate-icon-swap">
              {isOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </span>
          </button>
        </div>
      </nav>

      {/* Scroll reading progress bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] overflow-hidden"
      >
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-gradient-to-r from-primary via-accent to-primary/80 will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Mobile navigation drawer */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/80 shadow-xl animate-menu-in"
        >
          <ul className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "location" : undefined}
                    className={`block w-full px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary/12 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-3 mt-2 border-t border-border/70">
              <a
                href="/docs/Wangprai_Resume-SE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-primary/60 bg-primary/10 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <FileText size={16} aria-hidden="true" />
                <span>{t.nav.resume}</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

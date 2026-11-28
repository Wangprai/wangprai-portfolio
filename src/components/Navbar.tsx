import { useEffect, useRef, useState } from "react";
import { FileText, Globe, Menu, MousePointer2, Moon, Sun, X } from "lucide-react";
import { useCursorPreference } from "../hooks/useCursorPreference";
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
  const { enabled: cursorEnabled, toggleCursor } = useCursorPreference();

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
    let raf = 0;
    let maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    let lastScrolled: boolean | null = null;
    let lastWasTop = false;

    const updateMetrics = () => {
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    };

    const flush = () => {
      raf = 0;
      const y = window.scrollY;
      const isScrolled = y > 24;
      if (isScrolled !== lastScrolled) {
        lastScrolled = isScrolled;
        setScrolled(isScrolled);
      }
      const isTop = y < 140;
      if (isTop && !lastWasTop) {
        setActiveSection("");
      }
      lastWasTop = isTop;

      if (progressRef.current) {
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
        progressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }
    };

    const scheduleFlush = () => {
      if (!raf) {
        raf = requestAnimationFrame(flush);
      }
    };

    const handleResize = () => {
      updateMetrics();
      scheduleFlush();
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            updateMetrics();
            scheduleFlush();
          })
        : null;
    resizeObserver?.observe(document.documentElement);

    flush();
    window.addEventListener("scroll", scheduleFlush, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", scheduleFlush);
      window.removeEventListener("resize", handleResize);
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
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 pt-2.5 sm:pt-3 pointer-events-none">
      <div
        className={`pointer-events-auto relative mx-auto max-w-6xl rounded-2xl transition-[color,background-color,border-color,box-shadow] duration-300 overflow-hidden ${
          scrolled
            ? "bg-background/80 backdrop-blur-2xl border border-primary/25 shadow-[0_14px_40px_-18px_hsl(263_75%_6%/0.75)] dark:shadow-[0_16px_44px_-16px_hsl(263_90%_4%/0.88)]"
            : "bg-background/40 backdrop-blur-md border border-border/40"
        }`}
      >
        <nav
          aria-label="Primary"
          className="px-4 sm:px-5 h-16 flex items-center justify-between gap-3"
        >
          {/* Brand Wordmark */}
          <a
            href="#top"
            className="group inline-flex items-center gap-1.5 font-mono text-base sm:text-[17px] font-semibold tracking-tight text-foreground hover:text-primary transition-colors shrink-0"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.85)]" />
            <span className="text-primary transition-transform duration-200 group-hover:-translate-x-0.5">
              &lt;
            </span>
            <span>Wangprai</span>
            <span className="text-primary transition-transform duration-200 group-hover:translate-x-0.5">
              /&gt;
            </span>
          </a>

          {/* Desktop Navigation Rail */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 rounded-xl bg-secondary/45 border border-border/60 p-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`group/nav relative px-2.5 xl:px-3 py-1.5 text-[13px] font-medium rounded-lg whitespace-nowrap transition-[color,background-color,border-color,box-shadow] duration-200 ${
                    isActive
                      ? "text-primary bg-primary/14 shadow-[inset_0_1px_0_hsl(var(--primary)/0.35)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/70"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-3 bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-primary via-accent to-primary transition-transform duration-300 ease-out origin-center ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover/nav:scale-x-75 group-hover/nav:opacity-60"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Custom cursor toggle: only shown on fine-pointer (mouse) devices */}
            <button
              type="button"
              onClick={toggleCursor}
              aria-pressed={cursorEnabled}
              aria-label={cursorEnabled ? t.nav.disableCursor : t.nav.enableCursor}
              title={cursorEnabled ? t.nav.disableCursor : t.nav.enableCursor}
              className={`hidden [@media(hover:hover)_and_(pointer:fine)]:inline-flex items-center justify-center w-9 h-9 rounded-xl border transition-[color,background-color,border-color,box-shadow] cursor-pointer ${
                cursorEnabled
                  ? "border-primary/55 bg-primary/10 text-primary"
                  : "border-border/80 bg-card/70 text-muted-foreground hover:text-primary hover:border-primary/55 hover:bg-primary/10"
              }`}
            >
              <MousePointer2 size={16} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeAriaLabel}
              title={themeAriaLabel}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border/80 bg-card/70 text-muted-foreground hover:text-primary hover:border-primary/55 hover:bg-primary/10 transition-[color,background-color,border-color,box-shadow] cursor-pointer"
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
              className="group/lang inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-border/80 bg-card/70 font-mono text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/55 hover:bg-primary/10 transition-[color,background-color,border-color,box-shadow] cursor-pointer"
            >
              <Globe
                size={14}
                aria-hidden="true"
                className="text-primary transition-transform duration-300 group-hover/lang:rotate-12"
              />
              <span>{lang === "en" ? "EN" : "TH"}</span>
            </button>

            <a
              href="/docs/Wangprai_Resume-SE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group/res relative overflow-hidden inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-primary/60 bg-primary/14 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_20px_-8px_hsl(var(--primary)/0.6)] transition-[color,background-color,border-color,box-shadow] whitespace-nowrap"
            >
              <FileText
                size={14}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/res:-translate-y-0.5"
              />
              <span>{t.nav.resume}</span>
            </a>
          </div>

          {/* Tablet & Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeAriaLabel}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border/80 bg-card/70 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
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
              className="inline-flex items-center gap-1 h-10 px-2.5 rounded-xl border border-border/80 bg-card/70 font-mono text-xs font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <Globe size={14} className="text-primary" aria-hidden="true" />
              <span>{lang === "en" ? "EN" : "TH"}</span>
            </button>

            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border/80 bg-card/70 text-foreground hover:text-primary transition-colors cursor-pointer"
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

        {/* Luminous Scroll Progress Line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-border/25 overflow-hidden"
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-gradient-to-r from-primary via-accent to-sky-400 will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="pointer-events-auto lg:hidden mt-2 mx-auto max-w-6xl rounded-2xl bg-background/95 backdrop-blur-2xl border border-primary/25 shadow-2xl animate-menu-in"
        >
          <ul className="px-5 py-5 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-primary/14 text-primary border border-primary/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                    )}
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
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-primary/60 bg-primary/12 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
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

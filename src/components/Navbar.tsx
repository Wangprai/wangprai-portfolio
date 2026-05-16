import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { usePersonalData } from "../hooks/usePersonalData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, t, toggleLang } = usePersonalData();

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.education, href: "#education" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-primary font-medium text-lg">
          &lt;Wangprai /&gt;
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="\src\docs\Wangprai_Resume-SE.pdf"
            className="text-sm border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/10 transition-colors duration-200"
          >
            {t.nav.resume}
          </a>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 border border-border px-3 py-1.5 rounded-md hover:border-primary/50"
          >
            <CiGlobe size={14} />
            {lang === "en" ? "TH" : "EN"}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-sm text-muted-foreground border border-border px-2 py-1 rounded-md"
          >
            <CiGlobe size={14} />
            {lang === "en" ? "TH" : "EN"}
          </button>
          <button className="text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border/50 animate-fade-in">
          <ul className="flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

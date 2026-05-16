import { ArrowDown } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";

const Hero = () => {
  const { t } = usePersonalData();
  return (
    <section className="min-h-screen flex items-center section-padding pt-32">
      <div className="max-w-3xl">
        <p className="font-mono text-primary text-md mb-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {t.hero.greeting}
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          {t.hero.name}
        </h1>
        <h2 className="text-1xl md:text-3xl lg:text-4xl font-bold text-muted-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.35s", opacity: 0 }}>
          {t.hero.tagline}
        </h2>
        <p className="text-muted-foreground max-w-lg text-lg leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
          {t.hero.description}
        </p>
        <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.65s", opacity: 0 }}>
          <a href="#projects" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            {t.hero.viewWork} <ArrowDown size={16} />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors">
            {t.hero.getInTouch}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { usePersonalData } from "../hooks/usePersonalData";

const About = () => {
  const { t } = usePersonalData();
  return (
    <section id="about" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <span className="font-mono text-primary text-lg">01.</span>
          {t.about.title}
          <span className="hidden md:block h-px bg-border flex-1 ml-4" />
        </h2>
        <div className="mt-8 grid md:grid-cols-[3fr_2fr] gap-12">
          <div className="space-y-4 text-muted-foreground leading-relaxed order-2 md:order-1">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
            <p>{t.about.p4}</p>
            <div className="mt-6">
  <h3 className="text-lg font-semibold text-foreground mb-3">
    {t.certificates.title}
  </h3>

  <div className="flex flex-wrap gap-3">
    {t.certificates.items.map((cert, index) => (
      <div key={index} className="relative group">
        <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium cursor-pointer hover:bg-primary/20 transition">
          {cert.name}
        </div>
        <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs opacity-0 group-hover:opacity-100 pointer-events-none transition">
          <div className="bg-card border border-border text-sm text-foreground rounded-lg shadow-lg px-3 py-2">
            <p className="font-semibold">{cert.name}</p>
            <p className="text-muted-foreground text-xs">
              {cert.issuer}
            </p>
            <p className="text-muted-foreground text-xs">
              {cert.date}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
          </div>
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative group w-60 h-60">
              <div className="absolute inset-0 rounded-xl border-2 border-primary translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-primary/20">
                <img
                  src="/src/assets/profile.png"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

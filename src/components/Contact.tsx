import { Mail, Phone } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";

const Contact = () => {
  const { t } = usePersonalData();
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-lg mx-auto text-center">
        <p className="font-mono text-primary text-sm mb-4">04. {t.contact.subtitle}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t.contact.title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-10">{t.contact.description}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a href="mailto:wangprai.jullapech@gmail.com" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-opacity text-lg">
            <Mail size={20} /> {t.contact.button}
          </a>
          <a href="tel:+66845431757" className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded-lg font-medium hover:bg-primary/10 transition-colors text-lg">
            <Phone size={20} /> Call me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

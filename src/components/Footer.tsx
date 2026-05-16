import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { usePersonalData } from "../hooks/usePersonalData";

const socials = [
  { icon: FaGithub, href: "https://github.com/Wangprai", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/wangprai-jullapech-2483a9378/", label: "LinkedIn" },
  { icon: FaFacebook, href: "https://www.facebook.com/B.Boszi14", label: "Facebook" },
];

const Footer = () => {
  const { t } = usePersonalData();
  return (
    <footer className="py-8 px-6 text-center">
      <div className="flex justify-center gap-6 mb-4">
        {socials.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={label}>
            <Icon size={20} />
          </a>
        ))}
      </div>
      <p className="font-mono text-xs text-muted-foreground">
        {t.footer.builtBy} © {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;

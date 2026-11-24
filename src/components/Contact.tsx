import { useState, type CSSProperties } from "react";
import { Check, Copy, FileText, Mail, Phone } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import { useTheme } from "../hooks/useTheme";
import ScrollReveal from "./motion/ScrollReveal";
import DecryptedText from "./react-bits/DecryptedText";
import Magnet from "./react-bits/Magnet";
import ParticlesField from "./react-bits/ParticlesField";
import ShinyText from "./react-bits/ShinyText";
import StarBorder from "./react-bits/StarBorder";

const EMAIL = "wangprai.jullapech@gmail.com";
const PHONE_HREF = "tel:+66845431757";
const PHONE_DISPLAY = "+66 84-543-1757";

const Contact = () => {
  const { t } = usePersonalData();
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; mailto link remains directly accessible
    }
  };

  return (
    <section
      id="contact"
      className="section-horizon section-padding pb-24 md:pb-32 relative overflow-hidden"
    >
      {/* Background Atmospheric Violet Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-[22rem] w-[42rem] rounded-full bg-primary/15 blur-[140px]"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal variant="scale">
          <StarBorder speedSeconds={7} className="rounded-3xl">
            <div className="relative overflow-hidden glass-card rounded-3xl p-8 sm:p-12 md:p-16 text-center border-primary/35 shadow-[0_32px_90px_-30px_hsl(263_85%_8%/0.8)]">
              {/* Subtle Interactive Constellation Particles Inside Contact Nexus */}
              <ParticlesField theme={theme} count={24} connectDistance={95} className="opacity-70" />

              {/* Inner Top Violet Spotlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-64 w-[28rem] rounded-full bg-gradient-to-b from-primary/28 via-accent/18 to-transparent blur-[85px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-dot-matrix opacity-35 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black_20%,transparent_100%)]"
              />

              <div className="relative z-10 max-w-2xl mx-auto">
                <p
                  className="reveal-item inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-primary bg-primary/12 border border-primary/35 px-4 py-1.5 rounded-full mb-6 shadow-[0_0_20px_-8px_hsl(var(--primary)/0.6)]"
                  style={{ "--i": 0, "--base": "70ms" } as CSSProperties}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  <span>07.</span>
                  <DecryptedText text={t.contact.subtitle} animateOnView speedMs={28} />
                </p>

                <h2
                  className="reveal-item text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.12]"
                  style={{ "--i": 1, "--base": "70ms" } as CSSProperties}
                >
                  <ShinyText durationSeconds={5.8}>{t.contact.title}</ShinyText>
                </h2>

                <p
                  className="reveal-item text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto"
                  style={{ "--i": 2, "--base": "70ms" } as CSSProperties}
                >
                  {t.contact.description}
                </p>

                {/* Primary Magnetic CTA Row */}
                <div
                  className="reveal-item flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10"
                  style={{ "--i": 3, "--base": "70ms" } as CSSProperties}
                >
                  <Magnet
                    padding={40}
                    magnetStrength={4.5}
                    maxOffset={9}
                    wrapperClassName="w-full sm:w-auto"
                  >
                    <a
                      href={`mailto:${EMAIL}`}
                      className="group/cta relative inline-flex items-center justify-center gap-2.5 overflow-hidden w-full sm:w-auto rounded-xl bg-gradient-to-r from-primary via-violet-500 to-accent px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-[0_12px_36px_-8px_hsl(var(--primary)/0.75)] hover:shadow-[0_16px_42px_-6px_hsl(var(--primary)/0.95)] transition-all duration-300"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-120%] group-hover/cta:translate-x-[420%] group-focus-visible/cta:translate-x-[420%] transition-transform duration-700 ease-out"
                      />
                      <Mail
                        size={18}
                        aria-hidden="true"
                        className="relative transition-transform duration-300 group-hover/cta:-rotate-12"
                      />
                      <span className="relative">{t.contact.button}</span>
                    </a>
                  </Magnet>

                  <Magnet
                    padding={30}
                    magnetStrength={6}
                    maxOffset={6}
                    wrapperClassName="w-full sm:w-auto"
                  >
                    <a
                      href={PHONE_HREF}
                      className="group/phone inline-flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-xl border border-primary/45 bg-background/70 backdrop-blur-md px-7 py-4 text-sm sm:text-base font-medium text-foreground hover:border-primary hover:bg-primary/12 transition-all"
                    >
                      <Phone
                        size={18}
                        className="text-primary transition-transform duration-300 group-hover/phone:rotate-12"
                        aria-hidden="true"
                      />
                      <span>{t.contact.callMe}</span>
                    </a>
                  </Magnet>
                </div>

                {/* Direct Verified Contact Channels Dock */}
                <div
                  className="reveal-item pt-6 border-t border-border/75 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm font-mono text-muted-foreground"
                  style={{ "--i": 4, "--base": "70ms" } as CSSProperties}
                >
                  <div className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background/65 backdrop-blur-sm px-3.5 py-2">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="hover:text-primary transition-colors break-all"
                    >
                      {EMAIL}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label={copied ? t.contact.copied : t.contact.copyEmail}
                      title={copied ? t.contact.copied : t.contact.copyEmail}
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border transition-all cursor-pointer shrink-0 ${
                        copied
                          ? "border-primary/70 text-primary bg-primary/15"
                          : "border-border/80 bg-card/70 text-muted-foreground hover:text-primary hover:border-primary/60"
                      }`}
                    >
                      <span key={copied ? "copied" : "copy"} className="inline-flex animate-icon-swap">
                        {copied ? (
                          <Check size={13} className="text-primary" aria-hidden="true" />
                        ) : (
                          <Copy size={13} aria-hidden="true" />
                        )}
                      </span>
                    </button>
                    <span className="sr-only" aria-live="polite">
                      {copied ? t.contact.copied : ""}
                    </span>
                  </div>

                  <a
                    href={PHONE_HREF}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background/65 backdrop-blur-sm px-3.5 py-2 hover:border-primary/60 hover:text-primary transition-all"
                  >
                    <Phone size={13} className="text-primary" aria-hidden="true" />
                    <span>{PHONE_DISPLAY}</span>
                  </a>

                  <a
                    href="/docs/Wangprai_Resume-SE.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background/65 backdrop-blur-sm px-3.5 py-2 hover:border-primary/60 hover:text-primary transition-all"
                  >
                    <FileText size={13} className="text-primary" aria-hidden="true" />
                    <span>{t.hero.viewResume}</span>
                  </a>
                </div>
              </div>
            </div>
          </StarBorder>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;

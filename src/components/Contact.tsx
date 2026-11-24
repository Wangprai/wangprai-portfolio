import { useState, type CSSProperties } from "react";
import { Check, Copy, Mail, Phone } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import ScrollReveal from "./motion/ScrollReveal";
import Magnet from "./react-bits/Magnet";

const EMAIL = "wangprai.jullapech@gmail.com";
const PHONE_HREF = "tel:+66845431757";
const PHONE_DISPLAY = "+66 84-543-1757";

const Contact = () => {
  const { t } = usePersonalData();
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
    <section id="contact" className="section-padding pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal variant="scale">
          <div className="relative overflow-hidden glass-card border-beam p-8 sm:p-12 md:p-14 text-center border-primary/30">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-56 w-96 rounded-full bg-primary/18 blur-[90px]"
            />

            <div className="relative z-10 max-w-xl mx-auto">
              <p
                className="reveal-item inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-primary bg-primary/10 border border-primary/25 px-3 py-1 rounded-full mb-5"
                style={{ "--i": 0, "--base": "80ms" } as CSSProperties}
              >
                <span>07.</span>
                <span>{t.contact.subtitle}</span>
              </p>

              <h2
                className="reveal-item text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-5"
                style={{ "--i": 1, "--base": "80ms" } as CSSProperties}
              >
                {t.contact.title}
              </h2>

              <p
                className="reveal-item text-sm sm:text-base text-muted-foreground leading-relaxed mb-9"
                style={{ "--i": 2, "--base": "80ms" } as CSSProperties}
              >
                {t.contact.description}
              </p>

              {/* Primary Direct Actions */}
              <div
                className="reveal-item flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8"
                style={{ "--i": 3, "--base": "80ms" } as CSSProperties}
              >
                <Magnet
                  padding={36}
                  magnetStrength={5}
                  maxOffset={8}
                  wrapperClassName="w-full sm:w-auto"
                >
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group/cta relative inline-flex items-center justify-center gap-2.5 overflow-hidden w-full sm:w-auto rounded-xl bg-primary px-7 py-3.5 text-sm sm:text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow duration-300"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-120%] group-hover/cta:translate-x-[420%] group-focus-visible/cta:translate-x-[420%] transition-transform duration-700 ease-out"
                    />
                    <Mail
                      size={18}
                      aria-hidden="true"
                      className="relative transition-transform duration-300 group-hover/cta:-rotate-12"
                    />
                    <span className="relative">{t.contact.button}</span>
                  </a>
                </Magnet>

                <a
                  href={PHONE_HREF}
                  className="group/phone inline-flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-xl border border-primary/50 bg-background/60 px-7 py-3.5 text-sm sm:text-base font-medium text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <Phone
                    size={18}
                    className="text-primary transition-transform duration-300 group-hover/phone:rotate-12"
                    aria-hidden="true"
                  />
                  <span>{t.contact.callMe}</span>
                </a>
              </div>

              {/* Direct Verified Details */}
              <div
                className="reveal-item pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-mono text-muted-foreground"
                style={{ "--i": 4, "--base": "80ms" } as CSSProperties}
              >
                <div className="inline-flex items-center gap-2">
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
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-md border bg-background/60 transition-colors cursor-pointer ${
                      copied
                        ? "border-primary/60 text-primary bg-primary/10"
                        : "border-border/80 text-muted-foreground hover:text-primary hover:border-primary/50"
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
                  className="hover:text-primary transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PersonalDataContext, translations, type Lang } from "../context/PersonalDataContext";

const STORAGE_KEY = "portfolio-lang";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "th" || saved === "en") {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return "en";
}

export const PersonalDataProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [transitioning, setTransitioning] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, [lang]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const toggleLang = useCallback(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setLang((prev) => (prev === "en" ? "th" : "en"));
      return;
    }

    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];

    setTransitioning(true);
    const t1 = window.setTimeout(() => {
      setLang((prev) => (prev === "en" ? "th" : "en"));
      const t2 = window.setTimeout(() => setTransitioning(false), 40);
      timersRef.current.push(t2);
    }, 160);
    timersRef.current.push(t1);
  }, []);

  const value = useMemo(
    () => ({ lang, t: translations[lang], toggleLang, transitioning }),
    [lang, toggleLang, transitioning]
  );

  return (
    <PersonalDataContext.Provider value={value}>
      {children}
    </PersonalDataContext.Provider>
  );
};

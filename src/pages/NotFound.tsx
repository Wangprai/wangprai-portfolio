import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";
import DecryptedText from "../components/react-bits/DecryptedText";
import ShinyText from "../components/react-bits/ShinyText";
import StarBorder from "../components/react-bits/StarBorder";

const NotFound = () => {
  const location = useLocation();
  const { t } = usePersonalData();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-tech-grid opacity-75"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/18 blur-[130px]"
      />
      <StarBorder speedSeconds={7} className="relative z-10 w-full max-w-md rounded-2xl">
        <main className="w-full glass-card rounded-2xl p-8 sm:p-10 text-center border-primary/35">
          <p className="font-mono text-xs tracking-[0.22em] uppercase text-primary mb-3">
            <DecryptedText text={location.pathname} speedMs={24} />
          </p>
          <h1 className="text-7xl sm:text-8xl font-bold mb-3">
            <ShinyText durationSeconds={4.5}>{t.notFound.code}</ShinyText>
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
            {t.notFound.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
            {t.notFound.description}
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-violet-500 to-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:opacity-95 hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t.notFound.returnHome}
          </Link>
        </main>
      </StarBorder>
    </div>
  );
};

export default NotFound;

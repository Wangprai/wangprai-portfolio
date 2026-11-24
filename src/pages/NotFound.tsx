import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePersonalData } from "../hooks/usePersonalData";

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
        className="pointer-events-none absolute inset-0 bg-tech-grid opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
      />
      <main className="relative z-10 w-full max-w-md glass-card p-8 sm:p-10 text-center">
        <p className="font-mono text-xs tracking-[0.22em] uppercase text-primary mb-3">
          {location.pathname}
        </p>
        <h1 className="text-6xl sm:text-7xl font-bold text-gradient mb-3">
          {t.notFound.code}
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
          {t.notFound.title}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
          {t.notFound.description}
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-95 hover:-translate-y-0.5"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t.notFound.returnHome}
        </Link>
      </main>
    </div>
  );
};

export default NotFound;

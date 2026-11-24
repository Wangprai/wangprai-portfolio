interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ index, title, subtitle }: SectionHeadingProps) => {
  return (
    <div className="mb-10 md:mb-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-primary bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded-md">
          {index}
        </span>
        {subtitle && (
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {subtitle}
          </span>
        )}
        <span
          aria-hidden="true"
          className="hidden sm:block h-px flex-1 bg-gradient-to-r from-border via-border/60 to-transparent ml-2"
        />
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;

type ProcessStepItem = {
  title: string;
  body: string;
  duration?: string;
};

type ProcessListProps = {
  steps: ProcessStepItem[];
  className?: string;
};

export function ProcessList({ steps, className = "" }: ProcessListProps) {
  return (
    <ol
      className={`grid grid-cols-1 gap-px overflow-hidden border-y hairline md:grid-cols-[var(--cols)] md:gap-0 ${className}`}
      style={{ ["--cols" as string]: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="relative flex flex-col gap-3 border-b hairline bg-brand-cream px-1 py-8 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:py-10"
        >
          <div className="flex items-baseline gap-3">
            <span
              className="font-[var(--font-fraunces)] text-4xl font-medium text-brand-sage md:text-5xl"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {step.duration ? <span className="meta">{step.duration}</span> : null}
          </div>
          <h3 className="font-[var(--font-fraunces)] text-xl font-medium leading-tight text-brand-ink md:text-2xl">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-brand-ink/70 md:text-base">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

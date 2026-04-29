import { CheckCircle2, MessageSquareText, SlidersHorizontal } from "lucide-react";

type ProcessStepItem = {
  title: string;
  body: string;
  duration?: string;
};

type ProcessListProps = {
  steps: ProcessStepItem[];
  className?: string;
};

const stepIcons = [MessageSquareText, SlidersHorizontal, CheckCircle2];

export function ProcessList({ steps, className = "" }: ProcessListProps) {
  return (
    <ol
      className={`-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 md:grid md:grid-cols-[var(--cols)] md:gap-3 md:overflow-visible md:pb-0 ${className}`}
      style={{ ["--cols" as string]: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((step, index) => {
        const StepIcon = stepIcons[index] ?? CheckCircle2;

        return (
          <li
            key={step.title}
            className="group relative flex min-w-[82%] snap-start flex-col overflow-hidden rounded-lg border hairline bg-brand-cream p-5 shadow-[0_14px_32px_rgba(20,26,20,0.04)] transition duration-300 hover:-translate-y-1 hover:border-brand-sage hover:bg-white hover:shadow-soft sm:min-w-[19rem] md:min-w-0 md:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-sage/40 bg-brand-bone font-[var(--font-inter)] text-sm font-semibold leading-none text-brand-forest transition-colors group-hover:border-brand-forest group-hover:bg-brand-forest group-hover:text-brand-cream"
                  aria-hidden
                >
                  {index + 1}
                </span>
                {step.duration ? (
                  <span className="meta max-w-[9rem] text-brand-forest">{step.duration}</span>
                ) : null}
              </div>
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-sage/15 text-brand-forest transition-colors group-hover:bg-brand-tan/40"
                aria-hidden
              >
                <StepIcon className="h-5 w-5" strokeWidth={1.8} />
              </span>
            </div>

            <div className="mt-7 flex flex-1 flex-col">
              <h3 className="font-[var(--font-fraunces)] text-[1.55rem] font-medium leading-[1.05] text-brand-ink md:text-[1.7rem]">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-brand-ink/70 md:text-[0.98rem]">
                {step.body}
              </p>
            </div>

            <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-brand-sage/20">
              <div
                className="h-full rounded-full bg-brand-forest transition-all duration-500 group-hover:bg-brand-moss"
                style={{ width: `${((index + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-brand-sage/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </li>
        );
      })}
    </ol>
  );
}

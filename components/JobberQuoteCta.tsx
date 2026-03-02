import { JOBBER_REQUEST_FORM_URL } from "@/lib/constants";

type JobberQuoteCtaProps = {
  label?: string;
  ariaLabel?: string;
  source: string;
  className?: string;
};

export function JobberQuoteCta({
  label = "Start Free Quote",
  ariaLabel = "Start your quote in Jobber",
  source,
  className = ""
}: JobberQuoteCtaProps) {
  return (
    <a
      href={JOBBER_REQUEST_FORM_URL}
      aria-label={ariaLabel}
      data-track-event="jobber_quote_start_click"
      data-track-params={JSON.stringify({ source })}
      className={className}
    >
      {label}
    </a>
  );
}

type PullQuoteProps = {
  quote: string;
  author: string;
  location?: string;
  tone?: "ink" | "cream";
  className?: string;
};

export function PullQuote({
  quote,
  author,
  location,
  tone = "ink",
  className = ""
}: PullQuoteProps) {
  const isCream = tone === "cream";
  return (
    <figure className={`max-w-3xl ${className}`}>
      <blockquote
        className={`pull ${isCream ? "text-brand-cream" : "text-brand-ink"}`}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption
        className={`meta mt-5 ${isCream ? "text-brand-cream/65" : ""}`}
      >
        {author}{location ? ` — ${location}` : ""}
      </figcaption>
    </figure>
  );
}

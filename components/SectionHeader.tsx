import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  lede?: string;
  meta?: string;
  link?: { href: string; label: string };
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  title,
  lede,
  meta,
  link,
  align = "left",
  className = ""
}: SectionHeaderProps) {
  return (
    <header
      className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : ""} ${className}`}
    >
      {meta ? <p className="meta">{meta}</p> : null}
      <h2 className="h-section max-w-3xl">{title}</h2>
      {lede ? <p className="lede max-w-2xl">{lede}</p> : null}
      {link ? (
        <Link
          href={link.href}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-forest underline-offset-4 hover:underline"
        >
          {link.label} <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </header>
  );
}

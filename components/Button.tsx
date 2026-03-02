import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  ariaLabel: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-brand-accent text-white hover:bg-brand-primary border border-brand-accent hover:border-brand-primary",
  secondary:
    "bg-white text-brand-primary border border-brand-primary hover:bg-brand-light",
  ghost: "bg-transparent text-white border border-white/70 hover:bg-white/10"
};

export function Button({
  href,
  children,
  ariaLabel,
  variant = "primary",
  className = ""
}: ButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

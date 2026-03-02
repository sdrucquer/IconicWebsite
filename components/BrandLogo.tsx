import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
  fallbackClassName?: string;
};

export function BrandLogo({ className = "", compact = false }: BrandLogoProps) {
  return (
    <Image
      src={compact ? "/brand/iconic-logo-mark.png" : "/brand/iconic-logo-wordmark.png"}
      alt="Iconic Landscaping"
      width={compact ? 48 : 220}
      height={compact ? 48 : 220}
      className={className || (compact ? "h-10 w-10 object-contain" : "h-12 w-auto object-contain")}
      priority={compact}
    />
  );
}

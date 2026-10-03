import Link from "next/link";
import { BRAND } from "@srm/config";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** "dark" = navy wordmark for light backgrounds, "light" = white wordmark for gradients. */
  tone?: "dark" | "light";
  showTagline?: boolean;
  href?: string | null;
}

/**
 * Wordmark + colourful box mark. Pure SVG/CSS: no image request, sharp at every size,
 * and the mark keeps its category-colour corner so the brand reads as packaging-first.
 */
export function Logo({
  className,
  tone = "dark",
  showTagline = true,
  href = "/",
}: LogoProps): JSX.Element {
  const content = (
    <span className={cn("group inline-flex items-center gap-3", className)}>
      <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center">
        <svg viewBox="0 0 44 44" className="h-11 w-11" role="img" aria-label="SRM Enterprises logo">
          <title>SRM Enterprises</title>
          <defs>
            <linearGradient id="logo-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E8F1FF" />
            </linearGradient>
            <linearGradient id="logo-left" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-deep)" />
            </linearGradient>
            <linearGradient id="logo-right" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-secondary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          <ellipse cx="22" cy="39" rx="14" ry="3.5" fill="var(--accent)" opacity="0.18" />
          <path d="M10 16 L22 10 L34 16 L34 30 L22 36 L10 30 Z" fill="url(#logo-left)" />
          <path d="M10 16 L22 22 L34 16 L34 30 L22 36 L10 30 Z" fill="url(#logo-right)" opacity="0.92" />
          <path d="M10 16 L22 22 L34 16" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" opacity="0.9" />
          <path d="M22 22 L22 36" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinejoin="round" opacity="0.75" />
          <rect x="19" y="10" width="6" height="6" rx="1.6" fill="var(--accent-highlight)" />
          <path d="M13 31.5 q4.5 2.8 9 0 q4.5 -2.8 9 0" fill="none" stroke="url(#logo-top)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-extrabold tracking-[0.08em] sm:text-xl",
            tone === "light" ? "text-white" : "text-navy",
          )}
        >
          SRM ENTERPRISES
        </span>
        {showTagline ? (
          <span
            className={cn(
              "mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] sm:text-[0.65rem]",
              tone === "light" ? "text-white/85" : "text-navy-soft",
            )}
          >
            {BRAND.tagline}
          </span>
        ) : null}
      </span>
    </span>
  );

  if (href === null) return content;

  return (
    <Link
      href={href}
      aria-label="SRM Enterprises — home"
      className="rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/40"
    >
      {content}
    </Link>
  );
}

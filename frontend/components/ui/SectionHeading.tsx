import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Animated gradient on the title (used for key headlines). */
  gradient?: boolean;
  align?: "left" | "center";
  className?: string;
  /** Shown under the title as a coloured underline that grows in. */
  underline?: boolean;
  as?: "h2" | "h3";
}

/**
 * Section-level heading with eyebrow, animated gradient option, and the coloured
 * underline that follows the current accent (mood or product category).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  gradient = false,
  align = "left",
  className,
  underline = true,
  as = "h2",
}: SectionHeadingProps): JSX.Element {
  const Tag = as;

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal variant="fade-up" duration={0.45}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      ) : null}

      <Reveal variant="fade-up" delay={0.05}>
        <Tag
          className={cn(
            "text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.6rem] sm:leading-[1.1]",
            gradient ? "text-gradient-animated" : "text-navy",
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {underline ? (
        <Reveal variant="slide-right" delay={0.1} duration={0.5}>
          <span
            aria-hidden="true"
            className="block h-1.5 w-24 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
          />
        </Reveal>
      ) : null}

      {description ? (
        <Reveal variant="fade-up" delay={0.14}>
          <div
            className={cn(
              "max-w-3xl text-base leading-relaxed text-navy-soft sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}

import type { ReactNode } from "react";
import { Blobs } from "@/components/ui/Blobs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/animations/Reveal";
import { WavyDivider } from "@/components/animations/WavyDivider";
import type { BreadcrumbEntry } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs: BreadcrumbEntry[];
  /** Category colour for the page accent (defaults to the live site accent). */
  accentColor?: string;
  /** data-category value: makes the whole subtree adopt that category's accent. */
  categorySlug?: string;
  children?: ReactNode;
  /** Wavy divider colour at the bottom of the hero band. */
  waveColor?: string;
  align?: "left" | "center";
  size?: "default" | "compact";
}

/**
 * Shared hero for every inner page: breadcrumbs, eyebrow, one H1, supporting copy and
 * an optional actions slot. The accent follows the category colour passed in, which is
 * what drives the page-level colour shift on product and industry pages.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  accentColor,
  categorySlug,
  children,
  waveColor = "#FFFFFF",
  align = "left",
  size = "default",
}: PageHeroProps): JSX.Element {
  return (
    <section
      className="relative isolate overflow-hidden"
      data-category={categorySlug}
      style={accentColor ? { ["--accent" as string]: accentColor } : undefined}
      aria-labelledby="page-hero-heading"
    >
      <Blobs count={4} />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-accent-soft/70 via-white to-white"
      />

      <div
        className={cn(
          "container-page relative z-10",
          size === "compact" ? "pb-12 pt-8 sm:pb-16 sm:pt-10" : "pb-16 pt-9 sm:pb-20 sm:pt-12",
        )}
      >
        <Breadcrumbs items={breadcrumbs} accentColor={accentColor} className="mb-6" />

        <div className={cn("flex max-w-4xl flex-col gap-5", align === "center" && "mx-auto items-center text-center")}>
          {eyebrow ? (
            <Reveal variant="fade-up" duration={0.45}>
              <span className="eyebrow">{eyebrow}</span>
            </Reveal>
          ) : null}

          <Reveal variant="fade-up" delay={0.05}>
            <h1
              id="page-hero-heading"
              className="font-display text-[1.9rem] font-extrabold leading-[1.12] text-navy sm:text-4xl lg:text-[3.1rem]"
            >
              {title}
            </h1>
          </Reveal>

          <Reveal variant="slide-right" delay={0.1} duration={0.5}>
            <span
              aria-hidden="true"
              className="block h-1.5 w-28 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
            />
          </Reveal>

          {description ? (
            <Reveal variant="fade-up" delay={0.15}>
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

          {children ? (
            <Reveal variant="fade-up" delay={0.2} className="mt-2 w-full">
              {children}
            </Reveal>
          ) : null}
        </div>
      </div>

      <WavyDivider color={waveColor} className="relative z-0" />
    </section>
  );
}

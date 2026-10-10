import type { ReactNode } from "react";
import Image from "next/image";
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
  /** Optional background image with left-side readability overlay. */
  backgroundImage?: string;
  /** Keep the bottom edge straight instead of a wavy divider. */
  straightBottom?: boolean;
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
  backgroundImage,
  straightBottom = false,
}: PageHeroProps): JSX.Element {
  const isLeft = align === "left" || Boolean(backgroundImage);
  const isStraight = straightBottom || Boolean(backgroundImage);

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        isStraight && "border-b border-navy/10",
      )}
      data-category={categorySlug}
      style={accentColor ? { ["--accent" as string]: accentColor } : undefined}
      aria-labelledby="page-hero-heading"
    >
      {backgroundImage ? (
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          {/* White overlay on left side moved further left so right side remains completely unobstructed */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-40% to-transparent sm:via-white/90 sm:via-35% lg:via-white/90 lg:via-32% lg:to-transparent lg:to-55%"
          />
        </div>
      ) : (
        <>
          <Blobs count={4} />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-accent-soft/70 via-white to-white"
          />
        </>
      )}

      <div
        className={cn(
          "mx-auto w-full max-w-9xl px-4 sm:px-6 lg:px-8 relative z-10",
          size === "compact" ? "pb-12 pt-8 sm:pb-16 sm:pt-10" : "pb-16 pt-9 sm:pb-20 sm:pt-12",
        )}
      >
        <Breadcrumbs items={breadcrumbs} accentColor={accentColor} className="mb-6" />

        <div
          className={cn(
            "flex flex-col gap-5 text-left items-start",
            backgroundImage ? "max-w-xl lg:max-w-2xl" : "max-w-4xl",
            !isLeft && "mx-auto items-center text-center",
          )}
        >
          {eyebrow ? (
            <Reveal variant="kinetic-pop" duration={0.45}>
              <span className="eyebrow badge-interactive cursor-default shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
                {eyebrow}
              </span>
            </Reveal>
          ) : null}

          <Reveal variant="depth-zoom" delay={0.05}>
            <h1
              id="page-hero-heading"
              className="heading-shimmer-hover font-display text-[1.9rem] font-bold leading-[1.1] text-navy transition-all duration-300 sm:text-4xl lg:text-[3.1rem] sm:leading-[1.1]"
            >
              {title}
            </h1>
          </Reveal>

          <Reveal variant="split-left" delay={0.1} duration={0.5}>
            <span
              aria-hidden="true"
              className="block h-1.5 w-28 rounded-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-500 hover:w-44"
            />
          </Reveal>

          {description ? (
            <Reveal variant="fade-up" delay={0.15}>
              <div
                className={cn(
                  "max-w-3xl text-base leading-relaxed text-navy-soft sm:text-lg",
                  !isLeft && "mx-auto",
                )}
              >
                {description}
              </div>
            </Reveal>
          ) : null}

          {children ? (
            <Reveal variant="flip-up" delay={0.2} className="mt-2 w-full">
              {children}
            </Reveal>
          ) : null}
        </div>
      </div>

      {!isStraight && <WavyDivider color={waveColor} className="relative z-0" />}
    </section>
  );
}

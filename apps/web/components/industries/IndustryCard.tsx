"use client";

import { ArrowRight } from "lucide-react";
import type { Industry } from "@/data/industries";
import { TiltCard } from "@/components/animations/TiltCard";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { IndustryArtwork } from "@/components/ui/art";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface IndustryCardProps {
  industry: Industry;
  className?: string;
  /** Fixed width variant for the horizontal swipe rail on mobile. */
  rail?: boolean;
}

/**
 * Industry card. Feature 6: the card starts white and picks up its own colour wash on
 * hover, with the icon block inverting to white.
 */
export function IndustryCard({ industry, className, rail = false }: IndustryCardProps): JSX.Element {
  return (
    <TiltCard
      href={`/industries/${industry.slug}`}
      accentColor={industry.color}
      ariaLabel={`${industry.name} — packaging approach`}
      className={cn("card-interactive", rail && "w-[280px] shrink-0 snap-start sm:w-[320px]", className)}
      onActivate={() => analytics.ctaClick(industry.name, "industries")}
    >
      <div className="flex h-full flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl text-white transition-all duration-500 group-hover:scale-110 group-hover:ring-4 group-hover:ring-white/40 shadow-sm"
            style={{ background: industry.color }}
          >
            <CategoryIcon name={industry.icon} className="h-7 w-7" color="#FFFFFF" />
          </span>
          <ArrowRight
            className="h-5 w-5 icon-arrow-spring transition-transform duration-300"
            style={{ color: industry.color }}
            aria-hidden="true"
          />
        </div>

        <h3 className="font-display text-lg font-bold text-navy transition-all duration-300 group-hover:text-accent group-hover:translate-x-1">
          {industry.name}
        </h3>
        <p className="text-sm leading-relaxed text-navy-soft">{industry.tagline}</p>

        <div className="mt-auto overflow-hidden rounded-2xl" style={{ background: `${industry.color}12` }}>
          <IndustryArtwork
            iconKey={industry.icon}
            accent={industry.color}
            className="media-zoom h-28 w-full transition-transform duration-700 group-hover:scale-110"
            title={`${industry.name} illustration`}
          />
        </div>

        <span className="text-xs font-bold uppercase tracking-wide underline-grow transition-all duration-300 group-hover:translate-x-1" style={{ color: industry.color }}>
          View packaging approach
        </span>
      </div>
    </TiltCard>
  );
}

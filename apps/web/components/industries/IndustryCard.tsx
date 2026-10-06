"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Industry } from "@/data/industries";
import { TiltCard } from "@/components/animations/TiltCard";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const INDUSTRY_PACKAGING_IMAGES: Record<string, string> = {
  automotive: "/images/packagings/automotive.png",
  engineering: "/images/packagings/engineering.png",
  electronics: "/images/packagings/electronics.png",
  pharmaceuticals: "/images/packagings/pharma.png",
  pharma: "/images/packagings/pharma.png",
  "food-fmcg": "/images/packagings/fmcg.png",
  food: "/images/packagings/fmcg.png",
  "ecommerce-logistics": "/images/packagings/ecommerce.png",
  logistics: "/images/packagings/ecommerce.png",
};

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
      className={cn("card-sector-hex group overflow-hidden", rail && "w-[280px] shrink-0 snap-start sm:w-[320px]", className)}
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

        <div className="mt-auto relative h-28 w-full overflow-hidden rounded-2xl" style={{ background: `${industry.color}12` }}>
          <Image
            src={INDUSTRY_PACKAGING_IMAGES[industry.slug] ?? INDUSTRY_PACKAGING_IMAGES[industry.icon] ?? "/images/packagings/automotive.png"}
            alt={`${industry.name} packaging`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="media-zoom object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <span className="text-xs font-bold uppercase tracking-wide underline-grow transition-all duration-300 group-hover:translate-x-1" style={{ color: industry.color }}>
          View packaging approach
        </span>
      </div>
    </TiltCard>
  );
}

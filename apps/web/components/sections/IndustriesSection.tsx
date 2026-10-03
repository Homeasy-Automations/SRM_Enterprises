import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Marquee } from "@/components/animations/Marquee";

const INDUSTRY_MARQUEE = industries.map((industry) => industry.name);

/** Section 5: Industries We Serve — Packaging for Different Industries. Built for Different Requirements. */
export function IndustriesSection(): JSX.Element {
  return (
    <section className="band-white section-pad relative pattern-hex" aria-labelledby="industries-heading">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="INDUSTRIES"
            title="Packaging for Different Industries. Built for Different Requirements."
            description="Our packaging materials support businesses across manufacturing, industrial, commercial and logistics environments where product protection, handling and reliable supply are essential."
            className="max-w-3xl"
          />

          <Reveal variant="fade-up" className="shrink-0">
            <MagneticButton href="/industries" variant="outline">
              View All Industries
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </Reveal>
        </div>
      </div>

      {/* Mobile: swipe rail. Desktop: grid. */}
      <div className="mt-10 lg:hidden">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:px-6">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} rail className="snap-center" />
          ))}
          <span className="w-2 shrink-0" aria-hidden="true" />
        </div>
        <p className="container-page mt-1 text-xs font-medium text-navy-soft">
          Swipe to see all six industries →
        </p>
      </div>

      <div className="container-page mt-10 hidden lg:block">
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {industries.map((industry) => (
            <StaggerItem key={industry.slug} variant="flip-up" className="h-full">
              <IndustryCard industry={industry} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <div className="mt-12 border-y border-navy/10 bg-gradient-to-r from-white via-accent-soft to-[#FFF9F0] py-3">
        <Marquee items={INDUSTRY_MARQUEE} speed={30} reverse separator="◆" />
      </div>
    </section>
  );
}

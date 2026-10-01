import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { ABOUT_DESCRIPTION, ABOUT_INTRO, ABOUT_POINTS } from "@/lib/constants";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { FactoryArt, WarehouseArt } from "@/components/ui/art";

/** Homepage about preview — "One Partner. Multiple Packaging Solutions." */
export function AboutPreview(): JSX.Element {
  return (
    <section className="band-white section-pad relative" aria-labelledby="about-preview-heading">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="About SRM Enterprises"
              title={ABOUT_INTRO}
              description={ABOUT_DESCRIPTION}
              className="[&_h2]:text-3xl sm:[&_h2]:text-4xl"
            />

            <StaggerGroup as="ul" className="flex flex-col gap-3">
              {ABOUT_POINTS.map((point) => (
                <StaggerItem as="li" key={point} variant="slide-right" className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-deep">
                    <CircleCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-navy-soft sm:text-base">{point}</span>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal variant="fade-up" delay={0.1}>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton href="/about" variant="primary">
                  More About Us
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
                <Link href="/custom-packaging" className="link-accent inline-flex min-h-[44px] items-center">
                  See the custom packaging process
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal variant="clip" className="relative">
            <MediaPanel imageKey="aboutFacility" accent="#1E6FFF" aspect="video" pattern>
              <div className="grid h-full grid-cols-2 items-end gap-3">
                <FactoryArt accent="#1E6FFF" className="h-full w-full" title="Manufacturing and trading illustration" />
                <WarehouseArt accent="#19B26B" className="h-full w-full" title="Warehouse and dispatch illustration" />
              </div>
            </MediaPanel>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Corrugated", "EPE Foam", "Bubble", "Poly & Films"].map((label, index) => (
                <Reveal
                  key={label}
                  variant="scale-in"
                  delay={0.06 * index}
                  className="rounded-2xl border border-navy/10 bg-white px-3 py-3 text-center text-xs font-semibold text-navy-soft shadow-soft"
                >
                  {label}
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

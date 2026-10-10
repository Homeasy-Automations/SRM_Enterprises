"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sliders, IndianRupee, Truck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";

const VALUE_POINTS = [
  {
    title: "Quality Focus",
    description: "Consistent attention to material, dimensions, thickness and product specifications.",
    icon: CheckCircle2,
    color: "#1E6FFF",
  },
  {
    title: "Custom Specifications",
    description: "Packaging can be supplied according to required size, thickness, ply, printing and application.",
    icon: Sliders,
    color: "#E86620",
  },
  {
    title: "Competitive Value",
    description: "Packaging solutions designed to meet operational requirements while maintaining competitive pricing.",
    icon: IndianRupee,
    color: "#19B26B",
  },
  {
    title: "Reliable Supply",
    description: "Planned dispatch and bulk-supply support for recurring and project-based packaging requirements.",
    icon: Truck,
    color: "#8438FF",
  },
];

/** Section 3: Why SRM Enterprises — One Packaging Partner. Multiple Requirements. */
export function WhyChooseUs(): JSX.Element {
  return (
    <section className="band-sky section-pad relative pattern-dots" aria-labelledby="why-srm-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="WHY SRM"
          title="One Packaging Partner. Multiple Requirements."
          description="Packaging requirements can vary by product, application, handling conditions and supply volume. SRM Enterprises works with businesses to provide packaging materials according to their specific requirements while supporting consistent quality and dependable bulk supply."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <StaggerGroup className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {VALUE_POINTS.map((reason) => {
            const Icon = reason.icon;
            return (
              <StaggerItem key={reason.title} variant="kinetic-pop" className="h-full">
                <TiltCard accentColor={reason.color} className="card-home-vivid h-full">
                  <div className="flex h-full flex-col justify-between gap-5 p-6">
                    <div>
                      <span
                        className="grid h-13 w-13 place-items-center rounded-2xl text-white shadow-xs transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ background: reason.color }}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>

                      <h3 className="mt-4 font-ui text-xl font-bold text-navy transition-all duration-300 group-hover:text-accent-deep group-hover:translate-x-1">
                        {reason.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-navy-soft">{reason.description}</p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="block h-1.5 w-12 rounded-full transition-all duration-500 group-hover:w-full"
                      style={{ background: `linear-gradient(90deg, ${reason.color}, ${reason.color}44)` }}
                    />
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal variant="fade-up" delay={0.12} className="mt-8 sm:mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-accent-deep hover:shadow-lg hover:scale-105"
          >
            <span>Talk to Our Packaging Team</span>
            <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

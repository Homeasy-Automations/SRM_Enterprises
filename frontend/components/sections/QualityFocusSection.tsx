"use client";

import Image from "next/image";
import { Ruler, Sliders, Truck, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";

const QUALITY_POINTS = [
  {
    title: "Material Consistency",
    description: "Packaging materials precisely aligned with the agreed GSM, polymer density and strength rating across repeat orders.",
    icon: ShieldCheck,
    color: "#1E6FFF",
  },
  {
    title: "Dimensional Control",
    description: "Accurate sizes, creasing and die-cut tolerances based strictly on approved prototype specifications.",
    icon: Ruler,
    color: "#E86620",
  },
  {
    title: "Application-Based Selection",
    description: "Materials engineered and suggested according to the exact product weight, transit mode and surface sensitivity.",
    icon: Sliders,
    color: "#19B26B",
  },
  {
    title: "Supply Reliability",
    description: "Disciplined production schedules, buffer stock staging and scheduled dispatch for uninterrupted packing lines.",
    icon: Truck,
    color: "#8438FF",
  },
];

/** Section 10: Quality Focus — Consistent Specifications. Reliable Packaging Supply. */
export function QualityFocusSection(): JSX.Element {
  return (
    <section className="band-cream section-pad relative overflow-hidden" aria-labelledby="quality-focus-heading">
      <div className="container-page relative z-10">
        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-12">
          {/* Quality Artwork & Visual (5 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="card-home-vivid overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 sm:p-8 shadow-sm">
              <span className="eyebrow badge-interactive inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                Inspection & Control
              </span>
              <h3 className="font-display text-2xl font-bold text-navy">
                Strict Dimensional &amp; Specification Tolerances
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-soft">
                From incoming kraft reels and foam rolls to pre-dispatch dimensional checks, our quality control ensures seamless line packing.
              </p>
              <div className="mt-6 relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-navy/10 bg-slate-100 shadow-sm group">
                <Image
                  src="/images/home.png"
                  alt="Quality control, prototype inspection and dimensional tolerance verification"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between rounded-lg bg-white/95 backdrop-blur-md px-3 py-1.5 text-[11px] font-mono font-semibold text-navy shadow-xs border border-white/60">
                  <span className="flex items-center gap-1.5 font-sans font-bold text-accent-deep">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Zero-Play Tolerance Checks
                  </span>
                  <span className="text-navy-soft">Batch Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Headings & 4 Quality Points (7 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <SectionHeading
              eyebrow="QUALITY FOCUS"
              title="Consistent Specifications. Reliable Packaging Supply."
              description="For industrial packaging, consistency matters. Variations in material, dimensions, thickness or construction can affect handling, storage and product protection. SRM Enterprises focuses on maintaining consistency across packaging specifications while supplying materials according to the requirements agreed with each customer."
            />

            <StaggerGroup className="grid gap-4 sm:grid-cols-2 pt-2" stagger={0.08}>
              {QUALITY_POINTS.map((pt) => {
                const Icon = pt.icon;
                return (
                  <StaggerItem key={pt.title} variant="kinetic-pop" className="h-full">
                    <div
                      className="card-home-vivid group flex h-full flex-col justify-between gap-3 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      style={{ ["--accent" as string]: pt.color }}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-xs transition-transform duration-300 group-hover:scale-110"
                          style={{ background: pt.color }}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="font-display text-base font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                            {pt.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-navy-soft">{pt.description}</p>
                        </div>
                      </div>
                      <div
                        className="h-1 w-6 rounded-full transition-all duration-300 group-hover:w-full"
                        style={{ background: pt.color }}
                      />
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, Factory, Repeat, Sliders, Truck } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";

const CAPABILITY_HIGHLIGHTS = [
  {
    title: "Custom Production",
    description: "Engineered packaging solutions crafted to your exact dimensional, ply and load-bearing requirements.",
    icon: Factory,
    color: "#1E6FFF",
  },
  {
    title: "Full-Range Supply",
    description: "Single-source procurement across every industrial packaging material category under one purchase order.",
    icon: Repeat,
    color: "#E86620",
  },
  {
    title: "Custom Packaging",
    description: "Application-specific dimensions, materials, thicknesses, ply and protective configurations.",
    icon: Sliders,
    color: "#19B26B",
  },
  {
    title: "Bulk Supply",
    description: "Dependable packaging material support for recurring industrial, commercial and plant requirements.",
    icon: Truck,
    color: "#8438FF",
  },
];

/** Section 6: Comprehensive Packaging Solutions & Supply Capability. */
export function PackagingSolutionsSection(): JSX.Element {
  return (
    <section className="band-cream section-pad relative overflow-hidden" aria-labelledby="capability-heading">
      <div className="container-page relative z-10">
        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-12">
          {/* Visual Showcase (5 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="card-home-vivid overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 sm:p-8 shadow-sm">
              <span className="eyebrow badge-interactive inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-4">
                Industrial Footprint
              </span>
              <h3 className="font-display text-2xl font-bold text-navy">
                Integrated Supply Infrastructure
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-soft">
                Planned buffer stocks, automated conversion lines and coordinated dispatch lines supporting
                industrial facilities and OEM clusters across Pan India.
              </p>
              <div className="mt-6 relative overflow-hidden rounded-2xl border border-navy/10 bg-slate-100 shadow-sm group">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src="/images/integrated.png"
                    alt="Integrated Supply Infrastructure - Automated Corrugation Lines & Dispatch Staging"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between rounded-lg bg-white/95 backdrop-blur-md px-3 py-1.5 text-[11px] font-mono font-semibold text-navy shadow-xs border border-white/60">
                    <span className="flex items-center gap-1.5 font-sans font-bold text-accent-deep">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Facility &amp; Logistics
                    </span>
                    <span className="text-navy-soft">Pan-India Dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details & 4 Highlights (7 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <SectionHeading
              eyebrow="CAPABILITY"
              title="Complete Packaging Solutions for Every Requirement"
              description="SRM Enterprises delivers comprehensive packaging solutions across every category in our catalog — from engineered corrugated boxes and fabricated EPE foam to bubble rolls, poly films, and specialized industrial accessories. Built to your exact specifications with planned supply across Pan India."
            />

            <StaggerGroup className="grid gap-4 sm:grid-cols-2 pt-2" stagger={0.08}>
              {CAPABILITY_HIGHLIGHTS.map((cap) => {
                const Icon = cap.icon;
                return (
                  <StaggerItem key={cap.title} variant="kinetic-pop" className="h-full">
                    <div
                      className="card-home-vivid group flex h-full flex-col justify-between gap-3 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      style={{ ["--accent" as string]: cap.color }}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-xs transition-transform duration-300 group-hover:scale-110"
                          style={{ background: cap.color }}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="font-display text-base font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                            {cap.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-navy-soft">{cap.description}</p>
                        </div>
                      </div>
                      <div
                        className="h-1 w-6 rounded-full transition-all duration-300 group-hover:w-full"
                        style={{ background: cap.color }}
                      />
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>

            <Reveal variant="fade-up" delay={0.12} className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent transition-all duration-200 hover:gap-3"
              >
                <span className="underline-grow">Explore Our Capabilities</span>
                <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

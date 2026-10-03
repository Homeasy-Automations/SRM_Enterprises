"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Clock, CheckCircle2, Globe, Truck, ShieldCheck, Warehouse } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";

const PAN_INDIA_REGIONS = [
  {
    id: "north",
    name: "Northern Industrial Corridor",
    headline: "Daily High-Frequency Logistics Routes",
    coverage: "Delhi, Haryana, Rajasthan, Punjab, UP & Uttarakhand",
    schedule: "Daily Plant Replenishment & JIT Routes",
    color: "#1E6FFF",
    features: [
      "OEM plant scheduled morning dispatches",
      "Buffer stock staging for high-consumption lines",
      "Direct plant dock unloading & pallet returns",
    ],
  },
  {
    id: "west-central",
    name: "Western & Central Industrial Belts",
    headline: "Full Truckload & Containerized Supply",
    coverage: "Gujarat, Maharashtra, Madhya Pradesh & Goa",
    schedule: "Scheduled Express Freight Routes",
    color: "#E86620",
    features: [
      "Dedicated Full Truckload (FTL) consignments",
      "Chemical, engineering & automotive OEM supplies",
      "Moisture-barrier pallet wrapping for transit",
    ],
  },
  {
    id: "south",
    name: "Southern Electronics & Auto Clusters",
    headline: "Precision Shock & ESD-Guarded Freight",
    coverage: "Karnataka, Tamil Nadu, Telangana & Andhra Pradesh",
    schedule: "Inter-State Express Line-Haul",
    color: "#19B26B",
    features: [
      "ESD-safe pink/black conductive foam consignments",
      "Precision cut-to-size divider fitments",
      "Multi-tier container stacking verification",
    ],
  },
  {
    id: "east-national",
    name: "Eastern & Pan-India Network",
    headline: "Nationwide Rail, Road & Seaworthy Port Dispatch",
    coverage: "West Bengal, Odisha, Central Belts & Major Port Gateways",
    schedule: "Multi-Modal Freight Logistics",
    color: "#8438FF",
    features: [
      "Seaworthy export packaging with VCI moisture barrier",
      "High-tensile PET strapped container bundles",
      "End-to-end consignment tracking and dispatch sign-off",
    ],
  },
];

/** Section 12: Pan-India Supply — Nationwide Industrial Packaging Supply & Dispatch. */
export function LocationsHomeSection(): JSX.Element {
  return (
    <section className="band-white section-pad relative overflow-hidden pattern-dots" aria-labelledby="pan-india-heading">
      <div className="container-page relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="PAN-INDIA SUPPLY NETWORK"
            title="Nationwide Industrial Packaging Supply & Dispatch"
            description="SRM Enterprises supports industrial supply chains, OEM assembly plants, and commercial distribution operations across Pan India with planned bulk dispatches."
            className="max-w-3xl"
          />

          <Reveal variant="fade-up" className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-navy/90 hover:shadow-lg hover:scale-105"
            >
              <Globe className="h-4 w-4 text-accent" />
              <span>Get Pan-India Quote</span>
              <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {PAN_INDIA_REGIONS.map((region) => (
            <StaggerItem key={region.id} variant="flip-up" className="h-full">
              <article
                className="card-heritage-pedestal group flex h-full flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ ["--accent" as string]: region.color }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-xs transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: region.color }}
                    >
                      <Truck className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: `${region.color}15`, color: region.color }}
                    >
                      Pan-India Corridor
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-navy transition-colors duration-200 group-hover:text-primary">
                      {region.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold" style={{ color: region.color }}>
                      {region.headline}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-navy-soft">
                      {region.coverage}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-navy/5">
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-navy-soft block mb-2">
                      Logistics Highlights:
                    </span>
                    <ul className="flex flex-col gap-1.5">
                      {region.features.map((feat) => (
                        <li key={feat} className="text-xs text-navy flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: region.color }} />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-navy/5 flex items-center gap-1.5 text-xs font-medium text-navy-soft">
                  <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>{region.schedule}</span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

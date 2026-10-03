"use client";

import { Factory, Layers, ShieldCheck, Truck, Ruler } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";

const TRUST_CAPABILITIES = [
  {
    title: "Custom Specifications",
    description: "Tailored to required dimensions, ply, thickness, printing and product profiles.",
    icon: Ruler,
    color: "#1E6FFF",
  },
  {
    title: "Bulk Supply",
    description: "Reliable, recurring truckload supply designed for high-consumption industrial lines.",
    icon: Factory,
    color: "#E86620",
  },
  {
    title: "Sample Approval",
    description: "Physical prototypes and samples provided for exact fit and drop testing before bulk runs.",
    icon: Layers,
    color: "#19B26B",
  },
  {
    title: "Quality Focus",
    description: "Rigorous dimensional tolerances, burst strength consistency and clean finishes.",
    icon: ShieldCheck,
    color: "#8438FF",
  },
  {
    title: "Pan-India Supply",
    description: "Scheduled bulk supply, planned container loads, and reliable freight across Pan India.",
    icon: Truck,
    color: "#0FA47F",
  },
];

/** 5-Pillar trust & capability bar directly following the hero. */
export function CapabilityStrip(): JSX.Element {
  return (
    <section className="band-sky pattern-dots section-pad-sm relative" aria-label="Core Capabilities">
      <div className="container-page">
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
          {TRUST_CAPABILITIES.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title} variant="flip-up" className="h-full">
                <article
                  className="card-home-vivid group flex h-full flex-col justify-between p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ ["--accent" as string]: item.color }}
                >
                  <div>
                    <span
                      className="grid h-11 w-11 place-items-center rounded-2xl text-white shadow-xs transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: item.color }}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="mt-3.5 font-display text-base font-bold text-navy transition-colors duration-300 group-hover:text-accent-deep">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-navy-soft">{item.description}</p>
                  </div>
                  <div
                    className="mt-4 h-1 w-8 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ background: item.color }}
                  />
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

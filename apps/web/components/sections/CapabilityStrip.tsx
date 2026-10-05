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
    <section className="band-sky pattern-dots py-6 sm:py-8 lg:py-10 relative overflow-hidden" aria-label="Core Capabilities">
      <div className="container-page">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
          {TRUST_CAPABILITIES.map((item, idx) => {
            const Icon = item.icon;
            const indexStr = String(idx + 1).padStart(2, "0");
            return (
              <StaggerItem key={item.title} variant="flip-up" className="h-full">
                <article
                  className="card-home-vivid group relative flex h-full min-h-[260px] sm:min-h-[280px] flex-col justify-between overflow-hidden p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ ["--accent" as string]: item.color }}
                >
                  {/* Subtle top accent ambient glow line on hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Header: Large Icon + Step Counter */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-2xl text-white shadow-md transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3"
                        style={{
                          background: item.color,
                          boxShadow: `0 10px 24px -4px ${item.color}50`,
                        }}
                      >
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8 stroke-[2.2]" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-xs font-bold tracking-widest text-navy/25 transition-colors duration-300 group-hover:text-navy/60">
                        {indexStr}
                      </span>
                    </div>

                    <h2 className="mt-5 font-display text-lg sm:text-xl font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-accent-deep">
                      {item.title}
                    </h2>
                    <p className="mt-2.5 text-xs sm:text-[13.5px] leading-relaxed text-navy-soft">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Accent Indicator Bar */}
                  <div className="mt-6 flex items-center gap-1.5">
                    <div
                      className="h-1.5 w-12 rounded-full transition-all duration-500 ease-out group-hover:w-full"
                      style={{
                        background: item.color,
                        boxShadow: `0 2px 8px ${item.color}40`,
                      }}
                    />
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

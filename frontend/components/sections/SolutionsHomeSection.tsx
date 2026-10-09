"use client";

import Link from "next/link";
import { ArrowRight, Shield, Truck, Layers, Box, Globe, Cpu, Droplet, Sparkles, Hammer } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { solutions } from "@/data/solutions";

const ICON_MAP: Record<string, typeof Shield> = {
  box: Box,
  truck: Truck,
  shield: Shield,
  layers: Layers,
  hammer: Hammer,
  globe: Globe,
  cpu: Cpu,
  droplet: Droplet,
  package: Sparkles,
};

/** Section 9: Packaging Applications & Solutions — Protect What You Ship. Package What You Make. */
export function SolutionsHomeSection(): JSX.Element {
  return (
    <section className="band-white section-pad relative overflow-hidden pattern-dots" aria-labelledby="applications-heading">
      <div className="container-page relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="PACKAGING APPLICATIONS"
            title="Protect What You Ship. Package What You Make."
            description="From individual components to finished products, the right packaging can help reduce handling damage, surface scratches, impact exposure and transportation-related risks."
            className="max-w-3xl"
          />

          <Reveal variant="fade-up" className="shrink-0">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-bold text-navy shadow-xs transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-md hover:scale-105"
            >
              <span>Explore All Solutions</span>
              <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2" stagger={0.06}>
          {solutions.map((sol) => {
            const Icon = ICON_MAP[sol.icon] ?? Shield;
            return (
              <StaggerItem key={sol.id} variant="kinetic-pop" className="h-full">
                <article
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-navy/10 bg-white p-5 sm:p-5.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    borderTopColor: sol.color,
                    borderTopWidth: 3.5,
                    ["--sol-accent" as string]: sol.color,
                  }}
                >
                  {/* Dynamic Ambient Hover Glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-2xl opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-20"
                    style={{ background: sol.color }}
                  />

                  <div>
                    {/* Header: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <span
                        className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl text-white shadow-2xs transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
                        style={{ background: sol.color }}
                      >
                        <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5" aria-hidden="true" />
                      </span>
                      <span
                        className="font-accent text-xs font-normal uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs transition-all duration-300"
                        style={{ background: `${sol.color}15`, color: sol.color }}
                      >
                        Application
                      </span>
                    </div>

                    {/* Title & Summary */}
                    <h3
                      className="mt-3 font-heading text-base sm:text-lg font-bold text-navy transition-colors duration-200 group-hover:opacity-95"
                      style={{ color: "var(--card-title-color, inherit)" }}
                    >
                      {sol.name}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-navy-soft">
                      {sol.description}
                    </p>

                    {/* Compact Inline Key Applications */}
                    <div className="mt-3 pt-2 border-t border-navy/5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-accent text-xs font-normal uppercase tracking-wider text-navy-soft/80 mr-0.5 shrink-0">
                          Applications:
                        </span>
                        {sol.applications.map((app) => (
                          <span
                            key={app}
                            className="rounded-full border border-navy/8 bg-slate-50/90 px-2 py-0.5 text-[0.68rem] font-medium text-navy transition-colors duration-200 group-hover:bg-white group-hover:border-navy/15"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-navy/5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-200 group-hover:gap-2.5"
                      style={{ color: sol.color }}
                    >
                      <span className="underline-grow">Inquire Solution</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>

                    <span
                      className="h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-125"
                      style={{ background: sol.color }}
                      aria-hidden="true"
                    />
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal variant="fade-up" delay={0.15} className="mt-8 sm:mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-accent-deep hover:shadow-lg hover:scale-105"
          >
            <span>Find a Packaging Solution</span>
            <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

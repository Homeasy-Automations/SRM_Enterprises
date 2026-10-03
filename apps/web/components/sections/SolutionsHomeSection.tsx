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

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {solutions.map((sol) => {
            const Icon = ICON_MAP[sol.icon] ?? Shield;
            return (
              <StaggerItem key={sol.id} variant="kinetic-pop" className="h-full">
                <article
                  className="card-home-vivid group flex h-full flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{ ["--accent" as string]: sol.color }}
                >
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center justify-between">
                      <span
                        className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-xs transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ background: sol.color }}
                      >
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span
                        className="text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: `${sol.color}18`, color: sol.color }}
                      >
                        Application
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                      {sol.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-navy-soft">{sol.description}</p>

                    <div className="pt-2 border-t border-navy/5">
                      <span className="text-[0.68rem] font-bold uppercase tracking-wider text-navy-soft/80 block mb-1.5">
                        Key Applications:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sol.applications.map((app) => (
                          <span
                            key={app}
                            className="rounded-full border border-navy/10 bg-slate-50 px-2.5 py-0.5 text-[0.7rem] font-medium text-navy"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-200 group-hover:gap-2"
                      style={{ color: sol.color }}
                    >
                      <span className="underline-grow">Inquire Solution</span>
                      <ArrowRight className="h-3.5 w-3.5 icon-arrow-spring" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal variant="fade-up" delay={0.15} className="mt-12 text-center">
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

"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Clock, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { locations } from "@/data/locations";

/** Section 11: Locations — Serving Industrial Clusters across NCR. */
export function LocationsHomeSection(): JSX.Element {
  return (
    <section className="band-white section-pad relative overflow-hidden pattern-dots" aria-labelledby="locations-heading">
      <div className="container-page relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="SERVING INDUSTRIAL CLUSTERS"
            title="Packaging Supply Across NCR"
            description="Based in the NCR region, SRM Enterprises supports packaging requirements across key industrial and commercial locations."
            className="max-w-3xl"
          />

          <Reveal variant="fade-up" className="shrink-0">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-bold text-navy shadow-xs transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-md hover:scale-105"
            >
              <span>View Service Locations</span>
              <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {locations.map((loc) => (
            <StaggerItem key={loc.id} variant="kinetic-pop" className="h-full">
              <article
                className="card-home-vivid group flex h-full flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{ ["--accent" as string]: loc.color }}
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-xs transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: loc.color }}
                    >
                      <MapPin className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-navy-soft/80">
                      Industrial Hub
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                    {loc.name}
                  </h3>
                  <p className="text-xs font-semibold" style={{ color: loc.color }}>
                    {loc.headline}
                  </p>
                  <p className="text-xs leading-relaxed text-navy-soft">{loc.description}</p>

                  <div className="pt-2 border-t border-navy/5">
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-navy-soft/80 block mb-1">
                      Key Clusters:
                    </span>
                    <ul className="flex flex-col gap-1">
                      {loc.clusters.slice(0, 3).map((cluster) => (
                        <li key={cluster} className="text-[0.72rem] text-navy-soft flex items-center gap-1.5">
                          <CheckCircle className="h-3 w-3 shrink-0" style={{ color: loc.color }} />
                          <span className="line-clamp-1">{cluster}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-navy/5 flex items-center gap-1.5 text-[0.7rem] font-medium text-navy-soft">
                  <Clock className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span className="line-clamp-1">{loc.dispatchSchedule}</span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

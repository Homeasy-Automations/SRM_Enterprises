"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Camera } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { galleryCategories, galleryItems } from "@/data/gallery";
import { BoxArt, FoamArt, FactoryArt, TruckArt, CustomDesignArt } from "@/components/ui/art";

const ART_MAP: Record<string, typeof BoxArt> = {
  box: BoxArt,
  foam: FoamArt,
  hammer: CustomDesignArt,
  layers: FoamArt,
  warehouse: FactoryArt,
  truck: TruckArt,
  globe: BoxArt,
  package: BoxArt,
};

/** Section 13: Gallery — Packaging Materials. People. Process. */
export function GalleryHomeSection(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems =
    activeTab === "all" ? galleryItems.slice(0, 6) : galleryItems.filter((item) => item.category === activeTab);

  return (
    <section className="band-white section-pad relative overflow-hidden pattern-dots" aria-labelledby="gallery-heading">
      <div className="container-page relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="SRM ENTERPRISES"
            title="Packaging Materials. People. Process."
            description="Take a closer look at our packaging products, customized solutions, handling processes and supply capabilities."
            className="max-w-3xl"
          />

          <Reveal variant="fade-up" className="shrink-0">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-bold text-navy shadow-xs transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-md hover:scale-105"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              <span>Full Proof Gallery</span>
              <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {galleryCategories.map((cat) => {
            const isSelected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ${
                  isSelected
                    ? "bg-navy text-white shadow-xs scale-102"
                    : "border border-navy/10 bg-slate-50 text-navy-soft hover:bg-white hover:text-navy"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Cards Grid */}
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {filteredItems.map((item) => {
            const ArtComponent = ART_MAP[item.icon] ?? BoxArt;
            return (
              <StaggerItem key={item.id} variant="kinetic-pop" className="h-full">
                <article
                  className="card-home-vivid group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{ ["--accent" as string]: item.color }}
                >
                  <div className="flex flex-col gap-4">
                    {/* Visual Artwork Pedestal */}
                    <div
                      className="relative grid h-36 w-full place-items-center rounded-2xl overflow-hidden p-4 shadow-inner transition-transform duration-500 group-hover:scale-102"
                      style={{ background: `${item.color}15` }}
                    >
                      <ArtComponent accent={item.color} className="h-28 w-28 transition-transform duration-500 group-hover:scale-110" />
                      <span
                        className="absolute top-3 left-3 text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 text-navy shadow-xs"
                      >
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-display text-lg font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold" style={{ color: item.color }}>
                        {item.subtitle}
                      </p>
                      <p className="text-xs leading-relaxed text-navy-soft">{item.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-50 border border-navy/5 px-2 py-0.5 text-[0.68rem] font-medium text-navy-soft"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-navy/5 flex items-center justify-between">
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-navy-soft/80">
                      Verified Process Proof
                    </span>
                    <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
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

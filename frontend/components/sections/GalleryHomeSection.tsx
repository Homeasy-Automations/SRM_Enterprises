"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Camera, Maximize2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { galleryCategories, galleryItems } from "@/data/gallery";

/** Section 13: Gallery — Packaging Materials, Facility & Process Proof */
export function GalleryHomeSection(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems =
    activeTab === "all" ? galleryItems.slice(0, 6) : galleryItems.filter((item) => item.category === activeTab);

  return (
    <section className="band-white section-pad relative overflow-hidden pattern-dots" aria-labelledby="gallery-heading">
      <div className="container-page relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="FACILITY &amp; PRODUCTION PROOF"
            title="Packaging Materials. Facility. Process."
            description="Take a closer look at our real packaging products, custom EPE foam fitments, corrugation equipment, and Pan-India dispatch logistics."
            className="max-w-3xl"
          />

          <Reveal variant="fade-up" className="shrink-0">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-bold text-navy shadow-xs transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-md hover:scale-105"
            >
              <Camera className="h-4 w-4" aria-hidden="true" />
              <span>Full Visual Gallery</span>
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

        {/* Real Photo Gallery Cards Grid */}
        <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {filteredItems.map((item) => (
            <StaggerItem key={item.id} variant="kinetic-pop" className="h-full">
              <Link
                href="/gallery"
                className="card-home-vivid group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-navy/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{ ["--accent" as string]: item.color }}
              >
                <div className="flex flex-col gap-3.5">
                  {/* Real Photo Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <span className="font-ui absolute top-3 left-3 text-[0.65rem] font-bold uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full bg-white/95 text-navy shadow-xs">
                      {item.categoryLabel}
                    </span>

                    <span className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full bg-white/30 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-ui text-base font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold" style={{ color: item.color }}>
                      {item.subtitle}
                    </p>
                    <p className="text-xs leading-relaxed text-navy-soft line-clamp-2">{item.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-50 border border-navy/5 px-2 py-0.5 text-[0.68rem] font-medium text-navy-soft"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-navy/5 flex items-center justify-between text-xs text-navy-soft">
                  <span className="font-semibold text-navy group-hover:text-accent transition-colors">
                    Inspect in Gallery
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 icon-arrow-spring" style={{ color: item.color }} />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

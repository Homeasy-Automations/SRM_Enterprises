"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, CheckCircle2, Box, Layers, Hammer, Warehouse, Truck, Globe, Package } from "lucide-react";
import { galleryCategories, galleryItems, type GalleryItem } from "@/data/gallery";
import { Reveal } from "@/components/animations/Reveal";

const iconMap: Record<string, typeof Box> = {
  box: Box,
  foam: Layers,
  hammer: Hammer,
  layers: Layers,
  warehouse: Warehouse,
  truck: Truck,
  globe: Globe,
  package: Package,
};

export function GalleryInteractiveGrid(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {galleryCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-navy text-white shadow-md scale-105"
                  : "bg-navy/5 text-navy-soft hover:bg-navy/10 hover:text-navy"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredItems.map((item, index) => {
          const Icon = iconMap[item.icon] ?? Box;
          return (
            <Reveal
              key={item.id}
              variant="fade-up"
              delay={index * 0.05}
              className="group h-full"
            >
              <div
                className="card-heritage-pedestal flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift cursor-pointer"
                style={{ ["--accent" as string]: item.color }}
                onClick={() => setSelectedItem(item)}
              >
                {/* Visual Header / Mock Graphic */}
                <div
                  className="relative flex h-48 w-full items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}35 100%)`,
                  }}
                >
                  {/* Subtle Background Pattern */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: `radial-gradient(${item.color} 1px, transparent 1px)`,
                      backgroundSize: "16px 16px",
                    }}
                  />

                  {/* Central Animated Icon & Art */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ background: item.color, color: "#FFFFFF" }}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs"
                      style={{ background: item.color }}
                    >
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Zoom hint overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-navy/60 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-navy shadow-md">
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-bold text-navy transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-navy/60">{item.subtitle}</p>
                  <p className="mt-2.5 text-xs leading-relaxed text-navy-soft">{item.description}</p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-navy/5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-navy/5 px-2 py-0.5 text-[10px] font-medium text-navy-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs font-semibold text-navy">
                    <span className="group-hover:text-primary transition-colors">Inspect Spec</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Modal / Detailed Viewer */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl bg-white p-6 sm:p-8 shadow-2xl transition-all animate-scale-up"
            onClick={(e) => e.stopPropagation()}
            style={{ borderTop: `6px solid ${selectedItem.color}` }}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full bg-navy/5 text-navy-soft hover:bg-navy/10 hover:text-navy transition-colors"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
                style={{ background: selectedItem.color }}
              >
                {selectedItem.categoryLabel}
              </span>
              <span className="text-xs text-navy/50 font-mono">ID: {selectedItem.id}</span>
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold text-navy">
              {selectedItem.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-navy/70">{selectedItem.subtitle}</p>

            <p className="mt-4 text-sm leading-relaxed text-navy-soft">
              {selectedItem.description}
            </p>

            <div className="mt-6 rounded-2xl bg-navy/5 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-2">
                Technical Specifications & Capabilities
              </h4>
              <ul className="space-y-1.5 text-xs text-navy-soft">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Custom sizes, thicknesses, and configurations tailored to customer CAD/drawing.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Pre-production sample approval available before bulk runs.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Bulk delivery across Gurugram, Manesar, Bhiwadi, and Delhi NCR.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href="/contact"
                className="flex-1 rounded-xl bg-navy py-3 text-center text-sm font-bold text-white shadow-md hover:bg-navy/90 transition-colors"
                onClick={() => setSelectedItem(null)}
              >
                Quote This Material
              </Link>
              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-xl border border-navy/20 px-5 py-3 text-sm font-bold text-navy hover:bg-navy/5 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

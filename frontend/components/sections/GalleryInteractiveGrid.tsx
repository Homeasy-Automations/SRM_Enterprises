"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Box,
  Layers,
  Hammer,
  Warehouse,
  Truck,
  Globe,
  Package,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { galleryCategories, galleryItems, type GalleryItem } from "@/data/gallery";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

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
  const { openQuoteModal } = useQuoteModal();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const selectedItem: GalleryItem | null =
    lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => ((prev ?? 0) - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev]);

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {galleryCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              type="button"
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setLightboxIndex(null);
              }}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
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

      {/* Masonry / Grid Visual Photo Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const Icon = iconMap[item.icon] ?? Box;
          const isWide = item.aspect === "wide";
          const isTall = item.aspect === "tall";

          return (
            <div
              key={item.id}
              onClick={() => {
                setLightboxIndex(index);
                analytics.ctaClick(`Gallery Click ${item.title}`, "gallery");
              }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col justify-between",
                isWide && "sm:col-span-2 lg:col-span-2",
                isTall && "row-span-1"
              )}
            >
              {/* Image Container with Ken Burns zoom on hover */}
              <div
                className={cn(
                  "relative w-full overflow-hidden bg-slate-900",
                  isWide ? "h-64 sm:h-72" : isTall ? "h-80" : "h-60"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Dark gradient overlay for text legibility & hover depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Top Badge: Category & View Indicator */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span
                    className="font-ui inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-md backdrop-blur-sm"
                    style={{ background: `${item.color}D9` }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.categoryLabel}
                  </span>

                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>

                {/* Bottom on-image label */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <h3 className="font-ui text-lg sm:text-xl font-bold leading-tight drop-shadow-sm group-hover:text-accent-highlight transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/85 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Footer: Tags & Action bar */}
              <div className="p-4 bg-white flex items-center justify-between border-t border-navy/5">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-navy-soft"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                  <span>Enlarge</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4 sm:p-6 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-30 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close fullscreen lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="hidden sm:grid absolute left-4 z-30 h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="hidden sm:grid absolute right-4 z-30 h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Lightbox Dialog Container */}
          <div
            className="relative flex flex-col lg:flex-row w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: High-Res Image Preview */}
            <div className="relative w-full lg:w-3/5 h-64 sm:h-96 lg:h-auto min-h-[300px] bg-slate-900">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>

            {/* Right: Technical Specs & Quote Actions */}
            <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="font-ui rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white"
                    style={{ background: selectedItem.color }}
                  >
                    {selectedItem.categoryLabel}
                  </span>
                  <span className="text-xs text-navy-soft font-ui">
                    {lightboxIndex !== null ? `${lightboxIndex + 1} of ${filteredItems.length}` : ""}
                  </span>
                </div>

                <h3 className="font-ui text-2xl font-bold text-navy leading-tight">
                  {selectedItem.title}
                </h3>
                <p className="mt-1.5 text-xs font-semibold" style={{ color: selectedItem.color }}>
                  {selectedItem.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-navy-soft">
                  {selectedItem.description}
                </p>

                {/* Technical Verification Points */}
                <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-navy/5">
                  <h4 className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-navy/70 mb-2.5">
                    Production &amp; Supply Verification
                  </h4>
                  <ul className="space-y-2 text-xs text-navy-soft">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Custom dimensions and thicknesses calibrated to client drawing.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Drop-test and fitment prototype approval before bulk run.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Pan-India scheduled dispatch across key industrial corridors.</span>
                    </li>
                  </ul>
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {selectedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-navy/5 px-2.5 py-1 text-[11px] font-medium text-navy"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-4 border-t border-navy/10 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const item = selectedItem;
                    setLightboxIndex(null);
                    openQuoteModal({
                      initialMessage: `Inquiry regarding photo proof: ${item.title} (${item.categoryLabel})`,
                    });
                  }}
                  className="flex-1 rounded-xl bg-navy py-3 text-center text-xs font-bold text-white shadow-md hover:bg-navy/90 hover:scale-[1.01] transition-all"
                >
                  Quote This Packaging Material
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="rounded-xl border border-navy/20 px-5 py-3 text-xs font-bold text-navy hover:bg-navy/5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

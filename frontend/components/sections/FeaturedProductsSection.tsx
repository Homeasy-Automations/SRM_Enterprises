"use client";

import Link from "next/link";
import { ArrowRight, Box, Layers, ShieldCheck, Film, PackageCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";

interface FeaturedItem {
  name: string;
  categorySlug: string;
  categoryName: string;
  tagline: string;
  features: string[];
  color: string;
  icon: typeof Box;
}

const FEATURED_PRODUCTS: FeaturedItem[] = [
  {
    name: "Corrugated Boxes",
    categorySlug: "corrugated-packaging",
    categoryName: "Corrugated",
    tagline: "3-Ply, 5-Ply and 7-Ply standard & custom shipping cartons",
    features: ["Heavy Stacking Strength", "Custom GSM & Flutes", "High Burst Factor"],
    color: "#E86620",
    icon: Box,
  },
  {
    name: "EPE Foam Bags",
    categorySlug: "epe-foam-packaging",
    categoryName: "EPE Foam",
    tagline: "Custom-sized pouches preventing abrasions and transit shock",
    features: ["Non-Abrasive Contact", "Thermal Bonded Seams", "Dust-Free Cleanliness"],
    color: "#1E6FFF",
    icon: Layers,
  },
  {
    name: "EPE Foam Sheets",
    categorySlug: "epe-foam-packaging",
    categoryName: "EPE Foam",
    tagline: "Precision cut-to-size interleaving and separator sheets",
    features: ["Thickness 0.5mm – 50mm", "Shock & Vibration Absorbing", "Reusable Durability"],
    color: "#1E6FFF",
    icon: Layers,
  },
  {
    name: "LDPE Bubble Bags",
    categorySlug: "bubble-protective-packaging",
    categoryName: "Bubble Packaging",
    tagline: "Air-cushioned pouches designed for fragile automotive & electronic parts",
    features: ["Self-Sealing Lip Available", "Multi-layer Barrier Film", "Lightweight Transit"],
    color: "#0FA47F",
    icon: ShieldCheck,
  },
  {
    name: "Bubble Rolls",
    categorySlug: "bubble-protective-packaging",
    categoryName: "Bubble Packaging",
    tagline: "Continuous protective rolls in standard and heavy-gauge options",
    features: ["Widths 100mm to 1500mm", "Anti-Static Pink Option", "Flexible Void Fill"],
    color: "#0FA47F",
    icon: ShieldCheck,
  },
  {
    name: "LDPE / LLDPE Poly Bags",
    categorySlug: "poly-bags-films",
    categoryName: "Poly Bags & Films",
    tagline: "Heavy-duty clear and printed industrial containment bags",
    features: ["Virgin Grade Polymer", "Leak-Proof Bottom Seal", "Custom Printing Available"],
    color: "#8438FF",
    icon: Film,
  },
  {
    name: "Stretch Film",
    categorySlug: "poly-bags-films",
    categoryName: "Poly Bags & Films",
    tagline: "High-cling cast and blown stretch wrap for secure pallet stability",
    features: ["High Elongation Ratio", "Puncture & Tear Resistant", "Manual & Machine Rolls"],
    color: "#8438FF",
    icon: Film,
  },
  {
    name: "Shrink Film",
    categorySlug: "poly-bags-films",
    categoryName: "Poly Bags & Films",
    tagline: "Conformal heat-shrink packaging securing multi-packs and bundles",
    features: ["Tight Conformal Wrap", "Tamper Evident Seal", "Moisture Protection"],
    color: "#8438FF",
    icon: Film,
  },
  {
    name: "BOPP Packaging Tapes",
    categorySlug: "packaging-accessories",
    categoryName: "Accessories",
    tagline: "Aggressive adhesive sealing tapes in transparent, brown and printed formats",
    features: ["High Shear Adhesion", "All-Weather Performance", "Custom Logo Printing"],
    color: "#C83D6D",
    icon: PackageCheck,
  },
  {
    name: "PP / PET Strapping",
    categorySlug: "packaging-accessories",
    categoryName: "Accessories",
    tagline: "High-tensile strapping engineered for pallet bundling and heavy boxes",
    features: ["High Break Strength", "Smooth Dispenser Unwinding", "Embossed Anti-Slip Grip"],
    color: "#C83D6D",
    icon: PackageCheck,
  },
];

/** Section 8: Featured Products — Popular Packaging Materials for Everyday Industrial Requirements. */
export function FeaturedProductsSection(): JSX.Element {
  return (
    <section className="band-cream section-pad relative overflow-hidden" aria-labelledby="featured-products-heading">
      <div className="container-page relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="POPULAR PACKAGING PRODUCTS"
            title="Packaging Materials for Everyday Industrial Requirements"
            description="Explore our range of commonly required packaging materials for product protection, storage, handling and transportation."
            className="max-w-3xl"
          />

          <Reveal variant="fade-up" className="shrink-0">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-6 py-3 text-sm font-bold text-navy shadow-xs transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-md hover:scale-105"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <StaggerGroup className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" stagger={0.05}>
          {FEATURED_PRODUCTS.map((prod) => {
            const Icon = prod.icon;
            return (
              <StaggerItem key={prod.name} variant="kinetic-pop" className="h-full">
                <Link
                  href={`/products/${prod.categorySlug}`}
                  className="card-home-vivid group flex h-full flex-col justify-between p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{ ["--accent" as string]: prod.color }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span
                        className="grid h-10 w-10 place-items-center rounded-xl text-white shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                        style={{ background: prod.color }}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span
                        className="font-ui text-xs font-semibold uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full"
                        style={{ background: `${prod.color}18`, color: prod.color }}
                      >
                        {prod.categoryName}
                      </span>
                    </div>

                    <h3 className="font-ui text-base font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                      {prod.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-navy-soft">{prod.tagline}</p>

                    <ul className="flex flex-col gap-1 pt-1 border-t border-navy/5">
                      {prod.features.map((feat) => (
                        <li key={feat} className="text-[0.72rem] text-navy-soft/90 flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full" style={{ background: prod.color }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold transition-all duration-200 group-hover:gap-2"
                    style={{ color: prod.color }}
                  >
                    <span className="underline-grow">Details</span>
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

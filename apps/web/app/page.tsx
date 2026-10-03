import type { Metadata } from "next";
import { HomeHero } from "@/components/hero/HomeHero";
import { CapabilityStrip } from "@/components/sections/CapabilityStrip";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CustomPackagingHomeSection } from "@/components/sections/CustomPackagingHomeSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ManufacturingCapabilitySection } from "@/components/sections/ManufacturingCapabilitySection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { SolutionsHomeSection } from "@/components/sections/SolutionsHomeSection";
import { QualityFocusSection } from "@/components/sections/QualityFocusSection";
import { LocationsHomeSection } from "@/components/sections/LocationsHomeSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { GalleryHomeSection } from "@/components/sections/GalleryHomeSection";
import { HomeLeadSection } from "@/components/sections/HomeLeadSection";
import { JsonLd } from "@/components/sections/JsonLd";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = buildMetadata({
  title: "Packaging Material Supplier in Gurugram | SRM Enterprises",
  description:
    "SRM Enterprises supplies corrugated boxes, EPE foam, bubble packaging, poly bags, films and packaging accessories across Gurugram, Manesar, Bhiwadi and NCR.",
  path: "/",
  keywords: [
    "packaging material supplier in Gurugram",
    "packaging material supplier in Manesar",
    "packaging material supplier in Bhiwadi",
    "industrial packaging supplier",
    "corrugated box supplier",
    "EPE foam packaging supplier",
    "bubble packaging supplier",
    "poly bag supplier",
    "stretch film supplier",
    "packaging materials NCR",
    "custom packaging solutions",
  ],
});

/**
 * SRM Enterprises Primary Sales Homepage:
 * 1. Hero
 * 2. Trust/Capability Bar
 * 3. Packaging Categories
 * 4. Why SRM
 * 5. Custom Packaging
 * 6. Industries We Serve
 * 7. Manufacturing & Supply Capability
 * 8. Our Packaging Process
 * 9. Featured Products
 * 10. Packaging Applications / Solutions
 * 11. Quality Focus
 * 12. Locations
 * 13. Case Studies / Customer Applications
 * 14. Gallery Proof
 * 15. Final Lead Generation & B2B Quote Form
 */
export default function HomePage(): JSX.Element {
  return (
    <>
      {/* 1 — Hero */}
      <HomeHero />

      {/* 2 — Trust / Capability Bar */}
      <CapabilityStrip />

      {/* 3 — Packaging Categories */}
      <ProductShowcase />

      {/* 4 — Why SRM */}
      <WhyChooseUs />

      {/* 5 — Custom Packaging */}
      <CustomPackagingHomeSection />

      {/* 6 — Industries We Serve */}
      <IndustriesSection />

      {/* 7 — Manufacturing & Supply Capability */}
      <ManufacturingCapabilitySection />

      {/* 8 — Our Packaging Process */}
      <ProcessTimeline />

      {/* 9 — Featured Products */}
      <FeaturedProductsSection />

      {/* 10 — Packaging Applications & Solutions */}
      <SolutionsHomeSection />

      {/* 11 — Quality Focus */}
      <QualityFocusSection />

      {/* 12 — Locations */}
      <LocationsHomeSection />

      {/* 13 — Case Studies / Customer Applications */}
      <CaseStudiesSection />

      {/* 14 — Gallery Proof */}
      <GalleryHomeSection />

      {/* 15 — Final Lead Generation & B2B Quote Form */}
      <HomeLeadSection />

      {/* Structured Schema Data */}
      <JsonLd
        id="home-itemlist-jsonld"
        data={[
          itemListJsonLd(
            products.map((product) => ({
              name: product.name,
              path: `/products/${product.slug}`,
              description: product.tagline,
            })),
            "Packaging categories supplied by SRM Enterprises",
          ),
          itemListJsonLd(
            industries.map((industry) => ({
              name: industry.name,
              path: `/industries/${industry.slug}`,
              description: industry.tagline,
            })),
            "Industries supported by SRM Enterprises",
          ),
          itemListJsonLd(
            solutions.map((sol) => ({
              name: sol.name,
              path: "/solutions",
              description: sol.description,
            })),
            "Packaging solutions and applications by SRM Enterprises",
          ),
        ]}
      />
    </>
  );
}

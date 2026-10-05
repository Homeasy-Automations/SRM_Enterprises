import type { Metadata } from "next";
import { HomeHero } from "@/components/hero/HomeHero";
import { CapabilityStrip } from "@/components/sections/CapabilityStrip";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CustomPackagingHomeSection } from "@/components/sections/CustomPackagingHomeSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { PackagingSolutionsSection } from "@/components/sections/PackagingSolutionsSection";
import { PackagingFinderTool } from "@/components/sections/PackagingFinderTool";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { SolutionsHomeSection } from "@/components/sections/SolutionsHomeSection";
import { QualityFocusSection } from "@/components/sections/QualityFocusSection";
import { CustomerTrustSection } from "@/components/sections/CustomerTrustSection";
import { LocationsHomeSection } from "@/components/sections/LocationsHomeSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { HomeLeadSection } from "@/components/sections/HomeLeadSection";
import { JsonLd } from "@/components/sections/JsonLd";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = buildMetadata({
  title: "Industrial Packaging Material Supplier India | SRM Enterprises",
  description:
    "SRM Enterprises supplies corrugated boxes, EPE foam, bubble packaging, poly bags, films and packaging accessories with reliable bulk supply across Pan India.",
  path: "/",
  keywords: [
    "industrial packaging material supplier India",
    "pan India packaging supplier",
    "bulk packaging supplier India",
    "industrial packaging supplier",
    "corrugated box supplier India",
    "EPE foam packaging supplier",
    "bubble packaging supplier",
    "poly bag supplier India",
    "stretch film supplier",
    "packaging materials pan India",
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
 * 7. Complete Packaging Solutions
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

      {/* 4 — Why SRM */}
      <WhyChooseUs />

      {/* 5 — Custom Packaging */}
      <CustomPackagingHomeSection />

      {/* 6 — Industries We Serve */}
      <IndustriesSection />

      {/* 7 — Complete Packaging Solutions */}
      <PackagingSolutionsSection />

      {/* 7b — Interactive Choose Your Packaging Tool */}
      <PackagingFinderTool />

      {/* 8 — Our Packaging Process */}
      <ProcessTimeline />

      {/* 9 — Featured Products */}
      <FeaturedProductsSection />

      {/* 10 — Packaging Applications & Solutions */}
      <SolutionsHomeSection />

      {/* 11 — Quality Focus */}
      <QualityFocusSection />

      {/* 11b — Customer Trust & Industrial Testimonials */}
      <CustomerTrustSection />

      {/* 12 — Locations */}
      <LocationsHomeSection />

      {/* 13 — Case Studies / Customer Applications */}
      <CaseStudiesSection />

      {/* 14 — Gallery Proof */}
      {/* <GalleryHomeSection /> */}

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

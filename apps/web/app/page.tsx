import type { Metadata } from "next";
import { HomeHero } from "@/components/hero/HomeHero";
import { CapabilityStrip } from "@/components/sections/CapabilityStrip";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { BRAND } from "@srm/config";

export const metadata: Metadata = buildMetadata({
  title: "Industrial Packaging Material Supplier in Gurugram, Manesar, Bhiwadi & NCR",
  description:
    "SRM Enterprises supplies corrugated packaging, EPE foam, LDPE bubble & protective packaging, poly bags & films and packaging accessories — trading, manufacturing and custom packaging under one roof. Bulk supply across NCR and nearby industrial clusters.",
  path: "/",
  keywords: [
    "packaging material supplier NCR",
    "corrugated box supplier Gurugram",
    "EPE foam supplier Manesar",
    "bubble wrap supplier Bhiwadi",
    "custom packaging supplier",
  ],
});

export default function HomePage(): JSX.Element {
  return (
    <>
      {/* 1 — Hero */}
      <HomeHero />
      {/* 2 — Capability strip */}
      <CapabilityStrip />
      {/* 3 — About preview */}
      <AboutPreview />
      {/* 4 — Product showcase (5 asymmetric colourful cards) */}
      <ProductShowcase />
      {/* 5 — Why choose us */}
      <WhyChooseUs />
      {/* 6 — Industries */}
      <IndustriesSection />
      {/* 7 — Custom packaging process */}
      <ProcessTimeline />
      {/* 8 — Vivid gradient CTA */}
      <CtaBanner
        title="Need Packaging Material? Let's Get in Touch."
        description="Share your size, material, quantity and application — and we will come back with the right material and a commercial offer."
        footnote={`Bulk supply ${BRAND.bulkSupplyLine}.`}
      />

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
        ]}
      />
    </>
  );
}

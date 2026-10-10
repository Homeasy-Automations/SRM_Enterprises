import type { Metadata } from "next";
import { Box, Layers, Truck } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { GalleryInteractiveGrid } from "@/components/sections/GalleryInteractiveGrid";

export const metadata: Metadata = buildMetadata({
  title: "Packaging Gallery & Production Proof | SRM Enterprises",
  description:
    "Explore our visual proof of custom packaging solutions, fabricated EPE foam fitments, heavy-duty corrugated cartons, infrastructure, and finished client consignments.",
  path: "/gallery",
  keywords: [
    "packaging gallery",
    "production proof",
    "corrugated boxes photos",
    "EPE foam fitments gallery",
    "packaging infrastructure",
  ],
});

const breadcrumbs = [{ name: "Gallery", path: "/gallery" }];

export default function GalleryPage(): JSX.Element {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="Proof & Capabilities"
        title="Packaging Materials, Facility & Process Proof"
        description="Take a closer look at our packaging products, customized solutions, handling processes, facility infrastructure, and completed industrial consignments."
        breadcrumbs={breadcrumbs}
        accentColor="#E86620"
        backgroundImage="/images/integrated.png"
      >
        <HeroActions
          primaryLabel="Request a Sample"
          primaryHref="/contact?tab=sample"
          secondaryLabel="Get a Custom Quote"
          secondaryHref="/contact"
          location="gallery-hero"
        />
      </PageHero>

      {/* 2 — Interactive Proof Gallery */}
      <section className="band-white pattern-weave section-pad" aria-labelledby="gallery-main-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Packaging & Product Portfolio"
            title="Real Packaging Built for Real Industrial Demands"
            description="Filter through our operational categories to inspect raw materials, die-cut foam fabrications, automated corrugation, and warehouse dispatch staging."
            className="max-w-3xl"
          />

          <div className="mt-10">
            <GalleryInteractiveGrid />
          </div>
        </div>
      </section>

      {/* 3 — Packaging Quality Verification Pillars */}
      <section className="band-sky pattern-grid section-pad border-t border-navy/10" aria-labelledby="capabilities-proof">
        <div className="container-page">
          <SectionHeading
            eyebrow="Operational Rigor"
            title="Why Physical Inspection & Sample Approval Matters"
            description="We bridge the gap between design drawings and shop-floor reality through hands-on sample evaluation and stringent specification checks."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Pre-Production Sample Approval",
                desc: "Never gamble with bulk quantities. Evaluate custom box samples or foam fitments directly on your product before full runs.",
                icon: Box,
                color: "#1E6FFF",
              },
              {
                title: "Dimensional & Flute Inspection",
                desc: "Bursting strength, GSM verification, and precise die-cut tolerances checked prior to packaging dispatch.",
                icon: Layers,
                color: "#19B26B",
              },
              {
                title: "Palletized Weatherproof Staging",
                desc: "High-grade stretch film wrapping and corrugated corner protectors shield finished goods awaiting scheduled truck dispatch.",
                icon: Truck,
                color: "#E86620",
              },
            ].map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.title} variant="flip-up" className="h-full">
                  <div
                    className="card-heritage-pedestal group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                    style={{ ["--accent" as string]: pillar.color }}
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${pillar.color}15`, color: pillar.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-ui text-lg font-bold text-navy group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-soft">{pillar.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* 4 — CTA Banner */}
      <CtaBanner
        title="Need to inspect material quality in person?"
        description="Request physical product samples dispatched to your plant anywhere in India, or connect with our technical packaging team."
        primaryLabel="Request a Sample"
        primaryHref="/contact?tab=sample"
      />

      <JsonLd
        id="gallery-breadcrumb-jsonld"
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs])}
      />
    </>
  );
}

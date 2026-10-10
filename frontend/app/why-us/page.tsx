import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { BRAND } from "@srm/config";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FactoryArt, TruckArt, WarehouseArt } from "@/components/ui/art";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { WHY_CHOOSE_CLOSING_LINE, WHY_CHOOSE_US } from "@/lib/constants";
import { QuoteTrigger } from "@/components/buttons/QuoteTrigger";

export const metadata: Metadata = buildMetadata({
  title: "Why Choose SRM Enterprises — Quality, Customisation, Value & Supply",
  description:
    "Why businesses choose SRM Enterprises: consistent material and dimensional control, customisation across size, thickness, printing and packing, competitive pricing for regular and bulk requirements, and reliable dispatch planning for industrial customers.",
  path: "/why-us",
  keywords: ["packaging supplier quality", "custom packaging value", "reliable packaging supply Pan India"],
});

const breadcrumbs = [{ name: "Why Us", path: "/why-us" }];

export default function WhyUsPage(): JSX.Element {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="Why Us"
        title="Four commitments we can actually stand behind"
        description="No awards, no invented numbers — just the practical things that decide whether a packaging supplier is still your supplier next year."
        breadcrumbs={breadcrumbs}
        accentColor="#1E6FFF"
      >
        <HeroActions
          primaryLabel="Get a Quote"
          primaryHref="/contact"
          secondaryLabel="See Products"
          secondaryHref="/products"
          location="why-us-hero"
        />
      </PageHero>

      {/* 2 — Quality */}
      <section className="band-white pattern-circuit section-pad" aria-labelledby="why-quality-heading">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal variant="split-left" className="flex flex-col gap-5">
              <SectionHeading
                eyebrow="Quality"
                title="Consistent material and dimensional control"
                description="Quality here means the tenth order behaves exactly like the first: same material, same dimensions, same performance on your packing line."
              />
              <StaggerGroup as="ul" className="flex flex-col gap-3">
                {[
                  "Specification confirmed in writing before supply",
                  "Material grade, ply and thickness checked against that specification",
                  "Dimensions held consistent across repeat orders",
                  "Any change to material or format discussed before it happens",
                ].map((item) => (
                  <StaggerItem as="li" key={item} variant="kinetic-pop" className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-deep">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-navy-soft sm:text-base">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Reveal>

            <Reveal variant="iris-clip">
              <MediaPanel imageKey="aboutFacility" accent="#1E6FFF" aspect="video">
                <WarehouseArt accent="#1E6FFF" className="h-full w-full" title="Warehouse and dispatch illustration" />
              </MediaPanel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — Customisation */}
      <FeatureGrid
        band="sky"
        eyebrow="Customisation"
        title="Size, thickness, printing and packing as required"
        description="Custom work is a process, not a guess. It starts with your requirement and ends with a sample you have approved."
        columns={3}
        items={[
          {
            title: "Size & dimensions",
            description: "Made-to-measure formats so the product fits without a compromise that costs you elsewhere.",
            icon: "ruler",
            color: "#8B5CF6",
          },
          {
            title: "Thickness & ply",
            description: "Material selected against the protection actually needed for your handling and route.",
            icon: "layers",
            color: "#19C3E6",
          },
          {
            title: "Printing & packing",
            description: "Identification, branding and pack formats that suit your shop floor and dispatch.",
            icon: "package",
            color: "#FF5C8A",
          },
        ]}
      />

      {/* 4 — Competitive value */}
      <section className="band-white pattern-circuit section-pad" aria-labelledby="why-value-heading">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal variant="clip" className="lg:order-2">
              <MediaPanel imageKey="customPackaging" accent="#19B26B" aspect="video">
                <FactoryArt accent="#19B26B" className="h-full w-full" title="Packaging solutions illustration" />
              </MediaPanel>
            </Reveal>

            <Reveal variant="split-right" className="flex flex-col gap-5 lg:order-1">
              <SectionHeading
                eyebrow="Competitive Value"
                title="Priced for regular and bulk requirements"
                description="Because we provide end-to-end packaging solutions across all materials, options can be matched to the application instead of over-specified — which is where most packaging cost quietly hides."
              />
              <StaggerGroup as="ul" className="flex flex-col gap-3">
                {[
                  "Material options explained with their trade-offs, so cost decisions are informed",
                  "Regular requirements quoted as standing supply, not one-off jobs",
                  "Bulk quantities planned so freight and handling stay sensible",
                  "Mixed requirements quoted together to reduce admin and coordination",
                ].map((item) => (
                  <StaggerItem as="li" key={item} variant="kinetic-pop" className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-deep">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-navy-soft sm:text-base">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5 — Supply reliability */}
      <section className="band-cream pattern-circuit section-pad" aria-labelledby="why-supply-heading">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal variant="split-left" className="flex flex-col gap-5">
              <SectionHeading
                eyebrow="Supply Reliability"
                title="Reliable dispatch planning for industrial customers"
                description={`Material is only useful if it arrives before the line stops. Requirements are planned as standing supply, with bulk supply ${BRAND.bulkSupplyLine}.`}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Dispatch planning", body: "Schedules agreed ahead of consumption, not after a stock-out.", color: "#8B5CF6" },
                  { title: "Repeat consistency", body: "Same specification every cycle, so packing standards do not drift.", color: "#1E6FFF" },
                  { title: "Mixed sourcing", body: "Primary packaging and accessories supplied from one place.", color: "#19B26B" },
                  { title: "Honest communication", body: "Lead times and constraints shared up front — no surprises at the gate.", color: "#FF8A2B" },
                ].map((item, index) => (
                  <Reveal
                    key={item.title}
                    variant="depth-zoom"
                    delay={index * 0.06}
                    className="card-benchmark-trust group p-5 transition-all duration-300"
                    style={{ ["--accent" as string]: item.color }}
                  >
                    <span className="block h-1.5 w-10 rounded-full" style={{ background: item.color }} aria-hidden="true" />
                    <h3 className="mt-3 font-ui text-base font-bold text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy-soft">{item.body}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal variant="iris-clip" className="lg:order-2">
              <MediaPanel imageKey="industryLogistics" accent="#FF8A2B" aspect="video">
                <TruckArt accent="#FF8A2B" className="h-full w-full" title="Dispatch and supply illustration" />
              </MediaPanel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6 — Complete Packaging Solutions */}
      <FeatureGrid
        band="white"
        eyebrow="Complete Packaging Solutions"
        title="One source for every type of packaging"
        description="SRM Enterprises delivers comprehensive packaging solutions that make every kind of packaging required by modern industry — from custom-engineered cartons and tailored foam fitments to protective films and accessories. Together they mean one inquiry instead of five."
        columns={2}
        items={[
          {
            title: "Custom Engineered Packaging",
            description:
              "Made-to-specification packaging built to agreed dimensions, ply and thickness, with samples approved before bulk production.",
            icon: "factory",
            color: "#1E6FFF",
            detail:
              "Custom dimensions, ply, printing and formats are engineered with your team and locked into a specification that repeat orders follow.",
          },
          {
            title: "Comprehensive Packaging Supplies",
            description:
              "The complete packaging material range supplied alongside — films, tapes, strapping, bubble cushioning and accessory items.",
            icon: "package",
            color: "#19B26B",
            detail:
              "Consumables are supplied together with primary packaging, so a single order covers boxes, protective fitments and closing accessories.",
          },
        ]}
      />

      {/* 7 — Industrial support + summary */}
      <section className="band-sky pattern-circuit section-pad" aria-labelledby="why-support-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Industrial Support"
            title="Built around industrial buying patterns"
            description="Industrial buyers need repeatable supply, quick answers on specification questions and someone who understands a packing line. That is the support model here."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((reason) => (
              <StaggerItem key={reason.key} variant="flip-up" className="h-full">
                <article
                  className="card-benchmark-trust group flex h-full flex-col gap-2 p-6 transition-all duration-300"
                  style={{ ["--accent" as string]: reason.color }}
                >
                  <h3 className="font-ui text-lg font-bold text-navy">{reason.title}</h3>
                  <p className="text-sm leading-relaxed text-navy-soft">{reason.description}</p>
                  <span
                    aria-hidden="true"
                    className="mt-3 block h-1.5 w-12 rounded-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-500 group-hover:w-full"
                  />
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal variant="depth-zoom" delay={0.1} className="mt-10">
            <div className="flex flex-col items-start gap-4 rounded-[26px] border border-navy/10 bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-3xl text-sm font-semibold leading-relaxed text-navy sm:text-base">
                {WHY_CHOOSE_CLOSING_LINE}
              </p>
              <QuoteTrigger className="btn-primary w-full shrink-0 sm:w-auto" location="why-us-closing">
                Get a Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </QuoteTrigger>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 — CTA */}
      <CtaBanner
        title="Ready when you are"
        description="Send the requirement — size, material, quantity and application — and we will take it from there."
        primaryLabel="Get a Quote"
        primaryHref="/contact"
      />

      <JsonLd id="why-us-breadcrumb-jsonld" data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs])} />
    </>
  );
}

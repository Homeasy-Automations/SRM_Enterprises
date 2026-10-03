import type { Metadata } from "next";
import Link from "next/link";
import { Check, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BoxArt, FoamArt } from "@/components/ui/art";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Custom Packaging — Packaging Designed for Your Product",
  description:
    "Custom packaging from SRM Enterprises: requirement assessment, material selection, dimensions and thickness, printing and branding, prototype or sample approval, then production and bulk supply. Corrugated, foam, bubble, films and accessories.",
  path: "/custom-packaging",
  keywords: [
    "custom packaging supplier",
    "custom corrugated boxes",
    "custom EPE foam fitments",
    "printed packaging boxes",
  ],
});

const breadcrumbs = [{ name: "Custom Packaging", path: "/custom-packaging" }];

export default function CustomPackagingPage(): JSX.Element {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="Custom Packaging"
        title="Packaging Designed for Your Product"
        description="Standard sizes are a starting point, not a limit. Dimensions, ply, thickness, material, printing and packing format are all built around what you actually pack."
        breadcrumbs={breadcrumbs}
        accentColor="#8B5CF6"
      >
        <HeroActions
          primaryLabel="Start a Requirement"
          primaryHref="/contact"
          secondaryLabel="See Products"
          secondaryHref="/products"
          location="custom-hero"
        />
      </PageHero>

      {/* 2 — Why custom */}
      <FeatureGrid
        band="white"
        eyebrow="Why Custom"
        title="Because the standard size costs you somewhere else"
        description="Every millimetre that does not fit turns into void fill, damaged product, slower packing or higher freight. Custom packaging removes that trade-off."
        columns={3}
        items={[
          {
            title: "Better product fit",
            description:
              "Packaging dimensioned to the product holds it in place, so movement and contact damage are reduced.",
            icon: "ruler",
            color: "#8B5CF6",
            tag: "Fit",
          },
          {
            title: "Right-sized cost",
            description:
              "Correct material and thickness means paying for protection you need, not for material you do not.",
            icon: "tag",
            color: "#19B26B",
            tag: "Value",
          },
          {
            title: "Packing-line friendly",
            description:
              "Format, opening style and pack counts are set around how your team actually packs and dispatches.",
            icon: "package",
            color: "#1E6FFF",
            tag: "Process",
          },
        ]}
      />

      {/* 3 — Requirement assessment */}
      <section className="band-sky pattern-cad section-pad" aria-labelledby="assessment-heading">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow="Step 01"
                title="Requirement assessment"
                description="We start with the product, not the material. Photographs, drawings or a physical sample all help — but a clear description works too."
              />
              <StaggerGroup as="ul" className="flex flex-col gap-3">
                {[
                  "What is being packed, and how fragile or sensitive is it?",
                  "How is it handled — manual, trolley, pallet, conveyor?",
                  "How is it stacked, stored and transported?",
                  "How many pieces per pack, and packs per consignment?",
                  "Any printing, branding or identification requirement?",
                ].map((item) => (
                  <StaggerItem as="li" key={item} variant="slide-right" className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-deep">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-navy-soft sm:text-base">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <Reveal variant="clip">
              <MediaPanel imageKey="customPackaging" accent="#8B5CF6" aspect="video">
                <div className="grid h-full grid-cols-2 items-center gap-4">
                  <BoxArt accent="#8B5CF6" className="h-full w-full" title="Custom corrugated box illustration" />
                  <FoamArt accent="#19C3E6" className="h-full w-full" title="Custom foam fitment illustration" />
                </div>
              </MediaPanel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — Material selection */}
      <section className="band-white pattern-cad section-pad" aria-labelledby="material-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Step 02"
            title="Material selection"
            description="The material follows the protection requirement: corrugated for structure, EPE Foam Packaging for cushioning, LDPE Bubble & Protective Packaging for surface and impact protection, films for sealing and bundling, accessories to finish the job."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "Corrugated", body: "Ply and grade matched to load and handling.", color: "#FF8A2B" },
              { name: "EPE Foam Packaging", body: "Thickness and density matched to cushioning need.", color: "#19C3E6" },
              { name: "LDPE Bubble & Protective", body: "Surface, impact, dust and handling protection.", color: "#8B5CF6" },
              { name: "Poly & Films", body: "Sealing, bundling and load stability.", color: "#10B981" },
              { name: "Accessories", body: "Closing, securing, edge and specialist protection.", color: "#FF5C8A" },
            ].map((item) => (
              <StaggerItem key={item.name} className="h-full">
                <article
                  className="card-cad-studio group flex h-full flex-col gap-2 p-5 transition-all duration-300"
                  style={{ ["--accent" as string]: item.color }}
                >
                  <span className="h-2 w-10 rounded-full transition-all duration-500 group-hover:w-full" style={{ background: item.color }} aria-hidden="true" />
                  <h3 className="font-display text-base font-bold text-navy">{item.name}</h3>
                  <p className="text-sm leading-relaxed text-navy-soft">{item.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 5 — Dimension and thickness */}
      <FeatureGrid
        band="cream"
        eyebrow="Step 03"
        title="Dimension and thickness"
        description="Dimensions, ply and thickness are finalised in writing and carried through every repeat order, so the specification never drifts."
        columns={3}
        items={[
          {
            title: "Dimensions",
            description: "Internal dimensions set around the product, with handling and stacking clearance accounted for.",
            icon: "ruler",
            color: "#1E6FFF",
          },
          {
            title: "Ply & grade",
            description: "3-ply, 5-ply or 7-ply corrugated — selected against the load the pack has to carry.",
            icon: "boxes",
            color: "#FF8A2B",
          },
          {
            title: "Thickness",
            description: "Foam and film thickness chosen against the impact and abrasion the product faces.",
            icon: "layers",
            color: "#19C3E6",
          },
        ]}
      />

      {/* 6 — Printing and branding */}
      <section className="band-white pattern-cad section-pad" aria-labelledby="printing-heading">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <Reveal variant="slide-right" className="card-cad-studio p-7">
              <h3 className="font-display text-xl font-bold text-navy">Printing options we work with</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  "Product and part numbers",
                  "Brand and logo printing",
                  "Handling and warning marks",
                  "Batch or size identification",
                  "Single or multi-colour print",
                  "Plain (unprinted) packing",
                ].map((item, index) => (
                  <li
                    key={item}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-navy"
                    style={{ background: ["#E8F1FF", "#EAFBF4", "#FFF1E3", "#F3ECFF", "#FDF3D8", "#E6F8FB"][index] ?? "#E8F1FF" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow="Step 04"
                title="Printing and branding"
                description="Print is not decoration — it is how a box is identified on the shop floor and in the warehouse. We print what your dispatch and stores team actually needs, in the colours that make it legible."
                underline={false}
              />
              <Reveal variant="fade-up">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-navy/10 bg-accent-soft px-4 text-sm font-semibold text-accent-deep">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Print approved at sample stage
                  </span>
                  <span className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-navy/10 bg-white px-4 text-sm font-semibold text-navy-soft">
                    <Ruler className="h-4 w-4" aria-hidden="true" />
                    Layout checked with your team
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Prototype / sample */}
      <section className="band-sky pattern-cad section-pad" aria-labelledby="sample-heading">
        <div className="container-page">
          <div className="card-cad-studio flex flex-col items-start gap-6 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-contrast">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 id="sample-heading" className="font-display text-2xl font-bold text-navy">
                  Step 05 — Prototype / sample approval
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-soft sm:text-base">
                  Nothing goes into bulk before you have checked a sample against your own product. Fit,
                  strength, print and finish are all verified at this stage — which is exactly where
                  problems are cheapest to fix.
                </p>
              </div>
            </div>
            <Link href="/contact" className="btn-primary w-full sm:w-auto">
              Request a sample discussion
            </Link>
          </div>
        </div>
      </section>

      {/* 8 — Production and bulk supply */}
      <FeatureGrid
        band="white"
        eyebrow="Step 06"
        title="Production and bulk supply"
        description="With the sample approved, the requirement moves into production and organised trading supply, planned around your schedule."
        columns={3}
        items={[
          {
            title: "Production planning",
            description: "Quantities and sequence are scheduled against the specification you approved.",
            icon: "factory",
            color: "#1E6FFF",
          },
          {
            title: "Bulk quantities",
            description: "Regular consumption is supplied as a standing requirement rather than one-off orders.",
            icon: "boxes",
            color: "#19B26B",
          },
          {
            title: "Dispatch planning",
            description: "Reliable dispatch scheduling for industrial customers across Pan India.",
            icon: "truck",
            color: "#FF8A2B",
          },
        ]}
      />


      {/* 10 — CTA */}
      <CtaBanner
        title="Let's design your packaging"
        description="Share your size, material, quantity and application. We will respond with material options, a proposed specification and a commercial offer."
        primaryLabel="Start a Requirement"
        primaryHref="/contact"
      />

      <JsonLd id="custom-breadcrumb-jsonld" data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs])} />
    </>
  );
}

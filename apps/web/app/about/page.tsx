import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { BRAND } from "@srm/config";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { FactoryArt, TruckArt, WarehouseArt } from "@/components/ui/art";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import {
  ABOUT_DESCRIPTION,
  ABOUT_INTRO,
  ABOUT_POINTS,
  CAPABILITY_MATRIX,
  QUALITY_PHILOSOPHY,
  SUPPLY_PHILOSOPHY,
  WHAT_WE_PROVIDE,
} from "@/lib/constants";
import { industries } from "@/data/industries";

export const metadata: Metadata = buildMetadata({
  title: "About SRM Enterprises — Packaging Supply Built Around Your Business",
  description:
    "SRM Enterprises manufactures and trades industrial packaging materials — customized sizes, thicknesses and ply, consistent quality with competitive commercial pricing, and bulk supply across Pan India.",
  path: "/about",
  keywords: ["about SRM Enterprises", "industrial packaging supplier", "packaging manufacturer and trader"],
});

const breadcrumbs = [{ name: "About", path: "/about" }];

export default function AboutPage(): JSX.Element {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="About SRM Enterprises"
        title="Packaging Supply Built Around Your Business"
        description="One partner for manufacturing, trading and custom packaging — so you can stop coordinating five suppliers and start planning one packing line."
        breadcrumbs={breadcrumbs}
        accentColor="#1E6FFF"
      >
        <HeroActions
          primaryLabel="Get a Quote"
          primaryHref="/contact"
          secondaryLabel="See Products"
          secondaryHref="/products"
          location="about-hero"
        />
      </PageHero>

      {/* 2 — Introduction */}
      <section className="band-white section-pad" aria-labelledby="about-intro-heading">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal variant="split-left" className="flex flex-col gap-6">
              <SectionHeading
                eyebrow="Who We Are"
                title={ABOUT_INTRO}
                description={ABOUT_DESCRIPTION}
              />

              <StaggerGroup as="ul" className="flex flex-col gap-3">
                {ABOUT_POINTS.map((point) => (
                  <StaggerItem as="li" key={point} variant="kinetic-pop" className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-deep">
                      <CircleCheck className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-navy-soft sm:text-base">{point}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Reveal>

            <Reveal variant="iris-clip">
              <MediaPanel imageKey="aboutFacility" accent="#19B26B" aspect="video">
                <div className="grid h-full grid-cols-2 items-end gap-3">
                  <FactoryArt accent="#1E6FFF" className="h-full w-full" />
                  <TruckArt accent="#19B26B" className="h-full w-full" />
                  <div className="col-span-2">
                    <WarehouseArt accent="#FF8A2B" className="h-24 w-full" />
                  </div>
                </div>
              </MediaPanel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — What we provide */}
      <FeatureGrid
        band="sky"
        eyebrow="What We Provide"
        title="Manufacturing, trading and everything around them"
        description="Four ways we plug into your packaging requirement — individually or all at once."
        items={WHAT_WE_PROVIDE.map((item) => ({
          title: item.title,
          description: item.description,
          icon: item.icon,
          color: item.color,
        }))}
        columns={4}
      />

      {/* 4 — Capabilities */}
      <section className="band-white section-pad" aria-labelledby="capabilities-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything we can adjust for you"
            description="Standard material is fine until it is not. These are the six levers we work with on every order."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITY_MATRIX.map((item, index) => (
              <StaggerItem key={item.title} variant="flip-up" className="h-full">
                <article
                  className="surface-card group h-full p-6 hover:-translate-y-1.5 hover:shadow-lift"
                  style={{ ["--accent" as string]: ["#1E6FFF", "#19B26B", "#FFC93C", "#FF8A2B", "#8B5CF6", "#19C3E6"][index] ?? "#1E6FFF" }}
                >
                  <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-soft">{item.description}</p>
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-1.5 w-12 rounded-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-500 group-hover:w-full"
                  />
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 5 — Industries */}
      <IndustriesSection />

      {/* 6 — Quality and supply philosophy */}
      <section className="band-sky section-pad" aria-labelledby="philosophy-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Quality & Supply Philosophy"
            title="How we keep supply predictable"
            description="No drama, no surprises — just material that matches the approved specification and dispatch planned around your schedule."
            className="max-w-3xl"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h3 className="heading-shimmer-hover font-display text-lg font-bold text-navy transition-transform duration-300 hover:translate-x-1 cursor-default inline-block w-fit">
                Quality
              </h3>
              {QUALITY_PHILOSOPHY.map((item, index) => (
                <Reveal
                  key={item.title}
                  variant="slide-right"
                  delay={index * 0.08}
                  className="group/philosophy relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift cursor-default hover:border-navy/20"
                  style={{ ["--card-accent" as string]: item.color }}
                >
                  {/* Soft ambient color glow on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover/philosophy:opacity-25"
                    style={{ background: item.color }}
                  />

                  {/* Left accent indicator line on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 scale-y-0 rounded-l-2xl transition-transform duration-300 origin-center group-hover/philosophy:scale-y-100"
                    style={{ background: item.color }}
                  />

                  <div className="relative z-10 flex items-start gap-3.5">
                    <span className="relative mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      <span
                        className="absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover/philosophy:scale-150 group-hover/philosophy:opacity-35"
                        style={{ background: item.color }}
                      />
                      <span
                        className="relative h-3 w-3 rounded-full transition-all duration-300 group-hover/philosophy:scale-125 group-hover/philosophy:shadow-sm"
                        style={{ background: item.color }}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h4 className="font-semibold text-navy transition-all duration-300 group-hover/philosophy:translate-x-1">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy-soft transition-colors duration-300 group-hover/philosophy:text-navy/85">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="heading-shimmer-hover font-display text-lg font-bold text-navy transition-transform duration-300 hover:translate-x-1 cursor-default inline-block w-fit">
                Supply
              </h3>
              {SUPPLY_PHILOSOPHY.map((item, index) => (
                <Reveal
                  key={item.title}
                  variant="slide-left"
                  delay={index * 0.08}
                  className="group/philosophy relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift cursor-default hover:border-navy/20"
                  style={{ ["--card-accent" as string]: item.color }}
                >
                  {/* Soft ambient color glow on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover/philosophy:opacity-25"
                    style={{ background: item.color }}
                  />

                  {/* Left accent indicator line on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 scale-y-0 rounded-l-2xl transition-transform duration-300 origin-center group-hover/philosophy:scale-y-100"
                    style={{ background: item.color }}
                  />

                  <div className="relative z-10 flex items-start gap-3.5">
                    <span className="relative mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      <span
                        className="absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover/philosophy:scale-150 group-hover/philosophy:opacity-35"
                        style={{ background: item.color }}
                      />
                      <span
                        className="relative h-3 w-3 rounded-full transition-all duration-300 group-hover/philosophy:scale-125 group-hover/philosophy:shadow-sm"
                        style={{ background: item.color }}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h4 className="font-semibold text-navy transition-all duration-300 group-hover/philosophy:translate-x-1">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-navy-soft transition-colors duration-300 group-hover/philosophy:text-navy/85">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Why businesses choose SRM */}
      <section className="band-cream section-pad" aria-labelledby="choose-srm-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Businesses Choose SRM"
            title="One supplier, one specification sheet, one conversation"
            description="Buyers come to us for the same three practical reasons: the material matches what was approved, customisation does not derail the schedule, and repeat supply keeps working."
            className="max-w-3xl"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "Specification discipline",
                body: "Material, ply, thickness, dimensions and printing are confirmed in writing before supply — so the second order matches the first.",
                color: "#1E6FFF",
              },
              {
                title: "Customisation that is practical",
                body: "Custom work runs through a defined sequence ending in a sample, which keeps surprises out of bulk production.",
                color: "#19B26B",
              },
              {
                title: "Industrial supply focus",
                body: `Requirements are planned for industrial consumption patterns, with bulk supply ${BRAND.bulkSupplyLine}.`,
                color: "#FF8A2B",
              },
            ].map((item, index) => (
              <Reveal key={item.title} variant="depth-zoom" delay={index * 0.07} className="h-full">
                <article
                  className="surface-card group flex h-full flex-col gap-3 p-6 hover:-translate-y-1.5 hover:shadow-lift"
                  style={{ ["--accent" as string]: item.color }}
                >
                  <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-navy-soft">{item.body}</p>
                  <Link
                    href="/why-us"
                    className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
                    style={{ color: item.color }}
                  >
                    Why us
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal variant="fade-up" delay={0.1} className="mt-8">
            <p className="text-sm text-navy-soft">
              We support {industries.length} industry groups —{" "}
              {industries.map((industry, index) => (
                <span key={industry.slug}>
                  <Link href={`/industries/${industry.slug}`} className="link-accent">
                    {industry.name}
                  </Link>
                  {index < industries.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8 — CTA */}
      <CtaBanner
        title="Let's talk about your packaging requirement"
        description="Tell us what you pack, how much you need and where it is dispatched — we will do the rest."
        primaryLabel="Start an Inquiry"
        primaryHref="/contact"
      />

      <JsonLd id="about-breadcrumb-jsonld" data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs])} />
    </>
  );
}

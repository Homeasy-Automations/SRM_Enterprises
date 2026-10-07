import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { industries, industryTagline } from "@/data/industries";
import { getProductBySlug } from "@/data/products";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { IndustryArtwork } from "@/components/ui/art";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/animations/Reveal";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Support — Packaging for Automotive, Engineering, Electronics & More",
  description:
    "Packaging solutions designed around product protection and supply-chain needs — automotive & auto components, engineering & industrial, electrical & electronics, pharmaceuticals, food & FMCG, and e-commerce & logistics.",
  path: "/industries",
  keywords: [
    "automotive component packaging",
    "engineering packaging supplier",
    "electronics ESD packaging",
    "pharma packaging supplier",
    "e-commerce packaging supplier India",
  ],
});

const breadcrumbs = [{ name: "Industries", path: "/industries" }];

export default function IndustriesPage(): JSX.Element {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="Industries"
        title="Packaging matched to your industry's handling reality"
        description={industryTagline}
        breadcrumbs={breadcrumbs}
        accentColor="#8B5CF6"
        backgroundImage="/images/Industries/industries_hero.png"
      >
        <HeroActions
          primaryLabel="Get a Quote"
          primaryHref="/contact"
          secondaryLabel="All Products"
          secondaryHref="/products"
          location="industries-hero"
        />
      </PageHero>

      {/* 2 — Interactive Sector Matrix Ribbon */}
      <section className="band-sky py-4 border-y border-navy/10 pattern-hex sticky top-16 z-20 backdrop-blur-md bg-white/90" aria-label="Sector quick jump">
        <div className="container-page flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-navy-soft shrink-0">
            Sector Matrix:
          </span>
          <div className="flex items-center gap-2">
            {industries.map((ind, i) => (
              <a
                key={ind.slug}
                href={`#${ind.slug}`}
                className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-navy/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy shadow-xs transition-all duration-300 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 hover:border-accent hover:text-accent-deep"
              >
                <span className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125" style={{ background: ind.color }} />
                <span>0{i + 1} {ind.shortName}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Bento Sector Command Deck per industry */}
      <div className="pattern-hex bg-slate-50/40">
        <div className="container-page py-12 space-y-14 sm:py-16">
          {industries.map((industry, index) => {
            return (
              <section
                key={industry.slug}
                id={industry.slug}
                className="scroll-mt-32"
                aria-labelledby={`${industry.slug}-heading`}
                style={{ ["--accent" as string]: industry.color }}
              >
                <Reveal variant="fade-up">
                  <div className="sector-cockpit-card group p-6 sm:p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                    {/* Cockpit Top Bar */}
                    <div className="flex flex-col gap-4 border-b border-navy/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-center gap-4">
                        <span
                          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-sm transition-all duration-500 group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-lg"
                          style={{ background: industry.color }}
                        >
                          <CategoryIcon name={industry.icon} className="h-7 w-7" color="#FFFFFF" />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="font-mono text-[0.7rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md transition-all duration-300 group-hover:scale-105"
                              style={{ background: `${industry.color}18`, color: industry.color }}
                            >
                              SECTOR 0{index + 1}
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-125" style={{ background: industry.color }} />
                            <span className="text-xs font-medium text-navy-soft">Industry Packaging Overview</span>
                          </div>
                          <h2 id={`${industry.slug}-heading`} className="font-display text-2xl font-bold text-navy sm:text-3xl mt-0.5 transition-transform duration-300 group-hover:translate-x-1.5">
                            {industry.name}
                          </h2>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-white px-3 py-1 text-xs font-medium text-navy shadow-2xs transition-all duration-300 hover:border-navy/20 hover:scale-105">
                          <span className="h-2 w-2 rounded-full" style={{ background: industry.color }} />
                          Pan-India Supply
                        </span>
                        {/* <Link
                          href={`/industries/${industry.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent-deep hover:underline transition-all duration-300 hover:scale-105 hover:translate-x-1"
                          style={{ color: industry.color }}
                        >
                          Dedicated Page
                          <ArrowRight className="h-3.5 w-3.5 icon-arrow-spring" aria-hidden="true" />
                        </Link> */}
                      </div>
                    </div>

                    {/* Sector Briefing Narrative */}
                    <p className="mt-5 text-sm sm:text-base leading-relaxed text-navy-soft max-w-4xl">
                      {industry.intro}
                    </p>

                    {/* Asymmetric 3-Column Bento Deck */}
                    <div className="mt-8 grid gap-6 lg:grid-cols-12 items-stretch">
                      {/* Left: Supply Chain Hazards (4 cols) */}
                      <div className="lg:col-span-4 flex flex-col rounded-2xl border border-navy/10 bg-white/80 p-5 shadow-xs transition-all duration-300 hover:border-amber-400/50 hover:shadow-md">
                        <div className="flex items-center gap-2 border-b border-navy/10 pb-3">
                          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" aria-hidden="true" />
                          <h3 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-navy">
                            Supply-Chain Handling Hazards
                          </h3>
                        </div>
                        <StaggerGroup as="ul" className="mt-4 flex flex-col gap-2.5 flex-1">
                          {industry.challenges.slice(0, 4).map((challenge) => (
                            <StaggerItem
                              as="li"
                              key={challenge}
                              variant="slide-right"
                              className="group/hazard rounded-xl border border-navy/5 bg-slate-50/70 p-3 text-xs leading-relaxed text-navy-soft shadow-xs flex items-start gap-2.5 transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-md hover:border-amber-300/60 cursor-default"
                            >
                              <span
                                className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover/hazard:scale-150"
                                style={{ background: industry.color }}
                                aria-hidden="true"
                              />
                              <span className="transition-colors duration-300 group-hover/hazard:text-navy">{challenge}</span>
                            </StaggerItem>
                          ))}
                        </StaggerGroup>
                      </div>

                      {/* Middle: Targeted Material Architecture (4 cols) */}
                      <div className="lg:col-span-4 flex flex-col rounded-2xl border border-navy/10 bg-white/80 p-5 shadow-xs transition-all duration-300 hover:border-emerald-400/50 hover:shadow-md">
                        <div className="flex items-center gap-2 border-b border-navy/10 pb-3">
                          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                          <h3 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-navy">
                            Targeted Material Architecture
                          </h3>
                        </div>
                        <StaggerGroup as="ul" className="mt-4 flex flex-col gap-2.5 flex-1">
                          {industry.recommendedPackaging.slice(0, 4).map((entry) => {
                            const product = getProductBySlug(entry.productSlug);
                            return (
                              <StaggerItem
                                as="li"
                                key={entry.productSlug}
                                variant="slide-left"
                                className="group/sol rounded-xl border border-navy/5 bg-slate-50/70 p-3 shadow-xs hover:border-accent/40 hover:bg-white hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex flex-col gap-1 cursor-pointer"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <Link
                                    href={`/products/${entry.productSlug}`}
                                    className="text-xs font-bold text-navy hover:underline flex items-center gap-1.5 transition-colors duration-300 group-hover/sol:text-accent-deep"
                                  >
                                    <span
                                      className="h-2 w-2 rounded-full shrink-0 transition-transform duration-300 group-hover/sol:scale-125"
                                      style={{ background: product?.color ?? industry.color }}
                                    />
                                    {product?.name ?? entry.productSlug}
                                  </Link>
                                  <ArrowRight className="h-3 w-3 text-navy-soft shrink-0 transition-transform duration-300 group-hover/sol:translate-x-1" aria-hidden="true" />
                                </div>
                                <p className="text-[0.75rem] leading-normal text-navy-soft line-clamp-2">
                                  {entry.reason}
                                </p>
                              </StaggerItem>
                            );
                          })}
                        </StaggerGroup>
                      </div>

                      {/* Right: Industry Visual Profile & Action Controls (4 cols) */}
                      <div className="group/chamber lg:col-span-4 flex flex-col justify-between rounded-2xl border border-navy/10 bg-gradient-to-b from-white via-slate-50/40 to-white p-5 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-navy/20">
                        <div>
                          <div className="flex items-center justify-between gap-2 border-b border-navy/10 pb-3">
                            <span className="font-mono text-[0.7rem] uppercase tracking-wider text-navy-soft">
                              Industry Packaging Profile // {industry.shortName}
                            </span>
                            <span className="text-[0.7rem] font-bold transition-all duration-300 group-hover/chamber:scale-105" style={{ color: industry.color }}>
                              Industrial Grade
                            </span>
                          </div>

                          <div
                            className="mt-4 relative h-40 w-full overflow-hidden rounded-xl border border-navy/10 transition-all duration-500 group-hover/chamber:scale-[1.02] group-hover/chamber:shadow-md"
                            style={{ background: `${industry.color}0D` }}
                          >
                            <Image
                              src={`/images/Industries/industries_${
                                industry.slug === "food-fmcg"
                                  ? "fmcg"
                                  : industry.slug === "ecommerce-logistics"
                                  ? "logistics"
                                  : industry.slug === "electronics"
                                  ? "electrical"
                                  : industry.slug === "pharmaceuticals"
                                  ? "pharma"
                                  : industry.slug
                              }.png`}
                              alt={`${industry.name} packaging`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 33vw"
                              className="media-zoom object-cover transition-transform duration-700 group-hover/chamber:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-semibold text-white/95 drop-shadow-sm">
                              <span>{industry.shortName} Spec</span>
                              <span className="text-white/75 font-mono text-[10px]">OEM Approved</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-2.5">
                          <Link
                            href={`/industries/${industry.slug}`}
                            className="btn text-white text-center justify-center text-xs font-bold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-102"
                            style={{ background: industry.color }}
                          >
                            Full {industry.shortName} Blueprint
                            <ArrowRight className="h-3.5 w-3.5 icon-arrow-spring" aria-hidden="true" />
                          </Link>
                          <Link
                            href="/contact"
                            className="btn-outline text-center justify-center text-xs font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xs hover:scale-102"
                          >
                            Discuss Requirement
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>
            );
          })}
        </div>
      </div>

      {/* 4 — Industry-specific packaging approach */}
      <section className="band-sky section-pad pattern-hex" aria-labelledby="approach-heading">
        <div className="container-page">
          <h2 id="approach-heading" className="font-display text-2xl font-bold text-navy sm:text-3xl">
            How we approach an industry-specific requirement
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-navy-soft">
            Industry names describe typical risk patterns; the actual packaging is always built around
            the specific product, the way it is handled and the route it travels.
          </p>

          <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Understand the movement",
                body: "From packing station to stacking, storage, transit and unpacking — each stage has its own risk.",
                color: "#1E6FFF",
              },
              {
                title: "Select the material set",
                body: "Primary protection, outer packaging and accessories are chosen together, not separately.",
                color: "#19B26B",
              },
              {
                title: "Fix the specification",
                body: "Dimensions, ply or thickness, printing and packing format are agreed before supply.",
                color: "#FF8A2B",
              },
              {
                title: "Plan repeat supply",
                body: "Regular requirements are scheduled so material arrives before the line runs out.",
                color: "#8B5CF6",
              },
            ].map((item, itemIndex) => (
              <StaggerItem key={item.title} className="h-full">
                <article
                  className="card-sector-hex group flex h-full flex-col gap-3 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                  style={{ ["--accent" as string]: item.color }}
                >
                  <span className="font-display text-3xl font-extrabold transition-all duration-300 group-hover:scale-115 group-hover:translate-x-1" style={{ color: item.color }}>
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-bold text-navy transition-colors duration-300 group-hover:text-accent">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-navy-soft">{item.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 5 — CTA */}
      <CtaBanner
        title="Tell us your industry and what you pack"
        description="We will suggest the material set that fits your handling, storage and dispatch pattern."
        primaryLabel="Get a Quote"
        primaryHref="/contact"
      />

      <JsonLd
        id="industries-jsonld"
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs]),
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

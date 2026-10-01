import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { industries, industryTagline } from "@/data/industries";
import { getProductBySlug } from "@/data/products";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { IndustryArtwork } from "@/components/ui/art";
import { IndustryCard } from "@/components/industries/IndustryCard";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/animations/Reveal";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

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
    "e-commerce packaging supplier NCR",
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
      >
        <HeroActions
          primaryLabel="Get a Quote"
          primaryHref="/contact"
          secondaryLabel="All Products"
          secondaryHref="/products"
          location="industries-hero"
        />
      </PageHero>

      {/* 2 — Quick card grid */}
      <section className="band-sky section-pad-sm" aria-labelledby="industry-grid-heading">
        <div className="container-page">
          <h2 id="industry-grid-heading" className="sr-only">
            All industries we support
          </h2>
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <StaggerItem key={industry.slug} className="h-full">
                <IndustryCard industry={industry} className="h-full" />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 3 — One section per industry */}
      {industries.map((industry, index) => {
        const flipped = index % 2 === 1;
        return (
          <section
            key={industry.slug}
            id={industry.slug}
            className={cn("scroll-mt-28 border-t border-navy/10", index % 2 === 0 ? "band-white" : "band-cream")}
            aria-labelledby={`${industry.slug}-heading`}
            style={{ ["--accent" as string]: industry.color }}
          >
            <div className="container-page section-pad">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                <div className={cn("flex flex-col gap-5", flipped && "lg:order-2")}>
                  <Reveal variant="fade-up">
                    <span className="eyebrow">Industry {String(index + 1).padStart(2, "0")}</span>
                  </Reveal>

                  <Reveal variant="fade-up" delay={0.05}>
                    <h2 id={`${industry.slug}-heading`} className="font-display text-2xl font-bold text-navy sm:text-3xl">
                      {industry.name}
                    </h2>
                  </Reveal>

                  <Reveal variant="fade-up" delay={0.08}>
                    <p className="text-base leading-relaxed text-navy-soft">{industry.intro}</p>
                  </Reveal>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-soft">
                        Challenges
                      </h3>
                      <StaggerGroup as="ul" className="mt-3 flex flex-col gap-2">
                        {industry.challenges.slice(0, 4).map((challenge) => (
                          <StaggerItem as="li" key={challenge} variant="slide-right" className="flex items-start gap-2">
                            <span
                              className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: industry.color }}
                              aria-hidden="true"
                            />
                            <span className="text-sm text-navy-soft">{challenge}</span>
                          </StaggerItem>
                        ))}
                      </StaggerGroup>
                    </div>

                    <div>
                      <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-soft">
                        Relevant solutions
                      </h3>
                      <StaggerGroup as="ul" className="mt-3 flex flex-col gap-2">
                        {industry.recommendedPackaging.slice(0, 4).map((entry) => {
                          const product = getProductBySlug(entry.productSlug);
                          return (
                            <StaggerItem as="li" key={entry.productSlug} variant="slide-left" className="flex items-start gap-2">
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0"
                                style={{ color: product?.color ?? industry.color }}
                                aria-hidden="true"
                              />
                              <Link
                                href={`/products/${entry.productSlug}`}
                                className="text-sm font-medium text-navy underline-offset-4 hover:underline"
                              >
                                {product?.name ?? entry.productSlug}
                              </Link>
                            </StaggerItem>
                          );
                        })}
                      </StaggerGroup>
                    </div>
                  </div>

                  <Reveal variant="fade-up" delay={0.1}>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/industries/${industry.slug}`}
                        className="btn text-white transition-transform duration-300 hover:-translate-y-0.5"
                        style={{ background: industry.color }}
                      >
                        Full industry page
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link href="/contact" className="btn-outline">
                        Discuss requirement
                      </Link>
                    </div>
                  </Reveal>
                </div>

                <Reveal variant="clip" delay={0.06} className={cn(flipped && "lg:order-1")}>
                  <MediaPanel imageKey={industry.imageKey} accent={industry.color} aspect="video">
                    <IndustryArtwork
                      iconKey={industry.icon}
                      accent={industry.color}
                      className="h-full w-full"
                      title={`${industry.name} illustration`}
                    />
                  </MediaPanel>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* 4 — Industry-specific packaging approach */}
      <section className="band-sky section-pad" aria-labelledby="approach-heading">
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
                  className="surface-card group flex h-full flex-col gap-2 p-6 hover:-translate-y-1.5 hover:shadow-lift"
                  style={{ ["--accent" as string]: item.color }}
                >
                  <span className="font-display text-3xl font-extrabold" style={{ color: item.color }}>
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-bold text-navy">{item.title}</h3>
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

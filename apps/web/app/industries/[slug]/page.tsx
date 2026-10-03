import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { industries, getIndustryBySlug } from "@/data/industries";
import { getProductBySlug, products } from "@/data/products";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryArtwork, ProductArt } from "@/components/ui/art";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

/** One dynamic template drives all six industry pages. */
/**
 * Only the slugs defined in the data files exist. With `dynamicParams = false` an unknown
 * slug returns a real 404 at the routing layer (instead of a soft 404), and the pages stay
 * fully static.
 */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) {
    return buildMetadata({
      title: "Industry Not Found",
      description: "This industry page does not exist. Browse the SRM Enterprises industry solutions instead.",
      path: `/industries/${params.slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${industry.name} Packaging Solutions — ${industry.tagline}`,
    description: `${industry.description} Packaging solutions designed around product protection and supply-chain needs. Bulk supply across Pan India.`,
    path: `/industries/${industry.slug}`,
    keywords: [`${industry.name} packaging`, "industrial packaging supplier India", "packaging supplier Pan India"],
  });
}

export default function IndustryDetailPage({ params }: { params: { slug: string } }): JSX.Element {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) notFound();

  const breadcrumbs = [
    { name: "Industries", path: "/industries" },
    { name: industry.shortName, path: `/industries/${industry.slug}` },
  ];

  const recommended = industry.recommendedPackaging.flatMap((entry) => {
    const product = getProductBySlug(entry.productSlug);
    return product ? [{ entry, product }] : [];
  });

  return (
    <div style={{ ["--accent" as string]: industry.color }}>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="Industry Solutions"
        title={`${industry.name} Packaging`}
        description={industry.intro}
        breadcrumbs={breadcrumbs}
        accentColor={industry.color}
        waveColor="#FFFFFF"
      >
        <HeroActions
          primaryLabel="Get a Quote"
          primaryHref="/contact"
          secondaryLabel="All Industries"
          secondaryHref="/industries"
          location="industry-hero"
        />
      </PageHero>

      {/* 2 — Challenges */}
      <section className="band-white section-pad" aria-labelledby="challenges-heading">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow="Challenges"
                title="What makes this industry's packaging difficult"
                description="These are the recurring risks that shape the packing decision — your product will have its own version of them."
              />

              <StaggerGroup as="ul" className="flex flex-col gap-3">
                {industry.challenges.map((challenge) => (
                  <StaggerItem as="li" key={challenge} variant="slide-right" className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                      style={{ background: `${industry.color}1F`, color: industry.color }}
                    >
                      <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-navy-soft sm:text-base">{challenge}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <Reveal variant="clip">
              <MediaPanel imageKey={industry.imageKey} accent={industry.color} aspect="video" priority>
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

      {/* 3 — Recommended packaging (linked to product categories) */}
      <section className="band-sky section-pad pattern-hex" aria-labelledby="recommended-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Recommended Packaging"
            title="Materials that address those challenges"
            description="Each suggestion links to the category page, where the item range and customisation options are listed."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2">
            {recommended.map(({ entry, product }) => (
              <StaggerItem key={product.slug} className="h-full">
                <TiltCard href={`/products/${product.slug}`} accentColor={product.color} className="card-sector-hex h-full">
                  <div className="flex h-full flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                        style={{ background: `${product.color}1F` }}
                      >
                        <ProductArt
                          iconKey={product.icon}
                          accent={product.color}
                          className="h-11 w-11"
                          title={`${product.name} illustration`}
                        />
                      </span>
                      <h3 className="font-display text-base font-bold text-navy sm:text-lg">{product.name}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-navy-soft">{entry.reason}</p>
                    <span
                      className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
                      style={{ color: product.color }}
                    >
                      Open category
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal variant="fade-up" delay={0.1} className="mt-8">
            <Link
              href="/products"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold"
              style={{ color: industry.color }}
            >
              Browse all five packaging categories
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4 — Product categories strip */}
      <section className="band-white section-pad-sm" aria-labelledby="categories-heading">
        <div className="container-page">
          <h2 id="categories-heading" className="font-display text-xl font-bold text-navy sm:text-2xl">
            Product categories used in {industry.shortName.toLowerCase()}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    borderColor: `${product.color}44`,
                    background: `${product.color}12`,
                    color: "#12294A",
                  }}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: product.color }} aria-hidden="true" />
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — Protection & supply requirements */}
      <section className="band-cream section-pad" aria-labelledby="requirements-heading">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <SectionHeading eyebrow="Our Approach" title="How the packaging is planned" underline={false} />
              <StaggerGroup as="ul" className="flex flex-col gap-3">
                {industry.approach.map((item) => (
                  <StaggerItem as="li" key={item} variant="slide-right" className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white p-4 shadow-soft">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: industry.color }}
                    >
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-navy-soft">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <div className="flex flex-col gap-4">
              <SectionHeading eyebrow="Supply" title="How supply is planned" underline={false} />
              <StaggerGroup as="ul" className="flex flex-col gap-3">
                {industry.supplyNotes.map((item) => (
                  <StaggerItem as="li" key={item} variant="slide-left" className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white p-4 shadow-soft">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                      style={{ background: `${industry.color}1F`, color: industry.color }}
                    >
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-navy-soft">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Custom packaging */}
      <section className="band-sky section-pad-sm" aria-labelledby="industry-custom-heading">
        <div className="container-page">
          <div className="flex flex-col items-start gap-5 rounded-[28px] border border-navy/10 bg-white p-7 shadow-card sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="industry-custom-heading" className="font-display text-2xl font-bold text-navy">
                Custom packaging for {industry.shortName.toLowerCase()} needs
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-soft sm:text-base">
                Requirement → Material Selection → Design → Prototype/Sample → Production → Dispatch. A
                defined sequence, ending with a sample you approve before bulk supply.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/custom-packaging" className="btn-primary">
                Custom packaging process
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-outline">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — CTA */}
      <CtaBanner
        title={`Packaging for ${industry.shortName.toLowerCase()} — let's get it right`}
        description="Share your product, packing process and quantity; we will suggest the material set that fits."
        primaryLabel="Get a Quote"
        primaryHref="/contact"
        showRibbon={false}
      />

      <JsonLd
        id={`industry-${industry.slug}-jsonld`}
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs])}
      />
    </div>
  );
}

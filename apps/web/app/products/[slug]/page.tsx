import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, ShieldCheck, Sparkles } from "lucide-react";
import { products, getProductBySlug } from "@/data/products";
import { industries } from "@/data/industries";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { RelatedCategories } from "@/components/products/RelatedCategories";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductArt, IndustryArtwork } from "@/components/ui/art";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { buildMetadata, breadcrumbJsonLd, productCategoryJsonLd } from "@/lib/seo";

/** One dynamic template drives all five product categories. */
/**
 * Only the slugs defined in the data files exist. With `dynamicParams = false` an unknown
 * slug returns a real 404 at the routing layer (instead of a soft 404), and the pages stay
 * fully static.
 */
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return buildMetadata({
      title: "Product Category Not Found",
      description: "This packaging category does not exist. Browse the SRM Enterprises product range instead.",
      path: `/products/${params.slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${product.name} — ${product.tagline}`,
    description: `${product.description}${product.note ? ` ${product.note}.` : ""} Custom sizes, thicknesses and bulk quantities from SRM Enterprises — bulk supply across Pan India.`,
    path: `/products/${product.slug}`,
    keywords: [product.name, ...product.items.slice(0, 3)],
  });
}

export default function ProductDetailPage({ params }: { params: { slug: string } }): JSX.Element {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const breadcrumbs = [
    { name: "Products", path: "/products" },
    { name: product.shortName, path: `/products/${product.slug}` },
  ];

  const relatedIndustries = industries.filter((industry) => product.industries.includes(industry.slug));

  return (
    <div data-category={product.slug}>
      {/* 1 — Hero in the category colour */}
      <PageHero
        eyebrow={`${product.badge} • Industrial Packaging`}
        title={product.name}
        description={
          <>
            <strong className="font-semibold text-navy">{product.tagline}.</strong> {product.description}
          </>
        }
        breadcrumbs={breadcrumbs}
        accentColor={product.color}
        categorySlug={product.slug}
        waveColor="#FFFFFF"
      >
        <HeroActions
          primaryLabel="Request Quote"
          primaryHref={`/contact?product=${product.slug}`}
          secondaryLabel="All Categories"
          secondaryHref="/products"
          productName={product.name}
          location="product-hero"
        />
      </PageHero>

      {/* 2 — Product range */}
      <section className="band-white section-pad" aria-labelledby="range-heading">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal variant="clip">
              <MediaPanel imageKey={product.imageKey} accent={product.color} aspect="video" priority>
                <ProductArt
                  iconKey={product.icon}
                  accent={product.color}
                  className="h-full w-full"
                  title={`${product.name} illustration`}
                />
              </MediaPanel>
            </Reveal>

            <div className="flex flex-col gap-5">
              <SectionHeading
                eyebrow="Product Range"
                title="What we supply in this category"
                description={product.intro}
              />

              <StaggerGroup as="ul" className="grid gap-2.5 sm:grid-cols-2">
                {product.items.map((item) => (
                  <StaggerItem as="li" key={item} variant="slide-right" className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                      style={{ background: product.color }}
                    >
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-navy-soft">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              {product.note ? (
                <Reveal variant="fade-up">
                  <p
                    className="rounded-2xl border px-4 py-3 text-sm font-semibold"
                    style={{ borderColor: `${product.color}44`, background: `${product.color}12`, color: "#12294A" }}
                  >
                    {product.note}
                  </p>
                </Reveal>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Customization */}
      <section className="band-sky section-pad" aria-labelledby="customisation-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Customization"
            title="How this category can be tailored"
            description="Nothing here is fixed except the specification you approve — sizes, thickness and formats are set around your product."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.customization.map((item, index) => (
              <StaggerItem key={item} className="h-full">
                <article
                  className="surface-card group flex h-full items-start gap-3 p-5 hover:-translate-y-1.5 hover:shadow-lift"
                  style={{ ["--accent" as string]: product.color }}
                >
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: product.color }}
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm leading-relaxed text-navy">{item}</p>
                  <span className="sr-only">{`Customisation point ${index + 1}`}</span>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal variant="fade-up" delay={0.1} className="mt-8">
            <Link
              href="/custom-packaging"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-bold"
              style={{ color: product.color }}
            >
              See the full custom packaging process
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4 — Protection & quality features (qualitative only) */}
      <FeatureGrid
        band="white"
        eyebrow="Protection & Quality"
        title="What this packaging does for your product"
        description="Described in terms of the protection it provides — no numbers, no promises we cannot stand behind."
        columns={3}
        items={product.protection.map((point) => ({
          title: point.title,
          description: point.description,
          icon: "shield",
          color: product.color,
          tag: product.badge,
        }))}
      />

      {/* 5 — Applications */}
      <section className="band-cream section-pad" aria-labelledby="applications-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Applications"
            title="Where this category is usually used"
            description="Typical applications our customers pack with this material — your requirement can of course be different."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.applications.map((application) => (
              <StaggerItem key={application} className="h-full">
                <div
                  className="flex h-full items-center gap-3 rounded-2xl border border-navy/10 bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                  style={{ ["--accent" as string]: product.color }}
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: `${product.color}1F`, color: product.color }}
                  >
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-medium text-navy">{application}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 6 — Industries using this category */}
      <section className="band-white section-pad" aria-labelledby="industries-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Industries"
            title="Industries that use this category"
            description="Each industry page explains the challenges and how the packaging addresses them."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedIndustries.map((industry) => (
              <StaggerItem key={industry.slug} className="h-full">
                <TiltCard
                  href={`/industries/${industry.slug}`}
                  accentColor={industry.color}
                  className="h-full"
                  ariaLabel={`${industry.name} packaging approach`}
                >
                  <div className="flex h-full flex-col gap-3 p-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition-transform duration-500 group-hover:scale-110"
                        style={{ background: industry.color }}
                      >
                        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="font-display text-base font-bold text-navy">{industry.name}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-navy-soft">{industry.tagline}</p>
                    <div className="mt-auto overflow-hidden rounded-2xl" style={{ background: `${industry.color}12` }}>
                      <IndustryArtwork
                        iconKey={industry.icon}
                        accent={industry.color}
                        className="h-24 w-full transition-transform duration-700 group-hover:scale-105"
                        title={`${industry.name} illustration`}
                      />
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 7 — Related categories */}
      <RelatedCategories current={product} all={products} />

      {/* 8 — Quote CTA */}
      <CtaBanner
        title={`Need ${product.name}? Let's Get in Touch.`}
        description="Share your size, material, quantity and application — we will come back with options and a commercial offer."
        primaryLabel="Request Quote"
        primaryHref={`/contact?product=${product.slug}`}
        showRibbon={false}
      />

      <JsonLd
        id={`product-${product.slug}-jsonld`}
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs]),
          productCategoryJsonLd({
            name: product.name,
            description: `${product.tagline}. ${product.description}`,
            path: `/products/${product.slug}`,
            category: "Industrial Packaging Materials",
          }),
        ]}
      />
    </div>
  );
}

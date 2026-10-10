import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { PackageCategorySection } from "@/components/products/PackageCategorySection";
import { ProductCustomizationFlow } from "@/components/products/ProductCustomizationFlow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/sections/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductArt } from "@/components/ui/art";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/animations/Reveal";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { products } from "@/data/products";
import { BRAND } from "@srm/config";

export const metadata: Metadata = buildMetadata({
  title: "Packaging Products — Corrugated, EPE Foam, Bubble, Poly Films & Accessories",
  description:
    "Browse the full SRM Enterprises packaging range: corrugated boxes and sheets, EPE foam bags and fitments, LDPE bubble and protective packaging, poly bags and films, and packaging accessories. Custom sizes, thicknesses and bulk quantities.",
  path: "/products",
  keywords: [
    "corrugated packaging supplier",
    "EPE foam packaging supplier",
    "bubble wrap supplier",
    "poly bags and films",
    "packaging accessories supplier",
  ],
});

const breadcrumbs = [{ name: "Products", path: "/products" }];

export default function ProductsPage(): JSX.Element {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="Product Range"
        title="Five packaging categories. One supply source."
        description="Corrugated boxes, EPE Foam Packaging, LDPE Bubble & Protective Packaging, poly bags & films and packaging accessories — supplied as standard material or built to your specification, in trial quantities or bulk."
        breadcrumbs={breadcrumbs}
        accentColor="#1E6FFF"
        backgroundImage="/images/Products/product_hero.png"
      >
        <HeroActions
          primaryLabel="Get a Quote"
          primaryHref="/contact"
          secondaryLabel="Custom Packaging"
          secondaryHref="/custom-packaging"
          location="products-hero"
        />
      </PageHero>

      {/* 2 — Category overview */}
      <section className="band-sky pattern-blueprint section-pad-sm" aria-labelledby="category-overview-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="At a Glance"
            title="Jump straight to a category"
            description="Each category page lists the item range, customisation options, applications and the industries that use it."
            className="max-w-3xl"
            underline={false}
          />

          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((product) => (
              <StaggerItem key={product.slug} variant="kinetic-pop" className="h-full">
                <Link
                  href={`/products/${product.slug}`}
                  className="card-tech-blueprint group flex h-full min-h-[260px] flex-col justify-between gap-4 p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
                  style={{ ["--card-accent" as string]: product.color }}
                >
                  <div className="flex flex-col gap-3">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-2xl transition-all duration-500 group-hover:scale-115 group-hover:-rotate-6 group-hover:shadow-md"
                      style={{ background: `${product.color}1F` }}
                    >
                      <ProductArt
                        iconKey={product.icon}
                        accent={product.color}
                        className="h-12 w-12 transition-transform duration-500 group-hover:scale-110"
                        title={`${product.name} illustration`}
                      />
                    </span>
                    <h3 className="font-ui text-base font-bold text-navy transition-colors duration-300 group-hover:text-accent">
                      {product.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-navy-soft">{product.tagline}</p>
                  </div>
                  <span
                    className="mt-auto inline-flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 group-hover:translate-x-1.5"
                    style={{ color: product.color }}
                  >
                    Details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 3 — One section per category */}
      <div className="band-white pattern-blueprint">
        <div className="container-page">
          {products.map((product, index) => (
            <PackageCategorySection key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>

      {/* 4 — Custom packaging */}
      <section className="band-cream section-pad-sm" aria-labelledby="products-custom-heading">
        <div className="container-page">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-col gap-4">
              <SectionHeading
                eyebrow="Custom Packaging"
                title="When the standard size is nearly right, we make it exactly right"
                description="Size, thickness, ply, printing and packing format — all developed around your product, then confirmed with a sample before bulk supply."
                underline={false}
              />
              <Reveal variant="split-left">
                <div className="flex flex-wrap gap-3">
                  <Link href="/custom-packaging" className="btn-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:scale-102">
                    Custom packaging process
                    <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
                  </Link>
                  <Link href="/contact" className="btn-outline transition-all duration-300 hover:-translate-y-1 hover:shadow-xs hover:scale-102">
                    Discuss your requirement
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal variant="iris-clip" className="rounded-[26px] border border-navy/10 bg-white p-6 shadow-soft transition-all duration-500 hover:shadow-xl hover:border-accent/40">
              <ul className="grid gap-3 sm:grid-cols-2">
                {["Dimensions", "Ply", "Thickness", "Material", "Printing", "Packing format"].map((item, index) => (
                  <li
                    key={item}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-navy transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-md cursor-default border border-transparent hover:border-navy/10"
                    style={{
                      background: ["#E8F1FF", "#EAFBF4", "#FFF1E3", "#F3ECFF", "#FDF3D8", "#E6F8FB"][index] ?? "#E8F1FF",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5 — Customization Flow */}
      <ProductCustomizationFlow />

      {/* 6 — Requirement CTA */}
      <CtaBanner
        title="Found what you need? Send the requirement."
        description="Share your size, material, quantity and application. Bulk supply across Pan India with reliable dispatch logistics."
        primaryLabel="Get a Quote"
        primaryHref="/contact"
        footnote={`Dispatch support across ${BRAND.locations.join(", ")}.`}
      />

      <JsonLd
        id="products-jsonld"
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs]),
          itemListJsonLd(
            products.map((product) => ({
              name: product.name,
              path: `/products/${product.slug}`,
              description: product.tagline,
            })),
            "Packaging product categories — SRM Enterprises",
          ),
        ]}
      />
    </>
  );
}

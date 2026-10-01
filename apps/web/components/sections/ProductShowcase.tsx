"use client";

import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { productShowcases, products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

/**
 * Homepage product showcase — five asymmetric, colourful category blocks.
 *
 * Feature 2 (page-level accent shift): as the visitor scrolls through the showcase, the
 * accent of the section header, underline and links transitions to whichever category is
 * currently in view. Each block is a real anchor target (`showcase-<slug>`), which is also
 * what the navbar's scroll-spy reads.
 */
export function ProductShowcase(): JSX.Element {
  const sectionIds = useMemo(() => products.map((product) => `showcase-${product.slug}`), []);
  const activeId = useActiveSection(sectionIds, 260);
  const activeSlug = activeId?.replace("showcase-", "");
  const activeProduct = products.find((product) => product.slug === activeSlug) ?? products[0];

  return (
    <section
      id="home-products"
      className="band-cream section-pad relative"
      aria-labelledby="showcase-heading"
      style={{ ["--accent" as string]: activeProduct?.color ?? "var(--accent)" }}
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Product Range"
            title={
              <>
                Packaging categories, each with its <span className="text-gradient-animated">own colour</span>
              </>
            }
            description="Five categories cover almost every industrial packing requirement — from corrugated transit boxes to protective films and accessories. Hover a card and the colour takes over; the page accent follows you down the list."
            className="max-w-3xl"
          />

          <Reveal variant="fade-up" className="shrink-0">
            <MagneticButton href="/products" variant="outline">
              All Products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:gap-10">
          {productShowcases.map((showcase, index) => {
            const isWide = index % 3 === 0;
            return (
              <div
                key={showcase.product.slug}
                id={`showcase-${showcase.product.slug}`}
                data-category={showcase.product.slug}
                className={cn(
                  "scroll-mt-28 grid items-stretch gap-6",
                  isWide ? "lg:grid-cols-[1.15fr_1fr]" : "lg:grid-cols-[1fr_1.15fr]",
                )}
              >
                {/* Asymmetry: the intro panel and the card swap sides down the page. */}
                <Reveal
                  variant={index % 2 === 0 ? "slide-right" : "slide-left"}
                  className={cn(
                    "order-2 flex flex-col justify-center gap-4 rounded-[26px] border border-navy/10 bg-white p-7 shadow-soft lg:order-1",
                    isWide && "lg:order-2",
                  )}
                >
                  <span
                    className="eyebrow"
                    style={{ ["--accent" as string]: showcase.product.color }}
                  >
                    Category {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-navy">{showcase.product.name}</h3>
                  <p className="text-sm leading-relaxed text-navy-soft sm:text-base">
                    {showcase.product.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {showcase.product.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border px-3 py-1 text-xs font-medium"
                        style={{
                          borderColor: `${showcase.product.color}44`,
                          color: "#12294A",
                          background: `${showcase.product.color}12`,
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal
                  variant={index % 2 === 0 ? "slide-left" : "slide-right"}
                  delay={0.08}
                  className={cn("order-1 lg:order-2", isWide && "lg:order-1")}
                >
                  <ProductCard showcase={showcase} className="h-full" />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

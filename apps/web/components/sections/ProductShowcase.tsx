"use client";

import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { productShowcases, products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
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
      className="band-cream pattern-dots section-pad relative"
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
            return (
              <div
                key={showcase.product.slug}
                id={`showcase-${showcase.product.slug}`}
                data-category={showcase.product.slug}
                className="scroll-mt-28 grid items-stretch gap-6 lg:grid-cols-2"
              >
                <Reveal
                  variant={index % 2 === 0 ? "split-left" : "split-right"}
                  className={cn(
                    "card-home-vivid group flex h-full flex-col justify-between gap-6 p-6 sm:p-7 min-h-[460px] lg:min-h-[480px]",
                    index % 2 === 1 && "lg:order-2",
                  )}
                  style={{ ["--accent" as string]: showcase.product.color }}
                >
                  <div className="flex flex-col gap-4">
                    <span
                      className="eyebrow badge-interactive w-fit"
                      style={{ ["--accent" as string]: showcase.product.color }}
                    >
                      {showcase.product.name}
                    </span>
                    <h3 className="heading-shimmer-hover font-display text-2xl font-bold text-navy transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                      {showcase.product.tagline}
                    </h3>
                    <p className="text-sm leading-relaxed text-navy-soft sm:text-base">
                      {showcase.product.description}
                    </p>
                  </div>
                  <StaggerGroup as="ul" className="flex flex-wrap gap-2 pt-2" stagger={0.1} delayChildren={0.12}>
                    {showcase.product.items.map((item) => (
                      <StaggerItem
                        key={item}
                        variant="kinetic-pop"
                        as="li"
                        className="badge-interactive cursor-default rounded-full border px-3 py-1 text-xs font-semibold"
                        style={{
                          borderColor: `${showcase.product.color}44`,
                          color: "#12294A",
                          background: `${showcase.product.color}14`,
                        }}
                      >
                        {item}
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                </Reveal>

                <Reveal
                  variant={index % 2 === 0 ? "split-right" : "split-left"}
                  delay={0.08}
                  className={cn("h-full", index % 2 === 1 && "lg:order-1")}
                >
                  <ProductCard showcase={showcase} className="h-full min-h-[460px] lg:min-h-[480px]" />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

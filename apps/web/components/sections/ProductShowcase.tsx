"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { productShowcases, products } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ProductArt } from "@/components/ui/art";
import { useActiveSection } from "@/hooks/use-active-section";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Homepage product showcase — streamlined, single unified card per category.
 *
 * Each product category is presented as one cohesive, high-aesthetic card
 * with alternating rhythm, reduced data redundancy, glowing accent highlights,
 * and micro-animations.
 */
export function ProductShowcase(): JSX.Element {
  const { openQuoteModal } = useQuoteModal();
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
            const isReversed = index % 2 === 1;
            const accent = showcase.product.color;
            const keyItems = showcase.product.items.slice(0, 5);

            return (
              <div
                key={showcase.product.slug}
                id={`showcase-${showcase.product.slug}`}
                data-category={showcase.product.slug}
                className="scroll-mt-28"
              >
                <Reveal
                  variant={isReversed ? "split-right" : "split-left"}
                  className="card-home-vivid group relative overflow-hidden rounded-3xl border border-navy/10 bg-white/95 p-6 sm:p-8 lg:p-10 shadow-sm backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:border-[var(--card-accent)] hover:-translate-y-1"
                  style={
                    {
                      ["--card-accent" as string]: accent,
                      ["--accent" as string]: accent,
                    } as React.CSSProperties
                  }
                >
                  {/* Ambient accent background glow on hover */}
                  <div
                    className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-20"
                    style={{ background: accent }}
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-15"
                    style={{ background: accent }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
                    {/* Content Column (7 cols) */}
                    <div
                      className={cn(
                        "flex flex-col justify-between gap-6 lg:col-span-7",
                        isReversed && "lg:order-2",
                      )}
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className="badge-interactive inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white shadow-xs"
                            style={{ background: accent }}
                          >
                            <Sparkles className="h-3 w-3" aria-hidden="true" />
                            {showcase.product.badge}
                          </span>
                          <span
                            className="eyebrow badge-interactive text-[0.7rem] font-semibold uppercase tracking-wider"
                            style={{ ["--accent" as string]: accent }}
                          >
                            {showcase.product.name}
                          </span>
                        </div>

                        <Link
                          href={`/products/${showcase.product.slug}`}
                          className="group/title focus-visible:outline-none"
                        >
                          <h3 className="heading-shimmer-hover font-display text-2xl font-bold text-navy transition-all duration-300 group-hover/title:translate-x-1 sm:text-3xl lg:text-[1.85rem] leading-tight">
                            {showcase.product.tagline}
                          </h3>
                        </Link>

                        <p className="text-sm leading-relaxed text-navy-soft sm:text-base">
                          {showcase.product.description}
                        </p>
                      </div>

                      {/* Key item pills */}
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-navy-soft/80 block mb-2.5">
                          Key Formats &amp; Specifications:
                        </span>
                        <StaggerGroup as="ul" className="flex flex-wrap gap-2" stagger={0.06} delayChildren={0.1}>
                          {keyItems.map((item) => (
                            <StaggerItem
                              key={item}
                              variant="kinetic-pop"
                              as="li"
                              className="badge-interactive cursor-default rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 hover:scale-105"
                              style={{
                                borderColor: `${accent}40`,
                                color: "#12294A",
                                background: `${accent}12`,
                              }}
                            >
                              {item}
                            </StaggerItem>
                          ))}
                        </StaggerGroup>
                      </div>
                    </div>

                    {/* Interactive Art & Action Column (5 cols) */}
                    <div
                      className={cn(
                        "flex flex-col items-center justify-between gap-6 rounded-2xl border border-navy/5 bg-slate-50/75 p-6 sm:p-7 backdrop-blur-xs transition-all duration-500 group-hover:bg-white/90 group-hover:border-[var(--card-accent)]/30 group-hover:shadow-md lg:col-span-5",
                        isReversed && "lg:order-1",
                      )}
                    >
                      {/* Illustrated Art Pedestal */}
                      <Link
                        href={`/products/${showcase.product.slug}`}
                        aria-label={`Explore ${showcase.product.name}`}
                        className="group/art relative grid h-28 w-28 place-items-center rounded-2xl shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                        style={{ background: `${accent}18` }}
                      >
                        <ProductArt
                          iconKey={showcase.product.icon}
                          accent={accent}
                          className="h-20 w-20 transition-transform duration-500 group-hover/art:scale-105"
                          title={`${showcase.product.name} illustration`}
                        />
                      </Link>

                      {/* Specification Note */}
                      {showcase.product.note ? (
                        <p
                          className="text-center font-mono text-[0.72rem] font-bold uppercase tracking-wider"
                          style={{ color: accent }}
                        >
                          {showcase.product.note}
                        </p>
                      ) : null}

                      {/* Unified Actions */}
                      <div className="flex w-full flex-col items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            analytics.ctaClick("Request Quote", `showcase-${showcase.product.slug}`);
                            openQuoteModal({ product: showcase.product.slug });
                          }}
                          className="btn w-full justify-center text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105"
                          style={{ background: accent }}
                        >
                          Request Quote
                        </button>

                        <Link
                          href={`/products/${showcase.product.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-300 group-hover:translate-x-1"
                          style={{ color: accent }}
                        >
                          <span className="underline-grow">Explore Category</span>
                          <ArrowRight
                            className="h-3.5 w-3.5 icon-arrow-spring transition-transform duration-300"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { ProductCategory } from "@/data/products";
import { ProductArt } from "@/components/ui/art";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { cn } from "@/lib/utils";

interface PackageCategorySectionProps {
  product: ProductCategory;
  index: number;
}

/**
 * Full-width section for one product category, used on /products.
 * The whole block adopts the category colour (page-level accent shift) via data-category,
 * and the illustration panel is a colourful gradient rather than a photograph.
 */
export function PackageCategorySection({ product, index }: PackageCategorySectionProps): JSX.Element {
  const flipped = index % 2 === 1;

  return (
    <section
      id={product.slug}
      data-category={product.slug}
      className="scroll-mt-28 border-t border-navy/10 py-12 first:border-t-0 sm:py-16"
      aria-labelledby={`${product.slug}-heading`}
    >
      <div className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-14")}>
        <Reveal variant={flipped ? "split-right" : "split-left"} className={cn("flex flex-col gap-5", flipped && "lg:order-2")}>
          <div>
            <span className="eyebrow">
              {product.name} • {product.badge}
            </span>
          </div>

          <h2 id={`${product.slug}-heading`} className="font-display text-2xl font-bold text-navy sm:text-3xl">
            {product.tagline}
          </h2>

          <p className="text-base leading-relaxed text-navy-soft">{product.intro}</p>

          <p className="text-sm font-semibold" style={{ color: product.color }}>
            {product.tagline}
          </p>

          <StaggerGroup as="ul" className="grid gap-2 sm:grid-cols-2">
            {product.items.map((item) => (
              <StaggerItem as="li" key={item} variant="kinetic-pop" className="group flex items-start gap-2 rounded-xl p-1.5 transition-all duration-300 hover:bg-slate-50 hover:translate-x-1.5 cursor-default">
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 shadow-xs"
                  style={{ background: product.color }}
                >
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span className="text-sm text-navy-soft transition-colors duration-300 group-hover:text-navy group-hover:font-medium">{item}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {product.note ? (
            <p className="rounded-2xl border border-navy/10 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-wide text-navy-soft shadow-xs transition-all duration-300 hover:border-accent hover:shadow-md hover:-translate-y-0.5">
              {product.note}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/products/${product.slug}`}
              className="btn text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-102"
              style={{ background: product.color }}
            >
              View details
              <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
            </Link>
            <Link
              href={`/contact?product=${product.slug}`}
              data-open-quote-modal="true"
              data-product={product.slug}
              className="btn-outline transition-all duration-300 hover:-translate-y-1 hover:shadow-xs hover:scale-102"
              aria-label={`Request a quote for ${product.name}`}
            >
              Request Quote
            </Link>
          </div>
        </Reveal>

        <Reveal variant="iris-clip" delay={0.06} className={cn("group/media overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.015] rounded-3xl", flipped && "lg:order-1")}>
          <MediaPanel imageKey={product.imageKey} accent={product.color} aspect="video">
            <ProductArt
              iconKey={product.icon}
              accent={product.color}
              className="media-zoom h-full w-full transition-transform duration-700 group-hover/media:scale-110"
              title={`${product.name} illustration`}
            />
          </MediaPanel>
        </Reveal>
      </div>
    </section>
  );
}

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
              <StaggerItem as="li" key={item} variant="kinetic-pop" className="flex items-start gap-2">
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                  style={{ background: product.color }}
                >
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                <span className="text-sm text-navy-soft">{item}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {product.note ? (
            <p className="rounded-2xl border border-navy/10 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-wide text-navy-soft">
              {product.note}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/products/${product.slug}`}
              className="btn text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: product.color }}
            >
              View details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={`/contact?product=${product.slug}`}
              className="btn-outline"
              aria-label={`Request a quote for ${product.name}`}
            >
              Request Quote
            </Link>
          </div>
        </Reveal>

        <Reveal variant="iris-clip" delay={0.06} className={cn(flipped && "lg:order-1")}>
          <MediaPanel imageKey={product.imageKey} accent={product.color} aspect="video">
            <ProductArt
              iconKey={product.icon}
              accent={product.color}
              className="h-full w-full"
              title={`${product.name} illustration`}
            />
          </MediaPanel>
        </Reveal>
      </div>
    </section>
  );
}

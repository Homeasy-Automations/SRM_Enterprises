"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { ProductShowcase } from "@/data/products";
import { TiltCard } from "@/components/animations/TiltCard";
import { ProductArt } from "@/components/ui/art";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  showcase: ProductShowcase;
  className?: string;
  /** Compact variant used inside dense grids. */
  compact?: boolean;
}

/**
 * Product category card. Feature 1: the card owns its category colour — background wash,
 * border, icon, button and shadow all transition to that colour on hover/focus.
 */
export function ProductCard({ showcase, className, compact = false }: ProductCardProps): JSX.Element {
  const router = useRouter();
  const { product, items } = showcase;

  return (
    <TiltCard
      accentColor={product.color}
      ariaLabel={`${product.name} — open category page`}
      className={cn("cursor-pointer", className)}
      onActivate={() => {
        analytics.productView(product.name, product.slug);
        router.push(`/products/${product.slug}`);
      }}
    >
      <div className="flex h-full flex-col justify-between gap-6 p-6 sm:p-7">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span
                className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white"
                style={{ background: product.color }}
              >
                {product.badge}
              </span>
              <Link
                href={`/products/${product.slug}`}
                onClick={(event) => event.stopPropagation()}
                className="focus-visible:outline-none"
              >
                <h3 className="font-display text-xl font-bold text-navy transition-colors hover:text-accent sm:text-2xl">
                  {product.name}
                </h3>
              </Link>
            </div>

            <span
              className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
              style={{ background: `${product.color}1F` }}
            >
              <ProductArt iconKey={product.icon} accent={product.color} className="h-14 w-14" title={`${product.name} illustration`} />
            </span>
          </div>

          <p className="text-sm leading-relaxed text-navy-soft">{product.tagline}</p>

          {!compact ? (
            <ul className="flex flex-col gap-1.5 pt-1">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-navy-soft">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: product.color }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          {product.note ? (
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: product.color }}
            >
              {product.note}
            </p>
          ) : null}

          <Link
            href={`/products/${product.slug}`}
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-300"
            style={{ color: product.color }}
          >
            View details
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </Link>

          <Link
            href={`/contact?product=${product.slug}`}
            onClick={(event) => event.stopPropagation()}
            className="btn mt-1 w-full text-white transition-transform duration-300 hover:-translate-y-0.5"
            style={{ background: product.color }}
          >
            Request Quote
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}

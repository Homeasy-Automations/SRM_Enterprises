import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductCategory } from "@/data/products";
import { ProductArt } from "@/components/ui/art";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface RelatedCategoriesProps {
  /** The category currently being viewed (excluded from the list). */
  current: ProductCategory;
  all: ProductCategory[];
  title?: string;
  eyebrow?: string;
}

/** Cross-links between product categories — keeps every page one click from the others. */
export function RelatedCategories({
  current,
  all,
  title = "Related Packaging Categories",
  eyebrow = "Keep Browsing",
}: RelatedCategoriesProps): JSX.Element {
  const related = all.filter((product) => product.slug !== current.slug);

  return (
    <section className="band-cream section-pad-sm" aria-labelledby="related-categories-heading">
      <div className="container-page">
        <SectionHeading eyebrow={eyebrow} title={title} className="max-w-2xl" underline={false} />

        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((product) => (
            <StaggerItem key={product.slug} className="h-full">
              <Link
                href={`/products/${product.slug}`}
                className="group flex h-full flex-col gap-3 rounded-[24px] border border-navy/10 bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
                style={{ ["--rel-color" as string]: product.color }}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `${product.color}1F` }}
                >
                  <ProductArt
                    iconKey={product.icon}
                    accent={product.color}
                    className="h-10 w-10"
                    title={`${product.name} illustration`}
                  />
                </span>
                <h3 className="font-ui text-base font-bold text-navy">{product.name}</h3>
                <p className="text-xs leading-relaxed text-navy-soft">{product.tagline}</p>
                <span
                  className="font-ui mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em]"
                  style={{ color: product.color }}
                >
                  Open
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, Home, Package } from "lucide-react";
import { products } from "@/data/products";
import { industries } from "@/data/industries";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/animations/Reveal";
import { BoxArt } from "@/components/ui/art";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist. Browse SRM Enterprises packaging categories, industries and contact options instead.",
  path: "/404",
  noIndex: true,
});

/** 404 — helpful, light-themed and full of routes back into the site. */
export default function NotFound(): JSX.Element {
  return (
    <section className="band-mesh section-pad" aria-labelledby="not-found-heading">
      <div className="container-page">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Reveal variant="scale-in">
            <BoxArt accent="#1E6FFF" className="h-32 w-32" title="Open corrugated box illustration" />
          </Reveal>

          <Reveal variant="fade-up" delay={0.05}>
            <span className="eyebrow">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              Error 404
            </span>
          </Reveal>

          <Reveal variant="fade-up" delay={0.1}>
            <h1 id="not-found-heading" className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              This page has been shipped elsewhere
            </h1>
          </Reveal>

          <Reveal variant="fade-up" delay={0.15}>
            <p className="max-w-xl text-base leading-relaxed text-navy-soft">
              The link you followed does not exist on this site. Everything SRM Enterprises offers is
              one click away below.
            </p>
          </Reveal>

          <Reveal variant="fade-up" delay={0.2}>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link href="/" className="btn-primary w-full sm:w-auto">
                <Home className="h-4 w-4" aria-hidden="true" />
                Home
              </Link>
              <Link href="/products" className="btn-outline w-full sm:w-auto">
                <Package className="h-4 w-4" aria-hidden="true" />
                All products
              </Link>
              <Link href="/contact" className="btn-ghost w-full border border-navy/10 sm:w-auto">
                Contact us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-4 grid w-full gap-6 text-left sm:grid-cols-2">
            <Reveal variant="slide-right" className="rounded-[24px] border border-navy/10 bg-white p-5 shadow-soft">
              <h2 className="font-display text-base font-bold text-navy">Product categories</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {products.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex min-h-[36px] items-center gap-2 text-sm text-navy-soft transition-colors hover:text-navy"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: product.color }} aria-hidden="true" />
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="slide-left" className="rounded-[24px] border border-navy/10 bg-white p-5 shadow-soft">
              <h2 className="font-display text-base font-bold text-navy">Industries</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="inline-flex min-h-[36px] items-center gap-2 text-sm text-navy-soft transition-colors hover:text-navy"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: industry.color }} aria-hidden="true" />
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

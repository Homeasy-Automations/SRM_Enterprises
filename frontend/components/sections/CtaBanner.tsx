"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { BRAND } from "@srm/config";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Reveal } from "@/components/animations/Reveal";
import { WavyDivider } from "@/components/animations/WavyDivider";
import { Marquee } from "@/components/animations/Marquee";
import { marqueeItems } from "@/data/navigation";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { analytics } from "@/lib/analytics";

interface CtaBannerProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Small line under the buttons. */
  footnote?: string;
  /** Marquee ribbon above the CTA (defaults on for the homepage use). */
  showRibbon?: boolean;
}

/**
 * Vivid gradient CTA band (blue → violet by default, following the Color Mood palette).
 * Bright and colourful — never a dark section. Used at the bottom of most pages.
 */
export function CtaBanner({
  title = "Need Packaging Material? Let's Get in Touch.",
  description = "Share your size, material, quantity and application.",
  primaryLabel = "Get a Quote",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  footnote,
  showRibbon = true,
}: CtaBannerProps): JSX.Element {
  const { openQuoteModal } = useQuoteModal();
  const productMatch = (primaryHref || "").match(/product=([^&]+)/);
  const rawSlug = productMatch?.[1];
  const productSlug = rawSlug ? decodeURIComponent(rawSlug) : undefined;
  const isQuote = /quote/i.test(primaryLabel) || primaryHref === "#quote" || primaryHref === "#quote-modal";

  const handlePrimaryClick = () => {
    analytics.ctaClick(primaryLabel, "cta-banner");
    openQuoteModal({ product: productSlug });
  };
  return (
    <section className="relative isolate overflow-hidden text-white" aria-labelledby="cta-heading">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(120deg, var(--accent) 0%, var(--accent-secondary) 55%, var(--accent-highlight) 130%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-30">
        <span className="absolute -left-10 top-6 h-52 w-52 rounded-full bg-white/40 blur-3xl" />
        <span className="absolute right-4 bottom-12 h-64 w-64 rounded-full bg-white/25 blur-3xl" />
      </div>

      <WavyDivider color="#FFFFFF" flip className="-mb-1" />

      {showRibbon ? (
        <div className="border-y border-white/25 bg-white/10 py-2.5">
          <Marquee items={marqueeItems} speed={44} separator="•" itemClassName="text-white/95" />
        </div>
      ) : null}

      <div className="container-page relative pt-14 pb-20 sm:pt-16 sm:pb-24 lg:pt-18 lg:pb-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal variant="kinetic-pop">
            <span className="badge-interactive cursor-default inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 font-space text-xs font-bold uppercase tracking-[0.16em] text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/25 hover:scale-105">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {BRAND.tagline}
            </span>
          </Reveal>

          <Reveal variant="depth-zoom" delay={0.06}>
            <h2
              id="cta-heading"
              className="mt-5 font-outfit text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
          </Reveal>

          <Reveal variant="fade-up" delay={0.12}>
            <p className="mt-4 text-base leading-relaxed text-white/95 sm:text-lg">{description}</p>
          </Reveal>

          <Reveal variant="flip-up" delay={0.18}>
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
              {isQuote ? (
                <MagneticButton
                  type="button"
                  onClick={handlePrimaryClick}
                  variant="white"
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl font-outfit font-bold"
                >
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
                </MagneticButton>
              ) : (
                <MagneticButton
                  href={primaryHref}
                  onClick={() => analytics.ctaClick(primaryLabel, "cta-banner")}
                  variant="white"
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl font-outfit font-bold"
                >
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
                </MagneticButton>
              )}

              {secondaryLabel && secondaryHref ? (
                <MagneticButton
                  href={secondaryHref}
                  onClick={() => analytics.ctaClick(secondaryLabel, "cta-banner")}
                  variant="glass"
                  className="w-full sm:w-auto shadow-md font-outfit font-semibold"
                >
                  {secondaryLabel}
                  <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
                </MagneticButton>
              ) : null}
            </div>
          </Reveal>
          <Reveal variant="fade-in" delay={0.28}>
            <p className="mt-3.5 font-marck text-lg sm:text-xl text-white/95 tracking-wide">
              ✦ {footnote ?? `Bulk supply ${BRAND.bulkSupplyLine}`} ✦
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

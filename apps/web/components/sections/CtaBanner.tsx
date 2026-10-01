import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { BRAND } from "@srm/config";
import { CONTACT, getMailtoLink } from "@/data/company";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Reveal } from "@/components/animations/Reveal";
import { WavyDivider } from "@/components/animations/WavyDivider";
import { Marquee } from "@/components/animations/Marquee";
import { marqueeItems } from "@/data/navigation";

interface CtaBannerProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
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
  footnote,
  showRibbon = true,
}: CtaBannerProps): JSX.Element {
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
        <span className="absolute right-4 bottom-0 h-64 w-64 rounded-full bg-white/25 blur-3xl" />
      </div>

      <WavyDivider color="#FFFFFF" flip className="-mb-1" />

      {showRibbon ? (
        <div className="border-y border-white/25 bg-white/10 py-2.5">
          <Marquee items={marqueeItems} speed={44} separator="•" itemClassName="text-white/95" />
        </div>
      ) : null}

      <div className="container-page relative py-14 sm:py-16 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal variant="scale-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Trading • Manufacturing • Custom Packaging
            </span>
          </Reveal>

          <Reveal variant="fade-up" delay={0.06}>
            <h2
              id="cta-heading"
              className="mt-5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
          </Reveal>

          <Reveal variant="fade-up" delay={0.12}>
            <p className="mt-4 text-base leading-relaxed text-white/95 sm:text-lg">{description}</p>
          </Reveal>

          <Reveal variant="fade-up" delay={0.18}>
            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
              <MagneticButton href={primaryHref} variant="white" className="w-full sm:w-auto">
                {primaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>

              <a
                href={getMailtoLink("Packaging requirement — SRM Enterprises")}
                className="btn-glass w-full sm:w-auto"
              >
                {CONTACT.email}
              </a>
            </div>
          </Reveal>

          <Reveal variant="fade-in" delay={0.24}>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/95">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {BRAND.locations.join(" • ")}
            </p>
          </Reveal>

          <Reveal variant="fade-in" delay={0.28}>
            <p className="mt-2 text-xs text-white/85 sm:text-sm">
              {footnote ?? `Bulk supply ${BRAND.bulkSupplyLine}.`}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

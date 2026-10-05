"use client";

import Link from "next/link";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { analytics } from "@/lib/analytics";

/**
 * Sections 15 & 16: Final Lead Generation Section & B2B Quote Form.
 * Headline: "Tell Us What You're Packing. We'll Help You Find the Right Packaging."
 * Direct contact and sample request actions for instant conversion.
 */
export function HomeLeadSection(): JSX.Element {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section id="quote-section" className="band-cream pt-14 sm:pt-20 lg:pt-24 pb-32 sm:pb-40 lg:pb-44 relative overflow-hidden" aria-labelledby="lead-heading">
      {/* Background ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-accent-soft/40 blur-3xl"
      />

      <div className="container-page relative z-10">
        {/* Section 15: Lead Intro Banner */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal variant="kinetic-pop">
            <span className="eyebrow badge-interactive inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent shadow-xs mb-4">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              COMPLETE INDUSTRIAL PACKAGING SOLUTIONS
            </span>
          </Reveal>

          <Reveal variant="fade-up" delay={0.05}>
            <h2
              id="lead-heading"
              className="font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-5xl"
            >
              Tell Us What You're Packing. <span className="text-gradient-animated">We'll Help You Find the Right Packaging.</span>
            </h2>
          </Reveal>

          <Reveal variant="fade-up" delay={0.1}>
            <p className="mt-4 text-base leading-relaxed text-navy-soft sm:text-lg">
              Share your product, packaging requirements, dimensions, quantity and application with our team.
              Whether you need standard packaging materials or customized solutions, SRM Enterprises can help
              you identify the appropriate packaging option for your requirement.
            </p>
          </Reveal>

          <Reveal variant="fade-up" delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  analytics.ctaClick("Get a Custom Quote", "home-lead");
                  openQuoteModal();
                }}
                className="btn-primary min-h-[48px] px-8 text-sm font-bold shadow-md hover:scale-105"
              >
                <span>Get a Custom Quote</span>
                <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
              </button>

              <Link
                href="/contact?type=sample"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-navy/15 bg-white px-7 py-3 text-sm font-bold text-navy shadow-xs transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-md hover:scale-105"
              >
                <FileText className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>Request a Sample</span>
              </Link>
            </div>
          </Reveal>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-navy-soft/80 sm:text-sm">
            Corrugated • EPE • Bubble • Poly Bags • Films • Accessories
          </p>
        </div>

        {/* Section 16: B2B Quote Form Card */}
        {/* <div id="quote-form-section" className="mx-auto mt-16 max-w-4xl scroll-mt-28">
          <Reveal variant="depth-zoom" delay={0.1}>
            <div className="card-home-vivid overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 sm:p-10 shadow-xl">
              <div className="border-b border-navy/10 pb-6 mb-8 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  B2B Requirement Specification
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-navy sm:text-3xl">
                  Request a Packaging Quote
                </h3>
                <p className="mt-1.5 text-sm text-navy-soft">
                  Share your packaging requirement and our team will get back to you with material options and pricing.
                </p>
              </div>

              <QuoteForm />
            </div>
          </Reveal>
        </div> */}
      </div>
    </section>
  );
}

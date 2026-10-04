"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { getWhatsAppLink } from "@/data/company";
import { Reveal } from "@/components/animations/Reveal";

export function ContactHero(): JSX.Element {
  const { openQuoteModal } = useQuoteModal();
  const whatsappUrl = getWhatsAppLink(
    "Hello SRM Enterprises, I have a packaging requirement and would like to discuss specifications and pricing."
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F9FF] via-white to-white pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
      {/* Subtle decorative background elements */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="container-page relative z-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-navy-soft">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span className="text-navy/30">/</span>
          <span className="text-navy">Contact &amp; Inquiries</span>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7">
            <Reveal variant="fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent tracking-wide uppercase">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span>B2B Packaging Inquiry Hub</span>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={0.06}>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
                Let&apos;s Talk Packaging.
              </h1>
            </Reveal>

            <Reveal variant="fade-up" delay={0.12}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-soft sm:text-lg">
                Have a packaging requirement, need a custom specification, or looking for regular bulk supply? Tell us
                what you&apos;re packing and we&apos;ll help you identify the right solution.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={0.18}>
              <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm font-semibold text-navy/80">
                <span className="text-accent font-bold">Materials:</span>
                <span>Corrugated</span>
                <span className="text-navy/30">•</span>
                <span>EPE Foam</span>
                <span className="text-navy/30">•</span>
                <span>Bubble</span>
                <span className="text-navy/30">•</span>
                <span>Films</span>
                <span className="text-navy/30">•</span>
                <span>Accessories</span>
                <span className="text-navy/30">•</span>
                <span className="text-accent">Custom Packaging</span>
              </div>
            </Reveal>

            {/* CTAs */}
            <Reveal variant="fade-up" delay={0.24}>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="btn-primary flex items-center justify-center gap-2 py-4 px-8 text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  <span>Start an Inquiry</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-7 py-4 text-base font-bold text-emerald-800 shadow-sm transition-all hover:bg-emerald-100/80 hover:border-emerald-500/50 hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-5 w-5 text-emerald-600 fill-emerald-600" />
                    <span>WhatsApp Us</span>
                  </a>
                )}
              </div>
            </Reveal>

            {/* Trust highlights */}
            <Reveal variant="fade-up" delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-navy/10 text-xs font-medium text-navy-soft">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sales response within 2-4 hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <span>Direct OEM &amp; Plant Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-accent" />
                  <span>Pan-India Logistics Dispatch</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Hero Visual with Floating UI Cards */}
          <div className="lg:col-span-5 relative">
            <Reveal variant="depth-zoom" delay={0.15}>
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main Hero Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-2 border-white/80 bg-slate-100 shadow-2xl ring-1 ring-navy/10">
                  <Image
                    src="/images/contact-hero.jpg"
                    alt="SRM Enterprises industrial packaging logistics warehouse with corrugated cartons, foam rolls, bubble packaging, and stretch film"
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 92vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-80" />

                  {/* Caption overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                    <p className="font-bold text-sm">Industrial Supply &amp; Storage</p>
                    <p className="text-white/80">Complete packaging materials ready for scheduled dispatch</p>
                  </div>
                </div>

                {/* Floating UI Card 1: Top-Left */}
                <div className="absolute -top-5 -left-4 sm:-left-6 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-accent/15 text-accent">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">Custom Specifications</p>
                      <p className="text-[10px] text-navy-soft">Tailored ply, size &amp; grades</p>
                    </div>
                  </div>
                </div>

                {/* Floating UI Card 2: Mid-Right */}
                <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">Bulk Requirements</p>
                      <p className="text-[10px] text-navy-soft">High volume plant supply</p>
                    </div>
                  </div>
                </div>

                {/* Floating UI Card 3: Bottom-Left */}
                <div className="absolute -bottom-5 -left-2 sm:left-4 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl backdrop-blur-md transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#8B5CF6]/15 text-[#8B5CF6]">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">Pan-India Supply</p>
                      <p className="text-[10px] text-navy-soft">Doorstep industrial dispatch</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

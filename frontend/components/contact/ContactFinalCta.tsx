"use client";

import { ArrowRight, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { getWhatsAppLink } from "@/data/company";
import { Reveal } from "@/components/animations/Reveal";

export function ContactFinalCta(): JSX.Element {
  const { openQuoteModal } = useQuoteModal();
  const whatsappUrl = getWhatsAppLink(
    "Hello SRM Enterprises, I have a packaging requirement and would like to get a quote."
  );

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-navy via-[#12294A] to-[#0A182E] text-white relative overflow-hidden" id="final-cta">
      {/* Decorative ambient gradients */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="container-page relative z-10 text-center">
        <Reveal variant="fade-up">
          <div className="font-ui inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-[0.12em]">
            <Sparkles className="h-3.5 w-3.5 text-accent-highlight" />
            <span>Industrial Packaging Partner</span>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.08}>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl sm:leading-[1.1] lg:leading-[1.1] font-bold tracking-tight text-white max-w-2xl mx-auto leading-[1.1]">
            Have a Packaging Requirement?
          </h2>
        </Reveal>

        <Reveal variant="fade-up" delay={0.16}>
          <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
            Tell us what you&apos;re packing. We&apos;ll help you find the right packaging solution, grade, and volume-optimized commercial quote.
          </p>
        </Reveal>

        <Reveal variant="fade-up" delay={0.24}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-contrast shadow-lg transition-all duration-300 hover:bg-accent/90 hover:shadow-accent/30 hover:scale-105"
            >
              <span>Get a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-8 py-4 text-base font-bold text-emerald-300 transition-all duration-300 hover:bg-emerald-500/30 hover:text-white hover:scale-105"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                <span>WhatsApp Us</span>
              </a>
            )}
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.32}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Confidential Technical Review
            </span>
            <span className="text-white/30">•</span>
            <span>Direct Manufacturer Rates</span>
            <span className="text-white/30">•</span>
            <span>Reliable Scheduled Pan-India Dispatches</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

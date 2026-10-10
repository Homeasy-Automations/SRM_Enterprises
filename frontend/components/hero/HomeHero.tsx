"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle, Package } from "lucide-react";
import { getWhatsAppLink } from "@/data/company";
import { Marquee } from "@/components/animations/Marquee";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { HeroImageSlider } from "./HeroImageSlider";
import { clienteleItems } from "@/data/navigation";
import { analytics } from "@/lib/analytics";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { heroFontVariables } from "./hero-fonts";

/** Homepage hero: bottom-left anchored reduced content with script typography & photographic slider. */
export function HomeHero(): JSX.Element {
  const reducedMotion = useReducedMotion();
  const whatsappLink = getWhatsAppLink();
  const { openQuoteModal } = useQuoteModal();

  return (
    <section
      className={`hero-font-lock ${heroFontVariables} relative isolate flex flex-col justify-between overflow-hidden bg-white min-h-[calc(100dvh-76px)]`}
      aria-labelledby="hero-heading"
    >
      {/* Background Image Slider with packaging facility photography */}
      <HeroImageSlider />

      {/* Hero Content — Anchored further to bottom-left with wider margin and lower baseline */}
      <div className="relative z-10 flex flex-1 flex-col justify-end items-start text-left w-full px-5 sm:px-8 md:px-12 lg:px-16 pt-16 pb-4 sm:pb-6 lg:pb-8">
        <div className="relative max-w-2xl lg:max-w-5xl xl:max-w-6xl flex flex-col items-start text-left">
          {/* Seamless ambient diffusion directly behind text — completely blended with zero visible edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 sm:-inset-16 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 95% 85% at 25% 60%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.35) 45%, rgba(255, 255, 255, 0) 80%)",
              filter: "blur(24px)",
            }}
          />

          {/* Bold Headline with Script Accent in Two Lines */}
          <motion.h1
            id="hero-heading"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0.001 : 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold leading-[1.08] text-navy"
          >
            <span className="block">Precision Packaging.</span>
            <span className="font-alex text-accent-deep text-[1.12em] font-normal block leading-tight mt-1 sm:mt-2">
              Maximum Protection.
            </span>
          </motion.h1>

          {/* Prominent Accent Underline Bar */}
          <motion.span
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0.001 : 0.7, delay: 0.2 }}
            className="mt-3.5 sm:mt-4 h-1 sm:h-1.5 w-24 sm:w-32 rounded-full bg-accent block origin-left"
          />

          {/* Streamlined Action Buttons */}
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0.001 : 0.7, delay: 0.35 }}
            className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              type="button"
              variant="primary"
              ariaLabel="Get a custom packaging quote"
              className="shadow-md text-xs sm:text-sm py-2.5 px-5"
              onClick={() => {
                analytics.ctaClick("Get a Custom Quote", "hero");
                openQuoteModal();
              }}
            >
              Get a Custom Quote
              <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
            </MagneticButton>

            <MagneticButton
              href="/products"
              variant="outline"
              className="bg-white/90 backdrop-blur-xs text-xs sm:text-sm py-2.5 px-5 border-navy/20 hover:border-accent"
              onClick={() => analytics.ctaClick("Explore Products", "hero")}
            >
              <Package className="h-4 w-4" aria-hidden="true" />
              Explore Products
            </MagneticButton>

            {whatsappLink ? (
              <MagneticButton
                href={whatsappLink}
                external
                variant="ghost"
                className="border border-navy/20 bg-white/80 backdrop-blur-xs text-xs sm:text-sm py-2.5 px-4 hover:border-emerald-500"
                onClick={() => analytics.whatsappClick("hero")}
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                WhatsApp
              </MagneticButton>
            ) : null}
          </motion.div>
        </div>
      </div>

      {/* Clientele Marquee Strip */}
      <div className="relative z-10 shrink-0 border-y border-navy/10 bg-gradient-to-r from-accent-soft via-white to-[#FFF9F0] py-2.5 sm:py-3">
        <div className="flex items-center">
          <div className="flex items-center shrink-0 pl-4 sm:pl-8 pr-3 sm:pr-6 border-r border-navy/10">
            <span className="eyebrow text-[10px] sm:text-xs font-bold uppercase tracking-wider py-1 px-3">
              Clientele:
            </span>
          </div>
          <div className="flex-1 overflow-hidden min-w-0">
            <Marquee
              items={clienteleItems}
              speed={28}
              separator="•"
              itemClassName="text-xs sm:text-sm font-bold text-navy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

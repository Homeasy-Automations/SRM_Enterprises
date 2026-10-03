"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle, Package, Sparkles } from "lucide-react";
import { BRAND } from "@srm/config";
import { getWhatsAppLink } from "@/data/company";
import { Blobs } from "@/components/ui/Blobs";
import { Marquee } from "@/components/animations/Marquee";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { FloatingIllustrations } from "./FloatingIllustrations";
import { RotatingTagline } from "./RotatingTagline";
import { marqueeItems } from "@/data/navigation";
import { analytics } from "@/lib/analytics";
import { splitWords } from "@/lib/utils";

const HEADLINE = BRAND.heroHeadline;

/** Homepage hero: staggered headline, rotating tagline, floating packaging art, live CTA. */
export function HomeHero(): JSX.Element {
  const reducedMotion = useReducedMotion();
  const whatsappLink = getWhatsAppLink();
  const words = splitWords(HEADLINE);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.09, delayChildren: 0.1 },
    },
  };

  const word: Variants = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: "0.55em", rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: reducedMotion ? 0.001 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-white pt-10 sm:pt-14 lg:pt-16" aria-labelledby="hero-heading">
      <Blobs count={5} />
      <FloatingIllustrations />

      <div className="container-page relative z-10 pb-14 sm:pb-20 lg:pb-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.span
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reducedMotion ? 0.001 : 0.5 }}
            className="eyebrow badge-interactive cursor-default shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {BRAND.tagline}
          </motion.span>

          <motion.h1
            id="hero-heading"
            variants={container}
            initial="hidden"
            animate="visible"
            className="mt-6 font-display text-[2rem] font-extrabold leading-[1.1] text-navy sm:text-5xl lg:text-6xl xl:text-[4.2rem]"
          >
            {words.map((item, index) => (
              <motion.span
                key={`${item}-${index}`}
                variants={word}
                className="inline-block will-transform"
                style={{ transformOrigin: "50% 100%" }}
              >
                <span className={index >= words.length - 3 ? "text-gradient-animated" : undefined}>
                  {item}
                </span>
                {index < words.length - 1 ? <span>&nbsp;</span> : null}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.001 : 0.6, delay: 0.45 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-navy-soft sm:text-lg"
          >
            Corrugated boxes, EPE Foam Packaging, LDPE Bubble &amp; Protective Packaging, poly bags &amp; films and
            packaging accessories — supplied as standard material or built to your specification.
            Bulk supply {BRAND.bulkSupplyLine}.
          </motion.p>

          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.001 : 0.6, delay: 0.55 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <span className="text-sm text-navy-soft sm:text-base">We do</span>
            <RotatingTagline className="text-lg sm:text-xl" />
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.001 : 0.6, delay: 0.65 }}
            className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <MagneticButton
              href="/contact"
              variant="primary"
              ariaLabel="Go to the quote request form"
              className="w-full sm:w-auto shadow-md"
              onClick={() => analytics.ctaClick("Get a Quote", "hero")}
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 icon-arrow-spring" aria-hidden="true" />
            </MagneticButton>

            <MagneticButton
              href="/products"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => analytics.ctaClick("Explore Products", "hero")}
            >
              <Package className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" aria-hidden="true" />
              Explore Products
            </MagneticButton>

            {whatsappLink ? (
              <MagneticButton
                href={whatsappLink}
                external
                variant="ghost"
                className="w-full border border-navy/10 sm:w-auto"
                onClick={() => analytics.whatsappClick("hero")}
              >
                <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                WhatsApp Us
              </MagneticButton>
            ) : null}
          </motion.div>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-navy-soft sm:text-sm">
            Pan India Supply &amp; Dispatch
          </p>
        </div>
      </div>

      {/* Product-name ribbon */}
      <div className="relative z-10 border-y border-navy/10 bg-gradient-to-r from-accent-soft via-white to-[#FFF9F0] py-3">
        <Marquee items={marqueeItems} speed={38} />
      </div>
    </section>
  );
}

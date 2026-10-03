"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, MessageCircle, Package, Sparkles } from "lucide-react";
import { getWhatsAppLink } from "@/data/company";
import { Blobs } from "@/components/ui/Blobs";
import { Marquee } from "@/components/animations/Marquee";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { FloatingIllustrations } from "./FloatingIllustrations";
import { marqueeItems } from "@/data/navigation";
import { analytics } from "@/lib/analytics";
import { splitWords } from "@/lib/utils";

const HEADLINE = "Industrial Packaging. Built to Your Specification.";

/** Homepage hero: staggered headline, floating packaging art, primary B2B sales CTA. */
export function HomeHero(): JSX.Element {
  const reducedMotion = useReducedMotion();
  const whatsappLink = getWhatsAppLink();
  const words = splitWords(HEADLINE);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.1, delayChildren: 0.15 },
    },
  };

  const word: Variants = {
    hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: "0.45em", rotateX: -35 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: reducedMotion ? 0.001 : 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      className="relative isolate flex flex-col justify-between overflow-hidden bg-white min-h-[calc(100dvh-76px)]"
      aria-labelledby="hero-heading"
    >
      <Blobs count={5} />
      <FloatingIllustrations />

      <div className="container-page relative z-10 my-auto flex flex-1 flex-col items-center justify-center py-6 sm:py-8 lg:py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.span
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1, margin: "0px 0px -40px 0px" }}
            transition={{ duration: reducedMotion ? 0.001 : 0.7 }}
            className="eyebrow badge-interactive cursor-default shadow-xs transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            COMPLETE PACKAGING MATERIAL SOLUTIONS
          </motion.span>

          <motion.h1
            id="hero-heading"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1, margin: "0px 0px -40px 0px" }}
            className="mt-3 sm:mt-4 font-display text-[2rem] font-extrabold leading-[1.12] text-navy sm:text-5xl lg:text-6xl xl:text-[4.1rem]"
          >
            {words.map((item, index) => (
              <motion.span
                key={`${item}-${index}`}
                variants={word}
                className="inline-block will-transform"
                style={{ transformOrigin: "50% 100%" }}
              >
                <span className={index >= 2 ? "text-gradient-animated" : undefined}>
                  {item}
                </span>
                {index < words.length - 1 ? <span>&nbsp;</span> : null}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1, margin: "0px 0px -40px 0px" }}
            transition={{ duration: reducedMotion ? 0.001 : 0.85, delay: 0.35 }}
            className="mt-3 sm:mt-4 max-w-2xl text-sm leading-relaxed text-navy-soft sm:text-base lg:text-lg"
          >
            Corrugated boxes, EPE foam, bubble packaging, films and accessories engineered to your exact size, material, and bulk supply specifications.
          </motion.p>

          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1, margin: "0px 0px -40px 0px" }}
            transition={{ duration: reducedMotion ? 0.001 : 0.85, delay: 0.5 }}
            className="mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <MagneticButton
              href="/contact"
              variant="primary"
              ariaLabel="Get a custom packaging quote"
              className="w-full sm:w-auto shadow-md"
              onClick={() => analytics.ctaClick("Get a Custom Quote", "hero")}
            >
              Get a Custom Quote
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

          <p className="mt-4 sm:mt-5 inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-navy-soft/90 sm:text-sm">
            <span>Custom Specifications</span>
            <span className="text-accent">•</span>
            <span>Bulk Supply</span>
            <span className="text-accent">•</span>
            <span>Quality Focus</span>
            <span className="text-accent">•</span>
            <span>Reliable Dispatch</span>
          </p>
        </div>
      </div>

      {/* Product-name ribbon */}
      <div className="relative z-10 shrink-0 border-y border-navy/10 bg-gradient-to-r from-accent-soft via-white to-[#FFF9F0] py-2.5 sm:py-3">
        <Marquee items={marqueeItems} speed={38} />
      </div>
    </section>
  );
}

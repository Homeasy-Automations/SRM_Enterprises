"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { CONTACT, getTelLink, getWhatsAppLink } from "@/data/company";
import { analytics } from "@/lib/analytics";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { ColorMoodSwitcher } from "./ColorMoodSwitcher";
import { cn } from "@/lib/utils";

/**
 * Floating action stack: WhatsApp, Call, Scroll-to-top (with a progress ring) and the
 * Color Mood switcher. WhatsApp and Call buttons hide themselves gracefully when no
 * usable number is configured — no broken wa.me or tel: links are ever rendered.
 */
export function FloatingActions(): JSX.Element {
  const { progress, scrollY } = useScrollProgress(160);
  const reducedMotion = useReducedMotion();

  const whatsappLink = getWhatsAppLink();
  const telLink = getTelLink();
  const showScrollTop = scrollY > 420;

  const ringRadius = 19;
  const circumference = 2 * Math.PI * ringRadius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6 no-print">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        <ColorMoodSwitcher />

        {whatsappLink ? (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with SRM Enterprises on WhatsApp"
            onClick={() => analytics.whatsappClick("floating-button")}
            className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 group-hover:animate-pulse-ring motion-reduce:hidden"
            />
            <MessageCircle className="relative h-6 w-6" aria-hidden="true" />
          </a>
        ) : null}

        {telLink ? (
          <a
            href={telLink}
            aria-label={`Call SRM Enterprises on ${CONTACT.phoneDisplay}`}
            onClick={() => analytics.phoneClick("floating-button")}
            className="grid h-12 w-12 place-items-center rounded-full border border-navy/10 bg-white text-accent shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
        ) : null}

        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
          aria-label="Scroll back to top"
          initial={false}
          animate={{
            opacity: showScrollTop ? 1 : 0,
            scale: showScrollTop ? 1 : 0.7,
            pointerEvents: showScrollTop ? "auto" : "none",
          }}
          transition={{ duration: reducedMotion ? 0.001 : 0.25 }}
          className={cn(
            "relative grid h-12 w-12 place-items-center rounded-full border border-navy/10 bg-white text-navy shadow-card",
            showScrollTop && "hover:-translate-y-1 hover:shadow-lift",
          )}
        >
          <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="22" cy="22" r={ringRadius} fill="none" stroke="rgba(18,41,74,0.12)" strokeWidth="3" />
            <circle
              cx="22"
              cy="22"
              r={ringRadius}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <ArrowUp className="relative h-5 w-5" aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
}

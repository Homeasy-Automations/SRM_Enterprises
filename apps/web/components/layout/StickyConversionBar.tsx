"use client";

/*
import { useState, useEffect } from "react";
import { MessageCircle, Phone, FileUp, ArrowRight, X, Sparkles } from "lucide-react";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { getTelLink, getWhatsAppLink } from "@/data/company";
import { analytics } from "@/lib/analytics";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";
*/

/**
 * Sticky bottom conversion bar for high B2B lead generation.
 * (Feature temporarily hidden as requested)
 *
 * Desktop: "Need packaging for your product? [ Share Specs ] [ WhatsApp ] [ Request Quote ]"
 * Mobile: Fixed bottom dock [ WhatsApp | Call | Get Quote ]
 */
export function StickyConversionBar(): null {
  /*
  const { openQuoteModal } = useQuoteModal();
  const { scrollY } = useScrollProgress(200);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const whatsappLink = getWhatsAppLink();
  const telLink = getTelLink();

  // Show after scrolling past the hero (scrollY > 320)
  const isVisible = mounted && !dismissed && scrollY > 320;

  if (!mounted || dismissed) return null;

  return (
    <>
      <div
        className={cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden md:block transition-all duration-500 ease-out no-print",
          isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-4 rounded-full border border-navy/15 bg-white/95 px-5 py-2.5 shadow-2xl backdrop-blur-md ring-1 ring-black/5">
          <div className="flex items-center gap-2.5 pr-2 border-r border-navy/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-navy flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Need packaging for your product?
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                analytics.ctaClick("Sticky Upload Requirement", "conversion-bar");
                openQuoteModal({ initialMessage: "I would like to share product specs & drawings for a quote." });
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-navy hover:bg-navy/5 hover:border-navy/30 transition-all"
            >
              <FileUp className="h-3.5 w-3.5 text-accent" />
              <span>Share Specs</span>
            </button>

            {whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.whatsappClick("sticky-bar")}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/40 bg-[#EAFBF4] px-3.5 py-1.5 text-xs font-bold text-emerald-800 hover:bg-[#d8f8ea] transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            ) : null}

            <button
              type="button"
              onClick={() => {
                analytics.ctaClick("Sticky Request Quote", "conversion-bar");
                openQuoteModal();
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-1.5 text-xs font-bold text-white shadow-md hover:bg-navy/90 hover:scale-[1.02] transition-all"
            >
              <span>Request Quote</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss conversion bar"
              className="ml-1 grid h-6 w-6 place-items-center rounded-full text-navy-soft/60 hover:text-navy hover:bg-navy/5 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 border-t border-navy/10 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lift backdrop-blur-md transition-all duration-300 no-print",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="grid grid-cols-3 gap-2">
          {whatsappLink ? (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.whatsappClick("mobile-dock")}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-[#EAFBF4] py-2.5 text-xs font-bold text-emerald-800 active:scale-95 transition-transform"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          ) : (
            <div />
          )}

          {telLink ? (
            <a
              href={telLink}
              onClick={() => analytics.phoneClick("mobile-dock")}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-navy/15 bg-slate-50 py-2.5 text-xs font-bold text-navy active:scale-95 transition-transform"
            >
              <Phone className="h-4 w-4 text-accent" />
              <span>Call</span>
            </a>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={() => {
              analytics.ctaClick("Mobile Dock Quote", "conversion-bar");
              openQuoteModal();
            }}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-navy py-2.5 text-xs font-bold text-white shadow-sm active:scale-95 transition-transform"
          >
            <span>Get Quote</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </>
  );
  */
  return null;
}

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import type { NavItem } from "@/data/navigation";
import { productCategoriesMega } from "@/data/navigation";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { useQuoteModal } from "@/hooks/use-quote-modal";

interface MegaMenuProps {
  item: NavItem;
  onSelect: () => void;
  onHoverColor?: (color: string | null) => void;
}

/**
 * Enhanced Products Mega Menu:
 * Five distinct columns (Corrugated, EPE, Bubble, Films, Accessories)
 * with their core sub-item specifications, plus a bottom quick-action bar.
 */
export function MegaMenu({ onSelect, onHoverColor }: MegaMenuProps): JSX.Element | null {
  const reducedMotion = useReducedMotion();
  const { openQuoteModal } = useQuoteModal();

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
      transition={{ duration: reducedMotion ? 0.001 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 right-0 top-full z-40 pt-2"
    >
      <div className="container-wide">
        <div
          role="menu"
          aria-label="Products Mega Menu"
          className="rounded-3xl border border-navy/10 bg-white p-6 shadow-2xl"
        >
          {/* Top 5-Column Grid */}
          <div className="grid grid-cols-5 gap-5 pb-6 border-b border-navy/10">
            {productCategoriesMega.map((category) => (
              <div key={category.title} className="flex flex-col gap-2.5">
                {/* Category Header Link */}
                <Link
                  href={category.href}
                  onClick={onSelect}
                  onMouseEnter={() => onHoverColor?.(category.color)}
                  onMouseLeave={() => onHoverColor?.(null)}
                  className="group/cat flex items-center gap-2.5 rounded-xl p-1.5 transition-colors hover:bg-slate-50"
                >
                  <span
                    className="grid h-8 w-8 place-items-center rounded-lg text-white shadow-xs transition-transform duration-300 group-hover/cat:scale-110"
                    style={{ background: category.color }}
                  >
                    <CategoryIcon name={category.icon} className="h-4 w-4" />
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-ui text-sm font-bold text-navy group-hover/cat:text-accent transition-colors">
                      {category.title}
                    </span>
                    <ChevronRight className="h-3 w-3 text-navy/30 group-hover/cat:text-accent group-hover/cat:translate-x-0.5 transition-all" />
                  </div>
                </Link>

                {/* Sub-item bullet links */}
                <ul className="flex flex-col gap-1 pl-2">
                  {category.subItems.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        onClick={onSelect}
                        className="group/item flex items-center justify-between rounded-lg py-1.5 px-2 text-xs font-medium text-navy-soft transition-all duration-200 hover:text-navy hover:bg-slate-100/80 hover:translate-x-1"
                      >
                        <span>{sub.label}</span>
                        <span
                          className="h-1 w-1 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"
                          style={{ background: category.color }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Custom Packaging & Quick Sample Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2.5 text-xs text-navy-soft">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-soft text-accent">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span>
                Need custom dimensioned packaging or CNC foam fitments for your specific part?
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/custom-packaging"
                onClick={onSelect}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-deep hover:underline"
              >
                <span>Explore Custom Packaging</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  onSelect();
                  openQuoteModal({ initialMessage: "I would like to request material samples for trial testing." });
                }}
                className="rounded-full bg-navy px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-navy/90 hover:scale-[1.02] transition-all"
              >
                Request a Sample
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

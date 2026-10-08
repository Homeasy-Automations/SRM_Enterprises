"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  /** Stable id used for keys and aria wiring. */
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  /** Allow several panels open at once (FAQ) or one at a time (process steps). */
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
  accentColor?: string;
}

/**
 * Accessible accordion built on buttons + aria-expanded/aria-controls.
 * Animates max-height/opacity only (no layout thrash) and switches to instant
 * open/close when the visitor prefers reduced motion.
 */
export function Accordion({
  items,
  allowMultiple = true,
  defaultOpenId,
  className,
  accentColor,
}: AccordionProps): JSX.Element {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);
  const baseId = useId();
  const reducedMotion = useReducedMotion();

  const toggle = (id: string): void => {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (isOpen) return current.filter((entry) => entry !== id);
      return allowMultiple ? [...current, id] : [id];
    });
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const panelId = `${baseId}-${item.id}-panel`;
        const buttonId = `${baseId}-${item.id}-button`;

        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white transition-colors duration-300",
              isOpen ? "border-[color:var(--accordion-accent)]/40 shadow-soft" : "border-navy/10",
            )}
            style={{
              ["--accordion-accent" as string]: accentColor ?? "var(--accent)",
            }}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-navy transition-colors hover:bg-accent-soft/60 sm:px-6 sm:py-5"
              >
                <span>{item.question}</span>
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-180 border-transparent bg-[color:var(--accordion-accent)] text-white"
                      : "border-navy/15 text-navy",
                  )}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0.001 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-navy-soft sm:px-6 sm:pb-6 sm:text-base">
                    {item.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useColorMood } from "@/hooks/use-color-mood";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

/**
 * Floating "Color Mood" swatch button — four LIGHT palettes (Ocean, Citrus, Meadow, Berry).
 * Changing a palette rewrites the site's CSS variables, so every accent, gradient, blob and
 * button transitions smoothly at once. Keyboard accessible: Escape closes, focus is trapped
 * inside the popover while it is open.
 */
export function ColorMoodSwitcher(): JSX.Element {
  const { moodId, mood, setMood, moods } = useColorMood();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setOpen(false);
        containerRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };

    const onPointerDown = (event: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative no-print">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Change colour mood. Current palette: ${mood.label}`}
        className="group grid h-12 w-12 place-items-center rounded-full border border-navy/10 bg-white text-accent shadow-card transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/35"
      >
        <Palette className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mood-panel"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: reducedMotion ? 0.001 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Colour mood options"
            className="absolute bottom-14 right-0 z-50 w-64 rounded-2xl border border-navy/10 bg-white p-3 shadow-lift"
          >
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy-soft">
              Colour Mood
            </p>
            <ul className="flex flex-col gap-1.5">
              {moods.map((option) => {
                const active = option.id === moodId;
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setMood(option.id);
                        analytics.ctaClick(`mood-${option.id}`, "color-mood");
                      }}
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
                        active
                          ? "border-[color:var(--mood-accent)]/50 bg-[color:var(--mood-soft)]"
                          : "border-transparent hover:bg-navy/[0.04]",
                      )}
                      style={{
                        ["--mood-accent" as string]: option.accent,
                        ["--mood-soft" as string]: option.accentSoft,
                      }}
                    >
                      <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
                        {[option.accent, option.accentSecondary, option.accentHighlight].map((swatch) => (
                          <span
                            key={swatch}
                            className="h-4 w-4 rounded-full ring-1 ring-inset ring-black/10"
                            style={{ background: swatch }}
                          />
                        ))}
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="text-sm font-semibold text-navy">{option.label}</span>
                        <span className="truncate text-[0.7rem] text-navy-soft">{option.description}</span>
                      </span>
                      {active ? (
                        <Check className="ml-auto h-4 w-4 shrink-0" style={{ color: option.accent }} aria-hidden="true" />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="px-2 pt-2 text-[0.68rem] leading-snug text-navy-soft">
              Light palettes only — the site is designed for bright, colourful viewing.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

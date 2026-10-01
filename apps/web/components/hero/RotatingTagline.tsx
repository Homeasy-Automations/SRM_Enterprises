"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TAGLINES = ["Trading", "Manufacturing", "Custom Packaging"] as const;

/** Rotating brand tagline: Trading → Manufacturing → Custom Packaging. */
export function RotatingTagline({ className }: { className?: string }): JSX.Element {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % TAGLINES.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, []);

  const current = TAGLINES[index] ?? TAGLINES[0];

  return (
    <span
      className={cn("relative inline-flex min-h-[1.4em] min-w-[9.5em] items-center", className)}
      aria-live="polite"
    >
      <span className="sr-only">
        {TAGLINES.join(", ")}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          aria-hidden="true"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 14, rotateX: -35 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -14, rotateX: 25 }}
          transition={{ duration: reducedMotion ? 0.001 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold text-accent-deep"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

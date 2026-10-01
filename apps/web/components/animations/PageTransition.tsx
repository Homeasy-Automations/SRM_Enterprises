"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Route transition: a soft fade + slide with a coloured wipe panel that sweeps across
 * on navigation. Rendered from app/template.tsx, which Next remounts per route — so
 * browser back/forward keeps working normally (no manual router state, no scroll hacks).
 * Motion is reduced on small screens and removed entirely for `prefers-reduced-motion`.
 */
export function PageTransition({ children }: { children: ReactNode }): JSX.Element {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Coloured wipe panel */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70] origin-left no-print"
          style={{
            background:
              "linear-gradient(120deg, var(--accent) 0%, var(--accent-secondary) 60%, var(--accent-highlight) 100%)",
          }}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 0.72, times: [0, 0.45, 1], ease: [0.65, 0, 0.35, 1] }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Initial loading screen: the wordmark with a folding box animation.
 * It is only shown while the app is genuinely booting and always disappears within
 * ~1.2 seconds — long enough to be intentional, short enough not to be annoying.
 * With reduced motion it is skipped entirely.
 */
export function LoadingScreen(): JSX.Element {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setVisible(false), 1200);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-white no-print"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden="true"
        >
          <div style={{ perspective: 900 }}>
            <motion.svg
              viewBox="0 0 120 120"
              width="96"
              height="96"
              style={{ width: "96px", height: "96px", maxWidth: "96px", maxHeight: "96px" }}
              className="h-24 w-24"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: [0, -32, 0], y: [0, -8, 0] }}
              transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <defs>
                <linearGradient id="load-left" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent, #1E6FFF)" />
                  <stop offset="100%" stopColor="var(--accent-deep, #12294A)" />
                </linearGradient>
                <linearGradient id="load-right" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-secondary, #19B26B)" />
                  <stop offset="100%" stopColor="var(--accent, #1E6FFF)" />
                </linearGradient>
              </defs>

              {/* Box body */}
              <motion.path
                d="M28 46 L60 30 L92 46 L92 84 L60 100 L28 84 Z"
                fill="url(#load-left)"
                animate={{ opacity: [1, 0.85, 1] }}
                transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <path d="M28 46 L60 62 L92 46 L92 84 L60 100 L28 84 Z" fill="url(#load-right)" opacity="0.92" />

              {/* Left flap folding down */}
              <motion.path
                d="M28 46 L60 30 L60 62 L28 46 Z"
                fill="var(--accent-highlight, #FFC93C)"
                style={{ transformOrigin: "28px 46px" }}
                animate={{ rotate: [0, -66, 0] }}
                transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              {/* Right flap folding down */}
              <motion.path
                d="M92 46 L60 30 L60 62 L92 46 Z"
                fill="var(--accent-secondary, #19B26B)"
                style={{ transformOrigin: "92px 46px" }}
                animate={{ rotate: [0, 66, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.18,
                }}
              />
            </motion.svg>
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="font-display text-xl font-extrabold tracking-[0.16em] text-navy sm:text-2xl">
              SRM ENTERPRISES
            </span>
            <span className="h-1 w-40 overflow-hidden rounded-full bg-navy/10">
              <motion.span
                className="block h-full w-1/3 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                animate={{ x: ["-120%", "320%"] }}
                transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

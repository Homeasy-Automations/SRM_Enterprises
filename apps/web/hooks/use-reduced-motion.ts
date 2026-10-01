"use client";

import { useEffect, useState } from "react";

/**
 * Single source of truth for `prefers-reduced-motion`.
 * Every animated component asks this hook (or Framer Motion's equivalent) before
 * running decorative motion, transforms or parallax.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const list = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(list.matches);

    const handler = (event: MediaQueryListEvent): void => setReduced(event.matches);
    if (typeof list.addEventListener === "function") {
      list.addEventListener("change", handler);
      return () => list.removeEventListener("change", handler);
    }

    list.addListener(handler);
    return () => list.removeListener(handler);
  }, []);

  return reduced;
}

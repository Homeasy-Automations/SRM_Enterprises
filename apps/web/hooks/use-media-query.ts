"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Starts as `false` on the server, then syncs on mount,
 * so server and client markup always match for the first paint.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const list = window.matchMedia(query);
    setMatches(list.matches);

    const handler = (event: MediaQueryListEvent): void => setMatches(event.matches);
    if (typeof list.addEventListener === "function") {
      list.addEventListener("change", handler);
      return () => list.removeEventListener("change", handler);
    }

    // Older Safari fallback
    list.addListener(handler);
    return () => list.removeListener(handler);
  }, [query]);

  return matches;
}

export const BREAKPOINTS = {
  xs: "(max-width: 359px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  xxl: "(min-width: 1536px)",
  coarsePointer: "(hover: none), (pointer: coarse)",
} as const;

/** True on phones/tablets — used to trim animation work on small devices. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

export function useHasHover(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

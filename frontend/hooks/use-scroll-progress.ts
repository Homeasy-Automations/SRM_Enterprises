"use client";

import { useEffect, useState } from "react";

export interface ScrollState {
  /** 0 → 1 progress through the document. */
  progress: number;
  /** Current window scrollY in pixels. */
  scrollY: number;
  /** True once the page has scrolled past the given threshold. */
  pastThreshold: boolean;
}

/**
 * Throttled (requestAnimationFrame) scroll progress. Used by the top progress bar,
 * the scroll-to-top ring and the navbar's scroll-aware styling.
 */
export function useScrollProgress(threshold = 24): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    scrollY: 0,
    pastThreshold: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frame = 0;

    const update = (): void => {
      frame = 0;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setState({ progress, scrollY, pastThreshold: scrollY > threshold });
    };

    const onScroll = (): void => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);

  return state;
}

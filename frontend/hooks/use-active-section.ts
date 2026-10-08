"use client";

import { useEffect, useState } from "react";

/**
 * Scroll spy used by the navbar (active link/underline colour) and by the homepage
 * product showcase, where the page accent follows the section currently in view.
 */
export function useActiveSection(sectionIds: readonly string[], offset = 140): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds.length > 0 ? sectionIds[0] ?? null : null);

  useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    let frame = 0;

    const update = (): void => {
      frame = 0;
      let current: string | null = null;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const { top } = element.getBoundingClientRect();
        if (top - offset <= 0) current = id;
        else break;
      }

      setActiveId(current ?? sectionIds[0] ?? null);
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
  }, [sectionIds, offset]);

  return activeId;
}

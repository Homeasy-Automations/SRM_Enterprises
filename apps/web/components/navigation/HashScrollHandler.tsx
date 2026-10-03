"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Universal hash scroll handler for Next.js App Router.
 * Ensures that clicking anchor links (e.g. /about#process) scrolls
 * smoothly to the target element whether the user is already on the
 * page or arriving via client navigation.
 */
export function HashScrollHandler(): null {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window === "undefined") return;
      const rawHash = window.location.hash;
      if (!rawHash) return;
      const id = rawHash.replace("#", "");
      if (!id) return;

      let attempts = 0;
      const maxAttempts = 15;

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts < maxAttempts) {
          attempts += 1;
          setTimeout(tryScroll, 80);
        }
      };

      // Slight delay to allow DOM/animations to mount
      setTimeout(tryScroll, 60);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [pathname]);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !href.includes("#")) return;

      const [targetPath, hash] = href.split("#");
      if (!hash) return;

      const currentPath = window.location.pathname.replace(/\/$/, "");
      const normalizedTargetPath = (targetPath || currentPath).replace(/\/$/, "");

      // If clicking a hash link for the current page
      if (currentPath === normalizedTargetPath) {
        const el = document.getElementById(hash);
        if (el) {
          e.preventDefault();
          window.history.pushState(null, "", `#${hash}`);
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, []);

  return null;
}

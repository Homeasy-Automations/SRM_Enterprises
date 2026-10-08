"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

/** Thin top progress bar that follows the page accent and repaints with the Color Mood. */
export function ScrollProgressBar(): JSX.Element {
  const { progress } = useScrollProgress(10);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent no-print"
      role="presentation"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-secondary to-accent-highlight transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

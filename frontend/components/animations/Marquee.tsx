"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-media-query";

interface MarqueeProps {
  items: readonly string[];
  className?: string;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  /** Separator glyph between items. */
  separator?: string;
  itemClassName?: string;
}

/**
 * Infinite marquee ribbon. The list is rendered twice and translated by exactly -50%,
 * so the loop is seamless regardless of content length. Static (and readable) when the
 * visitor prefers reduced motion, and slower on small screens where the list is shorter.
 */
export function Marquee({
  items,
  className,
  speed = 32,
  reverse = false,
  separator = "•",
  itemClassName,
}: MarqueeProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const doubled = [...items, ...items];
  const duration = reducedMotion ? 0 : isMobile ? speed * 1.4 : speed;

  return (
    <div className={cn("marquee-mask relative flex w-full overflow-hidden", className)} aria-hidden="true">
      <div
        className={cn("flex w-max shrink-0 items-center gap-6 sm:gap-10", !reducedMotion && "animate-marquee")}
        style={{
          animationDuration: duration > 0 ? `${duration}s` : undefined,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "flex shrink-0 items-center gap-6 font-ui text-sm font-semibold tracking-wide text-navy sm:gap-10 sm:text-base",
              itemClassName,
            )}
          >
            {item}
            <span className="text-accent" aria-hidden="true">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

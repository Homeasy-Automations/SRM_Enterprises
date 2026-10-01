"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AccessoryArt, BoxArt, BubbleArt, FilmArt, FoamArt } from "@/components/ui/art";
import { cn } from "@/lib/utils";

interface FloatingIllustrationsProps {
  className?: string;
  /** Colour used when the visitor has not hovered a specific illustration. */
  accent?: string;
}

const ITEMS = [
  { key: "box", Art: BoxArt, color: "#FF8A2B", className: "left-[2%] top-[6%] h-24 w-24 sm:h-32 sm:w-32", duration: 8 },
  { key: "foam", Art: FoamArt, color: "#19C3E6", className: "right-[4%] top-[2%] h-24 w-24 sm:h-36 sm:w-36", duration: 10 },
  { key: "bubble", Art: BubbleArt, color: "#8B5CF6", className: "left-[6%] bottom-[6%] h-20 w-20 sm:h-28 sm:w-28", duration: 9 },
  { key: "film", Art: FilmArt, color: "#10B981", className: "right-[8%] bottom-[10%] h-20 w-20 sm:h-32 sm:w-32", duration: 11 },
  { key: "tape", Art: AccessoryArt, color: "#FF5C8A", className: "left-[44%] top-[-2%] hidden h-20 w-20 lg:block", duration: 12 },
] as const;

/**
 * Slowly floating SVG packaging illustrations behind the hero copy.
 * Marked aria-hidden (decorative) and kept light: transform-only animation, hidden on the
 * smallest screens to protect the reading experience, static under reduced motion.
 */
export function FloatingIllustrations({ className, accent }: FloatingIllustrationsProps): JSX.Element {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-0", className)} aria-hidden="true">
      {ITEMS.map((item, index) => (
        <motion.div
          key={item.key}
          className={cn("absolute opacity-90", item.className)}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, index % 2 === 0 ? -18 : 16, 0],
                  rotate: [0, index % 2 === 0 ? 6 : -6, 0],
                }
          }
          transition={{
            duration: item.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
        >
          <item.Art accent={index === 0 && accent ? accent : item.color} className="h-full w-full drop-shadow-[0_18px_30px_rgba(18,41,74,0.16)]" />
        </motion.div>
      ))}
    </div>
  );
}

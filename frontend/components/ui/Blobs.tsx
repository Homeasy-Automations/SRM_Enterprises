"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlobsProps {
  className?: string;
  /** Optional explicit colours; defaults to the live accent tokens. */
  colors?: string[];
  count?: number;
}

const POSITIONS = [
  { top: "-8%", left: "-6%", size: 340 },
  { top: "52%", left: "68%", size: 300 },
  { top: "18%", left: "58%", size: 220 },
  { top: "70%", left: "8%", size: 260 },
  { top: "-4%", left: "72%", size: 200 },
];

/**
 * Soft pastel blobs + gradient mesh used behind hero and CTA sections.
 * They track the page accent, so they repaint when the category or Color Mood changes.
 * Transform/opacity animation only, and completely static under reduced motion.
 */
export function Blobs({ className, colors, count = 4 }: BlobsProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const palette = colors ?? ["var(--accent)", "var(--accent-secondary)", "var(--accent-highlight)"];

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute inset-0 bg-mesh-light opacity-90" />
      {POSITIONS.slice(0, count).map((position, index) => {
        const color = palette[index % palette.length] ?? "var(--accent)";
        return (
          <motion.span
            key={`${position.top}-${position.left}`}
            className="absolute rounded-full blur-3xl"
            style={{
              top: position.top,
              left: position.left,
              width: position.size,
              height: position.size,
              background: color,
              opacity: 0.22,
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    x: [0, 22, -14, 0],
                    y: [0, -18, 12, 0],
                    scale: [1, 1.08, 0.96, 1],
                  }
            }
            transition={{
              duration: 14 + index * 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70" />
    </div>
  );
}

"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "scale-in"
  | "clip"
  | "blur-up";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  /** How much of the element must be visible before animating. */
  amount?: number;
  as?: "div" | "section" | "li" | "article" | "span";
}

const DISTANCE = 26;

function buildVariants(variant: RevealVariant): Variants {
  switch (variant) {
    case "fade-in":
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    case "slide-left":
      return {
        hidden: { opacity: 0, x: -DISTANCE },
        visible: { opacity: 1, x: 0 },
      };
    case "slide-right":
      return {
        hidden: { opacity: 0, x: DISTANCE },
        visible: { opacity: 1, x: 0 },
      };
    case "scale-in":
      return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: { opacity: 1, scale: 1 },
      };
    case "clip":
      return {
        hidden: { opacity: 0, clipPath: "inset(14% 8% 14% 8% round 24px)", scale: 1.03 },
        visible: { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 24px)", scale: 1 },
      };
    case "blur-up":
      return {
        hidden: { opacity: 0, y: DISTANCE / 2, filter: "blur(8px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      };
    case "fade-up":
    default:
      return {
        hidden: { opacity: 0, y: DISTANCE },
        visible: { opacity: 1, y: 0 },
      };
  }
}

const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
  span: motion.span,
} as const;

/**
 * Scroll reveal wrapper. One component, seven visual variants, so every section on the
 * site animates in — but never identically to the section next to it.
 */
export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className,
  amount = 0.2,
  as = "div",
}: RevealProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const Component = MOTION_TAGS[as];

  const variants = buildVariants(reducedMotion ? "fade-in" : variant);

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{
        duration: reducedMotion ? 0.001 : duration,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  as?: "div" | "ul" | "section";
}

/** Container that staggers its <StaggerItem> children as they scroll into view. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.05,
  amount = 0.15,
  as = "div",
}: StaggerGroupProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const Component = as === "ul" ? motion.ul : as === "section" ? motion.section : motion.div;

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reducedMotion ? 0 : stagger,
            delayChildren: reducedMotion ? 0 : delayChildren,
          },
        },
      }}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: "div" | "li" | "article";
}

/** Child of <StaggerGroup> — inherits the staggered timing. */
export function StaggerItem({
  children,
  className,
  variant = "fade-up",
  as = "div",
}: StaggerItemProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const variants = buildVariants(reducedMotion ? "fade-in" : variant);
  const Component = as === "li" ? motion.li : as === "article" ? motion.article : motion.div;

  return (
    <Component
      className={cn(className)}
      variants={variants}
      transition={{ duration: reducedMotion ? 0.001 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

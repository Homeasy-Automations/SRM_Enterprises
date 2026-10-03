"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "split-left"
  | "split-right"
  | "flip-up"
  | "kinetic-pop"
  | "depth-zoom"
  | "scale-in"
  | "clip"
  | "iris-clip"
  | "blur-up";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  /** How much of the element must be visible before animating. */
  amount?: number;
  /** Whether the animation should only play once. Defaults to false for recurring scroll animations. */
  once?: boolean;
  margin?: string;
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
    case "split-left":
      return {
        hidden: { opacity: 0, x: -42, scale: 0.96 },
        visible: { opacity: 1, x: 0, scale: 1 },
      };
    case "split-right":
      return {
        hidden: { opacity: 0, x: 42, scale: 0.96 },
        visible: { opacity: 1, x: 0, scale: 1 },
      };
    case "flip-up":
      return {
        hidden: { opacity: 0, y: 32, rotateX: 16 },
        visible: { opacity: 1, y: 0, rotateX: 0 },
      };
    case "kinetic-pop":
      return {
        hidden: { opacity: 0, scale: 0.86, y: 18 },
        visible: { opacity: 1, scale: 1, y: 0 },
      };
    case "depth-zoom":
      return {
        hidden: { opacity: 0, scale: 0.93, filter: "blur(6px)" },
        visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
      };
    case "scale-in":
      return {
        hidden: { opacity: 0, scale: 0.94 },
        visible: { opacity: 1, scale: 1 },
      };
    case "clip":
    case "iris-clip":
      return {
        hidden: { opacity: 0, clipPath: "inset(12% 6% 12% 6% round 24px)", scale: 1.03 },
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
 * Scroll reveal wrapper with recurring scroll-triggered animations (once=false).
 * Paced for clear visibility and elegance, triggering when well inside the viewport.
 */
export function Reveal({
  children,
  variant = "fade-up",
  delay = 0.08,
  duration = 0.9,
  className,
  amount = 0.28,
  once = false,
  margin = "-60px 0px -60px 0px",
  as = "div",
}: RevealProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const Component = MOTION_TAGS[as];

  const variants = buildVariants(reducedMotion ? "fade-in" : variant);
  const resolvedDuration =
    duration ?? (variant === "flip-up" || variant === "iris-clip" ? 1.05 : 0.9);

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: reducedMotion ? true : once, amount, margin }}
      transition={{
        duration: reducedMotion ? 0.001 : resolvedDuration,
        delay: reducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </Component>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
  margin?: string;
  as?: "div" | "ul" | "section";
}

/** Container that staggers its <StaggerItem> children as they scroll into view, re-animating on scroll. */
export function StaggerGroup({
  children,
  className,
  style,
  stagger = 0.16,
  delayChildren = 0.15,
  amount = 0.26,
  once = false,
  margin = "-60px 0px -60px 0px",
  as = "div",
}: StaggerGroupProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const Component = as === "ul" ? motion.ul : as === "section" ? motion.section : motion.div;

  return (
    <Component
      className={cn(className)}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: reducedMotion ? true : once, amount, margin }}
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
  style?: CSSProperties;
  variant?: RevealVariant;
  as?: "div" | "li" | "article";
}

/** Child of <StaggerGroup> — inherits the staggered timing and distinct variant. */
export function StaggerItem({
  children,
  className,
  style,
  variant = "fade-up",
  as = "div",
}: StaggerItemProps): JSX.Element {
  const reducedMotion = useReducedMotion();
  const variants = buildVariants(reducedMotion ? "fade-in" : variant);
  const Component = as === "li" ? motion.li : as === "article" ? motion.article : motion.div;

  return (
    <Component
      className={cn(className)}
      style={style}
      variants={variants}
      transition={{ duration: reducedMotion ? 0.001 : 0.88, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}

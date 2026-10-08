"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "white" | "glass" | "ghost";
  ariaLabel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Shine sweep across the button on hover. */
  shine?: boolean;
  external?: boolean;
}

const VARIANT_CLASS = {
  primary: "btn-primary",
  outline: "btn-outline",
  white: "btn-white",
  glass: "btn-glass",
  ghost: "btn-ghost",
} as const;

/** Button with a magnetic hover pull and an optional shine sweep. Works as link or button. */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  ariaLabel,
  type = "button",
  disabled = false,
  shine = true,
  external = false,
}: MagneticButtonProps): JSX.Element {
  const { offset, handlers, enabled } = useMagnetic(10);
  const reducedMotion = useReducedMotion();

  const style = enabled ? { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` } : undefined;

  const inner = (
    <>
      {shine ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/35 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shine" />
        </span>
      ) : null}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  const classes = cn(
    VARIANT_CLASS[variant],
    "group relative overflow-hidden",
    disabled && "pointer-events-none opacity-60",
    className,
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
          style={style}
          {...handlers}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
        >
          {inner}
        </motion.a>
      );
    }

    return (
      <motion.div style={style} {...handlers} className="inline-flex">
        <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      style={style}
      {...handlers}
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
    >
      {inner}
    </motion.button>
  );
}

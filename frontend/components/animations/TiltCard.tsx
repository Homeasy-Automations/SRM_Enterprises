"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useTilt } from "@/hooks/use-tilt";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export interface TiltCardProps {
  children: ReactNode;
  /** Category or brand colour that takes over the card on hover. */
  accentColor: string;
  className?: string;
  innerClassName?: string;
  /** When provided the whole card becomes a link. */
  href?: string;
  ariaLabel?: string;
  onActivate?: () => void;
  /** Animation delay for staggered entrances. */
  style?: CSSProperties;
  /** Enables the animated gradient border + colour wash on hover. */
  wash?: boolean;
}

/**
 * Every product/industry/feature card on the site uses this component:
 * lift + 3D tilt on hover, animated gradient border, colour wash, click ripple.
 * Touch devices get the colour wash without transform jitter, and visitors who prefer
 * reduced motion get a static card with a simple hover state.
 */
export function TiltCard({
  children,
  accentColor,
  className,
  innerClassName,
  href,
  ariaLabel,
  onActivate,
  style,
  wash = true,
}: TiltCardProps): JSX.Element {
  const { tilt, handlers, enabled } = useTilt(7);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    },
    [],
  );

  const spawnRipple = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const id = (rippleId.current += 1);
    setRipples((current) => [
      ...current,
      { id, x: event.clientX - bounds.left, y: event.clientY - bounds.top },
    ]);
    const timer = window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, 620);
    timers.current.push(timer);
  }, []);

  const cardStyle: CSSProperties = {
    ...style,
    // Exposed so CSS can build the colour wash / border / shadow from one variable.
    ["--card-accent" as string]: accentColor,
    transform: enabled
      ? `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${tilt.active ? -6 : 0}px)`
      : undefined,
    transformStyle: enabled ? "preserve-3d" : undefined,
  };

  const content = (
    <>
      {wash ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{
            background: `linear-gradient(140deg, ${accentColor}1F 0%, ${accentColor}0D 45%, transparent 75%)`,
          }}
        />
      ) : null}

      {/* Animated gradient border — visible on hover/focus only. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          padding: 1.5,
          background: `linear-gradient(120deg, ${accentColor}, transparent 40%, ${accentColor} 90%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {enabled ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(320px circle at ${tilt.pointerX * 100}% ${tilt.pointerY * 100}%, ${accentColor}26, transparent 60%)`,
          }}
        />
      ) : null}

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            background: `radial-gradient(circle, ${accentColor}59 0%, transparent 70%)`,
            animation: "pulse-ring 620ms ease-out forwards",
          }}
        />
      ))}

      <div className={cn("relative z-10 h-full", innerClassName)}>{children}</div>
    </>
  );

  const sharedProps = {
    className: cn(
      "group relative block h-full overflow-hidden rounded-[26px] border border-navy/10 bg-white shadow-soft",
      "transition-[box-shadow,border-color,background-color,transform] duration-500 ease-smooth",
      "hover:border-[color:var(--card-accent)]/40 hover:shadow-lift",
      className,
    ),
    style: cardStyle,
    onPointerDown: spawnRipple,
    ...handlers,
  };

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} {...sharedProps} onClick={onActivate}>
        {content}
      </Link>
    );
  }

  return (
    <div
      {...sharedProps}
      role={onActivate ? "button" : undefined}
      tabIndex={onActivate ? 0 : undefined}
      onClick={onActivate}
      onKeyDown={
        onActivate
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onActivate();
              }
            }
          : undefined
      }
    >
      {content}
    </div>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import { useHasHover } from "./use-media-query";
import { usePrefersReducedMotion } from "./use-reduced-motion";

export interface MagneticOffset {
  x: number;
  y: number;
}

/** Magnetic hover pull for buttons — disabled on touch devices and for reduced motion. */
export function useMagnetic(strength = 14): {
  offset: MagneticOffset;
  handlers: {
    onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave: () => void;
  };
  enabled: boolean;
} {
  const [offset, setOffset] = useState<MagneticOffset>({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const hasHover = useHasHover();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = hasHover && !reducedMotion;

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!enabled) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;

      if (frameRef.current !== 0) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(() => {
        setOffset({ x: relativeX * strength * 2, y: relativeY * strength * 2 });
      });
    },
    [enabled, strength],
  );

  const onMouseLeave = useCallback(() => {
    if (!enabled) return;
    if (frameRef.current !== 0) window.cancelAnimationFrame(frameRef.current);
    setOffset({ x: 0, y: 0 });
  }, [enabled]);

  return { offset, handlers: { onMouseMove, onMouseLeave }, enabled };
}

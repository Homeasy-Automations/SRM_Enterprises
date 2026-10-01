"use client";

import { useCallback, useRef, useState } from "react";
import { useHasHover } from "./use-media-query";
import { usePrefersReducedMotion } from "./use-reduced-motion";

interface TiltState {
  rotateX: number;
  rotateY: number;
  /** Normalised pointer position (0 → 1) for spotlight/shine effects. */
  pointerX: number;
  pointerY: number;
  active: boolean;
}

export interface TiltHandlers {
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
  onMouseEnter: () => void;
}

const INITIAL: TiltState = { rotateX: 0, rotateY: 0, pointerX: 0.5, pointerY: 0.5, active: false };

/**
 * 3D tilt for cards. Automatically disabled on touch devices and when the visitor
 * has asked for reduced motion, so it never becomes a usability problem.
 */
export function useTilt(strength = 8): { tilt: TiltState; handlers: TiltHandlers; enabled: boolean } {
  const [tilt, setTilt] = useState<TiltState>(INITIAL);
  const frameRef = useRef(0);
  const hasHover = useHasHover();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = hasHover && !reducedMotion;

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!enabled) return;
      const target = event.currentTarget;
      const bounds = target.getBoundingClientRect();

      if (frameRef.current !== 0) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(() => {
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        setTilt({
          rotateX: (0.5 - y) * strength,
          rotateY: (x - 0.5) * strength,
          pointerX: x,
          pointerY: y,
          active: true,
        });
      });
    },
    [enabled, strength],
  );

  const onMouseLeave = useCallback(() => {
    if (!enabled) return;
    if (frameRef.current !== 0) window.cancelAnimationFrame(frameRef.current);
    setTilt(INITIAL);
  }, [enabled]);

  const onMouseEnter = useCallback(() => {
    if (!enabled) return;
    setTilt((previous) => ({ ...previous, active: true }));
  }, [enabled]);

  return { tilt, handlers: { onMouseMove, onMouseLeave, onMouseEnter }, enabled };
}

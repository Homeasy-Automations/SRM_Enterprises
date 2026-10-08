"use client";

import { createContext, useContext } from "react";
import { COLOR_MOODS, DEFAULT_COLOR_MOOD, type ColorMood } from "@srm/config";
import type { ColorMoodId } from "@srm/types";

/**
 * Color Mood context.
 *
 * Persistence is intentionally React state only — the request was explicit that nothing
 * is written to localStorage. A fresh visit therefore starts on the Ocean palette and
 * the visitor's choice simply lasts for the session.
 */
export interface ColorMoodContextValue {
  moodId: ColorMoodId;
  mood: ColorMood;
  setMood: (id: ColorMoodId) => void;
  moods: readonly ColorMood[];
}

export const ColorMoodContext = createContext<ColorMoodContextValue | null>(null);

export function useColorMood(): ColorMoodContextValue {
  const context = useContext(ColorMoodContext);
  if (!context) {
    // Never crash a page because a provider is missing — degrade to the default palette.
    const fallbackMood = COLOR_MOODS.find((item) => item.id === DEFAULT_COLOR_MOOD) ?? COLOR_MOODS[0];
    return {
      moodId: DEFAULT_COLOR_MOOD,
      mood: fallbackMood as ColorMood,
      setMood: () => undefined,
      moods: COLOR_MOODS,
    };
  }
  return context;
}

export { COLOR_MOODS, DEFAULT_COLOR_MOOD, type ColorMood, type ColorMoodId };

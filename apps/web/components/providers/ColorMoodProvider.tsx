"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { COLOR_MOODS, DEFAULT_COLOR_MOOD, type ColorMood } from "@srm/config";
import type { ColorMoodId } from "@srm/types";
import { ColorMoodContext, type ColorMoodContextValue } from "@/hooks/use-color-mood";

/**
 * Site-wide Color Mood state.
 *
 * Persistence is React state only (no localStorage / no cookies) exactly as requested:
 * the visitor's palette lasts for the session and resets on a fresh visit.
 * The chosen palette is applied as `data-mood` on <html>, which swaps the CSS variables
 * that every colour in the site is bound to.
 */
export function ColorMoodProvider({ children }: { children: ReactNode }): JSX.Element {
  const [moodId, setMoodId] = useState<ColorMoodId>(DEFAULT_COLOR_MOOD);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.mood = moodId;
    document.documentElement.style.setProperty("--transition-theme", "700ms cubic-bezier(0.22, 1, 0.36, 1)");
  }, [moodId]);

  const setMood = useCallback((id: ColorMoodId) => setMoodId(id), []);

  const value = useMemo<ColorMoodContextValue>(() => {
    const mood: ColorMood = COLOR_MOODS.find((item) => item.id === moodId) ?? COLOR_MOODS[0] ?? {
      id: DEFAULT_COLOR_MOOD,
      label: "Ocean",
      description: "Vivid blue with fresh green",
      accent: "#1E6FFF",
      accentSoft: "#E8F1FF",
      accentContrast: "#FFFFFF",
      accentSecondary: "#19B26B",
      accentHighlight: "#FFC93C",
      gradientFrom: "#1E6FFF",
      gradientTo: "#19B26B",
    };

    return { moodId, mood, setMood, moods: COLOR_MOODS };
  }, [moodId, setMood]);

  return <ColorMoodContext.Provider value={value}>{children}</ColorMoodContext.Provider>;
}

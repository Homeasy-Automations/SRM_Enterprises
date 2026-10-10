import { Inter, Space_Grotesk, Alex_Brush } from "next/font/google";

/**
 * Legacy fonts kept ONLY for the Home hero (`.hero-font-lock`). The rest of the site uses
 * Fraunces / Syne / Merriweather (see app/layout.tsx). Options mirror the hero's original
 * setup exactly so its rendering is unchanged. Because this module is imported only by
 * HomeHero, Next preloads these files on the Home route alone.
 *
 * Space Grotesk is the hero <h1>'s own font-family, but every glyph in the headline sits in a
 * child span (Inter / Alex Brush), so its file is never downloaded — preload is off.
 */
export const heroInter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hero-inter",
  weight: ["400", "500", "600"],
});

export const heroSpaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hero-space-grotesk",
  weight: ["500", "600", "700"],
  preload: false,
});

export const heroAlexBrush = Alex_Brush({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hero-alex",
  weight: ["400"],
});

export const heroFontVariables = `${heroInter.variable} ${heroSpaceGrotesk.variable} ${heroAlexBrush.variable}`;

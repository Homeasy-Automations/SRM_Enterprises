/** Small dependency-free helpers used across the site. */

/** Joins class names, skipping falsy values. (Local `cn`, no external dependency.) */
export function cn(...values: (string | false | null | undefined)[]): string {
  return values.filter((value): value is string => Boolean(value)).join(" ");
}

/** #1E6FFF -> "30, 111, 255" for use inside rgba(). */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean;
  const int = Number.parseInt(full, 16);
  if (Number.isNaN(int)) return "30, 111, 255";
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `${r}, ${g}, ${b}`;
}

export function hexToRgba(hex: string, alpha: number): string {
  return `rgba(${hexToRgbChannels(hex)}, ${alpha})`;
}

/** Picks black or white text for a given background so contrast always holds. */
export function readableTextOn(hex: string): "#FFFFFF" | "#12294A" {
  const channels = hexToRgbChannels(hex)
    .split(",")
    .map((value) => Number.parseInt(value.trim(), 10));
  const [r = 0, g = 0, b = 0] = channels;
  // Relative luminance (sRGB approximation) — good enough for UI text decisions.
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#12294A" : "#FFFFFF";
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Splits a headline into words so they can be staggered individually. */
export function splitWords(text: string): string[] {
  return text.split(/\s+/).filter((word) => word.length > 0);
}

/** Breaks an array into rows of `size` (used for gallery grids). */
export function chunk<T>(items: readonly T[], size: number): T[][] {
  if (size <= 0) return [items.slice()];
  const output: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    output.push(items.slice(index, index + size));
  }
  return output;
}

/** Truncates on a word boundary. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

/** IntersectionObserver-free "is this the current section" helper for anchor scripts. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Stable, deterministic pseudo-id for keys derived from strings. */
export function slugToId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

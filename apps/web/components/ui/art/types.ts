/** Shared props for every illustration in this folder. */
export interface ArtProps {
  /** Category/brand colour the artwork is built from. */
  accent?: string;
  /** Tailwind class for sizing. */
  className?: string;
  /** Accessible label — every illustration carries one <title>. */
  title?: string;
  /** Reduced variant used behind dense content. */
  flat?: boolean;
}

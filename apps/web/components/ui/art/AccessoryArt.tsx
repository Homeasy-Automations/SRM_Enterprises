import type { ArtProps } from "./types";

/** Packaging accessories: tape roll, strapping coil, edge protector and sealing bag. */
export function AccessoryArt({ accent = "#FF5C8A", className, title = "Packaging accessories illustration" }: ArtProps): JSX.Element {
  const id = `accessoryart-${accent.replace("#", "")}`;
  return (
    <svg
      viewBox="0 0 220 200"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={`${id}-tape`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`${id}-strap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <ellipse cx="110" cy="178" rx="86" ry="11" fill={accent} opacity="0.14" />

      {/* Tape roll */}
      <g>
        <circle cx="70" cy="96" r="50" fill={`url(#${id}-tape)`} stroke={accent} strokeWidth="2" />
        <circle cx="70" cy="96" r="20" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
        <circle cx="70" cy="96" r="7" fill={accent} opacity="0.35" />
        {/* Peeling tape strip */}
        <path d="M118 96 C150 96 156 120 176 120 L206 120" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.55" />
        <path d="M118 96 C150 96 156 120 176 120 L206 120" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 7" />
      </g>

      {/* Strapping coil */}
      <g>
        <ellipse cx="120" cy="60" rx="46" ry="26" fill="none" stroke={`url(#${id}-strap)`} strokeWidth="12" />
        <ellipse cx="120" cy="60" rx="46" ry="26" fill="none" stroke={accent} strokeWidth="2" />
        <ellipse cx="120" cy="60" rx="20" ry="11" fill="none" stroke={accent} strokeWidth="2" opacity="0.7" />
      </g>

      {/* Edge protector */}
      <g>
        <path d="M150 132 L196 132 L196 176 L178 176 L178 150 L150 150 Z" fill={`url(#${id}-strap)`} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <path d="M156 140 L190 140" stroke={accent} strokeWidth="1.4" opacity="0.6" />
      </g>

      {/* Sealed bag */}
      <g>
        <path d="M18 128 L62 128 L62 172 L18 172 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 128 L28 118 L72 118 L62 128" fill="#FFFFFF" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <path d="M72 128 L82 118 L82 162 L72 172" fill={`url(#${id}-strap)`} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 146 L60 146" stroke={accent} strokeWidth="2" strokeDasharray="4 4" opacity="0.75" />
      </g>
    </svg>
  );
}

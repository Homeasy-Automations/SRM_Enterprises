import type { ArtProps } from "./types";

/** Poly bags, films & flexible packaging: film rolls, a printed bag and stretch wrap. */
export function FilmArt({ accent = "#10B981", className, title = "Poly bags and flexible packaging illustration" }: ArtProps): JSX.Element {
  const id = `filmart-${accent.replace("#", "")}`;
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
        <linearGradient id={`${id}-roll`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`${id}-bag`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.18" />
        </linearGradient>
      </defs>

      <ellipse cx="110" cy="180" rx="88" ry="11" fill={accent} opacity="0.14" />

      {/* Two film rolls */}
      <g>
        <rect x="24" y="70" width="70" height="82" rx="10" fill={`url(#${id}-roll)`} stroke={accent} strokeWidth="2" />
        <ellipse cx="94" cy="111" rx="16" ry="41" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
        <ellipse cx="94" cy="111" rx="6" ry="15" fill={accent} opacity="0.3" />
        <path d="M36 84 q14 27 0 54" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.55" />
      </g>
      <g opacity="0.95">
        <rect x="42" y="126" width="66" height="46" rx="9" fill={`url(#${id}-roll)`} stroke={accent} strokeWidth="2" />
        <ellipse cx="108" cy="149" rx="14" ry="23" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
        <ellipse cx="108" cy="149" rx="5" ry="9" fill={accent} opacity="0.3" />
      </g>

      {/* Printed poly bag */}
      <g>
        <path
          d="M132 44 L196 44 L196 146 L132 146 Z"
          fill={`url(#${id}-bag)`}
          stroke={accent}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M132 44 L146 32 L210 32 L196 44" fill="#FFFFFF" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <path d="M196 44 L210 32 L210 134 L196 146" fill={`url(#${id}-roll)`} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <rect x="146" y="70" width="42" height="12" rx="4" fill={accent} opacity="0.45" />
        <rect x="146" y="90" width="30" height="8" rx="4" fill={accent} opacity="0.3" />
        {/* Weld line */}
        <path d="M134 128 L194 128" stroke={accent} strokeWidth="2" strokeDasharray="5 4" opacity="0.8" />
      </g>

      {/* Stretch film wrapping motion */}
      <g opacity="0.85">
        <path d="M22 52 q26 -22 52 0" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="7 6" />
      </g>
    </svg>
  );
}

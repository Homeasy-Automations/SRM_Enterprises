import type { ArtProps } from "./types";

/** Corrugated packaging: stacked boxes, sheet stack and a die-cut box outline. */
export function BoxArt({ accent = "#FF8A2B", className, title = "Corrugated packaging illustration", flat = false }: ArtProps): JSX.Element {
  const id = `boxart-${accent.replace("#", "")}`;
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
        <linearGradient id={`${id}-g1`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${id}-g2`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {!flat ? (
        <>
          {/* Floor shadow */}
          <ellipse cx="110" cy="176" rx="86" ry="12" fill={accent} opacity="0.14" />
          {/* Stacked sheets */}
          <g>
            <rect x="18" y="150" width="72" height="10" rx="4" fill={`url(#${id}-g1)`} stroke={accent} strokeWidth="1.6" />
            <rect x="22" y="139" width="64" height="10" rx="4" fill={`url(#${id}-g1)`} stroke={accent} strokeWidth="1.6" />
            <rect x="26" y="128" width="56" height="10" rx="4" fill={`url(#${id}-g2)`} stroke={accent} strokeWidth="1.6" />
          </g>
        </>
      ) : null}

      {/* Main box */}
      <g>
        <path d="M74 96 L142 96 L142 156 L74 156 Z" fill={`url(#${id}-g1)`} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <path d="M74 96 L96 78 L164 78 L142 96 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <path d="M142 96 L164 78 L164 138 L142 156 Z" fill={`url(#${id}-g2)`} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <path d="M74 96 L138 96" stroke={accent} strokeWidth="1.4" strokeDasharray="4 4" opacity="0.7" />
        <path d="M108 96 L108 156" stroke={accent} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.55" />
        {/* Tape strip */}
        <rect x="118" y="78" width="16" height="18" fill={accent} opacity="0.85" transform="skewX(-28)" />
      </g>

      {/* Die-cut flat box outline */}
      <g opacity="0.9">
        <path
          d="M20 40 L58 40 L58 26 L96 26 L96 40 L134 40 L134 78 L120 78 L120 92 L58 92 L58 78 L20 78 Z"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinejoin="round"
        />
      </g>

      {/* Corrugation detail */}
      <g opacity="0.75">
        <path d="M172 52 q8 8 0 16 q-8 8 0 16" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M184 52 q8 8 0 16 q-8 8 0 16" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
      </g>
    </svg>
  );
}

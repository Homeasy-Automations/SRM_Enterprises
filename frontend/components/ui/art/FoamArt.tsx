import type { ArtProps } from "./types";

/** EPE foam: foam roll, cut sheets and a fitted component tray. */
export function FoamArt({ accent = "#19C3E6", className, title = "EPE foam packaging illustration" }: ArtProps): JSX.Element {
  const id = `foamart-${accent.replace("#", "")}`;
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
          <stop offset="100%" stopColor={accent} stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`${id}-sheet`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.22" />
        </linearGradient>
      </defs>

      <ellipse cx="110" cy="178" rx="88" ry="12" fill={accent} opacity="0.14" />

      {/* Foam roll */}
      <g>
        <rect x="30" y="86" width="92" height="66" rx="10" fill={`url(#${id}-roll)`} stroke={accent} strokeWidth="2" />
        <ellipse cx="122" cy="119" rx="20" ry="33" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
        <ellipse cx="122" cy="119" rx="8" ry="13" fill={`url(#${id}-roll)`} stroke={accent} strokeWidth="1.6" />
        <path d="M44 96 q16 22 0 46" fill="none" stroke={accent} strokeWidth="1.6" opacity="0.6" />
        <path d="M58 92 q16 26 0 54" fill="none" stroke={accent} strokeWidth="1.6" opacity="0.45" />
      </g>

      {/* Unrolled sheet */}
      <g>
        <path d="M118 156 L206 156 L206 122 L118 122 Z" fill={`url(#${id}-sheet)`} stroke={accent} strokeWidth="2" />
        <path d="M132 122 L152 106 L212 106 L206 122 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
        <path d="M118 122 L132 106" stroke={accent} strokeWidth="1.4" opacity="0.5" />
      </g>

      {/* Component tray with fitment cut-outs */}
      <g transform="translate(24,26)">
        <rect x="0" y="0" width="120" height="52" rx="10" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
        <rect x="12" y="12" width="26" height="28" rx="6" fill={accent} opacity="0.4" />
        <circle cx="66" cy="26" r="14" fill={accent} opacity="0.4" />
        <rect x="88" y="12" width="20" height="28" rx="6" fill={accent} opacity="0.4" />
      </g>

      {/* Thickness markers */}
      <g opacity="0.8">
        <path d="M170 44 L200 44" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <path d="M170 52 L196 52" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M170 60 L192 60" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </g>
    </svg>
  );
}

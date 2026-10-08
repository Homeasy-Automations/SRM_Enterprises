import type { ArtProps } from "./types";

/** LDPE bubble & protective packaging: bubble roll with a repeating bubble field. */
export function BubbleArt({ accent = "#8B5CF6", className, title = "Air bubble protective packaging illustration" }: ArtProps): JSX.Element {
  const id = `bubbleart-${accent.replace("#", "")}`;
  const bubbles: { cx: number; cy: number }[] = [];
  for (let row = 0; row < 5; row += 1) {
    for (let column = 0; column < 8; column += 1) {
      bubbles.push({ cx: 44 + column * 17 + (row % 2 === 0 ? 0 : 8), cy: 52 + row * 17 });
    }
  }

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
        <linearGradient id={`${id}-film`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={`${id}-bubble`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.55" />
        </radialGradient>
      </defs>

      <ellipse cx="110" cy="182" rx="90" ry="11" fill={accent} opacity="0.14" />

      {/* Roll body */}
      <g>
        <rect x="30" y="36" width="120" height="128" rx="14" fill={`url(#${id}-film)`} stroke={accent} strokeWidth="2" />
        {bubbles.map((bubble, index) => (
          <circle
            key={`${bubble.cx}-${bubble.cy}-${index}`}
            cx={bubble.cx}
            cy={bubble.cy}
            r="6"
            fill={`url(#${id}-bubble)`}
            stroke={accent}
            strokeWidth="1"
            opacity="0.95"
          />
        ))}
      </g>

      {/* Core of the roll */}
      <g>
        <ellipse cx="150" cy="100" rx="18" ry="64" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
        <ellipse cx="150" cy="100" rx="7" ry="24" fill={accent} opacity="0.35" />
      </g>

      {/* Peeling film with pouches */}
      <g>
        <path d="M28 158 C6 150 10 126 30 122" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="6 5" />
        <rect x="150" y="140" width="58" height="34" rx="8" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
        <circle cx="166" cy="157" r="4" fill={accent} opacity="0.5" />
        <circle cx="180" cy="157" r="4" fill={accent} opacity="0.5" />
        <circle cx="194" cy="157" r="4" fill={accent} opacity="0.5" />
      </g>

      {/* Protection shield mark */}
      <g transform="translate(158,26)">
        <path
          d="M22 0 L44 9 V26 C44 38 34 46 22 52 C10 46 0 38 0 26 V9 Z"
          fill="#FFFFFF"
          stroke={accent}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M12 26 L19 33 L32 19" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

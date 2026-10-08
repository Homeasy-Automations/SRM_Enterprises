import type { ArtProps } from "./types";

/** Dispatch truck — used in the supply capability strip and service-area sections. */
export function TruckArt({ accent = "#1E6FFF", className, title = "Dispatch and supply illustration" }: ArtProps): JSX.Element {
  const id = `truck-${accent.replace("#", "")}`;
  return (
    <svg viewBox="0 0 240 160" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="140" rx="100" ry="10" fill={accent} opacity="0.13" />
      {[36, 96, 148].map((x) => (
        <rect key={x} x={x} y="16" width="26" height="22" rx="5" fill={accent} opacity="0.25" />
      ))}
      <path d="M12 96 L12 54 L150 54 L150 96 Z" fill={`url(#${id}-body)`} stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M150 66 L192 66 L214 92 L214 96 L150 96 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M158 74 L188 74 L202 90 L158 90 Z" fill={accent} opacity="0.28" />
      <rect x="12" y="96" width="202" height="10" rx="4" fill={accent} opacity="0.45" />
      <path d="M12 74 L150 74" stroke={accent} strokeWidth="1.4" strokeDasharray="7 6" opacity="0.6" />
      <circle cx="60" cy="116" r="15" fill="#FFFFFF" stroke={accent} strokeWidth="3" />
      <circle cx="60" cy="116" r="5" fill={accent} opacity="0.5" />
      <circle cx="176" cy="116" r="15" fill="#FFFFFF" stroke={accent} strokeWidth="3" />
      <circle cx="176" cy="116" r="5" fill={accent} opacity="0.5" />
      <path d="M224 40 q10 10 0 20 q-10 10 0 20" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/** Factory skyline — packaging facility & production capability. */
export function FactoryArt({ accent = "#19B26B", className, title = "Packaging facility illustration" }: ArtProps): JSX.Element {
  const id = `factory-${accent.replace("#", "")}`;
  return (
    <svg viewBox="0 0 240 160" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="138" rx="104" ry="10" fill={accent} opacity="0.13" />
      {/* Saw-tooth roof */}
      <path d="M24 76 L54 52 L54 76 L84 52 L84 76 L114 52 L114 76 L144 52 L144 76 L174 52 L174 76 L204 52 L204 100 L24 100 Z" fill={`url(#${id}-wall)`} stroke={accent} strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="24" y="100" width="180" height="34" rx="6" fill="#FFFFFF" stroke={accent} strokeWidth="2.2" />
      {[44, 74, 104, 134, 164, 190].map((x) => (
        <rect key={x} x={x} y="108" width="16" height="18" rx="3" fill={accent} opacity="0.25" />
      ))}
      {/* Chimney with light puffs */}
      <rect x="198" y="30" width="16" height="46" rx="4" fill={accent} opacity="0.35" stroke={accent} strokeWidth="2" />
      <circle cx="206" cy="24" r="7" fill={accent} opacity="0.22" />
      <circle cx="216" cy="12" r="5" fill={accent} opacity="0.16" />
      {/* Forklift silhouette */}
      <g opacity="0.9">
        <rect x="18" y="108" width="4" height="22" rx="2" fill={accent} />
        <path d="M22 112 L40 112 L40 124 L26 124 Z" fill={accent} opacity="0.5" />
      </g>
    </svg>
  );
}

/** Warehouse shelving — storage, dispatch planning and inventory. */
export function WarehouseArt({ accent = "#8B5CF6", className, title = "Warehouse and dispatch illustration" }: ArtProps): JSX.Element {
  const id = `warehouse-${accent.replace("#", "")}`;
  const boxes = [
    { x: 20, y: 104, w: 34, h: 26 },
    { x: 60, y: 104, w: 30, h: 26 },
    { x: 20, y: 70, w: 26, h: 26 },
    { x: 52, y: 70, w: 38, h: 26 },
    { x: 96, y: 104, w: 30, h: 26 },
    { x: 132, y: 104, w: 34, h: 26 },
    { x: 96, y: 70, w: 36, h: 26 },
    { x: 138, y: 70, w: 28, h: 26 },
  ];
  return (
    <svg viewBox="0 0 240 160" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id={`${id}-box`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="140" rx="100" ry="10" fill={accent} opacity="0.13" />
      {/* Racking */}
      <rect x="12" y="18" width="8" height="118" rx="3" fill={accent} opacity="0.45" />
      <rect x="176" y="18" width="8" height="118" rx="3" fill={accent} opacity="0.45" />
      <rect x="12" y="52" width="172" height="7" rx="3" fill={accent} opacity="0.3" />
      <rect x="12" y="94" width="172" height="7" rx="3" fill={accent} opacity="0.3" />
      <rect x="12" y="132" width="172" height="7" rx="3" fill={accent} opacity="0.3" />
      {boxes.map((box) => (
        <rect
          key={`${box.x}-${box.y}`}
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          rx="4"
          fill={`url(#${id}-box)`}
          stroke={accent}
          strokeWidth="2"
        />
      ))}
      {/* Pallet plus scanner beam */}
      <path d="M196 118 L228 118 L228 132 L196 132 Z" fill={accent} opacity="0.3" />
      <path d="M198 118 L198 140 M206 118 L206 140 M214 118 L214 140 M222 118 L222 140" stroke={accent} strokeWidth="2" opacity="0.5" />
      <path d="M180 30 L212 44" stroke={accent} strokeWidth="2" strokeDasharray="5 5" opacity="0.7" />
      <circle cx="214" cy="45" r="6" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
    </svg>
  );
}

/** Quality certification & material testing — high quality materials capability. */
export function QualityArt({ accent = "#19B26B", className, title = "High quality materials illustration" }: ArtProps): JSX.Element {
  const id = `quality-${accent.replace("#", "")}`;
  return (
    <svg viewBox="0 0 240 160" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={`${id}-badge`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      {/* Floor shadow */}
      <ellipse cx="120" cy="140" rx="100" ry="10" fill={accent} opacity="0.13" />

      {/* Layered material inspection sheets */}
      <rect x="22" y="112" width="76" height="12" rx="3" fill="#FFFFFF" stroke={accent} strokeWidth="1.8" />
      <rect x="26" y="98" width="68" height="12" rx="3" fill={`url(#${id}-grad)`} stroke={accent} strokeWidth="1.8" />
      <rect x="30" y="84" width="60" height="12" rx="3" fill="#FFFFFF" stroke={accent} strokeWidth="1.8" />
      <path d="M38 90 L68 90" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M34 104 L64 104" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M30 118 L60 118" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.6" />

      {/* Quality Badge / Shield with Checkmark */}
      <g transform="translate(108, 22)">
        {/* Outer Ribbon streamers */}
        <path d="M18 78 L6 112 L22 104 L34 112 L24 78 Z" fill={accent} opacity="0.45" />
        <path d="M62 78 L52 112 L64 104 L80 112 L68 78 Z" fill={accent} opacity="0.45" />
        {/* Starburst ring / badge */}
        <circle cx="43" cy="50" r="38" fill={`url(#${id}-grad)`} stroke={accent} strokeWidth="2.5" />
        <circle cx="43" cy="50" r="30" fill={`url(#${id}-badge)`} />
        {/* Crisp White Checkmark */}
        <path d="M33 50 L40 57 L54 42" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Star sparkles */}
        <circle cx="15" cy="18" r="3" fill={accent} opacity="0.75" />
        <circle cx="70" cy="20" r="4" fill={accent} opacity="0.65" />
      </g>

      {/* Caliper / Inspection measurement gauge */}
      <g opacity="0.85">
        <path d="M188 64 L188 126" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <path d="M174 72 L202 72" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M174 118 L202 118" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M184 84 L192 84 M184 94 L192 94 M184 104 L192 104" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="188" cy="62" r="5" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
      </g>
    </svg>
  );
}

/** Custom packaging & precision sizing — custom packaging solutions capability. */
export function CustomDesignArt({ accent = "#8B5CF6", className, title = "Custom packaging solutions illustration" }: ArtProps): JSX.Element {
  const id = `custom-${accent.replace("#", "")}`;
  return (
    <svg viewBox="0 0 240 160" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id={`${id}-box`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
      {/* Floor shadow */}
      <ellipse cx="120" cy="140" rx="100" ry="10" fill={accent} opacity="0.13" />

      {/* 3D Custom Box with Open Flaps */}
      <g transform="translate(68, 48)">
        {/* Main front face */}
        <path d="M8 38 L68 38 L68 84 L8 84 Z" fill={`url(#${id}-box)`} stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        {/* Side face */}
        <path d="M68 38 L104 18 L104 64 L68 84 Z" fill={`url(#${id}-box)`} stroke={accent} strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
        {/* Top open flaps */}
        <path d="M8 38 L44 18 L104 18 L68 38 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 38 L-12 24 L24 16 L44 18 Z" fill={`url(#${id}-top)`} opacity="0.6" stroke={accent} strokeWidth="1.6" />
        <path d="M68 38 L104 18 L124 28 L88 48 Z" fill={`url(#${id}-top)`} opacity="0.75" stroke={accent} strokeWidth="1.6" />
        {/* Fold crease line */}
        <path d="M38 38 L38 84" stroke={accent} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.6" />
      </g>

      {/* Measurement / Dimension arrows (<--->) */}
      <g opacity="0.85">
        {/* Horizontal width measurement */}
        <line x1="74" y1="140" x2="136" y2="140" stroke={accent} strokeWidth="1.8" />
        <path d="M78 137 L74 140 L78 143 M132 137 L136 140 L132 143" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Vertical height measurement */}
        <line x1="62" y1="88" x2="62" y2="132" stroke={accent} strokeWidth="1.8" />
        <path d="M59 92 L62 88 L65 92 M59 128 L62 132 L65 128" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Precision drafting ruler across the top */}
      <g transform="translate(18, 22) rotate(-8)">
        <rect x="0" y="0" width="88" height="16" rx="3" fill="#FFFFFF" stroke={accent} strokeWidth="1.8" />
        {[6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 82].map((x, i) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2={i % 3 === 0 ? 9 : 5}
            stroke={accent}
            strokeWidth={i % 3 === 0 ? "1.6" : "1"}
          />
        ))}
      </g>

      {/* Blueprint grid dots */}
      <g fill={accent} opacity="0.35">
        <circle cx="196" cy="38" r="2" />
        <circle cx="212" cy="38" r="2" />
        <circle cx="196" cy="54" r="2" />
        <circle cx="212" cy="54" r="2" />
        <circle cx="196" cy="70" r="2" />
        <circle cx="212" cy="70" r="2" />
      </g>
    </svg>
  );
}

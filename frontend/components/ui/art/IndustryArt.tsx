import type { ArtProps } from "./types";

/** Shared scene frame so all six industry panels feel like one family. */
function SceneFrame({
  accent,
  title,
  className,
  children,
  id,
}: ArtProps & { children: React.ReactNode; id: string }): JSX.Element {
  return (
    <svg viewBox="0 0 240 160" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="228" height="148" rx="20" fill={`url(#${id}-panel)`} />
      <ellipse cx="120" cy="136" rx="96" ry="9" fill={accent} opacity="0.14" />
      {children}
    </svg>
  );
}

export function AutomotiveArt({ accent = "#1E6FFF", className, title = "Automotive and auto components packaging illustration" }: ArtProps): JSX.Element {
  const id = "ind-auto";
  return (
    <SceneFrame accent={accent} title={title} className={className} id={id}>
      {/* Car body */}
      <path d="M34 102 L52 74 L150 74 L172 102 L34 102 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M60 78 L92 78 L92 96 L46 96 Z" fill={accent} opacity="0.25" />
      <path d="M104 78 L144 78 L156 96 L104 96 Z" fill={accent} opacity="0.18" />
      <rect x="28" y="100" width="152" height="12" rx="6" fill={accent} opacity="0.45" />
      <circle cx="64" cy="116" r="13" fill="#FFFFFF" stroke={accent} strokeWidth="3" />
      <circle cx="148" cy="116" r="13" fill="#FFFFFF" stroke={accent} strokeWidth="3" />
      {/* Packed component box */}
      <g transform="translate(170,58)">
        <path d="M0 16 L30 16 L30 48 L0 48 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2.2" />
        <path d="M0 16 L10 6 L40 6 L30 16" fill="#FFFFFF" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M30 16 L40 6 L40 38 L30 48" fill={accent} opacity="0.22" stroke={accent} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M8 28 L22 28" stroke={accent} strokeWidth="2" strokeDasharray="3 3" />
      </g>
      <path d="M186 44 q12 8 0 16" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
    </SceneFrame>
  );
}

export function EngineeringArt({ accent = "#FF8A2B", className, title = "Engineering and industrial packaging illustration" }: ArtProps): JSX.Element {
  const id = "ind-eng";
  return (
    <SceneFrame accent={accent} title={title} className={className} id={id}>
      {/* Gear */}
      <g transform="translate(52,58)">
        <circle cx="34" cy="34" r="26" fill="#FFFFFF" stroke={accent} strokeWidth="2.6" />
        <circle cx="34" cy="34" r="10" fill={accent} opacity="0.3" />
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index * Math.PI) / 4;
          const x1 = 34 + Math.cos(angle) * 26;
          const y1 = 34 + Math.sin(angle) * 26;
          const x2 = 34 + Math.cos(angle) * 36;
          const y2 = 34 + Math.sin(angle) * 36;
          return <path key={index} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={accent} strokeWidth="5" strokeLinecap="round" />;
        })}
      </g>
      {/* Machined block */}
      <g>
        <path d="M136 66 L196 66 L196 112 L136 112 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" />
        <path d="M136 66 L148 54 L208 54 L196 66" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M196 66 L208 54 L208 100 L196 112" fill={accent} opacity="0.2" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
        <circle cx="152" cy="82" r="5" fill={accent} opacity="0.4" />
        <circle cx="170" cy="82" r="5" fill={accent} opacity="0.4" />
        <circle cx="152" cy="98" r="5" fill={accent} opacity="0.4" />
        <path d="M166 92 L188 92" stroke={accent} strokeWidth="2" opacity="0.5" />
      </g>
      {/* Edge protection strip */}
      <path d="M40 122 L120 122" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.3" />
    </SceneFrame>
  );
}

export function ElectronicsArt({ accent = "#8B5CF6", className, title = "Electrical and electronics packaging illustration" }: ArtProps): JSX.Element {
  const id = "ind-eln";
  return (
    <SceneFrame accent={accent} title={title} className={className} id={id}>
      {/* PCB */}
      <rect x="36" y="42" width="108" height="76" rx="10" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" />
      <path d="M50 56 L84 56 L84 84 L120 84" fill="none" stroke={accent} strokeWidth="2.2" opacity="0.6" />
      <path d="M50 96 L76 96 L76 72 L112 72" fill="none" stroke={accent} strokeWidth="2.2" opacity="0.4" />
      <rect x="64" y="76" width="26" height="20" rx="4" fill={accent} opacity="0.35" />
      <circle cx="126" cy="60" r="6" fill={accent} opacity="0.35" />
      <circle cx="126" cy="98" r="6" fill={accent} opacity="0.35" />
      {/* ESD bag around the PCB */}
      <path d="M28 34 L154 34 L154 128 L28 128 Z" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="8 6" opacity="0.8" />
      {/* Anti-static mark */}
      <g transform="translate(164,50)">
        <path d="M22 0 L44 12 L22 24 L0 12 Z" fill={accent} opacity="0.3" stroke={accent} strokeWidth="2" strokeLinejoin="round" />
        <path d="M22 26 L22 62" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <path d="M12 50 L22 62 L32 50" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M170 108 L200 108" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.3" />
    </SceneFrame>
  );
}

export function PharmaArt({ accent = "#19B26B", className, title = "Pharmaceutical packaging illustration" }: ArtProps): JSX.Element {
  const id = "ind-ph";
  return (
    <SceneFrame accent={accent} title={title} className={className} id={id}>
      {/* Vial */}
      <g>
        <rect x="52" y="52" width="34" height="66" rx="8" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" />
        <rect x="60" y="38" width="18" height="16" rx="4" fill={accent} opacity="0.4" />
        <path d="M56 88 L82 88" stroke={accent} strokeWidth="2" opacity="0.5" />
        <path d="M56 100 L82 100" stroke={accent} strokeWidth="2" opacity="0.35" />
      </g>
      {/* Blister strips */}
      <g>
        <rect x="104" y="48" width="74" height="26" rx="8" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" />
        {[118, 132, 146, 160].map((cx) => (
          <circle key={cx} cx={cx} cy="61" r="7" fill={accent} opacity="0.35" />
        ))}
        <rect x="104" y="82" width="74" height="26" rx="8" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" />
        {[118, 132, 146, 160].map((cx) => (
          <circle key={cx} cx={cx} cy="95" r="7" fill={accent} opacity="0.35" />
        ))}
      </g>
      {/* Sealed protective pouch */}
      <g>
        <path d="M188 52 L224 52 L224 118 L188 118 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2.2" strokeDasharray="7 5" />
        <path d="M192 70 L220 70" stroke={accent} strokeWidth="2" opacity="0.5" />
      </g>
      <path d="M40 40 L96 40" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.25" />
    </SceneFrame>
  );
}

export function FoodArt({ accent = "#FFC93C", className, title = "Food and FMCG packaging illustration" }: ArtProps): JSX.Element {
  const id = "ind-food";
  return (
    <SceneFrame accent={accent} title={title} className={className} id={id}>
      {/* Carton */}
      <g>
        <path d="M46 60 L122 60 L122 122 L46 122 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" />
        <path d="M46 60 L62 44 L138 44 L122 60" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M122 60 L138 44 L138 106 L122 122" fill={accent} opacity="0.2" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
        <rect x="62" y="80" width="44" height="16" rx="6" fill={accent} opacity="0.4" />
      </g>
      {/* Bottles */}
      <g>
        <rect x="152" y="70" width="24" height="52" rx="8" fill="#FFFFFF" stroke={accent} strokeWidth="2.2" />
        <rect x="158" y="58" width="12" height="14" rx="3" fill={accent} opacity="0.4" />
        <rect x="186" y="80" width="22" height="42" rx="8" fill="#FFFFFF" stroke={accent} strokeWidth="2.2" />
        <rect x="192" y="70" width="10" height="12" rx="3" fill={accent} opacity="0.4" />
      </g>
      {/* Poly bag */}
      <path d="M28 78 L28 128 L44 128 L44 78 Z" fill={accent} opacity="0.18" stroke={accent} strokeWidth="2" />
      <path d="M28 128 L46 128" stroke={accent} strokeWidth="3" strokeDasharray="4 4" opacity="0.7" />
      <path d="M146 132 L220 132" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.25" />
    </SceneFrame>
  );
}

export function LogisticsArt({ accent = "#19C3E6", className, title = "E-commerce and logistics packaging illustration" }: ArtProps): JSX.Element {
  const id = "ind-lg";
  return (
    <SceneFrame accent={accent} title={title} className={className} id={id}>
      {/* Parcels */}
      <g>
        <path d="M34 66 L86 66 L86 112 L34 112 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" />
        <path d="M34 66 L44 56 L96 56 L86 66" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M86 66 L96 56 L96 102 L86 112" fill={accent} opacity="0.2" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
        <rect x="54" y="56" width="12" height="14" fill={accent} opacity="0.5" />
        <path d="M42 84 L78 84" stroke={accent} strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      </g>
      <g>
        <path d="M96 88 L140 88 L140 124 L96 124 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" />
        <path d="M96 88 L104 80 L148 80 L140 88" fill="#FFFFFF" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M140 88 L148 80 L148 116 L140 124" fill={accent} opacity="0.2" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M106 88 L106 124" stroke={accent} strokeWidth="2" opacity="0.5" />
      </g>
      {/* Conveyor / sorting arrows */}
      <path d="M30 132 L210 132" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.3" />
      <path d="M160 62 L206 62 M192 52 L206 62 L192 72" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="176" cy="100" r="16" fill="#FFFFFF" stroke={accent} strokeWidth="2.2" />
      <path d="M170 100 L182 100 M176 94 L176 106" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
    </SceneFrame>
  );
}

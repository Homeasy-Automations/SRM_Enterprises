import { cn } from "@/lib/utils";

interface WavyDividerProps {
  /** Colour of the wave fill — usually a category colour or white. */
  color?: string;
  /** Flip the wave vertically (bottom-of-section use). */
  flip?: boolean;
  className?: string;
  /** Subtle gradient second wave on top of the flat one. */
  layered?: boolean;
}

/**
 * Wavy SVG section divider. Pure SVG, no image request, no layout shift —
 * the shape scales to any viewport from 320px to 2560px+.
 */
export function WavyDivider({
  color = "#FFFFFF",
  flip = false,
  className,
  layered = false,
}: WavyDividerProps): JSX.Element {
  const gradientId = `wave-${color.replace("#", "")}${flip ? "-flip" : ""}${layered ? "-layered" : ""}`;

  return (
    <div
      className={cn("pointer-events-none relative w-full leading-[0]", flip && "rotate-180", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-[52px] w-full sm:h-[70px] lg:h-[86px]"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.95" />
            <stop offset="55%" stopColor={color} stopOpacity="0.75" />
            <stop offset="100%" stopColor={color} stopOpacity="0.95" />
          </linearGradient>
        </defs>
        {layered ? (
          <path
            d="M0,64 C180,116 320,8 520,44 C700,76 820,124 1020,86 C1200,52 1320,20 1440,58 L1440,120 L0,120 Z"
            fill={color}
            opacity="0.28"
          />
        ) : null}
        <path
          d="M0,80 C160,32 320,120 480,84 C640,48 780,12 960,52 C1140,92 1300,116 1440,72 L1440,120 L0,120 Z"
          fill={layered ? `url(#${gradientId})` : color}
        />
      </svg>
    </div>
  );
}

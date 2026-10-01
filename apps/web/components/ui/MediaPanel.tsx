import Image from "next/image";
import type { ReactNode } from "react";
import { getImageSlot } from "@/lib/image-config";
import { cn } from "@/lib/utils";

interface MediaPanelProps {
  /** Key from lib/image-config.ts — the panel switches to a real photo when one is set. */
  imageKey: string;
  accent: string;
  /** Illustration shown while no photograph is configured. */
  children: ReactNode;
  className?: string;
  aspect?: "square" | "video" | "portrait" | "wide";
  priority?: boolean;
  /** Decorative overlay pattern on top of the gradient. */
  pattern?: boolean;
}

const ASPECT_CLASS = {
  square: "aspect-square",
  video: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
} as const;

/**
 * Colorful illustrated gradient panel used everywhere a photograph would normally sit.
 * No external image requests, no broken visuals — and a typed hook for dropping real
 * photos in later without touching any component code.
 */
export function MediaPanel({
  imageKey,
  accent,
  children,
  className,
  aspect = "video",
  priority = false,
  pattern = true,
}: MediaPanelProps): JSX.Element {
  const slot = getImageSlot(imageKey);
  const hasPhoto = Boolean(slot?.src);

  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden rounded-[28px] border border-white/60 shadow-card",
        ASPECT_CLASS[aspect],
        className,
      )}
      style={{
        background: `linear-gradient(140deg, ${accent}26 0%, #FFFFFF 45%, ${accent}14 100%)`,
      }}
    >
      {pattern ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(${accent}33 1.6px, transparent 1.6px)`,
            backgroundSize: "22px 22px",
          }}
        />
      ) : null}

      {hasPhoto && slot ? (
        <Image
          src={`/images/${slot.src ?? ""}`}
          alt={slot.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="h-full w-full max-w-[520px]">{children}</div>
        </div>
      )}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55, transparent)` }}
      />
    </div>
  );
}

import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";
import { cn } from "@/lib/utils";

export interface FeatureGridItem {
  title: string;
  description: string;
  /** Optional second paragraph revealed by the "Read more" disclosure. */
  detail?: string;
  icon?: string;
  color?: string;
  /** Optional small tag line shown at the bottom of the card. */
  tag?: string;
}

interface FeatureGridProps {
  items: FeatureGridItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  columns?: 2 | 3 | 4;
  className?: string;
  /** Render without the surrounding section heading (used inside already-titled sections). */
  bare?: boolean;
  band?: "white" | "sky" | "cream" | "none";
  id?: string;
}

const BAND_CLASS = {
  white: "band-white",
  sky: "band-sky",
  cream: "band-cream",
  none: "",
} as const;

const COLUMN_CLASS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Reusable animated feature grid: lift + tilt cards, coloured soft shadows, icon bounce.
 * Used for capabilities, quality/supply philosophy, customisation points, protection
 * features and industry approach lists — so every one of those sections animates the
 * same way without duplicating markup.
 */
export function FeatureGrid({
  items,
  eyebrow,
  title,
  description,
  columns = 3,
  className,
  bare = false,
  band = "white",
  id,
}: FeatureGridProps): JSX.Element {
  return (
    <section id={id} className={cn(BAND_CLASS[band], !bare && "section-pad", "relative", className)}>
      <div className="container-page">
        {!bare && title ? (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            className="max-w-3xl"
          />
        ) : null}

        <StaggerGroup
          className={cn("grid gap-5", COLUMN_CLASS[columns], !bare && title && "mt-10")}
          stagger={0.08}
        >
          {items.map((item, index) => {
            const color = item.color ?? ["#1E6FFF", "#19B26B", "#FFC93C", "#8B5CF6", "#FF8A2B"][index % 5] ?? "#1E6FFF";
            return (
              <StaggerItem key={`${item.title}-${index}`} variant="flip-up" className="h-full">
                <TiltCard accentColor={color} className="h-full">
                  <div className="flex h-full flex-col gap-3 p-6">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{ background: color }}
                    >
                      <CategoryIcon name={item.icon ?? "box"} className="h-6 w-6" color="#FFFFFF" />
                    </span>

                    <h3 className="font-ui text-lg font-bold text-navy">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-navy-soft">{item.description}</p>

                    {item.detail ? (
                      <details className="group/detail mt-auto">
                        <summary
                          className="font-ui cursor-pointer list-none text-xs font-bold uppercase tracking-[0.12em]"
                          style={{ color }}
                        >
                          <span className="group-open/detail:hidden">Read more</span>
                          <span className="hidden group-open/detail:inline">Show less</span>
                        </summary>
                        <p className="mt-2 text-xs leading-relaxed text-navy-soft">{item.detail}</p>
                      </details>
                    ) : null}

                    {item.tag ? (
                      <span
                        className="font-ui mt-auto text-xs font-semibold uppercase tracking-[0.12em]"
                        style={{ color }}
                      >
                        {item.tag}
                      </span>
                    ) : null}
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

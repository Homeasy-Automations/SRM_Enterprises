import { CAPABILITIES } from "@/lib/constants";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { FactoryArt, TruckArt, QualityArt, CustomDesignArt } from "@/components/ui/art";

const ART_BY_ICON: Record<string, JSX.Element> = {
  factory: <FactoryArt accent="#1E6FFF" className="h-16 w-full" />,
  badge: <QualityArt accent="#19B26B" className="h-16 w-full" />,
  truck: <TruckArt accent="#FFC93C" className="h-16 w-full" />,
  ruler: <CustomDesignArt accent="#8B5CF6" className="h-16 w-full" />,
};

/** Four-up capability strip directly under the hero. */
export function CapabilityStrip(): JSX.Element {
  return (
    <section className="band-sky section-pad-sm relative" aria-label="What SRM Enterprises does">
      <div className="container-page">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((capability) => (
            <StaggerItem key={capability.title} className="h-full">
              <article
                className="surface-card group h-full p-6 hover:-translate-y-1.5 hover:shadow-lift"
                style={{ ["--accent" as string]: capability.color }}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: capability.color }}
                >
                  <CategoryIcon name={capability.icon} className="h-6 w-6" color="#FFFFFF" />
                </span>
                <h2 className="mt-4 font-display text-lg font-bold text-navy">{capability.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-soft">{capability.description}</p>
                {/* Small illustrated flourish — swaps in per capability */}
                <div className="mt-4 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                  {ART_BY_ICON[capability.icon] ?? (
                    <div className="h-1.5 w-full rounded-full" style={{ background: `${capability.color}33` }} />
                  )}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

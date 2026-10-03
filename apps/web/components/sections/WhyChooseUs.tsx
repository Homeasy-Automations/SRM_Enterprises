import { WHY_CHOOSE_CLOSING_LINE, WHY_CHOOSE_US } from "@/lib/constants";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/animations/TiltCard";

/** Four qualitative reasons — no statistics, no invented claims anywhere. */
export function WhyChooseUs(): JSX.Element {
  return (
    <section className="band-sky section-pad relative pattern-dots" aria-labelledby="why-choose-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="A packaging partner that keeps the promise it made in the sample"
          description="Four things industrial buyers care about most: material quality, customisation, commercial value and dependable supply."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {WHY_CHOOSE_US.map((reason) => (
            <StaggerItem key={reason.key} variant="kinetic-pop" className="h-full">
              <TiltCard accentColor={reason.color} className="card-home-vivid h-full">
                <div className="flex h-full flex-col gap-4 p-6">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: reason.color }}
                  >
                    <CategoryIcon name={reason.icon} className="h-7 w-7" color="#FFFFFF" />
                  </span>

                  <h3 className="font-display text-xl font-bold text-navy transition-all duration-300 group-hover:text-accent group-hover:translate-x-1">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-navy-soft">{reason.description}</p>

                  <details className="group/detail mt-auto">
                    <summary
                      className="cursor-pointer list-none text-xs font-bold uppercase tracking-wide transition-colors"
                      style={{ color: reason.color }}
                    >
                      <span className="group-open/detail:hidden">Read more</span>
                      <span className="hidden group-open/detail:inline">Show less</span>
                    </summary>
                    <p className="mt-2 text-xs leading-relaxed text-navy-soft">{reason.detail}</p>
                  </details>

                  <span
                    aria-hidden="true"
                    className="mt-2 block h-1.5 w-12 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ background: `linear-gradient(90deg, ${reason.color}, ${reason.color}44)` }}
                  />
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal variant="depth-zoom" delay={0.1} className="mt-10">
          <p className="card-interactive mx-auto max-w-3xl rounded-2xl border border-navy/10 bg-white px-6 py-5 text-center text-sm font-semibold leading-relaxed text-navy shadow-soft sm:text-base hover:border-accent/40">
            {WHY_CHOOSE_CLOSING_LINE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

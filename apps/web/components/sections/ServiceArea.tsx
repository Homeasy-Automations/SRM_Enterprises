import { MapPin, Truck } from "lucide-react";
import { BRAND } from "@srm/config";
import { SERVICE_AREA_NOTE } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/animations/Reveal";
import { TruckArt } from "@/components/ui/art";

const LOCATION_DETAIL: Record<string, string> = {
  Gurugram: "Primary industrial and commercial supply base",
  Manesar: "Manufacturing and dispatch support for auto & engineering buyers",
  Bhiwadi: "Supply coverage for the Rajasthan-side industrial belt",
  NCR: "Regular dispatch across the wider National Capital Region",
};

/** Supply / service-area section — the only location names used anywhere on the site. */
export function ServiceArea(): JSX.Element {
  return (
    <section className="band-sky section-pad relative" aria-labelledby="service-area-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Service Area"
          title="Bulk supply across NCR and nearby industrial clusters"
          description={SERVICE_AREA_NOTE}
          className="max-w-3xl"
        />

        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND.locations.map((location, index) => (
            <StaggerItem key={location} className="h-full">
              <article
                className="surface-card group flex h-full flex-col gap-3 p-6 hover:-translate-y-1.5 hover:shadow-lift"
                style={{ ["--accent" as string]: ["#1E6FFF", "#19B26B", "#FF8A2B", "#8B5CF6"][index] ?? "#1E6FFF" }}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent-deep transition-transform duration-500 group-hover:scale-110">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-bold text-navy">{location}</h3>
                <p className="text-sm leading-relaxed text-navy-soft">{LOCATION_DETAIL[location] ?? ""}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal variant="fade-up" delay={0.1} className="mt-10">
          <div className="flex flex-col items-center gap-6 rounded-[26px] border border-navy/10 bg-white p-6 shadow-soft sm:flex-row sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-contrast">
                <Truck className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-navy">Dispatch planning for industrial customers</h3>
                <p className="mt-1 text-sm leading-relaxed text-navy-soft">
                  Regular requirements are scheduled ahead so material arrives before the packing line
                  runs out. Bulk quantities are supported for continuous consumption.
                </p>
              </div>
            </div>
            <div className="w-full max-w-[280px] shrink-0">
              <TruckArt accent="#1E6FFF" className="h-28 w-full" title="Dispatch and supply illustration" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

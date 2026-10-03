import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { HeroActions } from "@/components/sections/HeroActions";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";
import { buildMetadata } from "@/lib/seo";
import { locations } from "@/data/locations";

export const metadata: Metadata = buildMetadata({
  title: "Packaging Material Supply in Gurugram, Manesar, Bhiwadi & NCR | SRM Enterprises",
  description:
    "Industrial packaging material supply hubs across NCR: Gurugram (Udyog Vihar, Pace City), Manesar (IMT Sectors 1-8), Bhiwadi (RIICO, Chopanki), and greater Delhi NCR.",
  path: "/locations",
});

const breadcrumbs = [{ name: "Locations", path: "/locations" }];

export default function LocationsPage(): JSX.Element {

  return (
    <>
      <PageHero
        eyebrow="INDUSTRIAL CLUSTERS"
        title="Serving Manufacturing & Commercial Hubs Across NCR"
        description="Daily bulk supply routes, buffer inventory staging, and quick-turnaround dispatch for industrial plants, automotive makers, and logistics warehouses across Gurugram, Manesar, Bhiwadi and Delhi NCR."
        breadcrumbs={breadcrumbs}
        accentColor="#E86620"
      >
        <HeroActions
          primaryLabel="Check Delivery in Your Area"
          primaryHref="/contact"
          secondaryLabel="Explore Product Range"
          secondaryHref="/products"
          location="locations-hero"
        />
      </PageHero>

      <section className="band-white pattern-dots section-pad" aria-labelledby="locations-overview-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="SERVICE COVERAGE"
            title="NCR Manufacturing Belts We Support Daily"
            description="Our distribution channels and transport fleet ensure your packaging materials arrive on schedule, aligned with your plant shift cycles."
            className="max-w-3xl"
          />

          <StaggerGroup className="mt-12 grid gap-8 md:grid-cols-2" stagger={0.1}>
            {locations.map((loc) => (
              <StaggerItem key={loc.id} variant="kinetic-pop" className="h-full">
                <article
                  className="card-home-vivid group flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                  style={{ ["--accent" as string]: loc.color }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-xs transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ background: loc.color }}
                      >
                        <MapPin className="h-7 w-7" aria-hidden="true" />
                      </span>
                      <span
                        className="rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider"
                        style={{ background: `${loc.color}15`, color: loc.color }}
                      >
                        Daily Dispatch
                      </span>
                    </div>

                    <h2 className="font-display text-2xl font-bold text-navy transition-colors duration-200 group-hover:text-accent">
                      {loc.name}
                    </h2>
                    <p className="text-sm font-semibold" style={{ color: loc.color }}>
                      {loc.headline}
                    </p>
                    <p className="text-sm leading-relaxed text-navy-soft">{loc.description}</p>

                    <div className="pt-3 border-t border-navy/5">
                      <span className="text-xs font-bold uppercase tracking-wider text-navy-soft block mb-2">
                        Covered Industrial Clusters:
                      </span>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {loc.clusters.map((cluster) => (
                          <div key={cluster} className="flex items-center gap-2 text-xs text-navy">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: loc.color }} />
                            <span>{cluster}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-navy-soft block mb-1.5">
                        Key Industry Sectors:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.keyIndustries.map((ind) => (
                          <span
                            key={ind}
                            className="rounded-full border border-navy/10 bg-slate-50 px-2.5 py-0.5 text-[0.72rem] font-medium text-navy"
                          >
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-navy/5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs font-medium text-navy-soft flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-accent" />
                      <span>{loc.dispatchSchedule}</span>
                    </span>

                    <Link
                      href={`/contact?location=${encodeURIComponent(loc.name)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent transition-all duration-200 hover:gap-2"
                    >
                      <span className="underline-grow">Inquire for {loc.name}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CtaBanner
        title="Operating in Gurugram, Manesar, Bhiwadi or Wider NCR?"
        description="Share your monthly packaging consumable requirements. We set up scheduled replenishment routes so your packing line never faces downtime."
      />
    </>
  );
}

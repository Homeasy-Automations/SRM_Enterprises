import { AlertTriangle, FileText } from "lucide-react";
import { PageHero } from "@/components/hero/PageHero";
import { Reveal } from "@/components/animations/Reveal";
import { buildMetadata, breadcrumbJsonLd, type BreadcrumbEntry } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface LegalPageProps {
  title: string;
  description: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  breadcrumbs: BreadcrumbEntry[];
  metaTitle: string;
  metaDescription: string;
  path: string;
}

/**
 * Shared layout for the legal templates (Privacy Policy, Terms of Service).
 * Clearly marked as templates for legal review — nothing here pretends to be vetted
 * legal advice, and no compliance claim is made.
 */
export function LegalPageContent({
  title,
  description,
  intro,
  lastUpdated,
  sections,
  breadcrumbs,
  metaTitle,
  metaDescription,
  path,
}: Omit<LegalPageProps, "sections"> & { sections: LegalSection[] }): JSX.Element {
  void metaTitle;
  void metaDescription;
  void path;
  void description;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description={intro}
        breadcrumbs={breadcrumbs}
        accentColor="#1E6FFF"
        size="compact"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8A2B]/40 bg-[#FFF1E3] px-4 py-2 text-xs font-semibold text-[#C2620F]">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          Template document — have it reviewed by a qualified legal professional before launch.
        </div>
      </PageHero>

      <section className="band-white section-pad-sm" aria-labelledby="legal-content-heading">
        <div className="container-page">
          <p className="text-sm text-navy-soft">
            Last updated: <span className="font-semibold text-navy">{lastUpdated}</span>
          </p>

          <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
            {/* Table of contents */}
            <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
              <h2
                id="legal-content-heading"
                className="font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-soft"
              >
                On this page
              </h2>
              <ul className="mt-3 flex flex-col gap-1.5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="inline-flex min-h-[40px] items-center rounded-lg px-2 text-sm text-navy-soft transition-colors hover:bg-accent-soft hover:text-accent-deep"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-8">
              {sections.map((section, index) => (
                <Reveal
                  key={section.id}
                  variant="fade-up"
                  delay={Math.min(index * 0.04, 0.2)}
                  className="scroll-mt-28"
                >
                  <article
                    id={section.id}
                    className="rounded-[26px] border border-navy/10 bg-white p-6 shadow-soft sm:p-7"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-deep">
                        <FileText className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <h3 className="font-display text-lg font-bold text-navy sm:text-xl">{section.heading}</h3>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-relaxed text-navy-soft sm:text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets && section.bullets.length > 0 ? (
                      <ul className="mt-4 flex flex-col gap-2">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2.5 text-sm leading-relaxed text-navy-soft">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <JsonLd id={`${sections[0]?.id ?? "legal"}-breadcrumb-jsonld`} data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs])} />
    </>
  );
}

/** Metadata helper shared by the legal pages. */
export function legalMetadata(input: { title: string; description: string; path: string }) {
  return buildMetadata({
    title: input.title,
    description: input.description,
    path: input.path,
    noIndex: false,
  });
}

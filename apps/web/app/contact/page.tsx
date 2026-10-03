import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { BRAND } from "@srm/config";
import { PageHero } from "@/components/hero/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ContactInfoPanel } from "@/components/forms/ContactInfoPanel";
import { WhatsAppCta } from "@/components/forms/WhatsAppCta";
import { ApiStatusBadge } from "@/components/forms/ApiStatusBadge";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { JsonLd } from "@/components/sections/JsonLd";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactFaq } from "@/data/faq";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact SRM Enterprises — Request a Packaging Quote",
  description:
    "Send your packaging requirement to SRM Enterprises: share size, material, quantity and application for corrugated boxes, EPE Foam Packaging, LDPE Bubble & Protective Packaging, poly films and accessories. Pan India supply and dispatch.",
  path: "/contact",
  keywords: ["packaging quote Pan India", "contact packaging supplier India", "packaging enquiry", "bulk industrial packaging supplier"],
});

const breadcrumbs = [{ name: "Contact", path: "/contact" }];

export default function ContactPage(): JSX.Element {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need packed"
        description="Use the form below for a quote, or reach us on WhatsApp for anything urgent. Inquiries go straight to our sales inbox and you get a confirmation email immediately."
        breadcrumbs={breadcrumbs}
        accentColor="#19B26B"
        size="compact"
      >
        <ApiStatusBadge />
      </PageHero>

      {/* 2 — Contact info + form */}
      <section className="band-white section-pad-sm" aria-labelledby="contact-details-heading">
        <div className="container-page">
          <h2 id="contact-details-heading" className="sr-only">
            Contact details and quote request form
          </h2>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-10">
            <ContactInfoPanel />

            <Reveal variant="split-right" className="flex flex-col gap-4">
              {/*
                The form reads ?product=<slug> to pre-select the category, so it must sit
                inside a Suspense boundary on this statically rendered route.
              */}
              <Suspense
                fallback={
                  <div className="rounded-[28px] border border-navy/10 bg-white p-8 shadow-card" role="status" aria-live="polite">
                    <span className="text-sm font-semibold text-navy-soft">Loading the quote form…</span>
                  </div>
                }
              >
                <QuoteForm />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — WhatsApp CTA */}
      <section className="band-sky section-pad-sm" aria-labelledby="whatsapp-cta-heading">
        <div className="container-page">
          <Reveal variant="depth-zoom">
            <div className="flex flex-col items-start gap-5 rounded-[28px] border border-[#25D366]/25 bg-[#EAFBF4] p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#25D366] text-white">
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h2 id="whatsapp-cta-heading" className="font-display text-xl font-bold text-navy sm:text-2xl">
                    Prefer to send the requirement on WhatsApp?
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-soft sm:text-base">
                    Send photographs, drawings or dimensions directly — often the quickest way to get a
                    material suggestion back.
                  </p>
                </div>
              </div>
              <WhatsAppCta location="contact-page" label="Chat on WhatsApp" />
            </div>
          </Reveal>

          {/*
            If NEXT_PUBLIC_WHATSAPP_NUMBER / NEXT_PUBLIC_PHONE_NUMBER are empty, the WhatsApp
            and Call buttons hide themselves rather than pointing at an invalid number — in
            that case the placeholder details below are the fallback route.
          */}
          <Reveal variant="fade-up" delay={0.08} className="mt-6">
            <ul className="flex flex-col gap-3 text-sm text-navy-soft sm:flex-row sm:flex-wrap sm:gap-6">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                Email: <span className="font-semibold text-navy">{BRAND.name}</span> placeholder inbox —
                set in <code className="rounded bg-navy/5 px-1 text-xs">data/company.ts</code>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                {BRAND.locations.join(" • ")}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                Inquiries reviewed by our team; WhatsApp is fastest for urgent requirements.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 4 — Service area */}
      <ServiceArea />

      {/* 5 — FAQ */}
      <section className="band-white section-pad" aria-labelledby="faq-heading">
        <div className="container-page">
          <FaqAccordion items={contactFaq} accentColor="#19B26B" />
        </div>
      </section>

      {/* 6 — Closing line */}
      <section className="band-cream pt-10 pb-24 sm:pt-14 sm:pb-32 lg:pt-16 lg:pb-36" aria-label="Summary">
        <div className="container-page">
          <SectionHeading
            eyebrow="Reminder"
            title={BRAND.footerLine}
            description="Corrugated packaging, EPE foam, bubble & protective packaging, poly bags & films and packaging accessories — standard or customised, from a single source."
            align="center"
            className="mx-auto max-w-3xl"
            underline={false}
          />
        </div>
      </section>

      <JsonLd id="contact-breadcrumb-jsonld" data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs])} />
    </>
  );
}

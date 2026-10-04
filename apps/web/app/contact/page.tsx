import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactOptions } from "@/components/contact/ContactOptions";
import { MainInquirySection } from "@/components/contact/MainInquirySection";
import { WhatHappensNext } from "@/components/contact/WhatHappensNext";
import { QuoteFasterGuide } from "@/components/contact/QuoteFasterGuide";
import { PanIndiaServiceArea } from "@/components/contact/PanIndiaServiceArea";
import { WhatsAppQuickInquiry } from "@/components/contact/WhatsAppQuickInquiry";
import { ContactFaqSection } from "@/components/contact/ContactFaqSection";
import { ContactFinalCta } from "@/components/contact/ContactFinalCta";
import { JsonLd } from "@/components/sections/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Packaging Inquiries — SRM Enterprises B2B Hub",
  description:
    "Let's talk packaging. Share your requirement, get custom specifications, or arrange scheduled bulk supply for corrugated boxes, EPE foam, bubble wrap, poly films and accessories across India.",
  path: "/contact",
  keywords: [
    "packaging inquiry hub",
    "industrial packaging quote",
    "corrugated boxes supplier India",
    "EPE foam custom packaging",
    "protective packaging quote",
    "bulk packaging procurement",
  ],
});

const breadcrumbs = [{ name: "Contact", path: "/contact" }];

export default function ContactPage(): JSX.Element {
  return (
    <>
      {/* 01 — Contact Hero */}
      <ContactHero />

      {/* 02 — Contact Options */}
      <ContactOptions />

      {/* 03 — Main Contact / Inquiry Area */}
      <Suspense
        fallback={
          <div className="py-20 text-center text-sm font-semibold text-navy-soft" role="status">
            Loading packaging inquiry hub...
          </div>
        }
      >
        <MainInquirySection />
      </Suspense>

      {/* 04 — What Happens After You Contact Us */}
      <WhatHappensNext />

      {/* 05 — What Information Helps Us Quote Faster */}
      <QuoteFasterGuide />

      {/* 06 — Packaging Support / Service Area */}
      <PanIndiaServiceArea />

      {/* 07 — WhatsApp Quick Inquiry */}
      <WhatsAppQuickInquiry />

      {/* 08 — FAQ */}
      <ContactFaqSection />

      {/* 09 — Final CTA */}
      <ContactFinalCta />

      {/* Structured Schema Data */}
      <JsonLd
        id="contact-breadcrumb-jsonld"
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...breadcrumbs])}
      />
    </>
  );
}

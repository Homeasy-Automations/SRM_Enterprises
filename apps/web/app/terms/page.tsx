import type { Metadata } from "next";
import { LegalPageContent, type LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions — SRM Enterprises Website and Supply",
  description:
    "Terms and conditions for using the SRM Enterprises website and for submitting packaging inquiries, including quoting, orders, pricing, dispatch and limitation of liability.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "1. Acceptance of terms",
    paragraphs: [
      "By using this website or submitting an inquiry through it, you agree to these terms. This document is a template prepared for the SRM Enterprises website and must be reviewed by a qualified legal professional, who should confirm it against the laws that apply to your business before publication.",
      "If you do not agree with these terms, please do not use the website or submit an inquiry.",
    ],
  },
  {
    id: "website-use",
    heading: "2. Use of this website",
    paragraphs: [
      "This website is an informational catalogue of packaging products and services. You may browse it, download pages for internal reference and submit inquiries. You may not attempt to disrupt the website, submit automated or bulk form submissions, scrape content at scale, or use the contact form for spam or unrelated marketing.",
    ],
    bullets: [
      "Do not submit false, misleading or third-party information without authority",
      "Do not attempt to bypass rate limits, security controls or the form's validation",
      "Do not use the site in any way that breaks applicable law",
    ],
  },
  {
    id: "product-information",
    heading: "3. Product information",
    paragraphs: [
      "Product names, categories and descriptions on this website are provided as a general guide to the packaging materials we supply. Material availability, exact specifications, colours, finishes and dimensions are confirmed at the quotation stage for each requirement.",
      "Illustrations on this website are graphic representations created for the site. They are indicative only and are not photographs of specific consignments.",
    ],
  },
  {
    id: "inquiries-and-quotes",
    heading: "4. Inquiries and quotations",
    paragraphs: [
      "Submitting the quote form starts a conversation; it does not create a contract, reserve stock or guarantee a price. A binding supply arrangement exists only when both parties agree a written order or purchase order on agreed terms.",
      "Quotations are prepared against the requirement information you provide. If dimensions, material, ply, thickness, print or quantity change after quoting, the price and lead time may be revised.",
    ],
  },
  {
    id: "pricing-payment",
    heading: "5. Pricing, taxes and payment",
    paragraphs: [
      "Prices are quoted for the specified material, quantity and delivery location, and are valid for the period stated in the quotation. Unless stated otherwise, taxes, freight and any statutory charges are additional. Payment terms are agreed in writing before dispatch.",
    ],
  },
  {
    id: "custom-orders",
    heading: "6. Custom packaging and samples",
    paragraphs: [
      "For customised packaging, a prototype or sample is prepared for your approval. Production follows the approved sample specification. Minor variation in shade, print position or material batch is inherent to packaging production processes and is not treated as a defect.",
      "Because customised material is produced specifically for your requirement, cancellation after production begins may not be possible; any cancellation terms will be stated in the quotation.",
    ],
  },
  {
    id: "dispatch-delivery",
    heading: "7. Dispatch and delivery",
    paragraphs: [
      "Dispatch timelines are planned in good faith and communicated in writing. Delivery dates may be affected by factors outside our control, including material availability, transport disruptions and force majeure events. Risk passes as per the agreed delivery terms.",
    ],
  },
  {
    id: "liability",
    heading: "8. Limitation of liability",
    paragraphs: [
      "The website is provided on an \"as is\" basis. While we take care to keep information accurate and current, we do not warrant that the site will be uninterrupted, error-free or complete. To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of this website.",
      "Nothing in these terms limits liability that cannot be limited under applicable law, including for fraud or for death or personal injury caused by negligence.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "9. Intellectual property",
    paragraphs: [
      "The SRM Enterprises name, the content, layout, illustrations and code of this website belong to SRM Enterprises unless otherwise stated. You may not reproduce, republish or redistribute substantial parts of this website without written permission, other than normal browser caching and short quotations with attribution.",
    ],
  },
  {
    id: "governing-law",
    heading: "10. Governing law and contact",
    paragraphs: [
      "These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts at the location of our registered office (to be confirmed during legal review of this template).",
      "For any question about these terms, contact us using the details published on the Contact page.",
    ],
  },
];

export default function TermsPage(): JSX.Element {
  return (
    <LegalPageContent
      title="Terms & Conditions"
      description="Terms for using this website and submitting inquiries."
      intro="The ground rules for using this website, submitting a packaging inquiry and receiving a quotation from SRM Enterprises."
      lastUpdated="1 October 2026"
      sections={sections}
      breadcrumbs={[{ name: "Terms & Conditions", path: "/terms" }]}
      metaTitle="Terms & Conditions"
      metaDescription="Terms and conditions for using the SRM Enterprises website and for submitting packaging inquiries, including quoting, orders, pricing, dispatch and limitation of liability."
      path="/terms"
    />
  );
}

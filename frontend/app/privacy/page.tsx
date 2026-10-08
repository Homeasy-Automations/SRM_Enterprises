import type { Metadata } from "next";
import { LegalPageContent, type LegalSection } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — How SRM Enterprises Handles Your Inquiry Data",
  description:
    "How SRM Enterprises collects, uses, stores and protects the information you submit through the quote and contact form, including your rights and how to request changes or deletion.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    id: "overview",
    heading: "1. Overview",
    paragraphs: [
      "This Privacy Policy explains how SRM Enterprises (\"we\", \"us\") handles information submitted through this website. It is a template prepared for the SRM Enterprises website and must be reviewed by a qualified legal professional, who should confirm it against the laws that apply to your business before it goes live.",
      "The website is a business-to-business brochure site with one interactive feature: the quote / contact form. There is no customer account system, no newsletter subscription, no comment feature and no advertising profile building on this site.",
    ],
  },
  {
    id: "information-we-collect",
    heading: "2. Information we collect",
    paragraphs: [
      "We only collect the information you choose to type into the quote / contact form. Nothing is collected passively beyond the standard server and analytics behaviour described below.",
    ],
    bullets: [
      "Name, company name, email address, phone number and optional WhatsApp number",
      "Product category of interest, required material, quantity, size and thickness or ply",
      "Application description and your message describing the requirement",
      "Your consent confirmation for being contacted about the inquiry",
    ],
  },
  {
    id: "how-we-use-it",
    heading: "3. How we use your information",
    paragraphs: [
      "Your information is used for one purpose: responding to your packaging requirement and supplying you if you choose to order.",
    ],
    bullets: [
      "To review and understand your requirement and prepare a commercial offer",
      "To contact you by email, phone or WhatsApp about your inquiry",
      "To send you an automatic confirmation email acknowledging your submission",
      "To plan production, dispatch and repeat supply if you place an order",
    ],
  },
  {
    id: "emails",
    heading: "4. Email notifications",
    paragraphs: [
      "When you submit the form, the inquiry is stored in our database and two emails are sent through our email provider (Resend): one notification to our sales inbox, and one confirmation to the email address you provided. The confirmation email contains a summary of what you submitted so you have a record of it.",
      "If you did not submit an inquiry and received a confirmation email, reply to that email and we will remove the record from our systems.",
    ],
  },
  {
    id: "storage-security",
    heading: "5. Storage, retention and security",
    paragraphs: [
      "Submitted inquiries are stored in a managed MongoDB Atlas database and are accessible only to authorised SRM Enterprises personnel through the database console. There are no public read, list, update or delete endpoints for inquiry data on this website — the API accepts submissions only.",
    ],
    bullets: [
      "Form traffic is transmitted over HTTPS and rate limited to prevent abuse",
      "Submitted text is sanitised to prevent script injection",
      "We never store raw IP addresses; where abuse prevention requires it, only a salted one-way hash is kept",
      "Inquiries are retained for as long as needed to serve the business relationship and applicable record-keeping duties",
    ],
  },
  {
    id: "sharing",
    heading: "6. Sharing and disclosure",
    paragraphs: [
      "We do not sell, rent or publish your information. It may be shared only with service providers who help us operate the website and process your inquiry (for example, our hosting provider, database provider or email delivery provider), and only to the extent needed to deliver those services. We may also disclose information where we are legally required to do so.",
    ],
  },
  {
    id: "cookies-analytics",
    heading: "7. Cookies and analytics",
    paragraphs: [
      "This website does not require cookies for you to use the form. If analytics identifiers are configured by the site owner (Google Analytics, Google Tag Manager or Meta Pixel), those tools may set their own cookies to measure aggregate site usage. Those integrations are only loaded when an identifier has been configured, and they are not used to build a personal profile of you on this site.",
      "Your colour-mood preference on this site is held in memory only for your current visit; it is not stored in cookies or local storage.",
    ],
  },
  {
    id: "your-rights",
    heading: "8. Your choices and rights",
    paragraphs: [
      "You can ask us what information we hold about your inquiry, ask for corrections, or ask us to delete it. Depending on where you are located, additional rights may apply under your local data protection law; those should be confirmed during legal review of this template.",
    ],
    bullets: [
      "Request a copy of the information you submitted",
      "Request correction of inaccurate details",
      "Request deletion of your inquiry record",
      "Withdraw consent for further contact at any time",
    ],
  },
  {
    id: "changes-contact",
    heading: "9. Changes and contact",
    paragraphs: [
      "If this policy changes, the updated version will be published on this page with a new date. For any privacy question or request, contact us using the details on the Contact page — replace the placeholder email and phone number in the site configuration before launch so that requests reach a real inbox.",
    ],
  },
];

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <LegalPageContent
      title="Privacy Policy"
      description="How inquiry data is collected, used and protected."
      intro="A plain-language description of what happens to the information you submit through the quote form on this website."
      lastUpdated="1 October 2026"
      sections={sections}
      breadcrumbs={[{ name: "Privacy Policy", path: "/privacy" }]}
      metaTitle="Privacy Policy"
      metaDescription="How SRM Enterprises collects, uses, stores and protects the information you submit through the quote and contact form, including your rights and how to request changes or deletion."
      path="/privacy"
    />
  );
}

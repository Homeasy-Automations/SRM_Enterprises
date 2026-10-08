"use client";

import { Mail, Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import { CONTACT, getMailtoLink, getTelLink, getWhatsAppLink } from "@/data/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/animations/Reveal";

export function ContactOptions(): JSX.Element {
  const mailtoHref = getMailtoLink("Business Inquiry — Packaging Requirements");
  const telHref = getTelLink();
  const whatsappHref = getWhatsAppLink(
    "Hello SRM Enterprises, I am reaching out to discuss packaging materials for our business."
  );

  const options = [
    {
      id: "email",
      icon: Mail,
      iconColor: "text-accent bg-accent/10 border-accent/20",
      accentBorder: "hover:border-accent/40",
      title: "Email Us",
      description: "For detailed requirements, technical specifications, RFQs and commercial inquiries.",
      value: CONTACT.email,
      buttonText: "Send Email",
      href: mailtoHref,
      isExternal: false,
    },
    {
      id: "phone",
      icon: Phone,
      iconColor: "text-[#19B26B] bg-[#19B26B]/10 border-[#19B26B]/20",
      accentBorder: "hover:border-[#19B26B]/40",
      title: "Call Our Team",
      description: "For direct discussions with packaging specialists regarding urgent supplies.",
      value: CONTACT.phoneDisplay,
      buttonText: "Call Now",
      href: telHref ?? "#",
      isExternal: false,
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      iconColor: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
      accentBorder: "hover:border-emerald-500/40",
      title: "WhatsApp",
      description: "Best for sharing photographs, drawings, component dimensions, and instant updates.",
      value: CONTACT.whatsappDisplay,
      buttonText: "Chat on WhatsApp",
      href: whatsappHref ?? "#",
      isExternal: true,
    },
    {
      id: "supply-coverage",
      icon: MapPin,
      iconColor: "text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20",
      accentBorder: "hover:border-[#8B5CF6]/40",
      title: "Serving Businesses Across India",
      description: "Bulk packaging supply and scheduled dispatch support across major industrial locations.",
      value: "Pan-India Supply & Dispatch",
      buttonText: "Explore Supply Coverage",
      href: "#pan-india-service",
      isExternal: false,
    },
  ];

  return (
    <section className="bg-slate-50/70 py-16 sm:py-20 border-y border-navy/10 relative" id="contact-options">
      <div className="container-page">
        <SectionHeading
          eyebrow="COMMUNICATION CHANNELS"
          title="How Can We Help You Today?"
          description="Choose the communication channel that best suits your procurement timeline and workflow."
          align="center"
          className="mx-auto max-w-2xl mb-12"
        />

        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <StaggerItem key={opt.id} variant="fade-up" className="h-full">
                <div
                  className={`group flex h-full flex-col justify-between rounded-3xl border border-navy/10 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${opt.accentBorder}`}
                >
                  <div>
                    <div
                      className={`inline-grid h-12 w-12 place-items-center rounded-2xl border transition-transform duration-300 group-hover:scale-110 ${opt.iconColor}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-4 font-display text-lg font-bold text-navy">{opt.title}</h3>

                    <p className="mt-2 text-xs leading-relaxed text-navy-soft">{opt.description}</p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-navy/5">
                    <p className="text-xs font-bold text-navy truncate mb-3" title={opt.value}>
                      {opt.value}
                    </p>

                    <a
                      href={opt.href}
                      target={opt.isExternal ? "_blank" : undefined}
                      rel={opt.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex w-full items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-navy transition-all duration-200 group-hover:bg-navy group-hover:text-white"
                    >
                      <span>{opt.buttonText}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

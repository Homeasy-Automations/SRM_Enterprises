"use client";

import { MessageCircle, Phone } from "lucide-react";
import { CONTACT, getProductWhatsAppMessage, getTelLink, getWhatsAppLink } from "@/data/company";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface WhatsAppCtaProps {
  /** Product name pre-fills the WhatsApp message when relevant. */
  productName?: string;
  /** Where this CTA lives, for analytics. */
  location: string;
  className?: string;
  variant?: "solid" | "outline";
  showCall?: boolean;
  label?: string;
}

/**
 * WhatsApp (and optional Call) button.
 * If no usable number is configured in NEXT_PUBLIC_WHATSAPP_NUMBER / NEXT_PUBLIC_PHONE_NUMBER,
 * this component renders nothing at all — no invalid wa.me or tel: links anywhere.
 */
export function WhatsAppCta({
  productName,
  location,
  className,
  variant = "solid",
  showCall = true,
  label = "Chat on WhatsApp",
}: WhatsAppCtaProps): JSX.Element | null {
  const message = productName ? getProductWhatsAppMessage(productName) : undefined;
  const whatsappLink = getWhatsAppLink(message);
  const telLink = getTelLink();

  if (!whatsappLink && !telLink) return null;

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>
      {whatsappLink ? (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.whatsappClick(location, productName)}
          className={cn(
            "btn w-full sm:w-auto",
            variant === "solid"
              ? "bg-[#25D366] text-white shadow-card hover:brightness-[1.05]"
              : "border-2 border-[#25D366]/40 bg-white text-[#0F8B55] hover:bg-[#EAFBF4]",
          )}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {label}
        </a>
      ) : null}

      {showCall && telLink ? (
        <a
          href={telLink}
          onClick={() => analytics.phoneClick(location)}
          className="btn-outline w-full sm:w-auto"
          aria-label={`Call SRM Enterprises on ${CONTACT.phoneDisplay}`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {CONTACT.phoneDisplay}
        </a>
      ) : null}
    </div>
  );
}

/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH FOR COMPANY DETAILS AND PLACEHOLDERS
 * ---------------------------------------------------------------------------
 * Everything a human has to replace before launch lives in this file (or in the
 * .env files). Replace the values below and the whole site updates — header,
 * footer, contact page, WhatsApp buttons, JSON-LD and email links.
 *
 * TODO (replace before launch):
 *   1. CONTACT.email         -> real sales inbox
 *   2. CONTACT.phoneDisplay  -> real phone number
 *   3. NEXT_PUBLIC_WHATSAPP_NUMBER (apps/web/.env.local) -> digits only, with country code
 *   4. NEXT_PUBLIC_PHONE_NUMBER    (apps/web/.env.local) -> display phone number
 *   5. Physical address / map link, if you want one shown publicly
 */

import { BRAND } from "@srm/config";

export interface ContactPlaceholders {
  /** TODO: replace with the real sales inbox. */
  email: string;
  /** TODO: replace with the real phone number. */
  phoneDisplay: string;
  /** TODO: replace with the real WhatsApp number (used for display only). */
  whatsappDisplay: string;
  /** TODO: replace if you publish a physical address / warehouse location. */
  addressLine: string;
}

export const CONTACT_PLACEHOLDERS: ContactPlaceholders = {
  email: "info@bharatx.vc",
  phoneDisplay: "+91 98112 63046",
  whatsappDisplay: "+91 98112 63046",
  addressLine: "Pan India supply & dispatch across all major industrial clusters",
};

const PHONE_PLACEHOLDER = "+91 98112 63046";

/** Raw env values (Next inlines NEXT_PUBLIC_* at build time). */
const envPhone = (process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "").trim();
const envWhatsAppRaw = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").trim();

/**
 * WhatsApp numbers must reach https://wa.me as digits only, so every non-digit
 * character (spaces, +, dashes, brackets) is stripped here, once.
 */
export function toDigitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

const whatsappDigits = toDigitsOnly(envWhatsAppRaw);

/**
 * A number is only treated as "usable" when it is long enough to be a real
 * international number. Otherwise the WhatsApp and Call buttons are hidden
 * site-wide instead of pointing at an invalid number.
 */
export const isWhatsAppConfigured = whatsappDigits.length >= 10;
export const isPhoneConfigured = toDigitsOnly(envPhone).length >= 7;

export const CONTACT = {
  email: CONTACT_PLACEHOLDERS.email,
  phoneDisplay: envPhone.length > 0 ? envPhone : PHONE_PLACEHOLDER,
  phoneDial: toDigitsOnly(envPhone),
  whatsappDisplay: isWhatsAppConfigured ? `+${whatsappDigits}` : CONTACT_PLACEHOLDERS.whatsappDisplay,
  whatsappDigits,
  isWhatsAppConfigured,
  isPhoneConfigured,
  locations: BRAND.locations,
  addressLine: CONTACT_PLACEHOLDERS.addressLine,
} as const;

/** Default message pre-filled in the WhatsApp chat. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello SRM Enterprises, I would like to enquire about packaging material.";

/**
 * Builds a wa.me link. Returns `null` when no usable number is configured so callers
 * can hide the button instead of rendering a broken link.
 */
export function getWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string | null {
  if (!isWhatsAppConfigured) return null;
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
}

/** `tel:` link, or `null` when no phone number has been configured yet. */
export function getTelLink(): string | null {
  if (!isPhoneConfigured) return null;
  return `tel:${envPhone.replace(/[^\d+]/g, "")}`;
}

/** `mailto:` link with an optional subject. */
export function getMailtoLink(subject?: string): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${CONTACT.email}${query}`;
}

/** Message tailored to a specific product category, used by product page CTAs. */
export function getProductWhatsAppMessage(productName: string): string {
  return `Hello SRM Enterprises, I would like a quote for ${productName}. Please share material options and pricing.`;
}

/** Structured data uses this — placeholders only, no invented address or registration numbers. */
export const ORGANISATION_PROFILE = {
  legalName: BRAND.name,
  description:
    "SRM Enterprises is an industrial packaging material supplier offering complete packaging solutions — corrugated boxes, EPE Foam Packaging, LDPE Bubble & Protective Packaging, poly bags & films and packaging accessories with Pan India supply.",
  areaServed: ["Pan India"],
  contactEmail: CONTACT_PLACEHOLDERS.email,
  contactPhone: PHONE_PLACEHOLDER,
} as const;

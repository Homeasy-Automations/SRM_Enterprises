import { INQUIRY_LIMITS, PRODUCT_CATEGORY_SLUGS } from "@srm/config";
import { z } from "zod";

/**
 * Phone rule: optional leading "+", then digits/spaces/dashes/dots/parentheses/brackets,
 * with at least 7 actual digits. Accepts "+91 98XXXXXXXX", "09876543210", "(0124) 456-7890".
 */
const PHONE_PATTERN = /^[+]?[0-9\s\-.()/[\]]{7,24}$/;
const DIGITS_PATTERN = /\d/g;

export const phoneSchema = z
  .string({ required_error: "Phone number is required." })
  .trim()
  .max(INQUIRY_LIMITS.phone.max, `Phone number must be ${INQUIRY_LIMITS.phone.max} characters or fewer.`)
  .regex(PHONE_PATTERN, "Enter a valid phone number (digits, spaces and + - ( ) only).")
  .refine((value) => (value.match(DIGITS_PATTERN) ?? []).length >= 7, {
    message: "Phone number looks too short. Include the full number with area/STD code.",
  });

export const optionalPhoneSchema = z
  .string()
  .trim()
  .max(INQUIRY_LIMITS.whatsapp.max, `Must be ${INQUIRY_LIMITS.whatsapp.max} characters or fewer.`)
  .refine((value) => value === "" || PHONE_PATTERN.test(value), {
    message: "Enter a valid WhatsApp number, or leave it blank.",
  })
  .refine((value) => value === "" || (value.match(DIGITS_PATTERN) ?? []).length >= 7, {
    message: "WhatsApp number looks too short.",
  })
  .optional();

const optionalText = (max: number, label: string) =>
  z
    .string()
    .trim()
    .max(max, `${label} must be ${max} characters or fewer.`)
    .optional();

/**
 * The single source of truth for inquiry validation.
 * `apps/web` renders its form with this schema; `services/api` parses the request body with it.
 */
export const inquirySchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(INQUIRY_LIMITS.name.min, "Please enter your full name.")
    .max(INQUIRY_LIMITS.name.max, `Name must be ${INQUIRY_LIMITS.name.max} characters or fewer.`),
  companyName: optionalText(INQUIRY_LIMITS.companyName.max, "Company name"),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .toLowerCase()
    .max(INQUIRY_LIMITS.email.max, `Email must be ${INQUIRY_LIMITS.email.max} characters or fewer.`)
    .email("Enter a valid email address, for example name@company.com."),
  phone: phoneSchema,
  whatsapp: optionalPhoneSchema,
  productCategory: z.enum(PRODUCT_CATEGORY_SLUGS, {
    required_error: "Select a product category.",
    invalid_type_error: "Select a product category from the list.",
  }),
  material: optionalText(INQUIRY_LIMITS.material.max, "Required material"),
  quantity: optionalText(INQUIRY_LIMITS.quantity.max, "Quantity"),
  size: optionalText(INQUIRY_LIMITS.size.max, "Required size"),
  thickness: optionalText(INQUIRY_LIMITS.thickness.max, "Thickness / ply"),
  application: optionalText(INQUIRY_LIMITS.application.max, "Application"),
  message: z
    .string({ required_error: "Message is required." })
    .trim()
    .min(INQUIRY_LIMITS.message.min, "Please describe your requirement in a few more words.")
    .max(INQUIRY_LIMITS.message.max, `Message must be ${INQUIRY_LIMITS.message.max} characters or fewer.`),
  consentGiven: z
    .boolean({ required_error: "Consent is required." })
    .refine((value) => value === true, {
      message: "Please accept the privacy policy so we can respond to your inquiry.",
    }),
  /** Honeypot: real users never see it, so any value means a bot. Submissions are discarded quietly. */
  honeypot: z.string().max(INQUIRY_LIMITS.honeypot.max).optional(),
  source: z.string().trim().max(60).optional(),
});

export type InquirySchemaInput = z.input<typeof inquirySchema>;
export type InquirySchemaOutput = z.output<typeof inquirySchema>;

/** Empty strings are normalised away before the document is written. */
export function normaliseInquiry(input: InquirySchemaOutput): InquirySchemaOutput {
  const trimmed: Record<string, unknown> = { ...input };
  for (const [key, value] of Object.entries(trimmed)) {
    if (typeof value === "string" && value.trim() === "") {
      trimmed[key] = undefined;
    }
  }
  return trimmed as InquirySchemaOutput;
}

import type { EmailStatus } from "@srm/types";
import { INQUIRY_DEFAULTS, normaliseInquiry, type InquirySchemaOutput } from "@srm/shared";
import { contactInquiryRepository } from "../repositories/contact-inquiry.repository";
import type { SubmitInquiryResult } from "../types/inquiry";
import { logger } from "../utils/logger";
import { sendInquiryConfirmation, sendInquiryNotification } from "./mailer.service";

/**
 * Business rules for a public inquiry submission:
 *   1. honeypot -> pretend success, store nothing
 *   2. save to MongoDB first (this is the source of truth)
 *   3. send both Resend emails; failures are recorded, never fatal
 */
export interface SubmitInquiryContext {
  ipHash?: string;
  source?: string;
}

/** Filled honeypot: answer 200 so bots learn nothing, but write nothing to the database. */
export function isHoneypotTriggered(input: InquirySchemaOutput): boolean {
  return typeof input.honeypot === "string" && input.honeypot.trim().length > 0;
}

export async function submitInquiry(
  input: InquirySchemaOutput,
  context: SubmitInquiryContext = {},
): Promise<SubmitInquiryResult | null> {
  if (isHoneypotTriggered(input)) {
    logger.warn({ source: input.source }, "Honeypot triggered — submission discarded quietly");
    return null;
  }

  const clean = normaliseInquiry(input);

  const document = await contactInquiryRepository.create({
    name: clean.name,
    companyName: clean.companyName,
    email: clean.email,
    phone: clean.phone,
    whatsapp: clean.whatsapp,
    productCategory: clean.productCategory,
    material: clean.material,
    quantity: clean.quantity,
    size: clean.size,
    thickness: clean.thickness,
    application: clean.application,
    message: clean.message,
    status: INQUIRY_DEFAULTS.status,
    source: context.source ?? clean.source ?? INQUIRY_DEFAULTS.source,
    consentGiven: clean.consentGiven,
    ipHash: context.ipHash,
  });

  const inquiryId = String(document._id);
  logger.info({ inquiryId, productCategory: clean.productCategory }, "Inquiry stored");

  const emailPayload = {
    name: clean.name,
    companyName: clean.companyName,
    email: clean.email,
    phone: clean.phone,
    whatsapp: clean.whatsapp,
    productCategory: clean.productCategory,
    material: clean.material,
    quantity: clean.quantity,
    size: clean.size,
    thickness: clean.thickness,
    application: clean.application,
    message: clean.message,
    submittedAt: new Date(),
  };

  // Both emails are attempted independently — one failing must not block the other.
  const [adminResult, customerResult] = await Promise.all([
    sendInquiryNotification(emailPayload),
    sendInquiryConfirmation(emailPayload),
  ]);

  const emailStatus: EmailStatus = {
    adminSent: adminResult.sent,
    customerSent: customerResult.sent,
  };
  const errorParts = [adminResult.error, customerResult.error].filter(
    (value): value is string => typeof value === "string" && value.length > 0,
  );
  if (errorParts.length > 0) {
    emailStatus.lastError = errorParts.join(" | ").slice(0, 480);
    logger.warn({ inquiryId, emailStatus }, "One or more emails could not be delivered");
  }

  await contactInquiryRepository.updateEmailStatus(inquiryId, emailStatus);

  return {
    id: inquiryId,
    email: { adminSent: emailStatus.adminSent, customerSent: emailStatus.customerSent },
  };
}

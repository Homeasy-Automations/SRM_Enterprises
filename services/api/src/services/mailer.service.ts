import { Resend } from "resend";
import { env } from "../config/env";
import { logger } from "../utils/logger";
import {
  buildInquiryConfirmationEmail,
  buildInquiryNotificationEmail,
  type InquiryNotificationData,
} from "../emails";

/**
 * Resend is the ONLY email transport (never SMTP — common Node hosts block outbound
 * SMTP ports, and Resend's HTTP API avoids that entirely).
 *
 * Delivery failures must never break the visitor's submission: every function here
 * returns a result object instead of throwing, so the controller can save the inquiry
 * first, then record whatever happened with the emails.
 */

let client: Resend | null = null;

function getClient(): Resend | null {
  if (client) return client;
  if (!env.RESEND_API_KEY) {
    logger.error("RESEND_API_KEY is missing — emails will be skipped");
    return null;
  }
  client = new Resend(env.RESEND_API_KEY);
  return client;
}

export interface SendResult {
  sent: boolean;
  error?: string;
}

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message.slice(0, 480);
  return String(error).slice(0, 480);
}

async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  label: string;
}): Promise<SendResult> {
  const resend = getClient();
  if (!resend) return { sent: false, error: "Email transport not configured" };

  try {
    const { error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
      replyTo: params.replyTo,
    });

    if (error) {
      logger.error({ err: error, label: params.label }, "Resend rejected the email");
      return { sent: false, error: error.message ?? "Resend rejected the email" };
    }

    logger.info({ label: params.label }, "Email sent via Resend");
    return { sent: true };
  } catch (error) {
    logger.error({ err: error, label: params.label }, "Email sending failed");
    return { sent: false, error: toErrorMessage(error) };
  }
}

/** 1/2 — internal notification to the SRM inbox, with the customer's address as Reply-To. */
export async function sendInquiryNotification(data: InquiryNotificationData): Promise<SendResult> {
  const { subject, html, text } = buildInquiryNotificationEmail(data);
  return sendEmail({
    to: env.CONTACT_RECEIVER_EMAIL,
    subject,
    html,
    text,
    replyTo: data.email,
    label: "inquiry-notification",
  });
}

/** 2/2 — confirmation to the customer. */
export async function sendInquiryConfirmation(data: InquiryNotificationData): Promise<SendResult> {
  const { subject, html, text } = buildInquiryConfirmationEmail(data);
  return sendEmail({
    to: data.email,
    subject,
    html,
    text,
    replyTo: env.CONTACT_RECEIVER_EMAIL,
    label: "inquiry-confirmation",
  });
}

import { BRAND, productLabel } from "@srm/shared";
import { escapeHtmlMultiline, singleLine } from "../utils/sanitize-text";
import { EMAIL_BRAND, renderDetailRow, renderDetailsTable, renderEmailLayout, renderPlainText } from "./layout";
import type { InquiryNotificationData } from "./inquiry-notification";

export const CONFIRMATION_SUBJECT =
  "Your Packaging Inquiry Has Been Received — SRM Enterprises";

/** Acknowledgement sent to the customer who submitted the inquiry. */
export function buildInquiryConfirmationEmail(data: InquiryNotificationData): {
  subject: string;
  html: string;
  text: string;
} {
  const e = (value: string | undefined): string => (value ? escapeHtmlMultiline(value) : "—");

  const rows = [
    renderDetailRow("Name", e(data.name)),
    renderDetailRow("Company", e(data.companyName)),
    renderDetailRow("Product Category", e(productLabel(data.productCategory))),
    renderDetailRow("Material", e(data.material)),
    renderDetailRow("Quantity", e(data.quantity)),
    renderDetailRow("Size", e(data.size)),
    renderDetailRow("Thickness / Ply", e(data.thickness)),
    renderDetailRow("Application", e(data.application)),
  ].join("\n");

  const stepsBlock = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:16px;background-color:${EMAIL_BRAND.cream};border-radius:16px;">
    <tr><td style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:${EMAIL_BRAND.navy};">
      <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${EMAIL_BRAND.blue};"></span>
      &nbsp;<strong>1.</strong> Our team reviews your requirement and material details.<br />
      <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${EMAIL_BRAND.green};"></span>
      &nbsp;<strong>2.</strong> We come back with the suitable material, dimensions and commercial offer.<br />
      <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${EMAIL_BRAND.yellow};"></span>
      &nbsp;<strong>3.</strong> Sample approval, then production and dispatch as per your schedule.
    </td></tr>
  </table>`;

  const html = renderEmailLayout({
    preheader: `Thank you ${singleLine(data.name, 50)} — your packaging inquiry has reached our team.`,
    title: `Thank you, ${singleLine(data.name, 50)}!`,
    intro:
      "Your packaging inquiry has been received. Our team will review the requirement and get in touch with you shortly with suitable material options and a commercial offer.",
    bodyHtml: renderDetailsTable(rows, "What You Submitted") + stepsBlock,
    footerNote:
      "If you did not submit this inquiry, please reply to this email so we can remove the details from our records.",
  });

  const text = renderPlainText([
    `Thank you, ${data.name}!`,
    "",
    `Your packaging inquiry has been received at ${BRAND.name}. Our team will review the requirement and get in touch shortly.`,
    "",
    "What you submitted:",
    `Name: ${data.name}`,
    `Company: ${data.companyName ?? "—"}`,
    `Product Category: ${productLabel(data.productCategory)}`,
    `Material: ${data.material ?? "—"}`,
    `Quantity: ${data.quantity ?? "—"}`,
    `Size: ${data.size ?? "—"}`,
    `Thickness / Ply: ${data.thickness ?? "—"}`,
    `Application: ${data.application ?? "—"}`,
    "",
    "Next: requirement review, then material and offer, then sample approval and dispatch.",
    "",
    `${BRAND.footerLine}`,
    `${BRAND.locations.join(" • ")}`,
  ]);

  return { subject: CONFIRMATION_SUBJECT, html, text };
}

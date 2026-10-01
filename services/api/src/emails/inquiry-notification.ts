import { BRAND, productLabel } from "@srm/shared";
import {
  escapeHtmlMultiline,
  escapeMailto,
  singleLine,
} from "../utils/sanitize-text";
import { EMAIL_BRAND, renderDetailRow, renderDetailsTable, renderEmailLayout, renderPlainText } from "./layout";

export interface InquiryNotificationData {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  productCategory: string;
  material?: string;
  quantity?: string;
  size?: string;
  thickness?: string;
  application?: string;
  message: string;
  submittedAt: Date;
}

export function inquiryNotificationSubject(data: InquiryNotificationData): string {
  const product = singleLine(productLabel(data.productCategory), 60);
  const name = singleLine(data.name, 60);
  return `New Packaging Inquiry — ${product} — ${name}`;
}

/** Internal notification sent to the SRM sales inbox. Reply-To is the customer. */
export function buildInquiryNotificationEmail(data: InquiryNotificationData): {
  subject: string;
  html: string;
  text: string;
} {
  const submittedAt = data.submittedAt.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

  const e = (value: string | undefined): string => (value ? escapeHtmlMultiline(value) : "—");

  const rows = [
    renderDetailRow("Customer Name", e(data.name)),
    renderDetailRow("Company", e(data.companyName)),
    renderDetailRow(
      "Email",
      `<a href="mailto:${escapeMailto(data.email)}" style="color:${EMAIL_BRAND.blue};text-decoration:none;">${e(data.email)}</a>`,
    ),
    renderDetailRow(
      "Phone",
      `<a href="tel:${escapeMailto(data.phone)}" style="color:${EMAIL_BRAND.blue};text-decoration:none;">${e(data.phone)}</a>`,
    ),
    renderDetailRow("WhatsApp", e(data.whatsapp)),
    renderDetailRow("Product", e(productLabel(data.productCategory))),
    renderDetailRow("Material", e(data.material)),
    renderDetailRow("Quantity", e(data.quantity)),
    renderDetailRow("Size", e(data.size)),
    renderDetailRow("Thickness / Ply", e(data.thickness)),
    renderDetailRow("Application", e(data.application)),
    renderDetailRow("Submitted", e(submittedAt)),
  ].join("\n");

  const messageBlock = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:16px;background-color:${EMAIL_BRAND.sky};border-radius:16px;">
    <tr><td style="padding:16px 18px;font-family:Arial,Helvetica,sans-serif;">
      <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_BRAND.blue};font-weight:bold;padding-bottom:8px;">Message</div>
      <div style="font-size:14px;line-height:1.65;color:${EMAIL_BRAND.navy};white-space:pre-wrap;word-break:break-word;">${escapeHtmlMultiline(data.message)}</div>
    </td></tr>
  </table>`;

  const html = renderEmailLayout({
    preheader: `${productLabel(data.productCategory)} inquiry from ${singleLine(data.name, 60)}`,
    title: "New Packaging Inquiry",
    intro: `A new inquiry was submitted on the ${BRAND.name} website. Reply directly to this email to answer the customer.`,
    bodyHtml: renderDetailsTable(rows) + messageBlock,
    footerNote: `Notification generated automatically for ${BRAND.name}.`,
  });

  const text = renderPlainText([
    "NEW PACKAGING INQUIRY",
    `${BRAND.name} — ${BRAND.tagline}`,
    "",
    `Customer Name: ${data.name}`,
    `Company: ${data.companyName ?? "—"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `WhatsApp: ${data.whatsapp ?? "—"}`,
    `Product: ${productLabel(data.productCategory)}`,
    `Material: ${data.material ?? "—"}`,
    `Quantity: ${data.quantity ?? "—"}`,
    `Size: ${data.size ?? "—"}`,
    `Thickness / Ply: ${data.thickness ?? "—"}`,
    `Application: ${data.application ?? "—"}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    data.message,
    "",
    `${BRAND.footerLine} — ${BRAND.locations.join(" • ")}`,
  ]);

  return { subject: inquiryNotificationSubject(data), html, text };
}

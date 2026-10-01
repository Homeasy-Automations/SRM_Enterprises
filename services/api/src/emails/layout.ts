/**
 * Shared table-based email shell used by both Resend templates.
 * Inline CSS only (email clients ignore <style> often), light colourful brand header,
 * 600px max width with `width:100%` so it stays readable on phones.
 */

export const EMAIL_BRAND = {
  name: "SRM ENTERPRISES",
  tagline: "Trading • Manufacturing • Custom Packaging",
  footerLine: "Your Complete Packaging Material Partner",
  locations: "Gurugram • Manesar • Bhiwadi • NCR",
  blue: "#1E6FFF",
  green: "#19B26B",
  yellow: "#FFC93C",
  navy: "#12294A",
  navySoft: "#3D5A80",
  sky: "#F3F9FF",
  cream: "#FFF9F0",
} as const;

export interface EmailLayoutOptions {
  /** Text shown in the inbox preview line, before the body opens. */
  preheader: string;
  title: string;
  intro: string;
  /** Pre-rendered HTML rows/paragraphs that go inside the content card. */
  bodyHtml: string;
  /** Optional second block rendered under the content card (e.g. a summary table). */
  afterHtml?: string;
  footerNote?: string;
}

export function renderEmailLayout(options: EmailLayoutOptions): string {
  const {
    preheader,
    title,
    intro,
    bodyHtml,
    afterHtml = "",
    footerNote = "This is an automated message from the SRM Enterprises website.",
  } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light only" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#F3F9FF;">
  <div style="display:none;font-size:1px;color:#F3F9FF;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F3F9FF;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#FFFFFF;border-radius:20px;overflow:hidden;box-shadow:0 12px 32px rgba(18,41,74,0.10);">

          <tr>
            <td bgcolor="${EMAIL_BRAND.blue}" style="background-color:${EMAIL_BRAND.blue};background-image:linear-gradient(120deg,${EMAIL_BRAND.blue} 0%,${EMAIL_BRAND.green} 100%);padding:26px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial,Helvetica,sans-serif;color:#FFFFFF;">
                    <div style="font-size:20px;font-weight:bold;letter-spacing:1px;">${EMAIL_BRAND.name}</div>
                    <div style="font-size:12px;opacity:0.95;padding-top:4px;">${EMAIL_BRAND.tagline}</div>
                  </td>
                  <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:30px;line-height:1;">&#128230;</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:30px 28px 8px 28px;font-family:Arial,Helvetica,sans-serif;color:${EMAIL_BRAND.navy};">
              <h1 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;color:${EMAIL_BRAND.navy};">${title}</h1>
              <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.navySoft};">${intro}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px 26px 28px;font-family:Arial,Helvetica,sans-serif;color:${EMAIL_BRAND.navy};">
              ${bodyHtml}
            </td>
          </tr>

          ${
            afterHtml.length > 0
              ? `<tr><td style="padding:0 28px 26px 28px;">${afterHtml}</td></tr>`
              : ""
          }

          <tr>
            <td bgcolor="${EMAIL_BRAND.cream}" style="background-color:${EMAIL_BRAND.cream};padding:20px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${EMAIL_BRAND.navySoft};">
              <div style="font-weight:bold;color:${EMAIL_BRAND.navy};font-size:13px;padding-bottom:4px;">${EMAIL_BRAND.footerLine}</div>
              <div>${EMAIL_BRAND.locations}</div>
              <div style="padding-top:8px;">${footerNote}</div>
            </td>
          </tr>

        </table>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#6B7C93;padding:14px 8px 0 8px;">&copy; SRM Enterprises. All Rights Reserved.</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** A single label/value row inside the inquiry details table. */
export function renderDetailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:9px 12px 9px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6B7C93;vertical-align:top;width:150px;">${label}</td>
    <td style="padding:9px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${EMAIL_BRAND.navy};vertical-align:top;word-break:break-word;">${value}</td>
  </tr>`;
}

export function renderDetailsTable(rows: string, title = "Requirement Details"): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#FFFFFF;border:1px solid #E3EDFF;border-radius:16px;padding:6px 16px;">
    <tr><td colspan="2" style="padding:14px 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${EMAIL_BRAND.blue};font-weight:bold;">${title}</td></tr>
    ${rows}
  </table>`;
}

export function renderPlainText(lines: Array<string | undefined>): string {
  return lines.filter((line): line is string => typeof line === "string" && line.length > 0).join("\n");
}

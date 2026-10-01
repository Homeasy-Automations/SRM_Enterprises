import { INQUIRY_LIMITS } from "@srm/shared";

/**
 * Text hardening for every user-supplied string.
 *
 * Strategy: strip HTML tags and control characters so no markup can ever be stored or
 * echoed, then collapse whitespace. Escape helpers are used again at render time in the
 * email templates (defence in depth).
 */

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const HTML_TAGS = /<\/?[a-z][^>]*>/gi;
const SCRIPTISH = /(javascript:|data:text\/html|vbscript:|on[a-z]+\s*=)/gi;

export function stripHtml(value: string): string {
  return value
    .replace(HTML_TAGS, " ")
    .replace(SCRIPTISH, " ")
    .replace(CONTROL_CHARS, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Escape for safe interpolation into HTML text nodes and attributes. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape then convert newlines to <br /> for multi-line values inside HTML emails. */
export function escapeHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

/** Escape a value used inside a mailto: href. */
export function escapeMailto(value: string): string {
  return encodeURIComponent(value.replace(/[\r\n]/g, ""));
}

/** Header-injection guard for values placed in email subjects. */
export function singleLine(value: string, maxLength = 160): string {
  return stripHtml(value.replace(/[\r\n]+/g, " ")).slice(0, maxLength);
}

/**
 * Recursively sanitises every string in an object.
 * Keys beginning with "$" or containing "." are dropped (NoSQL operator injection)
 * in addition to `express-mongo-sanitize`.
 */
export function sanitizeValue(input: unknown, depth = 0): unknown {
  if (depth > 6) return input;

  if (typeof input === "string") {
    return stripHtml(input);
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeValue(item, depth + 1));
  }

  if (input !== null && typeof input === "object") {
    const source = input as Record<string, unknown>;
    const clean: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(source)) {
      if (key.startsWith("$") || key.includes(".")) continue;
      clean[key] = sanitizeValue(value, depth + 1);
    }
    return clean;
  }

  return input;
}

/** Clamp helper used after sanitisation so lengths always match the Zod contract. */
export function clamp(value: string | undefined, max: number): string | undefined {
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  if (trimmed.length === 0) return undefined;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

export const textLimits = INQUIRY_LIMITS;

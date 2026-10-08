import { createHmac } from "node:crypto";

/**
 * Visitor IPs are never stored. Only a salted HMAC digest is kept, which is enough to
 * spot repeated abuse while staying far away from raw personal data.
 */
export function hashIp(ip: string | undefined, salt: string): string | undefined {
  if (!ip || ip.trim().length === 0) return undefined;
  return createHmac("sha256", salt).update(ip.trim()).digest("hex");
}

/** Best-effort client IP extraction that works behind Render/Railway/Vercel proxies. */
export function getClientIp(headers: Record<string, unknown>, socketAddress?: string): string | undefined {
  const forwarded = headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    const first = forwarded.split(",")[0];
    if (first && first.trim().length > 0) return first.trim();
  }
  const realIp = headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim().length > 0) return realIp.trim();
  return socketAddress;
}

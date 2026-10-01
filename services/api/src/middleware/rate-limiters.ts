import rateLimit, { type Options } from "express-rate-limit";
import type { Request, Response } from "express";
import { RATE_LIMITS } from "@srm/shared";
import { env } from "../config/env";

const standardHeaders = true as const;
const legacyHeaders = false as const;

function handler(_req: Request, res: Response): void {
  res.status(429).json({
    success: false,
    message: "Too many requests. Please wait a few minutes before trying again.",
    errors: [],
  });
}

function build(overrides: Partial<Options>): ReturnType<typeof rateLimit> {
  return rateLimit({
    standardHeaders,
    legacyHeaders,
    handler,
    // Health checks and load balancers should never consume the visitor's quota.
    skip: (req) => req.method === "OPTIONS" || req.path === "/health",
    ...overrides,
  });
}

/** Strict limit for the public write endpoint (POST /api/inquiries). */
export const inquiryRateLimiter = build({
  windowMs: RATE_LIMITS.inquiries.windowMs,
  max: env.NODE_ENV === "production" ? RATE_LIMITS.inquiries.max : RATE_LIMITS.inquiries.max * 10,
  message: "Too many inquiries submitted from this network.",
});

/** General limit for everything else. */
export const generalRateLimiter = build({
  windowMs: RATE_LIMITS.general.windowMs,
  max: env.NODE_ENV === "production" ? RATE_LIMITS.general.max : RATE_LIMITS.general.max * 4,
});

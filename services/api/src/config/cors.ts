import type { CorsOptions } from "cors";
import { allowedOrigins, env } from "./env";
import { logger } from "../utils/logger";

/**
 * CORS policy — an explicit allow-list build from CLIENT_URL (comma separated),
 * including both www and apex variants. Requests without an Origin header
 * (curl, health checks, server-to-server) are allowed through; they are not browser driven.
 */
export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    const normalised = origin.replace(/\/+$/, "").toLowerCase();
    if (allowedOrigins.includes(normalised)) return callback(null, true);

    // Local development convenience: allow any localhost port.
    if (env.NODE_ENV !== "production" && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalised)) {
      return callback(null, true);
    }

    logger.warn({ origin }, "Blocked by CORS");
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"],
  exposedHeaders: ["RateLimit-Limit", "RateLimit-Remaining", "RateLimit-Reset"],
  credentials: false,
  maxAge: 86_400,
  optionsSuccessStatus: 204,
};

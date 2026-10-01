import { config as loadDotenv } from "dotenv";
import { z } from "zod";
import { logger } from "../utils/logger";

loadDotenv();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),

  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required (mongodb:// or mongodb+srv:// connection string).")
    .refine((value) => value.startsWith("mongodb://") || value.startsWith("mongodb+srv://"), {
      message: "MONGODB_URI must start with mongodb:// or mongodb+srv://",
    }),

  CLIENT_URL: z
    .string()
    .min(1, "CLIENT_URL is required — comma separated list of allowed browser origins."),

  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required."),
  RESEND_FROM_EMAIL: z
    .string()
    .min(3, "RESEND_FROM_EMAIL is required, e.g. SRM Enterprises <noreply@your-domain.com>."),
  CONTACT_RECEIVER_EMAIL: z
    .string()
    .email("CONTACT_RECEIVER_EMAIL must be a valid email address."),

  IP_HASH_SALT: z
    .string()
    .min(8, "IP_HASH_SALT must be at least 8 characters. Use a long random string."),

  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  TRUST_PROXY: z.coerce.number().int().min(0).max(10).default(1),
});

export type Env = z.infer<typeof envSchema>;

function formatIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
}

function parseEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    // Fail fast, loudly, and with an actionable message.
    console.error(
      "\n[SRM API] Invalid or missing environment variables:\n" +
        formatIssues(parsed.error) +
        "\n\nCopy services/api/.env.example to services/api/.env and fill in the values.\n",
    );
    process.exit(1);
  }
  return parsed.data;
}

export const env = parseEnv();

/**
 * Normalises an origin: trims, removes trailing slashes, lowercases the scheme/host,
 * and expands an apex domain into its www variant (and vice versa) so CORS keeps working
 * whichever host the visitor typed.
 */
export function normaliseOrigin(origin: string): string {
  const trimmed = origin.trim().replace(/\/+$/, "");
  if (trimmed.length === 0) return trimmed;
  return trimmed.toLowerCase();
}

export function expandOriginVariants(origin: string): string[] {
  const normalised = normaliseOrigin(origin);
  if (normalised.length === 0) return [];

  const variants = new Set<string>([normalised]);
  try {
    const url = new URL(normalised);
    const { protocol, hostname, port } = url;
    const portPart = port ? `:${port}` : "";
    if (hostname.startsWith("www.")) {
      variants.add(`${protocol}//${hostname.slice(4)}${portPart}`);
    } else if (!/^\d+(\.\d+){3}$/.test(hostname) && hostname.includes(".")) {
      variants.add(`${protocol}//www.${hostname}${portPart}`);
    }
  } catch {
    // Not a parseable URL (e.g. a custom scheme) — keep the normalised value only.
  }
  return [...variants];
}

/** Final allow-list used by the CORS middleware: every CLIENT_URL entry plus www/apex twins. */
export function buildAllowedOrigins(clientUrl: string, extra: string[] = []): string[] {
  const entries = [...clientUrl.split(","), ...extra]
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);

  const allowed = new Set<string>();
  for (const entry of entries) {
    for (const variant of expandOriginVariants(entry)) {
      allowed.add(variant);
    }
  }
  return [...allowed];
}

export const allowedOrigins = buildAllowedOrigins(env.CLIENT_URL);

logger.debug({ allowedOrigins }, "CORS allow-list resolved");

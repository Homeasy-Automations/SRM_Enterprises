/**
 * Typed fetch helper for the SRM Enterprises API.
 * - base URL from NEXT_PUBLIC_API_URL with trailing slashes stripped
 * - request timeout via AbortController
 * - every failure normalised to { ok: false, message, errors }
 * - internal detail (stack traces, driver messages) is never surfaced to users
 */
import type { ApiErrorResponse, ApiFieldError } from "@srm/types";

const RAW_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").trim();

/**
 * Trailing slashes are stripped so `${API_BASE_URL}/api/inquiries` is always well formed.
 * An EMPTY value means "this origin" — requests go to `/api/...` relatively, which is what
 * you want when the API shares the site's domain (via a reverse proxy or the optional
 * `API_PROXY_TARGET` rewrite in next.config.mjs). Local development sets it to
 * http://localhost:5000 in apps/web/.env.local.
 */
export const API_BASE_URL: string = RAW_BASE_URL.replace(/\/+$/, "");

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/api/health`,
  inquiries: `${API_BASE_URL}/api/inquiries`,
} as const;

/** Shown in the UI when the API is not reachable, without leaking any internals. */
export const API_BASE_LABEL = API_BASE_URL.length > 0 ? API_BASE_URL : "same origin (/api)";

export const DEFAULT_TIMEOUT_MS = 15_000;

export type ApiResult<TData> =
  | { ok: true; data: TData }
  | { ok: false; message: string; errors: ApiFieldError[]; status: number };

export interface RequestOptions {
  timeoutMs?: number;
  signal?: AbortSignal;
}

export class ApiRequestError extends Error {
  public readonly status: number;
  public readonly errors: ApiFieldError[];

  constructor(message: string, status: number, errors: ApiFieldError[] = []) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.errors = errors;
  }
}

function isErrorEnvelope(value: unknown): value is ApiErrorResponse {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return candidate.success === false && typeof candidate.message === "string";
}

/** Turns any thrown value into a safe, human-readable message. */
export function normaliseError(error: unknown): { message: string; errors: ApiFieldError[]; status: number } {
  if (error instanceof ApiRequestError) {
    return { message: error.message, errors: error.errors, status: error.status };
  }

  if (error instanceof DOMException && error.name === "AbortError") {
    return {
      message: "The request took too long. Please check your connection and try again.",
      errors: [],
      status: 0,
    };
  }

  if (error instanceof TypeError) {
    return {
      message:
        "We could not reach our server. Please check your internet connection, or send the requirement on WhatsApp.",
      errors: [],
      status: 0,
    };
  }

  // Deliberately generic: no stack traces, no internal identifiers.
  return {
    message: "Something went wrong while submitting. Please try again in a moment.",
    errors: [],
    status: 0,
  };
}

async function request<TData>(
  url: string,
  init: RequestInit,
  options: RequestOptions = {},
): Promise<ApiResult<TData>> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, signal } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
      },
      cache: "no-store",
    });

    const text = await response.text();
    let parsed: unknown = null;
    if (text.length > 0) {
      try {
        parsed = JSON.parse(text) as unknown;
      } catch {
        parsed = null;
      }
    }

    if (!response.ok) {
      if (isErrorEnvelope(parsed)) {
        return {
          ok: false,
          message: parsed.message,
          errors: Array.isArray(parsed.errors) ? parsed.errors : [],
          status: response.status,
        };
      }
      return {
        ok: false,
        message:
          response.status >= 500
            ? "Our server is having trouble right now. Please try again shortly, or reach us on WhatsApp."
            : "The submission could not be processed. Please check your details and try again.",
        errors: [],
        status: response.status,
      };
    }

    if (parsed === null) {
      return {
        ok: false,
        message: "Our server returned an unexpected response. Please try again in a moment.",
        errors: [],
        status: response.status,
      };
    }

    // Success: the parsed body is returned as-is (both envelopes and raw payloads are supported).
    return { ok: true, data: parsed as TData };
  } catch (error) {
    const normalised = normaliseError(error);
    return { ok: false, ...normalised };
  } finally {
    clearTimeout(timeoutId);
  }
}

export interface InquiryFormPayload {
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
  consentGiven: boolean;
  honeypot?: string;
  source?: string;
}

export interface SubmitInquiryResponse {
  success: true;
  message: string;
}

/** POST /api/inquiries — the only public write endpoint. */
export async function submitInquiry(
  payload: InquiryFormPayload,
  options?: RequestOptions,
): Promise<ApiResult<SubmitInquiryResponse>> {
  return request<SubmitInquiryResponse>(
    API_ENDPOINTS.inquiries,
    { method: "POST", body: JSON.stringify(payload) },
    options,
  );
}

export interface HealthResponse {
  status: string;
  uptime: number;
  timestamp: string;
  database: string;
}

/** GET /api/health — used by the API status badge on the contact page. */
export async function checkApiHealth(options?: RequestOptions): Promise<ApiResult<HealthResponse>> {
  return request<HealthResponse>(API_ENDPOINTS.health, { method: "GET" }, { timeoutMs: 6000, ...options });
}

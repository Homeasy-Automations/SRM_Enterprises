/**
 * Domain types for SRM Enterprises frontend.
 * Pure types only — no runtime code, no dependencies.
 */

/** Product category slugs. Must stay in sync with `PRODUCT_CATEGORY_SLUGS` in config. */
export type ProductCategorySlug =
  | "corrugated-packaging"
  | "epe-foam-packaging"
  | "bubble-protective-packaging"
  | "poly-bags-films"
  | "packaging-accessories";

/** Industry slugs. Must stay in sync with `INDUSTRY_SLUGS` in config. */
export type IndustrySlug =
  | "automotive"
  | "engineering"
  | "electronics"
  | "pharmaceuticals"
  | "food-fmcg"
  | "ecommerce-logistics";

/** Lifecycle of a stored inquiry. */
export type InquiryStatus = "new" | "contacted" | "quoted" | "closed";

/** Per-channel delivery result for the two Resend emails. */
export interface EmailStatus {
  adminSent: boolean;
  customerSent: boolean;
  lastError?: string;
}

/**
 * Shape of a contact/quote inquiry.
 */
export interface ContactInquiry {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  productCategory: ProductCategorySlug;
  material?: string;
  quantity?: string;
  size?: string;
  thickness?: string;
  application?: string;
  message: string;
  status: InquiryStatus;
  source: string;
  consentGiven: boolean;
  emailStatus: EmailStatus;
  ipHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Payload accepted by `POST /api/inquiries` (already parsed/validated). */
export interface InquiryInput {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  productCategory: ProductCategorySlug;
  material?: string;
  quantity?: string;
  size?: string;
  thickness?: string;
  application?: string;
  message: string;
  consentGiven: boolean;
  /** Honeypot — must stay empty for real humans; filled values are silently discarded. */
  honeypot?: string;
  /** Optional free-form source tag, e.g. "website" (default) or "google-ads". */
  source?: string;
}

/** Successful API envelope. */
export interface ApiSuccessResponse<TData = undefined> {
  success: true;
  message: string;
  data?: TData;
}

/** Failed API envelope — the only error shape the API ever returns. */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: ApiFieldError[];
}

export interface ApiFieldError {
  field: string;
  message: string;
}

/** Union used by the frontend fetch helper. */
export type ApiResponse<TData = undefined> = ApiSuccessResponse<TData> | ApiErrorResponse;

export interface HealthPayload {
  status: "ok" | "degraded";
  uptime: number;
  timestamp: string;
  database: "connected" | "disconnected" | "connecting" | "disconnecting" | "unknown";
}

/** Light palettes available through the floating "Color Mood" switcher. */
export type ColorMoodId = "ocean" | "citrus" | "meadow" | "berry";

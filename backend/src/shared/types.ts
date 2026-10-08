/**
 * Domain types for SRM Enterprises API.
 * Pure types only — no runtime code, no dependencies.
 */

export type ProductCategorySlug =
  | "corrugated-packaging"
  | "epe-foam-packaging"
  | "bubble-protective-packaging"
  | "poly-bags-films"
  | "packaging-accessories";

export type IndustrySlug =
  | "automotive"
  | "engineering"
  | "electronics"
  | "pharmaceuticals"
  | "food-fmcg"
  | "ecommerce-logistics";

export type InquiryStatus = "new" | "contacted" | "quoted" | "closed";

export interface EmailStatus {
  adminSent: boolean;
  customerSent: boolean;
  lastError?: string;
}

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
  honeypot?: string;
  source?: string;
}

export interface ApiSuccessResponse<TData = undefined> {
  success: true;
  message: string;
  data?: TData;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: ApiFieldError[];
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export type ApiResponse<TData = undefined> = ApiSuccessResponse<TData> | ApiErrorResponse;

export interface HealthPayload {
  status: "ok" | "degraded";
  uptime: number;
  timestamp: string;
  database: "connected" | "disconnected" | "connecting" | "disconnecting" | "unknown";
}

export type ColorMoodId = "ocean" | "citrus" | "meadow" | "berry";

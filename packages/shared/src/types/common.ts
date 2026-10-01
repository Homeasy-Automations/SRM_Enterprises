/** Re-exported domain types so consumers only need a single import path. */
export type {
  ApiErrorResponse,
  ApiFieldError,
  ApiResponse,
  ApiSuccessResponse,
  ColorMoodId,
  ContactInquiry,
  EmailStatus,
  HealthPayload,
  IndustrySlug,
  InquiryInput,
  InquiryStatus,
  ProductCategorySlug,
} from "@srm/types";

export const SERVICE_NAME = "srm-enterprises-api";

/** Default user-facing error copy. Screens never see stack traces or database messages. */
export const FRIENDLY_ERRORS = {
  generic: "Something went wrong on our side. Please try again in a moment.",
  validation: "Please check the highlighted fields and try again.",
  notFound: "The requested resource was not found.",
  rateLimited: "Too many requests. Please wait a few minutes and try again.",
  unavailable:
    "We could not save your inquiry right now. Please try again, or reach us on WhatsApp or phone.",
  invalidJson: "The request body could not be read.",
  payloadTooLarge: "The submitted data is too large.",
} as const;

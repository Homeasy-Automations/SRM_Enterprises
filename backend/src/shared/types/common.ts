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
} from "../types";

export const SERVICE_NAME = "srm-enterprises-api";

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

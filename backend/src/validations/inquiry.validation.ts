/**
 * The public API and the React form share one Zod schema (@srm/shared), so the rules
 * can never drift apart. This module only re-exports what the API needs.
 */
export {
  inquirySchema,
  normaliseInquiry,
  type InquirySchemaInput,
  type InquirySchemaOutput,
} from "@srm/shared";

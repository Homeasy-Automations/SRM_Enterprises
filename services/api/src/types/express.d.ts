import type { InquiryInput } from "@srm/types";

/**
 * Request bodies that have already been parsed by Zod middleware.
 * Keeping this here means controllers can be written without casts.
 */
declare global {
  namespace Express {
    interface Request {
      /** Set by validateBody(inquirySchema) on POST /api/inquiries. */
      inquiryBody?: InquiryInput;
    }
  }
}

export {};

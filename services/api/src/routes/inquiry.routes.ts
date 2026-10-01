import { Router } from "express";
import { createInquiry } from "../controllers";
import { asyncHandler, inquiryRateLimiter, validateBody } from "../middleware";
import { inquirySchema } from "../validations";

/**
 * Public, write-only inquiry routes.
 * There is intentionally no GET, PATCH or DELETE handler anywhere in this file:
 * stored inquiries are reviewed and updated directly in MongoDB Atlas.
 */
export const inquiryRouter = Router();

inquiryRouter.post("/", inquiryRateLimiter, validateBody(inquirySchema), asyncHandler(createInquiry));

/** Anything other than POST on this path is rejected explicitly. */
inquiryRouter.all("/", (_req, res) => {
  res.status(405).json({
    success: false,
    message: "Method not allowed. Inquiries can only be submitted with POST.",
    errors: [],
  });
});

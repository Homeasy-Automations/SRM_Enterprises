import { Router } from "express";
import { healthRouter } from "./health.routes";
import { inquiryRouter } from "./inquiry.routes";

/**
 * API surface (mounted at /api):
 *   GET  /api/health     — liveness + database state
 *   POST /api/inquiries  — public, rate limited, write-only
 *
 * No authentication, no admin routes, no read/list/update/delete endpoints.
 */
export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/inquiries", inquiryRouter);

/** Unmatched /api/* paths get the standard error envelope, not an HTML page. */
apiRouter.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
    errors: [],
  });
});

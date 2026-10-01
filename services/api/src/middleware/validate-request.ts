import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodTypeAny } from "zod";
import { sanitizeValue } from "../utils/sanitize-text";
import { ValidationError } from "../utils/errors";

/**
 * Validates (and sanitises) the request body against a Zod schema.
 * The parsed, typed result replaces `req.body`, so controllers only ever see clean data.
 */
export function validateBody(schema: ZodTypeAny): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    // Strips HTML/control characters and drops $-prefixed or dotted keys before parsing.
    const sanitised: unknown = sanitizeValue(req.body ?? {});
    const result = schema.safeParse(sanitised);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.length > 0 ? issue.path.join(".") : "(body)",
        message: issue.message,
      }));
      next(new ValidationError(errors));
      return;
    }

    req.body = result.data as Record<string, unknown>;
    next();
  };
}

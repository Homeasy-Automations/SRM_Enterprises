import type { NextFunction, Request, Response } from "express";
import { MongooseError } from "mongoose";
import { Error as MongooseValidationError } from "mongoose";
import { ZodError } from "zod";
import type { ApiErrorResponse } from "@srm/types";
import { FRIENDLY_ERRORS } from "@srm/shared";
import { AppError } from "../utils/errors";
import { logger } from "../utils/logger";

/** 404 for anything that did not match a route. */
export function notFoundHandler(req: Request, res: Response): void {
  const payload: ApiErrorResponse = {
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    errors: [],
  };
  res.status(404).json(payload);
}

interface HttpLikeError {
  status?: number;
  statusCode?: number;
  type?: string;
  message?: string;
  code?: number;
  keyValue?: Record<string, unknown>;
}

/**
 * Centralized error middleware — the single place errors become HTTP responses.
 * Stack traces, driver messages and any internal detail are logged with pino and
 * replaced by a friendly message, so nothing internal can leak to a visitor.
 */
export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    next(error);
    return;
  }

  const baseLog = { method: req.method, path: req.originalUrl };

  // 1. Errors the application raised deliberately.
  if (error instanceof AppError) {
    if (error.statusCode >= 500) {
      logger.error({ err: error, ...baseLog }, error.message);
    } else {
      logger.warn({ err: error, ...baseLog }, error.message);
    }
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    } satisfies ApiErrorResponse);
    return;
  }

  // 2. Body parser / transport problems.
  if (error instanceof SyntaxError && "body" in (error as object)) {
    logger.warn({ err: error, ...baseLog }, "Malformed JSON body");
    res.status(400).json({
      success: false,
      message: FRIENDLY_ERRORS.invalidJson,
      errors: [],
    } satisfies ApiErrorResponse);
    return;
  }

  // 3. Mongoose schema validation (should be rare — Zod runs first).
  if (error instanceof MongooseValidationError.ValidationError) {
    const errors = Object.values(error.errors).map((issue) => ({
      field: issue.path,
      message: "This value could not be stored. Please check the format and try again.",
    }));
    logger.warn({ err: error, ...baseLog }, "Mongoose validation failed");
    res.status(422).json({
      success: false,
      message: FRIENDLY_ERRORS.validation,
      errors,
    } satisfies ApiErrorResponse);
    return;
  }

  // 4. Zod errors that reached this point uncaught.
  if (error instanceof ZodError) {
    logger.warn({ err: error, ...baseLog }, "Unhandled Zod validation error");
    res.status(422).json({
      success: false,
      message: FRIENDLY_ERRORS.validation,
      errors: error.issues.map((issue) => ({
        field: issue.path.join(".") || "(body)",
        message: issue.message,
      })),
    } satisfies ApiErrorResponse);
    return;
  }

  // 5. Generic HTTP-ish errors (CORS rejection, payload too large, …).
  const httpError = error as HttpLikeError;
  const status = httpError.status ?? httpError.statusCode;

  if (typeof status === "number" && status >= 400 && status < 500) {
    logger.warn({ err: error, ...baseLog }, "Client error");
    const message =
      httpError.type === "entity.too.large"
        ? FRIENDLY_ERRORS.payloadTooLarge
        : httpError.type === "entity.parse.failed"
          ? FRIENDLY_ERRORS.invalidJson
          : httpError.message === "Not allowed by CORS"
            ? "This origin is not allowed to submit inquiries."
            : FRIENDLY_ERRORS.generic;
    res.status(status).json({ success: false, message, errors: [] } satisfies ApiErrorResponse);
    return;
  }

  // 6. Database connectivity problems.
  if (error instanceof MongooseError) {
    logger.error({ err: error, ...baseLog }, "Database error");
    res.status(503).json({
      success: false,
      message: FRIENDLY_ERRORS.unavailable,
      errors: [],
    } satisfies ApiErrorResponse);
    return;
  }

  // 7. Anything else: log the real thing, tell the visitor nothing useful.
  logger.error({ err: error, ...baseLog }, "Unhandled error");
  res.status(500).json({
    success: false,
    message: FRIENDLY_ERRORS.generic,
    errors: [],
  } satisfies ApiErrorResponse);
}

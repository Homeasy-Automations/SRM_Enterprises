import type { ApiFieldError } from "@srm/types";
import { FRIENDLY_ERRORS } from "@srm/shared";

/** Base class for every error the API raises deliberately. */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors: ApiFieldError[];
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = 500,
    errors: ApiFieldError[] = [],
    isOperational = true,
  ) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, new.target);
  }
}

/** 422 — request body failed Zod validation. Carries per-field messages for the form. */
export class ValidationError extends AppError {
  constructor(errors: ApiFieldError[], message: string = FRIENDLY_ERRORS.validation) {
    super(message, 422, errors);
  }
}

/** 400 — malformed request (bad JSON, oversized payload, …). */
export class BadRequestError extends AppError {
  constructor(message: string = FRIENDLY_ERRORS.invalidJson) {
    super(message, 400);
  }
}

/** 404 — unknown route. */
export class NotFoundError extends AppError {
  constructor(message: string = FRIENDLY_ERRORS.notFound) {
    super(message, 404);
  }
}

/** 503 — database unavailable. Email failures never use this class: the inquiry is still saved. */
export class DatabaseUnavailableError extends AppError {
  constructor(message: string = FRIENDLY_ERRORS.unavailable) {
    super(message, 503);
  }
}

/** True when an error came from Zod or a Mongoose validation problem. */
export function isOperationalError(error: unknown): boolean {
  return error instanceof AppError && error.isOperational;
}

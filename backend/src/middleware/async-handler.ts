import type { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Wraps an async route handler so rejected promises reach the centralized error middleware
 * instead of hanging the request (Express 4 does not forward async errors by itself).
 */
export function asyncHandler<TRequest extends Request = Request>(
  handler: (req: TRequest, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler {
  return (req, res, next) => {
    void Promise.resolve(handler(req as TRequest, res, next)).catch(next);
  };
}

import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import pinoHttp from "pino-http";
import { BODY_LIMIT } from "@srm/shared";
import { corsOptions } from "./config/cors";
import { env } from "./config/env";
import { generalRateLimiter } from "./middleware/rate-limiters";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";
import { apiRouter } from "./routes";
import { logger } from "./utils/logger";

/**
 * Express application assembly.
 * Order: trust proxy -> security headers -> CORS -> body parsing -> sanitising ->
 * logging -> rate limiting -> routes -> 404 -> centralized error handler.
 */
export function createApp(): Express {
  const app = express();

  // Behind Render/Railway/Vercel proxies: needed for correct client IPs in rate limiting.
  app.set("trust proxy", env.TRUST_PROXY);
  app.disable("x-powered-by");

  app.use(
    helmet({
      contentSecurityPolicy: false, // API only serves JSON; CSP belongs to the web app.
      crossOriginResourcePolicy: { policy: "cross-origin" },
      referrerPolicy: { policy: "no-referrer" },
    }),
  );

  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));

  app.use(express.json({ limit: BODY_LIMIT }));
  app.use(express.urlencoded({ extended: false, limit: BODY_LIMIT }));

  // Strips $ and . operators from body/params/query before anything else touches them.
  app.use(
    mongoSanitize({
      replaceWith: "_",
      allowDots: false,
    }),
  );

  app.use(compression());

  app.use(
    pinoHttp({
      logger,
      autoLogging: {
        ignore: (req) => req.url === "/api/health",
      },
      customLogLevel: (_req, res, error) => {
        if (error || res.statusCode >= 500) return "error";
        if (res.statusCode >= 400) return "warn";
        return "info";
      },
    }),
  );

  app.use(generalRateLimiter);
  app.use("/api", apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

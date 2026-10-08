import pino from "pino";

/**
 * Structured logging. Levels are read from the environment so hosting platforms can
 * turn the noise up or down. Pretty printing is only enabled outside production.
 */
const level = process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug");
const isProduction = process.env.NODE_ENV === "production";

export const logger = pino({
  level,
  base: { service: "srm-enterprises-api" },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "req.body.email",
      "req.body.phone",
      "req.body.whatsapp",
      "res.headers['set-cookie']",
    ],
    censor: "[redacted]",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "HH:MM:ss", ignore: "pid,hostname,service" },
      },
});

export type Logger = typeof logger;

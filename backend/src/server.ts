import { createApp } from "./app";
import { connectDatabase, registerShutdownHandlers } from "./config/db";
import { env } from "./config/env";
import { logger } from "./utils/logger";

/**
 * Process entry point: connect to MongoDB (degraded mode is acceptable), then listen.
 * Render/Railway health checks hit GET /api/health.
 */
async function bootstrap(): Promise<void> {
  registerShutdownHandlers((code) => process.exit(code));

  await connectDatabase();

  const app = createApp();

  // 0.0.0.0 so container platforms and previews can reach the port.
  const server = app.listen(env.PORT, "0.0.0.0", () => {
    logger.info(
      { port: env.PORT, env: env.NODE_ENV },
      `SRM Enterprises API listening on http://0.0.0.0:${env.PORT}`,
    );
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
      logger.fatal({ port: env.PORT }, "Port already in use");
    } else {
      logger.fatal({ err: error }, "HTTP server error");
    }
    process.exit(1);
  });
}

void bootstrap();

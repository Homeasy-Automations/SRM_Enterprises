import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";

/**
 * MongoDB connection management.
 *
 * - Never throws out of the process: a failed connection is logged and the API keeps serving
 *   /api/health so the hosting platform can report a degraded state instead of a crash loop.
 * - Registers one-time listeners for disconnects, and closes cleanly on SIGTERM/SIGINT.
 * - The connection is cached on the module so a new collection can be added later
 *   (model + schema + route + controller) without touching infrastructure code.
 */

mongoose.set("strictQuery", true);
mongoose.set("sanitizeFilter", true);

let listenersRegistered = false;

function registerListeners(): void {
  if (listenersRegistered) return;
  listenersRegistered = true;

  mongoose.connection.on("connected", () => logger.info("MongoDB connected"));
  mongoose.connection.on("open", () => logger.debug("MongoDB connection open"));
  mongoose.connection.on("disconnected", () => logger.warn("MongoDB disconnected"));
  mongoose.connection.on("reconnected", () => logger.info("MongoDB reconnected"));
  mongoose.connection.on("error", (error: unknown) => {
    logger.error({ err: error }, "MongoDB connection error");
  });
}

/** mongoose readyState values, read as plain numbers to keep comparisons unambiguous. */
const READY_STATE = { DISCONNECTED: 0, CONNECTED: 1, CONNECTING: 2, DISCONNECTING: 3 } as const;

export async function connectDatabase(): Promise<void> {
  registerListeners();

  if (Number(mongoose.connection.readyState) === READY_STATE.CONNECTED) return;

  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS: 45_000,
      maxPoolSize: 10,
      autoIndex: env.NODE_ENV !== "production",
      dbName: "srm-enterprises",
    });
  } catch (error) {
    logger.error(
      { err: error },
      "Initial MongoDB connection failed — API will start in degraded mode; inquiries cannot be stored until the database is reachable.",
    );
  }
}

export type DatabaseState = "connected" | "disconnected" | "connecting" | "disconnecting";

export function getDatabaseState(): DatabaseState {
  switch (Number(mongoose.connection.readyState)) {
    case READY_STATE.CONNECTED:
      return "connected";
    case READY_STATE.CONNECTING:
      return "connecting";
    case READY_STATE.DISCONNECTING:
      return "disconnecting";
    default:
      return "disconnected";
  }
}

export function isDatabaseReady(): boolean {
  return getDatabaseState() === "connected";
}

export async function disconnectDatabase(): Promise<void> {
  if (Number(mongoose.connection.readyState) === READY_STATE.DISCONNECTED) return;
  try {
    await mongoose.connection.close(false);
    logger.info("MongoDB connection closed");
  } catch (error) {
    logger.error({ err: error }, "Error while closing the MongoDB connection");
  }
}

/** Wires process-level shutdown once, from server.ts. */
export function registerShutdownHandlers(exit: (code: number) => void): void {
  const shutdown = (signal: NodeJS.Signals): void => {
    logger.info({ signal }, "Shutting down");
    void disconnectDatabase().finally(() => exit(0));
  };

  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
  process.once("unhandledRejection", (reason) => {
    logger.error({ err: reason }, "Unhandled promise rejection");
  });
  process.once("uncaughtException", (error) => {
    logger.fatal({ err: error }, "Uncaught exception — exiting");
    void disconnectDatabase().finally(() => exit(1));
  });
}

import type { Request, Response } from "express";
import type { HealthPayload } from "@srm/types";
import { getDatabaseState, isDatabaseReady } from "../config/db";

/**
 * GET /api/health — used by Render/Railway health checks and by uptime monitors.
 * Always answers 200 so a flaky database does not trigger a restart loop; the payload
 * reports the database state so the platform dashboards stay honest.
 */
export function getHealth(_req: Request, res: Response): void {
  const payload: HealthPayload = {
    status: isDatabaseReady() ? "ok" : "degraded",
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    database: getDatabaseState(),
  };
  res.status(200).json(payload);
}

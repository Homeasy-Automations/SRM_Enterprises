import { Router } from "express";
import { getHealth } from "../controllers";

export const healthRouter = Router();

/**
 * Liveness endpoint — intentionally synchronous and dependency-free so it always answers,
 * even while the database is reconnecting (the payload reports the database state).
 */
healthRouter.get("/", getHealth);

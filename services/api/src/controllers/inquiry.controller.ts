import type { Request, Response } from "express";
import type { ApiSuccessResponse, InquiryInput } from "@srm/types";
import { env } from "../config/env";
import { submitInquiry } from "../services/inquiry.service";
import { getClientIp, hashIp } from "../utils/hash";
import { logger } from "../utils/logger";

interface InquirySuccessData {
  inquiryRef?: string;
}

/**
 * POST /api/inquiries — the only public write endpoint.
 *
 * Order of operations matters: the inquiry is saved BEFORE emails are attempted, so a
 * mail outage can never lose a lead. Honeypot hits return the same success shape.
 */
export async function createInquiry(req: Request, res: Response): Promise<void> {
  // Parsed and sanitised by validateBody(inquirySchema) before this runs.
  const payload: InquiryInput = req.body as InquiryInput;

  const ip = getClientIp(req.headers, req.socket.remoteAddress);
  const ipHash = hashIp(ip, env.IP_HASH_SALT);

  const result = await submitInquiry(payload, {
    ipHash,
    source: payload.source,
  });

  if (result === null) {
    // Bot: identical response to a real submission, nothing stored.
    const honeypotResponse: ApiSuccessResponse<InquirySuccessData> = {
      success: true,
      message: "Inquiry submitted successfully",
    };
    res.status(201).json(honeypotResponse);
    return;
  }

  logger.info(
    { inquiryRef: result.id, emails: result.email },
    "Inquiry accepted (emails attempted after storage)",
  );

  const response: ApiSuccessResponse<InquirySuccessData> = {
    success: true,
    message: "Inquiry submitted successfully",
  };
  res.status(201).json(response);
}

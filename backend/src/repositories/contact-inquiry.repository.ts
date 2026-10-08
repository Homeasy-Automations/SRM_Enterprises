import type { EmailStatus } from "@srm/types";
import { ContactInquiryModel, type ContactInquiryDocument } from "../models";
import type { InquiryRecord } from "../types/inquiry";
import { DatabaseUnavailableError } from "../utils/errors";
import { isDatabaseReady } from "../config/db";
import { logger } from "../utils/logger";

/**
 * Repository layer: every Mongoose call in the project lives here.
 * Controllers/services never touch the driver directly, so the storage engine stays swappable.
 */
export interface ContactInquiryRepository {
  create(record: InquiryRecord): Promise<ContactInquiryDocument>;
  updateEmailStatus(id: string, status: EmailStatus): Promise<void>;
}

function assertDatabaseReady(): void {
  if (!isDatabaseReady()) {
    logger.error("Write attempted while MongoDB is not connected");
    throw new DatabaseUnavailableError();
  }
}

export const contactInquiryRepository: ContactInquiryRepository = {
  /** Persists a validated, sanitised inquiry. This is the only write path in the API. */
  async create(record: InquiryRecord): Promise<ContactInquiryDocument> {
    assertDatabaseReady();
    const document = await ContactInquiryModel.create({
      ...record,
      emailStatus: { adminSent: false, customerSent: false },
    });
    return document;
  },

  /**
   * Records whether the two Resend emails went out. A failure here is logged but never
   * thrown upward: the inquiry is already safely stored, which is what matters.
   */
  async updateEmailStatus(id: string, status: EmailStatus): Promise<void> {
    if (!isDatabaseReady()) {
      logger.warn({ id }, "Skipped emailStatus update — database not connected");
      return;
    }
    try {
      await ContactInquiryModel.updateOne({ _id: id }, { $set: { emailStatus: status } }).exec();
    } catch (error) {
      logger.error({ err: error, id }, "Failed to update emailStatus for inquiry");
    }
  },
};

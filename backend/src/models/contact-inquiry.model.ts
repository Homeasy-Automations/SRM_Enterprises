import { INQUIRY_DEFAULTS, INQUIRY_STATUSES } from "@srm/shared";
import { Schema, model, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

/**
 * ContactInquiry — the only collection this project writes to.
 *
 * There is deliberately no admin UI: inquiries are read, filtered and status-edited
 * directly in MongoDB Atlas (Data Explorer, mongosh or mongoexport). Status is an enum so
 * Atlas shows friendly dropdown values in the Data Explorer.
 */
const contactInquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    companyName: { type: String, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    whatsapp: { type: String, trim: true, maxlength: 20 },
    productCategory: { type: String, required: true, trim: true, index: true },
    material: { type: String, trim: true, maxlength: 120 },
    quantity: { type: String, trim: true, maxlength: 80 },
    size: { type: String, trim: true, maxlength: 120 },
    thickness: { type: String, trim: true, maxlength: 80 },
    application: { type: String, trim: true, maxlength: 140 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: INQUIRY_STATUSES,
      default: INQUIRY_DEFAULTS.status,
      index: true,
    },
    source: { type: String, trim: true, maxlength: 60, default: INQUIRY_DEFAULTS.source },
    consentGiven: { type: Boolean, required: true, default: false },
    emailStatus: {
      adminSent: { type: Boolean, default: false },
      customerSent: { type: Boolean, default: false },
      lastError: { type: String, maxlength: 500 },
    },
    /** Salted HMAC of the visitor IP — the raw address is never stored. */
    ipHash: { type: String, maxlength: 128 },
  },
  {
    timestamps: true,
    collection: "contactinquiries",
    versionKey: false,
  },
);

/**
 * Indexes for the queries the team actually runs in Atlas / mongosh.
 * Nothing reads through the API — these exist purely to keep manual exploration fast.
 */
contactInquirySchema.index({ createdAt: -1 });
contactInquirySchema.index({ email: 1 });
contactInquirySchema.index({ status: 1, createdAt: -1 });
contactInquirySchema.index({ productCategory: 1, createdAt: -1 });

export type ContactInquirySchema = InferSchemaType<typeof contactInquirySchema>;
export type ContactInquiryDocument = HydratedDocument<ContactInquirySchema>;

export const ContactInquiryModel: Model<ContactInquirySchema> = model<ContactInquirySchema>(
  "ContactInquiry",
  contactInquirySchema,
);

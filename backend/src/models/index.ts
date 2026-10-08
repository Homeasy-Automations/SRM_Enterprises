export {
  ContactInquiryModel,
  type ContactInquiryDocument,
  type ContactInquirySchema,
} from "./contact-inquiry.model";

/**
 * Adding a future collection is intentionally a four-file change:
 *   1. a model here, 2. a repository in ../repositories,
 *   3. a service in ../services, 4. a route + controller wired in ../routes/index.ts
 * No infrastructure, connection or middleware code needs to change.
 */

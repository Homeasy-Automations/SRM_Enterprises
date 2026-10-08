import type { InquiryStatus, ProductCategorySlug } from "@srm/types";

/** Exactly what gets written to the `contactinquiries` collection. */
export interface InquiryRecord {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  productCategory: ProductCategorySlug;
  material?: string;
  quantity?: string;
  size?: string;
  thickness?: string;
  application?: string;
  message: string;
  status: InquiryStatus;
  source: string;
  consentGiven: boolean;
  ipHash?: string;
}

export interface SubmitInquiryResult {
  id: string;
  email: {
    adminSent: boolean;
    customerSent: boolean;
  };
}

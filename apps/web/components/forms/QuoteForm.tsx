"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { inquirySchema, type InquirySchemaInput } from "@srm/shared";
import { products } from "@/data/products";
import { FORM_SUCCESS_MESSAGE } from "@/lib/constants";
import { submitInquiry } from "@/lib/api";
import { analytics } from "@/lib/analytics";
import { FormField } from "./FormField";
import { cn } from "@/lib/utils";

type FormValues = InquirySchemaInput;

type SubmitState = "idle" | "submitting" | "success" | "error";

const FIELD_LABELS: Record<string, string> = {
  name: "name",
  companyName: "company name",
  email: "email",
  phone: "phone",
  whatsapp: "WhatsApp number",
  productCategory: "product category",
  material: "required material",
  quantity: "quantity",
  size: "required size",
  thickness: "thickness / ply",
  application: "application",
  message: "message",
  consentGiven: "privacy consent",
  honeypot: "form",
  source: "form",
};

const DEFAULT_VALUES: FormValues = {
  name: "",
  companyName: "",
  email: "",
  phone: "",
  whatsapp: "",
  productCategory: products[0]?.slug ?? "corrugated-packaging",
  material: "",
  quantity: "",
  size: "",
  thickness: "",
  application: "",
  message: "",
  consentGiven: false,
  honeypot: "",
  source: "website",
};

/**
 * Quote / contact form.
 *
 * Really submits to POST /api/inquiries (see lib/api.ts) — no mock responses anywhere.
 * Validation rules come from the same shared Zod schema the API parses with. The API's
 * `message` and per-field `errors` are surfaced in the UI; a failure never wipes the
 * visitor's input. Duplicate submits are blocked while a request is in flight.
 */
export function QuoteForm(): JSX.Element {
  const searchParams = useSearchParams();
  const requestedProduct = searchParams.get("product");
  const preselected = useMemo(
    () => products.find((product) => product.slug === requestedProduct)?.slug,
    [requestedProduct],
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(inquirySchema) as unknown as Resolver<FormValues>,
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const hasStarted = useRef(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  // ?product=<slug> pre-selects the category and brings the form into view.
  useEffect(() => {
    if (!preselected) return;
    setValue("productCategory", preselected, { shouldValidate: false });
    const timer = window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);
    return () => window.clearTimeout(timer);
  }, [preselected, setValue]);

  const selectedCategory = watch("productCategory");

  const onFirstInteraction = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    analytics.quoteFormStart(selectedCategory);
  }, [selectedCategory]);

  const onSubmit = async (values: FormValues): Promise<void> => {
    if (isSubmitting) return; // extra guard against double submits
    setSubmitState("submitting");
    setStatusMessage("Submitting your requirement…");
    setServerErrors([]);
    clearErrors();

    const payload = {
      name: values.name,
      companyName: values.companyName?.trim() ? values.companyName : undefined,
      email: values.email,
      phone: values.phone,
      whatsapp: values.whatsapp?.trim() ? values.whatsapp : undefined,
      productCategory: values.productCategory,
      material: values.material?.trim() ? values.material : undefined,
      quantity: values.quantity?.trim() ? values.quantity : undefined,
      size: values.size?.trim() ? values.size : undefined,
      thickness: values.thickness?.trim() ? values.thickness : undefined,
      application: values.application?.trim() ? values.application : undefined,
      message: values.message,
      consentGiven: values.consentGiven,
      honeypot: values.honeypot ?? "",
      source: "website",
    };

    const result = await submitInquiry(payload);

    if (result.ok) {
      setSubmitState("success");
      setStatusMessage(FORM_SUCCESS_MESSAGE);
      analytics.quoteSubmitted(values.productCategory);
      reset({ ...DEFAULT_VALUES, productCategory: values.productCategory });
      hasStarted.current = false;
      return;
    }

    setSubmitState("error");
    setStatusMessage(result.message);

    const fieldErrors: string[] = [];
    for (const issue of result.errors) {
      const field = issue.field.replace(/^body\./, "");
      const humanLabel = FIELD_LABELS[field] ?? field;
      fieldErrors.push(`${humanLabel}: ${issue.message}`);
      if (field in DEFAULT_VALUES) {
        setError(field as keyof FormValues, { type: "server", message: issue.message });
      }
    }
    setServerErrors(fieldErrors);
  };

  const buttonLabel =
    submitState === "submitting"
      ? "Submitting..."
      : submitState === "success"
        ? "Submitted Successfully"
        : "Request a Quote";

  return (
    <div className="w-full" id="quote-form">
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        onFocusCapture={onFirstInteraction}
        noValidate
        className="relative scroll-mt-28 rounded-[28px] border border-navy/10 bg-white p-5 shadow-card sm:p-7 lg:p-8"
        aria-labelledby="quote-form-heading"
      >
        <div className="flex flex-col gap-2">
          <h2 id="quote-form-heading" className="font-display text-2xl font-bold text-navy">
            Request a Quote
          </h2>
          <p className="text-sm leading-relaxed text-navy-soft">
            Share your size, material, quantity and application. Fields marked with{" "}
            <span className="font-semibold text-[#B3275B]">*</span> are required.
          </p>
        </div>

        {/* Status region — announced to screen readers, never relies on colour alone. */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {statusMessage}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormField id="name" label="Name" required error={errors.name?.message}>
            {(fieldProps) => (
              <input
                {...fieldProps}
                {...register("name")}
                type="text"
                autoComplete="name"
                placeholder="Your full name"
              />
            )}
          </FormField>

          <FormField id="companyName" label="Company" error={errors.companyName?.message}>
            {(fieldProps) => (
              <input
                {...fieldProps}
                {...register("companyName")}
                type="text"
                autoComplete="organization"
                placeholder="Company name"
              />
            )}
          </FormField>

          <FormField id="email" label="Email" required error={errors.email?.message}>
            {(fieldProps) => (
              <input
                {...fieldProps}
                {...register("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="name@company.com"
              />
            )}
          </FormField>

          <FormField
            id="phone"
            label="Phone"
            required
            hint="Include the STD or country code where possible."
            error={errors.phone?.message}
          >
            {(fieldProps) => (
              <input
                {...fieldProps}
                {...register("phone")}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 XXXXX XXXXX"
              />
            )}
          </FormField>

          <FormField id="whatsapp" label="WhatsApp" error={errors.whatsapp?.message}>
            {(fieldProps) => (
              <input
                {...fieldProps}
                {...register("whatsapp")}
                type="tel"
                inputMode="tel"
                placeholder="If different from phone"
              />
            )}
          </FormField>

          <FormField
            id="productCategory"
            label="Product Category"
            required
            error={errors.productCategory?.message}
          >
            {(fieldProps) => (
              <Controller
                name="productCategory"
                control={control}
                render={({ field }) => (
                  <select
                    {...fieldProps}
                    id="productCategory"
                    name={field.name}
                    value={field.value}
                    onChange={(event) => field.onChange(event.target.value)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  >
                    {products.map((product) => (
                      <option key={product.slug} value={product.slug}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            )}
          </FormField>

          <FormField
            id="material"
            label="Required Material"
            hint="Corrugated 5-ply, EPE 25mm, LDPE film, BOPP tape…"
            error={errors.material?.message}
          >
            {(fieldProps) => (
              <input {...fieldProps} {...register("material")} type="text" placeholder="Material or grade" />
            )}
          </FormField>

          <FormField id="quantity" label="Quantity" error={errors.quantity?.message}>
            {(fieldProps) => (
              <input
                {...fieldProps}
                {...register("quantity")}
                type="text"
                placeholder="e.g. 5000 boxes / per month"
              />
            )}
          </FormField>

          <FormField id="size" label="Required Size" error={errors.size?.message}>
            {(fieldProps) => (
              <input
                {...fieldProps}
                {...register("size")}
                type="text"
                placeholder="e.g. 600 x 400 x 300 mm"
              />
            )}
          </FormField>

          <FormField
            id="thickness"
            label="Thickness / Ply"
            error={errors.thickness?.message}
          >
            {(fieldProps) => (
              <input
                {...fieldProps}
                {...register("thickness")}
                type="text"
                placeholder="e.g. 5-ply / 25 mm / 100 micron"
              />
            )}
          </FormField>

          <FormField
            id="application"
            label="Application"
            className="sm:col-span-2"
            hint="What is being packed, and how is it handled or transported?"
            error={errors.application?.message}
          >
            {(fieldProps) => (
              <input
                {...fieldProps}
                {...register("application")}
                type="text"
                placeholder="e.g. auto components in transit"
              />
            )}
          </FormField>

          <FormField
            id="message"
            label="Message"
            required
            className="sm:col-span-2"
            error={errors.message?.message}
          >
            {(fieldProps) => (
              <textarea
                {...fieldProps}
                {...register("message")}
                rows={5}
                placeholder="Describe the requirement — product, packing process, timeline and anything else that helps us quote accurately."
                className={cn(fieldProps.className, "min-h-[140px] resize-y")}
              />
            )}
          </FormField>
        </div>

        {/* Honeypot: hidden from humans and assistive tech; bots that fill it are discarded. */}
        <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="companyWebsite">Company website</label>
          <input
            id="companyWebsite"
            {...register("honeypot")}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <input
              id="consentGiven"
              {...register("consentGiven")}
              type="checkbox"
              aria-describedby={errors.consentGiven ? "consentGiven-error" : "consentGiven-hint"}
              aria-invalid={Boolean(errors.consentGiven)}
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-navy/25 text-accent accent-[color:var(--accent)] focus-visible:ring-4 focus-visible:ring-accent/25"
            />
            <label htmlFor="consentGiven" className="text-sm leading-relaxed text-navy-soft">
              I agree to be contacted about this requirement and accept the{" "}
              <a href="/privacy" className="link-accent">
                Privacy Policy
              </a>
              .
              <span className="ml-1 font-semibold text-[#B3275B]" aria-hidden="true">
                *
              </span>
              {errors.consentGiven ? (
                <span id="consentGiven-error" className="mt-1 block text-xs font-medium text-[#B3275B]">
                  {errors.consentGiven.message}
                </span>
              ) : (
                <span id="consentGiven-hint" className="sr-only">
                  Required to submit the form
                </span>
              )}
            </label>
          </div>

          {submitState === "success" ? (
            <div
              role="status"
              className="flex items-start gap-3 rounded-2xl border border-[#19B26B]/30 bg-[#EAFBF4] p-4 text-sm text-navy"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F8B55]" aria-hidden="true" />
              <div>
                <p className="font-semibold">{statusMessage}</p>
                <p className="mt-1 text-navy-soft">
                  A confirmation has been emailed to you. For anything urgent, use the WhatsApp button
                  on this page.
                </p>
              </div>
            </div>
          ) : null}

          {submitState === "error" ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-[#D63C69]/30 bg-[#FFF5F8] p-4 text-sm text-navy"
            >
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#B3275B]" aria-hidden="true" />
              <div>
                <p className="font-semibold">{statusMessage}</p>
                {serverErrors.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-navy-soft">
                    {serverErrors.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                ) : null}
                <p className="mt-2 text-xs text-navy-soft">
                  Your details are still in the form — nothing has been lost.
                </p>
              </div>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting || submitState === "submitting"}
            aria-busy={isSubmitting || submitState === "submitting"}
            className={cn(
              "btn-primary w-full text-base sm:w-auto sm:min-w-[240px]",
              (isSubmitting || submitState === "submitting") && "cursor-wait opacity-90",
              submitState === "success" && "bg-[#19B26B]",
            )}
          >
            {isSubmitting || submitState === "submitting" ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : submitState === "success" ? (
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
            {buttonLabel}
          </button>

          <p className="text-xs leading-relaxed text-navy-soft">
            Your inquiry is stored securely for the purpose of responding to your requirement and is
            never published. {isDirty ? "" : "Nothing is sent until you press Request a Quote."}
          </p>
        </div>
      </form>
    </div>
  );
}

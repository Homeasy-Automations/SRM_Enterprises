"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check, CheckCircle2, AlertTriangle, Loader2, ArrowRight, ShieldCheck, Box, MessageSquare } from "lucide-react";
import { products } from "@/data/products";
import { submitInquiry } from "@/lib/api";
import { analytics } from "@/lib/analytics";
import { getWhatsAppLink } from "@/data/company";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import type { ProductCategorySlug } from "@srm/types";
import { cn } from "@/lib/utils";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
  source?: string;
}

const CATEGORY_MAP: Record<string, ProductCategorySlug> = {
  "corrugated-packaging": "corrugated-packaging",
  "epe-foam-packaging": "epe-foam-packaging",
  "bubble-protective-packaging": "bubble-protective-packaging",
  "poly-bags-films": "poly-bags-films",
  "packaging-accessories": "packaging-accessories",
};

export function QuoteModal({ isOpen, onClose, initialProduct, source = "modal" }: QuoteModalProps): JSX.Element | null {
  useBodyScrollLock(isOpen);

  // Form states
  const [productCategory, setProductCategory] = useState<ProductCategorySlug>(() => {
    if (initialProduct && CATEGORY_MAP[initialProduct]) {
      return CATEGORY_MAP[initialProduct];
    }
    return "corrugated-packaging";
  });

  // Dynamic fields
  const [corrugatedPly, setCorrugatedPly] = useState("5 Ply");
  const [corrugatedBoxType, setCorrugatedBoxType] = useState("Regular");
  const [foamFormat, setFoamFormat] = useState("Custom Fitment");
  const [foamThickness, setFoamThickness] = useState("20 mm");
  const [bubbleType, setBubbleType] = useState("Roll");
  const [polyMaterial, setPolyMaterial] = useState("LDPE");
  const [polyPrinting, setPolyPrinting] = useState("Plain");
  const [accessoryType, setAccessoryType] = useState("BOPP Tape");

  // Quantity and size
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("Pieces");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [dimensionUnit, setDimensionUnit] = useState("mm");

  // Contact fields
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [consentGiven, setConsentGiven] = useState(true);

  // Validation & status
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Update initial product when modal opens with new selection
  useEffect(() => {
    if (initialProduct && CATEGORY_MAP[initialProduct]) {
      setProductCategory(CATEGORY_MAP[initialProduct]);
    }
  }, [initialProduct, isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Validations
  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const digitsInPhone = (phone.match(/\d/g) ?? []).length;
  const isPhoneValid = digitsInPhone >= 10;
  const isCompanyValid = company.trim().length >= 2;

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, company: true, email: true, phone: true });

    if (!isNameValid || !isEmailValid || !isPhoneValid || !consentGiven) {
      return;
    }

    setSubmitStatus("submitting");
    setServerMessage("");

    // Build specification string from dynamic fields
    let dynamicSpec = "";
    if (productCategory === "corrugated-packaging") {
      dynamicSpec = `Ply: ${corrugatedPly} | Box Type: ${corrugatedBoxType}`;
    } else if (productCategory === "epe-foam-packaging") {
      dynamicSpec = `Format: ${foamFormat} | Thickness: ${foamThickness}`;
    } else if (productCategory === "bubble-protective-packaging") {
      dynamicSpec = `Type: ${bubbleType}`;
    } else if (productCategory === "poly-bags-films") {
      dynamicSpec = `Polymer: ${polyMaterial} | Finish: ${polyPrinting}`;
    } else if (productCategory === "packaging-accessories") {
      dynamicSpec = `Product: ${accessoryType}`;
    }

    const sizeCombined = length && width ? `${length} x ${width}${height ? ` x ${height}` : ""} ${dimensionUnit}` : undefined;
    const qtyCombined = quantity.trim() ? `${quantity.trim()} ${quantityUnit}` : undefined;

    const fullMessage = [
      dynamicSpec ? `[Specification] ${dynamicSpec}` : "",
      city ? `[Location] ${city}` : "",
      message.trim() ? `[Details] ${message.trim()}` : "",
      `[Quick Quote Modal Request]`,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const result = await submitInquiry({
        name: name.trim(),
        companyName: company.trim() || undefined,
        email: email.trim(),
        phone: phone.trim(),
        productCategory,
        material: dynamicSpec || undefined,
        quantity: qtyCombined,
        size: sizeCombined,
        application: city ? `Delivery to: ${city}` : undefined,
        message: fullMessage || `Quote inquiry for ${productCategory} via website modal.`,
        consentGiven: true,
        source: `modal-${source}`,
      });

      if (result.ok) {
        setSubmitStatus("success");
        setServerMessage("Your packaging requirement has been submitted! Our team will contact you shortly.");
        analytics.quoteSubmitted(productCategory);
        setTimeout(() => {
          // Reset form after delay
          setName("");
          setCompany("");
          setEmail("");
          setPhone("");
          setCity("");
          setMessage("");
          setQuantity("");
          setLength("");
          setWidth("");
          setHeight("");
          setTouched({});
        }, 1500);
      } else {
        setSubmitStatus("error");
        setServerMessage(result.message || "Failed to submit requirement. Please try again.");
      }
    } catch {
      setSubmitStatus("error");
      setServerMessage("A network error occurred. Please try again or reach us via WhatsApp.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-5 md:p-6 pt-20 sm:pt-24 pb-8 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card - balanced, evenly sized, with integrated non-overlapping close button */}
      <div
        ref={modalRef}
        className="relative z-10 flex flex-col md:flex-row w-full max-w-4xl lg:max-w-5xl h-[88vh] max-h-[640px] my-auto md:my-0 overflow-hidden rounded-3xl bg-white shadow-2xl border border-navy/10 animate-in zoom-in-95 duration-200"
      >
        {/* Mobile Close Button (shown on top banner only on small screens) */}
        <button
          type="button"
          onClick={onClose}
          className="md:hidden absolute top-3.5 right-3.5 z-30 grid h-8 w-8 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* LEFT COLUMN: Brand & Assurance */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-navy via-[#102340] to-[#0A1629] text-white p-6 sm:p-7 flex flex-col justify-between shrink-0 overflow-y-auto h-full [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-contrast">
              <Box className="h-3.5 w-3.5 text-accent-highlight" />
              Request a Quote
            </span>

            <h2 className="mt-3.5 font-display text-2xl sm:text-[26px] font-bold leading-tight">
              Complete Packaging Solutions for your requirement.
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white/80">
              Share your dimensions and quantities to receive an engineered recommendation and direct factory commercial quote.
            </p>

            <ul className="mt-5 space-y-2 text-xs sm:text-sm font-medium text-white/90">
              <li className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Check className="h-3 w-3" />
                </span>
                Custom industrial specifications
              </li>
              <li className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Check className="h-3 w-3" />
                </span>
                Scheduled bulk plant supply
              </li>
              <li className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Check className="h-3 w-3" />
                </span>
                Reliable Pan-India dispatch logistics
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">Usually helpful:</p>
              <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs text-white/80">
                <div className="rounded-lg bg-white/5 px-2.5 py-1.5">✓ Dimensions</div>
                <div className="rounded-lg bg-white/5 px-2.5 py-1.5">✓ Material / Grade</div>
                <div className="rounded-lg bg-white/5 px-2.5 py-1.5">✓ Target Quantity</div>
                <div className="rounded-lg bg-white/5 px-2.5 py-1.5">✓ Application Load</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
            <span>Quick response?</span>
            <a
              href={getWhatsAppLink("Hello SRM Enterprises, I need a quick quote on packaging material.") ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form with Clean Top Header & Contained Scroll */}
        <div className="w-full md:w-7/12 flex flex-col h-full bg-white min-h-0">
          {/* Header Row: Title & Non-overlapping Desktop Close Button */}
          <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-5 pb-3.5 border-b border-navy/10 shrink-0">
            <div>
              <h3 id="quote-modal-title" className="font-display text-xl sm:text-2xl font-bold text-navy leading-snug">
                Tell Us About Your Requirement
              </h3>
              <p className="text-xs text-navy-soft mt-0.5">
                Fill in your specifications below for a rapid response.
              </p>
            </div>
            {/* Desktop Close Button - cleanly integrated in header row, generous hit area, zero overlap */}
            <button
              type="button"
              onClick={onClose}
              className="hidden md:grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-navy hover:bg-rose-50 hover:text-rose-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Form Body with custom sleek scrollbar */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 min-h-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-navy/20 hover:[&::-webkit-scrollbar-thumb]:bg-navy/40 [&::-webkit-scrollbar-track]:bg-transparent">
            {submitStatus === "success" ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-in zoom-in-75">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h4 className="font-display text-2xl font-bold text-navy">Inquiry Sent Successfully ✓</h4>
                <p className="mt-2 text-sm text-navy-soft max-w-sm">
                  Thank you! Our packaging engineers are reviewing your requirement and will contact you promptly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                {/* Product Category */}
                <div>
                  <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                    Product Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value as ProductCategorySlug)}
                    className="w-full rounded-xl border border-navy/20 bg-slate-50/50 px-3.5 py-2 text-sm font-medium text-navy focus:border-accent focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    {products.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

              {/* Dynamic Smart Fields based on Product */}
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-3.5 space-y-3">
                <p className="text-xs font-semibold text-accent flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Category Specific Options:
                </p>

                {productCategory === "corrugated-packaging" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="block text-xs font-medium text-navy-soft mb-1">Ply:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {["3 Ply", "5 Ply", "7 Ply", "Custom"].map((ply) => (
                          <button
                            type="button"
                            key={ply}
                            onClick={() => setCorrugatedPly(ply)}
                            className={cn(
                              "px-2.5 py-1 text-xs rounded-md border font-medium transition-all",
                              corrugatedPly === ply
                                ? "bg-accent text-white border-accent shadow-xs"
                                : "bg-white text-navy border-navy/15 hover:border-accent/40"
                            )}
                          >
                            {ply}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-navy-soft mb-1">Box Type:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Regular", "Die-Cut", "Heavy Duty", "Printed"].map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setCorrugatedBoxType(type)}
                            className={cn(
                              "px-2 py-1 text-xs rounded-md border font-medium transition-all",
                              corrugatedBoxType === type
                                ? "bg-accent text-white border-accent shadow-xs"
                                : "bg-white text-navy border-navy/15 hover:border-accent/40"
                            )}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {productCategory === "epe-foam-packaging" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="block text-xs font-medium text-navy-soft mb-1">Format:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Sheet", "Roll", "Bag", "Custom Fitment"].map((fmt) => (
                          <button
                            type="button"
                            key={fmt}
                            onClick={() => setFoamFormat(fmt)}
                            className={cn(
                              "px-2 py-1 text-xs rounded-md border font-medium transition-all",
                              foamFormat === fmt
                                ? "bg-accent text-white border-accent"
                                : "bg-white text-navy border-navy/15"
                            )}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-navy-soft mb-1">Thickness:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {["5 mm", "10 mm", "20 mm", "50 mm+"].map((th) => (
                          <button
                            type="button"
                            key={th}
                            onClick={() => setFoamThickness(th)}
                            className={cn(
                              "px-2 py-1 text-xs rounded-md border font-medium transition-all",
                              foamThickness === th
                                ? "bg-accent text-white border-accent"
                                : "bg-white text-navy border-navy/15"
                            )}
                          >
                            {th}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {productCategory === "bubble-protective-packaging" && (
                  <div>
                    <span className="block text-xs font-medium text-navy-soft mb-1">Bubble Format:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["Roll", "Cut Sheet", "Pouch / Bag", "Heavy Duty Anti-Static"].map((bType) => (
                        <button
                          type="button"
                          key={bType}
                          onClick={() => setBubbleType(bType)}
                          className={cn(
                            "px-2.5 py-1 text-xs rounded-md border font-medium transition-all",
                            bubbleType === bType
                              ? "bg-accent text-white border-accent"
                              : "bg-white text-navy border-navy/15"
                          )}
                        >
                          {bType}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {productCategory === "poly-bags-films" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="block text-xs font-medium text-navy-soft mb-1">Material:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {["LDPE", "LLDPE", "HM", "Stretch Film"].map((m) => (
                          <button
                            type="button"
                            key={m}
                            onClick={() => setPolyMaterial(m)}
                            className={cn(
                              "px-2 py-1 text-xs rounded-md border font-medium transition-all",
                              polyMaterial === m
                                ? "bg-accent text-white border-accent"
                                : "bg-white text-navy border-navy/15"
                            )}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-navy-soft mb-1">Printing:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {["Plain", "Custom Printed"].map((pr) => (
                          <button
                            type="button"
                            key={pr}
                            onClick={() => setPolyPrinting(pr)}
                            className={cn(
                              "px-2 py-1 text-xs rounded-md border font-medium transition-all",
                              polyPrinting === pr
                                ? "bg-accent text-white border-accent"
                                : "bg-white text-navy border-navy/15"
                            )}
                          >
                            {pr}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {productCategory === "packaging-accessories" && (
                  <div>
                    <span className="block text-xs font-medium text-navy-soft mb-1">Accessory Item:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["BOPP Tape", "Box Strapping", "Edge Protector", "VCI Film", "ESD Protection"].map((acc) => (
                        <button
                          type="button"
                          key={acc}
                          onClick={() => setAccessoryType(acc)}
                          className={cn(
                            "px-2.5 py-1 text-xs rounded-md border font-medium transition-all",
                            accessoryType === acc
                              ? "bg-accent text-white border-accent"
                              : "bg-white text-navy border-navy/15"
                          )}
                        >
                          {acc}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity & Dimensions Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">Quantity</label>
                  <div className="flex rounded-xl border border-navy/20 overflow-hidden bg-slate-50/50 focus-within:border-accent focus-within:bg-white focus-within:ring-2 focus-within:ring-accent/20">
                    <input
                      type="text"
                      placeholder="e.g. 1000"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm bg-transparent outline-none text-navy placeholder:text-slate-400"
                    />
                    <select
                      value={quantityUnit}
                      onChange={(e) => setQuantityUnit(e.target.value)}
                      className="bg-navy/5 text-xs font-medium px-2 py-1.5 border-l border-navy/15 outline-none cursor-pointer text-navy"
                    >
                      <option value="Pieces">Pieces</option>
                      <option value="Boxes">Boxes</option>
                      <option value="Rolls">Rolls</option>
                      <option value="Sets">Sets</option>
                      <option value="Kg">Kg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-navy">Dimensions (L × W × H)</label>
                    <select
                      value={dimensionUnit}
                      onChange={(e) => setDimensionUnit(e.target.value)}
                      aria-label="Dimension Unit"
                      className="text-[11px] font-semibold text-accent bg-transparent outline-none cursor-pointer"
                    >
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                      <option value="inches">inch</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <input
                      type="text"
                      placeholder="L"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="rounded-xl border border-navy/20 bg-slate-50/50 px-2.5 py-1.5 text-sm text-center outline-none focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent/20 text-navy placeholder:text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="W"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="rounded-xl border border-navy/20 bg-slate-50/50 px-2.5 py-1.5 text-sm text-center outline-none focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent/20 text-navy placeholder:text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="H"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="rounded-xl border border-navy/20 bg-slate-50/50 px-2.5 py-1.5 text-sm text-center outline-none focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent/20 text-navy placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-navy">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    {touched.name && isNameValid && <Check className="h-3.5 w-3.5 text-emerald-600 animate-in fade-in" />}
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Ayush Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => markTouched("name")}
                    className={cn(
                      "w-full rounded-xl border px-3 py-1.5 text-sm outline-none transition-all placeholder:text-slate-400",
                      touched.name && !isNameValid
                        ? "border-rose-400 bg-rose-50/40 text-navy"
                        : touched.name && isNameValid
                          ? "border-emerald-400 bg-emerald-50/30 text-navy"
                          : "border-navy/20 bg-slate-50/50 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 text-navy"
                    )}
                  />
                  {touched.name && !isNameValid && (
                    <span className="text-[11px] text-rose-500 font-medium mt-0.5 block">Please enter your name</span>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-navy">
                      Company Name <span className="text-rose-500">*</span>
                    </label>
                    {touched.company && isCompanyValid && <Check className="h-3.5 w-3.5 text-emerald-600 animate-in fade-in" />}
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    onBlur={() => markTouched("company")}
                    className={cn(
                      "w-full rounded-xl border px-3 py-1.5 text-sm outline-none transition-all placeholder:text-slate-400",
                      touched.company && !isCompanyValid
                        ? "border-rose-400 bg-rose-50/40 text-navy"
                        : touched.company && isCompanyValid
                          ? "border-emerald-400 bg-emerald-50/30 text-navy"
                          : "border-navy/20 bg-slate-50/50 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 text-navy"
                    )}
                  />
                  {touched.company && !isCompanyValid && (
                    <span className="text-[11px] text-rose-500 font-medium mt-0.5 block">Please enter company name</span>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-navy">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    {touched.email && isEmailValid && <Check className="h-3.5 w-3.5 text-emerald-600 animate-in fade-in" />}
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => markTouched("email")}
                    className={cn(
                      "w-full rounded-xl border px-3 py-1.5 text-sm outline-none transition-all placeholder:text-slate-400",
                      touched.email && !isEmailValid
                        ? "border-rose-400 bg-rose-50/40 text-navy"
                        : touched.email && isEmailValid
                          ? "border-emerald-400 bg-emerald-50/30 text-navy"
                          : "border-navy/20 bg-slate-50/50 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 text-navy"
                    )}
                  />
                  {touched.email && !isEmailValid && (
                    <span className="text-[11px] text-rose-500 font-medium mt-0.5 block">Enter a valid email address</span>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-navy">
                      Phone / WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    {touched.phone && isPhoneValid && <Check className="h-3.5 w-3.5 text-emerald-600 animate-in fade-in" />}
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => markTouched("phone")}
                    className={cn(
                      "w-full rounded-xl border px-3 py-1.5 text-sm outline-none transition-all placeholder:text-slate-400",
                      touched.phone && !isPhoneValid
                        ? "border-rose-400 bg-rose-50/40 text-navy"
                        : touched.phone && isPhoneValid
                          ? "border-emerald-400 bg-emerald-50/30 text-navy"
                          : "border-navy/20 bg-slate-50/50 focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 text-navy"
                    )}
                  />
                  {touched.phone && !isPhoneValid && (
                    <span className="text-[11px] text-rose-500 font-medium mt-0.5 block">10-digit phone number required</span>
                  )}
                </div>
              </div>

              {/* City & Additional Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">City / Delivery Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune / Manesar / Chennai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-navy/20 bg-slate-50/50 px-3 py-1.5 text-sm outline-none focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent/20 text-navy placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">Application / Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. transit protection for auto parts"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-navy/20 bg-slate-50/50 px-3 py-1.5 text-sm outline-none focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent/20 text-navy placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="modal-consent"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-navy/30 text-accent accent-accent focus:ring-accent cursor-pointer"
                />
                <label htmlFor="modal-consent" className="text-xs text-navy-soft leading-normal cursor-pointer">
                  I agree to be contacted regarding my packaging inquiry as per the Privacy Policy.
                </label>
              </div>

              {/* Error message */}
              {submitStatus === "error" && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-2 text-xs text-rose-800">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>{serverMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitStatus === "submitting"}
                className={cn(
                  "w-full rounded-xl py-2.5 px-5 text-sm font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 mt-1",
                  submitStatus === "submitting"
                    ? "bg-navy/70 cursor-wait"
                    : "bg-navy hover:bg-navy/90 hover:shadow-lg hover:scale-[1.005]"
                )}
              >
                {submitStatus === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending Requirement...</span>
                  </>
                ) : (
                  <>
                    <span>Send Requirement</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

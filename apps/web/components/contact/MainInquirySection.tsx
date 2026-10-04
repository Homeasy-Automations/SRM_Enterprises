"use client";

import { useState } from "react";
import {
  Box,
  Layers,
  Shield,
  ShoppingBag,
  Film,
  Package,
  Sparkles,
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { submitInquiry } from "@/lib/api";
import { analytics } from "@/lib/analytics";
import { getWhatsAppLink } from "@/data/company";
import type { ProductCategorySlug } from "@srm/types";
import { cn } from "@/lib/utils";

// Category options corresponding to the user's chips
interface CategoryChip {
  id: string;
  name: string;
  slug: ProductCategorySlug;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const CATEGORY_CHIPS: CategoryChip[] = [
  { id: "corrugated", name: "Corrugated", slug: "corrugated-packaging", icon: Box, tag: "Boxes & Sheets" },
  { id: "epe-foam", name: "EPE Foam", slug: "epe-foam-packaging", icon: Layers, tag: "Cushioning" },
  { id: "bubble", name: "Bubble", slug: "bubble-protective-packaging", icon: Shield, tag: "Protective Wrap" },
  { id: "poly-bags", name: "Poly Bags", slug: "poly-bags-films", icon: ShoppingBag, tag: "LDPE / HM" },
  { id: "films", name: "Films", slug: "poly-bags-films", icon: Film, tag: "Stretch & Shrink" },
  { id: "accessories", name: "Accessories", slug: "packaging-accessories", icon: Package, tag: "Tape & Strapping" },
  { id: "custom", name: "Custom Packaging", slug: "corrugated-packaging", icon: Sparkles, tag: "Engineered Kits" },
];

export function MainInquirySection(): JSX.Element {
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Requirement
  const [selectedChipId, setSelectedChipId] = useState<string>("corrugated");
  const [requirementType, setRequirementType] = useState<"Trial Requirement" | "Regular Supply" | "Bulk Requirement">("Regular Supply");
  const [quantity, setQuantity] = useState("");
  const [quantityUnit, setQuantityUnit] = useState("Pieces");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [dimensionUnit, setDimensionUnit] = useState("mm");

  // Dynamic spec helpers
  const [corrugatedPly, setCorrugatedPly] = useState("5 Ply");
  const [corrugatedBoxType, setCorrugatedBoxType] = useState("Regular");
  const [foamThickness, setFoamThickness] = useState("20 mm");
  const [foamFormat, setFoamFormat] = useState("Sheet");
  const [bubbleFormat, setBubbleFormat] = useState("Roll");
  const [polyType, setPolyType] = useState("LDPE");
  const [accessoryItem, setAccessoryItem] = useState("BOPP Tape");
  const [materialDescription, setMaterialDescription] = useState("");

  // Step 2: Contact Details
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [application, setApplication] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [consentGiven, setConsentGiven] = useState(true);

  // Interactive Validation States
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Form submission state
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const defaultChip: CategoryChip = {
    id: "corrugated",
    name: "Corrugated",
    slug: "corrugated-packaging",
    icon: Box,
    tag: "Boxes & Sheets",
  };
  const activeChip: CategoryChip = CATEGORY_CHIPS.find((c) => c.id === selectedChipId) ?? CATEGORY_CHIPS[0] ?? defaultChip;

  // Validation predicates
  const isNameValid = name.trim().length >= 2;
  const isCompanyValid = companyName.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const phoneDigitsOnly = phone.replace(/\D/g, "");
  const isPhoneValid = phoneDigitsOnly.length >= 10 && phoneDigitsOnly.length <= 15;
  const isCityValid = city.trim().length >= 2;
  const isQuantityValid = !quantity.trim() || (/^\d+$/.test(quantity.trim()) && Number(quantity.trim()) > 0);

  const handleFieldBlur = (field: string) => {
    setFocusedField(null);
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const goToStep2 = () => {
    setTouched((prev) => ({ ...prev, quantity: true }));
    if (!isQuantityValid) return;
    setStep(2);
    // Smooth scroll to top of form if on mobile
    const el = document.getElementById("inquiry-form-card");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      companyName: true,
      email: true,
      phone: true,
      city: true,
    });

    if (!isNameValid || !isCompanyValid || !isEmailValid || !isPhoneValid || !isCityValid || !consentGiven) {
      return;
    }

    setSubmitStatus("submitting");
    setErrorMessage("");

    // Prepare composite specifications
    let specSummary = "";
    if (selectedChipId === "corrugated") {
      specSummary = `Corrugated: ${corrugatedPly} | Box Type: ${corrugatedBoxType}`;
    } else if (selectedChipId === "epe-foam") {
      specSummary = `EPE Foam: ${foamFormat} | Thickness: ${foamThickness}`;
    } else if (selectedChipId === "bubble") {
      specSummary = `Bubble: ${bubbleFormat}`;
    } else if (selectedChipId === "poly-bags" || selectedChipId === "films") {
      specSummary = `Film/Bag Material: ${polyType}`;
    } else if (selectedChipId === "accessories") {
      specSummary = `Accessory: ${accessoryItem}`;
    } else if (selectedChipId === "custom") {
      specSummary = `Custom Engineered Packaging Kit`;
    }

    if (materialDescription.trim()) {
      specSummary += ` — Notes: ${materialDescription.trim()}`;
    }

    const sizeFormatted =
      length.trim() && width.trim()
        ? `${length.trim()} × ${width.trim()}${height.trim() ? ` × ${height.trim()}` : ""} ${dimensionUnit}`
        : undefined;

    const quantityFormatted = quantity.trim() ? `${quantity.trim()} ${quantityUnit}` : undefined;

    const fullMessage = [
      `[Requirement Type] ${requirementType}`,
      specSummary ? `[Specification] ${specSummary}` : "",
      sizeFormatted ? `[Dimensions] ${sizeFormatted}` : "",
      quantityFormatted ? `[Quantity] ${quantityFormatted}` : "",
      `[Delivery Location] ${city.trim()}`,
      application.trim() ? `[Application] ${application.trim()}` : "",
      additionalMessage.trim() ? `[Additional Details] ${additionalMessage.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const result = await submitInquiry({
        name: name.trim(),
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        productCategory: activeChip.slug,
        material: specSummary || undefined,
        quantity: quantityFormatted,
        size: sizeFormatted,
        application: application.trim() || undefined,
        message: fullMessage,
        consentGiven: true,
        source: `contact-hub-${selectedChipId}`,
      });

      if (result.ok) {
        setSubmitStatus("success");
        analytics.quoteSubmitted(activeChip.slug);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || "Failed to submit requirement. Please check your details and try again.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Network connection timed out. Please try again or reach our team directly via WhatsApp.");
    }
  };

  const whatsappHref = getWhatsAppLink(
    `Hello SRM Enterprises, I am inquiring about ${activeChip.name} packaging. Please share available specifications and bulk quotation.`
  );

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden" id="inquiry-section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* LEFT: Information & Guidance */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/25 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
              03 • Tell Us About Your Requirement
            </span>

            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-navy leading-tight">
              Tell us what you&apos;re packing.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-navy-soft">
              The more details you share, the easier it is for our technical team to recommend the right packaging material,
              specification and volume-based pricing.
            </p>

            {/* Checklist */}
            <div className="mt-8 rounded-2xl border border-navy/10 bg-slate-50/70 p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy/70 mb-4">
                What Helps Us Engineer Your Solution:
              </h3>
              <ul className="space-y-3 text-sm text-navy">
                <li className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold">Product category &amp; format</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold">Required dimensions (L × W × H)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold">Material grade / thickness / ply</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold">Estimated quantity / regular demand</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold">Application &amp; transit handling load</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-semibold">Delivery location &amp; dispatch schedule</span>
                </li>
              </ul>
            </div>

            {/* Direct WhatsApp Callout for Drawings & Photos */}
            <div className="mt-6 rounded-2xl border border-emerald-500/25 bg-[#EAFBF4] p-5">
              <div className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-display text-sm font-bold text-navy">Have drawings or product photos?</h4>
                  <p className="mt-1 text-xs text-navy-soft leading-relaxed">
                    You can share component blueprints, CAD drawings, or sample photographs directly with our engineers on WhatsApp.
                  </p>
                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <span>WhatsApp Us</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Modern 2-Step Form */}
          <div className="lg:col-span-7" id="inquiry-form-card">
            <div className="rounded-3xl border border-navy/15 bg-white p-6 sm:p-9 shadow-xl relative overflow-hidden backdrop-blur-sm">
              {/* Form Heading & Step Indicator */}
              <div className="pb-6 border-b border-navy/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-navy">Send an Inquiry</h3>
                    <p className="text-xs text-navy-soft mt-0.5">
                      Direct engineering review with zero sales middlemen.
                    </p>
                  </div>

                  {/* 2-Step Visual Indicator */}
                  <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100/80 rounded-full px-3 py-1.5 border border-navy/10">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-bold rounded-full px-3 py-1 transition-all",
                        step === 1 ? "bg-navy text-white shadow-xs" : "text-navy-soft hover:text-navy"
                      )}
                    >
                      <span className="h-4 w-4 rounded-full bg-white/20 grid place-items-center text-[10px]">1</span>
                      <span>Requirement</span>
                    </button>
                    <span className="text-navy/30 text-xs">────────</span>
                    <button
                      type="button"
                      onClick={() => isQuantityValid && setStep(2)}
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-bold rounded-full px-3 py-1 transition-all",
                        step === 2 ? "bg-navy text-white shadow-xs" : "text-navy-soft hover:text-navy"
                      )}
                    >
                      <span className="h-4 w-4 rounded-full bg-white/20 grid place-items-center text-[10px]">2</span>
                      <span>Contact Details</span>
                    </button>
                  </div>
                </div>
              </div>

              {submitStatus === "success" ? (
                /* Success State */
                <div className="py-16 text-center animate-in zoom-in-95">
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h4 className="font-display text-3xl font-extrabold text-navy">Inquiry Sent Successfully ✓</h4>
                  <p className="mt-3 text-sm text-navy-soft max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-navy">{name}</span>. Your requirement has been routed directly to our packaging technical team. A confirmation email has also been sent to{" "}
                    <span className="font-bold text-navy">{email}</span>.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitStatus("idle");
                        setStep(1);
                      }}
                      className="rounded-full bg-navy px-7 py-3 text-sm font-bold text-white hover:bg-navy/90 transition-all"
                    >
                      Submit Another Requirement
                    </button>
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-100"
                      >
                        <MessageCircle className="h-4 w-4 text-emerald-600" />
                        <span>Follow Up on WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  {/* STEP 1: REQUIREMENT */}
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      {/* Product Category Selectable Visual Chips */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-2.5">
                          Product Category <span className="text-rose-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                          {CATEGORY_CHIPS.map((chip) => {
                            const Icon = chip.icon;
                            const isSelected = selectedChipId === chip.id;
                            return (
                              <button
                                type="button"
                                key={chip.id}
                                onClick={() => setSelectedChipId(chip.id)}
                                className={cn(
                                  "group relative flex flex-col items-start p-3 rounded-2xl border text-left transition-all duration-200",
                                  isSelected
                                    ? "border-accent bg-accent/5 ring-2 ring-accent/20 shadow-sm"
                                    : "border-navy/15 bg-white hover:border-accent/40 hover:bg-slate-50/70"
                                )}
                              >
                                <div
                                  className={cn(
                                    "grid h-8 w-8 place-items-center rounded-xl transition-all",
                                    isSelected
                                      ? "bg-accent text-white"
                                      : "bg-navy/5 text-navy group-hover:bg-accent/15 group-hover:text-accent"
                                  )}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <span className="mt-2 text-xs font-bold text-navy leading-tight">{chip.name}</span>
                                <span className="text-[10px] text-navy-soft leading-tight">{chip.tag}</span>
                                {isSelected && (
                                  <span className="absolute top-2.5 right-2.5 grid h-4 w-4 place-items-center rounded-full bg-accent text-white">
                                    <Check className="h-2.5 w-2.5" />
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Requirement Type Segmented Control */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">
                          Requirement Type
                        </label>
                        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-navy/15 bg-slate-50/70 p-1.5">
                          {(["Trial Requirement", "Regular Supply", "Bulk Requirement"] as const).map((type) => (
                            <button
                              type="button"
                              key={type}
                              onClick={() => setRequirementType(type)}
                              className={cn(
                                "rounded-xl py-2 px-2 text-center text-xs font-bold transition-all",
                                requirementType === type
                                  ? "bg-white text-navy shadow-sm ring-1 ring-navy/10"
                                  : "text-navy-soft hover:text-navy"
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity & Unit */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                            Quantity
                          </label>
                          <div
                            className={cn(
                              "flex rounded-xl border overflow-hidden bg-slate-50/50 transition-all",
                              focusedField === "quantity"
                                ? "border-accent ring-2 ring-accent/20 bg-white"
                                : touched.quantity && !isQuantityValid
                                  ? "border-rose-400 bg-rose-50/30"
                                  : "border-navy/20"
                            )}
                          >
                            <input
                              type="text"
                              placeholder="e.g. 5000"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              onFocus={() => setFocusedField("quantity")}
                              onBlur={() => handleFieldBlur("quantity")}
                              className="w-full px-3.5 py-2.5 text-sm bg-transparent outline-none text-navy"
                            />
                            <div className="relative border-l border-navy/15 bg-navy/5 flex items-center pr-2">
                              <select
                                value={quantityUnit}
                                onChange={(e) => setQuantityUnit(e.target.value)}
                                className="bg-transparent text-xs font-bold text-navy px-2.5 py-2.5 outline-none cursor-pointer appearance-none pr-5"
                              >
                                <option value="Pieces">Pieces</option>
                                <option value="Boxes">Boxes</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Sets">Sets</option>
                                <option value="Kg">Kg</option>
                                <option value="Meters">Meters</option>
                              </select>
                              <ChevronDown className="h-3 w-3 text-navy-soft absolute right-2 pointer-events-none" />
                            </div>
                          </div>
                          {touched.quantity && !isQuantityValid && (
                            <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> Please enter a valid positive number
                            </p>
                          )}
                        </div>

                        {/* Dimensions L × W × H */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy">
                              Dimensions (L × W × H)
                            </label>
                            <div className="flex items-center gap-1 text-[11px] font-semibold text-accent">
                              <span>Unit:</span>
                              <select
                                value={dimensionUnit}
                                onChange={(e) => setDimensionUnit(e.target.value)}
                                aria-label="Dimension Unit"
                                className="bg-transparent font-bold text-accent outline-none cursor-pointer"
                              >
                                <option value="mm">mm</option>
                                <option value="cm">cm</option>
                                <option value="inches">inch</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="text"
                              placeholder="Length"
                              value={length}
                              onChange={(e) => setLength(e.target.value)}
                              className="rounded-xl border border-navy/20 bg-slate-50/50 px-2.5 py-2.5 text-center text-sm outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                            />
                            <input
                              type="text"
                              placeholder="Width"
                              value={width}
                              onChange={(e) => setWidth(e.target.value)}
                              className="rounded-xl border border-navy/20 bg-slate-50/50 px-2.5 py-2.5 text-center text-sm outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                            />
                            <input
                              type="text"
                              placeholder="Height"
                              value={height}
                              onChange={(e) => setHeight(e.target.value)}
                              className="rounded-xl border border-navy/20 bg-slate-50/50 px-2.5 py-2.5 text-center text-sm outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Material / Specification Options */}
                      <div className="rounded-2xl border border-navy/15 bg-slate-50/70 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-navy">
                            {activeChip.name} Specifications:
                          </span>
                          <span className="text-[11px] text-accent font-semibold">Dynamic Smart Fields</span>
                        </div>

                        {selectedChipId === "corrugated" && (
                          <div className="space-y-3">
                            <div>
                              <span className="text-xs font-medium text-navy-soft block mb-1">Ply:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {["3 Ply", "5 Ply", "7 Ply", "Custom", "Not Sure"].map((ply) => (
                                  <button
                                    type="button"
                                    key={ply}
                                    onClick={() => setCorrugatedPly(ply)}
                                    className={cn(
                                      "px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
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
                              <span className="text-xs font-medium text-navy-soft block mb-1">Box Type:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {["Regular", "Die-Cut", "Heavy Duty", "Printed", "Custom"].map((type) => (
                                  <button
                                    type="button"
                                    key={type}
                                    onClick={() => setCorrugatedBoxType(type)}
                                    className={cn(
                                      "px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
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

                        {selectedChipId === "epe-foam" && (
                          <div className="space-y-3">
                            <div>
                              <span className="text-xs font-medium text-navy-soft block mb-1">Format:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {["Sheet", "Roll", "Bag", "Custom Fitment", "Corner Pad"].map((fmt) => (
                                  <button
                                    type="button"
                                    key={fmt}
                                    onClick={() => setFoamFormat(fmt)}
                                    className={cn(
                                      "px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
                                      foamFormat === fmt
                                        ? "bg-accent text-white border-accent shadow-xs"
                                        : "bg-white text-navy border-navy/15 hover:border-accent/40"
                                    )}
                                  >
                                    {fmt}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-navy-soft block mb-1">Thickness / Density:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {["5 mm", "10 mm", "20 mm", "25 mm", "50 mm+", "Custom"].map((th) => (
                                  <button
                                    type="button"
                                    key={th}
                                    onClick={() => setFoamThickness(th)}
                                    className={cn(
                                      "px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
                                      foamThickness === th
                                        ? "bg-accent text-white border-accent shadow-xs"
                                        : "bg-white text-navy border-navy/15 hover:border-accent/40"
                                    )}
                                  >
                                    {th}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedChipId === "bubble" && (
                          <div>
                            <span className="text-xs font-medium text-navy-soft block mb-1">Bubble Format:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {["Roll", "Cut Sheet", "Pouch / Bag", "Heavy Duty Anti-Static"].map((b) => (
                                <button
                                  type="button"
                                  key={b}
                                  onClick={() => setBubbleFormat(b)}
                                  className={cn(
                                    "px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
                                    bubbleFormat === b
                                      ? "bg-accent text-white border-accent shadow-xs"
                                      : "bg-white text-navy border-navy/15 hover:border-accent/40"
                                  )}
                                >
                                  {b}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {(selectedChipId === "poly-bags" || selectedChipId === "films") && (
                          <div>
                            <span className="text-xs font-medium text-navy-soft block mb-1">Polymer / Type:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {["LDPE", "LLDPE", "HM", "HDPE", "Manual Stretch Film", "Machine Stretch Film"].map((m) => (
                                <button
                                  type="button"
                                  key={m}
                                  onClick={() => setPolyType(m)}
                                  className={cn(
                                    "px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
                                    polyType === m
                                      ? "bg-accent text-white border-accent shadow-xs"
                                      : "bg-white text-navy border-navy/15 hover:border-accent/40"
                                  )}
                                >
                                  {m}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedChipId === "accessories" && (
                          <div>
                            <span className="text-xs font-medium text-navy-soft block mb-1">Accessory Line:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {["BOPP Tape", "Box Strapping", "Edge Protector", "VCI Film", "ESD Packaging"].map((acc) => (
                                <button
                                  type="button"
                                  key={acc}
                                  onClick={() => setAccessoryItem(acc)}
                                  className={cn(
                                    "px-3 py-1.5 rounded-lg border text-xs font-bold transition-all",
                                    accessoryItem === acc
                                      ? "bg-accent text-white border-accent shadow-xs"
                                      : "bg-white text-navy border-navy/15 hover:border-accent/40"
                                  )}
                                >
                                  {acc}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedChipId === "custom" && (
                          <p className="text-xs text-navy-soft">
                            Our team engineers custom corrugated + die-cut foam hybrid kits for shock protection and export safety.
                          </p>
                        )}

                        <div className="pt-2">
                          <input
                            type="text"
                            placeholder="Additional specification details (e.g. GSM, micron, flute, colour)..."
                            value={materialDescription}
                            onChange={(e) => setMaterialDescription(e.target.value)}
                            className="w-full rounded-xl border border-navy/20 bg-white px-3 py-2 text-xs outline-none focus:border-accent focus:ring-1 focus:ring-accent/20"
                          />
                        </div>
                      </div>

                      {/* Step 1 Action Button */}
                      <button
                        type="button"
                        onClick={goToStep2}
                        className="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all"
                      >
                        <span>Continue to Contact Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* STEP 2: CONTACT DETAILS */}
                  {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy">
                              Full Name <span className="text-rose-500">*</span>
                            </label>
                            {touched.name && isNameValid && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 animate-in fade-in">
                                <Check className="h-3.5 w-3.5" /> Valid
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ayush Kumar"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              onFocus={() => setFocusedField("name")}
                              onBlur={() => handleFieldBlur("name")}
                              className={cn(
                                "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all",
                                focusedField === "name"
                                  ? "border-accent ring-2 ring-accent/20 bg-white"
                                  : touched.name && !isNameValid
                                    ? "border-rose-400 bg-rose-50/30 text-navy"
                                    : touched.name && isNameValid
                                      ? "border-emerald-400 bg-emerald-50/20 text-navy"
                                      : "border-navy/20 bg-slate-50/50"
                              )}
                            />
                          </div>
                          {touched.name && !isNameValid && (
                            <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> Please enter your name (min 2 characters)
                            </p>
                          )}
                        </div>

                        {/* Company Name */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy">
                              Company Name <span className="text-rose-500">*</span>
                            </label>
                            {touched.companyName && isCompanyValid && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 animate-in fade-in">
                                <Check className="h-3.5 w-3.5" /> Valid
                              </span>
                            )}
                          </div>
                          <input
                            type="text"
                            required
                            placeholder="Enter enterprise / plant name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            onFocus={() => setFocusedField("companyName")}
                            onBlur={() => handleFieldBlur("companyName")}
                            className={cn(
                              "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all",
                              focusedField === "companyName"
                                ? "border-accent ring-2 ring-accent/20 bg-white"
                                : touched.companyName && !isCompanyValid
                                  ? "border-rose-400 bg-rose-50/30 text-navy"
                                  : touched.companyName && isCompanyValid
                                    ? "border-emerald-400 bg-emerald-50/20 text-navy"
                                    : "border-navy/20 bg-slate-50/50"
                            )}
                          />
                          {touched.companyName && !isCompanyValid && (
                            <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> Please enter company name
                            </p>
                          )}
                        </div>

                        {/* Business Email */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy">
                              Business Email <span className="text-rose-500">*</span>
                            </label>
                            {touched.email && isEmailValid && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 animate-in fade-in">
                                <Check className="h-3.5 w-3.5" /> Valid
                              </span>
                            )}
                          </div>
                          <input
                            type="email"
                            required
                            placeholder="example@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => handleFieldBlur("email")}
                            className={cn(
                              "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all",
                              focusedField === "email"
                                ? "border-accent ring-2 ring-accent/20 bg-white"
                                : touched.email && !isEmailValid
                                  ? "border-rose-400 bg-rose-50/30 text-navy"
                                  : touched.email && isEmailValid
                                    ? "border-emerald-400 bg-emerald-50/20 text-navy"
                                    : "border-navy/20 bg-slate-50/50"
                            )}
                          />
                          {touched.email && !isEmailValid && (
                            <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> Enter a valid email format
                            </p>
                          )}
                        </div>

                        {/* Phone / WhatsApp */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-navy">
                              Phone / WhatsApp <span className="text-rose-500">*</span>
                            </label>
                            {touched.phone && isPhoneValid && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 animate-in fade-in">
                                <Check className="h-3.5 w-3.5" /> Valid
                              </span>
                            )}
                          </div>
                          <input
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => handleFieldBlur("phone")}
                            className={cn(
                              "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all",
                              focusedField === "phone"
                                ? "border-accent ring-2 ring-accent/20 bg-white"
                                : touched.phone && !isPhoneValid
                                  ? "border-rose-400 bg-rose-50/30 text-navy"
                                  : touched.phone && isPhoneValid
                                    ? "border-emerald-400 bg-emerald-50/20 text-navy"
                                    : "border-navy/20 bg-slate-50/50"
                            )}
                          />
                          {touched.phone && !isPhoneValid && (
                            <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" /> Enter valid 10-digit number with area/country code
                            </p>
                          )}
                        </div>
                      </div>

                      {/* City / Location */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-navy">
                            City / Delivery Location <span className="text-rose-500">*</span>
                          </label>
                          {touched.city && isCityValid && (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 animate-in fade-in">
                              <Check className="h-3.5 w-3.5" /> Valid
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Pune, Maharashtra / Manesar, Haryana"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          onFocus={() => setFocusedField("city")}
                          onBlur={() => handleFieldBlur("city")}
                          className={cn(
                            "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all",
                            focusedField === "city"
                              ? "border-accent ring-2 ring-accent/20 bg-white"
                              : touched.city && !isCityValid
                                ? "border-rose-400 bg-rose-50/30 text-navy"
                                : touched.city && isCityValid
                                  ? "border-emerald-400 bg-emerald-50/20 text-navy"
                                  : "border-navy/20 bg-slate-50/50"
                          )}
                        />
                        {touched.city && !isCityValid && (
                          <p className="text-[11px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> Please specify delivery destination
                          </p>
                        )}
                      </div>

                      {/* Application / Use Case */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          Application / Use Case
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Heavy auto component export / electronics transit shock buffer"
                          value={application}
                          onChange={(e) => setApplication(e.target.value)}
                          className="w-full rounded-xl border border-navy/20 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                        />
                      </div>

                      {/* Additional Requirements / Message */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                          Additional Requirements / Technical Notes
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Mention any custom testing, drop-test requirements, branding print, or dispatch schedule..."
                          value={additionalMessage}
                          onChange={(e) => setAdditionalMessage(e.target.value)}
                          className="w-full rounded-xl border border-navy/20 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20 resize-y"
                        />
                      </div>

                      {/* Consent Checkbox */}
                      <div className="flex items-start gap-3 pt-2">
                        <input
                          type="checkbox"
                          id="main-form-consent"
                          checked={consentGiven}
                          onChange={(e) => setConsentGiven(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-navy/30 text-accent accent-accent focus:ring-accent cursor-pointer"
                        />
                        <label htmlFor="main-form-consent" className="text-xs leading-relaxed text-navy-soft cursor-pointer">
                          I agree to be contacted regarding my packaging inquiry and accept the terms of the{" "}
                          <a href="/privacy" className="text-accent underline font-semibold">
                            Privacy Policy
                          </a>
                          .
                        </label>
                      </div>

                      {/* Server Error Notice */}
                      {submitStatus === "error" && (
                        <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-xs text-rose-800 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Form Navigation Actions */}
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-navy/20 bg-white px-5 py-3.5 text-xs font-bold text-navy hover:bg-slate-50 transition-all"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          <span>Back</span>
                        </button>

                        <button
                          type="submit"
                          disabled={submitStatus === "submitting"}
                          className={cn(
                            "flex-1 rounded-xl py-3.5 px-6 text-sm font-bold text-white shadow-md transition-all flex items-center justify-center gap-2",
                            submitStatus === "submitting"
                              ? "bg-navy/70 cursor-wait"
                              : "bg-navy hover:bg-navy/90 hover:shadow-lg hover:scale-[1.01]"
                          )}
                        >
                          {submitStatus === "submitting" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending Requirement...</span>
                            </>
                          ) : (
                            <>
                              <span>Send My Requirement</span>
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

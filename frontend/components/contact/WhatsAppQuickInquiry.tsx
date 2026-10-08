"use client";

import { MessageCircle, Image as ImageIcon, FileText, CheckCheck } from "lucide-react";
import { getWhatsAppLink } from "@/data/company";
import { Reveal } from "@/components/animations/Reveal";

export function WhatsAppQuickInquiry(): JSX.Element {
  const whatsappUrl = getWhatsAppLink(
    `Hello SRM Enterprises,\nI need packaging for:\nProduct: \nSize: \nQuantity: \nApplication: `
  );

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-[#0B1E36] via-[#0E2F3B] to-[#0A2624] text-white relative overflow-hidden" id="whatsapp-quick-inquiry">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute top-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

      <div className="container-page relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left Column: Heading and High-Conversion WhatsApp CTA */}
          <div className="lg:col-span-7">
            <Reveal variant="fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3.5 py-1.5 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                <MessageCircle className="h-4 w-4" />
                <span>Instant Mobile Engineering Desk</span>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={0.08}>
              <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Have Photos or Drawings? <br />
                <span className="text-emerald-400">Send Them on WhatsApp.</span>
              </h2>
            </Reveal>

            <Reveal variant="fade-up" delay={0.16}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Sometimes a photograph, engineering drawing or existing packaging sample tells us more than a long description. Snap a picture of your part or attach your CAD drawing directly to our chat.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={0.24}>
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-navy shadow-lg transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-500/25 hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-5 w-5 fill-navy" />
                    <span>Start WhatsApp Inquiry →</span>
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={0.32}>
              <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs text-white/70">
                <span className="flex items-center gap-2">✓ Share PDF blueprints &amp; CAD DXF files</span>
                <span className="flex items-center gap-2">✓ Photo of component with measuring tape</span>
                <span className="flex items-center gap-2">✓ Instant material availability status</span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Visual WhatsApp Phone Mockup */}
          <div className="lg:col-span-5">
            <Reveal variant="depth-zoom" delay={0.2}>
              <div className="mx-auto max-w-sm rounded-[36px] border-4 border-slate-700/60 bg-slate-900 p-3 shadow-2xl ring-1 ring-white/20">
                {/* Phone Speaker Notch */}
                <div className="mx-auto mb-2 h-4 w-28 rounded-full bg-slate-800" />

                {/* WhatsApp Chat UI Screen */}
                <div className="overflow-hidden rounded-[26px] bg-[#EFEAE2] text-slate-800 shadow-inner">
                  {/* WhatsApp Header */}
                  <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-xs font-bold">
                        SRM
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-tight">SRM Enterprises</p>
                        <p className="text-[10px] text-emerald-200">Packaging Engineering Desk • Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="space-y-3 p-4 text-xs">
                    {/* Timestamp */}
                    <div className="text-center">
                      <span className="rounded-md bg-white/60 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                        Today
                      </span>
                    </div>

                    {/* Customer Message Bubble */}
                    <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-none bg-[#DCF8C6] p-3 text-slate-800 shadow-xs">
                      <p className="font-semibold text-slate-900 mb-1">Hello SRM Enterprises,</p>
                      <p className="text-[11px] leading-relaxed text-slate-700 mb-2">
                        I need packaging for: <br />
                        • Product: Automotive transmission gear <br />
                        • Size: 280 × 280 × 140 mm <br />
                        • Quantity: 2,500 boxes / month <br />
                        • Application: Transit protection + anti-rust
                      </p>

                      {/* Mockup Attachments */}
                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <div className="flex items-center gap-1.5 rounded-lg bg-white/70 p-1.5 border border-slate-200/80">
                          <ImageIcon className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span className="text-[9px] font-semibold truncate text-slate-800">gear_photo.jpg</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg bg-white/70 p-1.5 border border-slate-200/80">
                          <FileText className="h-4 w-4 text-accent shrink-0" />
                          <span className="text-[9px] font-semibold truncate text-slate-800">box_drawing.pdf</span>
                        </div>
                      </div>

                      <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-slate-500">
                        <span>10:42 AM</span>
                        <CheckCheck className="h-3 w-3 text-accent" />
                      </div>
                    </div>

                    {/* SRM Reply Bubble */}
                    <div className="mr-auto max-w-[85%] rounded-2xl rounded-tl-none bg-white p-3 text-slate-800 shadow-xs">
                      <p className="text-[11px] leading-relaxed text-slate-700">
                        Hello! We have reviewed the gear specs. We recommend a <strong>5-ply heavy duty box</strong> with a <strong>custom-cut 25mm EPE foam insert</strong> and VCI poly liner for corrosion prevention.
                      </p>
                      <p className="mt-1 text-[11px] text-emerald-700 font-semibold">
                        Sharing commercial quotation &amp; drawing preview now…
                      </p>
                      <div className="mt-1 text-right text-[9px] text-slate-400">
                        <span>10:44 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { LOGO } from "@/lib/images"

const BENEFITS = [
  {
    icon: "bi-graph-up-arrow",
    label: "Guaranteed Offtake Prices",
    desc: "Lock in predictable, fair-market prices for your produce with multi-season supply contracts that insulate your farm against market volatility.",
  },
  {
    icon: "bi-shop",
    label: "Direct Market Access",
    desc: "Sell directly into our Barn Store, luxury hospitality clients, and premium retail delivery network without exploitative middleman markups.",
  },
  {
    icon: "bi-flower1",
    label: "Free Agronomist Support",
    desc: "Our on-ground field agronomists provide regular soil testing, organic pest control guidance, and certified yield enhancement workshops.",
  },
  {
    icon: "bi-truck",
    label: "Input Credit Scheme",
    desc: "Access high-germination certified seed varieties, organic foliar fertilizers, and animal feed on credit against your harvest yield.",
  },
]

const SUPPLY_OPTIONS = [
  "Indigenous Vegetables",
  "Organic Fruits",
  "High-Protein Fodder",
  "Free-Range Eggs",
  "Raw Rangeland Honey",
  "Pasture Dairy",
  "Pedigree Livestock Stock",
]

export default function PartnersClient() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error || "Failed to submit partner application")
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full overflow-x-hidden bg-[#F5F0E8] text-[#1C1208]">

      {/* ── HERO BANNER ── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden bg-[#1C1208]">
        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[2px] text-[11px] font-mono font-bold uppercase tracking-[0.16em] mb-6 bg-[#6B7A3F] text-white shadow-sm">
            <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 bg-white">
              <Image src={LOGO} alt="Osotua Seal" fill sizes="16px" className="object-cover" />
            </div>
            <span>OUTGROWER &bull; PRODUCER COOPERATIVE SCHEME</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F0E8] leading-[1.02] tracking-tight max-w-5xl mb-6"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            }}
          >
            Grow with <br />
            <em className="font-normal italic text-[#C99A2E]">Osotua</em>
          </h1>

          <p className="text-base sm:text-xl text-[#F5F0E8]/85 max-w-2xl leading-relaxed font-normal">
            Supply fresh vegetables, fodder, eggs, honey, or dairy under our partner farmer outgrower scheme — benefiting from guaranteed offtake contracts, agronomy training, and input credit.
          </p>
        </div>
      </section>

      {/* ── VISUAL PHOTO FEATURE ── */}
      <section className="bg-[#F5F0E8] pb-12 relative z-10">
        <div className="os-container -translate-y-8 sm:-translate-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="relative aspect-[16/10] rounded-[2px] overflow-hidden shadow-md border border-[#D4C9B0] group bg-[#1C1208]">
              <Image
                src="/images/cabbage fields.jpeg"
                alt="Partner cabbage harvest"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-mono font-bold uppercase tracking-wider">
                Horticulture Outgrowers
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-[2px] overflow-hidden shadow-md border border-[#D4C9B0] group bg-[#1C1208]">
              <Image
                src="/images/maize sprinkled.jpeg"
                alt="Irrigated fodder crop"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-mono font-bold uppercase tracking-wider">
                Precision Irrigation Support
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-[2px] overflow-hidden shadow-md border border-[#D4C9B0] group bg-[#1C1208]">
              <Image
                src="/images/WhatsApp Image 2026-08-10 at 11.56.45.jpeg"
                alt="Livestock paddock"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-mono font-bold uppercase tracking-wider">
                Pastoral Livestock Co-ops
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── */}
      <section className="py-20 sm:py-28 bg-[#EDE6DA] border-b border-[#D4C9B0]/60">
        <div className="os-container space-y-14">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px]">
              <span>PARTNERSHIP PERKS</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-bold text-[#1C1208] m-0"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              }}
            >
              Why Partner with <span className="text-[#C99A2E]">Osotua</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div
                key={b.label}
                className="bg-[#FAF7F2] border border-[#D4C9B0] p-8 rounded-[2px] flex flex-col justify-between shadow-sm hover:border-[#C99A2E] transition-all"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-[2px] bg-[#C99A2E]/10 border border-[#C99A2E]/30 flex items-center justify-center text-xl text-[#C99A2E]">
                    <i className={`bi ${b.icon}`} />
                  </div>
                  <h3
                    className="text-xl font-bold text-[#1C1208] m-0"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    {b.label}
                  </h3>
                  <p className="text-sm text-[#5C4A2A] leading-relaxed m-0 font-normal">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION & REQUIREMENTS SECTION ── */}
      <section className="py-24 sm:py-32 bg-[#F5F0E8]">
        <div className="os-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Requirements & Eligibility */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#6B7A3F] bg-[#6B7A3F]/10 border border-[#6B7A3F]/30 rounded-[2px]">
                  <span>OUTGROWER CRITERIA</span>
                </div>
                <h2
                  className="text-3xl sm:text-5xl font-bold text-[#1C1208] leading-tight m-0"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  Joining the Scheme
                </h2>
                <p className="text-base text-[#5C4A2A] leading-relaxed">
                  We work with dedicated pastoralists and smallholder growers who commit to regenerative land management, ethical animal welfare, and pesticide-free cultivation.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Minimum Land or Herd Size", desc: "At least 1 acre for horticulture or 5+ head of cattle / 15+ small stock." },
                  { title: "Access to Reliable Water", desc: "Borehole, seasonal river, rain harvesting reservoir, or piped irrigation." },
                  { title: "Organic & Regenerative Commitment", desc: "Zero harmful organophosphate pesticides and adherence to rotational grazing." },
                ].map((item, idx) => (
                  <div key={item.title} className="bg-[#FAF7F2] border border-[#D4C9B0] p-6 flex gap-4 items-start rounded-[2px]">
                    <div className="w-8 h-8 rounded-[2px] bg-[#6B7A3F]/10 text-[#6B7A3F] flex items-center justify-center font-bold text-xs shrink-0 font-mono border border-[#6B7A3F]/25">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1C1208]">{item.title}</h4>
                      <p className="text-xs text-[#5C4A2A] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#FAF7F2] border border-[#D4C9B0] p-8 sm:p-12 rounded-[2px] shadow-sm">
                {submitted ? (
                  <div className="text-center py-12 space-y-5">
                    <div className="w-16 h-16 rounded-[2px] bg-[#6B7A3F]/10 text-[#6B7A3F] flex items-center justify-center mx-auto text-3xl border border-[#6B7A3F]/30">
                      <i className="bi bi-check-circle-fill" />
                    </div>
                    <h3
                      className="text-3xl font-bold text-[#1C1208]"
                      style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                    >
                      Application Submitted
                    </h3>
                    <p className="text-sm text-[#5C4A2A] max-w-md mx-auto leading-relaxed">
                      Thank you for applying to join the Osotua Outgrower Network. An agronomist from our Kajiado hub will review your farm profile and contact you within 48 hours for a field assessment.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-gold"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px] mb-2">
                        <span>FARMER APPLICATION</span>
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl font-bold text-[#1C1208]"
                        style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                      >
                        Register as a Producer
                      </h3>
                    </div>

                    {error && (
                      <div className="p-3.5 rounded-[2px] bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <i className="bi bi-exclamation-triangle-fill text-sm" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="e.g. John Kiplangat"
                          className="os-input"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          className="os-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+254 700 000 000"
                          className="os-input"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                          County / Sub-County *
                        </label>
                        <input
                          type="text"
                          name="location"
                          required
                          placeholder="e.g. Kajiado East"
                          className="os-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                          Primary Produce / Supply *
                        </label>
                        <select
                          name="produceType"
                          required
                          className="os-input"
                        >
                          {SUPPLY_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                          Acreage / Herd Size
                        </label>
                        <input
                          type="text"
                          name="farmSize"
                          placeholder="e.g. 5 Acres / 20 Cows"
                          className="os-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                        Additional Farm Details
                      </label>
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder="Tell us about current harvests, irrigation setup, or previous co-op experience..."
                        className="os-input"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-gold justify-center flex items-center gap-2"
                    >
                      {loading ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <i className="bi bi-send-fill" />
                          <span>SUBMIT OUTGROWER APPLICATION</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { LOGO } from "@/lib/images"

const BENEFITS = [
  {
    icon: "ti-chart-arrows-vertical",
    label: "Guaranteed Offtake Prices",
    desc: "Lock in predictable, fair-market prices for your produce with multi-season supply contracts that insulate your farm against market volatility.",
  },
  {
    icon: "ti-building-store",
    label: "Direct Market Access",
    desc: "Sell directly into our Barn Store, luxury hospitality clients, and premium retail delivery network without exploitative middleman markups.",
  },
  {
    icon: "ti-plant",
    label: "Free Agronomist Support",
    desc: "Our on-ground field agronomists provide regular soil testing, organic pest control guidance, and certified yield enhancement workshops.",
  },
  {
    icon: "ti-truck-delivery",
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
    <div style={{ background: "#FBF7F0", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="bg-mesh-green noise relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-amber-500/10 text-[#8E5E16] border border-amber-500/25 shadow-md">
            <div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-amber-400 shrink-0 bg-white">
              <Image src={LOGO} alt="Osotua Seal" fill sizes="20px" className="object-cover" />
            </div>
            <span>OUTGROWER &bull; PRODUCER COOPERATIVE SCHEME</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-8"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            Grow with <br />
            <em className="font-normal italic text-gradient-gold">Osotua</em>
          </h1>

          <p className="text-base sm:text-xl text-[#5C4835] max-w-2xl leading-relaxed font-normal">
            Supply fresh vegetables, fodder, eggs, honey, or dairy under our partner farmer outgrower scheme — benefiting from guaranteed offtake contracts, agronomy training, and input credit.
          </p>
        </div>
      </section>

      {/* ── VISUAL PHOTO FEATURE ── */}
      <section className="bg-[#FBF7F0] pb-12 relative z-10">
        <div className="os-container -translate-y-8 sm:-translate-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-amber-900/15 group">
              <Image
                src="/images/cabbage fields.jpeg"
                alt="Partner cabbage harvest"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-mono font-bold uppercase tracking-wider">
                Horticulture Outgrowers
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-amber-900/15 group">
              <Image
                src="/images/maize sprinkled.jpeg"
                alt="Irrigated fodder crop"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-mono font-bold uppercase tracking-wider">
                Precision Irrigation Support
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-amber-900/15 group">
              <Image
                src="/images/WhatsApp Image 2026-08-10 at 11.56.45.jpeg"
                alt="Livestock paddock"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-mono font-bold uppercase tracking-wider">
                Pastoral Livestock Co-ops
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── */}
      <section className="bg-mesh-earth noise py-24 sm:py-36">
        <div className="os-container relative z-10 space-y-16">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20">
              <span>PARTNERSHIP PERKS</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-normal text-[#1C1208] m-0"
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              }}
            >
              Why Partner with <span className="text-gradient-gold font-semibold">Osotua</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((b) => (
              <div
                key={b.label}
                className="card-luxury p-8 sm:p-9 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-2xl text-[#C4882A]">
                    <i className={`ti ${b.icon}`} />
                  </div>
                  <h3
                    className="text-xl font-bold text-[#1C1208] m-0"
                    style={{ fontFamily: "var(--font-fraunces), serif" }}
                  >
                    {b.label}
                  </h3>
                  <p className="text-sm text-[#5C4835] leading-relaxed m-0">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION & REQUIREMENTS SECTION ── */}
      <section className="py-24 sm:py-36 bg-gradient-to-b from-transparent via-[#F5EFE4]/50 to-transparent">
        <div className="os-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Requirements & Eligibility */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E6B34] bg-emerald-500/10 border border-emerald-500/20">
                  <span>OUTGROWER CRITERIA</span>
                </div>
                <h2
                  className="text-3xl sm:text-5xl font-normal text-[#1C1208] leading-tight m-0"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  Joining the Scheme
                </h2>
                <p className="text-base text-[#5C4835] leading-relaxed">
                  We work with dedicated pastoralists and smallholder growers who commit to regenerative land management, ethical animal welfare, and pesticide-free cultivation.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Minimum Land or Herd Size", desc: "At least 1 acre for horticulture or 5+ head of cattle / 15+ small stock." },
                  { title: "Access to Reliable Water", desc: "Borehole, seasonal river, rain harvesting reservoir, or piped irrigation." },
                  { title: "Organic & Regenerative Commitment", desc: "Zero harmful organophosphate pesticides and adherence to rotational grazing." },
                ].map((item, idx) => (
                  <div key={item.title} className="card-luxury p-6 flex gap-4 items-start bg-white">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-[#2E6B34] flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1C1208]">{item.title}</h4>
                      <p className="text-xs text-[#5C4835] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-7">
              <div className="card-luxury p-8 sm:p-12 shadow-2xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-5">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-[#2E6B34] flex items-center justify-center mx-auto text-4xl border border-emerald-500/30 shadow-lg">
                      <i className="ti ti-circle-check" />
                    </div>
                    <h3
                      className="text-3xl font-light text-[#1C1208]"
                      style={{ fontFamily: "var(--font-fraunces), serif" }}
                    >
                      Application Submitted
                    </h3>
                    <p className="text-sm text-[#5C4835] max-w-md mx-auto leading-relaxed">
                      Thank you for applying to join the Osotua Outgrower Network. An agronomist from our Kajiado hub will review your farm profile and contact you within 48 hours for a field assessment.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-primary py-3 px-8 text-xs tracking-wider"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20 mb-2">
                        <span>FARMER APPLICATION</span>
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl font-light text-[#1C1208]"
                        style={{ fontFamily: "var(--font-fraunces), serif" }}
                      >
                        Register as a Producer
                      </h3>
                    </div>

                    {error && (
                      <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <i className="ti ti-alert-triangle text-base" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="e.g. John Kiplangat"
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+254 700 000 000"
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          County / Sub-County *
                        </label>
                        <input
                          type="text"
                          name="location"
                          required
                          placeholder="e.g. Kajiado East"
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Primary Produce / Supply *
                        </label>
                        <select
                          name="produceType"
                          required
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        >
                          {SUPPLY_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Acreage / Farm Size
                        </label>
                        <input
                          type="text"
                          name="farmSize"
                          placeholder="e.g. 5 Acres / 20 Cows"
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                        Additional Farm Details
                      </label>
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder="Tell us about current harvests, irrigation setup, or previous co-op experience..."
                        className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary py-4 text-xs tracking-widest justify-center shadow-xl"
                    >
                      {loading ? (
                        <>
                          <i className="ti ti-loader animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <i className="ti ti-send" />
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

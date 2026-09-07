"use client"

import { useState } from "react"
import Image from "next/image"
import { LOGO } from "@/lib/images"

const TIERS = [
  {
    label: "Seedling",
    min: 100000,
    max: 499999,
    icon: "ti-plant-2",
    color: "#2E7D32",
    perks: ["Quarterly digital audited reports", "Farm visit priority scheduling", "Seasonal Gazette updates"],
  },
  {
    label: "Rancher",
    min: 500000,
    max: 1999999,
    icon: "ti-award",
    color: "#C4882A",
    perks: ["Semi-annual yield statements", "Named livestock pedigree dedication", "Barn Store lifetime 15% discount", "Annual private investor briefing"],
  },
  {
    label: "Partner",
    min: 2000000,
    max: null,
    icon: "ti-diamond",
    color: "#D99A30",
    perks: ["Monthly detailed yield statements", "Advisory board observer seat", "Exclusive breed co-ownership rights", "Private ranch lodge retreat access"],
  },
]

const PILLARS = [
  {
    icon: "ti-chart-arrows-vertical",
    label: "Pedigree Livestock Enterprise",
    desc: "Breeding, raising, and distributing climate-resilient Boran cattle, Sahiwal dairy stock, Boer goats, and Dorper sheep across East Africa.",
    stat: "16% p.a.",
    statLabel: "Projected ROI",
    image: "/images/boran bulls.jpg",
  },
  {
    icon: "ti-building-store",
    label: "Direct Barn Store Network",
    desc: "Supplying dry-aged grass-fed beef, pasture dairy, and dawn-harvested organic produce directly to Nairobi kitchens and luxury hospitality partners.",
    stat: "14% p.a.",
    statLabel: "Projected ROI",
    image: "/images/beef cuts.jpg",
  },
  {
    icon: "ti-shield-check",
    label: "Asset-Backed Security",
    desc: "Every capital unit is fully backed by audited herd inventory and 3,200+ titled rangeland acres in Kajiado County — physical, verifiable, and transparent.",
    stat: "3,200+",
    statLabel: "Titled Acres",
    image: "/images/osotua-rangelands-herd.jpg",
  },
]

export default function InvestClient() {
  const [amount, setAmount] = useState(500000)
  const [duration, setDuration] = useState(3)
  const [investmentType, setInvestmentType] = useState<"breeding" | "barn">("breeding")

  // Modal / Form state
  const [showModal, setShowModal] = useState(false)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const roiRate = investmentType === "breeding" ? 0.16 : 0.14
  const estimatedReturn = amount * Math.pow(1 + roiRate, duration)
  const profit = estimatedReturn - amount

  const activeTier =
    amount >= 2000000 ? TIERS[2] : amount >= 500000 ? TIERS[1] : TIERS[0]

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone: phone || undefined,
          amount,
          durationYears: duration,
          investmentType,
          note: note || undefined,
        }),
      })

      if (res.ok) {
        setFormSuccess(true)
        setTimeout(() => {
          setShowModal(false)
          setFormSuccess(false)
        }, 2000)
      } else {
        alert("Failed to submit inquiry. Please verify your details.")
      }
    } catch (err) {
      console.error(err)
      alert("Submission error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ background: "#FBF7F0", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="bg-mesh-earth noise relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-amber-500/10 text-[#8E5E16] border border-amber-500/25 shadow-md">
            <div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-amber-400 shrink-0 bg-white">
              <Image src={LOGO} alt="Osotua Seal" fill sizes="20px" className="object-cover" />
            </div>
            <span>INVESTOR RELATIONS &bull; IMPACT AGRIBUSINESS</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-8"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            Invest in <br />
            <em className="font-normal italic text-gradient-gold">Africa&apos;s food security</em>
          </h1>

          <p className="text-base sm:text-xl text-[#5C4835] max-w-2xl leading-relaxed mb-10 font-normal">
            Osotua Farming offers a tangible, asset-backed agribusiness opportunity uniting climate-resilient livestock genetics, organic supply chains, and modern precision logistics from a titled estate in Kajiado.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-amber-900/15">
            {[
              { value: "16%", label: "Livestock ROI p.a." },
              { value: "KES 2B+", label: "Herd Asset Value" },
              { value: "3,200", label: "Titled Acres" },
              { value: "4", label: "Purebred Species" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-3xl sm:text-4xl font-bold text-[#C4882A]"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#6B6558] mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILLARS SECTION WITH IMAGES ── */}
      <section className="bg-mesh-green noise py-24 sm:py-36">
        <div className="os-container relative z-10 space-y-16">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E6B34] bg-emerald-500/10 border border-emerald-500/20">
              <span>INVESTMENT THESIS</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-normal text-[#1C1208] m-0"
              style={{
                fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
              }}
            >
              Why Invest in <span className="text-gradient-gold font-semibold">Osotua</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((p) => (
              <div key={p.label} className="card-luxury overflow-hidden flex flex-col justify-between bg-white shadow-xl group">
                {/* Visual Header Image */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-amber-900/10">
                  <Image
                    src={p.image}
                    alt={p.label}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/30 backdrop-blur-md border border-amber-400/50 flex items-center justify-center text-amber-300">
                      <i className={`ti ${p.icon}`} />
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">{p.statLabel}: {p.stat}</span>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h3
                    className="text-2xl font-bold text-[#1C1208] m-0"
                    style={{ fontFamily: "var(--font-fraunces), serif" }}
                  >
                    {p.label}
                  </h3>
                  <p className="text-sm text-[#5C4835] leading-relaxed m-0">
                    {p.desc}
                  </p>
                </div>

                <div className="p-8 pt-0 mt-auto flex items-center justify-between border-t border-stone-100">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#8E5E16]">
                    Audited Yield
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#C4882A]">
                    {p.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR & TIERS SECTION ── */}
      <section className="py-24 sm:py-36 bg-gradient-to-b from-transparent via-[#F5EFE4]/50 to-transparent">
        <div className="os-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Interactive Calculator */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20">
                  <span>FINANCIAL MODEL</span>
                </div>
                <h2
                  className="text-3xl sm:text-5xl font-normal text-[#1C1208] leading-tight m-0"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  Yield Calculator
                </h2>
                <p className="text-base text-[#5C4835] leading-relaxed">
                  Project your returns based on historical compounding rates across our pedigree breeding and direct farm store dispatch networks.
                </p>
              </div>

              <div className="card-luxury p-8 sm:p-10 space-y-8 bg-white shadow-xl">
                {/* Investment Type Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-3">
                    Investment Focus
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setInvestmentType("breeding")}
                      className={`py-3.5 px-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                        investmentType === "breeding"
                          ? "bg-gradient-to-r from-[#C4882A] to-[#D99A30] text-white border-[#C4882A] shadow-md"
                          : "bg-[#FAF6EE] text-[#5C4835] border-amber-900/15 hover:border-amber-900/30"
                      }`}
                    >
                      Pedigree Livestock (16% p.a.)
                    </button>
                    <button
                      type="button"
                      onClick={() => setInvestmentType("barn")}
                      className={`py-3.5 px-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                        investmentType === "barn"
                          ? "bg-gradient-to-r from-[#C4882A] to-[#D99A30] text-white border-[#C4882A] shadow-md"
                          : "bg-[#FAF6EE] text-[#5C4835] border-amber-900/15 hover:border-amber-900/30"
                      }`}
                    >
                      Barn Network (14% p.a.)
                    </button>
                  </div>
                </div>

                {/* Amount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold">
                      Principal Capital (KES)
                    </label>
                    <span className="font-serif text-xl font-bold text-[#C4882A]">
                      KES {amount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={10000000}
                    step={100000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full accent-[#C4882A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#786550] mt-1">
                    <span>KES 100K</span>
                    <span>KES 5M</span>
                    <span>KES 10M+</span>
                  </div>
                </div>

                {/* Duration Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold">
                      Investment Tenor (Years)
                    </label>
                    <span className="font-serif text-xl font-bold text-[#C4882A]">
                      {duration} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full accent-[#C4882A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#786550] mt-1">
                    <span>1 Year</span>
                    <span>5 Years</span>
                    <span>10 Years</span>
                  </div>
                </div>

                {/* Yield Output Box */}
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                  <div className="flex justify-between items-center text-xs text-[#5C4835]">
                    <span>Projected Total Value:</span>
                    <strong className="text-lg font-serif text-[#1C1208]">
                      KES {Math.round(estimatedReturn).toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#5C4835] pt-2 border-t border-amber-900/10">
                    <span>Total Estimated Gain:</span>
                    <strong className="text-xl font-serif text-[#2E6B34]">
                      + KES {Math.round(profit).toLocaleString()}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full btn-primary py-4 text-xs tracking-widest justify-center shadow-xl"
                >
                  <i className="ti ti-mail" />
                  <span>REQUEST DETAILED INVESTOR PROSPECTUS</span>
                </button>
              </div>
            </div>

            {/* Right Column: Investor Tiers */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E6B34] bg-emerald-500/10 border border-emerald-500/20">
                  <span>PORTFOLIO TIERS</span>
                </div>
                <h2
                  className="text-3xl sm:text-5xl font-normal text-[#1C1208] leading-tight m-0"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  Investor Benefits
                </h2>
              </div>

              <div className="space-y-4">
                {TIERS.map((tier) => {
                  const isCurrent = activeTier.label === tier.label
                  return (
                    <div
                      key={tier.label}
                      className={`card-luxury p-7 space-y-4 transition-all duration-300 ${
                        isCurrent
                          ? "ring-2 ring-[#C4882A] border-[#C4882A] bg-amber-50/40 shadow-xl"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#C4882A] flex items-center justify-center text-xl">
                            <i className={`ti ${tier.icon}`} />
                          </div>
                          <div>
                            <h3
                              className="text-xl font-bold text-[#1C1208] m-0"
                              style={{ fontFamily: "var(--font-fraunces), serif" }}
                            >
                              {tier.label} Tier
                            </h3>
                            <div className="text-[11px] font-mono text-[#8E5E16]">
                              From KES {tier.min.toLocaleString()}{tier.max ? ` to KES ${tier.max.toLocaleString()}` : "+"}
                            </div>
                          </div>
                        </div>

                        {isCurrent && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-[#8E5E16] border border-amber-500/30">
                            Active Match
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 pt-2 border-t border-stone-100">
                        {tier.perks.map((p) => (
                          <div key={p} className="flex items-center gap-2 text-xs text-[#5C4835]">
                            <i className="ti ti-check text-[#2E6B34]" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MODAL PROSPECTUS FORM ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="card-luxury p-8 sm:p-10 max-w-lg w-full bg-white shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-6 top-6 text-stone-400 hover:text-stone-700 p-1"
            >
              <i className="ti ti-x text-lg" />
            </button>

            {formSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-[#2E6B34] flex items-center justify-center mx-auto text-3xl">
                  <i className="ti ti-circle-check" />
                </div>
                <h3 className="text-2xl font-serif text-[#1C1208]">Prospectus Request Received</h3>
                <p className="text-xs text-[#5C4835]">
                  Our managing partner will dispatch the investment documentation and audited financials to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E5E16]">
                    INVESTOR BRIEFING
                  </div>
                  <h3 className="text-2xl font-serif text-[#1C1208]">Request Term Sheet</h3>
                  <p className="text-xs text-[#5C4835]">
                    Estimated allocation: <strong className="text-[#C4882A]">KES {amount.toLocaleString()}</strong> ({duration} Years)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Moses Ole Sironka"
                    className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="moses@example.com"
                    className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                    Notes / Portfolio Objectives
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Individual investor, institutional fund, or family office..."
                    className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3.5 text-xs tracking-widest justify-center shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ti ti-loader animate-spin" />
                      <span>Transmitting Request...</span>
                    </>
                  ) : (
                    <>
                      <i className="ti ti-send" />
                      <span>SUBMIT PROSPECTUS REQUEST</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

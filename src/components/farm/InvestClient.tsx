"use client"

import { useState } from "react"

const TIERS = [
  {
    label: "Seedling",
    min: 100000,
    max: 499999,
    icon: "bi-tree",
    color: "#2E7D32",
    perks: ["Quarterly digital reports", "Farm visit priority access", "Newsletter updates"],
  },
  {
    label: "Rancher",
    min: 500000,
    max: 1999999,
    icon: "bi-award",
    color: "#C4882A",
    perks: ["Semi-annual yield statements", "Named livestock dedication", "Barn Store discount 15%", "Annual investor briefing"],
  },
  {
    label: "Partner",
    min: 2000000,
    max: null,
    icon: "bi-gem",
    color: "#D99A30",
    perks: ["Monthly yield statements", "Board observer seat", "Exclusive breed co-ownership rights", "Private ranch retreat access"],
  },
]

const PILLARS = [
  { icon: "bi-graph-up-arrow", label: "Livestock Enterprise", desc: "Breeding, importing, and distributing climate-resilient Boran cattle, Sahiwal dairy cows, Boer goats, and Dorper sheep across Kenya and East Africa.", stat: "16% p.a.", statLabel: "Projected ROI" },
  { icon: "bi-shop", label: "Barn Store Network", desc: "Direct-to-consumer and B2B supply of aged beef, fresh dairy, organic produce, and weekly subscription boxes to Nairobi and regional markets.", stat: "14% p.a.", statLabel: "Projected ROI" },
  { icon: "bi-shield-check", label: "Asset-Backed Growth", desc: "Every investment unit is backed by physical herd inventory and titled rangeland assets in Kajiado County — transparent, tangible, and audited.", stat: "3,200+", statLabel: "Acres Titled" },
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
  const [, setRequested] = useState(false)
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
        setRequested(true)
        setTimeout(() => setShowModal(false), 2000)
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
    <div style={{ background: "#FBF7F0" }} className="pt-20 min-h-screen">
      {/* ── HERO HEADER ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ padding: "8rem 0 7rem", position: "relative", overflow: "hidden" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "1.5rem", fontWeight: 700 }}>
            Investor Relations
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              fontWeight: 400,
              color: "#1C1208",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
              maxWidth: "800px",
            }}
          >
            Invest in{" "}
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>Africa&apos;s future</em>
          </h1>
          <p style={{ color: "#5C4835", maxWidth: "540px", lineHeight: 1.8, fontSize: "1.05rem", marginBottom: "3rem" }}>
            Osotua Farming offers a high-yield opportunity uniting climate-resilient livestock genetics, organic produce supply, and modern agribusiness technology — all from a single titled ranch in Kajiado.
          </p>

          {/* Key stats row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(196,136,42,0.2)" }}>
            {[
              { value: "16%", label: "Livestock ROI p.a." },
              { value: "KES 2B+", label: "Herd Asset Value" },
              { value: "3,200", label: "Titled Acres" },
              { value: "4", label: "Species Bred" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2.6rem",
                    fontWeight: 500,
                    color: "#C4882A",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8E5E16" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PILLARS ── */}
      <section style={{ padding: "6rem 0", borderBottom: "1px solid rgba(196,136,42,0.15)" }}>
        <div className="os-container">
          <div style={{ maxWidth: "600px", marginBottom: "4rem" }}>
            <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "0.75rem", fontWeight: 700 }}>
              Our Business Model
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 400,
                color: "#1C1208",
                lineHeight: 1.1,
              }}
            >
              Three Diversified <em style={{ color: "#C4882A" }}>Revenue Pillars</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            {PILLARS.map((p) => (
              <div
                key={p.label}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(196, 136, 42, 0.22)",
                  boxShadow: "0 10px 32px rgba(196, 136, 42, 0.06)",
                  borderRadius: "24px",
                  padding: "2.5rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(196,136,42,0.12)",
                      border: "1px solid rgba(196,136,42,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                      color: "#C4882A",
                    }}
                  >
                    <i className={`bi ${p.icon}`} style={{ fontSize: "1.3rem" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                      fontSize: "1.6rem",
                      fontWeight: 500,
                      color: "#1C1208",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {p.label}
                  </h3>
                  <p style={{ color: "#5C4835", fontSize: "0.9rem", lineHeight: 1.7 }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(196,136,42,0.15)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8E5E16" }}>
                    {p.statLabel}
                  </span>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "1.3rem", fontWeight: 700, color: "#2E7D32" }}>
                    {p.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CALCULATOR ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem" }}>
            <div className="eyebrow justify-center" style={{ color: "#8E5E16", marginBottom: "0.75rem", fontWeight: 700 }}>
              Yield Simulator
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                fontWeight: 400,
                color: "#1C1208",
                lineHeight: 1.1,
              }}
            >
              Simulate Your <em style={{ color: "#C4882A" }}>Projected Returns</em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
            className="lg:grid-cols-[1.2fr_1fr]"
          >
            {/* Left — Controls */}
            <div
              style={{
                padding: "2.5rem",
                borderRadius: "28px",
                background: "#FFFFFF",
                border: "1px solid rgba(196, 136, 42, 0.25)",
                boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
              }}
            >
              {/* Type Switcher */}
              <div style={{ marginBottom: "2.5rem" }}>
                <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8E5E16", marginBottom: "0.75rem" }}>
                  1. Enterprise Focus
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { id: "breeding", label: "Livestock Enterprise (16% ROI)", sub: "Breeding, genetics & rangeland expansion" },
                    { id: "barn", label: "Barn Network (14% ROI)", sub: "Cold-chain retail, meat & dairy distribution" },
                  ].map((t) => {
                    const active = investmentType === t.id
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setInvestmentType(t.id as "breeding" | "barn")}
                        style={{
                          padding: "1.1rem",
                          borderRadius: "16px",
                          textAlign: "left",
                          background: active ? "linear-gradient(135deg, #C4882A, #D99A30)" : "#FAF6EE",
                          border: active ? "1px solid #C4882A" : "1px solid rgba(196, 136, 42, 0.2)",
                          cursor: "pointer",
                          boxShadow: active ? "0 4px 16px rgba(196,136,42,0.25)" : "none",
                        }}
                      >
                        <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.75rem", fontWeight: 700, color: active ? "#FFFFFF" : "#1C1208" }}>{t.label}</div>
                        <div style={{ fontSize: "0.7rem", color: active ? "rgba(255,255,255,0.85)" : "#786550", marginTop: "0.25rem" }}>{t.sub}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Amount Slider */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
                  <label style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8E5E16" }}>
                    2. Capital Allocation
                  </label>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "1.2rem", fontWeight: 700, color: "#C4882A" }}>
                    KES {amount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={10000000}
                  step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#C4882A", cursor: "pointer" }}
                />
              </div>

              {/* Duration Slider */}
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
                  <label style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8E5E16" }}>
                    3. Investment Horizon
                  </label>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "1.2rem", fontWeight: 700, color: "#C4882A" }}>
                    {duration} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#C4882A", cursor: "pointer" }}
                />
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="btn-primary w-full justify-center py-3.5 shadow-sm text-sm"
              >
                <i className="bi bi-file-earmark-text" />
                Inquire &amp; Request Prospectus
              </button>
            </div>

            {/* Right — Projected Summary */}
            <div
              style={{
                padding: "2.5rem",
                borderRadius: "28px",
                background: "#FFFFFF",
                border: "1px solid rgba(196, 136, 42, 0.25)",
                boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {[
                { label: "Principal Capital", value: `KES ${amount.toLocaleString()}`, color: "#1C1208" },
                { label: "Estimated Yield", value: `+ KES ${Math.round(profit).toLocaleString()}`, color: "#2E7D32" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: "0.875rem", borderBottom: "1px solid rgba(196,136,42,0.15)" }}>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#786550" }}>
                    {row.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "1.1rem", fontWeight: 700, color: row.color }}>
                    {row.value}
                  </span>
                </div>
              ))}

              <div>
                <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8E5E16", marginBottom: "0.5rem" }}>
                  Total Projected Value
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "3.2rem",
                    fontWeight: 500,
                    color: "#C4882A",
                    lineHeight: 1,
                  }}
                >
                  KES {Math.round(estimatedReturn).toLocaleString()}
                </div>
              </div>

              <div style={{ marginTop: "0.5rem" }}>
                <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8E5E16", marginBottom: "0.75rem" }}>
                  Tier Benefits ({activeTier.label})
                </div>
                {activeTier.perks.map((perk) => (
                  <div key={perk} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                    <i className="bi bi-check-circle-fill" style={{ fontSize: "0.85rem", color: "#2E7D32" }} />
                    <span style={{ fontSize: "0.85rem", color: "#5C4835" }}>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODAL INQUIRY ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1208]/60 backdrop-blur-md">
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(196, 136, 42, 0.25)",
              borderRadius: "28px",
              boxShadow: "0 24px 60px rgba(196, 136, 42, 0.15)",
            }}
            className="relative w-full max-w-lg p-6 sm:p-8"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#786550] hover:text-[#1C1208]"
              aria-label="Close"
            >
              <i className="bi bi-x-lg text-lg" />
            </button>

            <div className="eyebrow text-[#8E5E16] mb-1 font-bold">Investor Enquiry</div>
            <h3 className="font-serif text-3xl font-normal text-[#1C1208] mb-4">Request Official 2026 Prospectus</h3>

            {formSuccess ? (
              <div className="p-4 rounded-xl bg-[#2E7D32]/12 border border-[#2E7D32]/35 text-[#2E7D32] text-center my-4">
                <i className="bi bi-check-circle-fill text-2xl mb-1 block" />
                <p className="font-bold text-sm">Prospectus Request Received!</p>
                <p className="text-xs text-[#5C4835] mt-1">Our investor relations desk will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Senator Grace Mutua"
                    className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@investor.co.ke"
                      className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 700 000000"
                      className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                    Investment Notes or Inquiries (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Tell us about your portfolio horizon, syndicate, or specific questions..."
                    className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3.5 text-xs justify-center shadow-sm"
                  >
                    {isSubmitting ? "Submitting Request..." : `Submit Inquiry (KES ${amount.toLocaleString()})`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"

const BENEFITS = [
  { icon: "bi-graph-up-arrow", label: "Guaranteed Offtake Prices", desc: "Lock in predictable, competitive prices for your produce with multi-season supply contracts." },
  { icon: "bi-shop", label: "Direct Market Access", desc: "Sell directly through our Barn Store and institutional delivery network without middleman markups." },
  { icon: "bi-tree-fill", label: "Free Agronomist Support", desc: "Our field team provides free training, soil testing, and on-site guidance for enrolled farmers." },
  { icon: "bi-truck", label: "Input Credit Scheme", desc: "Access high-yield seeds, organic fertilizers, and feed on credit against your upcoming harvest." },
]

const SUPPLY_OPTIONS = [
  "Vegetables", "Fruits", "Fodder / Animal Feed", "Eggs", "Honey", "Dairy Products", "Other",
]

const FIELDS = [
  { name: "fullName", label: "Full Name", type: "text", placeholder: "John Kiplangat" },
  { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+254 700 000 000" },
  { name: "location", label: "Your Location / County", type: "text", placeholder: "Kajiado County" },
]

export default function PartnersPage() {
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
        throw new Error((json as { error?: string }).error || "Failed to submit application")
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO ── */}
      <div
        className="bg-mesh-green noise"
        style={{ paddingTop: "10rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
            Outgrower &amp; Producer Scheme
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(3.2rem, 7vw, 7rem)",
              fontWeight: 300,
              color: "#F5EFE4",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Grow with
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>Osotua</em>
          </h1>
          <p style={{ color: "rgba(245,239,228,0.65)", maxWidth: "540px", lineHeight: 1.8, fontSize: "1rem" }}>
            Supply fresh vegetables, fodder, eggs, or dairy under our partner farmer outgrower scheme — benefiting from guaranteed offtake contracts, agronomy training, and input credit.
          </p>
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <section
        className="bg-mesh-earth noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
            <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
              Partnership Perks
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 300,
                color: "#F5EFE4",
                lineHeight: 1.1,
              }}
            >
              Why partner with us?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b) => (
              <div
                key={b.label}
                className="glass-dark"
                style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", borderRadius: "16px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(61,107,62,0.15)",
                    border: "1px solid rgba(61,107,62,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i className={`bi ${b.icon}`} style={{ fontSize: "1.3rem", color: "#5a9e5c" }} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    color: "#F5EFE4",
                  }}
                >
                  {b.label}
                </div>
                <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          {submitted ? (
            <div
              className="glass-dark"
              style={{ textAlign: "center", padding: "5rem 2.5rem", borderRadius: "24px", border: "1px solid rgba(61,107,62,0.4)" }}
            >
              <div
                style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "rgba(61,107,62,0.2)", border: "1px solid rgba(61,107,62,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem", color: "#5a9e5c",
                }}
              >
                <i className="bi bi-check-circle-fill" style={{ fontSize: "2rem" }} />
              </div>
              <div className="eyebrow justify-center" style={{ color: "#5a9e5c", marginBottom: "0.75rem" }}>
                Application Submitted
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2.5rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "1rem",
                }}
              >
                Welcome to the Network!
              </h3>
              <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.9rem", maxWidth: "420px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
                Our outgrower coordinator will review your farm details and contact you within 3 business days.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-ghost">
                Submit Another Application
              </button>
            </div>
          ) : (
            <div
              className="glass-dark"
              style={{ padding: "3rem", borderRadius: "24px", border: "1px solid rgba(196,136,42,0.25)" }}
            >
              <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "0.75rem" }}>
                Partner Registration
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "2.4rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "0.5rem",
                }}
              >
                Join as a Partner Farmer
              </h2>
              <p style={{ color: "rgba(245,239,228,0.5)", fontSize: "0.9rem", marginBottom: "2rem" }}>
                Complete the application below to enroll your farm in our outgrower scheme.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIELDS.slice(0, 2).map((field) => (
                    <div key={field.name}>
                      <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                        {field.label} *
                      </label>
                      <input
                        name={field.name} type={field.type} required placeholder={field.placeholder}
                        style={{
                          width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIELDS.slice(2).map((field) => (
                    <div key={field.name}>
                      <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                        {field.label} *
                      </label>
                      <input
                        name={field.name} type={field.type} required placeholder={field.placeholder}
                        style={{
                          width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                    What Will You Supply? *
                  </label>
                  <select
                    name="supplyType" required
                    style={{
                      width: "100%", background: "#1C1208", border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem", cursor: "pointer",
                    }}
                  >
                    <option value="">Select supply type…</option>
                    {SUPPLY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                    Additional Notes
                  </label>
                  <textarea
                    name="notes" rows={3} placeholder="Tell us about your acreage, current yield, water access..."
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem", resize: "none",
                    }}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: "0.5rem" }}>
                  {loading ? (
                    "Submitting Application…"
                  ) : (
                    <>
                      <i className="bi bi-person-plus-fill" />
                      Apply to Partner
                      <i className="bi bi-arrow-right" />
                    </>
                  )}
                </button>

                {error && (
                  <div
                    style={{
                      background: "rgba(160,67,30,0.12)", border: "1px solid rgba(160,67,30,0.4)",
                      borderRadius: "10px", padding: "0.875rem 1.125rem", marginTop: "0.5rem",
                      color: "#e07050", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem",
                    }}
                  >
                    <i className="bi bi-exclamation-triangle-fill" style={{ flexShrink: 0 }} />
                    {error}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

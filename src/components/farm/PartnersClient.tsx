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
              Why Partner with <em style={{ color: "#C4882A" }}>Osotua</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div
                key={b.label}
                className="glass-dark"
                style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "20px",
                  border: "1px solid rgba(196,136,42,0.2)",
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
                      borderRadius: "14px",
                      background: "rgba(196,136,42,0.15)",
                      border: "1px solid rgba(196,136,42,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#C4882A",
                      marginBottom: "1.5rem",
                      fontSize: "1.3rem",
                    }}
                  >
                    <i className={`bi ${b.icon}`} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                      fontSize: "1.4rem",
                      fontWeight: 400,
                      color: "#F5EFE4",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {b.label}
                  </h3>
                  <p style={{ color: "rgba(245,239,228,0.6)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section style={{ padding: "7rem 0" }}>
        <div className="os-container">
          <div className="max-w-2xl mx-auto">
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div className="eyebrow justify-center" style={{ color: "#C4882A", marginBottom: "0.75rem" }}>
                Outgrower Registration
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  color: "#1C1208",
                  lineHeight: 1.1,
                }}
              >
                Apply to Become a <em style={{ color: "#C4882A" }}>Partner Producer</em>
              </h2>
              <p style={{ color: "#6B3E1A", fontSize: "0.95rem", marginTop: "1rem", lineHeight: 1.7 }}>
                Fill out the application below. Our agricultural partnership team evaluates new farm partners within 3 business days.
              </p>
            </div>

            {submitted ? (
              <div
                style={{
                  background: "rgba(61,107,62,0.1)",
                  border: "1px solid rgba(61,107,62,0.3)",
                  borderRadius: "24px",
                  padding: "4rem 2rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(61,107,62,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    color: "#3D6B3E",
                    fontSize: "2rem",
                  }}
                >
                  <i className="bi bi-check-circle-fill" />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "2.2rem",
                    fontWeight: 400,
                    color: "#1C1208",
                    marginBottom: "0.5rem",
                  }}
                >
                  Application Submitted
                </h3>
                <p style={{ color: "#6B3E1A", fontSize: "0.9rem", maxWidth: "420px", margin: "0 auto 2rem" }}>
                  We have received your farm details. An Osotua field agronomist will reach out via phone/email to schedule a site inspection.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-primary">
                  Submit Another Farm Application
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #EDE5D8",
                  borderRadius: "24px",
                  padding: "3rem",
                  boxShadow: "0 10px 40px rgba(28,18,8,0.04)",
                }}
              >
                {error && (
                  <div
                    style={{
                      background: "rgba(160,67,30,0.1)",
                      border: "1px solid rgba(160,67,30,0.3)",
                      borderRadius: "12px",
                      padding: "1rem",
                      color: "#A0431E",
                      fontSize: "0.85rem",
                      marginBottom: "2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <i className="bi bi-exclamation-triangle-fill" />
                    {error}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                  {FIELDS.map((f) => (
                    <div key={f.name} style={{ gridColumn: f.name === "location" ? "1 / -1" : "auto" }}>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "var(--font-space-grotesk), monospace",
                          fontSize: "0.62rem",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#1C1208",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {f.label} *
                      </label>
                      <input
                        type={f.type}
                        name={f.name}
                        required
                        placeholder={f.placeholder}
                        className="os-input text-xs"
                        style={{ background: "#FBF7F0", borderColor: "#EDE5D8" }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "2.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-space-grotesk), monospace",
                      fontSize: "0.62rem",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#1C1208",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Primary Produce / Supply Category *
                  </label>
                  <select
                    name="supplyType"
                    required
                    className="os-input text-xs"
                    style={{ background: "#FBF7F0", borderColor: "#EDE5D8" }}
                  >
                    {SUPPLY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "1.1rem" }}
                >
                  {loading ? "Submitting Application..." : "Submit Partner Application"}
                  <i className="bi bi-arrow-right" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

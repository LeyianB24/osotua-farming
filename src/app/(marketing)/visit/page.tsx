"use client"

import { useState } from "react"
import Image from "next/image"
import { FIELD_DAY, RANCH_GALLERY } from "@/lib/images"

const TOUR_TYPES = [
  { id: "general", title: "General Ranch Tour", pricePerPerson: 1000, desc: "Explore pastures, livestock pens, water harvesting, and Barn Store sampling." },
  { id: "breeding", title: "Breeding & Cattle Consultation", pricePerPerson: 2500, desc: "Detailed genetic selection walkthrough with our head livestock specialist." },
  { id: "school", title: "School / Student Delegation", pricePerPerson: 500, desc: "Educational field trip on sustainable arid farming and climate resilience." },
  { id: "dining", title: "Farm-to-Table Ranch Dining", pricePerPerson: 3500, desc: "Full ranch tour followed by an organic 3-course open-air ranch lunch." },
]

export default function VisitPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tourType, setTourType] = useState("general")
  const [groupSize, setGroupSize] = useState(2)
  const [visitDate, setVisitDate] = useState("")

  const activeTour = TOUR_TYPES.find((t) => t.id === tourType) || TOUR_TYPES[0]
  const estimatedCost = activeTour.pricePerPerson * groupSize

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    data.estimatedCost = estimatedCost.toString()
    data.tourType = activeTour.title

    try {
      await fetch("/api/visits", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1000)
  }

  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO BANNER ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}
      >
        {/* Background Photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={FIELD_DAY}
            alt="Field day at Osotua ranch"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.2, scale: "1.05" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,18,8,0.95) 0%, rgba(28,18,8,0.75) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1C1208 0%, transparent 60%)" }} />
        </div>

        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
            Guided Rangeland Tours
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
            Come see the
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>ranch</em>
          </h1>
          <p style={{ color: "rgba(245,239,228,0.65)", maxWidth: "540px", lineHeight: 1.8, fontSize: "1rem" }}>
            Book a guided tour of Osotua Farming in Kajiado County. Inspect our purebred herds, review water management infrastructure, visit the Barn Store, and taste ranch-fresh produce.
          </p>
        </div>
      </div>

      {/* ── GALLERY STRIP ── */}
      <div style={{ background: "#1C1208", paddingBottom: "3rem", position: "relative", zIndex: 10 }}>
        <div className="os-container" style={{ transform: "translateY(-3rem)" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {RANCH_GALLERY.slice(0, 4).map((src, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 16px 32px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src={src}
                  alt={`Ranch tour view ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOOKING & SIDEBAR ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "4rem 0 7rem" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Form */}
            <div className="lg:col-span-8">
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
                    Reservation Confirmed
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                      fontSize: "2.5rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "1rem",
                    }}
                  >
                    Ranch Tour Reserved!
                  </h3>
                  <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.9rem", maxWidth: "420px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
                    Thank you for booking your tour. Our hospitality team will call or email you with gate access codes and directions.
                  </p>

                  <div
                    className="glass-gold"
                    style={{ padding: "1.25rem 2rem", borderRadius: "12px", display: "inline-block", textAlign: "left", marginBottom: "2rem" }}
                  >
                    <div style={{ color: "#C4882A", fontSize: "0.85rem", fontWeight: 600 }}>Tour: {activeTour.title}</div>
                    <div style={{ color: "rgba(245,239,228,0.6)", fontSize: "0.8rem", marginTop: "0.25rem" }}>Visitors: {groupSize} Persons · KES {estimatedCost.toLocaleString()}</div>
                  </div>

                  <div>
                    <button onClick={() => setSubmitted(false)} className="btn-ghost">
                      Book Another Tour
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="glass-dark"
                  style={{ padding: "2.5rem", borderRadius: "24px", border: "1px solid rgba(196,136,42,0.25)" }}
                >
                  <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "0.75rem" }}>
                    Reserve Your Spot
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                      fontSize: "2.2rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "2rem",
                    }}
                  >
                    Tour Package &amp; Visitor Details
                  </h2>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {/* Package selector */}
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.75rem" }}>
                        1. Select Experience
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {TOUR_TYPES.map((tour) => {
                          const active = tourType === tour.id
                          return (
                            <button
                              type="button"
                              key={tour.id}
                              onClick={() => setTourType(tour.id)}
                              style={{
                                padding: "1.25rem",
                                borderRadius: "14px",
                                textAlign: "left",
                                background: active ? "rgba(196,136,42,0.18)" : "rgba(255,255,255,0.04)",
                                border: active ? "1px solid #C4882A" : "1px solid rgba(255,255,255,0.08)",
                                cursor: "pointer",
                                transition: "all 0.25s ease",
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.35rem" }}>
                                <div style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "1.2rem", fontWeight: 400, color: "#F5EFE4" }}>
                                  {tour.title}
                                </div>
                                <span style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.6rem", fontWeight: 700, color: "#C4882A" }}>
                                  KES {tour.pricePerPerson.toLocaleString()}
                                </span>
                              </div>
                              <p style={{ color: "rgba(245,239,228,0.5)", fontSize: "0.78rem", lineHeight: 1.5 }}>
                                {tour.desc}
                              </p>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                          Full Name *
                        </label>
                        <input
                          name="fullName" type="text" required placeholder="e.g. Sarah Mwangi"
                          style={{
                            width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                          Email Address *
                        </label>
                        <input
                          name="email" type="email" required placeholder="sarah@example.com"
                          style={{
                            width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem",
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                          Phone Number *
                        </label>
                        <input
                          name="phone" type="tel" required placeholder="0712345678"
                          style={{
                            width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                          Group Size *
                        </label>
                        <input
                          name="groupSize" type="number" min={1} max={50} value={groupSize}
                          onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)} required
                          style={{
                            width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                          Visit Date *
                        </label>
                        <input
                          name="visitDate" type="date" value={visitDate}
                          onChange={(e) => setVisitDate(e.target.value)} required
                          min={new Date().toISOString().split("T")[0]}
                          style={{
                            width: "100%", background: "#1C1208", border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem", cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>

                    {/* Summary bar */}
                    <div
                      className="glass-gold"
                      style={{
                        padding: "1.25rem 1.75rem", borderRadius: "16px",
                        display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                        marginTop: "1rem",
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.4)" }}>
                          Estimated Tour Fee
                        </div>
                        <div style={{ fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif", fontSize: "2rem", fontWeight: 300, color: "#C4882A", lineHeight: 1 }}>
                          KES {estimatedCost.toLocaleString()}
                        </div>
                      </div>

                      <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? (
                          "Reserving…"
                        ) : (
                          <>
                            <i className="bi bi-calendar-check-fill" />
                            Confirm &amp; Book Tour
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-4 space-y-5">
              <div className="glass-dark" style={{ padding: "2rem", borderRadius: "20px", border: "1px solid rgba(196,136,42,0.25)" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                    fontSize: "1.8rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "1rem",
                    display: "flex", alignItems: "center", gap: "0.6rem",
                  }}
                >
                  <i className="bi bi-geo-alt-fill" style={{ color: "#C4882A" }} />
                  Location &amp; Access
                </h3>
                <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  Osotua Farming is situated in Kajiado County, Kenya — approximately 45km south of Nairobi along the Namanga Highway.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: "0.8rem", color: "rgba(245,239,228,0.7)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <i className="bi bi-clock-fill" style={{ color: "#C4882A" }} />
                    <span>Mon – Sat: 8:00 AM – 4:30 PM</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <i className="bi bi-compass-fill" style={{ color: "#C4882A" }} />
                    <span>GPS: 1.8483° S, 36.7932° E</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

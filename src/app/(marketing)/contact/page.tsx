"use client"

import { useState } from "react"

const CONTACT_ITEMS = [
  { icon: "bi-geo-alt-fill", label: "Location", value: "Kajiado County, Kenya", sub: "Off Namanga Highway, 2 km from Kajiado Town" },
  { icon: "bi-envelope-fill", label: "Email", value: "info@osotuafarming.co.ke", href: "mailto:info@osotuafarming.co.ke" },
  { icon: "bi-telephone-fill", label: "Phone", value: "+254 700 000 000", href: "tel:+254700000000" },
  { icon: "bi-clock-fill", label: "Hours", value: "Mon–Sat, 8:00 AM – 5:00 PM EAT", sub: "Closed Sundays & Public Holidays" },
]

const SUBJECT_OPTIONS = [
  "Livestock purchase enquiry",
  "Barn Store / produce order",
  "Farm visit booking",
  "Investment / partnership",
  "Media & press",
  "Other",
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData(e.currentTarget)
      const body = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone") || undefined,
        subject: formData.get("subject"),
        message: formData.get("message"),
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        alert("Failed to submit contact enquiry. Please check fields.")
      }
    } catch {
      alert("Error submitting message.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
            Get in Touch
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
            Let&apos;s talk
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>farming</em>
          </h1>
          <p style={{ color: "rgba(245,239,228,0.65)", maxWidth: "540px", lineHeight: 1.8, fontSize: "1rem" }}>
            Whether you&apos;re looking to purchase purebred livestock, source fresh produce, explore investment opportunities, or schedule a ranch visit — our team is at your service.
          </p>
        </div>
      </div>

      {/* ── CONTENT SECTION ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-5">
              <div className="eyebrow" style={{ color: "#C4882A" }}>Direct Communication</div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
                  fontWeight: 300,
                  color: "#F5EFE4",
                  lineHeight: 1.1,
                  marginBottom: "2rem",
                }}
              >
                Ranch &amp; Office Details
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {CONTACT_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="glass-dark"
                    style={{ padding: "1.5rem", display: "flex", gap: "1rem", borderRadius: "16px" }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "rgba(196,136,42,0.12)",
                        border: "1px solid rgba(196,136,42,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i className={`bi ${item.icon}`} style={{ fontSize: "1.2rem", color: "#C4882A" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,239,228,0.4)", marginBottom: "0.25rem" }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} style={{ color: "#F5EFE4", fontSize: "0.92rem", textDecoration: "none", fontWeight: 500 }} className="hover:text-[#C4882A] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div style={{ color: "#F5EFE4", fontSize: "0.92rem", fontWeight: 500 }}>
                          {item.value}
                        </div>
                      )}
                      {item.sub && (
                        <div style={{ color: "rgba(245,239,228,0.45)", fontSize: "0.78rem", marginTop: "0.25rem" }}>
                          {item.sub}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
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
                    Enquiry Received
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                      fontSize: "2.5rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "1rem",
                    }}
                  >
                    Message Sent Successfully!
                  </h3>
                  <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.9rem", maxWidth: "380px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
                    Thank you for reaching out. Our team will review your message and respond within 24 hours during business hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-ghost">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div
                  className="glass-dark"
                  style={{ padding: "2.5rem sm:padding-3rem", borderRadius: "24px", border: "1px solid rgba(196,136,42,0.25)" }}
                >
                  <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "0.75rem" }}>
                    Send an Enquiry
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                      fontSize: "2.2rem", fontWeight: 300, color: "#F5EFE4", marginBottom: "2rem",
                    }}
                  >
                    How can we assist you?
                  </h2>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                          Full Name *
                        </label>
                        <input
                          name="name" type="text" required placeholder="e.g. Jane Wanjiku"
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
                          name="email" type="email" required placeholder="jane@example.com"
                          style={{
                            width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                        Phone Number
                      </label>
                      <input
                        name="phone" type="tel" placeholder="+254 700 000 000"
                        style={{
                          width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                        Topic / Subject *
                      </label>
                      <select
                        name="subject" required
                        style={{
                          width: "100%", background: "#1C1208", border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem", cursor: "pointer",
                        }}
                      >
                        <option value="">Select a topic…</option>
                        {SUBJECT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,239,228,0.45)", marginBottom: "0.5rem" }}>
                        Message *
                      </label>
                      <textarea
                        name="message" required rows={5} placeholder="Tell us how we can help…"
                        style={{
                          width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: "10px", padding: "0.875rem 1.125rem", color: "#F5EFE4", outline: "none", fontSize: "0.9rem", resize: "none",
                        }}
                      />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: "0.5rem", alignSelf: "flex-start" }}>
                      {loading ? (
                        "Sending Enquiry…"
                      ) : (
                        <>
                          <i className="bi bi-send-fill" />
                          Send Message
                          <i className="bi bi-arrow-right" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

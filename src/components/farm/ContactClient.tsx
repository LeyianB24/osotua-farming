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

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")
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
        setErrorMessage("Failed to submit contact enquiry. Please check fields.")
      }
    } catch {
      setErrorMessage("Error submitting message. Please try again.")
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
                  fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  color: "#F5EFE4",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                }}
              >
                Reach Our <em style={{ color: "#C4882A" }}>Ranch Desk</em>
              </h2>

              <div className="space-y-4">
                {CONTACT_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="glass-dark p-5 rounded-2xl border border-white/10 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C4882A]/15 text-[#C4882A] flex items-center justify-center shrink-0 text-lg">
                      <i className={`bi ${item.icon}`} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#C4882A]">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-[#F5EFE4] hover:text-[#C4882A] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm font-medium text-[#F5EFE4]">{item.value}</div>
                      )}
                      {item.sub && <div className="text-xs text-[#F5EFE4]/50 mt-0.5">{item.sub}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-dark p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#3D6B3E]/20 text-[#3D6B3E] flex items-center justify-center mx-auto text-3xl border border-[#3D6B3E]/40">
                      <i className="bi bi-check-circle-fill" />
                    </div>
                    <h3 className="font-serif text-3xl text-[#F5EFE4]">Message Dispatched</h3>
                    <p className="text-xs text-[#F5EFE4]/60 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Osotua Farming. Our ranch office will review your inquiry and respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-primary py-2.5 px-6 text-xs mt-4"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-[#A0431E]/20 border border-[#A0431E]/40 text-[#F5EFE4] text-xs flex items-center gap-2">
                        <i className="bi bi-exclamation-triangle-fill text-[#A0431E]" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F5EFE4]/70 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Moses Ole Sironka"
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-[#F5EFE4] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F5EFE4]/70 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="moses@example.co.ke"
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-[#F5EFE4] outline-none focus:border-[#C4882A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F5EFE4]/70 mb-1">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+254 700 000 000"
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-[#F5EFE4] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F5EFE4]/70 mb-1">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          required
                          className="w-full bg-[#1C1208] border border-white/10 rounded-xl p-3 text-xs text-[#F5EFE4] outline-none focus:border-[#C4882A]"
                        >
                          {SUBJECT_OPTIONS.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#F5EFE4]/70 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us about your requirements, livestock inquiries, or delivery questions..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-[#F5EFE4] outline-none focus:border-[#C4882A]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary py-3 text-xs justify-center flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <i className="bi bi-arrow-repeat animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message to Osotua</span>
                          <i className="bi bi-send-fill" />
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

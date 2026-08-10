"use client"

import { useState } from "react"

const CONTACT_ITEMS = [
  { icon: "bi-geo-alt", label: "Location", value: "Kajiado County, Kenya", sub: "Off Namanga Road, 2 km from Kajiado town" },
  { icon: "bi-envelope", label: "Email", value: "info@osotuafarming.co.ke", href: "mailto:info@osotuafarming.co.ke" },
  { icon: "bi-telephone", label: "Phone", value: "+254 700 000 000", href: "tel:+254700000000" },
  { icon: "bi-clock", label: "Hours", value: "Mon–Sat, 8am–5pm EAT", sub: "Closed Sundays & public holidays" },
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
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0] pt-20">
      {/* Hero */}
      <div className="relative bg-[#1C1208] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-5xl mx-auto z-10">
          <div className="eyebrow text-[#C4882A] mb-4">
            Get in Touch
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#F5EFE4] mb-4 leading-tight">
            Let&apos;s talk <em className="text-[#C4882A] not-italic">farming</em>
          </h1>
          <p className="text-[#F5EFE4]/70 max-w-lg leading-relaxed text-base">
            Whether you&apos;re looking to buy livestock, source fresh produce, invest in agribusiness, or simply visit the ranch — we&apos;re here.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="eyebrow mb-2">Reach Us Directly</div>
            <h2 className="font-serif text-3xl text-[#1C1208] font-light mb-4">Contact Details</h2>
            <div className="space-y-4">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="os-card p-5 flex gap-4">
                  <div className="w-10 h-10 bg-[#C4882A]/10 border border-[#C4882A]/25 rounded flex items-center justify-center flex-shrink-0">
                    <i className={`bi ${item.icon} text-lg text-[#C4882A]`} />
                  </div>
                  <div>
                    <div className="eyebrow-plain mb-1 text-[#1C1208]/40" style={{ fontSize: "0.55rem" }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-[#1C1208] hover:text-[#C4882A] transition-colors font-medium">{item.value}</a>
                    ) : (
                      <div className="text-sm text-[#1C1208] font-medium">{item.value}</div>
                    )}
                    {item.sub && <div className="text-xs text-[#1C1208]/40 mt-0.5">{item.sub}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="relative rounded overflow-hidden border border-[#1C1208]/08 bg-[#EDE5D8] h-48 flex items-center justify-center shadow-sm">
              <div className="text-center">
                <i className="bi bi-geo-alt text-3xl text-[#C4882A] mb-2 block" />
                <p className="text-[#1C1208]/60 text-xs font-mono tracking-wide font-semibold">Kajiado County, Kenya</p>
                <p className="text-[#1C1208]/40 text-[10px] mt-0.5 font-mono">-1.8500, 36.7833</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="os-card p-12 text-center shadow-xl">
                <div className="w-16 h-16 bg-[#3D6B3E]/10 border border-[#3D6B3E]/30 rounded-full flex items-center justify-center mx-auto mb-5 text-[#3D6B3E]">
                  <i className="bi bi-check-circle text-3xl" />
                </div>
                <div className="eyebrow justify-center text-[#3D6B3E] mb-2">Message Sent</div>
                <h3 className="font-serif text-3xl text-[#1C1208] font-light mb-3">Message Received!</h3>
                <p className="text-[#1C1208]/60 text-sm mb-6 leading-relaxed max-w-xs mx-auto">
                  Thank you for reaching out. Our team will respond within 24 hours during business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline-dark"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="os-card p-8 sm:p-10 shadow-xl">
                <div className="eyebrow mb-2">Send an Enquiry</div>
                <h2 className="font-serif text-3xl text-[#1C1208] font-light mb-6">Send a Message</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Row: name + email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "name", label: "Full Name", type: "text", placeholder: "Jane Wanjiku" },
                      { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">{f.label}</label>
                        <input
                          name={f.name}
                          type={f.type}
                          required
                          placeholder={f.placeholder}
                          className="os-input"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+254 700 000 000"
                      className="os-input"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">Subject</label>
                    <select
                      name="subject"
                      required
                      className="os-input cursor-pointer"
                    >
                      <option value="">Select a topic…</option>
                      {SUBJECT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us how we can help…"
                      className="os-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary self-start mt-2"
                  >
                    {loading ? (
                      "Sending Message…"
                    ) : (
                      <>
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
    </div>
  )
}

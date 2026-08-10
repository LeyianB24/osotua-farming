"use client"

import { useState } from "react"
import { MapPin, Mail, Phone, Clock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"

const CONTACT_ITEMS = [
  { icon: MapPin, label: "Location", value: "Kajiado County, Kenya", sub: "Off Namanga Road, 2 km from Kajiado town" },
  { icon: Mail, label: "Email", value: "info@osotuafarming.co.ke", href: "mailto:info@osotuafarming.co.ke" },
  { icon: Phone, label: "Phone", value: "+254 700 000 000", href: "tel:+254700000000" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 8am–5pm EAT", sub: "Closed Sundays & public holidays" },
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
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {/* Hero */}
      <div className="relative bg-[#0E0A04] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#C4882A]/08 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3D6B3E]/06 rounded-full blur-3xl" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(#F5EFE4 1px, transparent 1px), linear-gradient(90deg, #F5EFE4 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-[0.25em] uppercase flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#C4882A]" />
            Get in Touch
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl font-light text-[#F5EFE4] mb-4 leading-tight">
            Let&apos;s talk <em className="text-[#C4882A]">farming</em>
          </h1>
          <p className="text-[#F5EFE4]/45 max-w-lg leading-relaxed">
            Whether you&apos;re looking to buy livestock, source fresh produce, invest in agribusiness, or simply visit the ranch — we&apos;re here.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-serif text-2xl text-[#1C1208] font-light mb-2">Contact Details</h2>
            <div className="space-y-4">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="group flex gap-4 p-5 bg-white border border-[#1C1208]/06 rounded-xl hover:border-[#C4882A]/30 hover:shadow-md transition-all duration-200">
                    <div className="w-10 h-10 bg-[#C4882A]/08 border border-[#C4882A]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#C4882A]/14 transition-colors">
                      <Icon className="w-4 h-4 text-[#C4882A]" />
                    </div>
                    <div>
                      <div className="font-mono text-[9px] text-[#1C1208]/35 tracking-widest uppercase mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-[#1C1208] hover:text-[#C4882A] transition-colors font-medium">{item.value}</a>
                      ) : (
                        <div className="text-sm text-[#1C1208] font-medium">{item.value}</div>
                      )}
                      {item.sub && <div className="text-xs text-[#1C1208]/40 mt-0.5">{item.sub}</div>}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Map placeholder */}
            <div className="relative rounded-xl overflow-hidden border border-[#1C1208]/08 bg-[#EDE5D8] h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-[#C4882A] mx-auto mb-2" />
                <p className="text-[#1C1208]/50 text-xs font-mono tracking-wide">Kajiado County, Kenya</p>
                <p className="text-[#1C1208]/35 text-[10px] mt-0.5">-1.8500, 36.7833</p>
              </div>
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "linear-gradient(#1C1208 1px, transparent 1px), linear-gradient(90deg, #1C1208 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center bg-white border border-[#3D6B3E]/20 rounded-2xl p-12 shadow-sm max-w-md w-full">
                  <div className="w-16 h-16 bg-[#3D6B3E]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-[#3D6B3E]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#1C1208] font-light mb-2">Message Received!</h3>
                  <p className="text-[#1C1208]/50 text-sm mb-6 leading-relaxed">
                    Thank you for reaching out. Our team will respond within 24 hours during business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#C4882A] text-sm font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#1C1208]/06 rounded-2xl p-8 shadow-sm">
                <h2 className="font-serif text-2xl text-[#1C1208] font-light mb-6">Send a Message</h2>

                {error && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Row: name + email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "name", label: "Full Name", type: "text", placeholder: "Jane Wanjiku" },
                      { name: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
                    ].map((f) => (
                      <div key={f.name} className="group">
                        <label className="font-mono text-[9px] text-[#1C1208]/35 tracking-widest uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">{f.label}</label>
                        <input
                          id={`contact-${f.name}`}
                          name={f.name}
                          type={f.type}
                          required
                          placeholder={f.placeholder}
                          className="w-full border border-[#1C1208]/12 rounded-lg px-4 py-3 text-sm text-[#1C1208] placeholder-[#1C1208]/25 bg-[#FBF7F0] outline-none focus:border-[#C4882A]/50 focus:bg-white transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <label className="font-mono text-[9px] text-[#1C1208]/35 tracking-widest uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">Phone Number</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="+254 700 000 000"
                      className="w-full border border-[#1C1208]/12 rounded-lg px-4 py-3 text-sm text-[#1C1208] placeholder-[#1C1208]/25 bg-[#FBF7F0] outline-none focus:border-[#C4882A]/50 focus:bg-white transition-all duration-200"
                    />
                  </div>

                  {/* Subject */}
                  <div className="group">
                    <label className="font-mono text-[9px] text-[#1C1208]/35 tracking-widest uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">Subject</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      className="w-full border border-[#1C1208]/12 rounded-lg px-4 py-3 text-sm text-[#1C1208] bg-[#FBF7F0] outline-none focus:border-[#C4882A]/50 focus:bg-white transition-all duration-200 appearance-none"
                    >
                      <option value="">Select a topic…</option>
                      {SUBJECT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label className="font-mono text-[9px] text-[#1C1208]/35 tracking-widest uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us how we can help…"
                      className="w-full border border-[#1C1208]/12 rounded-lg px-4 py-3 text-sm text-[#1C1208] placeholder-[#1C1208]/25 bg-[#FBF7F0] outline-none focus:border-[#C4882A]/50 focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={loading}
                    className="relative mt-1 w-full sm:w-auto sm:self-end bg-[#1C1208] text-[#F5EFE4] px-8 py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-[#2e1e0e] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/05 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#F5EFE4]/30 border-t-[#F5EFE4] rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
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

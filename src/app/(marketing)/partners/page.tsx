"use client"

import { useState } from "react"

const BENEFITS = [
  { icon: "bi-graph-up-arrow", label: "Guaranteed offtake prices", desc: "Lock in stable prices for your produce with multi-season contracts." },
  { icon: "bi-bag-check", label: "Direct market access", desc: "Sell through our Barn Store and partner delivery network without middlemen." },
  { icon: "bi-tree", label: "Free agronomist support", desc: "Our team provides free training and field visits for enrolled partner farmers." },
  { icon: "bi-truck", label: "Input credit scheme", desc: "Access seeds, feeds, and inputs on credit against your next delivery." },
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      await fetch("/api/partners", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
    } catch {
      // Fallback
    }
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0] pt-20">
      {/* Hero */}
      <div className="relative bg-[#1C1208] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative max-w-5xl mx-auto z-10">
          <div className="eyebrow text-[#C4882A] mb-4">
            Outgrower Scheme
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#F5EFE4] mb-4 leading-tight">
            Grow with <em className="text-[#C4882A] not-italic">Osotua</em>
          </h1>
          <p className="text-[#F5EFE4]/70 max-w-xl leading-relaxed text-base">
            Supply vegetables, fodder, eggs, or other farm produce under our outgrower scheme and access guaranteed offtake prices, training, and direct market links.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="border-b border-[#EDE5D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="eyebrow justify-center mb-3">Partnership Perks</div>
          <h2 className="font-serif text-4xl text-[#1C1208] font-light mb-12 text-center">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.label} className="os-card p-6">
                <div className="w-12 h-12 bg-[#3D6B3E]/10 border border-[#3D6B3E]/25 rounded flex items-center justify-center mb-4">
                  <i className={`bi ${b.icon} text-xl text-[#3D6B3E]`} />
                </div>
                <div className="font-serif text-xl text-[#1C1208] mb-2">{b.label}</div>
                <div className="text-[#1C1208]/60 text-sm leading-relaxed">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {submitted ? (
          <div className="os-card p-14 text-center shadow-xl">
            <div className="w-16 h-16 bg-[#3D6B3E]/10 border border-[#3D6B3E]/30 rounded-full flex items-center justify-center mx-auto mb-5 text-[#3D6B3E]">
              <i className="bi bi-check-circle text-3xl" />
            </div>
            <div className="eyebrow justify-center text-[#3D6B3E] mb-2">Application Received</div>
            <h3 className="font-serif text-3xl text-[#1C1208] font-light mb-3">Welcome to the Network!</h3>
            <p className="text-[#1C1208]/60 text-sm leading-relaxed max-w-xs mx-auto mb-6">
              Our outgrower coordinator will review your details and contact you within 3 business days.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-outline-dark"
            >
              Submit another application
            </button>
          </div>
        ) : (
          <div className="os-card p-8 sm:p-10 shadow-xl">
            <div className="eyebrow mb-2">Outgrower Application</div>
            <h2 className="font-serif text-3xl text-[#1C1208] font-light mb-2">Join as a Partner Farmer</h2>
            <p className="text-[#1C1208]/60 text-sm mb-8">Complete the form below and our outgrower coordinator will be in touch.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {FIELDS.slice(0, 2).map((field) => (
                  <div key={field.name}>
                    <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      className="os-input"
                    />
                  </div>
                ))}
              </div>

              {/* Phone + Location row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {FIELDS.slice(2).map((field) => (
                  <div key={field.name}>
                    <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      className="os-input"
                    />
                  </div>
                ))}
              </div>

              {/* Supply type */}
              <div>
                <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">What Will You Supply?</label>
                <select
                  name="supplyType"
                  required
                  className="os-input cursor-pointer"
                >
                  <option value="">Select supply type…</option>
                  {SUPPLY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">
                  Additional Notes <span className="normal-case text-[#1C1208]/30">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Tell us about your farm size, current production, etc."
                  className="os-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary justify-center py-4"
              >
                {loading ? (
                  "Submitting Application…"
                ) : (
                  <>
                    Apply to Partner
                    <i className="bi bi-arrow-right" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

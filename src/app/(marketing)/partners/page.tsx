"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, Tractor, ShoppingBag, Leaf, TrendingUp } from "lucide-react"

const BENEFITS = [
  { icon: TrendingUp, label: "Guaranteed offtake prices", desc: "Lock in stable prices for your produce with multi-season contracts." },
  { icon: ShoppingBag, label: "Direct market access", desc: "Sell through our Barn Store and partner delivery network without middlemen." },
  { icon: Leaf, label: "Free agronomist support", desc: "Our team provides free training and field visits for enrolled partner farmers." },
  { icon: Tractor, label: "Input credit scheme", desc: "Access seeds, feeds, and inputs on credit against your next delivery." },
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
    await fetch("/api/partners", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {/* Hero */}
      <div className="relative bg-[#0E0A04] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(#3D6B3E 1px, transparent 1px), linear-gradient(90deg, #3D6B3E 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div className="absolute -top-20 left-0 w-96 h-96 bg-[#3D6B3E]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C4882A]/06 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-[0.25em] uppercase flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#C4882A]" />
            Outgrower Scheme
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl font-light text-[#F5EFE4] mb-4 leading-tight">
            Grow with <em className="text-[#C4882A]">Osotua</em>
          </h1>
          <p className="text-[#F5EFE4]/45 max-w-xl leading-relaxed">
            Supply vegetables, fodder, eggs, or other farm produce under our outgrower scheme and access guaranteed offtake prices, training, and direct market links.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="border-b border-[#EDE5D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-serif text-2xl text-[#1C1208] font-light mb-8 text-center">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.label} className="group p-6 bg-white border border-[#1C1208]/06 rounded-xl hover:border-[#3D6B3E]/40 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 bg-[#3D6B3E]/08 border border-[#3D6B3E]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#3D6B3E]/15 transition-colors">
                    <Icon className="w-5 h-5 text-[#3D6B3E]" />
                  </div>
                  <div className="font-medium text-[#1C1208] text-sm mb-1.5">{b.label}</div>
                  <div className="text-[#1C1208]/45 text-xs leading-relaxed">{b.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center bg-white border border-[#3D6B3E]/20 rounded-2xl p-14 shadow-sm">
            <div className="w-16 h-16 bg-[#3D6B3E]/10 rounded-full flex items-center justify-center mb-5">
              <CheckCircle2 className="w-8 h-8 text-[#3D6B3E]" />
            </div>
            <h3 className="font-serif text-2xl text-[#1C1208] font-light mb-3">Application Received!</h3>
            <p className="text-[#1C1208]/50 text-sm leading-relaxed max-w-xs">
              Our outgrower team will review your application and contact you within 3 business days.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-[#C4882A] text-sm font-medium hover:underline"
            >
              Submit another application
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#1C1208]/06 rounded-2xl p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-[#1C1208] font-light mb-1">Join as a Partner Farmer</h2>
            <p className="text-[#1C1208]/40 text-sm mb-7">Complete the form below and our outgrower coordinator will be in touch.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FIELDS.slice(0, 2).map((field) => (
                  <div key={field.name} className="group">
                    <label className="font-mono text-[9px] text-[#1C1208]/35 tracking-widest uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">
                      {field.label}
                    </label>
                    <input
                      id={`partner-${field.name}`}
                      name={field.name}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      className="w-full border border-[#1C1208]/12 rounded-lg px-4 py-3 text-sm text-[#1C1208] placeholder-[#1C1208]/25 bg-[#FBF7F0] outline-none focus:border-[#C4882A]/50 focus:bg-white transition-all duration-200"
                    />
                  </div>
                ))}
              </div>

              {/* Phone + Location row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FIELDS.slice(2).map((field) => (
                  <div key={field.name} className="group">
                    <label className="font-mono text-[9px] text-[#1C1208]/35 tracking-widest uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">
                      {field.label}
                    </label>
                    <input
                      id={`partner-${field.name}`}
                      name={field.name}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      className="w-full border border-[#1C1208]/12 rounded-lg px-4 py-3 text-sm text-[#1C1208] placeholder-[#1C1208]/25 bg-[#FBF7F0] outline-none focus:border-[#C4882A]/50 focus:bg-white transition-all duration-200"
                    />
                  </div>
                ))}
              </div>

              {/* Supply type */}
              <div className="group">
                <label className="font-mono text-[9px] text-[#1C1208]/35 tracking-widest uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">
                  What Will You Supply?
                </label>
                <select
                  id="partner-supply"
                  name="supplyType"
                  required
                  className="w-full border border-[#1C1208]/12 rounded-lg px-4 py-3 text-sm text-[#1C1208] bg-[#FBF7F0] outline-none focus:border-[#C4882A]/50 focus:bg-white transition-all duration-200 appearance-none"
                >
                  <option value="">Select supply type…</option>
                  {SUPPLY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div className="group">
                <label className="font-mono text-[9px] text-[#1C1208]/35 tracking-widest uppercase block mb-2 transition-colors group-focus-within:text-[#C4882A]">
                  Additional Notes <span className="normal-case text-[#1C1208]/25">(optional)</span>
                </label>
                <textarea
                  id="partner-notes"
                  name="notes"
                  rows={3}
                  placeholder="Tell us about your farm size, current production, etc."
                  className="w-full border border-[#1C1208]/12 rounded-lg px-4 py-3 text-sm text-[#1C1208] placeholder-[#1C1208]/25 bg-[#FBF7F0] outline-none focus:border-[#C4882A]/50 focus:bg-white transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                id="partner-submit"
                disabled={loading}
                className="relative mt-1 w-full bg-[#3D6B3E] text-white px-6 py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-[#4d8a50] hover:shadow-lg hover:shadow-[#3D6B3E]/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Apply to Partner
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
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

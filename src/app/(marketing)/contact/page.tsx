"use client"

import { useState } from "react"

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
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      <div className="bg-[#1C1208] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#C4882A]" />
            Get in Touch
          </div>
          <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
            Let&apos;s talk <em className="text-[#C4882A]">farming</em>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info */}
          <div>
            <h2 className="font-serif text-2xl text-[#1C1208] font-light mb-6">Contact Information</h2>
            {[
              { label: "Location", value: "Kajiado County, Kenya" },
              { label: "Email", value: "info@osotuafarming.co.ke" },
              { label: "Phone", value: "+254 700 000 000" },
              { label: "Hours", value: "Mon–Sat, 8am–5pm EAT" },
            ].map((item) => (
              <div key={item.label} className="mb-5">
                <div className="font-mono text-[9px] text-[#C4882A] tracking-widest uppercase mb-1">{item.label}</div>
                <div className="text-[#1C1208] text-sm">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-[#3D6B3E]/10 border border-[#3D6B3E]/30 rounded p-8 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-serif text-xl text-[#1C1208] mb-2">Message Sent!</h3>
                <p className="text-[#1C1208]/60 text-sm">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {["Full Name", "Email Address", "Phone Number"].map((field) => (
                  <div key={field}>
                    <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-1">{field}</label>
                    <input
                      required
                      className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] bg-white outline-none focus:border-[#C4882A] transition-colors"
                      type={field.includes("Email") ? "email" : field.includes("Phone") ? "tel" : "text"}
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] bg-white outline-none focus:border-[#C4882A] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

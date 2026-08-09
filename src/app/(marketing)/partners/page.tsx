"use client"

import { useState } from "react"

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    await fetch("/api/partners", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      <div className="bg-[#1C1208] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#C4882A]" />
            Partner Farmers
          </div>
          <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
            Grow with <em className="text-[#C4882A]">Osotua</em>
          </h1>
          <p className="text-[#F5EFE4]/50 max-w-xl leading-relaxed">
            Supply vegetables, fodder, eggs, or other farm produce under our outgrower scheme and access guaranteed offtake prices and training.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {submitted ? (
          <div className="bg-[#3D6B3E]/10 border border-[#3D6B3E]/30 rounded p-10 text-center">
            <div className="text-5xl mb-4">🌾</div>
            <h3 className="font-serif text-2xl text-[#1C1208] mb-2">Application Received!</h3>
            <p className="text-[#1C1208]/60">Our team will review your application and be in touch within 3 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#1C1208]/08 rounded p-8 flex flex-col gap-5">
            <h2 className="font-serif text-2xl text-[#1C1208]">Join as a Partner Farmer</h2>
            {[
              { name: "fullName", label: "Full Name", type: "text" },
              { name: "email", label: "Email Address", type: "email" },
              { name: "phone", label: "Phone Number", type: "tel" },
              { name: "location", label: "Your Location / County", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-2">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  required
                  className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] outline-none focus:border-[#C4882A] transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-2">What will you supply?</label>
              <select
                name="supplyType"
                required
                className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] outline-none focus:border-[#C4882A] transition-colors"
              >
                <option value="">Select supply type</option>
                {["Vegetables", "Fruits", "Fodder / Animal Feed", "Eggs", "Honey", "Dairy Products", "Other"].map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Apply to Partner"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

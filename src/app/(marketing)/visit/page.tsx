"use client"

import { useState } from "react"
import Image from "next/image"
import { FIELD_DAY, RANCH_GALLERY } from "@/lib/images"

export default function VisitPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    await fetch("/api/visits", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      <div className="relative bg-[#1C1208] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={FIELD_DAY}
            alt="A day at the Osotua ranch"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1208]/85 via-[#1C1208]/70 to-[#1C1208]/95" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#C4882A]" />
            Farm Visits
          </div>
          <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
            Come see the <em className="text-[#C4882A]">ranch</em>
          </h1>
          <p className="text-[#F5EFE4]/70 max-w-xl">
            Book a guided tour of Osotua Farming. See the herds, the fields, the Barn Store, and experience it all for yourself.
          </p>
        </div>
      </div>

      {/* Ranch gallery preview */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-12 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {RANCH_GALLERY.slice(0, 4).map((src, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded">
              <Image
                src={src}
                alt={`Ranch life ${i + 1}`}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {submitted ? (
          <div className="bg-[#3D6B3E]/10 border border-[#3D6B3E]/30 rounded p-10 text-center">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="font-serif text-2xl text-[#1C1208] mb-2">Visit Booked!</h3>
            <p className="text-[#1C1208]/60">We will contact you to confirm your visit date. Looking forward to welcoming you!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#1C1208]/08 rounded p-8 flex flex-col gap-5">
            <h2 className="font-serif text-2xl text-[#1C1208]">Book Your Visit</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { name: "fullName", label: "Full Name", type: "text" },
                { name: "email", label: "Email Address", type: "email" },
                { name: "phone", label: "Phone Number", type: "tel" },
                { name: "groupSize", label: "Group Size", type: "number" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-2">{field.label}</label>
                  <input
                    name={field.name}
                    type={field.type}
                    min={field.type === "number" ? 1 : undefined}
                    required
                    className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] outline-none focus:border-[#C4882A] transition-colors"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-2">Preferred Visit Date</label>
              <input
                name="visitDate"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] outline-none focus:border-[#C4882A] transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-2">Purpose of Visit (optional)</label>
              <textarea
                name="purpose"
                rows={3}
                placeholder="e.g. buying livestock, farm tour, school trip..."
                className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] outline-none focus:border-[#C4882A] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors disabled:opacity-60"
            >
              {loading ? "Booking..." : "Book My Visit"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

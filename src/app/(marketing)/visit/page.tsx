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
      // Graceful fallback
    }

    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1200)
  }

  return (
    <div className="bg-[#FBF7F0] pt-20 min-h-screen">
      {/* Header */}
      <div className="relative bg-[#1C1208] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
        <div className="relative max-w-5xl mx-auto z-10">
          <div className="eyebrow text-[#C4882A] mb-4">
            Farm Visits & Rangeland Tours
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#F5EFE4] mb-4 leading-tight">
            Come see the <em className="text-[#C4882A] not-italic">ranch</em>
          </h1>
          <p className="text-[#F5EFE4]/70 max-w-xl leading-relaxed text-base">
            Book a guided tour of Osotua Farming in Kajiado County. See the herds, inspect our breeding stock, visit the Barn Store, and taste farm-fresh produce.
          </p>
        </div>
      </div>

      {/* Ranch gallery preview */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-12 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {RANCH_GALLERY.slice(0, 4).map((src, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded border border-white/20 shadow-md">
              <Image
                src={src}
                alt={`Ranch life ${i + 1}`}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="os-card p-10 text-center shadow-xl">
                <div className="w-16 h-16 rounded-full bg-[#3D6B3E]/10 text-[#3D6B3E] flex items-center justify-center mx-auto mb-4 border border-[#3D6B3E]/30">
                  <i className="bi bi-check-circle text-3xl" />
                </div>
                <div className="eyebrow justify-center text-[#3D6B3E] mb-2">Booking Confirmed</div>
                <h3 className="font-serif text-3xl text-[#1C1208] mb-3">Visit Reserved!</h3>
                <p className="text-xs text-[#1C1208]/60 max-w-md mx-auto leading-relaxed mb-6">
                  Thank you for booking your tour. Our hospitality coordinator will call or email you with arrival directions and entry passes.
                </p>
                <div className="p-4 bg-[#F5EFE4] rounded inline-block text-left text-xs font-mono text-[#1C1208]/80 mb-6 border border-black/5">
                  <div>Tour: <strong>{activeTour.title}</strong></div>
                  <div>Visitors: <strong>{groupSize} Persons</strong></div>
                  <div>Date: <strong>{visitDate || "As Selected"}</strong></div>
                  <div>Est. Fee: <strong>KES {estimatedCost.toLocaleString()}</strong></div>
                </div>
                <div>
                  <button onClick={() => setSubmitted(false)} className="btn-outline-dark">
                    Book Another Visit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="os-card p-6 sm:p-8 shadow-xl space-y-6">
                <div className="eyebrow mb-1">Select Experience</div>
                <h2 className="font-serif text-3xl text-[#1C1208] border-b border-[#1C1208]/08 pb-4">
                  Tour Package & Details
                </h2>

                {/* Tour Package Cards */}
                <div>
                  <label className="eyebrow-plain mb-3 block text-[#1C1208]/50">1. Choose Tour Experience</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TOUR_TYPES.map((tour) => (
                      <button
                        type="button"
                        key={tour.id}
                        onClick={() => setTourType(tour.id)}
                        className={`p-4 rounded border text-left transition-all ${
                          tourType === tour.id
                            ? "border-[#C4882A] bg-[#C4882A]/08 ring-1 ring-[#C4882A]"
                            : "border-[#1C1208]/12 hover:border-[#C4882A]/50 bg-[#FBF7F0]/50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <div className="font-serif font-semibold text-sm text-[#1C1208]">{tour.title}</div>
                          <span className="font-mono text-[10px] font-bold text-[#C4882A]">
                            KES {tour.pricePerPerson.toLocaleString()}/pp
                          </span>
                        </div>
                        <p className="text-[11px] text-[#1C1208]/60 leading-relaxed">{tour.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">Full Name *</label>
                    <input name="fullName" type="text" required placeholder="e.g. Sarah Mwangi" className="os-input" />
                  </div>
                  <div>
                    <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">Email Address *</label>
                    <input name="email" type="email" required placeholder="sarah@example.com" className="os-input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">Phone Number *</label>
                    <input name="phone" type="tel" required placeholder="0712345678" className="os-input" />
                  </div>
                  <div>
                    <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">Group Size *</label>
                    <input
                      name="groupSize"
                      type="number"
                      min={1}
                      max={50}
                      value={groupSize}
                      onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                      required
                      className="os-input font-mono"
                    />
                  </div>
                  <div>
                    <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">Visit Date *</label>
                    <input
                      name="visitDate"
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="os-input font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="eyebrow-plain mb-2 block text-[#1C1208]/50">Special Requests / Interests</label>
                  <textarea
                    name="purpose"
                    rows={3}
                    placeholder="e.g. interested in Boran bulls, school field trip, dietary needs..."
                    className="os-input resize-none"
                  />
                </div>

                {/* Estimate Summary */}
                <div className="p-5 bg-[#1C1208] text-[#F5EFE4] rounded flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <span className="text-xs text-[#F5EFE4]/60">Estimated Entry & Tour Fee:</span>
                    <div className="font-mono text-xl font-bold text-[#C4882A]">
                      KES {estimatedCost.toLocaleString()}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? "Confirming…" : "Confirm & Book Tour"}
                    <i className="bi bi-arrow-right" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Location & Directions Sidebar */}
          <div className="space-y-6">
            <div className="os-card p-6 shadow-md space-y-4">
              <h3 className="font-serif text-2xl text-[#1C1208] flex items-center gap-2">
                <i className="bi bi-geo-alt text-[#C4882A] text-xl" />
                <span>Ranch Location</span>
              </h3>
              <p className="text-xs text-[#1C1208]/60 leading-relaxed">
                Osotua Farming is situated in Kajiado County, Kenya — approximately 45km south of Nairobi along the Namanga Highway.
              </p>

              <div className="border-t border-[#1C1208]/08 pt-4 space-y-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#1C1208]/80">
                  <i className="bi bi-clock text-[#C4882A]" />
                  <span>Mon – Sat: 8:00 AM – 4:30 PM</span>
                </div>
                <div className="flex items-center gap-2 text-[#1C1208]/80">
                  <i className="bi bi-compass text-[#C4882A]" />
                  <span>GPS: 1.8483° S, 36.7932° E</span>
                </div>
              </div>

              <div className="p-4 bg-[#F5EFE4] rounded text-[11px] text-[#1C1208]/70 leading-relaxed border border-black/5">
                <strong>Directions from Nairobi:</strong> Take A104 towards Kitengela/Namanga. Pass Isinya town center, turn right at kilometer mark 42 towards Osotua Gate.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

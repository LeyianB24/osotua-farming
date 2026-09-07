"use client"

import { useState } from "react"
import Image from "next/image"
import { FIELD_DAY, RANCH_GALLERY, LOGO } from "@/lib/images"

const TOUR_TYPES = [
  {
    id: "general",
    title: "General Ranch Tour",
    pricePerPerson: 1000,
    desc: "Explore rangeland pastures, livestock paddocks, water harvesting swales, and enjoy a Barn Store sampling session.",
    icon: "ti-compass",
    image: "/images/WhatsApp Image 2026-08-10 at 11.55.21.jpeg",
  },
  {
    id: "breeding",
    title: "Breeding & Cattle Consultation",
    pricePerPerson: 2500,
    desc: "Detailed genetic selection walkthrough, stud registry examination, and 1-on-1 session with our head livestock specialist.",
    icon: "ti-dna-2",
    image: "/images/boran bulls.jpg",
  },
  {
    id: "school",
    title: "School / Student Delegation",
    pricePerPerson: 500,
    desc: "Educational field workshop focusing on sustainable arid agriculture, solar borehole tech, and climate resilience.",
    icon: "ti-school",
    image: "/images/WhatsApp Image 2026-08-10 at 11.56.50.jpeg",
  },
  {
    id: "dining",
    title: "Farm-to-Table Ranch Dining",
    pricePerPerson: 3500,
    desc: "Full ranch guided walkthrough followed by an artisanal 3-course open-air bush lunch prepared with sunrise ingredients.",
    icon: "ti-soup",
    image: "/images/grilled lamb chops.jpg",
  },
]

export default function VisitClient() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tourType, setTourType] = useState("general")
  const [groupSize, setGroupSize] = useState(2)
  const [visitDate, setVisitDate] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [timeSlot, setTimeSlot] = useState("morning")
  const [notes, setNotes] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const activeTour = TOUR_TYPES.find((t) => t.id === tourType) || TOUR_TYPES[0]
  const estimatedCost = activeTour.pricePerPerson * groupSize

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")

    try {
      const payload = {
        fullName,
        email,
        phone,
        groupSize: Number(groupSize),
        visitDate: new Date(visitDate).toISOString(),
        purpose: `${activeTour.title} [${timeSlot === "morning" ? "Morning 9:30 AM" : "Afternoon 2:00 PM"}] (KES ${estimatedCost.toLocaleString()})${notes ? ` - ${notes}` : ""}`,
      }

      const res = await fetch("/api/visits", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        throw new Error("Visit booking failed")
      }

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setErrorMsg("Unable to complete reservation. Please verify that all required fields and dates are selected.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: "#FBF7F0", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="bg-mesh-earth noise relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        {/* Pastoral background overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={FIELD_DAY}
            alt="Field day at Osotua ranch"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF7F0]/95 via-[#FBF7F0]/85 to-[#FBF7F0]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBF7F0] via-transparent to-transparent" />
        </div>

        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-amber-500/10 text-[#8E5E16] border border-amber-500/25 shadow-md">
            <div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-amber-400 shrink-0 bg-white">
              <Image src={LOGO} alt="Osotua Seal" fill sizes="20px" className="object-cover" />
            </div>
            <span>GUIDED RANGELAND TOURS &bull; AGRITOURISM</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-8"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            Come see the <br />
            <em className="font-normal italic text-gradient-gold">living ranch</em>
          </h1>

          <p className="text-base sm:text-xl text-[#5C4835] max-w-2xl leading-relaxed font-normal">
            Book a private or group guided tour of Osotua Farming in Kajiado County. Inspect our purebred herds, review water management infrastructure, visit the Barn Store, and taste ranch-fresh produce.
          </p>
        </div>
      </section>

      {/* ── GALLERY STRIP ── */}
      <section className="bg-[#FBF7F0] pb-12 relative z-10">
        <div className="os-container -translate-y-8 sm:-translate-y-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {RANCH_GALLERY.slice(0, 4).map((src, i) => (
              <div
                key={i}
                className="relative aspect-video rounded-3xl overflow-hidden border border-amber-900/15 shadow-md group"
              >
                <Image
                  src={src}
                  alt={`Osotua ranch tour photo ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING & TOUR TYPES SECTION ── */}
      <section className="py-24 sm:py-36 bg-gradient-to-b from-transparent via-[#F5EFE4]/50 to-transparent">
        <div className="os-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Visual Tour Selection */}
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20">
                  <span>EXPERIENCE TIERS</span>
                </div>
                <h2
                  className="text-3xl sm:text-5xl font-normal text-[#1C1208] leading-tight m-0"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  Choose Your Tour
                </h2>
                <p className="text-base text-[#5C4835] leading-relaxed">
                  Located in the scenic savanna plains of Kajiado, just 90 minutes from Nairobi. Open Wednesday through Sunday for scheduled delegations.
                </p>
              </div>

              {/* Visual Tour Type Cards */}
              <div className="space-y-5">
                {TOUR_TYPES.map((t) => {
                  const active = tourType === t.id
                  return (
                    <div
                      key={t.id}
                      onClick={() => setTourType(t.id)}
                      className={`card-luxury p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 cursor-pointer transition-all duration-300 ${
                        active
                          ? "ring-2 ring-[#C4882A] border-[#C4882A] bg-amber-50/40 shadow-xl"
                          : "hover:border-amber-900/30 bg-white"
                      }`}
                    >
                      {/* Tour Photo Thumbnail */}
                      <div className="relative w-full sm:w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-amber-900/10 shadow-sm">
                        <Image
                          src={t.image}
                          alt={t.title}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 text-white text-base">
                          <i className={`ti ${t.icon}`} />
                        </div>
                      </div>

                      <div className="flex-1 w-full">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h3
                            className="text-xl font-bold text-[#1C1208] m-0"
                            style={{ fontFamily: "var(--font-fraunces), serif" }}
                          >
                            {t.title}
                          </h3>
                          <span className="font-mono text-xs font-bold text-[#C4882A] uppercase">
                            KES {t.pricePerPerson.toLocaleString()} / person
                          </span>
                        </div>
                        <p className="text-sm text-[#5C4835] mt-2 leading-relaxed m-0">
                          {t.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Location & Quick Info */}
              <div className="card-luxury p-7 flex items-start gap-4 bg-white">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-[#C4882A] flex items-center justify-center shrink-0 text-xl">
                  <i className="ti ti-map-pin" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1C1208]">Ranch Location</h4>
                  <p className="text-xs text-[#5C4835] mt-1 leading-relaxed">Off Magadi Road, Kajiado County, Kenya (90 min from Nairobi CBD)</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#8E5E16] font-bold mt-2 hover:underline"
                  >
                    <span>Get Directions via Google Maps</span>
                    <i className="ti ti-external-link" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-6">
              <div className="card-luxury p-8 sm:p-12 shadow-2xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-5">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-[#2E6B34] flex items-center justify-center mx-auto text-4xl border border-emerald-500/30 shadow-lg">
                      <i className="ti ti-circle-check" />
                    </div>
                    <h3
                      className="text-3xl font-light text-[#1C1208]"
                      style={{ fontFamily: "var(--font-fraunces), serif" }}
                    >
                      Tour Booking Requested
                    </h3>
                    <p className="text-sm text-[#5C4835] max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-[#1C1208]">{fullName}</strong>. Our ranch concierge has received your request for the <strong className="text-[#8E5E16]">{activeTour.title}</strong> on <strong className="text-[#1C1208]">{visitDate}</strong>. We will confirm your schedule within 24 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-primary py-3 px-8 text-xs tracking-wider"
                      >
                        Book Another Visit
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#2E6B34] bg-emerald-500/10 border border-emerald-500/20 mb-2">
                        <span>RESERVATION FORM</span>
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl font-light text-[#1C1208]"
                        style={{ fontFamily: "var(--font-fraunces), serif" }}
                      >
                        Reserve Your Date
                      </h3>
                    </div>

                    {errorMsg && (
                      <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <i className="ti ti-alert-triangle text-base" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. David Ntimama"
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="david@example.com"
                            className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+254 700 000 000"
                            className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            required
                            value={visitDate}
                            onChange={(e) => setVisitDate(e.target.value)}
                            className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                            Group Size *
                          </label>
                          <input
                            type="number"
                            required
                            min={1}
                            max={50}
                            value={groupSize}
                            onChange={(e) => setGroupSize(Number(e.target.value))}
                            className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Time Slot *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setTimeSlot("morning")}
                            className={`py-3 px-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                              timeSlot === "morning"
                                ? "bg-gradient-to-r from-[#C4882A] to-[#D99A30] text-white border-[#C4882A] shadow-md"
                                : "bg-[#FAF6EE] text-[#5C4835] border-amber-900/15 hover:border-amber-900/30"
                            }`}
                          >
                            Morning (9:30 AM)
                          </button>
                          <button
                            type="button"
                            onClick={() => setTimeSlot("afternoon")}
                            className={`py-3 px-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all border ${
                              timeSlot === "afternoon"
                                ? "bg-gradient-to-r from-[#C4882A] to-[#D99A30] text-white border-[#C4882A] shadow-md"
                                : "bg-[#FAF6EE] text-[#5C4835] border-amber-900/15 hover:border-amber-900/30"
                            }`}
                          >
                            Afternoon (2:00 PM)
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Special Requests / Dietary Notes
                        </label>
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Tell us about any specific livestock interests, student delegations, or dietary preferences..."
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>
                    </div>

                    {/* Estimated cost box */}
                    <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold uppercase text-[#8E5E16]">
                          Estimated Experience Total
                        </div>
                        <div className="text-xs text-[#5C4835]">
                          {groupSize} {groupSize === 1 ? "person" : "people"} &times; KES {activeTour.pricePerPerson.toLocaleString()}
                        </div>
                      </div>
                      <div className="font-serif text-2xl font-bold text-[#C4882A]">
                        KES {estimatedCost.toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary py-4 text-xs tracking-widest justify-center shadow-xl"
                    >
                      {loading ? (
                        <>
                          <i className="ti ti-loader animate-spin" />
                          <span>Processing Reservation...</span>
                        </>
                      ) : (
                        <>
                          <i className="ti ti-calendar-check" />
                          <span>CONFIRM RANCH RESERVATION</span>
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

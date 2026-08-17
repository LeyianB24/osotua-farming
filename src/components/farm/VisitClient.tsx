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

export default function VisitClient() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tourType, setTourType] = useState("general")
  const [groupSize, setGroupSize] = useState(2)
  const [visitDate, setVisitDate] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
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
        purpose: `${activeTour.title} (KES ${estimatedCost.toLocaleString()})${notes ? ` - ${notes}` : ""}`,
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
      setErrorMsg("Unable to complete reservation. Please verify that all fields and dates are selected.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: "#FBF7F0" }}>
      {/* ── HERO BANNER ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}
      >
        {/* Background Photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={FIELD_DAY}
            alt="Field day at Osotua ranch"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.2, scale: "1.05" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,18,8,0.95) 0%, rgba(28,18,8,0.75) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1C1208 0%, transparent 60%)" }} />
        </div>

        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
            Guided Rangeland Tours
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
            Come see the
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>ranch</em>
          </h1>
          <p style={{ color: "rgba(245,239,228,0.65)", maxWidth: "540px", lineHeight: 1.8, fontSize: "1rem" }}>
            Book a guided tour of Osotua Farming in Kajiado County. Inspect our purebred herds, review water management infrastructure, visit the Barn Store, and taste ranch-fresh produce.
          </p>
        </div>
      </div>

      {/* ── GALLERY STRIP ── */}
      <div style={{ background: "#1C1208", paddingBottom: "3rem", position: "relative", zIndex: 10 }}>
        <div className="os-container" style={{ transform: "translateY(-3rem)" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {RANCH_GALLERY.slice(0, 4).map((src, i) => (
              <div
                key={i}
                className="relative aspect-video rounded-2xl overflow-hidden border border-[#C4882A]/20 shadow-2xl group"
              >
                <Image
                  src={src}
                  alt={`Osotua ranch photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOOKING SECTION ── */}
      <section style={{ padding: "4rem 0 7rem" }}>
        <div className="os-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "0.75rem" }}>
                  Visit Osotua
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-light">
                  Plan Your Ranch Experience
                </h2>
                <p className="text-sm text-[#6B3E1A] mt-3 leading-relaxed">
                  Located in the scenic savanna plains of Kajiado, just 90 minutes from Nairobi. Open Wednesday to Sunday for scheduled private and group visits.
                </p>
              </div>

              {/* Practical details cards */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-[#EDE5D8] flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#C4882A]/10 text-[#C4882A] flex items-center justify-center shrink-0">
                    <i className="bi bi-geo-alt-fill text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#1C1208]">Location</h4>
                    <p className="text-xs text-[#6B3E1A] mt-0.5">Off Magadi Road, Kajiado County, Kenya</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#C4882A] mt-1 hover:underline"
                    >
                      <i className="bi bi-box-arrow-up-right" />
                      Get Directions via Google Maps
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EDE5D8] flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#3D6B3E]/10 text-[#3D6B3E] flex items-center justify-center shrink-0">
                    <i className="bi bi-clock text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#1C1208]">Visiting Hours</h4>
                    <p className="text-xs text-[#6B3E1A] mt-0.5">Wednesday – Sunday: 9:00 AM – 4:30 PM</p>
                    <p className="text-[11px] text-[#6B3E1A]/70">Prior reservation required at least 24 hours in advance.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EDE5D8] flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#C4882A]/10 text-[#C4882A] flex items-center justify-center shrink-0">
                    <i className="bi bi-shield-check text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#1C1208]">Biosecurity &amp; Dress Code</h4>
                    <p className="text-xs text-[#6B3E1A] mt-0.5">Sturdy closed shoes/boots recommended. Footwear sanitizing footbath at estate gates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#EDE5D8] shadow-xl relative overflow-hidden">
                {errorMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-[#A0431E]/10 border border-[#A0431E]/30 text-[#A0431E] text-xs flex items-center gap-2">
                    <i className="bi bi-exclamation-triangle-fill" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#3D6B3E]/10 text-[#3D6B3E] flex items-center justify-center mx-auto text-3xl">
                      <i className="bi bi-calendar-check" />
                    </div>
                    <h3 className="font-serif text-3xl text-[#1C1208]">Reservation Request Received</h3>
                    <p className="text-xs text-[#6B3E1A] max-w-md mx-auto leading-relaxed">
                      Thank you, {fullName}! Our estate management team will review your requested date ({visitDate}) and dispatch confirmation instructions and gate coordinates to your email ({email}).
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => { setSubmitted(false); }}
                        className="btn-primary py-2.5 px-6 text-xs"
                      >
                        Book Another Tour
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <span className="eyebrow text-[#C4882A] mb-1">Step 1</span>
                      <h3 className="font-serif text-2xl text-[#1C1208] font-light">Select Tour Experience</h3>
                    </div>

                    {/* Tour Type selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TOUR_TYPES.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTourType(t.id)}
                          className={`p-4 rounded-xl text-left border transition-all ${
                            tourType === t.id
                              ? "border-[#C4882A] bg-[#C4882A]/08 ring-2 ring-[#C4882A]/20"
                              : "border-[#EDE5D8] hover:border-[#C4882A]/50 bg-[#FBF7F0]/40"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-xs text-[#1C1208]">{t.title}</span>
                            <span className="font-mono text-[10px] text-[#C4882A] font-bold">
                              KES {t.pricePerPerson.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#6B3E1A] leading-relaxed">{t.desc}</p>
                        </button>
                      ))}
                    </div>

                    {/* Contact & Date details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EDE5D8]">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Joy Wanjiku"
                          className="os-input text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="joy@example.co.ke"
                          className="os-input text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+254 700 000000"
                          className="os-input text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                          Group Size
                        </label>
                        <input
                          type="number"
                          name="groupSize"
                          min={1}
                          max={50}
                          value={groupSize}
                          onChange={(e) => setGroupSize(Math.max(1, parseInt(e.target.value) || 1))}
                          className="os-input text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                          Preferred Visit Date *
                        </label>
                        <input
                          type="date"
                          name="visitDate"
                          required
                          value={visitDate}
                          onChange={(e) => setVisitDate(e.target.value)}
                          className="os-input text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                          Special Requests / Dietary Notes (Optional)
                        </label>
                        <textarea
                          name="notes"
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g. Interest in Boran breeding herd, vegetarian dining option requested..."
                          className="os-input text-xs"
                        />
                      </div>
                    </div>

                    {/* Summary Bar & Submit */}
                    <div className="p-4 rounded-xl bg-[#FBF7F0] border border-[#EDE5D8] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#6B3E1A]">Estimated Total ({groupSize} Guests)</span>
                        <div className="font-serif text-2xl font-bold text-[#1C1208]">
                          KES {estimatedCost.toLocaleString()}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto btn-primary py-3 px-8 text-xs flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <i className="bi bi-arrow-repeat animate-spin" />
                            <span>Booking...</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-calendar-plus" />
                            <span>Confirm Visit Request</span>
                          </>
                        )}
                      </button>
                    </div>
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

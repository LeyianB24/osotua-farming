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
        {/* Pastoral Background Overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={FIELD_DAY}
            alt="Field day at Osotua ranch"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.18, scale: "1.05" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(251,247,240,0.95) 0%, rgba(251,247,240,0.8) 60%, rgba(251,247,240,0.5) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #FBF7F0 0%, transparent 60%)" }} />
        </div>

        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "1.5rem", fontWeight: 700 }}>
            Guided Rangeland Tours
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(3.2rem, 7vw, 7rem)",
              fontWeight: 400,
              color: "#1C1208",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Come see the
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>ranch</em>
          </h1>
          <p style={{ color: "#5C4835", maxWidth: "540px", lineHeight: 1.8, fontSize: "1.05rem" }}>
            Book a guided tour of Osotua Farming in Kajiado County. Inspect our purebred herds, review water management infrastructure, visit the Barn Store, and taste ranch-fresh produce.
          </p>
        </div>
      </div>

      {/* ── GALLERY STRIP ── */}
      <div style={{ background: "#FBF7F0", paddingBottom: "2rem", position: "relative", zIndex: 10 }}>
        <div className="os-container" style={{ transform: "translateY(-2rem)" }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {RANCH_GALLERY.slice(0, 4).map((src, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(196, 136, 42, 0.25)",
                  boxShadow: "0 10px 30px rgba(196,136,42,0.08)",
                }}
                className="relative aspect-video group"
              >
                <Image
                  src={src}
                  alt={`Osotua ranch photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOOKING SECTION ── */}
      <section style={{ padding: "3rem 0 7rem" }}>
        <div className="os-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "0.75rem", fontWeight: 700 }}>
                  Visit Osotua
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1208] font-normal">
                  Plan Your Ranch Experience
                </h2>
                <p className="text-sm text-[#5C4835] mt-3 leading-relaxed">
                  Located in the scenic savanna plains of Kajiado, just 90 minutes from Nairobi. Open Wednesday to Sunday for scheduled private and group visits.
                </p>
              </div>

              {/* Practical details cards */}
              <div className="space-y-4">
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(196, 136, 42, 0.22)",
                    borderRadius: "20px",
                    boxShadow: "0 8px 24px rgba(196, 136, 42, 0.06)",
                  }}
                  className="p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C4882A]/12 text-[#C4882A] flex items-center justify-center shrink-0">
                    <i className="bi bi-geo-alt-fill text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1C1208]">Location</h4>
                    <p className="text-xs text-[#5C4835] mt-0.5">Off Magadi Road, Kajiado County, Kenya</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#8E5E16] font-bold mt-1 hover:underline"
                    >
                      <i className="bi bi-box-arrow-up-right" />
                      Get Directions via Google Maps
                    </a>
                  </div>
                </div>

                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(196, 136, 42, 0.22)",
                    borderRadius: "20px",
                    boxShadow: "0 8px 24px rgba(196, 136, 42, 0.06)",
                  }}
                  className="p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/12 text-[#2E7D32] flex items-center justify-center shrink-0">
                    <i className="bi bi-clock text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1C1208]">Visiting Hours</h4>
                    <p className="text-xs text-[#5C4835] mt-0.5">Wednesday – Sunday: 9:00 AM – 4:30 PM</p>
                    <p className="text-[11px] text-[#786550]">Prior reservation required at least 24 hours in advance.</p>
                  </div>
                </div>

                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(196, 136, 42, 0.22)",
                    borderRadius: "20px",
                    boxShadow: "0 8px 24px rgba(196, 136, 42, 0.06)",
                  }}
                  className="p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C4882A]/12 text-[#C4882A] flex items-center justify-center shrink-0">
                    <i className="bi bi-shield-check text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1C1208]">Biosecurity &amp; Dress Code</h4>
                    <p className="text-xs text-[#5C4835] mt-0.5">Sturdy closed shoes/boots recommended. Footwear sanitizing footbath at estate gates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7">
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(196, 136, 42, 0.25)",
                  borderRadius: "28px",
                  boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
                }}
                className="p-6 sm:p-10 relative overflow-hidden"
              >
                {errorMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2">
                    <i className="bi bi-exclamation-triangle-fill text-[#DC2626]" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#2E7D32]/12 text-[#2E7D32] flex items-center justify-center mx-auto text-3xl">
                      <i className="bi bi-calendar-check" />
                    </div>
                    <h3 className="font-serif text-3xl text-[#1C1208] font-medium">Reservation Request Received</h3>
                    <p className="text-xs text-[#5C4835] max-w-md mx-auto leading-relaxed">
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
                      <span className="eyebrow text-[#8E5E16] mb-1 font-bold">Step 1</span>
                      <h3 className="font-serif text-2xl text-[#1C1208] font-normal">Select Tour Experience</h3>
                    </div>

                    {/* Tour Type selection */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {TOUR_TYPES.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTourType(t.id)}
                          style={{
                            background: tourType === t.id ? "rgba(196, 136, 42, 0.08)" : "#FAF8F5",
                            borderColor: tourType === t.id ? "#C4882A" : "rgba(196, 136, 42, 0.2)",
                          }}
                          className={`p-4 rounded-xl text-left border transition-all ${
                            tourType === t.id ? "ring-2 ring-[#C4882A]/30" : "hover:border-[#C4882A]/50"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-xs text-[#1C1208]">{t.title}</span>
                            <span className="font-mono text-[10px] text-[#C4882A] font-bold">
                              KES {t.pricePerPerson.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5C4835] leading-relaxed">{t.desc}</p>
                        </button>
                      ))}
                    </div>

                    {/* Contact & Date details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#C4882A]/15">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Joy Wanjiku"
                          className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="joy@example.co.ke"
                          className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+254 700 000000"
                          className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                          Group Size
                        </label>
                        <input
                          type="number"
                          name="groupSize"
                          min={1}
                          max={50}
                          value={groupSize}
                          onChange={(e) => setGroupSize(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                          Preferred Visit Date *
                        </label>
                        <input
                          type="date"
                          name="visitDate"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          value={visitDate}
                          onChange={(e) => setVisitDate(e.target.value)}
                          className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-2">
                          Arrival Time Slot *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: "morning", label: "Morning Session", time: "09:30 AM – 12:30 PM", icon: "bi-sun-fill" },
                            { id: "afternoon", label: "Afternoon Session", time: "02:00 PM – 05:00 PM", icon: "bi-sunset-fill" },
                          ].map((slot) => {
                            const active = timeSlot === slot.id
                            return (
                              <button
                                key={slot.id}
                                type="button"
                                onClick={() => setTimeSlot(slot.id)}
                                className={`p-3 rounded-xl text-left border transition-all ${
                                  active
                                    ? "bg-[#C4882A]/15 border-[#C4882A] ring-1 ring-[#C4882A]"
                                    : "bg-[#FAF6EE] border-[#C4882A]/25"
                                }`}
                              >
                                <div className="flex items-center gap-2 text-xs font-bold text-[#1C1208]">
                                  <i className={`bi ${slot.icon} text-[#C4882A]`} />
                                  <span>{slot.label}</span>
                                </div>
                                <div className="text-[10px] text-[#5C4835] mt-0.5 font-mono">{slot.time}</div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                          Special Requests / Dietary Notes (Optional)
                        </label>
                        <textarea
                          name="notes"
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="e.g. Interest in Boran breeding herd, vegetarian dining option requested..."
                          className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>
                    </div>

                    {/* Summary Bar & Submit */}
                    <div
                      style={{
                        background: "#FAF8F5",
                        border: "1px solid rgba(196, 136, 42, 0.2)",
                        borderRadius: "18px",
                      }}
                      className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#786550] font-bold">Estimated Total ({groupSize} Guests)</span>
                        <div className="font-serif text-3xl font-bold text-[#1C1208]">
                          KES {estimatedCost.toLocaleString()}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto btn-primary py-3 px-8 text-xs flex items-center justify-center gap-2 shadow-sm"
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

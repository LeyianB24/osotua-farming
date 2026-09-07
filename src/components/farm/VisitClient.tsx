"use client";

import { useState } from "react";
import Image from "next/image";
import { FIELD_DAY, LOGO } from "@/lib/images";

const TOUR_TYPES = [
  {
    id: "general",
    title: "General Ranch Tour",
    pricePerPerson: 1000,
    desc: "Explore rangeland pastures, livestock paddocks, water harvesting swales, and enjoy a Barn Store sampling session.",
    icon: "bi-compass",
    image: "/images/WhatsApp Image 2026-08-10 at 11.55.21.jpeg",
  },
  {
    id: "breeding",
    title: "Breeding & Cattle Consultation",
    pricePerPerson: 2500,
    desc: "Detailed genetic selection walkthrough, stud registry examination, and 1-on-1 session with our head livestock specialist.",
    icon: "bi-shield-check",
    image: "/images/boran-bull.jpg",
  },
  {
    id: "school",
    title: "School / Student Delegation",
    pricePerPerson: 500,
    desc: "Educational field workshop focusing on sustainable arid agriculture, solar borehole tech, and climate resilience.",
    icon: "bi-mortarboard",
    image: "/images/WhatsApp Image 2026-08-10 at 11.56.50.jpeg",
  },
  {
    id: "dining",
    title: "Farm-to-Table Ranch Dining",
    pricePerPerson: 3500,
    desc: "Full ranch guided walkthrough followed by an artisanal 3-course open-air bush lunch prepared with sunrise ingredients.",
    icon: "bi-cup-hot",
    image: "/images/grilled lamb chops.jpg",
  },
];

export default function VisitClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tourType, setTourType] = useState("general");
  const [groupSize, setGroupSize] = useState(2);
  const [visitDate, setVisitDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeSlot, setTimeSlot] = useState("morning");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const activeTour = TOUR_TYPES.find((t) => t.id === tourType) || TOUR_TYPES[0];
  const estimatedCost = activeTour.pricePerPerson * groupSize;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        fullName,
        email,
        phone,
        groupSize: Number(groupSize),
        visitDate: new Date(visitDate).toISOString(),
        purpose: `${activeTour.title} [${timeSlot === "morning" ? "Morning 9:30 AM" : "Afternoon 2:00 PM"}] (KES ${estimatedCost.toLocaleString()})${notes ? ` - ${notes}` : ""}`,
      };

      const res = await fetch("/api/visits", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Visit booking failed");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Unable to complete reservation. Please verify that all required fields and dates are selected.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#F5F0E8", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        {/* Pastoral background overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={FIELD_DAY}
            alt="Osotua rangeland pastures"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8]/95 via-[#F5F0E8]/85 to-[#F5F0E8]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F0E8] via-transparent to-transparent" />
        </div>

        <div className="os-container relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C99A2E]/50 shrink-0 bg-white"
            >
              <Image
                src={LOGO}
                alt="Osotua Farming Emblem"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: "#6B7A3F", borderRadius: "2px" }}
            >
              <i className="bi bi-geo-alt text-xs" />
              <span>KAJIADO RANGELANDS · 90 MIN FROM NAIROBI</span>
            </div>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-6"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            Visit Osotua, <br />
            <span style={{ color: "#C99A2E" }}>Walk the Living Pastures</span>
          </h1>

          <p
            className="text-base sm:text-xl text-[#8E7E70] max-w-2xl leading-relaxed mb-10 font-normal"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Experience purebred Kenyan livestock breeding, explore solar irrigation and water harvesting swales, and enjoy an authentic bush breakfast under our acacia canopies.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-[#D4C9B0]">
            <a
              href="https://wa.me/254755758208"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ borderRadius: "2px" }}
            >
              <i className="bi bi-whatsapp" />
              <span>WHATSAPP CONCIERGE (+254 755 758 208)</span>
            </a>

            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70]">
              <span>Follow our ranch journey:</span>
              <a
                href="https://www.instagram.com/osotua_ranches_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1C1208] hover:text-[#C99A2E] transition-colors"
              >
                @osotua_ranches_
              </a>
              <span>·</span>
              <a
                href="https://www.tiktok.com/@osotua.ranches"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1C1208] hover:text-[#C99A2E] transition-colors"
              >
                @osotua.ranches
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOURS SELECTION & BOOKING SECTION ── */}
      <section className="py-16 md:py-24 bg-[#F5F0E8]">
        <div className="os-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Tour Packages */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-[0.16em] mb-2"
                  style={{ color: "#C4602A", fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  STEP 1: SELECT YOUR EXPERIENCE
                </div>
                <h2
                  className="text-3xl sm:text-4xl text-[#1C1208] leading-tight"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
                >
                  Curated Rangeland Tours
                </h2>
              </div>

              <div className="space-y-4">
                {TOUR_TYPES.map((t) => {
                  const active = t.id === tourType;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setTourType(t.id)}
                      className={`p-6 border transition-all cursor-pointer flex flex-col sm:flex-row items-start gap-5 ${
                        active
                          ? "bg-[#FAF7F2] border-[#C99A2E] shadow-md"
                          : "bg-white border-[#D4C9B0] hover:border-[#C99A2E]"
                      }`}
                      style={{ borderRadius: "2px" }}
                    >
                      <div className="relative w-full sm:w-28 h-24 shrink-0 overflow-hidden" style={{ borderRadius: "2px" }}>
                        <Image
                          src={t.image}
                          alt={t.title}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 w-full space-y-1.5">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h3
                            className="text-xl text-[#1C1208] m-0"
                            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 600 }}
                          >
                            {t.title}
                          </h3>
                          <span
                            className="text-sm font-bold"
                            style={{ color: "#C4602A", fontFamily: "var(--font-playfair), Georgia, serif" }}
                          >
                            KES {t.pricePerPerson.toLocaleString()} / person
                          </span>
                        </div>
                        <p
                          className="text-xs text-[#8E7E70] leading-relaxed m-0"
                          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          {t.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Location Card */}
              <div
                className="p-6 bg-[#FAF7F2] border border-[#D4C9B0] flex items-start gap-4"
                style={{ borderRadius: "2px" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0 text-white"
                  style={{ backgroundColor: "#1C1208", borderRadius: "2px" }}
                >
                  <i className="bi bi-geo-alt" />
                </div>
                <div>
                  <h4
                    className="text-base text-[#1C1208] font-bold"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    Ranch Coordinates
                  </h4>
                  <p className="text-xs text-[#8E7E70] mt-1 leading-relaxed">
                    Off Magadi Road, Kajiado County, Kenya (Approx. 90 mins from Nairobi CBD).
                  </p>
                  <a
                    href="https://wa.me/254755758208"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-[#C4602A] mt-2 hover:underline"
                  >
                    <span>Request Live Pin via WhatsApp (+254 755 758 208)</span>
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Reservation Form */}
            <div className="lg:col-span-6">
              <div
                className="p-8 sm:p-10 bg-[#FAF7F2] border border-[#D4C9B0] shadow-xl"
                style={{ borderRadius: "2px" }}
              >
                {submitted ? (
                  <div className="text-center py-12 space-y-5">
                    <div
                      className="w-16 h-16 flex items-center justify-center mx-auto text-3xl text-white shadow-md"
                      style={{ backgroundColor: "#6B7A3F", borderRadius: "2px" }}
                    >
                      <i className="bi bi-check-lg" />
                    </div>
                    <h3
                      className="text-3xl font-bold text-[#1C1208]"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      Tour Booking Requested
                    </h3>
                    <p
                      className="text-sm text-[#8E7E70] max-w-md mx-auto leading-relaxed"
                      style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                    >
                      Thank you, <strong className="text-[#1C1208]">{fullName}</strong>. Our ranch concierge has received your request for the <strong className="text-[#C4602A]">{activeTour.title}</strong> on <strong className="text-[#1C1208]">{visitDate}</strong>. We will confirm your schedule via WhatsApp/phone shortly.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-gold"
                        style={{ borderRadius: "2px" }}
                      >
                        Book Another Visit
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <div
                        className="text-xs font-bold uppercase tracking-[0.16em] mb-2"
                        style={{ color: "#6B7A3F", fontFamily: "var(--font-source-sans), sans-serif" }}
                      >
                        STEP 2: GUEST DETAILS
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl font-bold text-[#1C1208]"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        Reserve Your Date
                      </h3>
                    </div>

                    {errorMsg && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-[2px]">
                        <i className="bi bi-exclamation-triangle-fill" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. David Ntimama"
                          className="w-full bg-white border border-[#D4C9B0] rounded-[2px] p-3 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                          >
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="david@example.com"
                            className="w-full bg-white border border-[#D4C9B0] rounded-[2px] p-3 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E]"
                          />
                        </div>

                        <div>
                          <label
                            className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                          >
                            Phone Number (WhatsApp) *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+254 700 000 000"
                            className="w-full bg-white border border-[#D4C9B0] rounded-[2px] p-3 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                          >
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            required
                            value={visitDate}
                            onChange={(e) => setVisitDate(e.target.value)}
                            className="w-full bg-white border border-[#D4C9B0] rounded-[2px] p-3 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E]"
                          />
                        </div>

                        <div>
                          <label
                            className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                          >
                            Group Size *
                          </label>
                          <input
                            type="number"
                            required
                            min={1}
                            max={50}
                            value={groupSize}
                            onChange={(e) => setGroupSize(Number(e.target.value))}
                            className="w-full bg-white border border-[#D4C9B0] rounded-[2px] p-3 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          Preferred Time Slot *
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setTimeSlot("morning")}
                            className={`py-3 px-4 font-bold text-xs uppercase tracking-[0.14em] transition-all cursor-pointer ${
                              timeSlot === "morning"
                                ? "bg-[#1C1208] text-[#F5F0E8] border border-[#1C1208]"
                                : "bg-white text-[#1C1208] border border-[#D4C9B0]"
                            }`}
                            style={{ borderRadius: "2px", fontFamily: "var(--font-source-sans), sans-serif" }}
                          >
                            Morning (9:30 AM)
                          </button>
                          <button
                            type="button"
                            onClick={() => setTimeSlot("afternoon")}
                            className={`py-3 px-4 font-bold text-xs uppercase tracking-[0.14em] transition-all cursor-pointer ${
                              timeSlot === "afternoon"
                                ? "bg-[#1C1208] text-[#F5F0E8] border border-[#1C1208]"
                                : "bg-white text-[#1C1208] border border-[#D4C9B0]"
                            }`}
                            style={{ borderRadius: "2px", fontFamily: "var(--font-source-sans), sans-serif" }}
                          >
                            Afternoon (2:00 PM)
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          Special Requests / Dietary Notes
                        </label>
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Tell us about specific livestock interests, student delegations, or dietary requirements..."
                          className="w-full bg-white border border-[#D4C9B0] rounded-[2px] p-3 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E]"
                        />
                      </div>
                    </div>

                    {/* Estimated cost box */}
                    <div
                      className="p-5 bg-white border border-[#D4C9B0] flex items-center justify-between"
                      style={{ borderRadius: "2px" }}
                    >
                      <div>
                        <div
                          className="text-xs font-bold uppercase tracking-[0.14em]"
                          style={{ color: "#8E7E70", fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          ESTIMATED EXPERIENCE TOTAL
                        </div>
                        <div className="text-xs text-[#8E7E70] mt-0.5">
                          {groupSize} {groupSize === 1 ? "guest" : "guests"} &times; KES {activeTour.pricePerPerson.toLocaleString()}
                        </div>
                      </div>
                      <div
                        className="text-2xl font-bold"
                        style={{ color: "#C4602A", fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        KES {estimatedCost.toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-gold py-4 text-xs tracking-[0.16em] uppercase font-bold justify-center cursor-pointer"
                      style={{ borderRadius: "2px" }}
                    >
                      {loading ? (
                        <span>Processing Reservation...</span>
                      ) : (
                        <span>CONFIRM RANCH RESERVATION</span>
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
  );
}

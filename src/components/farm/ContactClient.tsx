"use client";

import { useState } from "react";
import Image from "next/image";
import { LOGO } from "@/lib/images";

const CONTACT_ITEMS = [
  { icon: "bi-geo-alt", label: "Location", value: "Kajiado County, Kenya", sub: "Off Magadi Road, 90 min from Nairobi CBD" },
  { icon: "bi-envelope", label: "Email", value: "info@osotuafarming.co.ke", href: "mailto:info@osotuafarming.co.ke" },
  { icon: "bi-telephone", label: "Official Phone", value: "+254 755 758 208", href: "tel:+254755758208" },
  { icon: "bi-clock", label: "Office Hours", value: "Mon–Sat, 8:00 AM – 5:00 PM EAT", sub: "Closed Sundays & Public Holidays" },
];

const SUBJECT_OPTIONS = [
  "Pedigree livestock purchase enquiry",
  "The Barn Store / kitchen order",
  "Farm visit / group tour booking",
  "Impact investment / partnership",
  "Media, press & research",
  "Other inquiry",
];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const formData = new FormData(e.currentTarget);
      const body = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone") || undefined,
        subject: formData.get("subject"),
        message: formData.get("message"),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMessage("Failed to submit contact enquiry. Please check fields.");
      }
    } catch {
      setErrorMessage("Error submitting message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#F5F0E8", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        <div className="os-container relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C99A2E]/50 shrink-0 bg-white"
            >
              <Image src={LOGO} alt="Osotua Official Seal" fill sizes="36px" className="object-cover" />
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: "#6B7A3F", borderRadius: "2px" }}
            >
              <i className="bi bi-chat-dots text-xs" />
              <span>GET IN TOUCH · KAJIADO RANCH OFFICE</span>
            </div>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-6"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
          >
            Let&apos;s talk <br />
            <span style={{ color: "#C99A2E" }}>Farming &amp; Herds</span>
          </h1>

          <p
            className="text-base sm:text-xl text-[#8E7E70] max-w-2xl leading-relaxed font-normal"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
          >
            Whether you are acquiring certified Boran genetics, sourcing kitchen provisions, or planning an educational rangeland tour — our ranch desk is here for you.
          </p>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="py-16 md:py-24 bg-[#F5F0E8]">
        <div className="os-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Contact Info & Ranch Photo */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-[0.16em] mb-2"
                  style={{ color: "#C4602A", fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  DIRECT COMMUNICATION
                </div>
                <h2
                  className="text-3xl sm:text-4xl text-[#1C1208] leading-tight m-0"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 700 }}
                >
                  Reach Our <span style={{ color: "#C99A2E" }}>Ranch Desk</span>
                </h2>
              </div>

              {/* Ranch Photo Card */}
              <div
                className="relative aspect-[16/10] overflow-hidden border border-[#D4C9B0] shadow-md group"
                style={{ borderRadius: "2px" }}
              >
                <Image
                  src="/images/WhatsApp Image 2026-08-10 at 11.55.22.jpeg"
                  alt="Osotua ranch entrance and pasture"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-[0.14em]">
                  Osotua Ranch Estate · Kajiado
                </div>
              </div>

              <div className="space-y-3">
                {CONTACT_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="p-5 flex items-start gap-4 bg-[#FAF7F2] border border-[#D4C9B0]"
                    style={{ borderRadius: "2px" }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0 text-white"
                      style={{ backgroundColor: "#1C1208", borderRadius: "2px" }}
                    >
                      <i className={`bi ${item.icon}`} />
                    </div>
                    <div>
                      <div
                        className="text-[10px] uppercase tracking-[0.16em] font-bold"
                        style={{ color: "#8E7E70", fontFamily: "var(--font-source-sans), sans-serif" }}
                      >
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-bold text-[#1C1208] hover:text-[#C99A2E] transition-colors"
                          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div
                          className="text-sm font-bold text-[#1C1208]"
                          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          {item.value}
                        </div>
                      )}
                      {item.sub && (
                        <div className="text-xs text-[#8E7E70] mt-0.5 leading-relaxed">
                          {item.sub}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Official Social Channels */}
              <div
                className="p-6 bg-[#FAF7F2] border border-[#D4C9B0]"
                style={{ borderRadius: "2px" }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.16em] font-bold mb-2"
                  style={{ color: "#C4602A", fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  OFFICIAL CHANNELS &amp; MEDIA
                </div>
                <h4
                  className="text-xl font-bold text-[#1C1208] mb-4"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Follow Our Ranches Daily
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://www.instagram.com/osotua_ranches_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white border border-[#D4C9B0] hover:border-[#C99A2E] transition-all no-underline"
                    style={{ borderRadius: "2px" }}
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center text-white"
                      style={{ backgroundColor: "#C4602A", borderRadius: "2px" }}
                    >
                      <i className="bi bi-instagram" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#8E7E70]">Instagram</div>
                      <div className="text-xs font-bold text-[#1C1208]">@osotua_ranches_</div>
                    </div>
                  </a>

                  <a
                    href="https://www.tiktok.com/@osotua.ranches"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white border border-[#D4C9B0] hover:border-[#C99A2E] transition-all no-underline"
                    style={{ borderRadius: "2px" }}
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center text-white"
                      style={{ backgroundColor: "#1C1208", borderRadius: "2px" }}
                    >
                      <i className="bi bi-tiktok" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#8E7E70]">TikTok</div>
                      <div className="text-xs font-bold text-[#1C1208]">@osotua.ranches</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div
                className="p-8 sm:p-12 bg-[#FAF7F2] border border-[#D4C9B0] shadow-xl"
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
                      Message Dispatched
                    </h3>
                    <p
                      className="text-sm text-[#8E7E70] max-w-md mx-auto leading-relaxed"
                      style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                    >
                      Thank you for contacting Osotua Farming. Our ranch office will review your inquiry and respond within 24 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-gold"
                        style={{ borderRadius: "2px" }}
                      >
                        Send Another Message
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
                        SEND AN INQUIRY
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl font-bold text-[#1C1208]"
                        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                      >
                        Contact Our Ranch Concierge
                      </h3>
                    </div>

                    {errorMessage && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-[2px]">
                        <i className="bi bi-exclamation-triangle-fill" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Moses Ole Sironka"
                          className="w-full bg-white border border-[#D4C9B0] rounded-[2px] p-3 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E]"
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="moses@example.com"
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
                          Phone Number (WhatsApp)
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+254 700 000 000"
                          className="w-full bg-white border border-[#D4C9B0] rounded-[2px] p-3 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E]"
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                        >
                          Inquiry Subject *
                        </label>
                        <select
                          name="subject"
                          required
                          className="w-full bg-white border border-[#D4C9B0] rounded-[2px] p-3 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E]"
                        >
                          {SUBJECT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8E7E70] mb-2"
                        style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                      >
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us about the livestock breeds you're interested in, order specifications, or schedule requirements..."
                        className="w-full bg-white border border-[#D4C9B0] rounded-[2px] p-3 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-gold py-4 text-xs tracking-[0.16em] uppercase font-bold justify-center cursor-pointer"
                      style={{ borderRadius: "2px" }}
                    >
                      {loading ? (
                        <span>Transmitting Message...</span>
                      ) : (
                        <span>SEND RANCH INQUIRY</span>
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

"use client"

import { useState } from "react"
import Image from "next/image"
import { LOGO } from "@/lib/images"

const CONTACT_ITEMS = [
  { icon: "ti-map-pin", label: "Location", value: "Kajiado County, Kenya", sub: "Off Namanga Highway, 2 km from Kajiado Town" },
  { icon: "ti-mail", label: "Email", value: "info@osotuafarming.co.ke", href: "mailto:info@osotuafarming.co.ke" },
  { icon: "ti-phone", label: "Phone", value: "+254 755 758 208", href: "tel:+254755758208" },
  { icon: "ti-clock", label: "Hours", value: "Mon–Sat, 8:00 AM – 5:00 PM EAT", sub: "Closed Sundays & Public Holidays" },
]

const SUBJECT_OPTIONS = [
  "Pedigree livestock purchase enquiry",
  "The Barn Store / kitchen order",
  "Farm visit / group tour booking",
  "Impact investment / partnership",
  "Media, press & research",
  "Other inquiry",
]

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("")
    try {
      const formData = new FormData(e.currentTarget)
      const body = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone") || undefined,
        subject: formData.get("subject"),
        message: formData.get("message"),
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setErrorMessage("Failed to submit contact enquiry. Please check fields.")
      }
    } catch {
      setErrorMessage("Error submitting message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: "#FBF7F0", color: "#1C1208", width: "100%", overflowX: "hidden" }}>

      {/* ── HERO BANNER ── */}
      <section className="bg-mesh-earth noise relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-amber-500/10 text-[#8E5E16] border border-amber-500/25 shadow-md">
            <div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-amber-400 shrink-0 bg-white">
              <Image src={LOGO} alt="Osotua Seal" fill sizes="20px" className="object-cover" />
            </div>
            <span>GET IN TOUCH &bull; KAJIADO RANCH OFFICE</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1C1208] leading-[1.04] tracking-tight max-w-5xl mb-8"
            style={{
              fontFamily: "var(--font-fraunces, 'Fraunces'), var(--font-cormorant), Georgia, serif",
            }}
          >
            Let&apos;s talk <br />
            <em className="font-normal italic text-gradient-gold">farming</em>
          </h1>

          <p className="text-base sm:text-xl text-[#5C4835] max-w-2xl leading-relaxed font-normal">
            Whether you&apos;re looking to purchase purebred livestock, source fresh produce, explore investment opportunities, or schedule a ranch visit — our team is at your service.
          </p>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="bg-mesh-green noise py-24 sm:py-36">
        <div className="os-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Contact Info & Ranch Photo */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20">
                  <span>DIRECT COMMUNICATION</span>
                </div>
                <h2
                  className="text-3xl sm:text-5xl font-normal text-[#1C1208] leading-tight m-0"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  Reach Our <span className="text-gradient-gold font-semibold">Ranch Desk</span>
                </h2>
              </div>

              {/* Ranch Gate Photo Card */}
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-amber-900/15">
                <Image
                  src="/images/WhatsApp Image 2026-08-10 at 11.55.22.jpeg"
                  alt="Osotua ranch entrance and pasture"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white font-mono text-xs font-bold uppercase tracking-wider">
                  Osotua Ranch Estate &bull; Kajiado
                </div>
              </div>

              <div className="space-y-4">
                {CONTACT_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="card-luxury p-5 flex items-start gap-4 bg-white"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-[#C4882A] flex items-center justify-center shrink-0 text-xl">
                      <i className={`ti ${item.icon}`} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-bold text-[#1C1208] hover:text-[#C4882A] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm font-bold text-[#1C1208]">{item.value}</div>
                      )}
                      {item.sub && <div className="text-xs text-[#5C4835] mt-0.5 leading-relaxed">{item.sub}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Official Social Channels */}
              <div className="card-luxury p-6 bg-gradient-to-br from-[#FAF5EE] to-[#F3EADB] border border-[#C4882A]/30">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold mb-2">
                  OFFICIAL CHANNELS &amp; MEDIA
                </div>
                <h4
                  className="text-xl font-light text-[#1C1208] mb-4"
                  style={{ fontFamily: "var(--font-fraunces), serif" }}
                >
                  Follow Our Ranches Daily
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://www.instagram.com/osotua_ranches_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 hover:bg-white border border-[#C4882A]/25 transition-all shadow-sm group no-underline"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C4882A]/10 flex items-center justify-center text-[#C4882A] text-lg group-hover:bg-[#C4882A] group-hover:text-white transition-colors">
                      <i className="bi bi-instagram" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#8E5E16] font-bold uppercase">Instagram</div>
                      <div className="text-xs font-bold text-[#1C1208] group-hover:text-[#C4882A]">@osotua_ranches_</div>
                    </div>
                  </a>

                  <a
                    href="https://www.tiktok.com/@osotua.ranches"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 hover:bg-white border border-[#C4882A]/25 transition-all shadow-sm group no-underline"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C4882A]/10 flex items-center justify-center text-[#C4882A] text-lg group-hover:bg-[#C4882A] group-hover:text-white transition-colors">
                      <i className="bi bi-tiktok" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#8E5E16] font-bold uppercase">TikTok</div>
                      <div className="text-xs font-bold text-[#1C1208] group-hover:text-[#C4882A]">@osotua.ranches</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="card-luxury p-8 sm:p-12 shadow-2xl bg-white">
                {submitted ? (
                  <div className="text-center py-12 space-y-5">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-[#2E6B34] flex items-center justify-center mx-auto text-4xl border border-emerald-500/30 shadow-lg">
                      <i className="ti ti-circle-check" />
                    </div>
                    <h3
                      className="text-3xl font-light text-[#1C1208]"
                      style={{ fontFamily: "var(--font-fraunces), serif" }}
                    >
                      Message Dispatched
                    </h3>
                    <p className="text-sm text-[#5C4835] max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Osotua Farming. Our ranch office will review your inquiry and respond within 24 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-primary py-3 px-8 text-xs tracking-wider"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E5E16] bg-amber-500/10 border border-amber-500/20 mb-2">
                        <span>SEND AN INQUIRY</span>
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl font-light text-[#1C1208]"
                        style={{ fontFamily: "var(--font-fraunces), serif" }}
                      >
                        Contact Our Ranch Concierge
                      </h3>
                    </div>

                    {errorMessage && (
                      <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <i className="ti ti-alert-triangle text-base" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Moses Ole Sironka"
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="moses@example.co.ke"
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+254 700 000 000"
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          required
                          className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                        >
                          {SUBJECT_OPTIONS.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us about your requirements, livestock inquiries, or delivery questions..."
                        className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl p-3.5 text-sm text-[#1C1208] outline-none focus:border-[#C4882A]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary py-4 text-xs tracking-widest justify-center shadow-xl"
                    >
                      {loading ? (
                        <>
                          <i className="ti ti-loader animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <i className="ti ti-send" />
                          <span>SEND MESSAGE TO OSOTUA</span>
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

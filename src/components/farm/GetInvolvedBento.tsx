"use client";

import Link from "next/link";
import { useState } from "react";

export default function GetInvolvedBento() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    partySize: "2",
  });

  const handleVisitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: `${formData.fullName.toLowerCase().replace(/\s+/g, ".")}@guest.osotuafarming.co.ke`,
          phone: formData.phone,
          visitDate: formData.date || new Date().toISOString().split("T")[0],
          partySize: parseInt(formData.partySize, 10),
          notes: "Booked via homepage Get Involved section",
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      icon: "bi-graph-up-arrow",
      iconColor: "#C4882A",
      iconBg: "rgba(196,136,42,0.1)",
      iconBorder: "rgba(196,136,42,0.2)",
      eyebrow: "Growth",
      title: "Impact Capital & Land Trust",
      body: "Support high-yield sustainable livestock breeding, carbon offset projects, and water retention infrastructure.",
      cta: "Investor Dossier",
      href: "/invest",
    },
    {
      icon: "bi-people",
      iconColor: "#3D6B3E",
      iconBg: "rgba(61,107,62,0.1)",
      iconBorder: "rgba(61,107,62,0.2)",
      eyebrow: "Cooperative",
      title: "Partner Farmer Network",
      body: "Are you a smallholder livestock or vegetable grower in Kajiado? Access direct fair-trade markets with zero broker fees.",
      cta: "Join As Farmer",
      href: "/partners",
    },
    {
      icon: "bi-mortarboard",
      iconColor: "#C4882A",
      iconBg: "rgba(196,136,42,0.1)",
      iconBorder: "rgba(196,136,42,0.2)",
      eyebrow: "Education",
      title: "Ranch Internships & Research",
      body: "Hands-on field placements for agricultural students, veterinary interns, and pastoral ecologists.",
      cta: "Apply For Intake",
      href: "/careers",
    },
    {
      icon: "bi-building",
      iconColor: "#3D6B3E",
      iconBg: "rgba(61,107,62,0.1)",
      iconBorder: "rgba(61,107,62,0.2)",
      eyebrow: "Commercial",
      title: "Hospitality & Chef Supply",
      body: "Wholesale provisioning of dry-aged beef, artisanal dairy, and organic herbs for top restaurants and safari lodges.",
      cta: "Inquire For Wholesale",
      href: "/contact",
    },
  ];

  return (
    <section className="section-dark" style={{ background: "#1C1208" }}>
      <div className="os-container">

        {/* Header */}
        <div className="max-w-2xl mb-12" data-reveal data-delay="1">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              background: "rgba(196, 136, 42, 0.12)",
              border: "1px solid rgba(196, 136, 42, 0.28)",
              color: "#D99A30",
            }}
          >
            <span className="live-dot" />
            Get Involved
          </div>
          <h2
            className="m-0"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.018em",
              color: "#FBF7F0",
            }}
          >
            Join the Pastoral{" "}
            <em style={{ fontStyle: "italic", color: "#C4882A" }}>
              Ecosystem
            </em>
          </h2>
        </div>

        {/* Top Row — Careers (full) + 4 cards */}
        <div
          className="grid gap-5 mb-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
          data-reveal
          data-delay="2"
        >
          {/* Careers card — spans wider */}
          <div
            className="os-card-dark rounded-[20px] p-8 flex flex-col justify-between"
            style={{
              gridColumn: "span 1",
              border: "1px solid rgba(196,136,42,0.15)",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(196,136,42,0.1)",
                    border: "1px solid rgba(196,136,42,0.25)",
                    color: "#D99A30",
                    fontSize: "1.4rem",
                  }}
                >
                  <i className="bi bi-briefcase" aria-hidden="true" />
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    background: "rgba(196,136,42,0.12)",
                    border: "1px solid rgba(196,136,42,0.25)",
                    color: "#D99A30",
                  }}
                >
                  3 Open Roles
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                  fontWeight: 300,
                  color: "#FBF7F0",
                  margin: "0 0 0.5rem 0",
                  lineHeight: 1.2,
                }}
              >
                Careers at Osotua
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.65,
                  color: "rgba(251,247,240,0.6)",
                  margin: "0 0 1.5rem 0",
                }}
              >
                Pioneers in regenerative pasture management, veterinary science,
                and cold-chain logistics.
              </p>

              {/* Role list */}
              <div className="space-y-2.5">
                {[
                  { title: "Rangeland Veterinarian", loc: "Kajiado · Full-Time" },
                  { title: "Pasture Operations Manager", loc: "Ranch Site" },
                  { title: "Agronomy Fellow (Graduate)", loc: "Research Hub" },
                ].map((r) => (
                  <div
                    key={r.title}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "#FBF7F0",
                        }}
                      >
                        {r.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "#D99A30",
                          marginTop: "2px",
                        }}
                      >
                        {r.loc}
                      </div>
                    </div>
                    <i className="bi bi-arrow-right text-xs" style={{ color: "rgba(255,255,255,0.35)" }} />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="pt-5 mt-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 no-underline transition-transform hover:translate-x-1"
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#D99A30",
                }}
              >
                <span>View Job Portal</span>
                <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>

          {/* Other involvement cards */}
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="os-card-dark rounded-[20px] p-8 flex flex-col justify-between group no-underline"
              style={{ border: "1px solid rgba(196,136,42,0.12)" }}
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: c.iconBg,
                    border: `1px solid ${c.iconBorder}`,
                    color: c.iconColor,
                    fontSize: "1.35rem",
                  }}
                >
                  <i className={`bi ${c.icon}`} aria-hidden="true" />
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: c.iconColor,
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {c.eyebrow}
                </p>

                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.3rem, 2vw, 1.75rem)",
                    fontWeight: 300,
                    color: "#FBF7F0",
                    lineHeight: 1.2,
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.85rem",
                    lineHeight: 1.65,
                    color: "rgba(251,247,240,0.55)",
                    margin: 0,
                  }}
                >
                  {c.body}
                </p>
              </div>

              <div
                className="flex items-center gap-2 transition-transform group-hover:translate-x-1 mt-6 pt-5"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: c.iconColor,
                }}
              >
                <span>{c.cta}</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        {/* Farm Visit — full-width dark card with inline form */}
        <div
          className="rounded-[20px] p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16"
          style={{
            background: "#2E1C08",
            border: "1px solid rgba(196,136,42,0.25)",
          }}
          data-reveal
          data-delay="3"
        >
          <div className="flex-1 space-y-4">
            <div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full"
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                background: "rgba(196,136,42,0.12)",
                border: "1px solid rgba(196,136,42,0.25)",
                color: "#D99A30",
              }}
            >
              <i className="bi bi-geo-alt-fill" />
              Ranch Agritourism &bull; Kajiado County
            </div>

            <h3
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                color: "#FBF7F0",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Book a Pasture Tour &amp; Bush Breakfast
            </h3>

            <p
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "0.92rem",
                lineHeight: 1.75,
                color: "rgba(251,247,240,0.6)",
                margin: 0,
                maxWidth: "520px",
              }}
            >
              Walk among champion Boran bulls, inspect purebred breeding stock,
              learn rotational grazing principles, and enjoy an authentic pastoral
              morning in the Maasai heartland.
            </p>
          </div>

          {/* Inline Booking Form */}
          <div
            className="w-full lg:w-96 rounded-2xl p-6 shrink-0"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl"
                  style={{
                    background: "rgba(61,107,62,0.15)",
                    border: "1px solid rgba(61,107,62,0.4)",
                    color: "#4E8A4F",
                  }}
                >
                  <i className="bi bi-check-lg" />
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.3rem",
                    fontWeight: 400,
                    color: "#FBF7F0",
                    margin: 0,
                  }}
                >
                  Visit Requested!
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(251,247,240,0.6)",
                    margin: 0,
                  }}
                >
                  Our concierge will reach out to confirm your itinerary.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVisitSubmit} className="space-y-3">
                <p
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#D99A30",
                    marginBottom: "0.5rem",
                  }}
                >
                  Quick Booking
                </p>

                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="os-input os-input-dark w-full rounded-xl text-sm"
                  style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="Phone (07...)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="os-input os-input-dark rounded-xl text-sm"
                    style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
                  />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="os-input os-input-dark rounded-xl text-sm"
                    style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center"
                  style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
                >
                  <span>{loading ? "Confirming..." : "Reserve Date"}</span>
                  <i className="bi bi-calendar-check" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

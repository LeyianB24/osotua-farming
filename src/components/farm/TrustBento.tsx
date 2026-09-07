"use client";

import Link from "next/link";

export default function TrustBento() {
  const pillars = [
    {
      icon: "bi-heart-pulse",
      iconColor: "#C4882A",
      iconBg: "rgba(196,136,42,0.1)",
      iconBorder: "rgba(196,136,42,0.2)",
      title: "Animal Dignity & Health",
      body: "Our herds range freely across vast natural paddocks with uninhibited social structures, clean bore-hole water, and veterinary supervision that favors natural pasture minerals over preventative antibiotics.",
      link: "/breeds",
      cta: "Explore Herd Standards",
    },
    {
      icon: "bi-tree",
      iconColor: "#3D6B3E",
      iconBg: "rgba(61,107,62,0.1)",
      iconBorder: "rgba(61,107,62,0.2)",
      title: "Regenerative Land Health",
      body: "Pasture resting cycles, indigenous shade tree conservation, and native grass reseeding restore degraded savanna topsoils and create biodiversity corridors for local wildlife in Kajiado.",
      link: "/about",
      cta: "Our Land Practices",
    },
    {
      icon: "bi-award",
      iconColor: "#C4882A",
      iconBg: "rgba(196,136,42,0.1)",
      iconBorder: "rgba(196,136,42,0.2)",
      title: "Uncompromising Food Quality",
      body: "From zero hormone grass-fed beef to unpasteurized raw honey and same-day dawn harvests, every provision undergoes stringent quality control before arriving in your kitchen.",
      link: "/barn",
      cta: "Inspect Provisions",
    },
  ];

  return (
    <section className="section-mist" style={{ background: "#F0E8DA" }}>
      <div className="os-container">

        {/* Section Header */}
        <div className="max-w-2xl mb-12" data-reveal data-delay="1">
          <div className="eyebrow-pill mb-4">Our Principles</div>
          <h2
            className="m-0"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.018em",
              color: "#1C1208",
            }}
          >
            The Three Pillars of{" "}
            <em style={{ fontStyle: "italic", color: "#C4882A" }}>
              Pastoral Integrity
            </em>
          </h2>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          data-reveal
          data-delay="2"
        >
          {pillars.map((p) => (
            <Link
              key={p.title}
              href={p.link}
              className="os-card p-8 md:p-10 flex flex-col justify-between group no-underline"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: p.iconBg,
                  border: `1px solid ${p.iconBorder}`,
                  color: p.iconColor,
                  fontSize: "1.6rem",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <i className={`bi ${p.icon}`} aria-hidden="true" />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                  fontWeight: 400,
                  color: "#1C1208",
                  lineHeight: 1.15,
                  margin: "0 0 0.75rem 0",
                }}
              >
                {p.title}
              </h3>

              {/* Body */}
              <p
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  color: "rgba(28,18,8,0.6)",
                  margin: "0 0 2rem 0",
                  flex: 1,
                }}
              >
                {p.body}
              </p>

              {/* CTA */}
              <div
                className="flex items-center gap-2 transition-transform group-hover:translate-x-1"
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#C4882A",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid rgba(28,18,8,0.08)",
                }}
              >
                <span>{p.cta}</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

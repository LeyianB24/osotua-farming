"use client"

import Link from "next/link"
import Logo from "./Logo"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: "#0e0904", position: "relative", overflow: "hidden" }}>
      {/* Ambient glows */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-80px", left: "10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,136,42,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-60px", right: "10%",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(61,107,62,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Gradient top border */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(196,136,42,0.3) 30%, rgba(196,136,42,0.5) 50%, rgba(196,136,42,0.3) 70%, transparent 100%)",
      }} />

      {/* Main grid */}
      <div className="os-container" style={{ padding: "5rem 1.5rem 4rem" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Col 1 — Brand */}
          <div
            className="glass-dark"
            style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <Logo size="sm" />
            <p style={{ color: "rgba(245,239,228,0.5)", fontSize: "0.85rem", lineHeight: 1.8 }}>
              A modern smart farm raising premium indigenous livestock and growing wholesome produce
              from Kajiado County, Kenya.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {[
                { icon: "bi-instagram",  href: "https://instagram.com",  label: "Instagram" },
                { icon: "bi-facebook",   href: "https://facebook.com",   label: "Facebook" },
                { icon: "bi-tiktok",     href: "https://tiktok.com",     label: "TikTok" },
                { icon: "bi-youtube",    href: "https://youtube.com",    label: "YouTube" },
                { icon: "bi-twitter-x", href: "https://twitter.com",    label: "Twitter / X" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid rgba(196,136,42,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(245,239,228,0.45)",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                    fontSize: "0.9rem",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = "#C4882A"
                    el.style.color = "#C4882A"
                    el.style.background = "rgba(196,136,42,0.1)"
                    el.style.boxShadow = "0 0 20px rgba(196,136,42,0.25)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = "rgba(196,136,42,0.2)"
                    el.style.color = "rgba(245,239,228,0.45)"
                    el.style.background = ""
                    el.style.boxShadow = ""
                  }}
                >
                  <i className={`bi ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="glass-dark" style={{ padding: "1.75rem" }}>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C4882A",
                marginBottom: "1.25rem",
              }}
            >
              Quick Links
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Our Breeds",      href: "/breeds"   },
                { label: "The Barn Store",  href: "/barn"     },
                { label: "Invest With Us",  href: "/invest"   },
                { label: "Partner Farmers", href: "/partners" },
                { label: "Visit the Ranch", href: "/visit"    },
                { label: "Our Blog",        href: "/blog"     },
                { label: "About Us",        href: "/about"    },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "rgba(245,239,228,0.5)",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: 1.6,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C4882A" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,239,228,0.5)" }}
                >
                  <i className="bi bi-arrow-right" style={{ fontSize: "0.65rem", color: "rgba(196,136,42,0.5)" }} />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Livestock */}
          <div className="glass-dark" style={{ padding: "1.75rem" }}>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C4882A",
                marginBottom: "1.25rem",
              }}
            >
              Livestock Catalogue
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Boran Beef Cattle",     icon: "bi-bullseye"  },
                { label: "Bonsmara Bulls",         icon: "bi-bullseye"  },
                { label: "Sahiwal Dairy Cows",     icon: "bi-droplet-fill" },
                { label: "Boer Goats",             icon: "bi-scissors"  },
                { label: "Galla × Boer Crosses",   icon: "bi-scissors"  },
                { label: "Dorper Sheep",           icon: "bi-flower1"   },
                { label: "Red Maasai × Dorper",    icon: "bi-flower1"   },
              ].map((l) => (
                <Link
                  key={l.label}
                  href="/breeds"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "rgba(245,239,228,0.5)",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: 1.6,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C4882A" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,239,228,0.5)" }}
                >
                  <i className={`bi ${l.icon}`} style={{ fontSize: "0.7rem", color: "rgba(196,136,42,0.5)" }} />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div className="glass-dark" style={{ padding: "1.75rem" }}>
            <div
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.58rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C4882A",
                marginBottom: "1.25rem",
              }}
            >
              Contact Us
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "bi-geo-alt-fill",   value: "Kajiado County, Kenya",         href: undefined },
                { icon: "bi-telephone-fill", value: "+254 700 000 000",               href: "tel:+254700000000" },
                { icon: "bi-envelope-fill",  value: "info@osotuafarming.co.ke",       href: "mailto:info@osotuafarming.co.ke" },
                { icon: "bi-whatsapp",       value: "WhatsApp Us",                    href: "https://wa.me/254700000000" },
                { icon: "bi-clock-fill",     value: "Mon – Sat: 8:00am – 5:00pm",    href: undefined },
              ].map((c) => (
                <div key={c.icon} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: "34px",
                    height: "34px",
                    flexShrink: 0,
                    border: "1px solid rgba(196,136,42,0.2)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <i className={`bi ${c.icon}`} style={{ fontSize: "0.85rem", color: "#C4882A" }} />
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        color: "rgba(245,239,228,0.55)",
                        fontSize: "0.88rem",
                        textDecoration: "none",
                        lineHeight: 1.6,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C4882A" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,239,228,0.55)" }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                      {c.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(196,136,42,0.08)",
        background: "rgba(0,0,0,0.2)",
      }}>
        <div
          className="os-container"
          style={{
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <p style={{ color: "rgba(245,239,228,0.3)", fontSize: "0.78rem" }}>
            &copy; {year} Osotua Farming Ltd. All rights reserved.
          </p>
          <p style={{ color: "rgba(245,239,228,0.2)", fontSize: "0.72rem" }}>
            Designed &amp; built by{" "}
            <a
              href="https://bezaleltech.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(196,136,42,0.55)", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C4882A" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(196,136,42,0.55)" }}
            >
              Bezalel Technologies LTD
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

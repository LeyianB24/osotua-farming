"use client"

import Link from "next/link"
import Logo from "./Logo"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #FAF5EB 0%, #F5EFE4 50%, #EDE5D8 100%)",
        borderTop: "1px solid rgba(196, 136, 42, 0.25)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glows */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-80px", left: "10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,136,42,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-60px", right: "10%",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(61,107,62,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Main grid */}
      <div className="os-container" style={{ padding: "5rem 1.5rem 4rem" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Col 1 — Brand */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(196, 136, 42, 0.22)",
              borderRadius: "20px",
              boxShadow: "0 8px 30px rgba(196, 136, 42, 0.06)",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <Logo size="sm" textColor="dark" />
            <p style={{ color: "#5C4835", fontSize: "0.85rem", lineHeight: 1.8 }}>
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
                    background: "rgba(196,136,42,0.08)",
                    border: "1px solid rgba(196,136,42,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#8E5E16",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                    fontSize: "0.9rem",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = "#C4882A"
                    el.style.color = "#FFFFFF"
                    el.style.background = "#C4882A"
                    el.style.boxShadow = "0 4px 12px rgba(196,136,42,0.3)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = "rgba(196,136,42,0.25)"
                    el.style.color = "#8E5E16"
                    el.style.background = "rgba(196,136,42,0.08)"
                    el.style.boxShadow = ""
                  }}
                >
                  <i className={`bi ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(196, 136, 42, 0.22)",
              borderRadius: "20px",
              boxShadow: "0 8px 30px rgba(196, 136, 42, 0.06)",
              padding: "1.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8E5E16",
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
                    color: "#5C4835",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: 1.6,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C4882A" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#5C4835" }}
                >
                  <i className="bi bi-arrow-right" style={{ fontSize: "0.65rem", color: "#C4882A" }} />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Livestock */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(196, 136, 42, 0.22)",
              borderRadius: "20px",
              boxShadow: "0 8px 30px rgba(196, 136, 42, 0.06)",
              padding: "1.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8E5E16",
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
                    color: "#5C4835",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    lineHeight: 1.6,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C4882A" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#5C4835" }}
                >
                  <i className={`bi ${l.icon}`} style={{ fontSize: "0.7rem", color: "#C4882A" }} />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(196, 136, 42, 0.22)",
              borderRadius: "20px",
              boxShadow: "0 8px 30px rgba(196, 136, 42, 0.06)",
              padding: "1.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8E5E16",
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
                    border: "1px solid rgba(196,136,42,0.25)",
                    background: "rgba(196,136,42,0.08)",
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
                        color: "#5C4835",
                        fontSize: "0.88rem",
                        textDecoration: "none",
                        lineHeight: 1.6,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C4882A" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#5C4835" }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span style={{ color: "#5C4835", fontSize: "0.88rem", lineHeight: 1.6 }}>
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
        borderTop: "1px solid rgba(196,136,42,0.15)",
        background: "rgba(237, 229, 216, 0.6)",
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
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <p style={{ color: "#786550", fontSize: "0.78rem" }}>
              &copy; {year} Osotua Farming Ltd (Reg. No. CPR/2023/10492). All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.65rem", borderRadius: "100px", background: "rgba(196,136,42,0.12)", border: "1px solid rgba(196,136,42,0.3)", color: "#8E5E16", fontSize: "0.68rem", fontWeight: 600 }}>
              <i className="bi bi-shield-lock-fill" />
              <span>Secured by M-Pesa &amp; Stripe • KDPA 2019 Compliant</span>
            </div>
          </div>
          <p style={{ color: "#786550", fontSize: "0.72rem" }}>
            Designed &amp; built by{" "}
            <a
              href="https://www.bezalel.website/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#8E5E16", fontWeight: 600, textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C4882A" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#8E5E16" }}
            >
              Bezalel Technologies LTD
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

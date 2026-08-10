import Link from "next/link"
import Logo from "./Logo"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: "#1C1208", borderTop: "1px solid rgba(196,136,42,0.12)" }}>
      {/* Main footer grid */}
      <div className="os-container" style={{ padding: "4rem 1.5rem 3rem" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div>
            <Logo size="sm" />
            <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.88rem", lineHeight: 1.8, marginTop: "1.25rem", maxWidth: "220px" }}>
              A modern smart farm raising premium indigenous livestock and growing wholesome produce
              from Kajiado County, Kenya.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              {[
                { icon: "bi-instagram", href: "https://instagram.com", label: "Instagram" },
                { icon: "bi-facebook",  href: "https://facebook.com",  label: "Facebook" },
                { icon: "bi-tiktok",    href: "https://tiktok.com",    label: "TikTok" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "36px", height: "36px",
                    border: "1px solid rgba(196,136,42,0.25)",
                    borderRadius: "2px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(245,239,228,0.55)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = "#C4882A"
                    el.style.color = "#C4882A"
                    el.style.background = "rgba(196,136,42,0.1)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = "rgba(196,136,42,0.25)"
                    el.style.color = "rgba(245,239,228,0.55)"
                    el.style.background = ""
                  }}
                >
                  <i className={`bi ${s.icon}`} style={{ fontSize: "0.95rem" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <div className="eyebrow-plain" style={{ color: "#C4882A", marginBottom: "1.25rem" }}>
              Quick Links
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                { label: "Our Breeds",     href: "/breeds"  },
                { label: "The Barn Store", href: "/barn"    },
                { label: "Invest",         href: "/invest"  },
                { label: "Partner With Us",href: "/partners"},
                { label: "Visit the Ranch",href: "/visit"   },
                { label: "Blog",           href: "/blog"    },
                { label: "About Us",       href: "/about"   },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    color: "rgba(245,239,228,0.55)",
                    fontSize: "0.86rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "flex", alignItems: "center", gap: "0.4rem",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C4882A" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,239,228,0.55)" }}
                >
                  <i className="bi bi-arrow-right" style={{ fontSize: "0.65rem", opacity: 0.5 }} />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Livestock */}
          <div>
            <div className="eyebrow-plain" style={{ color: "#C4882A", marginBottom: "1.25rem" }}>
              Livestock Catalogue
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                { label: "Boran Beef Cattle",    icon: "bi-bullseye"  },
                { label: "Bonsmara Bulls",        icon: "bi-bullseye"  },
                { label: "Sahiwal Dairy",         icon: "bi-droplet"   },
                { label: "Boer Goats",            icon: "bi-scissors"  },
                { label: "Galla × Boer Crosses",  icon: "bi-scissors"  },
                { label: "Dorper Sheep",          icon: "bi-flower1"   },
                { label: "Red Maasai × Dorper",   icon: "bi-flower1"   },
              ].map((l) => (
                <Link
                  key={l.label}
                  href="/breeds"
                  style={{
                    color: "rgba(245,239,228,0.55)",
                    fontSize: "0.86rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C4882A" }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,239,228,0.55)" }}
                >
                  <i className={`bi ${l.icon}`} style={{ fontSize: "0.7rem", color: "rgba(196,136,42,0.5)" }} />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <div className="eyebrow-plain" style={{ color: "#C4882A", marginBottom: "1.25rem" }}>
              Contact Us
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: "bi-geo-alt",  value: "Kajiado County, Kenya" },
                { icon: "bi-telephone",value: "+254 700 000 000",      href: "tel:+254700000000" },
                { icon: "bi-envelope", value: "info@osotuafarming.co.ke", href: "mailto:info@osotuafarming.co.ke" },
                { icon: "bi-clock",    value: "Mon – Sat: 8:00am – 5:00pm" },
              ].map((c) => (
                <div key={c.icon} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: "32px", height: "32px", flexShrink: 0,
                    border: "1px solid rgba(196,136,42,0.2)",
                    borderRadius: "2px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <i className={`bi ${c.icon}`} style={{ fontSize: "0.85rem", color: "#C4882A" }} />
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      style={{ color: "rgba(245,239,228,0.6)", fontSize: "0.86rem", lineHeight: 1.5, textDecoration: "none", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C4882A" }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,239,228,0.6)" }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span style={{ color: "rgba(245,239,228,0.6)", fontSize: "0.86rem", lineHeight: 1.5 }}>
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
      <div style={{ borderTop: "1px solid rgba(196,136,42,0.1)" }}>
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
          <p style={{ color: "rgba(245,239,228,0.35)", fontSize: "0.78rem" }}>
            &copy; {year} Osotua Farming Ltd. All rights reserved.
          </p>
          <p style={{ color: "rgba(245,239,228,0.25)", fontSize: "0.72rem" }}>
            Designed &amp; built by{" "}
            <a
              href="https://bezaleltech.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(196,136,42,0.55)", textDecoration: "none", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C4882A" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(196,136,42,0.55)" }}
            >
              Bezalel Technologies LTD
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

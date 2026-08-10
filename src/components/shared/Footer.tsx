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
            <div className="flex gap-3 mt-6">
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
                  className="w-9 h-9 border border-[#C4882A]/25 rounded flex items-center justify-center text-[#F5EFE4]/55 hover:border-[#C4882A] hover:text-[#C4882A] hover:bg-[#C4882A]/10 transition-all duration-200"
                >
                  <i className={`bi ${s.icon}`} style={{ fontSize: "0.95rem" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <div className="eyebrow-plain mb-5 text-[#C4882A]">
              Quick Links
            </div>
            <nav className="flex flex-col gap-2.5">
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
                  className="text-[#F5EFE4]/55 hover:text-[#C4882A] text-sm flex items-center gap-1.5 transition-colors duration-200"
                >
                  <i className="bi bi-arrow-right text-[0.65rem] opacity-50" />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Livestock */}
          <div>
            <div className="eyebrow-plain mb-5 text-[#C4882A]">
              Livestock Catalogue
            </div>
            <nav className="flex flex-col gap-2.5">
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
                  className="text-[#F5EFE4]/55 hover:text-[#C4882A] text-sm flex items-center gap-2 transition-colors duration-200"
                >
                  <i className={`bi ${l.icon} text-[0.7rem] text-[#C4882A]/50`} />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <div className="eyebrow-plain mb-5 text-[#C4882A]">
              Contact Us
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: "bi-geo-alt",  value: "Kajiado County, Kenya" },
                { icon: "bi-telephone",value: "+254 700 000 000",      href: "tel:+254700000000" },
                { icon: "bi-envelope", value: "info@osotuafarming.co.ke", href: "mailto:info@osotuafarming.co.ke" },
                { icon: "bi-clock",    value: "Mon – Sat: 8:00am – 5:00pm" },
              ].map((c) => (
                <div key={c.icon} className="flex gap-3 items-start">
                  <div className="w-8 h-8 flex-shrink-0 border border-[#C4882A]/20 rounded flex items-center justify-center">
                    <i className={`bi ${c.icon} text-[0.85rem] text-[#C4882A]`} />
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-[#F5EFE4]/60 hover:text-[#C4882A] text-sm leading-snug transition-colors duration-200"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-[#F5EFE4]/60 text-sm leading-snug">
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
              className="text-[#C4882A]/60 hover:text-[#C4882A] transition-colors duration-200"
            >
              Bezalel Technologies LTD
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

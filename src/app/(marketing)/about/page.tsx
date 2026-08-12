import Image from "next/image"
import Link from "next/link"
import { RANCH_WIDE, RANCH_GALLERY, LOGO } from "@/lib/images"

export const metadata = { title: "About — Osotua Farming" }

const VALUES = [
  { icon: "bi-tree-fill", title: "Indigenous Breeds, Modern Methods", desc: "We champion Africa's finest livestock genetics combined with smart farming technology." },
  { icon: "bi-geo-alt-fill", title: "Rooted in Kajiado", desc: "Our ranch has the ideal climate, rangelands, and pastoral heritage to raise East Africa's finest livestock." },
  { icon: "bi-qr-code-scan", title: "Full Traceability", desc: "Every animal and harvest carries a QR code linking back to its rangeland origin and health record." },
  { icon: "bi-people-fill", title: "Community-First Pastoralism", desc: "We partner with smallholder pastoralists, support agricultural internships, and invest in surrounding communities." },
]

export default function AboutPage() {
  return (
    <div style={{ background: "#FBF7F0" }}>

      {/* ── HERO BANNER ── */}
      <div
        className="bg-mesh-earth noise"
        style={{ paddingTop: "10rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}
      >
        {/* Full-bleed background photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={RANCH_WIDE}
            alt="The Osotua ranch landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.2, scale: "1.05" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,18,8,0.95) 0%, rgba(28,18,8,0.75) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1C1208 0%, transparent 60%)" }} />
        </div>

        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <Image
              src={LOGO}
              alt="Osotua Farming"
              width={56}
              height={56}
              priority
              className="rounded-full ring-1 ring-[#C4882A]/40"
            />
            <div className="eyebrow" style={{ color: "#C4882A" }}>
              Our Story &amp; Covenant
            </div>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(3.2rem, 7vw, 7rem)",
              fontWeight: 300,
              color: "#F5EFE4",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            A farm built on
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>trust and land</em>
          </h1>
          <p style={{ color: "rgba(245,239,228,0.65)", maxWidth: "540px", lineHeight: 1.8, fontSize: "1rem" }}>
            Osotua means a sacred bond of friendship in the Maa language — an enduring covenant between the rangelands, the pastoralist, and the community we serve.
          </p>
        </div>
      </div>

      {/* ── CORE PURPOSE ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left quote card */}
            <div
              className="glass-dark"
              style={{
                padding: "3rem",
                borderRadius: "24px",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(196,136,42,0.25)",
              }}
            >
              <div style={{ position: "absolute", top: "-4rem", right: "-4rem", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,136,42,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
                Our Motto
              </div>
              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#F5EFE4",
                  lineHeight: 1.25,
                  marginBottom: "2rem",
                  borderLeft: "3px solid #C4882A",
                  paddingLeft: "1.5rem",
                }}
              >
                &ldquo;From Our Land, To Your Table&rdquo;
              </blockquote>
              <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4882A" }}>
                Maa Pastoral Tradition · Kajiado, Kenya
              </div>
            </div>

            {/* Right details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="eyebrow" style={{ color: "#C4882A" }}>Our Core Mission</div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2.4rem, 4vw, 4rem)",
                  fontWeight: 300,
                  color: "#F5EFE4",
                  lineHeight: 1.1,
                }}
              >
                Redefining African agribusiness
              </h2>
              <p style={{ color: "rgba(245,239,228,0.6)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                Osotua Farming is a premier smart agribusiness enterprise based in Kajiado County, Kenya. We raise climate-resilient indigenous livestock, cultivate organic produce, and supply consumers and hospitality clients directly through our Barn Store.
              </p>
              <p style={{ color: "rgba(245,239,228,0.6)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                We champion Africa&apos;s finest livestock genetics combined with precision farming technology and regenerative land management — proving that pastoral tradition and modern innovation thrive together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section
        className="bg-mesh-earth noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "560px", marginBottom: "4rem" }}>
            <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
              Our Guiding Values
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 300,
                color: "#F5EFE4",
                lineHeight: 1.1,
              }}
            >
              What we stand for
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((item) => (
              <div
                key={item.title}
                className="glass-dark"
                style={{ padding: "2rem", display: "flex", gap: "1.25rem", borderRadius: "16px" }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(196,136,42,0.12)",
                    border: "1px solid rgba(196,136,42,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i className={`bi ${item.icon}`} style={{ fontSize: "1.3rem", color: "#C4882A" }} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                      fontSize: "1.5rem",
                      fontWeight: 400,
                      color: "#F5EFE4",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </div>
                  <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section
        className="bg-mesh-green noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "560px", marginBottom: "3.5rem" }}>
            <div className="eyebrow" style={{ color: "#C4882A", marginBottom: "1rem" }}>
              Ranch Life
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 300,
                color: "#F5EFE4",
                lineHeight: 1.1,
              }}
            >
              Life on the Osotua rangelands
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {RANCH_GALLERY.map((src, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Image
                  src={src}
                  alt={`Ranch life at Osotua ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION CTA ── */}
      <section
        className="bg-mesh-gold noise"
        style={{ padding: "7rem 0" }}
      >
        <div className="os-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="eyebrow justify-center" style={{ color: "#C4882A", marginBottom: "1.5rem" }}>
            Visit Our Ranch
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
              fontWeight: 300,
              color: "#F5EFE4",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
            }}
          >
            Kajiado County, Kenya
          </h2>
          <p style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto 3rem" }}>
            Located in the heart of East Africa&apos;s pastoral country — book a guided rangeland tour and experience Osotua firsthand.
          </p>

          <Link href="/visit" className="btn-primary">
            <i className="bi bi-geo-alt-fill" />
            Book a Farm Visit
          </Link>
        </div>
      </section>

    </div>
  )
}

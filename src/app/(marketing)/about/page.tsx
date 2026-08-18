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
        {/* Pastoral background overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src={RANCH_WIDE}
            alt="The Osotua ranch landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ opacity: 0.18, scale: "1.05" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(251,247,240,0.95) 0%, rgba(251,247,240,0.8) 60%, rgba(251,247,240,0.5) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #FBF7F0 0%, transparent 60%)" }} />
        </div>

        <div className="os-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <Image
              src={LOGO}
              alt="Osotua Farming"
              width={56}
              height={56}
              priority
              className="rounded-full ring-1 ring-[#C4882A]/40 shadow-sm"
            />
            <div className="eyebrow" style={{ color: "#8E5E16", fontWeight: 700 }}>
              Our Story &amp; Covenant
            </div>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(3.2rem, 7vw, 7rem)",
              fontWeight: 400,
              color: "#1C1208",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            A farm built on
            <br />
            <em style={{ color: "#C4882A", fontStyle: "italic" }}>trust and land</em>
          </h1>
          <p style={{ color: "#5C4835", maxWidth: "540px", lineHeight: 1.8, fontSize: "1.05rem" }}>
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
              style={{
                padding: "3rem",
                borderRadius: "24px",
                position: "relative",
                overflow: "hidden",
                background: "#FFFFFF",
                border: "1px solid rgba(196,136,42,0.25)",
                boxShadow: "0 12px 36px rgba(196,136,42,0.08)",
              }}
            >
              <div style={{ position: "absolute", top: "-4rem", right: "-4rem", width: "240px", height: "240px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,136,42,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "1.5rem", fontWeight: 700 }}>
                Our Motto
              </div>
              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#1C1208",
                  lineHeight: 1.25,
                  marginBottom: "2rem",
                  borderLeft: "3px solid #C4882A",
                  paddingLeft: "1.5rem",
                }}
              >
                &ldquo;From Our Land, To Your Table&rdquo;
              </blockquote>
              <div style={{ fontFamily: "var(--font-space-grotesk), monospace", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8E5E16" }}>
                Maa Pastoral Tradition · Kajiado, Kenya
              </div>
            </div>

            {/* Right details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="eyebrow" style={{ color: "#8E5E16", fontWeight: 700 }}>Our Core Mission</div>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2.4rem, 4vw, 4rem)",
                  fontWeight: 400,
                  color: "#1C1208",
                  lineHeight: 1.1,
                }}
              >
                Redefining African agribusiness
              </h2>
              <p style={{ color: "#5C4835", lineHeight: 1.8, fontSize: "1rem" }}>
                Osotua Farming is a premier smart agribusiness enterprise based in Kajiado County, Kenya. We raise climate-resilient indigenous livestock, cultivate organic produce, and supply consumers and hospitality clients directly through our Barn Store.
              </p>
              <p style={{ color: "#5C4835", lineHeight: 1.8, fontSize: "1rem" }}>
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
            <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "1rem", fontWeight: 700 }}>
              Our Guiding Values
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 400,
                color: "#1C1208",
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
                style={{
                  padding: "2rem",
                  display: "flex",
                  gap: "1.25rem",
                  borderRadius: "20px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(196, 136, 42, 0.22)",
                  boxShadow: "0 8px 24px rgba(196, 136, 42, 0.06)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "rgba(196,136,42,0.12)",
                    border: "1px solid rgba(196,136,42,0.25)",
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
                      fontWeight: 500,
                      color: "#1C1208",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </div>
                  <p style={{ color: "#5C4835", fontSize: "0.9rem", lineHeight: 1.7 }}>
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
            <div className="eyebrow" style={{ color: "#8E5E16", marginBottom: "1rem", fontWeight: 700 }}>
              Ranch Life
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 400,
                color: "#1C1208",
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
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(196, 136, 42, 0.25)",
                  boxShadow: "0 8px 24px rgba(196, 136, 42, 0.08)",
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
          <div className="eyebrow justify-center" style={{ color: "#8E5E16", marginBottom: "1.5rem", fontWeight: 700 }}>
            Visit Our Ranch
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
              fontWeight: 400,
              color: "#1C1208",
              lineHeight: 1.05,
              marginBottom: "1.25rem",
            }}
          >
            Kajiado County, Kenya
          </h2>
          <p style={{ color: "#5C4835", fontSize: "1rem", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto 3rem" }}>
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

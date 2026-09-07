"use client";

import Link from "next/link";
import { useCountUp } from "@/hooks/use-count-up";

export default function WhatWeAreBento() {
  const { count: animalCount, ref: animalRef } = useCountUp(150, 1600);

  const categories = [
    {
      icon: "bi-award",
      label: "Beef Cattle",
      breeds: ["Boran", "Bonsmara", "Sahiwal"],
      href: "/breeds?category=beef",
      accent: "#C4882A",
      accentBg: "rgba(196,136,42,0.08)",
      accentBorder: "rgba(196,136,42,0.2)",
    },
    {
      icon: "bi-droplet-fill",
      label: "Dairy Champions",
      breeds: ["Sahiwal A2", "Simmental", "Jersey"],
      href: "/breeds?category=dairy",
      accent: "#3D6B3E",
      accentBg: "rgba(61,107,62,0.08)",
      accentBorder: "rgba(61,107,62,0.2)",
    },
    {
      icon: "bi-heart-pulse",
      label: "Pedigree Goats",
      breeds: ["Boer Stud", "Galla Desert", "Kalahari"],
      href: "/breeds?category=goats",
      accent: "#C4882A",
      accentBg: "rgba(196,136,42,0.08)",
      accentBorder: "rgba(196,136,42,0.2)",
    },
    {
      icon: "bi-flower1",
      label: "Dorper & Red Maasai",
      breeds: ["Dorper Ram", "Red Maasai ewe", "Blackhead"],
      href: "/breeds?category=sheep",
      accent: "#3D6B3E",
      accentBg: "rgba(61,107,62,0.08)",
      accentBorder: "rgba(61,107,62,0.2)",
    },
  ];

  return (
    <section className="section-light" style={{ background: "#FBF7F0" }}>
      <div className="os-container">

        {/* Section Header */}
        <div className="max-w-2xl mb-12" data-reveal data-delay="1">
          <div className="eyebrow-pill mb-4">What We Are</div>
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
            A Living Covenant With{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "#C4882A",
                WebkitTextFillColor: "#C4882A",
              }}
            >
              Kenya&apos;s Ancient Land
            </em>
          </h2>
        </div>

        {/* Main Grid */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}
          data-reveal
          data-delay="2"
        >
          {/* Hero Text Card — spans 2 cols on larger screens */}
          <div
            className="os-card p-8 md:p-10 flex flex-col justify-between"
            style={{ gridColumn: "span 1" }}
          >
            <div className="space-y-4">
              <p
                className="m-0"
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#C4882A",
                }}
              >
                The Pastoral Synthesis
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                  color: "#1C1208",
                  margin: 0,
                }}
              >
                Where generations of Maasai stewardship merge with modern genetics
                and veterinary excellence.
              </h3>
            </div>
            <p
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "0.92rem",
                lineHeight: 1.75,
                color: "rgba(28,18,8,0.6)",
                margin: "1.5rem 0 0 0",
              }}
            >
              Osotua is a cooperative pastoral platform in Kajiado County dedicated
              to preserving indigenous vigor, soil regeneration, and fair value for
              pastoral families.
            </p>
          </div>

          {/* Stat Card — Gold accent */}
          <div
            className="rounded-[20px] p-8 md:p-10 flex flex-col justify-between"
            style={{
              background: "linear-gradient(145deg, #C4882A, #A8721F)",
              gridColumn: "span 1",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(28,18,8,0.65)",
                }}
              >
                Herd Strength
              </span>
              <i className="bi bi-shield-check text-2xl" style={{ color: "rgba(28,18,8,0.5)" }} />
            </div>

            <div className="my-6">
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(4rem, 8vw, 6rem)",
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "#1C1208",
                }}
              >
                <span ref={animalRef}>{animalCount}</span>+
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(28,18,8,0.7)",
                  marginTop: "0.5rem",
                }}
              >
                Livestock Animals
              </div>
            </div>

            <div
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "rgba(28,18,8,0.6)",
                borderTop: "1px solid rgba(28,18,8,0.12)",
                paddingTop: "0.75rem",
              }}
            >
              Kenya Stud Book &bull; DNA Verified
            </div>
          </div>

          {/* Category Cards */}
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="os-card p-6 md:p-8 flex flex-col justify-between group no-underline"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background: cat.accentBg,
                  border: `1px solid ${cat.accentBorder}`,
                  color: cat.accent,
                  fontSize: "1.4rem",
                  transition: "transform 0.2s ease, background 0.2s ease",
                }}
              >
                <i className={`bi ${cat.icon}`} aria-hidden="true" />
              </div>

              {/* Label */}
              <h4
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                  fontWeight: 400,
                  color: "#1C1208",
                  margin: "0 0 0.5rem 0",
                  lineHeight: 1.2,
                }}
              >
                {cat.label}
              </h4>

              {/* Breed tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {cat.breeds.map((b) => (
                  <span
                    key={b}
                    style={{
                      fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: cat.accent,
                      background: cat.accentBg,
                      border: `1px solid ${cat.accentBorder}`,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "9999px",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Browse link */}
              <div
                className="flex items-center gap-1.5 transition-transform group-hover:translate-x-1"
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: cat.accent,
                }}
              >
                <span>Browse</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </div>
            </Link>
          ))}

          {/* Barn Store CTA */}
          <Link
            href="/barn"
            className="rounded-[20px] p-8 md:p-10 flex flex-col justify-between group no-underline"
            style={{
              background: "#1C1208",
              color: "#FBF7F0",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#D99A30",
                }}
              >
                Fresh Harvest
              </span>
              <i className="bi bi-basket3 text-2xl" style={{ color: "#D99A30" }} />
            </div>

            <h4
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                fontWeight: 300,
                color: "#FBF7F0",
                lineHeight: 1.2,
                margin: "0 0 0.75rem 0",
              }}
            >
              Visit The Barn Store
            </h4>
            <p
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "0.85rem",
                color: "rgba(251,247,240,0.65)",
                margin: "0 0 1.5rem 0",
                lineHeight: 1.65,
              }}
            >
              Weekly pantry boxes, cold-pressed oils, pasture honey, and aged
              grass-fed beef.
            </p>

            <div
              className="flex items-center gap-2 transition-transform group-hover:translate-x-1.5"
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#D99A30",
              }}
            >
              <span>Enter Store</span>
              <i className="bi bi-arrow-right" aria-hidden="true" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}

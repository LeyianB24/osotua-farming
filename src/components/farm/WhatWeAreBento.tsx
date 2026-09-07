"use client";

import Link from "next/link";
import Image from "next/image";
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
      image: "/images/boran bulls.jpg",
      badge: "Purebred Boran Studs",
    },
    {
      icon: "bi-droplet-fill",
      label: "Dairy Champions",
      breeds: ["Sahiwal A2", "Simmental", "Jersey"],
      href: "/breeds?category=dairy",
      accent: "#3D6B3E",
      accentBg: "rgba(61,107,62,0.08)",
      accentBorder: "rgba(61,107,62,0.2)",
      image: "/images/sahiwal cow.jpg",
      badge: "A2 Beta-Casein Certified",
    },
    {
      icon: "bi-heart-pulse",
      label: "Pedigree Goats",
      breeds: ["Boer Stud", "Galla Desert", "Kalahari"],
      href: "/breeds?category=goats",
      accent: "#C4882A",
      accentBg: "rgba(196,136,42,0.08)",
      accentBorder: "rgba(196,136,42,0.2)",
      image: "/images/boer goat.jpg",
      badge: "Acclimatized Genetics",
    },
    {
      icon: "bi-flower1",
      label: "Dorper & Red Maasai",
      breeds: ["Dorper Ram", "Red Maasai ewe", "Blackhead"],
      href: "/breeds?category=sheep",
      accent: "#3D6B3E",
      accentBg: "rgba(61,107,62,0.08)",
      accentBorder: "rgba(61,107,62,0.2)",
      image: "/images/Dorper-sheep-800x534.jpg",
      badge: "Savanna Drought-Hardy",
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
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
          data-reveal
          data-delay="2"
        >
          {/* Hero Text Card with Ranch Photo Preview */}
          <div
            className="os-card p-6 md:p-8 flex flex-col justify-between overflow-hidden relative group"
            style={{ gridColumn: "span 1" }}
          >
            <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-6 border border-[#C4882A]/20">
              <Image
                src="/images/osotua-rangelands-herd.jpg"
                alt="Osotua rangeland herd"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-[11px] font-mono font-bold tracking-wider uppercase">
                Kajiado Savanna Pastures
              </div>
            </div>

            <div className="space-y-3">
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
                  fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: "#1C1208",
                  margin: 0,
                }}
              >
                Generations of Maasai stewardship merge with modern veterinary excellence.
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.65,
                  color: "rgba(28,18,8,0.7)",
                  margin: "0.5rem 0 0 0",
                }}
              >
                Osotua is a cooperative pastoral platform in Kajiado County dedicated to preserving indigenous vigor, soil regeneration, and fair value for pastoral families.
              </p>
            </div>
          </div>

          {/* Stat Card — Gold accent */}
          <div
            className="rounded-[24px] p-8 md:p-10 flex flex-col justify-between shadow-lg"
            style={{
              background: "linear-gradient(145deg, #C4882A, #9E6A1B)",
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
                  color: "rgba(28,18,8,0.75)",
                }}
              >
                Herd Strength
              </span>
              <i className="bi bi-shield-check text-2xl" style={{ color: "rgba(28,18,8,0.6)" }} />
            </div>

            <div className="my-6">
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(4rem, 7vw, 5.5rem)",
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
                  color: "rgba(28,18,8,0.8)",
                  marginTop: "0.5rem",
                }}
              >
                Livestock Animals
              </div>
            </div>

            <div
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "rgba(28,18,8,0.7)",
                borderTop: "1px solid rgba(28,18,8,0.15)",
                paddingTop: "0.75rem",
              }}
            >
              Kenya Stud Book &bull; DNA Verified
            </div>
          </div>

          {/* Category Cards with Photos */}
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="os-card p-5 md:p-6 flex flex-col justify-between group no-underline transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* Photo Header */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 border border-black/5 bg-[#EAE2D5]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badge on Photo */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {cat.badge}
                </div>

                {/* Category Icon */}
                <div
                  className="absolute bottom-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center text-white backdrop-blur-md"
                  style={{ background: cat.accent }}
                >
                  <i className={`bi ${cat.icon} text-sm`} aria-hidden="true" />
                </div>
              </div>

              {/* Title & Breeds */}
              <div>
                <h4
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.35rem, 2vw, 1.7rem)",
                    fontWeight: 500,
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
              </div>

              {/* Browse link */}
              <div
                className="flex items-center justify-between pt-3 border-t border-[#DDD0BE]/60 transition-transform group-hover:translate-x-1"
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: cat.accent,
                }}
              >
                <span>Browse Catalog</span>
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

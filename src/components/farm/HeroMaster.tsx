"use client";

import Link from "next/link";
import { useCountUp } from "@/hooks/use-count-up";

export default function HeroMaster() {
  const { count: animalCount, ref: animalRef } = useCountUp(150, 1800);
  const { count: studCount, ref: studRef } = useCountUp(3200, 2200);

  return (
    <section
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1C1208 0%, #2E1C08 50%, #1C1208 100%)" }}
    >
      {/* Radial glows */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 15% 40%, rgba(196, 136, 42, 0.14) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 80% 20%, rgba(61, 107, 62, 0.1) 0%, transparent 60%)
          `,
        }}
      />

      {/* Main content */}
      <div className="os-container relative z-10 flex flex-col justify-center flex-1 pt-36 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left — Typography */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-7" data-reveal data-delay="1">

            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                background: "rgba(196, 136, 42, 0.15)",
                border: "1px solid rgba(196, 136, 42, 0.3)",
                color: "#D99A30",
              }}
            >
              <span className="live-dot" />
              Kajiado County &bull; Kenya &bull; Est. 2026
            </div>

            {/* Main headline */}
            <h1
              className="text-[#FBF7F0] m-0 font-light tracking-tight"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(3rem, 7vw, 7rem)",
                lineHeight: 0.97,
                letterSpacing: "-0.02em",
              }}
            >
              Where the land <br />
              <em
                style={{
                  fontStyle: "italic",
                  color: "#C4882A",
                  WebkitTextFillColor: "#C4882A",
                }}
              >
                feeds
              </em>{" "}
              <br />
              the future
            </h1>

            {/* Subtitle */}
            <p
              className="max-w-lg m-0 leading-relaxed"
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "clamp(0.95rem, 1.4vw, 1.08rem)",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "rgba(251, 247, 240, 0.75)",
              }}
            >
              Ethically raised indigenous livestock, pure pasture genetics, and
              sunrise-harvested produce nurtured on 3,200 acres of regenerative
              Maasai rangeland.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/breeds"
                className="btn-primary"
                style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
              >
                <span>Explore Breeds</span>
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>

              <Link
                href="/barn"
                className="btn-ghost"
                style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
              >
                <i className="bi bi-bag" aria-hidden="true" />
                <span>Shop The Barn</span>
              </Link>
            </div>

            {/* Stats row — Umoja Sacco inline stats style */}
            <div
              className="flex flex-wrap gap-6 pt-4"
              style={{ borderTop: "1px solid rgba(251, 247, 240, 0.12)" }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 600,
                    color: "#C4882A",
                    lineHeight: 1,
                  }}
                >
                  <span ref={animalRef}>{animalCount}</span>+
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(251,247,240,0.55)",
                    marginTop: "4px",
                  }}
                >
                  Livestock Animals
                </div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(251,247,240,0.12)", paddingLeft: "1.5rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 600,
                    color: "#C4882A",
                    lineHeight: 1,
                  }}
                >
                  <span ref={studRef}>{studCount}</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(251,247,240,0.55)",
                    marginTop: "4px",
                  }}
                >
                  Acres of Rangeland
                </div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(251,247,240,0.12)", paddingLeft: "1.5rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 600,
                    color: "#C4882A",
                    lineHeight: 1,
                  }}
                >
                  100%
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(251,247,240,0.55)",
                    marginTop: "4px",
                  }}
                >
                  Pasture Fed &amp; Organic
                </div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(251,247,240,0.12)", paddingLeft: "1.5rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                    fontWeight: 600,
                    color: "#C4882A",
                    lineHeight: 1,
                  }}
                >
                  Zero
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(251,247,240,0.55)",
                    marginTop: "4px",
                  }}
                >
                  Synthetic Hormones
                </div>
              </div>
            </div>
          </div>

          {/* Right — Floating Breed Pill Cards (Desktop) */}
          <div
            className="hidden lg:flex lg:col-span-5 xl:col-span-5 flex-col gap-4 items-end justify-center"
            data-reveal
            data-delay="2"
          >
            {/* Pill 1 */}
            <div
              className="anim-tag-float-1 flex items-center gap-3 px-5 py-3.5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(196,136,42,0.3)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: "#C4882A" }}
              />
              <div className="flex flex-col text-right">
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: "#FBF7F0",
                    lineHeight: 1.2,
                  }}
                >
                  Boran Stud Bull
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#D99A30",
                  }}
                >
                  Tag #408 &bull; 920kg Prime
                </span>
              </div>
            </div>

            {/* Pill 2 */}
            <div
              className="anim-tag-float-2 flex items-center gap-3 px-5 py-3.5 rounded-2xl mr-6"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(61,107,62,0.35)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: "#3D6B3E" }}
              />
              <div className="flex flex-col text-right">
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: "#FBF7F0",
                    lineHeight: 1.2,
                  }}
                >
                  Red Maasai Sheep
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#4E8A4F",
                  }}
                >
                  Pedigree Flock F-22
                </span>
              </div>
            </div>

            {/* Pill 3 */}
            <div
              className="anim-tag-float-3 flex items-center gap-3 px-5 py-3.5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(196,136,42,0.3)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: "#C4882A" }}
              />
              <div className="flex flex-col text-right">
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: "#FBF7F0",
                    lineHeight: 1.2,
                  }}
                >
                  Sahiwal Dairy Cow
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#D99A30",
                  }}
                >
                  18L/Day Pasture Yield
                </span>
              </div>
            </div>

            {/* Pill 4 */}
            <div
              className="anim-tag-float-4 flex items-center gap-3 px-5 py-3.5 rounded-2xl mr-4"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(196,136,42,0.25)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: "#D99A30" }}
              />
              <div className="flex flex-col text-right">
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: "#FBF7F0",
                    lineHeight: 1.2,
                  }}
                >
                  Purebred Galla Goat
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#D99A30",
                  }}
                >
                  Drought Hardy G-09
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave transition to cream */}
      <div className="w-full relative z-10 overflow-hidden leading-none" style={{ marginTop: "auto" }}>
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
          style={{ display: "block", height: "72px" }}
        >
          <path
            d="M0,40 C360,65 720,18 1080,55 C1260,65 1380,42 1440,50 L1440,72 L0,72 Z"
            fill="#FBF7F0"
            style={{ animation: "terrainBreathe 9s ease-in-out infinite" }}
          />
        </svg>
      </div>
    </section>
  );
}

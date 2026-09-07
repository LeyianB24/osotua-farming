"use client";

import NewsletterForm from "@/components/shared/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#C4882A", padding: "5rem 0" }}
    >
      {/* Subtle ambient orb */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.08)", filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "rgba(28,18,8,0.08)", filter: "blur(50px)" }}
      />

      <div className="os-container relative z-10" data-reveal data-delay="1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Headline */}
          <div className="space-y-4">
            <p
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(28,18,8,0.65)",
                margin: 0,
              }}
            >
              The Osotua Dispatch
            </p>

            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "#1C1208",
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              Receive Seasonal Harvest Drops &amp;{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "rgba(28,18,8,0.75)",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(28,18,8,0.2)",
                }}
              >
                Pedigree Stud Bulletins
              </em>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "rgba(28,18,8,0.72)",
                maxWidth: "480px",
                margin: 0,
              }}
            >
              Join over 2,400 chefs, pastoral ranchers, and wholesome food
              enthusiasts across Kenya receiving direct paddock updates.
            </p>
          </div>

          {/* Right Column: Newsletter Form */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div
              className="w-full max-w-md rounded-2xl p-6 md:p-8"
              style={{
                background: "rgba(28,18,8,0.1)",
                border: "1px solid rgba(28,18,8,0.15)",
                backdropFilter: "blur(8px)",
              }}
            >
              <NewsletterForm />
              <div
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(28,18,8,0.6)",
                  marginTop: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <i className="bi bi-shield-check" style={{ fontSize: "0.8rem" }} />
                <span>Zero spam. Unsubscribe with one click anytime.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

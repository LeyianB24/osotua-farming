"use client";

import NewsletterForm from "@/components/shared/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#C99A2E" }}
    >
      <div className="os-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Headline */}
          <div className="space-y-4">
            <div
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1C1208]/70"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              THE OSOTUA DISPATCH
            </div>

            <h2
              className="text-4xl sm:text-5xl md:text-6xl text-[#1C1208] leading-[1.08] m-0"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: 700,
              }}
            >
              Receive Seasonal Harvest Drops &amp;{" "}
              <span className="text-white">
                Pedigree Stud Bulletins
              </span>
            </h2>

            <p
              className="text-base sm:text-lg text-[#1C1208]/85 max-w-xl leading-relaxed font-normal"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Join over 2,400 chefs, pastoral ranchers, and wholesome food enthusiasts across Kenya receiving direct paddock updates and private stud allocations.
            </p>
          </div>

          {/* Right Column: Newsletter Form */}
          <div>
            <div
              className="p-8 sm:p-10 bg-[#1C1208]/10 border border-[#1C1208]/20 shadow-lg"
              style={{ borderRadius: "2px" }}
            >
              <NewsletterForm />
              <div
                className="text-xs text-[#1C1208]/75 mt-3 flex items-center gap-2"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                <i className="bi bi-shield-lock" />
                <span>Zero spam. Only authentic pastoral dispatch and private allocations.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

export default function BrandQuoteSection() {
  return (
    <section className="section-cream relative bg-[#FBF7F0] text-[#1C1208] py-28 sm:py-36 overflow-hidden">
      
      {/* Decorative vertical hairline accents */}
      <div className="hidden lg:block absolute top-12 bottom-12 left-16 w-[1px] bg-gradient-to-b from-transparent via-[#C4882A]/30 to-transparent" />
      <div className="hidden lg:block absolute top-12 bottom-12 right-16 w-[1px] bg-gradient-to-b from-transparent via-[#C4882A]/30 to-transparent" />

      <div className="os-container max-w-4xl text-center relative z-10" data-reveal data-delay="1">
        
        {/* Large Gold Quote Mark */}
        <div
          className="text-[#C4882A] text-8xl sm:text-9xl font-serif leading-none select-none opacity-30 -mb-8 sm:-mb-12"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          “
        </div>

        {/* Quote Headline */}
        <blockquote className="my-6">
          <p
            className="font-light italic text-[#1C1208] leading-tight tracking-tight m-0 text-3xl sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            We don’t just raise animals. <br className="hidden sm:inline" />
            We build <em className="text-[#C4882A] not-italic font-normal">bonds that feed Kenya</em>.
          </p>
        </blockquote>

        {/* Centered Gold Hairline Rule */}
        <div className="w-20 h-[1.5px] bg-[#C4882A] mx-auto my-8 rounded-full" />

        {/* Eyebrow Attribution */}
        <div className="t-eye justify-center text-xs tracking-[0.24em] text-[#6B3E1A]">
          <span>Osotua Farming &bull; Kajiado County &bull; Est. 2026</span>
        </div>

      </div>
    </section>
  );
}

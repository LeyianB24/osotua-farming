"use client";

export default function BrandQuoteSection() {
  return (
    <section className="relative bg-[#F5F0E8] text-[#1C1208] py-24 sm:py-32 overflow-hidden border-t border-[#D4C9B0]/60">
      
      {/* Decorative vertical hairline accents */}
      <div className="hidden lg:block absolute top-12 bottom-12 left-16 w-[1px] bg-gradient-to-b from-transparent via-[#C99A2E]/30 to-transparent" />
      <div className="hidden lg:block absolute top-12 bottom-12 right-16 w-[1px] bg-gradient-to-b from-transparent via-[#C99A2E]/30 to-transparent" />

      <div className="os-container max-w-4xl text-center relative z-10">
        
        {/* Large Gold Quote Mark */}
        <div
          className="text-[#C99A2E] text-8xl sm:text-9xl font-serif leading-none select-none opacity-30 -mb-8 sm:-mb-12"
          style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
        >
          &ldquo;
        </div>

        {/* Quote Headline */}
        <blockquote className="my-6">
          <p
            className="font-bold italic text-[#1C1208] leading-tight tracking-tight m-0 text-3xl sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            We don’t just raise livestock. <br className="hidden sm:inline" />
            We build <span className="text-[#C99A2E] not-italic font-bold">bonds that nourish Kenya</span>.
          </p>
        </blockquote>

        {/* Centered Gold Hairline Rule */}
        <div className="w-20 h-[1.5px] bg-[#C99A2E] mx-auto my-8 rounded-full" />

        {/* Eyebrow Attribution */}
        <div className="font-mono text-xs tracking-[0.24em] uppercase text-[#5C4A2A] font-bold">
          <span>Osotua Farming &bull; Kajiado County, Kenya &bull; Est. 2026</span>
        </div>

      </div>
    </section>
  );
}

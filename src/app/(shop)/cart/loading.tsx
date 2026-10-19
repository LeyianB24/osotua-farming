export default function CartLoading() {
  return (
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208]">
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden bg-[#1C1208]">
        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] text-[11px] font-mono font-bold uppercase tracking-[0.16em] bg-[#6B7A3F] text-white mb-6">
            <i className="bi bi-bag-check-fill text-xs" />
            <span>SHOPPING BASKET</span>
          </div>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F0E8] leading-[1.02] tracking-tight max-w-5xl mb-4"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Your Farm <em className="font-normal italic text-[#C99A2E]">Order</em>
          </h1>
        </div>
      </section>
      <section className="py-20 sm:py-28 bg-[#F5F0E8]">
        <div className="os-container">
          <div className="p-12 text-center text-xs font-mono text-[#8E7E70] flex flex-col items-center justify-center gap-3">
            <i className="bi bi-arrow-repeat animate-spin text-2xl text-[#C99A2E]" />
            <span>Loading your basket…</span>
          </div>
        </div>
      </section>
    </div>
  );
}

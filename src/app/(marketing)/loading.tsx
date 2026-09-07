export default function MarketingLoading() {
  return (
    <div style={{ background: "#FBF7F0" }} className="min-h-[70vh] flex flex-col items-center justify-center text-[#1C1208] p-6">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-14 h-14 rounded-full border-2 border-[#C4882A]/20 border-t-[#C4882A] animate-spin" />
        <div className="absolute w-7 h-7 rounded-full bg-[#C4882A]/20 animate-ping" />
      </div>

      <div className="text-center space-y-1">
        <h3 className="font-serif text-lg text-[#1C1208] font-medium tracking-wide">
          Osotua Farming
        </h3>
        <p className="font-mono text-[11px] text-[#8E5E16] font-bold tracking-widest uppercase">
          Loading pastoral rangelands…
        </p>
      </div>
    </div>
  )
}

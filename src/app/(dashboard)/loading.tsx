export default function DashboardLoading() {
  return (
    <div style={{ background: "#0E0A05" }} className="min-h-[70vh] flex flex-col items-center justify-center text-[#F5EFE4] p-6">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-14 h-14 rounded-full border-2 border-[#C4882A]/20 border-t-[#C4882A] animate-spin" />
        <div className="absolute w-7 h-7 rounded-full bg-[#C4882A]/20 animate-ping" />
      </div>

      <div className="text-center space-y-1">
        <h3 className="font-light text-lg text-[#F5EFE4] tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
          Osotua Command Suite
        </h3>
        <p className="font-mono text-[10px] text-[#C4882A] font-bold tracking-widest uppercase">
          Synchronising farm operations &amp; orders…
        </p>
      </div>
    </div>
  )
}

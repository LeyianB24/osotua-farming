export default function DashboardLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-[#1A1208] p-6 bg-[#FAF7F2]">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-12 h-12 rounded-full border-2 border-[#DDD4C4] border-t-[#C4882A] animate-spin" />
        <div className="absolute w-6 h-6 rounded-full bg-[#C4882A]/15 animate-ping" />
      </div>

      <div className="text-center space-y-1">
        <h3
          className="text-lg font-bold text-[#1A1208] tracking-wide"
          style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
        >
          Osotua Estate Command
        </h3>
        <p className="font-mono text-[10px] text-[#C4882A] font-bold tracking-widest uppercase">
          Synchronising farm operations &amp; orders…
        </p>
      </div>
    </div>
  )
}

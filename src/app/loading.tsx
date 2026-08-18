export default function Loading() {
  return (
    <div style={{ background: "#FBF7F0" }} className="min-h-screen flex flex-col items-center justify-center text-[#1C1208] p-6 z-50">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full border-2 border-[#C4882A]/20 border-t-[#C4882A] animate-spin" />
        <div className="absolute w-8 h-8 rounded-full bg-[#C4882A]/20 animate-ping" />
      </div>

      <h2 className="font-serif text-xl sm:text-2xl text-[#1C1208] font-medium tracking-wider uppercase">
        Osotua Farming
      </h2>
      <p className="font-mono text-xs text-[#8E5E16] font-bold tracking-widest mt-2 uppercase">
        Loading pastoral estate resources…
      </p>
    </div>
  )
}

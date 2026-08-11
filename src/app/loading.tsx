export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1C1208] flex flex-col items-center justify-center text-[#FBF7F0] p-6 z-50">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full border-2 border-[#C4882A]/20 border-t-[#C4882A] animate-spin" />
        <div className="absolute w-8 h-8 rounded-full bg-[#C4882A]/20 animate-ping" />
      </div>

      <h2 className="font-serif text-xl sm:text-2xl text-[#C4882A] tracking-wider uppercase">
        Osotua Farming
      </h2>
      <p className="font-mono text-xs text-[#FBF7F0]/50 tracking-widest mt-2 uppercase">
        Loading pastoral estate resources…
      </p>
    </div>
  )
}

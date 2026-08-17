import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-[#1C1208] flex items-center justify-center p-6 text-[#FBF7F0]">
      <div className="max-w-lg w-full text-center space-y-6 bg-white/[0.03] border border-white/10 p-8 sm:p-12 rounded-2xl backdrop-blur-md shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#C4882A]/20 border border-[#C4882A]/30 text-[#C4882A] flex items-center justify-center mx-auto text-2xl">
          <i className="bi bi-compass animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#C4882A]">Error 404 &bull; Lost in Pasture</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#FBF7F0] mt-1 font-light">Page Not Found</h1>
          <p className="text-sm text-[#FBF7F0]/60 mt-3 font-sans leading-relaxed">
            The pasture page or ranch item you are looking for has moved or does not exist.
          </p>
        </div>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/barn"
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#C4882A] text-left transition-colors group flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FBF7F0] group-hover:text-[#C4882A]">
                <i className="bi bi-shop text-[#C4882A] text-sm" />
                <span>Visit Barn Store</span>
              </div>
              <p className="text-[11px] text-[#FBF7F0]/50 mt-1">Browse fresh farm produce</p>
            </div>
            <i className="bi bi-arrow-right text-sm text-[#FBF7F0]/40 group-hover:text-[#C4882A] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/breeds"
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#C4882A] text-left transition-colors group flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FBF7F0] group-hover:text-[#C4882A]">
                <i className="bi bi-flower1 text-[#3D6B3E] text-sm" />
                <span>Explore Breeds</span>
              </div>
              <p className="text-[11px] text-[#FBF7F0]/50 mt-1">Pedigree cattle, sheep & goats</p>
            </div>
            <i className="bi bi-arrow-right text-sm text-[#FBF7F0]/40 group-hover:text-[#C4882A] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        <div className="pt-4 border-t border-white/10">
          <Link
            href="/"
            className="text-xs font-mono text-[#C4882A] hover:underline uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <i className="bi bi-arrow-left" />
            Return to Main Estate Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}


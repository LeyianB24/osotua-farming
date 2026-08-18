import Link from "next/link"

export default function NotFound() {
  return (
    <div style={{ background: "#FBF7F0", minHeight: "85vh" }} className="flex items-center justify-center p-6 text-[#1C1208]">
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(196, 136, 42, 0.25)",
          borderRadius: "28px",
          boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
        }}
        className="max-w-lg w-full text-center space-y-6 p-8 sm:p-12"
      >
        <div className="w-16 h-16 rounded-full bg-[#C4882A]/12 border border-[#C4882A]/30 text-[#C4882A] flex items-center justify-center mx-auto text-2xl">
          <i className="bi bi-compass animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8E5E16] font-bold">Error 404 &bull; Lost in Pasture</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1208] mt-1 font-normal">Page Not Found</h1>
          <p className="text-sm text-[#5C4835] mt-3 font-sans leading-relaxed">
            The pasture page or ranch item you are looking for has moved or does not exist.
          </p>
        </div>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/barn"
            style={{
              background: "#FAF8F5",
              border: "1px solid rgba(196, 136, 42, 0.2)",
              borderRadius: "16px",
            }}
            className="p-4 text-left transition-colors group flex items-center justify-between hover:border-[#C4882A]"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1C1208] group-hover:text-[#C4882A]">
                <i className="bi bi-shop text-[#C4882A] text-sm" />
                <span>Visit Barn Store</span>
              </div>
              <p className="text-[11px] text-[#786550] mt-1">Browse fresh farm produce</p>
            </div>
            <i className="bi bi-arrow-right text-sm text-[#786550] group-hover:text-[#C4882A] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/breeds"
            style={{
              background: "#FAF8F5",
              border: "1px solid rgba(196, 136, 42, 0.2)",
              borderRadius: "16px",
            }}
            className="p-4 text-left transition-colors group flex items-center justify-between hover:border-[#C4882A]"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1C1208] group-hover:text-[#C4882A]">
                <i className="bi bi-flower1 text-[#2E7D32] text-sm" />
                <span>Explore Breeds</span>
              </div>
              <p className="text-[11px] text-[#786550] mt-1">Pedigree cattle, sheep & goats</p>
            </div>
            <i className="bi bi-arrow-right text-sm text-[#786550] group-hover:text-[#C4882A] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        <div className="pt-4 border-t border-[#C4882A]/15">
          <Link
            href="/"
            className="text-xs font-mono text-[#8E5E16] font-bold hover:text-[#C4882A] uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <i className="bi bi-arrow-left" />
            Return to Main Estate Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

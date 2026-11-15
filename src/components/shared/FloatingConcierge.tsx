"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function FloatingConcierge() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  // Hide on admin console routes
  if (pathname?.startsWith("/admin")) return null;

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = `https://wa.me/254755758208?text=${encodeURIComponent(customMsg.trim())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setCustomMsg("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[calc(100vw-3rem)] max-w-sm rounded-[2px] border border-[#C99A2E]/50 bg-[#1C1208] text-[#F5F0E8] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C99A2E]">
                    Ranch Concierge Active
                  </span>
                </div>
                <h3
                  className="text-lg font-bold text-[#F5F0E8] m-0"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  How may we assist you?
                </h3>
                <p className="text-xs text-[#B9AD98] m-0 font-normal">
                  Kajiado Pastoral Desk &bull; Direct Farm Liaison
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[#B9AD98] hover:text-[#F5F0E8] p-1 transition-colors cursor-pointer"
                aria-label="Close concierge"
              >
                <i className="bi bi-x-lg text-sm" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="py-4 space-y-2.5 text-xs font-mono">
              <a
                href={`https://wa.me/254755758208?text=${encodeURIComponent(
                  "Hello Osotua Farming, I would like to enquire about certified pedigree livestock genetics (Boran / Sahiwal / Boer / Dorper)."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-[2px] bg-white/[0.04] border border-white/10 hover:border-[#C99A2E] hover:bg-white/[0.08] transition-all text-[#F5F0E8]"
              >
                <div className="flex items-center gap-2.5">
                  <i className="bi bi-bullseye text-[#C99A2E] text-base" />
                  <span className="font-semibold">Pedigree Livestock Desk</span>
                </div>
                <i className="bi bi-whatsapp text-[#25D366]" />
              </a>

              <a
                href={`https://wa.me/254755758208?text=${encodeURIComponent(
                  "Hello Osotua Barn Concierge, I would like to place an order or ask about fresh pasture-raised beef, dairy, and pantry provisions."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-[2px] bg-white/[0.04] border border-white/10 hover:border-[#C99A2E] hover:bg-white/[0.08] transition-all text-[#F5F0E8]"
              >
                <div className="flex items-center gap-2.5">
                  <i className="bi bi-basket text-[#C99A2E] text-base" />
                  <span className="font-semibold">Barn Provisions &amp; Butchery</span>
                </div>
                <i className="bi bi-whatsapp text-[#25D366]" />
              </a>

              <Link
                href="/visit"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-[2px] bg-white/[0.04] border border-white/10 hover:border-[#C99A2E] hover:bg-white/[0.08] transition-all text-[#F5F0E8]"
              >
                <div className="flex items-center gap-2.5">
                  <i className="bi bi-geo-alt text-[#C99A2E] text-base" />
                  <span className="font-semibold">Book Guided Ranch Tour</span>
                </div>
                <i className="bi bi-arrow-right text-xs" />
              </Link>
            </div>

            {/* Custom Input */}
            <form onSubmit={handleSendCustom} className="pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type a question for WhatsApp..."
                  className="flex-1 bg-white/5 border border-white/15 rounded-[2px] px-3 py-2 text-xs text-[#F5F0E8] placeholder:text-[#B9AD98]/60 outline-none focus:border-[#C99A2E]"
                />
                <button
                  type="submit"
                  disabled={!customMsg.trim()}
                  className="px-3 py-2 bg-[#25D366] text-white hover:bg-[#20ba59] rounded-[2px] font-mono text-xs font-bold disabled:opacity-40 transition-colors cursor-pointer"
                  title="Send to WhatsApp"
                >
                  <i className="bi bi-send-fill text-xs" />
                </button>
              </div>
            </form>

            {/* Direct Phone Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#B9AD98]">
              <span>Prefer a phone call?</span>
              <a
                href="tel:+254755758208"
                className="text-[#C99A2E] hover:underline font-bold flex items-center gap-1"
              >
                <i className="bi bi-telephone text-[10px]" />
                +254 755 758 208
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Concierge Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 rounded-full border border-[#C99A2E]/60 bg-[#1C1208]/90 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-[#F5F0E8] shadow-[0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-200 hover:border-[#C99A2E] hover:bg-[#1C1208] active:scale-95 cursor-pointer"
        aria-label="Open ranch concierge support"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
        </span>
        <i className="bi bi-whatsapp text-sm text-[#25D366]" />
        <span className="hidden sm:inline">Ranch Concierge</span>
        <span className="sm:hidden">Help</span>
      </button>
    </div>
  );
}

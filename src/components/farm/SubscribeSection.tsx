"use client";

import { useState } from "react";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Subscription failed. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="relative w-full py-20 sm:py-24 md:py-28 overflow-hidden bg-[#C4602A] text-white">
      <div className="os-container max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#F5F0E8]/85 mb-4">
          THE OSOTUA GAZETTE
        </div>

        {/* Heading: Playfair Display */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08] mb-6 font-bold"
          style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
        >
          Subscribe to the Ranch
        </h2>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg text-[#F5F0E8]/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
        >
          Seasonal harvest announcements, breeding stock availability, and pastoral
          ranching updates &mdash; delivered to your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center max-w-xl mx-auto gap-0 shadow-lg"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading" || status === "success"}
            className="w-full sm:flex-1 px-5 py-4 bg-white/15 text-white placeholder-white/60 border border-white/30 focus:border-white focus:outline-none text-sm font-sans"
            style={{ borderRadius: "0px" }}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full sm:w-auto px-8 py-4 bg-[#1C1208] hover:bg-[#2E1C08] text-white text-xs font-mono font-bold uppercase tracking-[0.16em] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            style={{ borderRadius: "0px" }}
          >
            {status === "loading" ? "JOINING..." : status === "success" ? "SUBSCRIBED" : "JOIN THE RANCH"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm font-medium text-white/95 flex items-center justify-center gap-2">
            <i className="bi bi-check-circle-fill text-[#FAF8F1]" aria-hidden="true" />
            <span>Welcome to the Osotua ranch family! You are now subscribed.</span>
          </p>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm font-medium text-white/95 flex items-center justify-center gap-2">
            <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" />
            <span>{errorMsg}</span>
          </p>
        )}
      </div>
    </section>
  );
}

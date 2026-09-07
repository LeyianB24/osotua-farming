"use client";

import Image from "next/image";

interface SocialPost {
  title: string;
  channel: "instagram" | "tiktok";
  handle: string;
  url: string;
  image: string;
  category: string;
  caption: string;
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    title: "Kenya Boran Stud Sire Line",
    channel: "instagram",
    handle: "@osotua_ranches_",
    url: "https://www.instagram.com/osotua_ranches_/",
    image: "/images/boran-bull.jpg",
    category: "Stud Breeding",
    caption: "DNA-verified purebred Boran bulls grazing on native savanna grasses at sunset in Kajiado.",
  },
  {
    title: "Morning Dairy Rounds & Calves",
    channel: "tiktok",
    handle: "@osotua.ranches",
    url: "https://www.tiktok.com/@osotua.ranches",
    image: "/images/sahiwal calves.jpeg",
    category: "Daily Life",
    caption: "Sahiwal A2 herd inspection and morning suckling routine across the green paddocks.",
  },
  {
    title: "Boer Goats Hillside Foraging",
    channel: "instagram",
    handle: "@osotua_ranches_",
    url: "https://www.instagram.com/osotua_ranches_/",
    image: "/images/boer-goats.jpg",
    category: "Goat Studs",
    caption: "Pedigree Boer stud bucks showing incredible heat tolerance and robust conformation.",
  },
  {
    title: "Sunrise Organic Shamba Harvest",
    channel: "tiktok",
    handle: "@osotua.ranches",
    url: "https://www.tiktok.com/@osotua.ranches",
    image: "/images/cabbage farm.jpeg",
    category: "Harvest Desk",
    caption: "Crisp cabbages, farm greens and herbs plucked at dawn for delivery to Nairobi kitchens.",
  },
  {
    title: "Prime Dorper Ram Sires",
    channel: "instagram",
    handle: "@osotua_ranches_",
    url: "https://www.instagram.com/osotua_ranches_/",
    image: "/images/dorper ram.jpg",
    category: "Ovine Genetics",
    caption: "Exceptional muscle distribution and drought hardiness on our purebred Dorper ram flock.",
  },
  {
    title: "Pastoral Herding & Savanna Rangelands",
    channel: "tiktok",
    handle: "@osotua.ranches",
    url: "https://www.tiktok.com/@osotua.ranches",
    image: "/images/WhatsApp Image 2026-08-10 at 11.55.21.jpeg",
    category: "Regenerative Land",
    caption: "Generations of Maasai intuition guiding seasonal grazing rotations and soil aeration.",
  },
];

export default function SocialShowcaseSection() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="os-container">
        
        {/* Header with Channel Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="space-y-4 max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: "#6B7A3F", borderRadius: "2px" }}
            >
              <i className="bi bi-camera-reels text-xs" />
              <span>DIRECT FROM THE RANGELANDS</span>
            </div>
            <h2
              className="m-0 text-4xl sm:text-5xl md:text-6xl text-[#1C1208] leading-[1.08]"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: 700,
              }}
            >
              Follow Our Daily Life On <br />
              <span style={{ color: "#C99A2E" }}>
                Instagram &amp; TikTok
              </span>
            </h2>
            <p
              className="text-base sm:text-lg text-[#8E7E70] leading-relaxed m-0 font-normal"
              style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              Witness daily herd movements, newborn purebred calves, veterinary field checks, and dawn harvests directly through our official social media channels.
            </p>
          </div>

          {/* Social CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.instagram.com/osotua_ranches_/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] no-underline transition-all hover:opacity-90 shadow-sm"
              style={{
                borderRadius: "2px",
                fontFamily: "var(--font-source-sans), sans-serif",
                backgroundColor: "#C4602A",
                color: "#FFFFFF",
              }}
            >
              <i className="bi bi-instagram text-sm" />
              <span>Follow @osotua_ranches_</span>
            </a>

            <a
              href="https://www.tiktok.com/@osotua.ranches"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] no-underline transition-all hover:opacity-90 shadow-sm"
              style={{
                borderRadius: "2px",
                fontFamily: "var(--font-source-sans), sans-serif",
                backgroundColor: "#1C1208",
                color: "#FFFFFF",
                border: "1px solid #1C1208",
              }}
            >
              <i className="bi bi-tiktok text-sm text-[#00f2fe]" />
              <span>Watch @osotua.ranches</span>
            </a>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOCIAL_POSTS.map((post) => {
            const isInsta = post.channel === "instagram";
            return (
              <a
                key={post.title}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 flex flex-col justify-between group no-underline transition-all hover:shadow-xl bg-[#FAF7F2] border border-[#D4C9B0]"
                style={{ borderRadius: "2px" }}
              >
                {/* Photo container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden mb-5 bg-[#1C1208]" style={{ borderRadius: "2px" }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Channel Tag Badge */}
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white bg-black/70 border border-white/20 flex items-center gap-1.5"
                    style={{ borderRadius: "2px" }}
                  >
                    <i className={`bi ${isInsta ? "bi-instagram text-[#C99A2E]" : "bi-tiktok text-[#00f2fe]"}`} />
                    <span>{post.handle}</span>
                  </div>

                  {/* Category Pill */}
                  <div
                    className="absolute bottom-3 left-3 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.14em] uppercase text-[#1C1208]"
                    style={{ backgroundColor: "#C99A2E", borderRadius: "2px" }}
                  >
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h4
                    className="text-xl text-[#1C1208] group-hover:text-[#C4602A] transition-colors m-0 leading-snug font-semibold"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {post.title}
                  </h4>
                  <p
                    className="text-xs text-[#8E7E70] leading-relaxed m-0 line-clamp-2 font-normal"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                  >
                    {post.caption}
                  </p>
                </div>

                {/* Bottom link bar */}
                <div
                  className="flex items-center justify-between pt-3 mt-4 border-t border-[#E8E0D2] text-[11px] font-bold uppercase tracking-[0.14em] text-[#1C1208] group-hover:text-[#C4602A]"
                  style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  <span>{isInsta ? "View on Instagram" : "Watch on TikTok"}</span>
                  <i className="bi bi-arrow-up-right transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

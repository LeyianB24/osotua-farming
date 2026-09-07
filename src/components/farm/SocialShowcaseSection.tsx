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
    image: "/images/boran bulls.jpg",
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
    image: "/images/boer goat.jpg",
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
    <section className="section-light relative overflow-hidden py-24" style={{ background: "#F4EDE1" }}>
      <div className="os-container">
        
        {/* Header with Channel Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14" data-reveal data-delay="1">
          <div className="space-y-3 max-w-2xl">
            <div className="eyebrow-pill mb-2">
              <i className="bi bi-camera-reels text-[#C4882A]" />
              <span>Direct From The Rangelands</span>
            </div>
            <h2
              className="m-0"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.018em",
                color: "#1C1208",
              }}
            >
              Follow Our Daily Life On <br />
              <em style={{ fontStyle: "italic", color: "#C4882A" }}>
                Instagram &amp; TikTok
              </em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "rgba(28,18,8,0.7)",
                margin: 0,
              }}
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
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider no-underline transition-all hover:scale-105 shadow-sm"
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                background: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)",
                color: "#FFFFFF",
              }}
            >
              <i className="bi bi-instagram text-base" />
              <span>Follow @osotua_ranches_</span>
            </a>

            <a
              href="https://www.tiktok.com/@osotua.ranches"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider no-underline transition-all hover:scale-105 shadow-sm"
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                background: "#000000",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <i className="bi bi-tiktok text-base text-[#00f2fe]" />
              <span>Watch @osotua.ranches</span>
            </a>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-reveal
          data-delay="2"
        >
          {SOCIAL_POSTS.map((post) => {
            const isInsta = post.channel === "instagram";
            return (
              <a
                key={post.title}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="os-card p-4 md:p-5 flex flex-col justify-between group no-underline transition-all hover:shadow-xl hover:-translate-y-1.5"
                style={{ background: "#FFFFFF", borderRadius: "24px" }}
              >
                {/* Photo container */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#EFE6DA] border border-black/5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Channel Tag Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-white backdrop-blur-md bg-black/60 border border-white/20 flex items-center gap-1.5">
                    <i className={`bi ${isInsta ? "bi-instagram text-[#FCB045]" : "bi-tiktok text-[#00f2fe]"}`} />
                    <span>{post.handle}</span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-[#C4882A] text-[#1C1208]">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 px-1">
                  <h4
                    className="text-lg font-semibold text-[#1C1208] group-hover:text-[#C4882A] transition-colors m-0 leading-tight"
                    style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
                  >
                    {post.title}
                  </h4>
                  <p
                    className="text-xs text-[#5C4835] leading-relaxed m-0 line-clamp-2"
                    style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
                  >
                    {post.caption}
                  </p>
                </div>

                {/* Bottom link bar */}
                <div
                  className="flex items-center justify-between pt-3 mt-3 border-t border-[#E8DCCB] text-[11px] font-mono font-bold uppercase tracking-wider text-[#8E5E16] group-hover:text-[#C4882A]"
                >
                  <span>{isInsta ? "View on Instagram" : "Watch on TikTok"}</span>
                  <i className="bi bi-arrow-up-right transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

"use client";

interface MarqueeStripProps {
  theme?: "gold" | "green";
  items?: string[];
  reverse?: boolean;
}

const defaultBreeds = [
  "Boran Stud Cattle",
  "Sahiwal Dairy Champions",
  "Pedigree Boer Goats",
  "Dorper Prime Sheep",
  "Red Maasai Indigenous",
  "Bonsmara Dual-Purpose",
  "Galla Desert Goats",
  "Simmental Heavy Studs",
  "Kenya Stud Book Certified",
];

const defaultProduce = [
  "Raw Pasture Honey",
  "Sunrise Grass Milk",
  "Prime Dry-Aged Beef",
  "Free-Range Ranch Eggs",
  "Kajiado Highland Greens",
  "Zero Hormone Promise",
  "Cold-Chain Dispatched",
  "100% Traceable Passport",
];

export default function MarqueeStrip({
  theme = "gold",
  items,
  reverse = false,
}: MarqueeStripProps) {
  const content = items || (theme === "gold" ? defaultBreeds : defaultProduce);
  const repeated = [...content, ...content, ...content];

  const isGold = theme === "gold";

  return (
    <div
      className="w-full py-3.5 overflow-hidden select-none"
      style={{
        background: isGold ? "#1C1208" : "#F0E8DA",
        borderTop: isGold ? "1px solid rgba(196,136,42,0.15)" : "1px solid rgba(28,18,8,0.08)",
        borderBottom: isGold ? "1px solid rgba(196,136,42,0.15)" : "1px solid rgba(28,18,8,0.08)",
      }}
    >
      <div className={reverse ? "marquee-track-right" : "marquee-track-left"}>
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 px-5">
            <span
              className="whitespace-nowrap"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "0.01em",
                color: isGold ? "rgba(196,136,42,0.8)" : "rgba(28,18,8,0.5)",
              }}
            >
              {item}
            </span>
            <span
              style={{
                fontSize: "0.4rem",
                opacity: 0.4,
                color: isGold ? "#C4882A" : "#6B3E1A",
              }}
            >
              ●
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

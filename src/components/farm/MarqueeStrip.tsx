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
      className={`w-full py-4 sm:py-5 overflow-hidden border-y select-none relative ${
        isGold
          ? "bg-[#1C1208] border-[#C4882A]/20 text-[#C4882A]"
          : "bg-[#172415] border-emerald-900/40 text-emerald-300"
      }`}
    >
      <div className={reverse ? "marquee-track-right" : "marquee-track-left"}>
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10 px-4 sm:px-6">
            <span
              className="text-lg sm:text-2xl font-light italic tracking-wide whitespace-nowrap opacity-75 hover:opacity-100 transition-opacity"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              {item}
            </span>
            <span className="text-xs opacity-40 font-mono">&bull;</span>
          </div>
        ))}
      </div>
    </div>
  );
}

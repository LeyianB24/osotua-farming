"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { RANCH_GALLERY } from "@/lib/images";

interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

// Per-image metadata for named authentic ranch photos
const NAMED_PHOTO_META: Record<string, { tag: string; caption: string; alt: string }> = {
  "Kudu.jpg": {
    tag: "Wildlife Corridor",
    caption: "Greater Kudu browsing undisturbed within the Amboseli–Mara wildlife corridor",
    alt: "Greater Kudu on Osotua ranch wildlife corridor, Kajiado savanna",
  },
  "Kudu 2.jpg": {
    tag: "Wildlife Corridor",
    caption: "Kudu at the Osotua ranch water pan — shared with livestock in the dry season",
    alt: "Kudu at ranch water pan, Kajiado County",
  },
  "Elland.jpg": {
    tag: "Wildlife Corridor",
    caption: "Eland antelope grazing the open Kajiado savanna alongside Osotua livestock",
    alt: "Eland antelope co-habiting Osotua ranch rangeland",
  },
  "Elland 2.jpg": {
    tag: "Wildlife Corridor",
    caption: "Eland herd on undisturbed open grassland within the ranch corridor",
    alt: "Eland herd on open savanna, Osotua Farming wildlife corridor",
  },
  "Young bulls.jpg": {
    tag: "Stud Bulls",
    caption: "Young foundation bulls at pasture — the next generation of Osotua stud genetics",
    alt: "Young bulls grazing Kajiado rangeland at Osotua Farming",
  },
  "Bonsamara 1.jpg": {
    tag: "Stud Bulls",
    caption: "Bonsmara cattle in prime conditioning on Kajiado pasture",
    alt: "Bonsmara cattle at Osotua ranch, Kajiado County",
  },
  "Bonsamara 2.jpg": {
    tag: "Herds & Flocks",
    caption: "Bonsmara herd free-ranging across open paddock on the ranch",
    alt: "Bonsmara herd on rangeland at Osotua Farming",
  },
  "Red Kalahari 1.jpg": {
    tag: "Herds & Flocks",
    caption: "Red Kalahari goats — prized dual-purpose breed thriving on semi-arid pasture",
    alt: "Red Kalahari goats at Osotua ranch",
  },
  "Red kalahari 2.jpg": {
    tag: "Herds & Flocks",
    caption: "Kalahari Red buck showcasing the breed's distinctive russet-red coat",
    alt: "Kalahari Red buck at Osotua Farming, Kajiado",
  },
  "Red kalahari 3.jpg": {
    tag: "Herds & Flocks",
    caption: "Kalahari Red does in open pasture — hardy drought-resilient meat goats",
    alt: "Kalahari Red does at Osotua ranch, semi-arid rangeland",
  },
  "Pedigree Boer.jpg": {
    tag: "Stud Bulls",
    caption: "Pedigree Boer stud buck — champion South African genetics on Osotua stud book",
    alt: "Pedigree Boer stud goat at Osotua ranch, Kajiado Kenya",
  },
  "Boers.jpg": {
    tag: "Herds & Flocks",
    caption: "Boer goat herd at pasture — muscular, fast-growing premium meat goats",
    alt: "Boer goat herd at Osotua Farming ranch",
  },
  "Calves.jpg": {
    tag: "Rangeland",
    caption: "Newborn calves at Osotua ranch — the foundation of tomorrow's Kajiado herd",
    alt: "Calves at Osotua Farming ranch, Kajiado County",
  },
};

// Generate descriptive metadata for all authentic ranch photos
const ALL_PHOTOS: GalleryPhoto[] = RANCH_GALLERY.map((src, index) => {
  const number = index + 1;
  // Check if this is a named, descriptive photo
  const filename = src.split("/").pop() ?? "";
  if (NAMED_PHOTO_META[filename]) {
    const meta = NAMED_PHOTO_META[filename];
    return { src, alt: meta.alt, caption: meta.caption, tag: meta.tag };
  }

  // Fallback: derive metadata from WhatsApp archive filenames
  let tag = "Rangeland";
  let caption = `Pastoral landscape & indigenous cattle on Kajiado savanna (#${number})`;

  if (src.includes("11.55.26") || src.includes("11.55.27")) {
    tag = "Wildlife Corridor";
    caption = "Sunrise grazing across open Amboseli–Mara savanna corridor";
  } else if (src.includes("11.55.31") || src.includes("11.55.32")) {
    tag = "Apiary & Pasture";
    caption = "Langstroth acacia apiary and blooming meadow grasslands";
  } else if (src.includes("11.56.43") || src.includes("11.56.44")) {
    tag = "Herds & Flocks";
    caption = "Free-range pasture poultry and paddock rotation runs";
  } else if (src.includes("11.56.50") || src.includes("11.56.51")) {
    tag = "Rotational Grazing";
    caption = "Purebred Boran and Sahiwal breeding dams at pasture";
  } else if (src.includes("11.55.34") || src.includes("11.56.42")) {
    tag = "Stud Bulls";
    caption = "Foundation Boran stud sires in prime conditioning";
  }

  return {
    src,
    alt: `Osotua Farming ranch archive photo #${number} — ${caption}`,
    caption,
    tag,
  };
});

export default function RangelandsGallerySection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filters = ["All", "Rangeland", "Wildlife Corridor", "Herds & Flocks", "Apiary & Pasture", "Stud Bulls"];

  const filteredPhotos = ALL_PHOTOS.filter((photo) => {
    if (activeFilter === "All") return true;
    return photo.tag === activeFilter;
  });

  // Show 12 compact photos by default, or all if expanded
  const displayedPhotos = isExpanded ? filteredPhotos : filteredPhotos.slice(0, 12);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    const galleryEl = document.getElementById("gallery");
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev! + 1) % filteredPhotos.length));
  }, [selectedIndex, filteredPhotos.length]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev! - 1 + filteredPhotos.length) % filteredPhotos.length));
  }, [selectedIndex, filteredPhotos.length]);

  // Lock body scroll when lightbox modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedIndex]);

  // Handle keyboard events (ESC, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  return (
    <section
      id="gallery"
      className="py-16 sm:py-20 md:py-28 border-y border-[#C99A2E]/15 text-white relative overflow-hidden"
      style={{ backgroundColor: "#110B05", color: "#F5F0E8" }}
    >
      <div className="os-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#C99A2E]" aria-hidden="true" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C99A2E]">
                LIVE RANCH ARCHIVE · 4,200 ACRES KAJIADO
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] m-0"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              Experience Our{" "}
              <span style={{ color: "#C99A2E" }}>Rangelands</span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-[#A8998C] max-w-xl font-normal leading-relaxed">
              Explore unfiltered photographic dispatches from our rotational paddocks, savanna wildlife
              corridors, and purebred herds. Click any photo to expand into full screen.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#6B7A3F]/20 border border-[#6B7A3F]/40 text-[#A8B780] font-mono text-xs font-semibold uppercase tracking-wider">
              <i className="bi bi-images text-xs" />
              <span>{ALL_PHOTOS.length} Authentic Photos</span>
            </span>

            <Link
              href="/visit"
              className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white no-underline transition-all hover:bg-[#6B7A3F]"
              style={{ backgroundColor: "#1C1208", border: "1px solid #D4C9B0", borderRadius: "2px" }}
            >
              <i className="bi bi-calendar-event" aria-hidden="true" />
              <span>Book Farm Tour</span>
            </Link>
          </div>
        </div>

        {/* Filter Pills & Exit Expanded Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {filters.map((filter) => {
              const count =
                filter === "All"
                  ? ALL_PHOTOS.length
                  : ALL_PHOTOS.filter((p) => p.tag === filter).length;
              const active = activeFilter === filter;

              return (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setIsExpanded(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#C99A2E] text-[#110B05] shadow-xs"
                      : "bg-white/5 text-[#A8998C] hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{filter}</span>
                  <span className={`ml-1.5 text-[10px] ${active ? "text-[#110B05]" : "text-[#C99A2E]"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {isExpanded && (
            <button
              onClick={handleCollapse}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#C99A2E]/15 border border-[#C99A2E]/40 text-[#C99A2E] hover:bg-[#C99A2E] hover:text-[#110B05] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 self-start sm:self-auto"
              title="Exit expanded view and show 12 photos"
            >
              <i className="bi bi-x-circle" />
              <span>Exit Expanded View</span>
            </button>
          )}
        </div>

        {/* Compact Grid: 2 cols on mobile, 3 on sm, 4 on md, 6 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-white/10 bg-[#1C1208] focus:outline-none focus:ring-2 focus:ring-[#C99A2E] text-left transition-all duration-300 hover:border-[#C99A2E] hover:shadow-lg cursor-pointer"
              aria-label={`Open photo ${index + 1}: ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

              {/* Hover Zoom Icon & Badge */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-[#C99A2E] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <i className="bi bi-arrows-angle-expand text-[10px]" />
              </div>

              {/* Bottom Tag */}
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#C99A2E] block truncate">
                  {photo.tag}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Expand / Collapse Toggle Button */}
        {filteredPhotos.length > 12 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                if (isExpanded) {
                  handleCollapse();
                } else {
                  setIsExpanded(true);
                }
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-mono font-bold uppercase tracking-[0.16em] rounded-[2px] transition-all duration-300 border border-[#C99A2E] text-[#C99A2E] hover:bg-[#C99A2E] hover:text-[#110B05] cursor-pointer"
            >
              <i className={`bi ${isExpanded ? "bi-chevron-up" : "bi-grid-3x3-gap-fill"}`} />
              <span>
                {isExpanded
                  ? "Exit Expanded Gallery (Show 12)"
                  : `Expand Full Gallery (${filteredPhotos.length} Photos)`}
              </span>
            </button>

            {isExpanded && (
              <button
                onClick={handleCollapse}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold uppercase tracking-[0.16em] rounded-[2px] transition-all duration-300 bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <i className="bi bi-arrow-up" />
                <span>Return to Top</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── EXPANDABLE LIGHTBOX MODAL ── */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-fadeIn select-none"
          onClick={closeLightbox}
        >
          {/* Top Bar: Counter & Prominent Exit Button */}
          <div
            className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-30 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 font-mono text-xs text-[#C99A2E] uppercase tracking-widest bg-black/60 border border-white/10 px-3.5 py-2 rounded-[2px] backdrop-blur-sm">
              <i className="bi bi-camera" />
              <span>
                {selectedIndex + 1} / {filteredPhotos.length}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-white font-semibold">{filteredPhotos[selectedIndex].tag}</span>
            </div>

            {/* Prominent Exit Button */}
            <button
              onClick={closeLightbox}
              aria-label="Exit photo preview"
              className="flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#C99A2E] hover:bg-[#e0b043] text-[#110B05] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              <i className="bi bi-x-lg text-sm" />
              <span>Exit [Esc]</span>
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/20 hover:bg-[#C99A2E] hover:text-[#110B05] text-white flex items-center justify-center text-2xl transition-all cursor-pointer z-30 shadow-xl"
          >
            <i className="bi bi-chevron-left" />
          </button>

          {/* Main Photo Container */}
          <div
            className="relative max-w-5xl max-h-[78vh] w-full h-[60vh] sm:h-[72vh] flex flex-col items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={closeLightbox}
              title="Click photo or backdrop to exit"
            >
              <Image
                src={filteredPhotos[selectedIndex].src}
                alt={filteredPhotos[selectedIndex].alt}
                fill
                priority
                sizes="90vw"
                className="object-contain"
              />
            </div>

            {/* Bottom Caption & Secondary Exit Action */}
            <div className="mt-4 text-center max-w-2xl px-4 flex flex-col items-center">
              <p
                className="text-sm sm:text-base text-[#F5F0E8] font-medium leading-relaxed"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                {filteredPhotos[selectedIndex].caption}
              </p>
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="text-[10px] font-mono text-[#8E7E70] uppercase tracking-widest">
                  Osotua Ranches · Kajiado County, Kenya
                </span>
                <span className="text-white/30">&bull;</span>
                <button
                  onClick={closeLightbox}
                  className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C99A2E] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <i className="bi bi-x-circle text-xs" />
                  <span>Exit Lightbox</span>
                </button>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/20 hover:bg-[#C99A2E] hover:text-[#110B05] text-white flex items-center justify-center text-2xl transition-all cursor-pointer z-30 shadow-xl"
          >
            <i className="bi bi-chevron-right" />
          </button>
        </div>
      )}
    </section>
  );
}

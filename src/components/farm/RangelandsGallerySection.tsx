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

// Generate descriptive metadata for all authentic ranch photos
const ALL_PHOTOS: GalleryPhoto[] = RANCH_GALLERY.map((src, index) => {
  const number = index + 1;
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

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev! + 1) % filteredPhotos.length));
  }, [selectedIndex, filteredPhotos.length]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev! - 1 + filteredPhotos.length) % filteredPhotos.length));
  }, [selectedIndex, filteredPhotos.length]);

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

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 no-scrollbar">
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

        {/* Compact Grid: 2 cols on mobile, 3 on sm, 4 on md, 6 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-[2px] border border-white/10 bg-[#1C1208] focus:outline-none focus:ring-2 focus:ring-[#C99A2E] text-left transition-all duration-300 hover:border-[#C99A2E] hover:shadow-lg"
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
          <div className="mt-10 text-center">
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-mono font-bold uppercase tracking-[0.16em] rounded-[2px] transition-all duration-300 border border-[#C99A2E] text-[#C99A2E] hover:bg-[#C99A2E] hover:text-[#110B05] cursor-pointer"
            >
              <i className={`bi ${isExpanded ? "bi-chevron-up" : "bi-grid-3x3-gap-fill"}`} />
              <span>
                {isExpanded
                  ? "Show Less Photos"
                  : `Expand Full Gallery (${filteredPhotos.length} Photos)`}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ── EXPANDABLE LIGHTBOX MODAL ── */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 font-mono text-xs text-[#C99A2E] uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-[2px]">
              <i className="bi bi-camera" />
              <span>
                {selectedIndex + 1} / {filteredPhotos.length}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-white">{filteredPhotos[selectedIndex].tag}</span>
            </div>

            <button
              onClick={closeLightbox}
              aria-label="Close photo preview"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl transition-colors cursor-pointer"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-all cursor-pointer z-20"
          >
            <i className="bi bi-chevron-left" />
          </button>

          {/* Main Photo Container */}
          <div
            className="relative max-w-5xl max-h-[78vh] w-full h-[65vh] sm:h-[75vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={filteredPhotos[selectedIndex].src}
                alt={filteredPhotos[selectedIndex].alt}
                fill
                priority
                sizes="90vw"
                className="object-contain"
              />
            </div>

            {/* Bottom Caption */}
            <div className="mt-4 text-center max-w-2xl px-4">
              <p
                className="text-sm sm:text-base text-[#F5F0E8] font-medium leading-relaxed"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                {filteredPhotos[selectedIndex].caption}
              </p>
              <span className="text-[10px] font-mono text-[#8E7E70] uppercase tracking-widest mt-1 block">
                Osotua Ranches · Kajiado County, Kenya
              </span>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl transition-all cursor-pointer z-20"
          >
            <i className="bi bi-chevron-right" />
          </button>
        </div>
      )}
    </section>
  );
}

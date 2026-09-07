"use client";

import { useState } from "react";
import BreedCard from "./BreedCard";
import BreedGeneticsModal, { BreedModalData } from "./BreedGeneticsModal";

interface BreedItem {
  id: string;
  name: string;
  purpose: string;
  origin: string;
  image: string | null;
  pricePerHead: number;
  inStock: number;
  featured: boolean;
  species: { name: string };
}

interface Props {
  initialBreeds: BreedItem[];
  speciesList: { id: string; name: string }[];
}

export default function BreedsClient({ initialBreeds, speciesList }: Props) {
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc" | "stock">("name");
  const [inspectingBreed, setInspectingBreed] = useState<BreedModalData | null>(null);

  const queryTrimmed = searchQuery.trim().toLowerCase();

  const filtered = initialBreeds.filter((b) => {
    const matchSp = selectedSpecies === "all" || b.species.name.toLowerCase() === selectedSpecies.toLowerCase();
    const matchQ =
      queryTrimmed === "" ||
      b.name.toLowerCase().includes(queryTrimmed) ||
      b.purpose.toLowerCase().includes(queryTrimmed) ||
      b.origin.toLowerCase().includes(queryTrimmed);
    return matchSp && matchQ;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.pricePerHead - b.pricePerHead;
    if (sortBy === "price-desc") return b.pricePerHead - a.pricePerHead;
    if (sortBy === "stock") return b.inStock - a.inStock;
    return a.name.localeCompare(b.name);
  });

  const hasFilters = selectedSpecies !== "all" || queryTrimmed !== "";

  return (
    <section className="bg-[#F5F0E8] text-[#1C1208] pb-32 pt-10 relative">
      <div className="os-container relative z-10 space-y-12">

        {/* ── CONTROL BAR (Figma Clean Cream Style) ── */}
        <div
          className="bg-[#FAF7F2] p-6 sm:p-8 border border-[#D4C9B0] space-y-6 shadow-sm"
          style={{ borderRadius: "2px" }}
        >
          {/* Search + sort row */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <div className="relative flex-1">
              <i
                className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7E70] text-sm pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by breed, purpose, or origin..."
                className="w-full bg-white border border-[#D4C9B0] rounded-[2px] py-3 pl-11 pr-10 text-sm text-[#1C1208] outline-none focus:border-[#C99A2E] transition-all placeholder:text-[#8E7E70]"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              />
              {searchQuery.trim() !== "" && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E7E70] hover:text-[#1C1208] p-1"
                  aria-label="Clear search"
                >
                  <i className="bi bi-x text-base" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="relative shrink-0 sm:w-64">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full appearance-none bg-white border border-[#D4C9B0] rounded-[2px] py-3 pl-4 pr-10 text-xs font-semibold uppercase tracking-[0.14em] text-[#1C1208] outline-none focus:border-[#C99A2E] cursor-pointer transition-all"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                <option value="name">Sort by Name</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="stock">Most Available</option>
              </select>
              <i
                className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#8E7E70] text-xs pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Species filter buttons */}
          <div className="flex flex-wrap gap-2.5 items-center pt-2 border-t border-[#E8E0D2]">
            <button
              onClick={() => setSelectedSpecies("all")}
              className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer ${
                selectedSpecies === "all"
                  ? "bg-[#1C1208] text-[#F5F0E8] border border-[#1C1208]"
                  : "bg-white text-[#1C1208] border border-[#D4C9B0] hover:border-[#C99A2E]"
              }`}
              style={{ borderRadius: "2px", fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              <span>All Breeds</span>
              <span className={`text-[10px] ${selectedSpecies === "all" ? "text-[#C99A2E]" : "text-[#8E7E70]"}`}>
                ({initialBreeds.length})
              </span>
            </button>

            {speciesList.map((sp) => {
              const count = initialBreeds.filter((b) => b.species.name.toLowerCase() === sp.name.toLowerCase()).length;
              const active = selectedSpecies.toLowerCase() === sp.name.toLowerCase();
              return (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpecies(sp.name)}
                  className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#1C1208] text-[#F5F0E8] border border-[#1C1208]"
                      : "bg-white text-[#1C1208] border border-[#D4C9B0] hover:border-[#C99A2E]"
                  }`}
                  style={{ borderRadius: "2px", fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  <span>{sp.name}</span>
                  <span className={`text-[10px] ${active ? "text-[#C99A2E]" : "text-[#8E7E70]"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}

            {hasFilters && (
              <button
                onClick={() => {
                  setSelectedSpecies("all");
                  setSearchQuery("");
                }}
                className="text-xs text-[#C4602A] hover:underline ml-auto font-semibold cursor-pointer"
                style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* ── RESULTS SUMMARY ── */}
        <div className="flex items-center justify-between text-xs text-[#8E7E70] px-1 font-semibold uppercase tracking-[0.14em]">
          <span>
            Showing <strong className="text-[#1C1208]">{sorted.length}</strong> {sorted.length === 1 ? "breed" : "pedigree breeds"}
          </span>
          <span>Verified Stud Genetics</span>
        </div>

        {/* ── BREED GRID ── */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sorted.map((breed) => (
              <BreedCard
                key={breed.id}
                breed={breed}
                onInspectGenetics={(b) => setInspectingBreed(b)}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 bg-[#FAF7F2] border border-[#D4C9B0] space-y-4"
            style={{ borderRadius: "2px" }}
          >
            <i className="bi bi-search text-4xl text-[#C99A2E]" aria-hidden="true" />
            <h3
              className="font-serif text-2xl text-[#1C1208] font-semibold"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              No pedigree breeds found
            </h3>
            <p className="text-sm text-[#8E7E70] max-w-md mx-auto">
              We could not find any breeds matching your current selection. Try selecting &ldquo;All Breeds&rdquo; or clearing your search term.
            </p>
            <button
              onClick={() => {
                setSelectedSpecies("all");
                setSearchQuery("");
              }}
              className="btn-gold"
              style={{ borderRadius: "2px" }}
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      {/* ── GENETICS INSPECTION MODAL ── */}
      {inspectingBreed && (
        <BreedGeneticsModal
          breed={inspectingBreed}
          onClose={() => setInspectingBreed(null)}
        />
      )}
    </section>
  );
}

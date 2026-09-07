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
  const [searchQuery, setSearchQuery] = useState<string>(" ");
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
    <section className="bg-[#1C1208] text-[#FBF7F0] pb-28 pt-8 relative">
      <div className="os-container relative z-10 space-y-12">

        {/* ── CONTROL BAR (Obsidian Glass) ── */}
        <div className="cell-dark p-6 sm:p-8 rounded-3xl border border-[#C4882A]/20 space-y-6 shadow-xl">
          {/* Search + sort row */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <div className="relative flex-1">
              <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-[#C4882A] text-base pointer-events-none" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery === " " ? "" : searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by breed, purpose, or origin..."
                className="w-full bg-black/40 border border-white/15 rounded-2xl py-3.5 pl-11 pr-10 text-sm text-[#FBF7F0] outline-none focus:border-[#C4882A] transition-all placeholder:text-[#FBF7F0]/40 font-mono"
              />
              {searchQuery.trim() !== "" && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <i className="bi bi-x text-base" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="relative shrink-0 sm:w-64">
              <i className="bi bi-filter absolute left-4 top-1/2 -translate-y-1/2 text-[#C4882A] text-base pointer-events-none" aria-hidden="true" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full appearance-none bg-black/40 border border-white/15 rounded-2xl py-3.5 pl-11 pr-10 text-xs font-mono font-semibold uppercase tracking-wider text-[#FBF7F0] outline-none focus:border-[#C4882A] cursor-pointer transition-all"
              >
                <option value="name" className="bg-[#1C1208]">Sort by Name</option>
                <option value="price-asc" className="bg-[#1C1208]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#1C1208]">Price: High to Low</option>
                <option value="stock" className="bg-[#1C1208]">Most Available</option>
              </select>
              <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#C4882A] text-xs pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          {/* Species filter pills */}
          <div className="flex flex-wrap gap-2.5 items-center pt-2 border-t border-white/10">
            <button
              onClick={() => setSelectedSpecies("all")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedSpecies === "all"
                  ? "bg-[#C4882A] text-[#1C1208] shadow-lg shadow-amber-900/30"
                  : "bg-white/5 text-[#FBF7F0]/70 border border-white/10 hover:border-[#C4882A]/40"
              }`}
            >
              <i className="bi bi-grid text-sm" aria-hidden="true" />
              <span>All Livestock</span>
              <span className="opacity-70 font-normal">({initialBreeds.length})</span>
            </button>

            {speciesList.map((sp) => {
              const count = initialBreeds.filter((b) => b.species.name === sp.name).length;
              const active = selectedSpecies.toLowerCase() === sp.name.toLowerCase();
              return (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpecies(sp.name)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? "bg-[#C4882A] text-[#1C1208] shadow-lg shadow-amber-900/30"
                      : "bg-white/5 text-[#FBF7F0]/70 border border-white/10 hover:border-[#C4882A]/40"
                  }`}
                >
                  <i className="bi bi-patch-check text-xs" aria-hidden="true" />
                  <span>{sp.name}</span>
                  <span className="opacity-70 font-normal">({count})</span>
                </button>
              );
            })}

            {hasFilters && (
              <button
                onClick={() => {
                  setSelectedSpecies("all");
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-red-950/60 text-red-300 border border-red-800 hover:bg-red-900/80 transition-colors ml-auto"
              >
                <i className="bi bi-x text-xs" aria-hidden="true" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>

          {/* Results count text */}
          <div className="flex items-center justify-between text-xs text-[#FBF7F0]/60 font-mono pt-1">
            <span>
              Showing <strong className="text-[#C4882A]">{sorted.length}</strong> of {initialBreeds.length} breeds
              {selectedSpecies !== "all" && <span> &bull; <strong className="text-[#F5C76D]">{selectedSpecies}</strong></span>}
            </span>
          </div>
        </div>

        {/* ── BREED GRID ── */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {sorted.map((breed) => (
              <BreedCard
                key={breed.id}
                breed={breed}
                onInspectGenetics={(b) => setInspectingBreed(b)}
              />
            ))}
          </div>
        ) : (
          <div className="cell-dark text-center py-20 px-8 space-y-4 max-w-lg mx-auto rounded-3xl border border-white/10">
            <div className="w-16 h-16 rounded-full bg-[#C4882A]/10 text-[#C4882A] flex items-center justify-center mx-auto text-2xl">
              <i className="bi bi-search" aria-hidden="true" />
            </div>
            <h3
              className="text-3xl font-light text-[#FBF7F0]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              No Breeds Found
            </h3>
            <p className="text-sm text-[#FBF7F0]/70">
              Try adjusting your search criteria or species filter.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedSpecies("all");
                  setSearchQuery("");
                }}
                className="btn-primary py-3 px-6 text-xs tracking-wider"
              >
                <i className="bi bi-arrow-clockwise" aria-hidden="true" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Genetics Modal */}
      <BreedGeneticsModal
        breed={inspectingBreed}
        onClose={() => setInspectingBreed(null)}
      />
    </section>
  );
}

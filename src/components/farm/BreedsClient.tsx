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

const speciesIcons: Record<string, string> = {
  Cattle: "ti-circle-dot",
  Goats: "ti-circle-dot",
  Sheep: "ti-circle-dot",
};

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
    <section className="bg-[#FBF7F0] pb-28 pt-6 relative">
      <div className="os-container relative z-10 space-y-12">

        {/* ── CONTROL BAR ── */}
        <div className="card-luxury p-6 sm:p-8 space-y-6">
          {/* Search + sort row */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <div className="relative flex-1">
              <i className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-[#8E5E16] text-lg pointer-events-none" />
              <input
                type="text"
                value={searchQuery === " " ? "" : searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by breed, purpose, or origin..."
                className="w-full bg-[#FAF6EE] border border-amber-900/15 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-[#1C1208] outline-none focus:border-[#C4882A] focus:ring-2 focus:ring-[#C4882A]/20 transition-all placeholder:text-stone-400"
              />
              {searchQuery.trim() !== "" && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                >
                  <i className="ti ti-x text-sm" />
                </button>
              )}
            </div>

            <div className="relative shrink-0 sm:w-64">
              <i className="ti ti-arrows-sort absolute left-4 top-1/2 -translate-y-1/2 text-[#C4882A] text-lg pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full appearance-none bg-[#FAF6EE] border border-amber-900/15 rounded-2xl py-3.5 pl-12 pr-10 text-xs font-mono font-bold uppercase tracking-wider text-[#1C1208] outline-none focus:border-[#C4882A] cursor-pointer transition-all"
              >
                <option value="name">Sort by Name</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="stock">Most Available</option>
              </select>
              <i className="ti ti-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-[#8E5E16] text-xs pointer-events-none" />
            </div>
          </div>

          {/* Species filter pills */}
          <div className="flex flex-wrap gap-2.5 items-center pt-2 border-t border-stone-100">
            <button
              onClick={() => setSelectedSpecies("all")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedSpecies === "all"
                  ? "bg-gradient-to-r from-[#C4882A] to-[#D99A30] text-white shadow-lg shadow-amber-900/20"
                  : "bg-[#FAF6EE] text-[#5C4835] border border-amber-900/15 hover:border-amber-900/30"
              }`}
            >
              <i className="ti ti-layout-grid text-sm" />
              <span>All Livestock</span>
              <span className="opacity-70 font-normal">({initialBreeds.length})</span>
            </button>

            {speciesList.map((sp) => {
              const count = initialBreeds.filter((b) => b.species.name === sp.name).length;
              const active = selectedSpecies.toLowerCase() === sp.name.toLowerCase();
              const icon = speciesIcons[sp.name] || "ti-circle";
              return (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpecies(sp.name)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-[#C4882A] to-[#D99A30] text-white shadow-lg shadow-amber-900/20"
                      : "bg-[#FAF6EE] text-[#5C4835] border border-amber-900/15 hover:border-amber-900/30"
                  }`}
                >
                  <i className={`ti ${icon} text-sm`} />
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors ml-auto"
              >
                <i className="ti ti-x text-xs" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>

          {/* Results count text */}
          <div className="flex items-center justify-between text-xs text-[#786550] font-mono pt-1">
            <span>
              Showing <strong className="text-[#C4882A] font-bold">{sorted.length}</strong> of {initialBreeds.length} breeds
              {selectedSpecies !== "all" && <span> &bull; <strong className="text-[#8E5E16]">{selectedSpecies}</strong></span>}
            </span>
          </div>
        </div>

        {/* ── BREED GRID (Spacious 3-column) ── */}
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
          <div className="card-luxury text-center py-20 px-8 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-[#C4882A] flex items-center justify-center mx-auto text-2xl">
              <i className="ti ti-search" />
            </div>
            <h3
              className="text-3xl font-light text-[#1C1208]"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              No Breeds Found
            </h3>
            <p className="text-sm text-[#5C4835]">
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
                <i className="ti ti-refresh" />
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


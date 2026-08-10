"use client";

import { useState } from "react";
import BreedCard from "./BreedCard";
import { Search, Filter, SlidersHorizontal, Sparkles } from "lucide-react";

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

  const filteredBreeds = initialBreeds.filter((breed) => {
    const matchesSpecies =
      selectedSpecies === "all" ||
      breed.species.name.toLowerCase() === selectedSpecies.toLowerCase();
    const matchesSearch =
      breed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breed.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breed.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecies && matchesSearch;
  });

  const sortedBreeds = [...filteredBreeds].sort((a, b) => {
    if (sortBy === "price-asc") return a.pricePerHead - b.pricePerHead;
    if (sortBy === "price-desc") return b.pricePerHead - a.pricePerHead;
    if (sortBy === "stock") return b.inStock - a.inStock;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Control Bar: Search, Species Tabs, Sorting */}
      <div className="bg-white border border-[#1C1208]/08 rounded-md p-4 sm:p-6 mb-10 store-card-shadow">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
          
          {/* Species Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedSpecies("all")}
              className={`px-4 py-2 rounded-xs text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedSpecies === "all"
                  ? "bg-[#C4882A] text-[#1C1208] shadow-[0_4px_14px_rgba(196,136,42,0.4)]"
                  : "bg-[#F5EFE4]/80 text-[#1C1208]/75 hover:bg-[#F5EFE4] hover:text-[#1C1208]"
              }`}
            >
              All Livestock ({initialBreeds.length})
            </button>
            {speciesList.map((sp) => {
              const count = initialBreeds.filter((b) => b.species.name === sp.name).length;
              const isSelected = selectedSpecies.toLowerCase() === sp.name.toLowerCase();
              return (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpecies(sp.name)}
                  className={`px-4 py-2 rounded-xs text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isSelected
                      ? "bg-[#C4882A] text-[#1C1208] shadow-[0_4px_14px_rgba(196,136,42,0.4)]"
                      : "bg-[#F5EFE4]/80 text-[#1C1208]/75 hover:bg-[#F5EFE4] hover:text-[#1C1208]"
                  }`}
                >
                  {sp.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C1208]/40" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search breed, purpose, traits..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FBF7F0] border border-[#1C1208]/15 rounded-xs text-xs text-[#1C1208] placeholder:text-[#1C1208]/40 focus:outline-none focus:border-[#C4882A] focus:ring-2 focus:ring-[#C4882A]/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="text-[#C4882A]" size={16} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-3.5 py-2.5 bg-[#FBF7F0] border border-[#1C1208]/15 rounded-xs text-xs text-[#1C1208] font-mono focus:outline-none focus:border-[#C4882A]"
              >
                <option value="name">Sort by Breed Name</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="stock">Highest Head Count</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#1C1208]/08">
        <h2 className="font-serif text-3xl text-[#1C1208] font-light">
          Displaying <span className="font-semibold text-[#C4882A]">{sortedBreeds.length}</span> genetic profiles
        </h2>
        {selectedSpecies !== "all" && (
          <span className="eyebrow-plain text-[#3D6B3E] bg-[#3D6B3E]/10 px-3.5 py-1.5 rounded-xs border border-[#3D6B3E]/20 text-[10px]">
            Active Filter: {selectedSpecies}
          </span>
        )}
      </div>

      {/* Grid */}
      {sortedBreeds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedBreeds.map((breed) => (
            <BreedCard key={breed.id} breed={breed} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white border border-dashed border-[#1C1208]/15 rounded-md p-8 store-card-shadow">
          <div className="text-5xl mb-4">🐂</div>
          <h3 className="font-serif text-3xl text-[#1C1208] font-light mb-2">No matching breeds found</h3>
          <p className="text-sm text-[#1C1208]/50 max-w-sm mx-auto mb-6">
            Try broadening your search term or selecting a different livestock species.
          </p>
          <button
            onClick={() => {
              setSelectedSpecies("all");
              setSearchQuery("");
            }}
            className="btn btn-primary btn-sm font-bold uppercase tracking-wider"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

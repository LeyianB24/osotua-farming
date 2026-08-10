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
      <div className="bg-white border border-[#1C1208]/08 rounded-md p-4 sm:p-6 mb-12 shadow-sm">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Species Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedSpecies("all")}
              className={`px-4 py-2 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors ${
                selectedSpecies === "all"
                  ? "bg-[#C4882A] text-[#1C1208] font-bold shadow-xs"
                  : "bg-[#F5EFE4]/60 text-[#1C1208]/70 hover:bg-[#F5EFE4]"
              }`}
            >
              All Livestock ({initialBreeds.length})
            </button>
            {speciesList.map((sp) => {
              const count = initialBreeds.filter((b) => b.species.name === sp.name).length;
              return (
                <button
                  key={sp.id}
                  onClick={() => setSelectedSpecies(sp.name)}
                  className={`px-4 py-2 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors ${
                    selectedSpecies.toLowerCase() === sp.name.toLowerCase()
                      ? "bg-[#C4882A] text-[#1C1208] font-bold shadow-xs"
                      : "bg-[#F5EFE4]/60 text-[#1C1208]/70 hover:bg-[#F5EFE4]"
                  }`}
                >
                  {sp.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1208]/35" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search breeds, traits, origin..."
                className="w-full pl-9 pr-4 py-2 bg-[#FBF7F0] border border-[#1C1208]/15 rounded-xs text-xs text-[#1C1208] placeholder:text-[#1C1208]/35 focus:outline-none focus:border-[#C4882A]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="text-[#1C1208]/40" size={15} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-3 py-2 bg-[#FBF7F0] border border-[#1C1208]/15 rounded-xs text-xs text-[#1C1208] font-mono focus:outline-none focus:border-[#C4882A]"
              >
                <option value="name">Sort by Name</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="stock">Highest Availability</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-[#1C1208] font-light">
          Showing <span className="font-semibold text-[#C4882A]">{sortedBreeds.length}</span> breed profiles
        </h2>
        {selectedSpecies !== "all" && (
          <span className="eyebrow-plain text-[#3D6B3E] bg-[#3D6B3E]/08 px-3 py-1 rounded-xs border border-[#3D6B3E]/20 text-[10px]">
            Filtered: {selectedSpecies}
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
        <div className="text-center py-24 bg-white border border-dashed border-[#1C1208]/15 rounded-md p-8">
          <div className="text-5xl mb-4">🐂</div>
          <h3 className="font-serif text-2xl text-[#1C1208] mb-2">No matching breeds found</h3>
          <p className="text-xs text-[#1C1208]/50 mb-6">
            Try adjusting your search criteria or species selection.
          </p>
          <button
            onClick={() => {
              setSelectedSpecies("all");
              setSearchQuery("");
            }}
            className="btn btn-primary btn-sm"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

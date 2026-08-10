"use client";

import { useState } from "react";
import BreedCard from "./BreedCard";

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
  Cattle: "bi-bullseye",
  Goats:  "bi-scissors",
  Sheep:  "bi-flower1",
};

export default function BreedsClient({ initialBreeds, speciesList }: Props) {
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all");
  const [searchQuery, setSearchQuery]         = useState<string>("");
  const [sortBy, setSortBy]                   = useState<"name" | "price-asc" | "price-desc" | "stock">("name");

  const filtered = initialBreeds.filter((b) => {
    const matchSp = selectedSpecies === "all" || b.species.name.toLowerCase() === selectedSpecies.toLowerCase();
    const matchQ  = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    b.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    b.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSp && matchQ;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc")  return a.pricePerHead - b.pricePerHead;
    if (sortBy === "price-desc") return b.pricePerHead - a.pricePerHead;
    if (sortBy === "stock")      return b.inStock - a.inStock;
    return a.name.localeCompare(b.name);
  });

  const hasFilters = selectedSpecies !== "all" || searchQuery !== "";

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>

      {/* ── CONTROL BAR ── */}
      <div style={{ marginBottom: "2.5rem" }}>

        {/* Search + sort row */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <i className="bi bi-search" style={{
              position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
              color: "rgba(28,18,8,0.35)", fontSize: "0.95rem", pointerEvents: "none",
            }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by breed, purpose, or origin..."
              className="os-input"
              style={{ paddingLeft: "2.75rem", paddingRight: searchQuery ? "2.5rem" : "1rem" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(28,18,8,0.4)", fontSize: "0.9rem",
                }}
              >
                <i className="bi bi-x-lg" />
              </button>
            )}
          </div>

          <div style={{ position: "relative", flexShrink: 0 }}>
            <i className="bi bi-sort-down" style={{
              position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)",
              color: "#C4882A", fontSize: "0.95rem", pointerEvents: "none",
            }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="os-input"
              style={{
                paddingLeft: "2.5rem", paddingRight: "2.25rem",
                appearance: "none", cursor: "pointer",
                minWidth: "180px", background: "#FFFFFF",
              }}
            >
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock">Most Available</option>
            </select>
            <i className="bi bi-chevron-down" style={{
              position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)",
              color: "rgba(28,18,8,0.4)", fontSize: "0.75rem", pointerEvents: "none",
            }} />
          </div>
        </div>

        {/* Species filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <button
            onClick={() => setSelectedSpecies("all")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.5rem 1rem",
              background: selectedSpecies === "all" ? "#1C1208" : "#FFFFFF",
              color: selectedSpecies === "all" ? "#C4882A" : "rgba(28,18,8,0.65)",
              border: selectedSpecies === "all" ? "1px solid #1C1208" : "1px solid rgba(28,18,8,0.15)",
              borderRadius: "2px",
              fontSize: "0.72rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.2s ease",
            }}
          >
            <i className="bi bi-collection" style={{ fontSize: "0.85rem" }} />
            All Livestock
            <span style={{ opacity: 0.5, fontWeight: 400 }}>({initialBreeds.length})</span>
          </button>

          {speciesList.map((sp) => {
            const count = initialBreeds.filter((b) => b.species.name === sp.name).length;
            const active = selectedSpecies.toLowerCase() === sp.name.toLowerCase();
            const icon = speciesIcons[sp.name] || "bi-geo-alt";
            return (
              <button
                key={sp.id}
                onClick={() => setSelectedSpecies(sp.name)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.5rem 1rem",
                  background: active ? "#C4882A" : "#FFFFFF",
                  color: active ? "#1C1208" : "rgba(28,18,8,0.65)",
                  border: active ? "1px solid #C4882A" : "1px solid rgba(28,18,8,0.15)",
                  borderRadius: "2px",
                  fontSize: "0.72rem", fontWeight: 600,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
              >
                <i className={`bi ${icon}`} style={{ fontSize: "0.85rem" }} />
                {sp.name}
                <span style={{ opacity: active ? 0.5 : 0.4, fontWeight: 400 }}>({count})</span>
              </button>
            );
          })}

          {hasFilters && (
            <button
              onClick={() => { setSelectedSpecies("all"); setSearchQuery(""); }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 0.875rem",
                background: "rgba(160,67,30,0.06)",
                color: "#A0431E",
                border: "1px solid rgba(160,67,30,0.2)",
                borderRadius: "2px",
                fontSize: "0.68rem", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer", transition: "all 0.2s ease",
              }}
            >
              <i className="bi bi-x-lg" style={{ fontSize: "0.7rem" }} />
              Clear Filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p style={{ color: "rgba(28,18,8,0.5)", fontSize: "0.82rem", marginTop: "1rem" }}>
          Showing <strong style={{ color: "#1C1208" }}>{sorted.length}</strong> of {initialBreeds.length} breeds
          {selectedSpecies !== "all" && (
            <span> · <span style={{ color: "#C4882A", fontWeight: 600 }}>{selectedSpecies}</span></span>
          )}
        </p>
      </div>

      {/* ── GRID ── */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sorted.map((breed) => (
            <BreedCard key={breed.id} breed={breed} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "5rem 0" }}>
          <i className="bi bi-search" style={{ fontSize: "3rem", color: "rgba(28,18,8,0.2)", display: "block", marginBottom: "1rem" }} />
          <h3 className="font-serif" style={{ fontSize: "1.8rem", fontWeight: 300, color: "#1C1208", marginBottom: "0.75rem" }}>
            No breeds found
          </h3>
          <p style={{ color: "rgba(28,18,8,0.5)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Try a different search term or species filter.
          </p>
          <button
            onClick={() => { setSelectedSpecies("all"); setSearchQuery(""); }}
            className="btn-primary"
          >
            Reset Filters
            <i className="bi bi-arrow-counterclockwise" />
          </button>
        </div>
      )}
    </div>
  );
}

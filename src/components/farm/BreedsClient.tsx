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
    <div
      className="bg-mesh-earth noise"
      style={{ padding: "4rem 0 6rem", position: "relative" }}
    >
      <div className="os-container relative" style={{ zIndex: 1 }}>

        {/* ── CONTROL BAR ── */}
        <div
          className="glass-dark"
          style={{ padding: "1.5rem", marginBottom: "2.5rem", borderRadius: "20px" }}
        >
          {/* Search + sort row */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
              <i
                className="bi bi-search"
                style={{
                  position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
                  color: "rgba(245,239,228,0.4)", fontSize: "0.9rem", pointerEvents: "none",
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by breed, purpose, or origin..."
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem 0.75rem 2.75rem",
                  fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
                  fontSize: "0.9rem",
                  color: "#F5EFE4",
                  outline: "none",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  paddingRight: searchQuery ? "2.5rem" : "1rem",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(196,136,42,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(196,136,42,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "";
                }}
              />
              {/* Placeholder color via injected CSS */}
              <style>{`input::placeholder { color: rgba(245,239,228,0.3); }`}</style>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(245,239,228,0.45)", fontSize: "0.85rem",
                  }}
                >
                  <i className="bi bi-x-lg" />
                </button>
              )}
            </div>

            <div style={{ position: "relative", flexShrink: 0 }}>
              <i
                className="bi bi-sort-down"
                style={{
                  position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)",
                  color: "#C4882A", fontSize: "0.9rem", pointerEvents: "none",
                }}
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                style={{
                  paddingLeft: "2.5rem",
                  paddingRight: "2.25rem",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                  appearance: "none",
                  cursor: "pointer",
                  minWidth: "180px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
                  fontSize: "0.85rem",
                  color: "#F5EFE4",
                  outline: "none",
                }}
              >
                <option value="name" style={{ background: "#1C1208" }}>Sort by Name</option>
                <option value="price-asc" style={{ background: "#1C1208" }}>Price: Low to High</option>
                <option value="price-desc" style={{ background: "#1C1208" }}>Price: High to Low</option>
                <option value="stock" style={{ background: "#1C1208" }}>Most Available</option>
              </select>
              <i
                className="bi bi-chevron-down"
                style={{
                  position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)",
                  color: "rgba(245,239,228,0.4)", fontSize: "0.75rem", pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Species filter pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <button
              onClick={() => setSelectedSpecies("all")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 1rem",
                background: selectedSpecies === "all" ? "rgba(196,136,42,0.2)" : "rgba(255,255,255,0.04)",
                color: selectedSpecies === "all" ? "#C4882A" : "rgba(245,239,228,0.55)",
                border: selectedSpecies === "all" ? "1px solid rgba(196,136,42,0.45)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "100px",
                fontSize: "0.65rem",
                fontFamily: "var(--font-space-grotesk), monospace",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <i className="bi bi-collection" style={{ fontSize: "0.8rem" }} />
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
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.45rem 1rem",
                    background: active ? "rgba(196,136,42,0.2)" : "rgba(255,255,255,0.04)",
                    color: active ? "#C4882A" : "rgba(245,239,228,0.55)",
                    border: active ? "1px solid rgba(196,136,42,0.45)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "100px",
                    fontSize: "0.65rem",
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className={`bi ${icon}`} style={{ fontSize: "0.8rem" }} />
                  {sp.name}
                  <span style={{ opacity: 0.5, fontWeight: 400 }}>({count})</span>
                </button>
              );
            })}

            {hasFilters && (
              <button
                onClick={() => { setSelectedSpecies("all"); setSearchQuery(""); }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.45rem 1rem",
                  background: "rgba(160,67,30,0.1)",
                  color: "#c55f3a",
                  border: "1px solid rgba(160,67,30,0.3)",
                  borderRadius: "100px",
                  fontSize: "0.62rem",
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <i className="bi bi-x-lg" style={{ fontSize: "0.7rem" }} />
                Clear Filters
              </button>
            )}
          </div>

          {/* Results count */}
          <p style={{ color: "rgba(245,239,228,0.4)", fontSize: "0.78rem", marginTop: "1rem", fontFamily: "var(--font-space-grotesk), monospace" }}>
            Showing{" "}
            <strong style={{ color: "#C4882A" }}>{sorted.length}</strong>
            {" "}of {initialBreeds.length} breeds
            {selectedSpecies !== "all" && (
              <span> · <span style={{ color: "#C4882A", fontWeight: 600 }}>{selectedSpecies}</span></span>
            )}
          </p>
        </div>

        {/* ── BREED GRID ── */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sorted.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        ) : (
          <div
            className="glass-dark"
            style={{ textAlign: "center", padding: "5rem 2rem", borderRadius: "20px" }}
          >
            <i
              className="bi bi-search"
              style={{ fontSize: "3rem", color: "rgba(196,136,42,0.3)", display: "block", marginBottom: "1.25rem" }}
            />
            <h3
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "2rem",
                fontWeight: 300,
                color: "#F5EFE4",
                marginBottom: "0.75rem",
              }}
            >
              No breeds found
            </h3>
            <p style={{ color: "rgba(245,239,228,0.5)", fontSize: "0.9rem", marginBottom: "2rem" }}>
              Try a different search term or species filter.
            </p>
            <button
              onClick={() => { setSelectedSpecies("all"); setSearchQuery(""); }}
              className="btn-primary"
            >
              <i className="bi bi-arrow-counterclockwise" />
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

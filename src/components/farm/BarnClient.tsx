"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useCart } from "@/components/shared/CartContext";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  image: string | null;
  inStock: boolean;
  featured: boolean;
  category: { id: string; name: string };
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

const categoryIcons: Record<string, string> = {
  "Beef Cuts":      "bi-basket3",
  "Dairy Products": "bi-droplet-fill",
  "Vegetables":     "bi-tree-fill",
  "Fruits":         "bi-flower1",
  "Ranch Box":      "bi-box-seam",
  "Goat Meat":      "bi-scissors",
  "Sheep Meat":     "bi-scissors",
};

interface Props {
  initialProducts: ProductItem[];
  categories: CategoryItem[];
}

export default function BarnClient({ initialProducts, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery]           = useState<string>("");
  const { cartCount, cartTotal }                = useCart();

  const filtered = initialProducts.filter((p) => {
    const matchCat =
      selectedCategory === "all" ||
      p.category.name.toLowerCase() === selectedCategory.toLowerCase() ||
      p.category.id === selectedCategory;
    const matchQ =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const hasFilters = selectedCategory !== "all" || searchQuery !== "";

  return (
    <div
      className="bg-mesh-earth noise"
      style={{ padding: "4rem 0 6rem", position: "relative" }}
    >
      <div className="os-container relative" style={{ zIndex: 1 }}>

        {/* ── CART BANNER ── */}
        {cartCount > 0 && (
          <div
            className="glass-gold"
            style={{
              padding: "1.25rem 1.75rem",
              marginBottom: "2rem",
              borderRadius: "16px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "44px", height: "44px", borderRadius: "10px",
                  background: "#C4882A", color: "#1C1208",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}
              >
                <i className="bi bi-bag-check-fill" style={{ fontSize: "1.2rem" }} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace",
                    fontSize: "0.65rem", fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "#C4882A",
                  }}
                >
                  {cartCount} {cartCount === 1 ? "item" : "items"} in your basket
                </div>
                <div style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.82rem" }}>
                  Subtotal: <strong style={{ color: "#F5EFE4" }}>KES {cartTotal.toLocaleString()}</strong>
                </div>
              </div>
            </div>
            <Link href="/cart" className="btn-primary" style={{ fontSize: "0.72rem", padding: "0.625rem 1.5rem" }}>
              <i className="bi bi-bag-check-fill" />
              View Cart
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        )}

        {/* ── CONTROL BAR ── */}
        <div
          className="glass-dark"
          style={{ padding: "1.5rem", marginBottom: "2.5rem", borderRadius: "20px" }}
        >
          {/* Search row */}
          <div style={{ position: "relative", marginBottom: "1.25rem" }}>
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
              placeholder="Search beef, dairy, vegetables..."
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

          {/* Category filter pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <button
              onClick={() => setSelectedCategory("all")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.45rem 1rem",
                background: selectedCategory === "all" ? "rgba(196,136,42,0.2)" : "rgba(255,255,255,0.04)",
                color: selectedCategory === "all" ? "#C4882A" : "rgba(245,239,228,0.55)",
                border: selectedCategory === "all" ? "1px solid rgba(196,136,42,0.45)" : "1px solid rgba(255,255,255,0.08)",
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
              <i className="bi bi-grid" style={{ fontSize: "0.8rem" }} />
              All Products
              <span style={{ opacity: 0.5, fontWeight: 400 }}>({initialProducts.length})</span>
            </button>

            {categories.map((cat) => {
              const count  = initialProducts.filter((p) => p.category.id === cat.id).length;
              const active = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              const icon   = categoryIcons[cat.name] || "bi-bag";
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
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
                  {cat.name}
                  <span style={{ opacity: active ? 0.5 : 0.4, fontWeight: 400 }}>({count})</span>
                </button>
              );
            })}

            {hasFilters && (
              <button
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
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
            <strong style={{ color: "#C4882A" }}>{filtered.length}</strong>
            {" "}of {initialProducts.length} products
            {selectedCategory !== "all" && (
              <span> · <span style={{ color: "#C4882A", fontWeight: 600 }}>{selectedCategory}</span></span>
            )}
          </p>
        </div>

        {/* ── PRODUCT GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} dark />
            ))}
          </div>
        ) : (
          <div
            className="glass-dark"
            style={{ textAlign: "center", padding: "5rem 2rem", borderRadius: "20px" }}
          >
            <i
              className="bi bi-bag-x"
              style={{ fontSize: "3rem", color: "rgba(196,136,42,0.3)", display: "block", marginBottom: "1.25rem" }}
            />
            <h3
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                fontSize: "2rem", fontWeight: 300,
                color: "#F5EFE4", marginBottom: "0.75rem",
              }}
            >
              No products found
            </h3>
            <p style={{ color: "rgba(245,239,228,0.5)", fontSize: "0.9rem", marginBottom: "2rem" }}>
              Try a different search or category filter.
            </p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="btn-primary"
            >
              <i className="bi bi-arrow-counterclockwise" />
              Show All Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

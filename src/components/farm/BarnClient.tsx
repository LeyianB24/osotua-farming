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
  "Beef Cuts":      "bi-basket",
  "Dairy Products": "bi-droplet",
  "Vegetables":     "bi-tree",
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
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>

      {/* ── CART BANNER ── */}
      {cartCount > 0 && (
        <div
          className="reveal"
          style={{
            background: "#1C1208",
            border: "1px solid rgba(196,136,42,0.25)",
            borderRadius: "4px",
            padding: "1.25rem 1.5rem",
            marginBottom: "2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "2px",
              background: "#C4882A", color: "#1C1208",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <i className="bi bi-bag-check" style={{ fontSize: "1.25rem" }} />
            </div>
            <div>
              <div style={{ color: "#C4882A", fontWeight: 600, fontSize: "0.85rem" }}>
                {cartCount} {cartCount === 1 ? "item" : "items"} in your basket
              </div>
              <div style={{ color: "rgba(245,239,228,0.55)", fontSize: "0.8rem" }}>
                Subtotal: <strong style={{ color: "#F5EFE4" }}>KES {cartTotal.toLocaleString()}</strong>
              </div>
            </div>
          </div>
          <Link href="/cart" className="btn-primary" style={{ fontSize: "0.72rem", padding: "0.625rem 1.25rem" }}>
            <i className="bi bi-bag-check" />
            Proceed to Checkout
          </Link>
        </div>
      )}

      {/* ── CONTROLS ── */}
      <div style={{ marginBottom: "2.5rem" }}>
        {/* Search */}
        <div style={{ position: "relative", marginBottom: "1.25rem" }}>
          <i className="bi bi-search" style={{
            position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
            color: "rgba(28,18,8,0.35)", fontSize: "0.95rem", pointerEvents: "none",
          }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search beef, dairy, vegetables..."
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

        {/* Category filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <button
            onClick={() => setSelectedCategory("all")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.5rem 1rem",
              background: selectedCategory === "all" ? "#1C1208" : "#FFFFFF",
              color: selectedCategory === "all" ? "#C4882A" : "rgba(28,18,8,0.65)",
              border: selectedCategory === "all" ? "1px solid #1C1208" : "1px solid rgba(28,18,8,0.15)",
              borderRadius: "2px",
              fontSize: "0.72rem", fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.2s ease",
            }}
          >
            <i className="bi bi-grid" style={{ fontSize: "0.85rem" }} />
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
                padding: "0.5rem 0.875rem",
                background: "rgba(160,67,30,0.06)",
                color: "#A0431E",
                border: "1px solid rgba(160,67,30,0.2)",
                borderRadius: "2px",
                fontSize: "0.68rem", fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-x-lg" style={{ fontSize: "0.7rem" }} />
              Clear
            </button>
          )}
        </div>

        {/* Results count */}
        <p style={{ color: "rgba(28,18,8,0.5)", fontSize: "0.82rem", marginTop: "1rem" }}>
          Showing <strong style={{ color: "#1C1208" }}>{filtered.length}</strong> of {initialProducts.length} products
          {selectedCategory !== "all" && (
            <span> · <span style={{ color: "#C4882A", fontWeight: 600 }}>{selectedCategory}</span></span>
          )}
        </p>
      </div>

      {/* ── PRODUCT GRID ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "5rem 0" }}>
          <i className="bi bi-bag-x" style={{ fontSize: "3rem", color: "rgba(28,18,8,0.2)", display: "block", marginBottom: "1rem" }} />
          <h3 className="font-serif" style={{ fontSize: "1.8rem", fontWeight: 300, color: "#1C1208", marginBottom: "0.75rem" }}>
            No products found
          </h3>
          <p style={{ color: "rgba(28,18,8,0.5)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Try a different search or category filter.
          </p>
          <button
            onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
            className="btn-primary"
          >
            Show All Items
            <i className="bi bi-arrow-counterclockwise" />
          </button>
        </div>
      )}
    </div>
  );
}

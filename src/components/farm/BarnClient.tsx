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

interface Props {
  initialProducts: ProductItem[];
  categories: CategoryItem[];
}

export default function BarnClient({ initialProducts, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { cartCount, cartTotal } = useCart();

  const queryTrimmed = searchQuery.trim().toLowerCase();

  const filtered = initialProducts.filter((p) => {
    const matchCat =
      selectedCategory === "all" ||
      p.category.name.toLowerCase() === selectedCategory.toLowerCase() ||
      p.category.id === selectedCategory;
    const matchQ =
      queryTrimmed === "" ||
      p.name.toLowerCase().includes(queryTrimmed) ||
      p.category.name.toLowerCase().includes(queryTrimmed);
    return matchCat && matchQ;
  });

  const hasFilters = selectedCategory !== "all" || queryTrimmed !== "";

  return (
    <section className="bg-[#F5F0E8] text-[#1C1208] pb-32 pt-8 relative">
      <div className="os-container relative z-10 space-y-12">

        {/* ── CART ACTIVE BANNER ── */}
        {cartCount > 0 && (
          <div
            className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#FAF7F2] border border-[#C99A2E] shadow-lg"
            style={{ borderRadius: "2px" }}
          >
            <div className="flex items-center gap-5">
              <div
                className="w-12 h-12 text-[#1C1208] flex items-center justify-center shrink-0 text-2xl shadow-sm"
                style={{ backgroundColor: "#C99A2E", borderRadius: "2px" }}
              >
                <i className="bi bi-bag-check-fill" />
              </div>
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-[0.16em]"
                  style={{ color: "#8E7E70", fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  {cartCount} {cartCount === 1 ? "Item" : "Items"} in Your Basket
                </div>
                <div className="text-base text-[#1C1208] mt-0.5">
                  Subtotal:{" "}
                  <strong
                    className="text-xl font-bold"
                    style={{
                      color: "#C4602A",
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    KES {cartTotal.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            <Link
              href="/cart"
              className="btn-gold"
              style={{
                borderRadius: "2px",
                padding: "0.85rem 2rem",
                fontSize: "0.78rem",
                letterSpacing: "0.14em",
                fontWeight: 700,
                textTransform: "uppercase",
                backgroundColor: "#C99A2E",
                color: "#1C1208",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="bi bi-bag" />
              <span>VIEW BASKET &amp; CHECKOUT</span>
              <i className="bi bi-arrow-right text-xs" />
            </Link>
          </div>
        )}

        {/* ── CONTROL BAR ── */}
          <div
          className="os-panel space-y-6"
          style={{ borderRadius: "2px" }}
        >
          {/* Search row */}
          <div className="relative">
            <i
              className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-[#8E7E70] text-sm pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search beef cuts, fresh dairy, organic vegetables..."
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

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2.5 items-center pt-2 border-t border-[#E8E0D2]">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#1C1208] text-[#F5F0E8] border border-[#1C1208]"
                  : "bg-white text-[#1C1208] border border-[#D4C9B0] hover:border-[#C99A2E]"
              }`}
              style={{ borderRadius: "2px", fontFamily: "var(--font-source-sans), sans-serif" }}
            >
              <span>All Provisions</span>
              <span className={`text-[10px] ${selectedCategory === "all" ? "text-[#C99A2E]" : "text-[#8E7E70]"}`}>
                ({initialProducts.length})
              </span>
            </button>

            {categories.map((cat) => {
              const count = initialProducts.filter(
                (p) => p.category.name.toLowerCase() === cat.name.toLowerCase() || p.category.id === cat.id
              ).length;
              const active =
                selectedCategory.toLowerCase() === cat.name.toLowerCase() || selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#1C1208] text-[#F5F0E8] border border-[#1C1208]"
                      : "bg-white text-[#1C1208] border border-[#D4C9B0] hover:border-[#C99A2E]"
                  }`}
                  style={{ borderRadius: "2px", fontFamily: "var(--font-source-sans), sans-serif" }}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] ${active ? "text-[#C99A2E]" : "text-[#8E7E70]"}`}>
                    ({count})
                  </span>
                </button>
              );
            })}

            {hasFilters && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
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
            Showing <strong className="text-[#1C1208]">{filtered.length}</strong> farm provisions
          </span>
          <span>100% Traceable · Kajiado Pastures</span>
        </div>

        {/* ── PRODUCT GRID ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 bg-[#FAF7F2] border border-[#D4C9B0] space-y-4"
            style={{ borderRadius: "2px" }}
          >
            <i className="bi bi-basket text-4xl text-[#C99A2E]" aria-hidden="true" />
            <h3
              className="font-serif text-2xl text-[#1C1208] font-semibold"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              No harvest provisions found
            </h3>
            <p className="text-sm text-[#8E7E70] max-w-md mx-auto">
              We could not find any products matching your current filters. Try selecting another category or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
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
    </section>
  );
}

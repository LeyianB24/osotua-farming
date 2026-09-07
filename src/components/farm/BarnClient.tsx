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
  "Beef Cuts": "ti-meat",
  "Dairy Products": "ti-cup",
  "Vegetables": "ti-plant",
  "Fruits": "ti-apple",
  "Ranch Box": "ti-box",
  "Goat Meat": "ti-meat",
  "Sheep Meat": "ti-meat",
};

interface Props {
  initialProducts: ProductItem[];
  categories: CategoryItem[];
}

export default function BarnClient({ initialProducts, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
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
    <section className="bg-[#FBF7F0] pb-28 pt-6 relative">
      <div className="os-container relative z-10 space-y-12">

        {/* ── CART ACTIVE BANNER ── */}
        {cartCount > 0 && (
          <div className="card-luxury p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white via-[#FAF6EE] to-white border-amber-500/40 shadow-xl">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#C4882A] to-[#D99A30] text-white flex items-center justify-center shrink-0 text-2xl shadow-lg shadow-amber-900/20">
                <i className="ti ti-shopping-bag-check" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#8E5E16]">
                  {cartCount} {cartCount === 1 ? "Item" : "Items"} in Your Basket
                </div>
                <div className="text-base text-[#5C4835] mt-0.5">
                  Subtotal: <strong className="text-xl text-[#1C1208] font-serif font-bold">KES {cartTotal.toLocaleString()}</strong>
                </div>
              </div>
            </div>

            <Link href="/cart" className="btn-primary py-3.5 px-8 text-xs tracking-widest shadow-xl">
              <i className="ti ti-shopping-bag" />
              <span>VIEW BASKET &amp; CHECKOUT</span>
              <i className="ti ti-arrow-right" />
            </Link>
          </div>
        )}

        {/* ── CONTROL BAR ── */}
        <div className="card-luxury p-6 sm:p-8 space-y-6">
          {/* Search row */}
          <div className="relative">
            <i className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-[#8E5E16] text-lg pointer-events-none" />
            <input
              type="text"
              value={searchQuery === " " ? "" : searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search beef cuts, fresh dairy, organic vegetables..."
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

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2.5 items-center pt-2 border-t border-stone-100">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-[#C4882A] to-[#D99A30] text-white shadow-lg shadow-amber-900/20"
                  : "bg-[#FAF6EE] text-[#5C4835] border border-amber-900/15 hover:border-amber-900/30"
              }`}
            >
              <i className="ti ti-layout-grid text-sm" />
              <span>All Products</span>
              <span className="opacity-70 font-normal">({initialProducts.length})</span>
            </button>

            {categories.map((cat) => {
              const count = initialProducts.filter((p) => p.category.id === cat.id).length;
              const active = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              const icon = categoryIcons[cat.name] || "ti-circle";
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-[#C4882A] to-[#D99A30] text-white shadow-lg shadow-amber-900/20"
                      : "bg-[#FAF6EE] text-[#5C4835] border border-amber-900/15 hover:border-amber-900/30"
                  }`}
                >
                  <i className={`ti ${icon} text-sm`} />
                  <span>{cat.name}</span>
                  <span className="opacity-70 font-normal">({count})</span>
                </button>
              );
            })}

            {hasFilters && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
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
              Showing <strong className="text-[#C4882A] font-bold">{filtered.length}</strong> of {initialProducts.length} items
              {selectedCategory !== "all" && <span> &bull; <strong className="text-[#8E5E16]">{selectedCategory}</strong></span>}
            </span>
          </div>
        </div>

        {/* ── PRODUCT GRID (Spacious 3-column) ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} dark={false} />
            ))}
          </div>
        ) : (
          <div className="card-luxury text-center py-20 px-8 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-[#C4882A] flex items-center justify-center mx-auto text-2xl">
              <i className="ti ti-basket-off" />
            </div>
            <h3
              className="text-3xl font-light text-[#1C1208]"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              No Products Found
            </h3>
            <p className="text-sm text-[#5C4835]">
              Try adjusting your search query or product category filter.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="btn-primary py-3 px-6 text-xs tracking-wider"
              >
                <i className="ti ti-refresh" />
                <span>Show All Items</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

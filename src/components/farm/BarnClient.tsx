"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
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

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCat =
      selectedCategory === "all" ||
      product.category.name.toLowerCase() === selectedCategory.toLowerCase() ||
      product.category.id === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Control Panel: Search & Category Filter Bar */}
      <div className="bg-white border border-[#1C1208]/08 rounded-md p-4 sm:p-6 mb-10 store-card-shadow">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xs text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-[#C4882A] text-[#1C1208] shadow-[0_4px_14px_rgba(196,136,42,0.4)] scale-102"
                  : "bg-[#F5EFE4]/80 text-[#1C1208]/75 hover:bg-[#F5EFE4] hover:text-[#1C1208]"
              }`}
            >
              All Items ({initialProducts.length})
            </button>
            {categories.map((cat) => {
              const count = initialProducts.filter((p) => p.category.id === cat.id).length;
              const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-xs text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isSelected
                      ? "bg-[#C4882A] text-[#1C1208] shadow-[0_4px_14px_rgba(196,136,42,0.4)] scale-102"
                      : "bg-[#F5EFE4]/80 text-[#1C1208]/75 hover:bg-[#F5EFE4] hover:text-[#1C1208]"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C1208]/40" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search beef, dairy, fruits, vegetables..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FBF7F0] border border-[#1C1208]/15 rounded-xs text-xs text-[#1C1208] placeholder:text-[#1C1208]/40 focus:outline-none focus:border-[#C4882A] focus:ring-2 focus:ring-[#C4882A]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Sticky Cart Summary Banner */}
      {cartCount > 0 && (
        <div className="mb-10 p-4 sm:p-5 bg-gradient-to-r from-[#1C1208] via-[#251A0E] to-[#1C1208] text-[#F5EFE4] rounded-md border border-[#C4882A]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#C4882A] text-[#1C1208] flex items-center justify-center font-bold shadow-[0_0_15px_rgba(196,136,42,0.5)]">
              <ShoppingBag size={20} />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-[#C4882A] uppercase tracking-wider">
                {cartCount} {cartCount === 1 ? "Item" : "Items"} ready in your basket
              </div>
              <div className="text-xs text-[#F5EFE4]/80 mt-0.5">
                Subtotal: <span className="font-bold text-white text-sm">KES {cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <Link
            href="/cart"
            className="btn btn-primary btn-sm px-5 py-2.5 font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
          >
            Review Cart & Checkout →
          </Link>
        </div>
      )}

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white border border-dashed border-[#1C1208]/15 rounded-md p-8 store-card-shadow">
          <div className="text-5xl mb-4">🌿</div>
          <h3 className="font-serif text-3xl text-[#1C1208] font-light mb-2">No produce found</h3>
          <p className="text-sm text-[#1C1208]/50 max-w-sm mx-auto mb-6">
            We couldn&apos;t find any farm items matching your current filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="btn btn-primary btn-sm font-bold uppercase tracking-wider"
          >
            Show All Items
          </button>
        </div>
      )}
    </div>
  );
}

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
      {/* Search & Category Filter Bar */}
      <div className="bg-white border border-[#1C1208]/08 rounded-md p-4 sm:p-6 mb-12 shadow-sm">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xs text-xs font-mono uppercase tracking-wider transition-all ${
                selectedCategory === "all"
                  ? "bg-[#C4882A] text-[#1C1208] font-bold shadow-xs"
                  : "bg-[#F5EFE4]/60 text-[#1C1208]/70 hover:bg-[#F5EFE4]"
              }`}
            >
              All Items ({initialProducts.length})
            </button>
            {categories.map((cat) => {
              const count = initialProducts.filter((p) => p.category.id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-xs text-xs font-mono uppercase tracking-wider transition-all ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? "bg-[#C4882A] text-[#1C1208] font-bold shadow-xs"
                      : "bg-[#F5EFE4]/60 text-[#1C1208]/70 hover:bg-[#F5EFE4]"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1208]/35" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search beef, dairy, produce..."
              className="w-full pl-9 pr-4 py-2 bg-[#FBF7F0] border border-[#1C1208]/15 rounded-xs text-xs text-[#1C1208] placeholder:text-[#1C1208]/35 focus:outline-none focus:border-[#C4882A]"
            />
          </div>
        </div>
      </div>

      {/* Cart Summary Banner if items in cart */}
      {cartCount > 0 && (
        <div className="mb-8 p-4 bg-[#1C1208] text-[#F5EFE4] rounded-md border border-[#C4882A]/30 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C4882A] text-[#1C1208] flex items-center justify-center font-bold">
              <ShoppingBag size={18} />
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-[#C4882A]">
                {cartCount} {cartCount === 1 ? "Item" : "Items"} in your basket
              </div>
              <div className="text-xs text-[#F5EFE4]/70">
                Subtotal: <span className="font-semibold text-white">KES {cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <Link
            href="/cart"
            className="btn btn-primary btn-sm"
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
        <div className="text-center py-24 bg-white border border-dashed border-[#1C1208]/15 rounded-md p-8">
          <div className="text-5xl mb-4">🌿</div>
          <h3 className="font-serif text-2xl text-[#1C1208] mb-2">No produce found</h3>
          <p className="text-xs text-[#1C1208]/50 mb-6">
            We couldn&apos;t find any products matching your search term.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="btn btn-primary btn-sm"
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
}

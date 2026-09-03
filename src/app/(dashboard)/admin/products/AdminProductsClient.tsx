"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminSection, AdminTable, AdminRow, TD } from "@/components/shared/AdminSection";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  stockQty: number;
  inStock: boolean;
  featured: boolean;
  image?: string | null;
  category: { id: string; name: string };
}

export default function AdminProductsClient({ initialProducts }: { initialProducts: ProductItem[] }) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const categories = Array.from(new Set(products.map((p) => p.category.name)));

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.category.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || p.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleStock = async (product: ProductItem) => {
    setUpdatingId(product.id);
    const nextInStock = !product.inStock;
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: nextInStock }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, inStock: nextInStock } : p))
        );
      } else {
        alert("Failed to update stock status");
      }
    } catch {
      alert("Network error updating stock");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (product: ProductItem) => {
    if (!confirm(`Are you sure you want to permanently delete "${product.name}"?`)) return;
    setUpdatingId(product.id);
    try {
      const res = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
      } else {
        alert("Failed to delete product");
      }
    } catch {
      alert("Network error deleting product");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Product Name", "Slug", "Category", "Price KES", "Unit", "Stock Qty", "In Stock", "Featured"];
    const rows = products.map((p) => [
      `"${p.name.replace(/"/g, '""')}"`,
      p.slug,
      `"${p.category.name}"`,
      p.price,
      p.unit,
      p.stockQty,
      p.inStock ? "YES" : "NO",
      p.featured ? "YES" : "NO",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `osotua_products_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminSection
      eyebrow="Barn Store Inventory"
      title="Product Catalogue"
      count={products.length}
      countLabel="products listed"
      icon="bi-basket3-fill"
      action={
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="btn-ghost text-xs py-2.5 px-3.5 flex items-center gap-1.5"
            style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
          >
            <i className="bi bi-file-earmark-spreadsheet" />
            <span>Export CSV</span>
          </button>
          <Link
            href="/admin/products/new"
            className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5 shadow-sm"
          >
            <i className="bi bi-plus-lg" />
            <span>Add New Product</span>
          </Link>
        </div>
      }
    >
      {/* Search and Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:max-w-xs">
          <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E5E16] text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title or cut..."
            className="w-full bg-[#FFFFFF] border border-[#C4882A]/25 rounded-xl pl-9 pr-4 py-2 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              selectedCategory === "ALL"
                ? "bg-[#C4882A] text-[#FFFFFF]"
                : "bg-[#FFFFFF] text-[#786550] border border-[#C4882A]/20 hover:border-[#C4882A]/50"
            }`}
          >
            All Categories ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#C4882A] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#786550] border border-[#C4882A]/20 hover:border-[#C4882A]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AdminTable
        headers={["Product", "Category", "Price (KES)", "Stock Count", "Availability", "Featured", "Actions"]}
        empty={filtered.length === 0}
        emptyIcon="bi-basket"
        emptyText="No products found matching the criteria."
      >
        {filtered.map((p, i) => (
          <AdminRow key={p.id} index={i}>
            <td style={{ padding: "0.85rem 1.25rem" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EB] border border-[#C4882A]/20 relative overflow-hidden shrink-0 flex items-center justify-center text-[#C4882A]">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  ) : (
                    <i className="bi bi-box-seam text-lg" />
                  )}
                </div>
                <div>
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="font-bold text-xs text-[#1C1208] hover:text-[#C4882A] transition-colors block"
                  >
                    {p.name}
                  </Link>
                  <span className="font-mono text-[10px] text-[#786550] block">/barn/{p.slug}</span>
                </div>
              </div>
            </td>

            <TD muted>{p.category.name}</TD>

            <TD mono accent>
              KES {p.price.toLocaleString()}
              <span className="text-[10px] text-[#786550] ml-1 font-normal">/{p.unit}</span>
            </TD>

            <td style={{ padding: "0.85rem 1.25rem" }}>
              <span
                className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                  p.stockQty <= 5
                    ? "bg-[#FEF2F2] text-[#DC2626] border border-[#FCA5A5]"
                    : "bg-[#FAF5EB] text-[#1C1208] border border-[#C4882A]/20"
                }`}
              >
                {p.stockQty} {p.unit}
              </span>
            </td>

            <td style={{ padding: "0.85rem 1.25rem" }}>
              <button
                disabled={updatingId === p.id}
                onClick={() => handleToggleStock(p)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  p.inStock
                    ? "bg-[#2E7D32]/12 border border-[#2E7D32]/35 text-[#2E7D32] hover:bg-[#2E7D32]/20"
                    : "bg-[#DC2626]/12 border border-[#DC2626]/35 text-[#DC2626] hover:bg-[#DC2626]/20"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? "bg-[#2E7D32]" : "bg-[#DC2626]"}`} />
                <span>{p.inStock ? "In Stock" : "Sold Out"}</span>
              </button>
            </td>

            <td style={{ padding: "0.85rem 1.25rem" }}>
              {p.featured ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#8E5E16] bg-[#C4882A]/15 border border-[#C4882A]/30 px-2 py-0.5 rounded-md">
                  <i className="bi bi-star-fill text-[#C4882A]" /> Featured
                </span>
              ) : (
                <span className="text-[10px] font-mono text-[#786550]">—</span>
              )}
            </td>

            <td style={{ padding: "0.85rem 1.25rem" }}>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="px-2.5 py-1 text-xs font-mono font-bold text-[#8E5E16] bg-[#C4882A]/12 border border-[#C4882A]/30 rounded-lg hover:bg-[#C4882A]/25 transition-colors"
                  title="Edit Product Details"
                >
                  <i className="bi bi-pencil mr-1" />
                  Edit
                </Link>
                <button
                  disabled={updatingId === p.id}
                  onClick={() => handleDelete(p)}
                  className="px-2 py-1 text-xs font-mono font-bold text-[#DC2626] bg-[#FEF2F2] border border-[#FCA5A5] rounded-lg hover:bg-[#FEE2E2] transition-colors"
                  title="Delete Product"
                >
                  <i className="bi bi-trash3" />
                </button>
              </div>
            </td>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  );
}

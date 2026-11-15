"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/shared/CartContext";

export default function MobileCartBar() {
  const pathname = usePathname();
  const { cartCount, cartTotal } = useCart();

  // Hide if cart is empty or already on cart/checkout/admin pages
  if (cartCount === 0) return null;
  if (
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname?.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden border-t border-[#C99A2E]/40 bg-[#1C1208]/95 backdrop-blur-lg px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between gap-3">
        <Link href="/cart" className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 rounded-[2px] bg-[#C99A2E] text-[#1C1208] flex items-center justify-center text-sm font-bold shrink-0">
            <i className="bi bi-bag-fill" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1C1208] text-[9px] font-mono text-[#C99A2E] border border-[#C99A2E]">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </div>

          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase font-bold text-[#C99A2E] truncate">
              {cartCount} {cartCount === 1 ? "Item" : "Items"} in Basket
            </div>
            <div className="font-mono text-xs font-bold text-[#F5F0E8] truncate">
              KES {cartTotal.toLocaleString()}
            </div>
          </div>
        </Link>

        <Link
          href="/checkout"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C99A2E] hover:bg-[#D9AA3E] text-[#1C1208] font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] shrink-0 shadow-sm"
        >
          <span>Checkout</span>
          <i className="bi bi-arrow-right text-[11px]" />
        </Link>
      </div>
    </div>
  );
}

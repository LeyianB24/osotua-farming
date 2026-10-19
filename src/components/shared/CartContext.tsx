"use client";

import React, {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useCallback,
  useRef,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  image?: string | null;
  quantity: number;
  categoryName?: string;
  type: "product" | "breed";
}

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: "success" | "info" | "warning";
}

interface CartContextType {
  cart: CartItem[];
  isHydrated: boolean;
  addToCart: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const EMPTY_CART: CartItem[] = [];
let cachedCartString: string | null = null;
let cachedCartItems: CartItem[] = EMPTY_CART;

function subscribeToCart(callback: () => void) {
  const handler = () => callback();
  window.addEventListener("osotua_cart_change", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("osotua_cart_change", handler);
    window.removeEventListener("storage", handler);
  };
}

function getCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = localStorage.getItem("osotua_cart");
    if (!raw) {
      cachedCartString = null;
      cachedCartItems = EMPTY_CART;
      return EMPTY_CART;
    }
    if (raw === cachedCartString) {
      return cachedCartItems;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cachedCartString = raw;
      cachedCartItems = parsed;
      return cachedCartItems;
    }
  } catch {
    // fallback
  }
  return EMPTY_CART;
}

function getServerCartSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function subscribeHydration() {
  return () => {};
}
function getClientHydrationSnapshot() {
  return true;
}
function getServerHydrationSnapshot() {
  return false;
}

function persistCart(items: CartItem[]) {
  try {
    cachedCartItems = items;
    cachedCartString = JSON.stringify(items);
    localStorage.setItem("osotua_cart", cachedCartString);
    window.dispatchEvent(new CustomEvent("osotua_cart_change"));
  } catch {
    // ignore quota/disabled errors
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const toastIdRef = useRef(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Instant zero-lag hydration using React's useSyncExternalStore
  const cart = useSyncExternalStore(subscribeToCart, getCartSnapshot, getServerCartSnapshot);
  const isHydrated = useSyncExternalStore(subscribeHydration, getClientHydrationSnapshot, getServerHydrationSnapshot);

  const addToast = useCallback(
    (title: string, message: string, type: "success" | "info" | "warning" = "success") => {
      toastIdRef.current += 1;
      const id = `toast-${toastIdRef.current}`;
      setToasts((prev) => [...prev, { id, title, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity">, qty = 1) => {
      const current = getCartSnapshot();
      const existing = current.find((i) => i.id === item.id);
      let updated: CartItem[];
      if (existing) {
        updated = current.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
        );
      } else {
        updated = [...current, { ...item, quantity: qty }];
      }
      persistCart(updated);
      addToast("Added to Cart", `${qty}× ${item.name} added to your ranch basket.`, "success");
    },
    [addToast]
  );

  const removeFromCart = useCallback(
    (id: string) => {
      const current = getCartSnapshot();
      const item = current.find((i) => i.id === id);
      if (item) {
        addToast("Removed", `${item.name} removed from cart.`, "info");
      }
      persistCart(current.filter((i) => i.id !== id));
    },
    [addToast]
  );

  const updateQuantity = useCallback((id: string, delta: number) => {
    const current = getCartSnapshot();
    const updated = current
      .map((i) => {
        if (i.id === id) {
          const newQty = i.quantity + delta;
          return newQty > 0 ? { ...i, quantity: newQty } : null;
        }
        return i;
      })
      .filter(Boolean) as CartItem[];
    persistCart(updated);
  }, []);

  const clearCart = useCallback(() => {
    persistCart([]);
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isHydrated,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

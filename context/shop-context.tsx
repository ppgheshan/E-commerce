"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { CartItem, Order, Product } from "@/types";

type ShopContextType = {
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
  placeOrder: (order: Order) => void;
  clearCart: () => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [wishlist, setWishlist] = useLocalStorage<Product[]>("wishlist", []);
  const [orders, setOrders] = useLocalStorage<Order[]>("orders", []);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...prev, { product, quantity, size, color }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)));
  };

  const removeFromCart = (productId: number) => setCart((prev) => prev.filter((item) => item.product.id !== productId));

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product],
    );
  };

  const placeOrder = (order: Order) => setOrders((prev) => [order, ...prev]);
  const clearCart = () => setCart([]);

  return (
    <ShopContext.Provider
      value={{ cart, wishlist, orders, addToCart, updateQuantity, removeFromCart, toggleWishlist, placeOrder, clearCart }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
};

"use client";

import Link from "next/link";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useShop } from "@/context/shop-context";

export function Navbar() {
  const { cart, wishlist } = useShop();
  const cartCount = cart.reduce((a, c) => a + c.quantity, 0);
  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <div className="container flex items-center gap-4 py-3">
        <Link href="/" className="text-xl font-bold">ShopNova</Link>
        <nav className="hidden gap-4 text-sm md:flex">
          <Link href="/shop">Shop</Link>
          <Link href="/orders">Orders</Link>
        </nav>
        <div className="relative ml-auto hidden w-full max-w-sm md:block">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-8" />
        </div>
        <ThemeToggle />
        <Link href="/cart" className="relative rounded-md border p-2"><ShoppingCart className="h-4 w-4" /><span className="absolute -right-2 -top-2 rounded-full bg-primary px-1 text-xs text-primary-foreground">{cartCount}</span></Link>
        <button className="relative rounded-md border p-2"><Heart className="h-4 w-4" /><span className="absolute -right-2 -top-2 rounded-full bg-primary px-1 text-xs text-primary-foreground">{wishlist.length}</span></button>
      </div>
    </header>
  );
}

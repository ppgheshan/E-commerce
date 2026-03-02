"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currency } from "@/lib/utils";
import { useShop } from "@/context/shop-context";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist } = useShop();
  return (
    <Card className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/product/${product.slug}`}>
        <div className="relative h-56 w-full">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        </div>
      </Link>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <div className="flex items-center gap-1 text-amber-500"><Star className="h-4 w-4 fill-current" />{product.rating}</div>
        <div className="flex items-center gap-2"><span className="font-bold">{currency(product.price)}</span><span className="text-sm text-muted-foreground line-through">{currency(product.oldPrice)}</span></div>
        <div className="flex gap-2">
          <Button className="flex-1" onClick={() => { addToCart(product); toast.success("Added to cart"); }}>Quick Add</Button>
          <Button className="bg-secondary text-secondary-foreground" onClick={() => toggleWishlist(product)}><Heart className="h-4 w-4" /></Button>
        </div>
      </div>
    </Card>
  );
}

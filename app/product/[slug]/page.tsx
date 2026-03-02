"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { allProducts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-card";
import { currency } from "@/lib/utils";
import { useShop } from "@/context/shop-context";

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = useMemo(() => allProducts.find((p) => p.slug === slug), [slug]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Black");
  const { addToCart } = useShop();

  if (!product) return <p>Product not found.</p>;
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="space-y-10">
      <section className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="relative mb-3 h-96 overflow-hidden rounded-xl border"><Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" /></div>
          <div className="grid grid-cols-2 gap-2">{product.images.map((img, i)=><button key={i} className="relative h-24 overflow-hidden rounded-md border" onClick={()=>setSelectedImage(i)}><Image src={img} alt="thumb" fill className="object-cover" /></button>)}</div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="flex items-center gap-3"><span className="text-2xl font-bold">{currency(product.price)}</span><span className="line-through text-muted-foreground">{currency(product.oldPrice)}</span></div>
          <Badge>{product.inStock ? "In Stock" : "Out of Stock"}</Badge>
          <div><p className="mb-2 text-sm">Size</p><div className="flex gap-2">{product.variants.sizes.map((s)=><button key={s} onClick={()=>setSize(s)} className={`rounded border px-3 py-1 ${size===s?"bg-primary text-primary-foreground":""}`}>{s}</button>)}</div></div>
          <div><p className="mb-2 text-sm">Color</p><div className="flex gap-2">{product.variants.colors.map((c)=><button key={c} onClick={()=>setColor(c)} className={`rounded border px-3 py-1 ${color===c?"bg-primary text-primary-foreground":""}`}>{c}</button>)}</div></div>
          <Button onClick={() => addToCart(product, 1, size, color)} disabled={!product.inStock}>Add to Cart</Button>
        </div>
      </section>
      <section><h2 className="mb-4 text-2xl font-semibold">Related Products</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{related.map((p)=><ProductCard key={p.id} product={p} />)}</div></section>
    </div>
  );
}

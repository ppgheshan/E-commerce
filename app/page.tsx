import Link from "next/link";
import { ProductCard } from "@/components/shop/product-card";
import { allCategories, allProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const featured = allProducts.slice(0, 8);
  const trending = allProducts.slice(8, 12);
  return (
    <div className="space-y-14">
      <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-10 text-white">
        <h1 className="text-4xl font-bold">Elevate Your Shopping Experience</h1>
        <p className="mt-3 max-w-2xl">Explore premium products with seamless modern UI.</p>
        <Link href="/shop"><Button className="mt-6 bg-white text-black">Shop Now</Button></Link>
      </section>

      <section><h2 className="mb-4 text-2xl font-semibold">Featured Products</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featured.map((p)=><ProductCard key={p.id} product={p} />)}</div></section>
      <section><h2 className="mb-4 text-2xl font-semibold">Categories</h2><div className="grid gap-4 sm:grid-cols-3">{allCategories.map((c)=><div key={c} className="rounded-xl border p-6 text-center font-medium">{c}</div>)}</div></section>
      <section><h2 className="mb-4 text-2xl font-semibold">Trending</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{trending.map((p)=><ProductCard key={p.id} product={p} />)}</div></section>
      <section className="grid gap-4 md:grid-cols-3">{["Amazing quality!","Fast shipping.","Love the design."].map((t,i)=><blockquote key={i} className="rounded-xl border p-4">“{t}”</blockquote>)}</section>
      <section className="rounded-xl border p-6"><h3 className="text-xl font-semibold">Newsletter</h3><p className="text-sm text-muted-foreground">Get weekly deals and product drops.</p><div className="mt-3 flex gap-2"><input className="w-full rounded-md border px-3 py-2" placeholder="Email" /><Button>Subscribe</Button></div></section>
    </div>
  );
}

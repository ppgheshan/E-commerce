"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { allCategories, allProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const list = allProducts
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => p.price >= minPrice && p.price <= maxPrice)
      .filter((p) => p.rating >= minRating);

    return list.sort((a, b) => {
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [search, category, minPrice, maxPrice, minRating, sort]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">
        <FilterSidebar
          categories={allCategories}
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPrice={(min, max) => { setMinPrice(min); setMaxPrice(max); }}
          minRating={minRating}
          onRating={setMinRating}
          sort={sort}
          onSort={setSort}
        />
      </div>
      <div className="space-y-4">
        <Button className="w-fit lg:hidden" onClick={() => setShowFilters((v) => !v)}><SlidersHorizontal className="mr-2 h-4 w-4" />Filters</Button>
        {showFilters && (
          <FilterSidebar
            categories={allCategories}
            search={search}
            onSearch={setSearch}
            category={category}
            onCategory={setCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPrice={(min, max) => { setMinPrice(min); setMaxPrice(max); }}
            minRating={minRating}
            onRating={setMinRating}
            sort={sort}
            onSort={setSort}
          />
        )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      </div>
    </div>
  );
}

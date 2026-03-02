"use client";

import { Input } from "@/components/ui/input";

interface Props {
  categories: string[];
  search: string;
  onSearch: (v: string) => void;
  category: string;
  onCategory: (v: string) => void;
  minPrice: number;
  maxPrice: number;
  onPrice: (min: number, max: number) => void;
  minRating: number;
  onRating: (v: number) => void;
  sort: string;
  onSort: (v: string) => void;
}

export function FilterSidebar(props: Props) {
  return (
    <aside className="space-y-4 rounded-xl border p-4">
      <Input placeholder="Search" value={props.search} onChange={(e) => props.onSearch(e.target.value)} />
      <select className="w-full rounded-md border p-2" value={props.category} onChange={(e) => props.onCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {props.categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <div className="grid grid-cols-2 gap-2">
        <Input type="number" value={props.minPrice} onChange={(e) => props.onPrice(Number(e.target.value), props.maxPrice)} />
        <Input type="number" value={props.maxPrice} onChange={(e) => props.onPrice(props.minPrice, Number(e.target.value))} />
      </div>
      <select className="w-full rounded-md border p-2" value={props.minRating} onChange={(e) => props.onRating(Number(e.target.value))}>
        <option value={0}>Any Rating</option><option value={3}>3+</option><option value={4}>4+</option>
      </select>
      <select className="w-full rounded-md border p-2" value={props.sort} onChange={(e) => props.onSort(e.target.value)}>
        <option value="newest">Newest</option><option value="priceLow">Price Low</option><option value="priceHigh">Price High</option>
      </select>
    </aside>
  );
}

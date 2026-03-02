import products from "@/data/products.json";
import categories from "@/data/categories.json";
import { Product } from "@/types";

export const allProducts = products as Product[];
export const allCategories = categories as string[];

export const getProductBySlug = (slug: string) => allProducts.find((p) => p.slug === slug);

export interface Variant {
  sizes: string[];
  colors: string[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice: number;
  category: string;
  rating: number;
  images: string[];
  tags: string[];
  inStock: boolean;
  variants: Variant;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
}

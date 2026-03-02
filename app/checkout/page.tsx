"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "@/context/shop-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currency } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, placeOrder, clearCart } = useShop();
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) + 12;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const id = `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    placeOrder({
      id,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
      customer: {
        name: String(form.get("name")),
        email: String(form.get("email")),
        address: String(form.get("address")),
        city: String(form.get("city")),
        zip: String(form.get("zip")),
      },
    });
    clearCart();
    router.push(`/order-success?id=${id}`);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form className="space-y-3 rounded-xl border p-4" onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold">Checkout</h1>
        <Input name="name" placeholder="Full name" required />
        <Input name="email" placeholder="Email" type="email" required />
        <Input name="address" placeholder="Address" required />
        <Input name="city" placeholder="City" required />
        <Input name="zip" placeholder="ZIP code" required />
        <Button type="submit">Place Order</Button>
      </form>
      <div className="rounded-xl border p-4">
        <h2 className="mb-3 text-xl font-semibold">Order Summary</h2>
        <div className="space-y-2 text-sm">{cart.map((i)=><div key={i.product.id} className="flex justify-between"><span>{i.product.name} x{i.quantity}</span><span>{currency(i.product.price*i.quantity)}</span></div>)}</div>
        <p className="mt-4 text-lg font-semibold">Total {currency(total)}</p>
      </div>
    </div>
  );
}

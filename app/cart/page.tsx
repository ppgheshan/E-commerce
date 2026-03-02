"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop-context";
import { currency } from "@/lib/utils";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useShop();
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 12;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      {cart.length === 0 ? <p>Cart is empty.</p> : cart.map((item) => (
        <div key={item.product.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4">
          <div><h3 className="font-semibold">{item.product.name}</h3><p className="text-sm text-muted-foreground">{item.size} / {item.color}</p></div>
          <input type="number" min={1} value={item.quantity} onChange={(e)=>updateQuantity(item.product.id, Number(e.target.value))} className="w-20 rounded border p-2" />
          <p>{currency(item.product.price * item.quantity)}</p>
          <Button className="bg-secondary text-secondary-foreground" onClick={()=>removeFromCart(item.product.id)}>Remove</Button>
        </div>
      ))}
      <div className="rounded-xl border p-4">
        <p>Subtotal: <strong>{currency(subtotal)}</strong></p>
        <p>Shipping: <strong>{shipping === 0 ? "Free" : currency(shipping)}</strong></p>
        <p className="mt-2 text-lg">Total: <strong>{currency(subtotal + shipping)}</strong></p>
        <Link href="/checkout"><Button className="mt-4">Proceed to Checkout</Button></Link>
      </div>
    </div>
  );
}

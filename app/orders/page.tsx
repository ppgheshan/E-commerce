"use client";

import { useShop } from "@/context/shop-context";
import { currency } from "@/lib/utils";

export default function OrdersPage() {
  const { orders } = useShop();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Order History</h1>
      {orders.length === 0 ? <p>No orders yet.</p> : orders.map((order) => (
        <div key={order.id} className="rounded-xl border p-4">
          <div className="flex flex-wrap items-center justify-between">
            <p className="font-semibold">{order.id}</p>
            <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <p className="mt-2 text-sm">{order.items.length} items • Total {currency(order.total)}</p>
        </div>
      ))}
    </div>
  );
}

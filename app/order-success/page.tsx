"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const id = params.get("id");
  return (
    <div className="mx-auto max-w-xl rounded-xl border p-8 text-center">
      <h1 className="text-3xl font-bold">Order Placed 🎉</h1>
      <p className="mt-2 text-muted-foreground">Your order ID is <strong>{id}</strong>.</p>
      <div className="mt-6 flex justify-center gap-2">
        <Link href="/orders"><Button>View Orders</Button></Link>
        <Link href="/shop"><Button className="bg-secondary text-secondary-foreground">Continue Shopping</Button></Link>
      </div>
    </div>
  );
}

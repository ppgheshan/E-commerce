"use client";

import { Toaster } from "sonner";
import { ShopProvider } from "@/context/shop-context";
import { ThemeProvider } from "@/components/layout/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ShopProvider>
        {children}
        <Toaster richColors />
      </ShopProvider>
    </ThemeProvider>
  );
}

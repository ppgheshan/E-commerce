"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item) setValue(JSON.parse(item));
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (ready) window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, ready]);

  return [value, setValue, ready] as const;
}

import { useEffect, useState } from "react";

// Fungerar som useState, men värdet sparas i localStorage och finns kvar efter omladdning
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage kan vara blockerat – appen funkar ändå
    }
  }, [key, value]);

  return [value, setValue] as const;
}
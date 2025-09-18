import { useState, useEffect } from "react";

const STORAGE_KEY = "items";

export function useItems() {
  const [items, setItems] = useState(() => getItems());

  function saveItems(newItems) {
    if (newItems == null) {
      localStorage.setItem(STORAGE_KEY, "[]");
      setItems([]);
    } else {
      const stringified = JSON.stringify(newItems);
      localStorage.setItem(STORAGE_KEY, stringified);
      setItems(newItems);
    }
  }

  function getItems() {
    let stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  useEffect(() => {
    function handleStorage(e) {
      if (e.key === STORAGE_KEY) {
        setItems(getItems());
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return [items, saveItems];
}

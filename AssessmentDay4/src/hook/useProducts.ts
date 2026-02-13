import { useState, useMemo } from "react";
import type { Product } from "../App";

export function useProducts(products: Product[]) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;
      return matchesName && matchesCategory;
    });
  }, [products, search, category]);

  return { search, setSearch, category, setCategory, filtered };
}

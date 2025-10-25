import { useEffect, useState } from "react";
import { ProductService } from "../service/ProductService";
import { CategoryService } from "../service/CategoryService";
import type { Product } from "../types/Product";
import type { Category } from "../types/Category";

export function useProductsByCategory() {
  const [grouped, setGrouped] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          ProductService.getAll(),
          CategoryService.getAll(),
        ]);

        const products = productRes.data.data as Product[];
        const categories = categoryRes.data as Category[];

        const groupedData: Record<string, Product[]> = {};

        categories.forEach((cat: Category) => {
          groupedData[cat.name] = products.filter(
            (p: Product) => p.categoryId === cat.id
          );
        });

        const unassigned = products.filter(
          (p: Product) =>
            !categories.some((c: Category) => c.id === p.categoryId)
        );

        if (unassigned.length > 0) groupedData["Sin categoría"] = unassigned;

        setGrouped(groupedData);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Error desconocido al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { grouped, loading, error };
}

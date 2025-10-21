import { useEffect, useState } from "react";
import { ProductService } from "../service/ProductService";
import type { Product } from "../types/Product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductService.getAll();
        setProducts(res.data);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("Error al obtener productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}

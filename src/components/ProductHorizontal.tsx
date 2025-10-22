import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

interface Props {
  products: Product[];
  title?: string;
}

export default function ProductHorizontal({ products, title }: Props) {
  if (!products || products.length === 0)
    return (
      <p className="p-6 text-center text-gray-500">
        No hay productos disponibles.
      </p>
    );

  return (
    <section className="p-6">
      {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}

      <div className="flex pb-2 space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-64">
            <Link to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

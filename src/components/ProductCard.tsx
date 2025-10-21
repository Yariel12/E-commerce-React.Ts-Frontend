import type { Product } from "../types/Product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="p-3 transition-shadow bg-white shadow-md rounded-2xl hover:shadow-lg">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="object-cover w-full h-48 rounded-xl"
      />
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="mt-1 font-bold text-blue-500">
          ${product.price.toFixed(2)}
        </p>
        <button className="w-full py-2 mt-3 text-sm text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
          Ver más
        </button>
      </div>
    </div>
  );
}

import type { Product } from "../types/Product";
import { Eye } from "lucide-react";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="relative overflow-hidden transition-all duration-500 shadow-lg group rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative h-56 overflow-hidden rounded-t-2xl">
        <img
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center gap-3 transition-all duration-500 opacity-0 group-hover:opacity-100">
          <button className="p-3 transition-all duration-300 rounded-full shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110">
            <Eye className="w-5 h-5 text-gray-800" />
          </button>
        </div>

        <div className="absolute px-4 py-2 rounded-full shadow-lg top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 backdrop-blur-sm">
          <p className="text-sm font-bold text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 truncate transition-colors duration-300 group-hover:text-blue-600">
          {product.name}
        </h3>

        {product.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}

        <button className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
          Ver Detalles
        </button>
      </div>

      <div className="absolute w-24 h-24 transition-transform duration-700 rounded-full -bottom-2 -right-2 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-2xl group-hover:scale-150" />
    </div>
  );
}

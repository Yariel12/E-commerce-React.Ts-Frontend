import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

const Products = () => {
  const { products, loading, error } = useProducts();

  if (loading)
    return (
      <p className="p-10 text-center text-gray-500">Cargando productos...</p>
    );

  if (error)
    return <p className="p-10 font-medium text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 mx-auto max-w-7xl">
      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay productos disponibles.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="block overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-md"
            >
              <div className="relative w-full h-56 overflow-hidden bg-gray-50">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {product.categoryName}
                </p>
                <p className="mt-3 text-lg font-semibold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

import { useParams, Link, useNavigate } from "react-router-dom";
import { useProductsByCategory } from "../hooks/useProductsByCategory";

function CategoryProducts() {
  const { name } = useParams();
  const { grouped, loading, error } = useProductsByCategory();
  const navigate = useNavigate();

  if (loading)
    return (
      <p className="p-10 text-center text-gray-500">Cargando productos...</p>
    );

  if (error)
    return <p className="p-10 font-medium text-center text-red-500">{error}</p>;

  const products = grouped[name || ""] || [];

  if (products.length === 0)
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No se encontraron productos en la categoría:{" "}
          <span className="text-blue-600">{name}</span>
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 mt-4 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Volver atrás
        </button>
      </div>
    );

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <div className="mb-6 text-sm text-gray-500">
        <Link to="/" className="text-blue-600 hover:underline">
          Inicio
        </Link>{" "}
        / <span className="font-medium text-gray-700">{name}</span>
      </div>

      <h1 className="mb-8 text-3xl font-bold text-gray-800 capitalize">
        {name}
      </h1>

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
    </div>
  );
}

export default CategoryProducts;

import { useParams, Link, useNavigate } from "react-router-dom";
import { useProductsByCategory } from "../hooks/useProductsByCategory";

function CategoryProducts() {
  const { name } = useParams();
  const { grouped, loading, error } = useProductsByCategory();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="min-h-screen p-8 mx-auto max-w-7xl">
        <div className="mb-6 space-y-3 animate-pulse">
          <div className="w-48 h-4 rounded bg-gray-200/80"></div>
          <div className="w-64 h-10 rounded bg-gray-200/80"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl"
            >
              <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
              <div className="p-5 space-y-3">
                <div className="w-3/4 h-4 rounded bg-gray-200/80"></div>
                <div className="w-1/2 h-3 rounded bg-gray-200/60"></div>
                <div className="w-20 h-6 rounded bg-gray-200/80"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-md p-8 text-center bg-white border border-red-100 shadow-xl rounded-3xl">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-800">
            Error al cargar
          </h2>
          <p className="mb-6 text-gray-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:shadow-lg hover:scale-105"
          >
            Volver atrás
          </button>
        </div>
      </div>
    );

  const products = grouped[name || ""] || [];

  if (products.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-md p-10 text-center bg-white border border-gray-100 shadow-xl rounded-3xl">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-800">
            No hay productos
          </h2>
          <p className="mb-6 text-gray-600">
            No se encontraron productos en la categoría{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              {name}
            </span>
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:shadow-lg hover:scale-105"
          >
            Volver atrás
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-8 mx-auto max-w-7xl">
      <div className="flex items-center gap-2 mb-8 text-sm">
        <Link
          to="/"
          className="flex items-center gap-1 text-gray-500 transition-colors hover:text-blue-600 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Inicio
        </Link>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="font-medium text-gray-800 capitalize">{name}</span>
      </div>

      <div className="mb-10">
        <div className="flex items-end justify-between mb-3">
          <h1 className="text-4xl font-bold text-transparent capitalize bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            {name}
          </h1>
          <div className="px-4 py-2 text-sm font-medium text-blue-700 border border-blue-100 rounded-full bg-blue-50">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </div>
        </div>
        <div className="w-32 h-1 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="block overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-700 transform group-hover:scale-110"
              />
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:opacity-100"></div>

              <div className="absolute px-3 py-1 text-xs font-semibold text-white transition-all duration-300 transform translate-y-2 rounded-full opacity-0 bg-white/20 backdrop-blur-md top-3 left-3 group-hover:translate-y-0 group-hover:opacity-100">
                {product.categoryName}
              </div>

              <div className="absolute inset-x-0 flex items-center justify-center transition-all duration-300 transform translate-y-4 opacity-0 bottom-3 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="px-4 py-2 text-sm font-medium text-white transition-colors bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30">
                  Ver detalles
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-base font-semibold text-gray-800 truncate transition-colors group-hover:text-blue-600">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {product.categoryName}
              </p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center justify-center w-8 h-8 transition-all duration-300 transform bg-blue-100 rounded-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:scale-110">
                  <svg
                    className="w-4 h-4 text-blue-600 transition-colors group-hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default CategoryProducts;

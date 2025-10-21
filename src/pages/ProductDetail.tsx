import { useParams, Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

function ProductDetail() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();

  if (loading) return <p className="p-6 text-center">Cargando producto...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  const product = products.find((p) => p.id === Number(id));

  if (!product)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Producto no encontrado
        </h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <div className="mb-4 text-sm text-gray-500">
        <Link to="/" className="text-blue-600 hover:underline">
          Inicio
        </Link>{" "}
        /{" "}
        <Link
          to={`/category/${encodeURIComponent(product.categoryName)}`}
          className="text-blue-600 hover:underline"
        >
          {product.categoryName}
        </Link>{" "}
        / <span className="font-medium text-gray-700">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-contain w-full max-h-[500px] rounded-xl shadow-md"
          />
        </div>

        <div className="space-y-4 lg:col-span-1">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-lg text-gray-700">{product.description}</p>

          <div className="pt-4 mt-4 border-t">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Categoría:</span>{" "}
              {product.categoryName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">
                Disponibilidad:
              </span>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">
                  En stock ({product.stock})
                </span>
              ) : (
                <span className="text-red-500">Agotado</span>
              )}
            </p>
          </div>
        </div>

        <div className="sticky p-6 bg-white border shadow-md rounded-xl h-fit top-10">
          <p className="mb-2 text-3xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-4 text-sm text-gray-600">Impuestos incluidos</p>

          <button
            className={`w-full py-3 rounded-lg font-semibold transition ${
              product.stock > 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-100 cursor-not-allowed"
            }`}
            disabled={product.stock <= 0}
          >
            Añadir al carrito
          </button>

          <p className="mt-3 text-xs text-center text-gray-500">
            Envío gratis a República Dominicana 🇩🇴
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

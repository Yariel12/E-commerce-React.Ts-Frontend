import { useProductsByCategory } from "../hooks/useProductsByCategory";
import { useNavigate } from "react-router-dom";

function CategoryBlock() {
  const { grouped, loading, error } = useProductsByCategory();
  const navigate = useNavigate();

  if (loading)
    return (
      <p className="p-6 text-center text-gray-600">Cargando productos...</p>
    );
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  const categoryNames = Object.keys(grouped);

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categoryNames.map((categoryName) => (
        <div
          key={categoryName}
          onClick={() =>
            navigate(`/category/${encodeURIComponent(categoryName)}`)
          }
          className="relative flex flex-col justify-between p-6 overflow-hidden transition-all duration-300 border border-gray-100 shadow-lg cursor-pointer group rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl hover:-translate-y-2"
        >
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-purple-500/0 group-hover:opacity-10" />

          <div className="relative z-10 flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text">
              {categoryName}
            </h2>
            <span className="flex items-center justify-center w-8 h-8 text-xs font-semibold text-white rounded-full shadow-md bg-gradient-to-br from-blue-500 to-cyan-500">
              {grouped[categoryName].length}
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3">
            {grouped[categoryName].slice(0, 4).map((product, index) => (
              <div
                key={product.id}
                className="relative overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl group-hover:shadow-xl"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:opacity-100" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-2 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  <p className="text-xs font-medium text-center text-white truncate drop-shadow-lg">
                    {product.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center justify-center mt-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <span className="text-sm font-medium text-blue-600">
              Ver todos →
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryBlock;

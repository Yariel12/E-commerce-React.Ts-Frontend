import { useProductsByCategory } from "../hooks/useProductsByCategory";
import { useNavigate } from "react-router-dom";

function Home() {
  const { grouped, loading, error } = useProductsByCategory();
  const navigate = useNavigate();

  if (loading) return <p className="p-6 text-center">Cargando productos...</p>;
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
          className="flex flex-col justify-between p-4 transition bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md"
        >
          <h2 className="mb-3 text-lg font-bold text-gray-800">
            {categoryName}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {grouped[categoryName].slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center overflow-hidden text-center group"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full h-24 transition-transform duration-200 rounded-md group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;

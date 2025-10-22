import { useProducts } from "../hooks/useProducts";
import ProductHorizontal from "../components/ProductHorizontal";
import CategoryBlock from "../components/CategoryBlock";

export default function Home() {
  const { products, loading, error } = useProducts();

  if (loading)
    return (
      <p className="p-6 text-center text-gray-500">Cargando productos...</p>
    );

  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <CategoryBlock />
      <ProductHorizontal products={products} title="Productos destacados" />
    </div>
  );
}

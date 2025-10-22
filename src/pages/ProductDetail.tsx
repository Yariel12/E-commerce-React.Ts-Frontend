import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import {
  FiShoppingCart,
  FiTruck,
  FiPackage,
  FiCheck,
  FiChevronRight,
  FiHome,
  FiShield,
  FiStar,
} from "react-icons/fi";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 rounded-full border-primary/20 border-t-primary animate-spin" />
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full border-t-primary/40 animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1s" }}
            />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Cargando producto...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-md p-8 text-center border shadow-lg rounded-2xl bg-card border-destructive/20">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10">
            <FiPackage className="w-8 h-8 text-destructive" />
          </div>
          <p className="font-medium text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-md p-10 text-center border shadow-xl rounded-2xl bg-card">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-muted">
            <FiPackage className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="mb-3 text-2xl font-bold">Producto no encontrado</h2>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            El producto que buscas no existe o ha sido eliminado de nuestro
            catálogo
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold transition-all rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:scale-105"
          >
            <FiHome className="w-5 h-5" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product.id, 1);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-background via-background to-muted/10 lg:py-12">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 mb-10 text-sm">
          <Link
            to="/"
            className="transition-all text-muted-foreground hover:text-foreground hover:scale-105"
          >
            Inicio
          </Link>
          <FiChevronRight className="w-4 h-4 text-muted-foreground/50" />
          <Link
            to={`/category/${encodeURIComponent(product.categoryName)}`}
            className="transition-all text-muted-foreground hover:text-foreground hover:scale-105"
          >
            {product.categoryName}
          </Link>
          <FiChevronRight className="w-4 h-4 text-muted-foreground/50" />
          <span className="font-semibold text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden border shadow-xl group rounded-3xl bg-gradient-to-br from-card to-muted/20">
            <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:opacity-100" />
            <div className="relative flex items-center justify-center p-10 aspect-square lg:p-16">
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="object-contain w-full h-full transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full shadow-lg top-6 right-6 bg-primary text-primary-foreground">
              <FiStar className="w-3.5 h-3.5 fill-current" />
              Premium
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                <FiPackage className="w-3.5 h-3.5" />
                {product.categoryName}
              </div>
              <h1 className="text-4xl font-bold leading-tight lg:text-5xl text-balance">
                {product.name}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                {product.description}
              </p>
            </div>

            <div className="p-8 border shadow-lg rounded-2xl bg-gradient-to-br from-card to-muted/10">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold tracking-tight">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-base font-medium text-muted-foreground">
                  USD
                </span>
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Impuestos incluidos • Envío calculado al finalizar
              </p>
            </div>

            <div
              className={`flex items-center gap-4 p-5 border rounded-xl shadow-sm transition-all ${
                product.stock > 0
                  ? "bg-green-50/50 border-green-200/50"
                  : "bg-red-50/50 border-red-200/50"
              }`}
            >
              {product.stock > 0 ? (
                <>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 ring-4 ring-green-500/10">
                    <FiCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">
                      Disponible ahora
                    </p>
                    <p className="text-sm text-green-700">
                      {product.stock} unidades en stock
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 ring-4 ring-red-500/10">
                    <FiPackage className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-900">
                      Agotado temporalmente
                    </p>
                    <p className="text-sm text-red-700">
                      Te notificaremos cuando esté disponible
                    </p>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || adding}
              className={`w-full py-5 px-8 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg ${
                product.stock > 0
                  ? addedSuccess
                    ? "bg-green-600 text-white shadow-green-600/30"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-muted text-muted-foreground cursor-not-allowed shadow-none"
              }`}
            >
              {adding ? (
                <>
                  <div className="w-6 h-6 border-white rounded-full border-3 border-t-transparent animate-spin" />
                  Agregando al carrito...
                </>
              ) : addedSuccess ? (
                <>
                  <FiCheck className="w-6 h-6" />
                  ¡Agregado exitosamente!
                </>
              ) : (
                <>
                  <FiShoppingCart className="w-6 h-6" />
                  Añadir al carrito
                </>
              )}
            </button>

            <div className="grid gap-4 pt-6 border-t sm:grid-cols-2">
              <div className="flex items-start gap-4 p-4 transition-all border shadow-sm rounded-xl bg-card hover:shadow-md hover:scale-105">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-primary/10">
                  <FiTruck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Envío gratis</p>
                  <p className="text-sm text-muted-foreground">
                    A todo el país en 24-48h
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 transition-all border shadow-sm rounded-xl bg-card hover:shadow-md hover:scale-105">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-primary/10">
                  <FiShield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Garantía extendida</p>
                  <p className="text-sm text-muted-foreground">
                    12 meses de cobertura total
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

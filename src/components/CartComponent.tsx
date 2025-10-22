import { useCart } from "../hooks/useCart";
import { FiShoppingCart, FiTrash2, FiPackage } from "react-icons/fi";

export const CartProduct = () => {
  const { cart, loading, addToCart } = useCart();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 rounded-full border-primary border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  const totalAmount =
    cart?.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="max-w-6xl p-6 mx-auto lg:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-lg bg-primary/10">
          <FiShoppingCart className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">Tu Carrito</h2>
          <p className="text-muted-foreground">
            {cart?.items.length || 0}{" "}
            {cart?.items.length === 1 ? "producto" : "productos"}
          </p>
        </div>
      </div>

      {cart?.items.length ? (
        <div className="space-y-6">
          <div className="overflow-hidden border shadow-sm bg-card border-border rounded-xl">
            {cart.items.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 hover:bg-accent/50 transition-colors ${
                  index !== cart.items.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 overflow-hidden rounded-lg bg-muted group">
                    <img
                      src={item.product.imageUrl || "/placeholder.svg"}
                      alt={item.product.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 text-lg font-semibold truncate text-foreground">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Precio unitario: ${item.product.price.toFixed(0)}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {" "}
                  <div className="flex items-center justify-center px-3 py-1 rounded-lg bg-muted">
                    <span className="font-semibold text-center text-foreground">
                      Productos: {item.quantity}
                    </span>
                  </div>
                  <button
                    className="flex items-center justify-center p-2 transition-colors rounded-lg hover:bg-destructive/10"
                    aria-label="Eliminar producto"
                  >
                    <FiTrash2 className="w-5 h-5 transition-colors text-muted-foreground group-hover:text-destructive" />
                  </button>
                </div>

                <div className="text-right sm:min-w-[100px]">
                  <p className="text-xl font-bold text-foreground">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border shadow-sm bg-card border-border rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg text-muted-foreground">Subtotal</span>
              <span className="text-2xl font-bold text-foreground">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => addToCart(5, 1)}
              className="flex items-center justify-center w-full gap-2 px-6 py-4 font-semibold transition-colors rounded-lg shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <FiPackage className="w-5 h-5" />
              Agregar Lenovo ThinkPad
            </button>
          </div>
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center px-4 py-16">
          <div className="p-6 mb-6 rounded-full bg-muted/50">
            <FiShoppingCart className="w-16 h-16 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-2xl font-semibold text-foreground">
            Tu carrito está vacío
          </h3>
          <p className="max-w-md mb-8 text-center text-muted-foreground">
            Agrega productos a tu carrito para comenzar tu compra
          </p>
          <button
            onClick={() => addToCart(5, 1)}
            className="flex items-center gap-2 px-8 py-3 font-semibold transition-colors rounded-lg shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <FiPackage className="w-5 h-5" />
            Agregar Lenovo ThinkPad
          </button>
        </div>
      )}
    </div>
  );
};

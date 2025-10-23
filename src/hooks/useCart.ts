import { useState, useEffect } from "react";
import type { Cart } from "../types/Cart";
import { cartService } from "../service/CarService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await cartService.getCart();
      setCart(data);
      setError(null);
    } catch (err) {
      console.error("Error al obtener el carrito:", err);
      setError("Error al obtener el carrito.");
      toast.error("Error al cargar el carrito 😢");
    } finally {
      setLoading(false);
    }
  };

  const removeItemCart = async (productId: number) => {
    if (!cart) return;

    const exists = cart.items.find((item) => item.productId === productId);
    if (!exists) {
      toast.error("El producto no está en el carrito 😢");
      return;
    }

    try {
      await cartService.removeItem(productId);
      await fetchCart();
      toast.success("Producto eliminado del carrito");
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar del carrito ");
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      await cartService.addToCart(productId, quantity);
      await fetchCart();
      toast.success("Producto agregado al carrito");
    } catch (err) {
      console.error(err);
      toast.error("Error al agregar al carrito");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  return { cart, loading, error, addToCart, fetchCart, removeItemCart };
};

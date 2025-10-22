import { http } from "../api/HttpClient";
import type { Cart } from "../types/Cart";

const BASE_URL = "/cart";

export const cartService = {
  getCart: async (): Promise<Cart> => {
    const res = await http.get<Cart>(`${BASE_URL}`);
    console.log("Cart data:", res.data);
    return res.data;
  },

  addToCart: async (productId: number, quantity: number) => {
    const res = await http.post<{ message: string }>(`${BASE_URL}/add`, {
      productId,
      quantity,
    });
    console.log(res.data.message);
    return res.data;
  },
};

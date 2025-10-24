import { http } from "../api/HttpClient";
import type { AxiosResponse } from "axios";
import type { Product, PagedResponse } from "../types/Product";

const BASE_URL = "/Product";

export const ProductService = {
  getAll: (
    page = 1,
    limit = 10
  ): Promise<AxiosResponse<PagedResponse<Product>>> => {
    return http.get<PagedResponse<Product>>(
      `${BASE_URL}?page=${page}&limit=${limit}`
    );
  },
};

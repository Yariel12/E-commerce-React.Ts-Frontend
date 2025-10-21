import { http } from "../api/HttpClient";
import type { AxiosResponse } from "axios";
import type { Product } from "../types/Product";

const BASE_URL = "/Product";

export const ProductService = {
  getAll: <T = Product[]>(): Promise<AxiosResponse<T>> => http.get<T>(BASE_URL),
};

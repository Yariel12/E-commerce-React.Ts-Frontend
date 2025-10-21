import { http } from "../api/HttpClient";
import type { AxiosResponse } from "axios";
import type { Category } from "../types/Category";

const BASE_URL = "/Category";

export const CategoryService = {
  getAll: <T = Category[]>(): Promise<AxiosResponse<T>> =>
    http.get<T>(BASE_URL),
};

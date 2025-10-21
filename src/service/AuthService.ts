import { http } from "../api/HttpClient";
import type { User, LoginRequest, RegisterRequest } from "../types/user";

const BASE_URL = "/User";

export const AuthService = {
  login: async (data: LoginRequest): Promise<User> => {
    const res = await http.post<User>(`${BASE_URL}/login`, data);
    if (res.data.token) localStorage.setItem("token", res.data.token);
    return res.data;
  },

  register: async (data: RegisterRequest): Promise<User> => {
    const res = await http.post<User>(`${BASE_URL}/register`, data);
    return res.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado");

    const res = await http.get<User>(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  logout: () => localStorage.removeItem("token"),
};

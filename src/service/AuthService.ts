import { http } from "../api/HttpClient";

const BASE_URL = "/User";

export const AuthService = {
  login: (data: { email: string; password: string }) => {
    return http.post(`${BASE_URL}/login`, data);
  },

  register: (data: { name: string; email: string; password: string }) => {
    return http.post(`${BASE_URL}/register`, data);
  },
};

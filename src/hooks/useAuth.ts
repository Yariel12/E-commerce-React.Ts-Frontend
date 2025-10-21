import { useState, useEffect } from "react";
import { AuthService } from "../service/AuthService";
import Swal from "sweetalert2";
import type { User } from "../types/user";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await AuthService.getCurrentUser();
        setUser(res);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const res = await AuthService.login({ email, password });
    const { token } = res;

    if (token) {
      localStorage.setItem("token", token);
    } else {
      console.warn("No se recibió token del backend");
    }

    const meRes = await AuthService.getCurrentUser();
    setUser(meRes);
    return meRes;
  };

  const logout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Perderás el acceso hasta volver a iniciar sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      background: "#1e293b",
      color: "#f8fafc",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      setUser(null);

      await Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has salido correctamente.",
        showConfirmButton: false,
        timer: 2000,
        background: "#1e293b",
        color: "#f8fafc",
      });
    }
  };

  return {
    user,
    loading,
    login: handleLogin,
    logout,
  };
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, UserPlus, LogIn } from "lucide-react";
import { AuthService } from "../service/AuthService";
import { useAuth } from "../hooks/useAuth";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: "login" | "register";
}

export default function AuthModal({ open, onClose, mode }: AuthModalProps) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "register") {
        await AuthService.register(form);
        alert("✅ Usuario registrado. Ahora inicia sesión.");
        onClose();
      } else {
        await login(form.email, form.password);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal */}
          <motion.div
            className="relative w-[90%] max-w-md bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-6 text-white"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 250 }}
          >
            {/* Cerrar */}
            <button
              onClick={onClose}
              className="absolute p-2 text-gray-400 rounded-full hover:text-white hover:bg-gray-800 top-3 right-3"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center mb-5 text-center">
              <div className="p-3 mb-2 rounded-full bg-blue-600/10">
                {mode === "login" ? (
                  <LogIn className="text-blue-500" size={28} />
                ) : (
                  <UserPlus className="text-blue-500" size={28} />
                )}
              </div>
              <h2 className="text-2xl font-semibold">
                {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
              </h2>
              <p className="text-sm text-gray-400">
                {mode === "login"
                  ? "Bienvenido de nuevo"
                  : "Regístrate para comenzar"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {mode === "register" && (
                <div>
                  <input
                    name="username"
                    placeholder="Nombre de usuario"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="w-full p-2 transition bg-gray-800 border border-gray-700 rounded-lg outline-none focus:border-blue-500 focus:ring focus:ring-blue-500/30"
                  />
                </div>
              )}

              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-2 transition bg-gray-800 border border-gray-700 rounded-lg outline-none focus:border-blue-500 focus:ring focus:ring-blue-500/30"
              />

              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-2 transition bg-gray-800 border border-gray-700 rounded-lg outline-none focus:border-blue-500 focus:ring focus:ring-blue-500/30"
              />

              {error && (
                <p className="text-sm text-center text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 p-2 mt-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Procesando...
                  </>
                ) : mode === "login" ? (
                  "Entrar"
                ) : (
                  "Registrarme"
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="mt-2 text-sm text-gray-400 transition hover:text-gray-200"
              >
                Cancelar
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

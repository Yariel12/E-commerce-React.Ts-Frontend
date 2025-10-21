import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import { useAuth } from "./hooks/useAuth";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail";
import { useEffect } from "react";

function App() {
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      console.log("Usuario autenticado:", user);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Cargando...
      </div>
    );
  }

  return (
    <Router>
      <NavBar user={user} onLogout={logout} />

      <main style={{ minHeight: "80vh", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:name" element={<CategoryProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;

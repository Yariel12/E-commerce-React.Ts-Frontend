import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { User as UserIcon, LogIn } from "lucide-react";
import type { User } from "../types/user";
import AuthModal from "../components/AuthModal";

interface NavBarProps {
  user: User | null;
  onLogout: () => Promise<void>;
}

function NavBar({ user, onLogout }: NavBarProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const [authModal, setAuthModal] = useState<null | "login" | "register">(null);
  let timeout: ReturnType<typeof setTimeout>;

  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setOpenMenu(true);
  };

  const handleMouseLeave = () => {
    timeout = setTimeout(() => setOpenMenu(false), 200);
  };

  return (
    <>
      <nav className="relative px-4 py-3 text-white bg-gray-900 shadow-md">
        <div className="container flex items-center justify-between mx-auto">
          <Link to="/" className="text-2xl font-bold text-blue-400">
            🛍️ SX Shop
          </Link>

          <div className="hidden gap-6 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
              }
            >
              Products
            </NavLink>
          </div>

          {user ? (
            <div
              className="relative cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-2">
                <UserIcon size={26} className="text-blue-400" />
                <span className="hidden md:inline">
                  {user.username || "Account"}
                </span>
              </div>

              {openMenu && (
                <div className="absolute right-0 w-48 mt-3 overflow-hidden bg-gray-800 border border-gray-700 rounded-lg shadow-lg animate-fadeIn">
                  <NavLink
                    to="/cart"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Cart
                  </NavLink>
                  <NavLink
                    to="/address"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Address
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    Orders
                  </NavLink>
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAuthModal("login")}
                className="flex items-center gap-1 hover:text-blue-300"
              >
                <LogIn size={20} /> Login
              </button>
              <button
                onClick={() => setAuthModal("register")}
                className="px-3 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </nav>

      {authModal && (
        <AuthModal
          open={true}
          onClose={() => setAuthModal(null)}
          mode={authModal}
        />
      )}
    </>
  );
}

export default NavBar;

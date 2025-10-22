"use client";

import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { UserIcon, LogIn, ShoppingBag } from "lucide-react";
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
      <nav className="sticky top-0 z-50 px-6 py-4 text-white border-b border-gray-800 shadow-xl bg-gray-900/95 backdrop-blur-md">
        <div className="container flex items-center justify-between mx-auto max-w-7xl">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold transition-transform hover:scale-105"
          >
            <ShoppingBag className="text-blue-400" size={28} />
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
              SX Shop
            </span>
          </Link>

          <div className="hidden gap-8 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-blue-400 after:rounded-full"
                  : "hover:text-blue-300 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:rounded-full after:transition-all hover:after:w-full"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-blue-400 after:rounded-full"
                  : "hover:text-blue-300 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:rounded-full after:transition-all hover:after:w-full"
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
              <div className="flex items-center gap-2 px-4 py-2 transition-all rounded-lg hover:bg-gray-800">
                <div className="p-1 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                  <UserIcon size={20} className="text-white" />
                </div>
                <span className="hidden font-medium md:inline">
                  {user.username || "Account"}
                </span>
              </div>

              {openMenu && (
                <div className="absolute right-0 w-56 mt-2 overflow-hidden border border-gray-700 shadow-2xl rounded-xl bg-gray-800/95 backdrop-blur-md animate-fadeIn">
                  <div className="p-2">
                    <NavLink
                      to="/cart"
                      className="block px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      🛒 Cart
                    </NavLink>
                    <NavLink
                      to="/address"
                      className="block px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      📍 Address
                    </NavLink>
                    <NavLink
                      to="/orders"
                      className="block px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      📦 Orders
                    </NavLink>
                    <div className="my-2 border-t border-gray-700"></div>
                    <button
                      onClick={onLogout}
                      className="w-full px-4 py-2.5 text-left rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors font-medium"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAuthModal("login")}
                className="flex items-center gap-2 px-4 py-2 font-medium transition-all rounded-lg hover:bg-gray-800"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
              <button
                onClick={() => setAuthModal("register")}
                className="px-5 py-2 font-semibold text-white transition-all rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/50 hover:scale-105"
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

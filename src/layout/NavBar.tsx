import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { User } from "lucide-react";

function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="relative px-4 py-3 text-white bg-gray-900 shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-2xl font-bold text-white-400">
          SX Shop
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

        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
        >
          <div className="flex items-center gap-2">
            <User size={26} className="text-blue-400" />
            <span className="hidden md:inline">Account</span>
          </div>

          {openMenu && (
            <div className="absolute right-0 w-48 mt-3 overflow-hidden bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
              <NavLink to="/cart" className="block px-4 py-2 hover:bg-gray-700">
                Carrito de compras
              </NavLink>
              <NavLink
                to="/address"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Direccion
              </NavLink>
              <NavLink
                to="/orders"
                className="block px-4 py-2 hover:bg-gray-700"
              >
                Orden
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

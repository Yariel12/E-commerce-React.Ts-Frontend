import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-10 text-gray-300 bg-gray-900">
      <div className="grid grid-cols-1 gap-8 px-4 mx-auto max-w-7xl md:grid-cols-3">
        <div>
          <h2 className="mb-4 text-xl font-bold text-white">SX Shop</h2>
          <p className="text-gray-400">
            Innovando cada día para ofrecer productos y servicios de calidad a
            nuestros clientes.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Enlaces Rápidos
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="transition hover:text-white">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-white">
                Productos
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-white">
                Servicios
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-white">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="#" className="transition hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="transition hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="transition hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="transition hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-10 text-sm text-center text-gray-500 border-t border-gray-700">
        &copy; {new Date().getFullYear()} SX Shop. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}

export default Footer;

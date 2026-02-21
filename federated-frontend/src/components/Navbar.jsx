import { Link } from "react-router-dom";
import { FaNetworkWired } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full px-20 py-6 bg-white shadow-sm flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <FaNetworkWired className="text-emerald-600 text-2xl" />
        <span className="text-2xl font-semibold text-gray-800">
          FedLearn
        </span>
      </Link>

      {/* Menu */}
      <div className="flex items-center gap-8">
        <a href="#how" className="text-gray-600 hover:text-emerald-600">How It Works</a>
        <a href="#features" className="text-gray-600 hover:text-emerald-600">Features</a>

        <Link to="/dashboard">
          <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Dashboard
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
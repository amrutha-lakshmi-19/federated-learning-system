import { Link } from "react-router-dom";
import { FaNetworkWired } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="h-16 bg-white shadow-sm flex items-center justify-between px-8 ml-64">

      {/* Logo + Name (Same as Landing Page) */}
      <Link to="/" className="flex items-center gap-2">
        <FaNetworkWired className="text-emerald-600 text-2xl" />
        <span className="text-2xl font-semibold text-gray-800">
          FedLearn
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        
        <Link
          to="/"
          className="px-5 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition"
        >
          Back to Home
        </Link>

        <div className="w-10 h-10 bg-emerald-600 rounded-full"></div>
      </div>
    </nav>
  );
};

export default Navbar;
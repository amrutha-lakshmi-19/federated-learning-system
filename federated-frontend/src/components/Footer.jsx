import { Link } from "react-router-dom";
import { FaNetworkWired, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaNetworkWired className="text-emerald-600 text-xl" />
            <span className="text-xl font-semibold text-gray-800">
              FedLearn
            </span>
          </div>
          <p className="text-gray-600">
            Privacy-preserving federated learning platform enabling secure
            distributed model training across multiple clients.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-gray-900">
            Navigation
          </h3>
          <div className="flex flex-col gap-2 text-gray-600">
            <a href="#how" className="hover:text-emerald-600">How It Works</a>
            <a href="#features" className="hover:text-emerald-600">Features</a>
            <Link to="/dashboard" className="hover:text-emerald-600">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Social / Project */}
        <div>
          <h3 className="font-semibold text-lg mb-3 text-gray-900">
            Project
          </h3>

          

          <p className="text-gray-500 text-sm mt-4">
            Built for Federated Learning research & academic demonstration.
          </p>
        </div>

      </div>

      {/* Bottom line */}
      <div className="border-t border-gray-100 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FedLearn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
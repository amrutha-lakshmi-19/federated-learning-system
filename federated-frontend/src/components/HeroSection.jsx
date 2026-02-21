import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-[75vh] pt-10 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="text-center max-w-4xl">

        <span className="inline-block mb-4 px-4 py-1 text-sm font-body bg-emerald-100 text-emerald-700 rounded-full">
          Privacy Preserving Machine Learning
        </span>

        <h1 className="text-6xl md:text-7xl font-heading font-semibold text-gray-900 leading-tight">
          Distributed Hierarchical Architecture
        </h1>

        <p className="mt-6 text-xl font-body text-gray-600">
          Train ML models collaboratively without sharing sensitive data.
          Secure aggregation ensures privacy while improving accuracy.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link to="/dashboard">
            <button className="px-8 py-3 bg-emerald-600 text-white rounded-xl shadow-md hover:bg-emerald-700 transition text-lg">
              Open Dashboard
            </button>
          </Link>

          <a href="#how">
            <button className="px-8 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition text-lg">
              Learn More
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
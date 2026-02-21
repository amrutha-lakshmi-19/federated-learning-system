import { FiLock, FiBarChart2, FiPackage } from "react-icons/fi";

const Features = () => {
  return (
    <section id="features" className="py-28 bg-gray-50 text-center font-body">
      <h2 className="text-5xl font-heading font-semibold mb-4 text-gray-900">
        Platform Features
      </h2>

      <p className="text-lg text-gray-600 mb-16">
        Everything needed for secure federated training
      </p>

      <div className="grid md:grid-cols-3 gap-12 px-10 max-w-6xl mx-auto">

        <div className="p-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-2xl">
            <FiLock />
          </div>
          <h3 className="font-semibold text-2xl">Privacy Preservation</h3>
          <p className="text-gray-600 mt-3 text-lg">
            No personal data is shared between clients and server.
          </p>
        </div>

        <div className="p-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-2xl">
            <FiBarChart2 />
          </div>
          <h3 className="font-semibold text-2xl">Real-time Monitoring</h3>
          <p className="text-gray-600 mt-3 text-lg">
            Track global accuracy and performance across rounds.
          </p>
        </div>

        <div className="p-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-2xl">
            <FiPackage />
          </div>
          <h3 className="font-semibold text-2xl">Lightweight Model Updates</h3>
          <p className="text-gray-600 mt-3 text-lg">
            Compressed updates reduce bandwidth usage.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Features;
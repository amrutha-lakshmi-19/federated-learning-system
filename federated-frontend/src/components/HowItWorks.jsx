import { FiCpu, FiShield, FiGlobe } from "react-icons/fi";

const HowItWorks = () => {
  return (
    <section id="how" className="py-28 bg-white text-center font-body">
      <h2 className="text-5xl font-heading font-semibold mb-4 text-gray-900">
        How Federated Learning Works
      </h2>

      <p className="text-lg text-gray-600 mb-16">
        Simple distributed workflow in three steps
      </p>

      <div className="grid md:grid-cols-3 gap-12 px-10 max-w-6xl mx-auto">

        <div className="p-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-2xl">
            <FiCpu />
          </div>
          <h3 className="font-semibold text-2xl mb-3">Local Training</h3>
          <p className="text-gray-600 text-lg">
            Clients train models locally using private data.
          </p>
        </div>

        <div className="p-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-2xl">
            <FiShield />
          </div>
          <h3 className="font-semibold text-2xl mb-3">Secure Aggregation</h3>
          <p className="text-gray-600 text-lg">
            Server aggregates weights via Federated Averaging.
          </p>
        </div>

        <div className="p-10 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-2xl">
            <FiGlobe />
          </div>
          <h3 className="font-semibold text-2xl mb-3">Global Update</h3>
          <p className="text-gray-600 text-lg">
            Updated global model redistributed for next round.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
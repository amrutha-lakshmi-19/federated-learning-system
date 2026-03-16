const Stats = () => {
  return (
    <section className="py-28 bg-white text-center font-body">
      
      <h2 className="text-5xl font-heading font-semibold mb-6 text-gray-900">
        Federated Learning in Action
      </h2>

      <p className="text-lg text-gray-600 mb-16">
        Real impact from distributed collaboration
      </p>

      <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">

        <div>
          <h3 className="text-6xl font-bold text-emerald-600 font-heading">
            3
          </h3>
          <p className="text-lg text-gray-600 mt-3">
            Active Clients
          </p>
        </div>

        <div>
          <h3 className="text-6xl font-bold text-emerald-600 font-heading">
            10+
          </h3>
          <p className="text-lg text-gray-600 mt-3">
            Training Rounds
          </p>
        </div>

        <div>
          <h3 className="text-6xl font-bold text-emerald-600 font-heading">
            80%
          </h3>
          <p className="text-lg text-gray-600 mt-3">
            Target Accuracy
          </p>
        </div>

      </div>
    </section>
  );
};

export default Stats;
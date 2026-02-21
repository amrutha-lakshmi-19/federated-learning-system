import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../components/SidebarLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const API = "http://localhost:5000/api/federated";

export default function Dashboard() {
  const [globalModel, setGlobalModel] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchGlobalModel = async () => {
    const res = await axios.get(`${API}/global-model`);
    setGlobalModel(res.data);
  };

  const startTraining = async () => {
    setLoading(true);
    await axios.post(`${API}/start-training`);
    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    fetchGlobalModel();

    const interval = setInterval(() => {
      fetchGlobalModel();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartData =
    globalModel?.history?.map((h) => ({
      round: h.round,
      accuracy: Number((h.accuracy * 100).toFixed(2)),
      loss: Number(h.loss.toFixed(4)),
    })) || [];

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-50">

        {/* Header */}
        <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">
            Dashboard
          </h1>

          <button
            onClick={startTraining}
            className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            {loading ? "Training Triggered..." : "Start Training"}
          </button>
        </div>

        <div className="p-8 space-y-10">

          {/* === TOP ROW: ACCURACY / LOSS / ROUND === */}
          {globalModel && (
            <div className="grid md:grid-cols-3 gap-6">
              <StatCard
                title="Global Accuracy"
                value={
                  globalModel.accuracy != null
                    ? (globalModel.accuracy * 100).toFixed(2) + "%"
                    : "N/A"
                }
              />

              <StatCard
                title="Global Loss"
                value={
                  globalModel.loss != null
                    ? globalModel.loss.toFixed(4)
                    : "N/A"
                }
              />

              <StatCard
                title="Training Round"
                value={globalModel.round ?? "N/A"}
              />
            </div>
          )}

          {/* === GLOBAL WEIGHTS SECTION === */}
          {globalModel?.weights && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Global Model Weights (All Features)
              </h2>

              {/* Bias */}
              <div className="mb-6">
                <p className="text-gray-500">Bias</p>
                <p className="text-lg font-bold text-green-600">
                  {globalModel.bias != null
                    ? globalModel.bias.toFixed(6)
                    : "N/A"}
                </p>
              </div>

              {/* Weights Grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {globalModel.weights.map((weight, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg border"
                  >
                    <p className="text-gray-500 text-sm">
                      Weight {index + 1}
                    </p>
                    <p className="font-semibold text-gray-800">
                      {weight.toFixed(6)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === TRAINING CHART === */}
          {chartData.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Training Progress
              </h2>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="round" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#16a34a"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="loss"
                      stroke="#ef4444"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* === TRAINING HISTORY TABLE === */}
          {chartData.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Training History
              </h2>

              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="pb-3">Round</th>
                    <th>Accuracy</th>
                    <th>Loss</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {chartData.map((round) => (
                    <tr key={round.round} className="hover:bg-gray-50">
                      <td className="py-3">{round.round}</td>
                      <td className="py-3">{round.accuracy}%</td>
                      <td className="py-3">{round.loss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </SidebarLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-green-600 mt-2">
        {value}
      </p>
    </div>
  );
}
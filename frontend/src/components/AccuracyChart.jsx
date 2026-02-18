import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function AccuracyChart({ history }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-2xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-3">
        Global Model Convergence (Accuracy vs Loss)
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="round" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Accuracy line */}
          <Line
            type="monotone"
            dataKey="accuracy"
            strokeWidth={3}
            name="Accuracy"
          />

          {/* Loss line */}
          <Line
  type="monotone"
  dataKey="loss"
  stroke="red"
  strokeWidth={3}
  name="Loss"
/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
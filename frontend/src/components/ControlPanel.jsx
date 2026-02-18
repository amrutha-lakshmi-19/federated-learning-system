import React from "react";
import { FiPlay, FiActivity, FiLayers } from "react-icons/fi";

export default function ControlPanel({ onStart, status }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex flex-col md:flex-row justify-between items-center gap-4">
      
      <div>
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <FiLayers /> Federated Server Control
        </h2>
        <p className="text-sm text-gray-500">
          Aggregation Method: FedAvg
        </p>
      </div>

      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 text-sm">
          <FiActivity /> Status: <strong>{status}</strong>
        </span>

        <button
          onClick={onStart}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
        >
          <FiPlay /> Start Training
        </button>
      </div>
    </div>
  );
}

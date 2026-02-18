import React, { useEffect, useState } from "react";
import ClientCard from "../components/ClientCard";
import ControlPanel from "../components/ControlPanel";
import GlobalMetrics from "../components/GlobalMetrics";
import TrainingStatus from "../components/TrainingStatus";
import api from "../services/api";
import AccuracyChart from "../components/AccuracyChart";

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [status, setStatus] = useState("Idle");

  const fetchMetrics = async () => {
    try {
      const metricRes = await api.getGlobalMetrics();
      setMetrics(metricRes);
    } catch (err) {
      console.error("Error fetching metrics", err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await api.getClients();
      setClients(res);
    } catch (err) {
      console.error("Error fetching clients", err);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchClients();
  }, []);

  const startTraining = async () => {
    setStatus("Training...");
    try {
      await api.startTraining();
      setStatus("Running");

      setTimeout(() => {
        fetchMetrics();
        fetchClients();
      }, 4000);
    } catch (err) {
      console.error(err);
      setStatus("Idle");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Federated Learning Dashboard
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Central server coordinating federated learning across hospitals while preserving privacy.
        </p>
      </header>

      {/* Control Panel */}
      <ControlPanel onStart={startTraining} status={status} />

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlobalMetrics metrics={metrics} />
        <TrainingStatus status={status} />
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-2xl p-5 flex flex-col items-center justify-center">
          <h2 className="font-semibold text-lg text-gray-800 mb-2">Connected Clients</h2>
          <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
          <span className="text-gray-500 text-sm mt-1">Hospitals Connected</span>
        </div>
      </div>

      {/* Client Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Client Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clients.map((client, i) => (
            <ClientCard key={i} client={client} />
          ))}
        </div>
      </section>

      {/* Accuracy Chart */}
      <section className="mt-8 bg-white shadow rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Global Model Accuracy Over Rounds</h2>
        <AccuracyChart history={metrics?.history} />
      </section>
    </div>
  );
}
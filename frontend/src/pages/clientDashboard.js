import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import api from "../services/api";

export default function ClientDashboard() {
  const { id } = useParams();

  const [status, setStatus] = useState("Waiting for training");
  const [rounds, setRounds] = useState([]);
  const [accuracy, setAccuracy] = useState([]);
  const [loss, setLoss] = useState([]);

  const fetchGlobalMetrics = async () => {
    try {
      const data = await api.getGlobalMetrics(); // ✅ REAL BACKEND DATA

      if (data.round > 0) {
        setStatus("Training in progress / Completed");

        setRounds(prev =>
          prev.includes(data.round) ? prev : [...prev, data.round]
        );

        setAccuracy(prev =>
          prev.length === data.round ? prev : [...prev, data.accuracy]
        );

        setLoss(prev =>
          prev.length === data.round ? prev : [...prev, data.loss]
        );
      }
    } catch (err) {
      console.error("Error fetching global metrics:", err);
    }
  };

  useEffect(() => {
    fetchGlobalMetrics();
    const interval = setInterval(fetchGlobalMetrics, 3000); // poll real backend
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: rounds,
    datasets: [
      {
        label: "Global Accuracy (Real)",
        data: accuracy,
        borderWidth: 2,
      },
      {
        label: "Global Loss (Real)",
        data: loss,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Hospital Client {id}</h1>
        <p className="text-gray-600">
          Viewing real global model performance from federated server.
        </p>
      </header>

      <div className="bg-white shadow rounded-2xl p-6">
        <p>
          Status: <strong>{status}</strong>
        </p>
        <p>
          Latest Round:{" "}
          <strong>{rounds.length ? rounds[rounds.length - 1] : "N/A"}</strong>
        </p>
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="font-semibold text-lg mb-3">
          Global Model Metrics (Real Data)
        </h2>

        {rounds.length === 0 ? (
          <p>No training rounds completed yet.</p>
        ) : (
          <div className="h-64">
            <Line data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}

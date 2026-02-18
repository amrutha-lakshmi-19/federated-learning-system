import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [status, setStatus] = useState("Idle");
  const [metrics, setMetrics] = useState({
    accuracy: null,
    loss: null,
    round: 0,
  });

  // fetch global model from backend
  const fetchMetrics = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/federated/global-model"
      );
      setMetrics(res.data);
    } catch (err) {
      console.error("Error fetching metrics:", err);
    }
  };

  // start training
  const startTraining = async () => {
    setStatus("Running");

    try {
      await axios.post("http://localhost:5000/api/federated/start-training");
      console.log("Training triggered");

      // wait for aggregation, then refresh metrics
      setTimeout(fetchMetrics, 4000);
    } catch (error) {
      console.error("Error triggering training:", error);
    }
  };

  // load metrics when page loads
  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Federated Learning Dashboard</h1>

      <h2>Control Panel</h2>
      <button onClick={startTraining}>Start Training</button>
      <p>Status: {status}</p>

      <h2>Global Model Metrics</h2>
      <p>
        Accuracy:{" "}
        {metrics.accuracy ? (metrics.accuracy * 100).toFixed(2) + "%" : "Not available"}
      </p>
      <p>
        Loss: {metrics.loss ? metrics.loss.toFixed(4) : "Not available"}
      </p>
      <p>Rounds: {metrics.round}</p>

      <h2>Training Status</h2>
      <p>{status}</p>
    </div>
  );
}

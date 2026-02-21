import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout";

const API = "http://localhost:5000/api/federated";

export default function ClientPage() {
  const { id } = useParams();

  const [client, setClient] = useState(null);
  const [globalModel, setGlobalModel] = useState(null);

  const DATASET_SIZES = {
    client1: 342,
    client2: 296,
    client3: 333,
  };

  const fetchClient = async () => {
    try {
      const res = await axios.get(`${API}/clients`);
      const found = res.data.find((c) => c.name === id);
      setClient(found || null);
    } catch (err) {
      console.error("Error fetching client:", err);
    }
  };

  const fetchGlobalModel = async () => {
    try {
      const res = await axios.get(`${API}/global-model`);
      setGlobalModel(res.data);
    } catch (err) {
      console.error("Error fetching global model:", err);
    }
  };

  useEffect(() => {
    fetchClient();
    fetchGlobalModel();

    const interval = setInterval(() => {
      fetchClient();
      fetchGlobalModel();
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);
const computedProgress =
  client?.status === "Completed"
    ? 100
    : client?.status === "Training"
    ? 60
    : 0;
  return (
    <SidebarLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-emerald-600">
          {id?.toUpperCase()} Details
        </h1>

        <button
          onClick={fetchClient}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Refresh
        </button>
      </div>

      {client ? (
        <>
          {/* Top Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card title="Client ID" value={client.name} />

            <Card
              title="Accuracy"
              value={
                client.accuracy != null
                  ? (client.accuracy * 100).toFixed(2) + "%"
                  : "N/A"
              }
            />

            <Card
              title="Loss"
              value={
                client.loss != null
                  ? client.loss.toFixed(4)
                  : "N/A"
              }
            />

            <Card
              title="Status"
              value={<StatusBadge status={client.status} />}
            />
          </div>

          {/* Training Progress */}
<div className="bg-white p-6 rounded-xl shadow-md mb-8">
  <p className="text-gray-500 mb-2">Training Progress</p>
  <div className="w-full bg-gray-200 rounded-full h-3">
    <div
      className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
      style={{ width: `${computedProgress}%` }}
    />
  </div>
  <p className="text-sm text-gray-500 mt-2">
    {computedProgress}% Completed
  </p>
</div>

          {/* Metadata */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card
              title="Current Round"
              value={globalModel?.round ?? "N/A"}
            />

            <Card
              title="Local Epochs"
              value={client.epochs ?? 100}
            />

            <Card
              title="Dataset Size"
              value={DATASET_SIZES[id?.toLowerCase()] ?? "N/A"}
            />

            <Card
              title="Last Updated"
              value={
                client.updatedAt
  ? new Date(client.updatedAt).toLocaleTimeString()
  : new Date().toLocaleTimeString()
              }
            />
          </div>

          {/* Logs */}
          {/* Logs */}
<div className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-lg font-semibold mb-4">Client Logs</h2>

  <div className="h-40 overflow-y-auto text-sm text-gray-600 space-y-2">
    <p>• Connected to server</p>
    <p>• Participated in round {globalModel?.round ?? 0}</p>

    {client.status === "Completed" && (
      <>
        <p>• Training completed successfully</p>
        <p>• Accuracy: {(client.accuracy * 100).toFixed(2)}%</p>
        <p>• Loss: {client.loss.toFixed(4)}</p>
        <p>• Weights sent to server</p>
      </>
    )}

    {client.status === "Training" && (
      <p>• Training in progress...</p>
    )}
  </div>
</div>
        </>
      ) : (
        <p className="text-gray-500">Waiting for client update...</p>
      )}
    </SidebarLayout>
  );
}

/* ------------------ Components ------------------ */

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <p className="text-gray-500">{title}</p>
      <div className="text-2xl font-bold mt-2 text-gray-800">
        {value}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const isCompleted = status === "Completed";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        isCompleted
          ? "bg-green-100 text-green-600"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "Unknown"}
    </span>
  );
}
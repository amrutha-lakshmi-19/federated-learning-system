import React from "react";

export default function GlobalMetrics({ metrics }) {
  if (!metrics) {
    return (
      <div className="bg-white shadow rounded-2xl p-4">
        Loading metrics...
      </div>
    );
  }

  const hasAccuracy =
    metrics.accuracy !== null && metrics.accuracy !== undefined;

  const hasLoss =
    metrics.loss !== null && metrics.loss !== undefined;

  const hasWeights =
    metrics.weights !== null &&
    metrics.weights !== undefined &&
    Array.isArray(metrics.weights);

  return (
    <div className="bg-white shadow rounded-2xl p-4">
      <h2 className="font-semibold text-lg mb-2">
        Global Model Metrics
      </h2>

      <p>
        <strong>Accuracy:</strong>{" "}
        {hasAccuracy
          ? (metrics.accuracy * 100).toFixed(2) + "%"
          : "Not available"}
      </p>

      <p>
        <strong>Loss:</strong>{" "}
        {hasLoss
          ? metrics.loss.toFixed(2)
          : "Not available"}
      </p>

      <p>
        <strong>Rounds:</strong>{" "}
        {metrics.round ?? 0}
      </p>

      {/* Weights section */}
      {/* Weights section */}
<div className="mt-3">
  <strong>Weights:</strong>

  {hasWeights ? (
    <div className="bg-gray-50 p-2 rounded text-xs mt-1 overflow-x-auto">
      {JSON.stringify(
        metrics.weights.map(w => Number(w.toFixed(2)))
      )}
    </div>
  ) : (
    <p>Not available</p>
  )}
</div>
    </div>
  );
}
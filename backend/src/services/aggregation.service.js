const globalModel = require("../models/globalModel");
const { evaluateGlobalModel } = require("./evaluation");

function federatedAveraging(clientUpdates) {
  if (!clientUpdates || clientUpdates.length === 0) {
    throw new Error("No client updates received for aggregation");
  }

  const numClients = clientUpdates.length;
  const weightLength = clientUpdates[0].weights.length;

  let aggregatedWeights = new Array(weightLength).fill(0);
  let aggregatedBias = 0;

  // Simple average (or you can weight by client dataset size)
  clientUpdates.forEach(client => {
    client.weights.forEach((w, i) => {
      aggregatedWeights[i] += w;
    });
    aggregatedBias += client.bias;
  });

  aggregatedWeights = aggregatedWeights.map(w => w / numClients);
  aggregatedBias = aggregatedBias / numClients;
// For now, use normalization params from first client
// 🔥 Average normalization parameters from all clients
let aggregatedMeans = new Array(clientUpdates[0].means.length).fill(0);
let aggregatedStds = new Array(clientUpdates[0].stds.length).fill(0);

clientUpdates.forEach(client => {
  client.means.forEach((m, i) => {
    aggregatedMeans[i] += m;
  });

  client.stds.forEach((s, i) => {
    aggregatedStds[i] += s;
  });
});

aggregatedMeans = aggregatedMeans.map(m => m / numClients);
aggregatedStds = aggregatedStds.map(s => s / numClients);

  // Evaluate global model properly
const { accuracy, loss, featureNames } =
  evaluateGlobalModel(
    aggregatedWeights,
    aggregatedBias,
    aggregatedMeans,
    aggregatedStds
  );
  // Update global model
globalModel.updateModel(
  aggregatedWeights,
  aggregatedBias,
  accuracy,
  loss,
  featureNames,
  aggregatedMeans,
  aggregatedStds
); 

  return globalModel.getModel();
}

module.exports = { federatedAveraging };

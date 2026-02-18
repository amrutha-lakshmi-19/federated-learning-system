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

  // Evaluate global model properly
   const { accuracy, loss } = evaluateGlobalModel(aggregatedWeights, aggregatedBias);

  // Update global model
  globalModel.updateModel(aggregatedWeights, aggregatedBias, accuracy, loss);
  //const metrics = evaluateGlobalModel(aggregatedWeights, aggregatedBias);
/*const prevAccuracy = globalModel.accuracy ?? metrics.accuracy;
const prevLoss = globalModel.loss ?? metrics.loss;

// small controlled improvement
const accuracy = Math.min(prevAccuracy + 0.01 + Math.random() * 0.02, 0.95);
const loss = Math.max(prevLoss - 0.05 - Math.random() * 0.05, 0.2);

  // Update global model
  globalModel.updateModel(aggregatedWeights, aggregatedBias, accuracy, loss);
  */

  return globalModel.getModel();
}

module.exports = { federatedAveraging };
const { federatedAveraging } = require("../services/aggregation.service");
const globalModel = require("../models/globalModel");
const { predictInstance } = require("../services/evaluation");
let clientUpdates = [];
const REQUIRED_CLIENTS = 3;
let trainingInProgress = false;
let clientMetricsStore = {};

exports.receiveClientUpdate = (req, res) => {
const { clientId, weights, bias, accuracy, loss, means, stds } = req.body;
  if (!clientId || !weights) {
    return res.status(400).json({ message: "Invalid client update" });
  }

  clientMetricsStore[clientId] = { name: clientId, accuracy, loss, status: "Completed" };
clientUpdates.push({ weights, bias, means, stds });
  // Aggregate once per round
  if (clientUpdates.length === REQUIRED_CLIENTS && !trainingInProgress) {
    trainingInProgress = true;

    const updatedGlobal = federatedAveraging(clientUpdates);

    clientUpdates = [];
    setTimeout(() => { trainingInProgress = false; }, 2000);

    return res.status(200).json({
      message: "Aggregation completed",
      globalModel: updatedGlobal
    });
  }

  return res.status(200).json({ message: "Update received, waiting for other clients" });
};
exports.predict = (req, res) => {
  const { features } = req.body;

  if (!features) {
    return res.status(400).json({ message: "Features required" });
  }

  const model = globalModel.getModel();

  if (!model.weights) {
    return res.status(400).json({ message: "Model not trained yet" });
  }

  const result = predictInstance(
    model.weights,
    model.bias,
    features
  );

  res.json(result);
};

exports.getClients = (req, res) => res.status(200).json(Object.values(clientMetricsStore));
exports.getGlobalModel = (req, res) => res.status(200).json(globalModel.getModel());
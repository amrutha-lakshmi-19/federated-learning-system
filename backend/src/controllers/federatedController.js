const { federatedAveraging } = require("../services/aggregation.service");
const globalModel = require("../models/globalModel");

let clientUpdates = [];
const REQUIRED_CLIENTS = 3;
let trainingInProgress = false;
let clientMetricsStore = {};

exports.receiveClientUpdate = (req, res) => {
  const { clientId, weights, bias, accuracy, loss } = req.body;

  if (!clientId || !weights) {
    return res.status(400).json({ message: "Invalid client update" });
  }

  clientMetricsStore[clientId] = { name: clientId, accuracy, loss, status: "Completed" };
  clientUpdates.push({ weights, bias });

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

exports.getClients = (req, res) => res.status(200).json(Object.values(clientMetricsStore));
exports.getGlobalModel = (req, res) => res.status(200).json(globalModel.getModel());
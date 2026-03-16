// src/routes/federatedRoutes.js

const express = require("express");
const router = express.Router();
const globalModel = require("../models/globalModel");
const { predictInstance } = require("../services/evaluation");
const { predict } = require("../controllers/federatedController");
const {
  receiveClientUpdate,
  getGlobalModel,getClients
} = require("../controllers/federatedController");

// Client sends trained weights
router.post("/update", receiveClientUpdate);

// Client / UI fetches current global model
router.get("/global-model", getGlobalModel);
router.get("/clients", getClients);
router.post("/predict", (req, res) => {

  const model = globalModel.getModel();

  if (!model.weights || !model.means || !model.stds) {
    return res.status(400).json({
      error: "Model not trained properly yet"
    });
  }

  // ✅ Get features array directly (frontend sends array)
  const features = req.body.features.map(val => parseFloat(val));

  console.log("Request Body:", req.body);
  console.log("Feature Names:", model.featureNames);
  console.log("Received Features:", features);
  console.log("Means:", model.means);
  console.log("Stds:", model.stds);

  // ✅ Standardize correctly
  const standardized = features.map(
    (x, i) => (x - model.means[i]) / model.stds[i]
  );

  console.log("Standardized:", standardized);

  // ✅ Logistic regression calculation
  let z = model.bias;

  for (let i = 0; i < standardized.length; i++) {
    z += standardized[i] * model.weights[i];
  }

  const rawProbability = 1 / (1 + Math.exp(-z));

// 🔥 Convert to probability of Disease
const probability = 1 - rawProbability;

const label = probability >= 0.5 ? 1 : 0;

  res.json({
    probability,
    label
  });
});

router.post("/start-training", (req, res) => {
  console.log("🚀 Training triggered from dashboard");

  // Send signal to all clients
  req.app.get("io").emit("start_training");

  res.json({ message: "Training started" });
});

module.exports = router;

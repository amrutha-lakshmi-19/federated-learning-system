// src/routes/federatedRoutes.js

const express = require("express");
const router = express.Router();

const {
  receiveClientUpdate,
  getGlobalModel,getClients
} = require("../controllers/federatedController");

// Client sends trained weights
router.post("/update", receiveClientUpdate);

// Client / UI fetches current global model
router.get("/global-model", getGlobalModel);
router.get("/clients", getClients);
router.post("/start-training", (req, res) => {
  console.log("🚀 Training triggered from dashboard");

  // Send signal to all clients
  req.app.get("io").emit("start_training");

  res.json({ message: "Training started" });
});

module.exports = router;
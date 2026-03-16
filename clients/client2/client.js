const path = require("path");
const io = require("socket.io-client");
const trainLocalModel = require("./training/trainer");
const { sendUpdate, getGlobalModel } = require("./services/api");

const CLIENT_ID = "client2";

// connect to server
const socket = io("http://localhost:5000");

console.log(`🚀 ${CLIENT_ID} connected & waiting for training signal...`);

// when server tells to start training
socket.on("start_training", async () => {
  console.log(`📢 ${CLIENT_ID} received training signal`);

  try {
    // get latest global model
    const globalModel = await getGlobalModel();
    console.log("📥 Global model:", globalModel.round);

    // train locally
    const csvPath = path.join(__dirname, "data", "heart_client2.csv");
  const ALGORITHM = "fedprox"; // change to "fedavg" if needed

    const mu = ALGORITHM === "fedprox" ? 0.01 : 0;

    const trained = trainLocalModel(
    csvPath,
    globalModel.weights,
    globalModel.bias,
    mu
  );
    console.log("📤 Sending weights to server...");
await sendUpdate(
  CLIENT_ID,
  trained.weights,
  trained.bias,
  trained.accuracy,
  trained.loss,
  trained.means,
  trained.stds
);
    console.log(`✅ ${CLIENT_ID} round completed`);
  } catch (err) {
    console.error("❌ Training error:", err);
  }
});
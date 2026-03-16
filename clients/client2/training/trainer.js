const fs = require("fs");
const LogisticRegression = require("../model/localModel");

// ---------------- CSV LOADER ----------------
function loadCSV(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const cleanRaw = raw.replace(/^\uFEFF/, "");
  const lines = cleanRaw.trim().split(/\r?\n/);

  const delimiter = lines[0].includes(";") ? ";" : ",";

  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter).map(v => v.trim());
    const row = values.map(v => Number(v));
    if (row.some(v => isNaN(v))) continue;
    data.push(row);
  }

  console.log("✅ Valid rows loaded:", data.length);
  return data;
}

// ---------------- NORMALIZATION ----------------
function normalizeFeatures(X) {
  const numFeatures = X[0].length;
  const means = new Array(numFeatures).fill(0);
  const stds = new Array(numFeatures).fill(0);

  // Mean
  X.forEach(row => {
    row.forEach((val, j) => {
      means[j] += val;
    });
  });

  for (let j = 0; j < numFeatures; j++) {
    means[j] /= X.length;
  }

  // Std Dev
  X.forEach(row => {
    row.forEach((val, j) => {
      stds[j] += Math.pow(val - means[j], 2);
    });
  });

  for (let j = 0; j < numFeatures; j++) {
    stds[j] = Math.sqrt(stds[j] / X.length) || 1;
  }

  const normalized = X.map(row =>
  row.map((val, j) => (val - means[j]) / stds[j])
);

return { normalized, means, stds };
}

// ---------------- TRAINING ----------------
function trainLocalModel(
  csvPath,
  initialWeights = null,
  initialBias = 0,
  mu = 0 // 🔥 mu=0 → FedAvg, mu>0 → FedProx
) {
  const data = loadCSV(csvPath);

  if (data.length === 0) {
    throw new Error("❌ No data found in CSV");
  }

  let X = data.map(row => row.slice(0, row.length - 1));
  const y = data.map(row => row[row.length - 1]);

  // Normalize
  const normResult = normalizeFeatures(X);
X = normResult.normalized;
const means = normResult.means;
const stds = normResult.stds;

  const model = new LogisticRegression(X[0].length);

  // 🔁 Initialize from Global Model if available
  if (initialWeights && initialWeights.length === model.weights.length) {
    model.weights = [...initialWeights];
    model.bias = initialBias;
    console.log("🔁 Initialized local model from global model");
  } else {
    console.log("🆕 Initialized new local model");
    model.weights = model.weights.map(() => Math.random() * 0.1 - 0.05);
    model.bias = Math.random() * 0.1 - 0.05;
  }

  const learningRate = 0.01;   // 🔥 safer learning rate
  const epochs = 10;

  // ---------------- TRAIN LOOP ----------------
  for (let epoch = 0; epoch < epochs; epoch++) {
    for (let i = 0; i < X.length; i++) {
      const prediction = model.predict(X[i]);
      const error = prediction - y[i];

      for (let j = 0; j < model.weights.length; j++) {

        const globalWeight = initialWeights
          ? initialWeights[j]
          : 0;

        // 🔥 FedProx update rule
        model.weights[j] -= learningRate * (
          error * X[i][j] +
          mu * (model.weights[j] - globalWeight)
        );
      }

      // Bias update
      model.bias -= learningRate * (
        error +
        mu * (model.bias - initialBias)
      );
    }
  }

  console.log("✅ Local training complete");
  console.log("🔍 Sample weights:", model.weights.slice(0, 3));

  // ---------------- EVALUATION ----------------
  function sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
  }

  function evaluateLocalModel(model, X, y) {
    let correct = 0;
    let totalLoss = 0;

    for (let i = 0; i < X.length; i++) {
      let z = model.bias;

      for (let j = 0; j < model.weights.length; j++) {
        z += model.weights[j] * X[i][j];
      }

      const pred = sigmoid(z);
      const predictedLabel = pred >= 0.5 ? 1 : 0;

      if (predictedLabel === y[i]) correct++;

      totalLoss += -(y[i] * Math.log(pred + 1e-9) +
        (1 - y[i]) * Math.log(1 - pred + 1e-9));
    }

    return {
      accuracy: correct / X.length,
      loss: totalLoss / X.length,
    };
  }

  const metrics = evaluateLocalModel(model, X, y);

  console.log("📊 Local Accuracy:", metrics.accuracy);
  console.log("📉 Local Loss:", metrics.loss);

  return {
  weights: model.weights,
  bias: model.bias,
  accuracy: metrics.accuracy,
  loss: metrics.loss,
  means,
  stds
};
}

module.exports = trainLocalModel;

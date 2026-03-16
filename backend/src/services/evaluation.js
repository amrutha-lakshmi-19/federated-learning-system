const fs = require("fs");
const path = require("path");

function loadCSVWithHeaders(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.trim().split(/\r?\n/);

  const delimiter = lines[0].includes(";") ? ";" : ",";

  const headers = lines[0].split(delimiter).map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(delimiter).map(Number);
    if (!row.some(isNaN)) data.push(row);
  }

  return { headers, data };
}

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}
function predictInstance(weights, bias, features, means, stds) {

  let z = bias;

  // 🔥 Normalize input using training means & stds
  const normalized = features.map((val, i) =>
    (val - means[i]) / (stds[i] || 1)
  );

  for (let i = 0; i < weights.length; i++) {
    z += weights[i] * normalized[i];
  }

  const probability = 1 / (1 + Math.exp(-z));
  const label = probability >= 0.5 ? 1 : 0;

  return { probability, label };
}


function evaluateGlobalModel(weights, bias = 0, means, stds){
    const filePath = path.join(__dirname, "../../data/validation.csv");

  const { headers, data } = loadCSVWithHeaders(filePath);

  if (!data || data.length === 0) {
    console.log("❌ No validation data found");
    return { accuracy: 0, loss: 0, featureNames: [] };
  }

  let correct = 0;
  let totalLoss = 0;

  data.forEach(row => {
    let X = row.slice(0, row.length - 1);

// 🔥 normalize using global params
X = X.map((val, i) => (val - means[i]) / (stds[i] || 1));
    const y = row[row.length - 1];

    let z = bias;

    for (let i = 0; i < weights.length; i++) {
      z += weights[i] * X[i];
    }

    const pred = sigmoid(z);
    const predictedLabel = pred >= 0.5 ? 1 : 0;

    if (predictedLabel === y) correct++;

    totalLoss += -(y * Math.log(pred + 1e-9) +
                   (1 - y) * Math.log(1 - pred + 1e-9));
  });

  return {
    accuracy: correct / data.length,
    loss: totalLoss / data.length,
    featureNames: headers.slice(0, headers.length - 1)
  };
}


module.exports = { evaluateGlobalModel, predictInstance };

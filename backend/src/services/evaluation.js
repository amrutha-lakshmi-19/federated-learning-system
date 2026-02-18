const fs = require("fs");
const path = require("path");

function loadCSV(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.trim().split(/\r?\n/);
  const delimiter = lines[0].includes(";") ? ";" : ",";
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(delimiter).map(Number);
    if (!row.some(isNaN)) data.push(row);
  }
  return data;
}

function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

// Evaluate using weights + bias
function evaluateGlobalModel(weights, bias = 0) {
  const filePath = path.join(__dirname, "../../data/validation.csv");
  const data = loadCSV(filePath);

  let correct = 0;
  let totalLoss = 0;

  data.forEach(row => {
    const X = row.slice(0, row.length - 1);
    const y = row[row.length - 1];

    let z = bias;
    for (let i = 0; i < weights.length; i++) {
      z += weights[i] * X[i];
    }

    const pred = sigmoid(z);
    const predictedLabel = pred >= 0.5 ? 1 : 0;

    if (predictedLabel === y) correct++;

    totalLoss += -(y * Math.log(pred + 1e-9) + (1 - y) * Math.log(1 - pred + 1e-9));
  });

  return {
    accuracy: correct / data.length,
    loss: totalLoss / data.length
  };
}

module.exports = { evaluateGlobalModel };
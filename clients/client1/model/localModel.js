// Simple Logistic Regression model

class LogisticRegression {
  constructor(numFeatures) {
    this.weights = Array.from({length: numFeatures}, () => Math.random() * 0.01);
    this.bias = 0;
  }

  sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
  }

  predict(features) {
    let z = this.bias;
    for (let i = 0; i < features.length; i++) {
      z += this.weights[i] * features[i];
    }
    return this.sigmoid(z);
  }
}

module.exports = LogisticRegression;
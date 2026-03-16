class GlobalModel {
  constructor() {
    this.weights = null;
    this.bias = 0;
    this.round = 0;
    this.accuracy = null;
    this.loss = null;
    this.history = [];
    this.featureNames = [];

    // 🔥 NEW: store normalization params
    this.means = null;
    this.stds = null;
  }

  getModel() {
    return {
      weights: this.weights,
      bias: this.bias,
      round: this.round,
      accuracy: this.accuracy,
      loss: this.loss,
      featureNames: this.featureNames,
      means: this.means,
      stds: this.stds,
      history: this.history
    };
  }

  updateModel(
    newWeights,
    newBias,
    accuracy,
    loss,
    featureNames,
    means,
    stds
  ) {
    this.weights = [...newWeights];
    this.bias = newBias;
    this.round += 1;
    this.accuracy = accuracy;
    this.loss = loss;
    this.featureNames = featureNames;

    // 🔥 NEW: save normalization parameters
    this.means = means;
    this.stds = stds;

    this.history.push({
      round: this.round,
      accuracy,
      loss,
      sampleWeights: this.weights.slice(0, 5)
    });
  }
}

module.exports = new GlobalModel();

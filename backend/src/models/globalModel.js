class GlobalModel {
  constructor() {
    this.weights = null;
    this.bias = 0;
    this.round = 0;
    this.accuracy = null;
    this.loss = null;
    this.history = [];
  }

  getModel() {
    return {
      weights: this.weights,
      bias: this.bias,
      round: this.round,
      accuracy: this.accuracy,
      loss: this.loss,
      history: this.history
    };
  }

  updateModel(newWeights, newBias, accuracy, loss) {
    this.weights = [...newWeights];
    this.bias = newBias;
    this.round += 1;
    this.accuracy = accuracy;
    this.loss = loss;
    this.history.push({
      round: this.round,
      accuracy,
      loss,
      sampleWeights: this.weights.slice(0, 5)
    });
  }
}

module.exports = new GlobalModel();
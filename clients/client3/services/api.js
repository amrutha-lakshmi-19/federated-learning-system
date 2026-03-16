const axios = require("axios");

const SERVER_URL = "http://localhost:5000/api/federated";

async function sendUpdate(clientId, weights, bias, accuracy, loss, means, stds){
    await axios.post(`${SERVER_URL}/update`, {
  clientId,
  weights,
  bias,
  accuracy,
  loss,
  means,
  stds
});
}

async function getGlobalModel() {
  const res = await axios.get(`${SERVER_URL}/global-model`);
  return res.data;
}

module.exports = {
  sendUpdate,
  getGlobalModel,
};
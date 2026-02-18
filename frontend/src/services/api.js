import axios from "axios";

const API_URL = "http://localhost:5000/api/federated";

const api = {
  getGlobalMetrics: async () => {
    const res = await axios.get(`${API_URL}/global-model`);
    return res.data;
  },

  startTraining: async () => {
    const res = await axios.post(`${API_URL}/start-training`);
    return res.data;
  },

  // 🔥 NEW: fetch all client metrics
  getClients: async () => {
    const res = await axios.get(`${API_URL}/clients`);
    return res.data;
  },
};

export default api;
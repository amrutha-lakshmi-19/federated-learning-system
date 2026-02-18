import axios from "axios";


const api = axios.create({
baseURL: "http://localhost:5000/api/federated",
});


export const startTraining = () => api.post("/start-training");
export const getGlobalModel = () => api.get("/global-model");
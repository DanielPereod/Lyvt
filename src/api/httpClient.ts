import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,  // o process.env si no usas Vite
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;

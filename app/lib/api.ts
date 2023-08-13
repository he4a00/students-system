// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/api/", // Replace this with your API base URL
});

export default api;

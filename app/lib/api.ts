import axios from "axios";

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TokenResponse {
  user: User;
  token: string;
}

let parsedToken = null;

if (typeof window !== "undefined") {
  // Check if localStorage is available before trying to access it
  const user = localStorage.getItem("user");
  parsedToken = user ? (JSON.parse(user) as TokenResponse)?.token : null;
}

const api = axios.create({
  baseURL: "http://localhost:9090/api/",
  headers: {
    Authorization: parsedToken ? `Bearer ${parsedToken}` : undefined,
  },
});

export default api;

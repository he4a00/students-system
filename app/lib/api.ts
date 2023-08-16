"use client";

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

let user = localStorage.getItem("user");
let parsedToken = user ? (JSON.parse(user) as TokenResponse)?.token : null;

const api = axios.create({
  baseURL: "http://localhost:9090/api/", // Replace this with your API base URL
  headers: {
    Authorization: parsedToken ? `Bearer ${parsedToken}` : undefined,
  },
});

export default api;

import axios from "axios";

const API = axios.create({
  baseURL: "https://jupiter-bank.onrender.com/api",
  //baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const loginUser = (data) => API.post("/auth/login", data);

export const registerUser = (data) => API.post("/auth/register", data);

export const logoutUser = () => API.post("/auth/logout");
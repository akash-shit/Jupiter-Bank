import axios from "axios";

const API = axios.create({
  baseURL: "https://jupiter-bank.onrender.com/api/auth",
  withCredentials: true,
});

export const loginUser = (data) => API.post("/login", data);

export const registerUser = (data) => API.post("/register", data);

export const logoutUser = () => API.post("/logout");
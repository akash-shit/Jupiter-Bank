import api from "./axios";

export const transferMoney = (data) => {
  return api.post("/transactions", data);
};

export const addInitialFunds = (data) => {
  return api.post("/transactions/system/initial-funds", data);
};

export const getTransactions = () => {
  return api.get("/transactions");
};
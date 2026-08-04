import api from "./axios";

export const createAccount = () => {
  return api.post("/accounts");
};

export const getAccounts = () => {
  return api.get("/accounts");
};

export const getBalance = (accountId) => {
  return api.get(`/accounts/balance/${accountId}`);
};

export const addFunds = (accountId, amount) => {
  return api.post(`/accounts/${accountId}/add-funds`, {
    amount,
  });
};
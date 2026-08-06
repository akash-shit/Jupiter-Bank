import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../../components/Button";
import bankImage from "../../images/bank.png";

import {
  getAccounts,
  // createAccount,
  getBalance,
} from "../../api/account.api";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    try {
      const res = await getAccounts();

      setAccounts(res.data.accounts);

      const balanceMap = {};

      for (const account of res.data.accounts) {
        const balanceRes = await getBalance(account._id);
        balanceMap[account._id] = balanceRes.data.balance;
      }

      setBalances(balanceMap);
    } catch (err) {
      toast.error("Failed to fetch accounts");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow">
        No accounts found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid">
        {accounts.map((account) => (
          <div
            key={account._id}
            className="mb-3 flex items-center justify-between rounded-xl bg-blue-50 p-5 shadow"
          >
            <div>
              <h3 className="text-[0.6rem] font-medium text-green-700">
                Available Balance
              </h3>

              <p className="text-3xl font-bold text-black">
                ₹ {balances[account._id] ?? 0}
              </p>

              <p className="mt-2 text-[0.7rem] text-gray-600">
                ID: {account._id}
              </p>

              <p className="mt-2 text-[0.7rem]">
                Status:
                <span className="rounded px-2 py-1 text-[0.7rem] text-green-700">
                  {account.status}
                </span>
              </p>
            </div>

            <div className="hidden md:block">
              <img
                src={bankImage}
                alt="Bank"
                className="h-25 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accounts;
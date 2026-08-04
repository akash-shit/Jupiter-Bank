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

  // async function handleCreateAccount() {
  //   try {
  //     await createAccount();

  //     toast.success("Account Created");

  //     fetchAccounts();
  //   } catch (err) {
  //     toast.error("Could not create account");
  //   }
  // }

  return (
    <div className="space-y-6">
      {loading ? (
        <p>Loading...</p>
      ) : accounts.length === 0 ? (
        <p>No accounts found.</p>
      ) : (
        <div className="grid">

          {accounts.map((account) => (

            <div
              key={account._id}
              className="mb-3 rounded-xl bg-blue-50 p-5 shadow flex items-center justify-between"
            >
              <div>
                <h3 className="text-green-700 font-medium text-[0.6rem]">
                  Avaiable Balance
                </h3>
                <p className="text-3xl font-bold text-black">
                  ₹ {balances[account._id] ?? 0}
                </p>

                <p className="mt-2 text-gray-600 text-[0.7rem]">
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
                <img src={bankImage} className=" h-25 object-contain" />
              </div>
            </div>
          ))}
        
        </div>
      )}
    </div>
  );
}

export default Accounts;
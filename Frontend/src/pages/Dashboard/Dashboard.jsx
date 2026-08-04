import { useEffect, useState } from "react";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaExchangeAlt,
  FaHistory,
  FaUserCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { getAccounts, getBalance } from "../../api/account.api";
import { useAuth } from "../../context/AuthContext";
import bankImage from "../../images/bank.png";

function Dashboard() {
  const { user } = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    try {
      const res = await getAccounts();

      setAccounts(res.data.accounts);

      if (res.data.accounts.length > 0) {
        const accountId = res.data.accounts[0]._id;

        const balanceRes = await getBalance(accountId);

        setBalance(balanceRes.data.balance);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const account = accounts[0];

  return (
    <div className="space-y-5">

      {/* Welcome */}
      <div className=" bg-blue-50 p-4 rounded-lg shadow flex items-center justify-between ">
        <h1>
          <p className="text-gray-800 text-lg font-semibold">Welcome,</p>
          <p className="text-blue-600 text-2xl font-semibold">{user?.name} 👋</p>
          <p className="text-gray-500 text-[0.6rem]">
            Manage your money and <br /> track your transactions easily with Jupitar Bank.
          </p>
        </h1>
        <div className="hidden md:block">
          <img src={bankImage} className=" h-25 object-contain" />
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-3">

        {/* Balance */}
        <div className="rounded-2xl bg-white p-4 shadow flex gap-2">
          <FaWallet className="text-3xl text-blue-600 p-2 rounded-lg bg-blue-100" />
          <div className="items-center justify-between">
            <h3 className="text-gray-500 font-medium text-[0.7rem]">
              Balance
            </h3>
            <h2 className="text-lg font-semibold text-black-600">
              ₹ {loading ? "..." : balance}
            </h2>
            <h3 className="text-green-700 font-medium text-[0.6rem]">
              Avaiable Balance
            </h3>
          </div>
        </div>

        {/* Account Status */}
        <div className="rounded-2xl bg-white p-4 shadow">
          <p className="text-gray-500 mb-1 font-medium text-[0.7rem]">
            Account Status
          </p>

          <h2 className="text-sm font-semibold text-black-600 text-green-700">
            {loading ? "..." : account?.status}
          </h2>
        </div>

        {/* Account Details */}
        <div className="rounded-2xl bg-white p-4 shadow flex gap-2">

          {loading ? (
            <p>Loading...</p>
          ) : account ? (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <FaUserCircle className="text-3xl text-blue-600" />
                <p className="text-gray-500 font-medium text-[0.7rem]">
                  Account ID
                </p>
              </div>
                <p className="text-[0.6rem] font-semibold text-black-600">
                  {account._id}
                </p>
              {/* </div> */}
            </div>
          ) : (
            <p>No Account Found</p>
          )}

        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid gap-3">

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white p-4 md:p-6 shadow">

          <h2 className="mb-3 text-gray-800 text-lg font-semibold">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <Link
              to="/profile"
              className="rounded-xl bg-white-600 p-6 text-center text-white shadow transition bg-purple-100 hover:bg-purple-200"
            >
              <FaUserCircle className="mx-auto mb-3 text-2xl text-purple-600" />
              <p className="text-sm font-semibold text-black">Profile</p>
              <p className="text-gray-700 font-medium text-[0.6rem]">View your profile</p>
            </Link>

            <Link
              to="/add-funds"
              className="rounded-xl bg-white-600 p-6 text-center text-white shadow transition bg-blue-100 hover:bg-blue-200"
            >
              <FaWallet className="mx-auto mb-3 text-2xl text-blue-600" />
              <p className="text-sm font-semibold text-black">Add Funds</p>
              <p className="text-gray-700 font-medium text-[0.6rem]">Add money to your account</p>
            </Link>

            <Link
              to="/transfer"
              className="rounded-xl bg-white-600 p-6 text-center text-white shadow transition bg-green-100 hover:bg-green-200"
            >
              <FaExchangeAlt className="mx-auto mb-3 text-2xl text-green-600" />
              <p className="text-sm font-semibold text-black">Transfer Money</p>
              <p className="text-gray-700 font-medium text-[0.6rem]">Send money to anyone</p>
            </Link>

            <Link
              to="/transactions"
              className="rounded-xl bg-white-600 p-6 text-center text-white shadow transition bg-slate-100 hover:bg-slate-200"
            >
              <FaHistory className="mx-auto mb-3 text-2xl text-slate-600" />
              <p className="text-sm font-semibold text-black">Transactions</p>
              <p className="text-gray-700 font-medium text-[0.6rem]">Check your transaction history</p>
            </Link>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
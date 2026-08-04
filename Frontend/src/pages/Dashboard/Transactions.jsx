import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getTransactions } from "../../api/transaction.api";


function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      const res = await getTransactions();
      setTransactions(res.data.transactions);
    } catch (err) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div>
      {transactions.length === 0 ? (
        <div className="rounded-xl bg-white p-6 shadow text-center">
          No Transactions Found
        </div>
      ) : (
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="rounded-xl bg-white p-4 shadow transition hover:shadow-lg"
            >
              <div className="flex items-center justify-between">

                {/* Left */}
                <div>
                  <h2 className="text-sm font-semibold text-black">
                    {transaction.otherUser}
                  </h2>

                  <p className="mt-1 text-[0.6rem] text-gray-400">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Right */}
                <div>
                  <h2
                    className={`text-lg font-semibold ${
                      transaction.isCredit
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {transaction.isCredit ? "+" : ""}
                    ₹{transaction.amount}
                  </h2>
                  <p
                    className={`mt-1 text-[0.6rem] ${
                      transaction.status === "COMPLETED"
                        ? "hidden"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.status}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Transactions;
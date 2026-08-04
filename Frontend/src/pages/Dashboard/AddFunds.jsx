import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import add_money_Image from "../../images/add_money.png";

import Button from "../../components/Button";
import Input from "../../components/Input";

import { getAccounts, addFunds } from "../../api/account.api";

function AddFunds() {
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    try {
      const res = await getAccounts();
      setAccounts(res.data.accounts);
    } catch {
      toast.error("Failed to load accounts");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!accountId || !amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await addFunds(accountId, Number(amount));

      toast.success("Funds added successfully");

      setAmount("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add funds"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-auto rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-gray-900 text-lg font-semibold">Add Funds</p>
          <p className="text-gray-500 text-[0.7rem]">add money from system account</p>
        </div>
        <div className="md:block">
            <img src={add_money_Image} className=" h-35 w-35 object-contain" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="mb-2 block font-medium">
            Select Account
          </label>

          <select
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="w-full rounded-lg border p-1"
          >
            <option value="">Choose an account</option>

            {accounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account._id}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Funds"}
        </Button>

      </form>
    </div>
  );
}

export default AddFunds;
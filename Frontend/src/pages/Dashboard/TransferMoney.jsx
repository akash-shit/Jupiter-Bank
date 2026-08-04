import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Input from "../../components/Input";
import Button from "../../components/Button";
import transferMoneyImg from "../../images/transferMoney.png";

import { getAccounts } from "../../api/account.api";
import { transferMoney } from "../../api/transaction.api";

function TransferMoney() {
  const [accounts, setAccounts] = useState([]);

  const [formData, setFormData] = useState({
    fromAccount: "",
    toAccount: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    try {
      const res = await getAccounts();
      setAccounts(res.data.accounts);
    } catch (err) {
      toast.error("Failed to load accounts");
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await transferMoney({
        ...formData,
        amount: Number(formData.amount),
        idempotencyKey: crypto.randomUUID(),
      });

      toast.success("Transfer Successful");

      setFormData({
        fromAccount: "",
        toAccount: "",
        amount: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Transfer Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl bg-white p-6 shadow"
      >
        <div>
          <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-gray-900 text-lg font-semibold">Transfer Money</p>
                <p className="text-gray-500 text-[0.7rem]">Send money instantly</p>
              </div>
              <div className="md:block">
                  <img src={transferMoneyImg} className=" h-35 w-35 object-contain" />
              </div>
            </div>
          <label className="mb-1 block font-medium">
            From Account
          </label>

          <select
            name="fromAccount"
            value={formData.fromAccount}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
            required
          >
            <option value="">Select Account</option>

            {accounts.map((account) => (
              <option
                key={account._id}
                value={account._id}
              >
                {account._id}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Receiver Account ID"
          name="toAccount"
          value={formData.toAccount}
          onChange={handleChange}
          required
        />

        <Input
          label="Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Transfer"}
        </Button>
      </form>
    </div>
  );
}

export default TransferMoney;
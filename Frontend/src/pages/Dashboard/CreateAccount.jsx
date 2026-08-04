import { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUniversity, FaExclamationTriangle } from "react-icons/fa"; // Added alert icon

import Button from "../../components/Button";
import { createAccount, getAccounts } from "../../api/account.api"; // Use getAccounts matching your file

function CreateAccount() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [checkingAccount, setCheckingAccount] = useState(true); // Tracks database check
  const [hasAccount, setHasAccount] = useState(false);          // Tracks ownership state

  // Check if account exists on page load
  useEffect(() => {
    async function verifyAccountStatus() {
      try {
        const response = await getAccounts();
        
        // Handle standard axios response or intercepted data arrays safely
        const accountsList = response?.data?.accounts || response?.accounts;

        if (accountsList && accountsList.length > 0) {
          setHasAccount(true);
        }
      } catch (err) {
        console.error("Failed to verify user accounts:", err);
      } finally {
        setCheckingAccount(false);
      }
    }
    verifyAccountStatus();
  }, []);

  async function handleCreateAccount(e) {
  e.preventDefault();

  if (hasAccount) {
    toast.error("You already have an active bank account.");
    return;
  }

  try {
    setLoading(true);

    await createAccount();

    toast.success("Account created successfully!");

    navigate("/accounts");   // Redirect after creation
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to create account"
    );
  } finally {
    setLoading(false);
  }
}

  // Show loading spinner while querying database
  if (checkingAccount) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  // Intercept layout screen completely if user already has an account
  if (hasAccount) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <FaExclamationTriangle className="text-4xl text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Action Blocked
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            You already have an active account with Jupitar Bank. We only permit one account per user profile.
          </p>
          <div className="mt-6">
            <Button type="button" onClick={() => navigate("/accounts")}>
              Go to accounts
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <FaUniversity className="text-4xl text-blue-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Create Bank Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create your secure bank account and start managing your money with
            Jupitar Bank.
          </p>
        </div>

        {/* Info Card */}
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-700">
            ✓ One account is allowed per user.
          </p>

          <p className="mt-1 text-xs text-gray-600">
            Your account will be created with the default currency{" "}
            <span className="font-semibold">INR (₹)</span>.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateAccount} className="space-y-6">

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Currency
            </label>

            <select
              disabled
              value="INR"
              className="w-full cursor-not-allowed rounded-xl border bg-gray-100 p-3 text-gray-600"
            >
              <option>INR (₹)</option>
            </select>
          </div>

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create My Account"}
          </Button>

        </form>
      </div>
    </div>
  );
}

export default CreateAccount;

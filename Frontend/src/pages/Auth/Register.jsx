import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { registerUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

      const response = await registerUser(formData);

      login(response.data.user, response.data.token);

      toast.success("Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">

        <h1 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
          Create Account
        </h1>

        <p className="mb-8 text-center text-sm text-gray-500 sm:text-base">
          Start your banking journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </Button>

        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
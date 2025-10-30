import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";
import { UserIcon, MailIcon, LockIcon } from "lucide-react"; // Lucide icons

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await register(form);
      setSuccess("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1400);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 to-blue-100 px-4">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Register for Notes App
        </h2>
        {error && (
          <div className="mb-4 bg-red-100 text-red-600 p-3 rounded text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded text-sm text-center">
            {success}
          </div>
        )}
        <div className="relative mb-4">
          <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            autoComplete="name"
            className="w-full px-10 py-3 border rounded outline-none focus:ring-2 focus:ring-blue-300"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative mb-4">
          <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="username"
            className="w-full px-10 py-3 border rounded outline-none focus:ring-2 focus:ring-blue-300"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="relative mb-4">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            className="w-full px-10 py-3 border rounded outline-none focus:ring-2 focus:ring-blue-300"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="mt-4 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

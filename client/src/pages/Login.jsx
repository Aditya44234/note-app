// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token); // Store JWT
      navigate("/notes"); // Go to notes dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login to Notes App
        </h2>
        {error && (
          <div className="mb-3 text-red-600 bg-red-100 p-2 rounded text-sm text-center">
            {error}
          </div>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          className="mb-4 w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-300"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          className="mb-4 w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-300"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="mt-4 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

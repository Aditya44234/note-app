// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";

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
    console.log(form)
    try {

      await register(form);
      setSuccess("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1400);
    } catch (err) {
      console.log(err)
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 to-blue-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Register for Notes App
        </h2>
        {error && (
          <div className="mb-3 text-red-600 bg-red-100 p-2 rounded text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 text-green-700 bg-green-100 p-2 rounded text-sm text-center">
            {success}
          </div>
        )}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          autoComplete="name"
          className="mb-4 w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-300"
          value={form.name}
          onChange={handleChange}
          required
        />
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
          autoComplete="new-password"
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

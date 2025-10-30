// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [form, setForm] = useState({ name: "", email: "" });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data.user);
      setForm({ name: res.data.user.name, email: res.data.user.email });
    } catch (err) {
      // If token invalid, log out
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await updateProfile(form);
      setMsg("Profile updated.");
      setProfile(form);
      setEdit(false);
    } catch (err) {
      setMsg("Error updating profile.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Your Profile
        </h2>
        {msg && (
          <div className="mb-3 text-blue-700 bg-blue-50 p-2 rounded text-sm text-center">
            {msg}
          </div>
        )}
        {!edit ? (
          <>
            <div className="mb-3">
              <span className="block text-sm text-gray-500 mb-1">Name</span>
              <span className="font-medium text-lg">{profile.name}</span>
            </div>
            <div className="mb-5">
              <span className="block text-sm text-gray-500 mb-1">Email</span>
              <span className="font-medium text-lg">{profile.email}</span>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              className="mb-3 w-full px-3 py-2 border rounded"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="mb-3 w-full px-3 py-2 border rounded"
              value={form.email}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition mb-3"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="w-full bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition"
              onClick={() => setEdit(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

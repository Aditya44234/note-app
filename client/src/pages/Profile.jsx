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
      setMsg("Profile updated successfully.");
      setProfile(form);
      setEdit(false);
    } catch (err) {
      setMsg("Error updating profile. Please try again.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/notes");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-between mb-6">
          <button
            onClick={handleBack}
            className="text-gray-600 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition font-medium"
          >
            ← Back to Notes
          </button>
          <button
            onClick={handleLogout}
            className="text-red-600 font-semibold bg-red-100 hover:bg-red-200 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">
          Your Profile
        </h2>
        {msg && (
          <div
            className={`mb-6 p-3 rounded text-center text-sm ${
              msg.includes("Error")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-700"
            }`}
          >
            {msg}
          </div>
        )}
        {!edit ? (
          <>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
              <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <p className="text-lg font-semibold text-gray-800">{profile.email}</p>
            </div>
            <button
              onClick={() => setEdit(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded font-semibold"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mb-5 w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mb-6 w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Email"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded font-semibold mb-4 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setEdit(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 transition text-gray-700 py-3 rounded font-semibold"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

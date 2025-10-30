import { useEffect, useState } from "react";
import { getNotes, addNote, updateNote, deleteNote } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data.notes || []);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateNote(editId, form);
        setMsg("Note updated.");
      } else {
        await addNote(form);
        setMsg("Note added.");
      }
      setForm({ title: "", content: "" });
      setEditId(null);
      fetchNotes();
    } catch (err) {
      setMsg("Error saving note.");
    }
    setLoading(false);
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditId(note._id);
    setMsg("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    setLoading(true);
    try {
      await deleteNote(id);
      setMsg("Note deleted.");
      fetchNotes();
    } catch {
      setMsg("Unable to delete.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-700">Your Notes</h2>
          <div className="space-x-3">
            <button
              onClick={goToProfile}
              className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300 font-semibold transition"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition text-gray-700 font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        <form className="mb-8" onSubmit={handleSubmit}>
          {msg && (
            <div className="mb-4 text-center text-blue-700 bg-blue-50 p-3 rounded text-sm font-medium">
              {msg}
            </div>
          )}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="content"
            rows={4}
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? editId
                ? "Saving..."
                : "Adding..."
              : editId
              ? "Update Note"
              : "Add Note"}
          </button>
        </form>

        <div className="space-y-5">
          {notes.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-lg">
              No notes found.
            </p>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-lg shadow p-5 sm:flex sm:items-center justify-between space-y-3 sm:space-y-0"
              >
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-semibold text-xl text-gray-800 truncate">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 mt-1 whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
                <div className="flex space-x-3 mt-4 sm:mt-0 sm:ml-6">
                  <button
                    onClick={() => handleEdit(note)}
                    className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-xs font-semibold transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="px-3 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 text-xs font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

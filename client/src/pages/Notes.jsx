// src/pages/Notes.jsx
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

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data.notes || []);
    } catch (err) {
      // If token invalid, log out
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
  };

  const handleSubmit = async e => {
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

  const handleEdit = note => {
    setForm({ title: note.title, content: note.content });
    setEditId(note._id);
    setMsg("");
  };

  const handleDelete = async id => {
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

  return (
    <div className="min-h-screen bg-gray-50 p-2 flex flex-col items-center">
      <div className="w-full max-w-xl mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Your Notes</h2>
          <button
            className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <form
          className="bg-white p-4 rounded shadow mb-6"
          onSubmit={handleSubmit}
        >
          {msg && (
            <div className="mb-3 text-blue-700 bg-blue-50 p-2 rounded text-sm text-center">
              {msg}
            </div>
          )}
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="mb-2 w-full px-3 py-2 border rounded"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            className="mb-2 w-full px-3 py-2 border rounded"
            value={form.content}
            onChange={handleChange}
            required
            rows={3}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition mt-1"
            disabled={loading}
          >
            {loading ? (editId ? "Saving..." : "Adding...") : editId ? "Update Note" : "Add Note"}
          </button>
        </form>
        <div className="space-y-4">
          {notes.length === 0 && (
            <div className="text-gray-400 text-center py-8">No notes found.</div>
          )}
          {notes.map(note => (
            <div
              key={note._id}
              className="bg-white rounded shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-800 truncate">{note.title}</div>
                <div className="text-gray-500 break-words">{note.content}</div>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0 sm:ml-4">
                <button
                  className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200"
                  onClick={() => handleEdit(note)}
                >
                  Edit
                </button>
                <button
                  className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

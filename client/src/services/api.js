import axios from "axios";

// Use deployed backend API base URL
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
});

// Automatically attach JWT token from localStorage to all requests
API.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ------------ AUTH ROUTES -------------
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

// ------------ PROFILE -----------------
export const getProfile = () => API.get("/users/profile");
export const updateProfile = (data) => API.put("/users/profile", data);

// ------------ NOTES CRUD --------------
export const getNotes = () => API.get("/notes");
export const getNote = (id) => API.get(`/notes/${id}`);
export const addNote = (data) => API.post("/notes", data);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

// ------ ADMIN ROUTES (optional) -------
export const adminDeleteNote = (id) => API.delete(`/notes/admin/${id}`);
export const getUsers = () => API.get("/users");

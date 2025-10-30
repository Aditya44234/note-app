import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";
function App() {
  // Check if user is logged in (if token in localStorage)
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protect below routes: redirect to login if not logged in */}
            <Route
              path="/notes"
              element={isLoggedIn ? <Notes /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
            {/* Default route: if logged in -> notes, else -> login */}
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/notes" : "/login"} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

# 📝 Notes App — Fullstack Demo (MERN + Vite + Tailwind)

A complete demo of production-grade Notes CRUD with authentication, using a modern stack: Node.js Express backend (server) and Vite React frontend (client) styled with Tailwind. Deployed backend (Render), frontend deployed on Vercel.

---

## 📦 Folder Structure

```
root/
├── server/ # Backend (Node.js, Express, MongoDB)
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── middlewares/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── utils/
│ │ ├── validations/
│ │ ├── app.js
│ │ ├── server.js
│ │ └── swagger.json
│ ├── .env
│ ├── package.json
│ ├── postman_collection.json
│ └── README.md
|
├── client/ # Frontend (Vite, React, Tailwind)
│ ├── public/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ ├── Notes.jsx
│ │ │ └── Profile.jsx
│ │ ├── services/
│ │ │ └── api.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── .env
│ ├── package.json
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ ├── vite.config.js
│ └── vercel.json

```


---

## 🚀 Project Overview

- **Backend**: Express API, MongoDB Atlas, JWT Auth, modular controllers/routes/middleware, validation.
- **Frontend**: Vite React, Tailwind CSS, simple professional pages: Login, Register, Notes CRUD, Profile.
- **API Calls**: Axios via `/src/services/api.js` (frontend).
- **Demo SaaS Features**: Auth, CRUD, protected routes, role support (admin endpoints optional).

---

## 🌐 Live Demo URLs

- **Backend (Render)**:  
  `https://note-app-2-euwg.onrender.com/`

- **Frontend (Vercel/localhost/preview)**:  
  https://note-app-pi-swart.vercel.app/

---

## 🛠️ Getting Started

### 1. **Backend: server/**

- Install dependencies:

```
cd server
npm install
```

- Create `.env`:
```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

- Start server:
```
npm start
```

- API docs at `/api-docs` (Swagger).
- Optional: Import Postman collection to test endpoints.

### 2. **Frontend: client/**

- Install dependencies:

```
cd client
npm install
```
- Add `.env` (for deployed backend):
```
VITE_API_URL=https://note-app-2-euwg.onrender.com/api/v1
```

- Start dev server:
```
npm run dev
```
- Default port is `http://localhost:5173`.

---

## ✨ Features Summary

- **Auth**: Register, Login (JWT, bcrypt, validation).
- **Notes**: Create, Read, Update, Delete—all protected by login.
- **Profile**: View and edit profile; Logout; Back to notes.
- **Routing**: React Router DOM, route guard using JWT in localStorage.
- **API Integration**: All calls via `api.js`, using JWT and CORS enabled.
- **Minimal UI**: Professional, clean, easily readable—just to demo backend features.
- **Font**: Global Poppins for modern look.
- **Deployment Ready**: Backend template for Render/Vercel, frontend has `vercel.json`.

---

## 🎨 Tech Stack

- **Backend**: Node.js, Express, MongoDB, JWT, bcrypt, swagger, express-validator
- **Frontend**: React (Vite), Tailwind CSS, Axios
- **Infra**: Render (backend), Vercel (frontend), MongoDB Atlas

---

## 👀 Usage Flow

1. Register for an account.
2. Login, store token, redirect to Notes dashboard.
3. Create, update or delete notes.
4. Edit your profile, return to Notes, logout anytime (session ends).
5. Page navigation buttons for easy movement (Notes ←→ Profile).

---

## 👨‍💻 Author

Aditya Joshi

---

## 📜 License

MIT (or use your license as needed)

---

## 📎 Extras

- Any custom icons, styling, improvement can be directly done via Tailwind in `index.css`.
- Change fonts or colors in Tailwind config for easy branding.
- Backend exposed Swagger at `/api-docs` for easy dev/test.

---

## 💡 Quick Links

- **Swagger Docs:** `/api-docs` on backend for every endpoint.
---

Copy this README.md to your repo, update any links, and you're all set for showcase and future development!



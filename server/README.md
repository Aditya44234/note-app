#   SERVER — Notes API Backend

A production-ready backend for a Notes app, built using Node.js, Express, MongoDB, and JWT authentication. Features full CRUD for notes, user roles (user/admin), validation, and robust documentation via Swagger and a Postman collection.

---

##  Features

- **Authentication:** Register & login (JWT, bcrypt)
- **Role-Based Access:** User & admin endpoints (delete/see all notes, see all users)
- **Notes CRUD:** Create, read, update, delete notes (only own unless admin)
- **Validation:** Uses express-validator for all key routes
- **Swagger Docs:** Interactive API docs at `/api-docs`
- **Postman Collection:** Ready-to-import `postman_collection.json` for easy testing

---

## 📁 Folder Structure

```
server/
├── src/
│ ├── config/ # Database config
│ ├── controllers/ # Route logic
│ ├── middlewares/ # Auth, validation, error & role middlewares
│ ├── models/ # Mongoose schemas: User, Note
│ ├── routes/ # Route files: auth, note, user
│ ├── utils/ # Helper functions (JWT, logger)
│ ├── validations/ # express-validator schemas
│ ├── app.js # Main express app
│ ├── server.js # App server startup
│ └── swagger.json # Swagger docs config
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── postman_collection.json
└── README.md

```


---

## Quickstart

1. **Clone the repo:**  

```
git clone https://github.com/your-username/notes-v1-backend.git
cd server
```

2. **Install dependencies:**  

```
npm install
```


3. **Configure environment:**  
Copy `.env.example` to `.env` and fill:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```


4. **Start server:**  
```
npm start
```


Server runs at `http://localhost:3000`.

5. **Docs:**  
- Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Postman: Import `postman_collection.json`

---

## 🔑 Main Endpoints

| Method | Endpoint                              | Description                         | Auth     |
|--------|---------------------------------------|-------------------------------------|----------|
| POST   | /api/v1/auth/register                 | Register new user                   | None     |
| POST   | /api/v1/auth/login                    | Login, get JWT                      | None     |
| GET    | /api/v1/users/profile                 | Get own profile                     | Bearer   |
| PUT    | /api/v1/users/profile                 | Update profile                      | Bearer   |
| GET    | /api/v1/users                         | List all users (admin only)         | Bearer   |
| POST   | /api/v1/notes                         | Create note                         | Bearer   |
| GET    | /api/v1/notes                         | Get all notes (own/admin)           | Bearer   |
| GET    | /api/v1/notes/:id                     | Get single note                     | Bearer   |
| PUT    | /api/v1/notes/:id                     | Update note                         | Bearer   |
| DELETE | /api/v1/notes/:id                     | Delete own note                     | Bearer   |
| DELETE | /api/v1/notes/admin/:id               | Admin delete any note               | Bearer   |

---

## 🛡️ Authentication

Use `Bearer <token>` in `Authorization` header for all protected routes.  
Tokens are received via login.

---

##  Validation

- Registration/login: Checks email, password length, etc.
- Notes: Title and content required.

---

##  Scalability & Extensions

- Easily Dockerized for cloud or local containers
- Can scale horizontally (multiple servers, load balancer)
- Ready for frontend integration (React/Next.js, etc.)
- Extendible for categories, sharing, or file uploads

---

## 🌐 API Docs

- Visit [`/api-docs`](http://localhost:3000/api-docs) for interactive documentation via Swagger.

---

## Author

Aditya Joshi

---

##  License

MIT (or your license here)


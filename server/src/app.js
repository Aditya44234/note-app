// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi=require("swagger-ui-express")
const swaggerDocument = require('./swagger.json');

// ROUTE IMPORTS
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const noteRoutes = require('./routes/note.routes');

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://note-app-pi-swart.vercel.app/"
  ],
  credentials: true
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/notes', noteRoutes);

app.get('/', (req, res) => {
    res.json({message:'Notes App Backend is running!'});
});

module.exports = app;

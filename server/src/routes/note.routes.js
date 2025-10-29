const express = require("express");
const creatNoteVAlidation = require("../validations/note.validation")
const validate = require("../middlewares/validation.middleware")
const router = express.Router();
const noteController = require('../controllers/note.controller')

const authMiddleWare = require("../middlewares/auth.middleware")
// const roleMiddleware = require("../middlewares/role.middleware")
// Create a new note (protected)
router.post('/', authMiddleWare, noteController.createNote);

// Get all notes (protected)
router.get('/', authMiddleWare, noteController.getNotes);

// Get single note (protected)
router.get('/:id', authMiddleWare, noteController.getNote);

// Update note (protected)
router.put('/:id', authMiddleWare, noteController.updateNote);

// Delete (regular user deletes their own note)
router.delete('/:id', authMiddleWare, noteController.deleteNote);

// ADMIN ONLY: Delete any note
// router.delete('/admin/:id', authMiddleWare, roleMiddleware('admin'), noteController.deleteAnyNote);
module.exports = router;


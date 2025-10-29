const Note = require("../models/note.model")

exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({
            title,
            content, user: req.user.userId
        });
        await note.save();

        res.status(201).json({ message: 'Note created successfully', note });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}

exports.getNotes = async (req, res) => {
    try {
        let notes;
        if (req.user.role === "admin") {
            notes = await Note.find().populate('user', 'name email');
        } else {
            notes = await Note.find({ user: req.user.userId });
        }

        res.status(200).json({ notes });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}
//  Get single note by ID
exports.getNote = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user.userId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check ownership for non-admin users
        if (req.user.role !== 'admin' && note.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.status(200).json({ note });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}

exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            { title, content },
            { new: true, runValidators: true }
        );
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note updated successfully', note });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
}
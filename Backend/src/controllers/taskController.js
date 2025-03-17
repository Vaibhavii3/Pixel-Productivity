const Note = require("../models/Task");

// Get all notes
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes" });
    }
};

// Create a new note
exports.createNote = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "Note content is required" });
        }

        const newNote = new Note({ content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Error creating note" });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note" });
    }
};

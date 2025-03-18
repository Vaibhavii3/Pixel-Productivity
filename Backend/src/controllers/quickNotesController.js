const QuickNote = require("../models/QuickNotes");

//Get all notes
exports.getQuickNotes = async (req, res) => {
    try {
        const QuickNotes = await QuickNote.find();
        res.json(QuickNotes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes" });
    }
};

//Create a new note
exports.createQuickNote = async (req, res) => {
    try {
        const { notes } = req.body;
        if (!notes) {
            return res.status(400).json({ message: "Note content is required" });
        }

        const newQuickNote = new QuickNote({ notes });
        await newQuickNote.save();
        res.status(201).json(newQuickNote);
    } catch (error) {
        res.status(500).json({ message: "Error creating note" });
    }
};

//Delete a note
exports.deleteQuickNote = async ( req, res) => {
    try {
        const { id } = req.params;
        await QuickNote.findByIdAndDelete(id);
        res.json({ message: "Note deleted succesfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note"});
    }
};
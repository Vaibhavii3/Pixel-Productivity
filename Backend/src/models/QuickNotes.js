const mongoose = require("mongoose");

const quickNotesSchema = new mongoose.Schema({
    notes: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("QuickNotes", quickNotesSchema);
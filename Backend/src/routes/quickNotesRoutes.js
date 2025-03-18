const express = require("express");
const { getQuickNotes, createQuickNote, deleteQuickNote } = require("../controllers/quickNotesController");

const router = express.Router();

router.get("/", getQuickNotes);
router.post("/", createQuickNote);
router.delete("/:id", deleteQuickNote);

module.exports = router;
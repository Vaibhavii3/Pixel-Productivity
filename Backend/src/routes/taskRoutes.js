const express = require("express");
const { getNotes, createNote, deleteNote } = require("../controllers/taskController");

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);

module.exports = router;

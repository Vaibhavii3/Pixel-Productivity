const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: "https://pixel-productivity.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
}));
app.use(express.json());

// Routes
app.use("/api/notes", require("./routes/taskRoutes"));
app.use("/api/quicknotes", require("./routes/quickNotesRoutes"));



module.exports = app;

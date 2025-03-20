const express = require("express");
const { register, login, verifyToken, protectedRoute } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected", verifyToken, protectedRoute);

module.exports = router;
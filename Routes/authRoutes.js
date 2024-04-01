const express = require("express");
const router = express.Router();
const verifyToken = require('../Middlewares/authMiddleware');
const { userRegister, userLogin, addFeedback } = require('../Controllers/authController');

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/add-feedback", verifyToken, addFeedback)

module.exports = router;
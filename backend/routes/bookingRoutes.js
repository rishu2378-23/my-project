const express = require("express");
const router = express.Router();
const { bookClass, getUserBookings, getMySessions } = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, bookClass);
router.get("/my-sessions", authMiddleware, getMySessions);
router.get("/user/:userId", authMiddleware, getUserBookings);

module.exports = router;

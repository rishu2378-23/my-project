const express = require("express");
const router = express.Router();
const { getAllUsers, getAllClasses, getAllBookings } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Admin Role Check Middleware
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

router.use(authMiddleware, requireAdmin);

router.get("/users", getAllUsers);
router.get("/classes", getAllClasses);
router.get("/bookings", getAllBookings);

module.exports = router;

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db=require("./db/connection");
const authRoutes = require("./routes/authRoutes");
const classRoutes = require("./routes/classRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const adminRoutes = require("./routes/adminRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);
// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Yoga & Wellness Wave API is running!"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
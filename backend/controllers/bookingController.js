const db = require("../db/connection");

const bookClass = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  // Use authenticated user ID strictly from JWT, never trust frontend user_id
  const user_id = req.user.id;
  const { class_id } = req.body;

  if (!class_id) {
    return res.status(400).json({ message: "Class ID is required" });
  }

  try {
    // Check if already booked
    const [existingBooking] = await db.promise().query(
      "SELECT id FROM class_bookings WHERE class_id = ? AND user_id = ?",
      [class_id, user_id]
    );

    if (existingBooking.length > 0) {
      return res.status(409).json({ message: "Class already booked by user" });
    }

    // Insert booking
    await db.promise().query(
      "INSERT INTO class_bookings (class_id, user_id) VALUES (?, ?)",
      [class_id, user_id]
    );

    res.status(201).json({ message: "Booking successful" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMySessions = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // Use authenticated user ID strictly from JWT
  const userId = req.user.id;

  try {
    const query = `
      SELECT 
        cb.id as booking_id,
        cb.class_id,
        yc.title,
        u.name as instructor_name,
        yc.class_date,
        yc.start_time,
        yc.duration,
        yc.difficulty,
        yc.video_url,
        cb.status,
        cb.booked_at
      FROM class_bookings cb
      JOIN yoga_classes yc ON cb.class_id = yc.id
      JOIN instructors i ON yc.instructor_id = i.id
      JOIN users u ON i.user_id = u.id
      WHERE cb.user_id = ?
      ORDER BY yc.class_date DESC, yc.start_time DESC
    `;
    const [sessions] = await db.promise().query(query, [userId]);
    const enriched = sessions.map(s => ({
      ...s,
      video_url: s.video_url || "https://www.w3schools.com/html/mov_bbb.mp4"
    }));
    res.json(enriched);
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserBookings = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const userId = req.params.userId;

  if (req.user.role !== "admin" && String(req.user.id) !== String(userId)) {
    return res.status(403).json({ message: "Access denied. You can only view your own bookings." });
  }

  try {
    const query = `
      SELECT 
        cb.id as booking_id,
        cb.class_id,
        yc.title,
        u.name as instructor_name,
        yc.class_date,
        yc.start_time,
        yc.duration,
        yc.difficulty,
        yc.video_url,
        cb.status,
        cb.booked_at
      FROM class_bookings cb
      JOIN yoga_classes yc ON cb.class_id = yc.id
      JOIN instructors i ON yc.instructor_id = i.id
      JOIN users u ON i.user_id = u.id
      WHERE cb.user_id = ?
      ORDER BY yc.class_date DESC, yc.start_time DESC
    `;
    const [sessions] = await db.promise().query(query, [userId]);
    const enriched = sessions.map(s => ({
      ...s,
      video_url: s.video_url || "https://www.w3schools.com/html/mov_bbb.mp4"
    }));
    res.json(enriched);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { bookClass, getUserBookings, getMySessions };

const db = require("../db/connection");

const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.promise().query("SELECT id, name, email, role, created_at FROM users");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const [classes] = await db.promise().query("SELECT * FROM yoga_classes");
    res.json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const query = `
      SELECT cb.id, u.name as user_name, yc.title as class_title, cb.status, cb.booked_at
      FROM class_bookings cb
      JOIN users u ON cb.user_id = u.id
      JOIN yoga_classes yc ON cb.class_id = yc.id
    `;
    const [bookings] = await db.promise().query(query);
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllUsers, getAllClasses, getAllBookings };

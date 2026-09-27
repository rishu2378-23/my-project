const db = require("../db/connection");

// Create a new class
const createClass = async (req, res) => {
  const { instructor_id, title, description, class_date, start_time, duration, difficulty, meeting_link, max_students } = req.body;

  if (!instructor_id || !title || !class_date || !start_time) {
    return res.status(400).json({ message: "Instructor ID, title, date, and start time are required" });
  }

  try {
    const query = `
      INSERT INTO yoga_classes (instructor_id, title, description, class_date, start_time, duration, difficulty, meeting_link, max_students)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.promise().query(query, [
      instructor_id, title, description, class_date, start_time, duration || 60, difficulty || 'Beginner', meeting_link, max_students || 20
    ]);

    res.status(201).json({ message: "Class created successfully", classId: result.insertId });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// View classes by instructor
const getInstructorClasses = async (req, res) => {
  const { instructorId } = req.params;

  try {
    const query = "SELECT * FROM yoga_classes WHERE instructor_id = ?";
    const [classes] = await db.promise().query(query, [instructorId]);
    res.json(classes);
  } catch (error) {
    console.error("Error fetching instructor classes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllInstructors = async (req, res) => {
  try {
    const query = `
      SELECT u.id, u.name, i.specialization
      FROM users u
      JOIN instructors i ON u.id = i.user_id
    `;
    const [instructors] = await db.promise().query(query);
    res.json(instructors);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createClass, getInstructorClasses, getAllInstructors };

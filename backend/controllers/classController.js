const db = require("../db/connection");

const getAllClasses = async (req, res) => {
  try {
    const query = `
      SELECT 
        yc.id, yc.title, yc.description, yc.class_date, yc.start_time, yc.duration, yc.difficulty, yc.meeting_link, yc.max_students, 
        u.name as instructor_name,
        (yc.max_students - (SELECT COUNT(*) FROM class_bookings cb WHERE cb.class_id = yc.id AND cb.status != 'cancelled')) as available_seats
      FROM yoga_classes yc
      JOIN instructors i ON yc.instructor_id = i.id
      JOIN users u ON i.user_id = u.id
    `;
    const [classes] = await db.promise().query(query);
    res.json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

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

module.exports = { getAllClasses, createClass, getInstructorClasses, getAllInstructors };

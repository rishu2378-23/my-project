const db = require("../db/connection");

const addFeedback = async (req, res) => {
  const { class_id, user_id, rating, comment } = req.body;

  if (!class_id || !user_id || !rating) {
    return res.status(400).json({ message: "Class ID, User ID, and Rating are required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    // Check if feedback already exists
    const [existingFeedback] = await db.promise().query(
      "SELECT id FROM feedback WHERE class_id = ? AND user_id = ?",
      [class_id, user_id]
    );

    if (existingFeedback.length > 0) {
      return res.status(409).json({ message: "Feedback already submitted for this class" });
    }

    // Insert feedback
    await db.promise().query(
      "INSERT INTO feedback (class_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
      [class_id, user_id, rating, comment]
    );

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Feedback error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addFeedback };

const db = require("../db/connection");

exports.sendMessage = (req, res) => {
  const { receiver_id, message } = req.body;
  const sender_id = req.user.id;

  if (!receiver_id || !message) {
    return res.status(400).json({ message: "Receiver and message are required" });
  }

  const query = "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)";
  db.query(query, [sender_id, receiver_id, message], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Message sent successfully", messageId: result.insertId });
  });
};

exports.getMessages = async (req, res) => {
  const { userId, otherUserId } = req.params;
  try {
    const query = `
      SELECT * FROM messages 
      WHERE (sender_id = ? AND receiver_id = ?) 
         OR (sender_id = ? AND receiver_id = ?)
      ORDER BY sent_at ASC
    `;
    const [messages] = await db.promise().query(query, [userId, otherUserId, otherUserId, userId]);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getConversations = async (req, res) => {
  const userId = req.user.id;
  try {
    const query = `
      SELECT DISTINCT u.id, u.name 
      FROM users u
      JOIN messages m ON (m.sender_id = u.id OR m.receiver_id = u.id)
      WHERE (m.sender_id = ? OR m.receiver_id = ?)
      AND u.id != ?
    `;
    const [conversations] = await db.promise().query(query, [userId, userId, userId]);
    res.json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Server error" });
  }
};


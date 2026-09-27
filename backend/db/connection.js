const mysql = require("mysql2");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const connection = mysql.createConnection({
  host: process.env.DB_HOST === 'localhost' ? '127.0.0.1' : (process.env.DB_HOST || '127.0.0.1'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }

  console.log("MySQL connected successfully!");

  // Ensure video_url column exists in yoga_classes table
  connection.query("SHOW COLUMNS FROM yoga_classes LIKE 'video_url'", (colErr, results) => {
    if (!colErr && results.length === 0) {
      connection.query("ALTER TABLE yoga_classes ADD COLUMN video_url VARCHAR(500)", (alterErr) => {
        if (alterErr) {
          console.error("Error adding video_url column:", alterErr.message);
        } else {
          console.log("Added video_url column to yoga_classes successfully.");
        }
      });
    }
  });
});

module.exports = connection;
require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

async function resetAdminPassword() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const email = "anu@gmail.com";

    // Find user
    const [users] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      console.error(`User with email ${email} not found.`);
      process.exit(1);
    }

    const user = users[0];

    if (user.role !== "admin") {
      console.error(`User ${email} exists but is not an admin (role: ${user.role}).`);
      process.exit(1);
    }

    const newPassword = "AdminWave2026!";
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const [result] = await connection.execute(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email]
    );

    if (result.affectedRows === 0) {
      console.error("Failed to update password.");
      process.exit(1);
    }

    console.log("SUCCESS: Admin password reset successfully for anu@gmail.com.");
    console.log("--------------------------------------------------");
    console.log(`Temporary Password: ${newPassword}`);
    console.log("--------------------------------------------------");

  } catch (error) {
    console.error("Error resetting admin password:", error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

resetAdminPassword();

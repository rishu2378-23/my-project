require("dotenv").config();
const mysql = require("mysql2/promise");

const email = process.argv[2];

if (!email) {
  console.error("Please provide an email address as an argument: node promote_admin.js <email>");
  process.exit(1);
}

async function promoteToAdmin() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const [result] = await connection.execute(
      "UPDATE users SET role = 'admin' WHERE email = ?",
      [email]
    );

    if (result.affectedRows === 0) {
      console.log(`No user found with email: ${email}`);
    } else {
      console.log(`User ${email} promoted to admin successfully.`);
    }
  } catch (error) {
    console.error("Error promoting user:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit(0);
  }
}

promoteToAdmin();

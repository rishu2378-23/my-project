const db = require("./db/connection");

async function testQuery() {
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
    console.log("Full classes query successful:", classes);
  } catch (err) {
    console.error("Full classes query failed:", err);
  } finally {
    db.end();
  }
}

testQuery();

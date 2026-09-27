import { jsPDF } from "jspdf";

export const generateReceiptPDF = (booking, user) => {
  const doc = new jsPDF();
  
  // Background header banner (Sage green)
  doc.setFillColor(135, 168, 147);
  doc.rect(0, 0, 210, 40, "F");

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("YOGA & WELLNESS WAVE", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Official Class Booking Receipt", 105, 30, { align: "center" });

  // Receipt details box (Cream background)
  doc.setFillColor(251, 249, 245);
  doc.setDrawColor(216, 208, 193);
  doc.roundedRect(20, 50, 170, 135, 3, 3, "FD");

  doc.setTextColor(44, 62, 53);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Booking Confirmation", 30, 65);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const startY = 80;
  const lineHeight = 10;
  const col1 = 30;
  const col2 = 90;

  const details = [
    ["Receipt / Booking ID:", `#YWW-${booking.booking_id}`],
    ["Member Name:", user?.name || "Valued Member"],
    ["Member Email:", user?.email || "N/A"],
    ["Class Name:", booking.title],
    ["Instructor:", booking.instructor_name],
    ["Date & Time:", `${new Date(booking.class_date).toLocaleDateString()} at ${booking.start_time}`],
    ["Duration:", `${booking.duration} minutes`],
    ["Difficulty Level:", booking.difficulty],
    ["Booking Date:", booking.booked_at ? new Date(booking.booked_at).toLocaleString() : new Date().toLocaleString()],
    ["Booking Status:", booking.status.toUpperCase()],
  ];

  details.forEach(([label, value], index) => {
    const y = startY + (index * lineHeight);
    doc.setFont("helvetica", "bold");
    doc.text(label, col1, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(value), col2, y);
  });

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(90, 107, 96);
  doc.text("Thank you for practicing with Yoga & Wellness Wave.", 105, 200, { align: "center" });
  doc.text("Namaste • www.yogawellnesswave.com", 105, 207, { align: "center" });

  // Save PDF
  doc.save(`YogaWellnessWave_Receipt_${booking.booking_id}.pdf`);
};

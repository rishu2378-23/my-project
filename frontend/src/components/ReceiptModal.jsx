import { generateReceiptPDF } from "../utils/receiptPdf";
import "./ReceiptModal.css";

const ReceiptModal = ({ booking, user, onClose }) => {
  if (!booking) return null;

  const handleDownload = () => {
    generateReceiptPDF(booking, user);
  };

  return (
    <div className="receipt-modal-overlay" onClick={onClose}>
      <div className="receipt-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-header">
          <h2>YOGA & WELLNESS WAVE</h2>
          <p>Official Class Booking Receipt</p>
        </div>

        <div className="receipt-scrollable-area">
          <div className="receipt-body">
            <div className="receipt-row">
              <span className="receipt-label">Receipt / Booking ID:</span>
              <span className="receipt-value">#YWW-{booking.booking_id}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Member Name:</span>
              <span className="receipt-value">{user?.name || "Valued Member"}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Member Email:</span>
              <span className="receipt-value">{user?.email || "N/A"}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Class Name:</span>
              <span className="receipt-value">{booking.title}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Instructor:</span>
              <span className="receipt-value">{booking.instructor_name}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Date & Time:</span>
              <span className="receipt-value">{new Date(booking.class_date).toLocaleDateString()} at {booking.start_time}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Duration:</span>
              <span className="receipt-value">{booking.duration} minutes</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Difficulty Level:</span>
              <span className="receipt-value">{booking.difficulty}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Booking Date:</span>
              <span className="receipt-value">{booking.booked_at ? new Date(booking.booked_at).toLocaleString() : new Date().toLocaleString()}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Booking Status:</span>
              <span className="receipt-value status-booked">{booking.status.toUpperCase()}</span>
            </div>
          </div>

          <div className="receipt-footer-text">
            <p>Thank you for practicing with Yoga & Wellness Wave. Namaste.</p>
          </div>
        </div>

        <div className="receipt-actions">
          <button className="btn btn-download" onClick={handleDownload}>
            Download Receipt
          </button>
          <button className="btn btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;

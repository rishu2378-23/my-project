import React, { useState, useEffect } from "react";
import "./BookingModal.css";

export default function BookingModal({ isOpen, onClose, selectedClass }) {
  const [step, setStep] = useState(1); // 1: Form, 2: Payment Loading, 3: Confirmation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    timeSlot: "Morning (08:00 AM)"
  });
  const [error, setError] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setError("");
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          setFormData(prev => ({
            ...prev,
            name: userObj.name || "",
            email: userObj.email || ""
          }));
        } catch (e) {
          // ignore
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date || !formData.timeSlot) {
      setError("Please fill in all booking details.");
      return;
    }
    setError("");
    setStep(2); // Move to Payment Loading

    // Simulate 2-second payment processing
    setTimeout(() => {
      const refId = "YW-" + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(refId);

      const newBooking = {
        refId,
        className: selectedClass?.title || selectedClass || "Yoga Wellness Session",
        instructor: selectedClass?.instructor || "Certified Instructor",
        ...formData,
        bookedAt: new Date().toISOString()
      };

      // Save to localStorage
      try {
        const existingBookings = JSON.parse(localStorage.getItem("yoga_bookings") || "[]");
        existingBookings.push(newBooking);
        localStorage.setItem("yoga_bookings", JSON.stringify(existingBookings));
      } catch (err) {
        console.error("Error saving booking to localStorage", err);
      }

      setStep(3); // Move to Confirmation
    }, 2000);
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in">
        <button className="modal-close" onClick={handleCloseModal}>&times;</button>

        {/* Step 1: Booking Form */}
        {step === 1 && (
          <div className="modal-step">
            <h2>Book Yoga Class</h2>
            <p className="class-highlight">
              Class: <strong>{selectedClass?.title || selectedClass || "Yoga Wellness Session"}</strong>
            </p>

            {error && <div className="modal-error">{error}</div>}

            <form onSubmit={handleProceedToPayment} className="booking-form">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. jane@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Time Slot</label>
                <select name="timeSlot" value={formData.timeSlot} onChange={handleChange}>
                  <option value="Morning (08:00 AM)">Morning (08:00 AM)</option>
                  <option value="Afternoon (02:00 PM)">Afternoon (02:00 PM)</option>
                  <option value="Evening (06:30 PM)">Evening (06:30 PM)</option>
                </select>
              </div>

              <button type="submit" className="btn-proceed">Proceed to Payment</button>
            </form>
          </div>
        )}

        {/* Step 2: Payment Loading */}
        {step === 2 && (
          <div className="modal-step payment-step">
            <div className="spinner"></div>
            <h3>Processing Mock Payment...</h3>
            <p>Securely connecting to payment gateway & confirming your slot.</p>
          </div>
        )}

        {/* Step 3: Confirmation Screen */}
        {step === 3 && (
          <div className="modal-step confirmation-step">
            <div className="success-icon">&#10004;</div>
            <h2>Booking Confirmed!</h2>
            <p className="confirmation-sub">Thank you, {formData.name}. Your spot has been secured.</p>

            <div className="booking-receipt">
              <p><strong>Reference ID:</strong> {bookingRef}</p>
              <p><strong>Class:</strong> {selectedClass?.title || selectedClass || "Yoga Wellness Session"}</p>
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Time:</strong> {formData.timeSlot}</p>
              <p><strong>Email:</strong> {formData.email}</p>
            </div>

            <p className="persistence-note">Saved to your browser storage successfully.</p>

            <button className="btn-done" onClick={handleCloseModal}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminSidebar from "./components/AdminSidebar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Yoga from "./pages/Yoga";
import Diet from "./pages/Diet";
import Wellness from "./pages/Wellness";
import Classes from "./pages/Classes";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Messaging from "./pages/Messaging";

// New feature components
import BmiCalculator from "./components/BmiCalculator";
import BookingModal from "./components/BookingModal";

import "./App.css";

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // Global helper to open booking modal from any page
  window.openBookingModal = (yogaClass) => {
    setSelectedClass(yogaClass || { title: "Signature Vinyasa Flow", instructor: "Master Priya" });
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedClass(null);
  };

  return (
    <BrowserRouter>
      <div className="app-layout-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <AdminSidebar />
        
        <div style={{ flex: 1, width: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/yoga" element={<Yoga />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/messaging" element={<Messaging />} />
            
            {/* New BMI Calculator Route */}
            <Route 
              path="/bmi-calculator" 
              element={
                <div style={{ padding: "3rem 1rem", maxWidth: "750px", margin: "0 auto" }}>
                  <BmiCalculator />
                </div>
              } 
            />
          </Routes>
        </div>

        {/* Global Class Booking Modal System */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseBooking}
          selectedClass={selectedClass}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

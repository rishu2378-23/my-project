import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <header className="navbar-container">
      {/* Top Header: Logo + Main Navigation Only */}
      <nav className="navbar-top">
        <Link to="/" className="nav-logo">
          Yoga & <span>Wellness</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/yoga" className={location.pathname === "/yoga" ? "active" : ""}>Yoga</Link>
          <Link to="/diet" className={location.pathname === "/diet" ? "active" : ""}>Diet</Link>
          <Link to="/wellness" className={location.pathname === "/wellness" ? "active" : ""}>Wellness</Link>
          <Link to="/classes" className={location.pathname === "/classes" ? "active" : ""}>Classes</Link>
          <Link to="/bmi-calculator" className={location.pathname === "/bmi-calculator" ? "active" : ""}>BMI Calculator</Link>

          {user ? (
            <>
              <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
              {user.role === "instructor" && (
                <Link to="/instructor-dashboard" className={location.pathname === "/instructor-dashboard" ? "active" : ""}>Instructor</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className={`btn-login ${location.pathname === "/login" ? "active" : ""}`}>Login</Link>
              <Link to="/register" className={`btn-register ${location.pathname === "/register" ? "active" : ""}`}>Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Second Header: Messaging & Member Status */}
      <div className="navbar-second">
        {user ? (
          <div className="second-header-content logged-in">
            <span className="announcement-text">🌿 Welcome to Yoga & Wellness Wave — Elevate your body, mind, and spirit.</span>
            <Link to="/messaging" className={`messaging-box-btn ${location.pathname === "/messaging" ? "active" : ""}`}>
              <span className="icon">💬</span> Messaging & Consultations
            </Link>
          </div>
        ) : (
          <div className="second-header-content logged-out">
            <span className="announcement-text">🌿 Welcome to Yoga & Wellness Wave — Elevate your body, mind, and spirit.</span>
            <Link to="/classes" className="quick-action-btn">
              Explore Classes
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

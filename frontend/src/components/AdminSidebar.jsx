import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  // Keep sidebar visible only for authenticated users
  if (!user) {
    return null;
  }

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/login");
  };

  const handleScrollToSection = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="admin-sidebar-container">
      <button 
        className="admin-sidebar-toggle" 
        onClick={toggleSidebar}
        title="Dashboard Navigation Menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isOpen ? (
            <path d="M15 18l-6-6 6-6" />
          ) : (
            <path d="M9 18l6-6-6-6" />
          )}
        </svg>
      </button>

      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h3>Dashboard Menu</h3>
        </div>
        <div className="admin-sidebar-links">
          <Link 
            to="/dashboard" 
            className={location.pathname === '/dashboard' ? 'active' : ''}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <a 
            href="#activity" 
            onClick={(e) => { e.preventDefault(); handleScrollToSection('activity'); }}
          >
            My Activity
          </a>
          <a 
            href="#bookings" 
            onClick={(e) => { e.preventDefault(); handleScrollToSection('bookings'); }}
          >
            My Bookings
          </a>

          {user.role === 'admin' && (
            <Link 
              to="/admin-dashboard" 
              className={`admin-highlight ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
        </div>

        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-sidebar-logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

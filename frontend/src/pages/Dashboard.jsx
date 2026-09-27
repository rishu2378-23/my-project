import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import ReceiptModal from "../components/ReceiptModal";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [feedbackMessages, setFeedbackMessages] = useState({});
  const [selectedBookingForReceipt, setSelectedBookingForReceipt] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchSessions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await API.get("/bookings/my-sessions");
        setSessions(response.data);
      } catch (e) {
        console.error("Failed to fetch sessions and bookings:", e.response?.data || e.message);
        setError("Failed to fetch sessions and bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleFeedbackChange = (bookingId, field, value) => {
    setFeedback(prev => ({
      ...prev,
      [bookingId]: { ...prev[bookingId], [field]: value }
    }));
  };

  const submitFeedback = async (session) => {
    const fb = feedback[session.booking_id];
    if (!fb || !fb.rating) {
      alert("Please select a rating");
      return;
    }

    try {
      await API.post("/feedback", {
        class_id: session.class_id,
        user_id: user.id,
        rating: fb.rating,
        comment: fb.comment
      });
      setFeedbackMessages(prev => ({ ...prev, [session.booking_id]: "Feedback submitted!" }));
    } catch (e) {
      console.error("Feedback submission error:", e);
      setFeedbackMessages(prev => ({ ...prev, [session.booking_id]: "Failed to submit feedback." }));
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="page-container" style={{ maxWidth: '1080px' }}>
      <div className="card" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', backgroundColor: 'var(--light-green)' }}>
        <div>
          <h1>Welcome, {user.name}</h1>
          <p style={{ margin: 0 }}>Email: {user.email}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/messaging" className="btn" style={{ backgroundColor: 'var(--embrace-deep)', color: '#fff', textDecoration: 'none' }}>Messaging</Link>
          <button onClick={handleLogout} className="btn" style={{ backgroundColor: '#f2dede', color: '#8a3b3b' }}>Logout</button>
        </div>
      </div>

      <div id="bookings" className="card" style={{ marginBottom: '2.5rem', backgroundColor: 'var(--light-green)' }}>
        <h2 id="activity" style={{ marginBottom: '1.5rem' }}>My Activity & Previous Sessions</h2>
        {loading && <p>Loading sessions...</p>}
        {error && <p style={{ color: '#a94442' }}>{error}</p>}
        {!loading && !error && sessions.length === 0 && <p>No session activity or bookings found.</p>}
        {!loading && !error && sessions.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {sessions.map((session) => (
              <div key={session.booking_id} style={{ background: '#fff', border: '1px solid var(--warm-beige)', padding: '1.75rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--forest-green)' }}>{session.title}</h3>
                    <p style={{ margin: '0.25rem 0' }}><strong>Instructor:</strong> {session.instructor_name}</p>
                    <p style={{ margin: '0.25rem 0' }}><strong>Date & Time:</strong> {new Date(session.class_date).toLocaleDateString()} at {session.start_time}</p>
                    <p style={{ margin: '0.25rem 0' }}><strong>Duration:</strong> {session.duration} mins | <strong>Difficulty:</strong> {session.difficulty}</p>
                    <p style={{ margin: '0.25rem 0' }}><strong>Status:</strong> <span style={{ color: 'var(--natural-green-dark)', fontWeight: 600 }}>{session.status.toUpperCase()}</span></p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <button 
                      className="btn" 
                      style={{ backgroundColor: 'var(--embrace-deep)', color: '#fff', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                      onClick={() => setSelectedBookingForReceipt(session)}
                    >
                      View Receipt
                    </button>
                  </div>
                </div>

                {/* Session Video & Playback Section */}
                {session.video_url && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--warm-beige)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h4 style={{ margin: 0, color: 'var(--forest-green)', fontSize: '1.1rem' }}>Session Recording & Video Playback</h4>
                      <a 
                        href={session.video_url} 
                        download 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn" 
                        style={{ backgroundColor: 'var(--natural-green)', color: '#fff', padding: '0.5rem 1rem', fontSize: '0.85rem', textDecoration: 'none' }}
                      >
                        Download Video
                      </a>
                    </div>
                    <div style={{ width: '100%', borderRadius: 'var(--radius)', overflow: 'hidden', background: '#000', boxShadow: 'var(--shadow-subtle)' }}>
                      <video 
                        controls 
                        preload="metadata"
                        style={{ width: '100%', maxHeight: '340px', display: 'block', objectFit: 'contain' }}
                        src={session.video_url}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--warm-beige)' }}>
                  <p style={{ fontWeight: 500, marginBottom: '0.75rem', fontSize: '0.95rem' }}>Leave Feedback</p>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <input 
                      type="number" min="1" max="5" placeholder="Rating (1-5)"
                      style={{ width: '130px' }}
                      onChange={(e) => handleFeedbackChange(session.booking_id, 'rating', e.target.value)}
                    />
                    <input 
                      type="text" placeholder="Write your comment..."
                      style={{ flex: '1 1 250px' }}
                      onChange={(e) => handleFeedbackChange(session.booking_id, 'comment', e.target.value)}
                    />
                    <button onClick={() => submitFeedback(session)} className="btn" style={{ backgroundColor: 'var(--natural-green)', color: '#fff', padding: '0.75rem 1.25rem' }}>Submit</button>
                  </div>
                  {feedbackMessages[session.booking_id] && (
                    <p style={{ marginTop: '0.5rem', color: 'var(--forest-green)', fontWeight: 500 }}>{feedbackMessages[session.booking_id]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBookingForReceipt && (
        <ReceiptModal 
          booking={selectedBookingForReceipt} 
          user={user} 
          onClose={() => setSelectedBookingForReceipt(null)} 
        />
      )}
    </div>
  );
}

export default Dashboard;

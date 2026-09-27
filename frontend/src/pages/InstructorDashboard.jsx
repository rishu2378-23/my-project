import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', class_date: '', start_time: '', 
    duration: 60, difficulty: 'Beginner', meeting_link: '', max_students: 20
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'instructor') {
      navigate('/dashboard');
    } else {
      fetchInstructorClasses();
    }
  }, [user, navigate]);

  const fetchInstructorClasses = async () => {
    try {
      // Assuming instructor table has an ID mapped to user_id. 
      // For simplicity, let's assume instructor_id == user.id for now based on schema structure
      const response = await API.get(`/instructor/${user.id}`);
      setClasses(response.data);
    } catch (e) {
      console.error('Failed to fetch classes', e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/instructor', { ...formData, instructor_id: user.id });
      setFormData({
        title: '', description: '', class_date: '', start_time: '', 
        duration: 60, difficulty: 'Beginner', meeting_link: '', max_students: 20
      });
      fetchInstructorClasses();
      alert('Class created successfully');
    } catch (e) {
      console.error('Failed to create class', e);
      alert('Failed to create class');
    }
  };

  return (
    <div className="instructor-dashboard">
      <h1>Instructor Dashboard: {user?.name}</h1>
      
      <section>
        <h2>Create New Class</h2>
        <form onSubmit={handleSubmit} className="class-form">
          <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <input type="date" value={formData.class_date} onChange={e => setFormData({...formData, class_date: e.target.value})} required />
          <input type="time" value={formData.start_time} onChange={e => setFormData({...formData, start_time: e.target.value})} required />
          <input type="number" placeholder="Duration (mins)" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
          <select value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value})}>
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
          <input type="text" placeholder="Meeting Link" value={formData.meeting_link} onChange={e => setFormData({...formData, meeting_link: e.target.value})} />
          <input type="number" placeholder="Max Students" value={formData.max_students} onChange={e => setFormData({...formData, max_students: e.target.value})} />
          <button type="submit">Create Class</button>
        </form>
      </section>

      <section>
        <h2>My Classes</h2>
        <div className="class-list">
          {classes.map(c => (
            <div key={c.id} className="class-item">
              <h3>{c.title}</h3>
              <p>{new Date(c.class_date).toLocaleDateString()} at {c.start_time}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InstructorDashboard;

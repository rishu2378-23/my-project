import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ users: [], classes: [], bookings: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = localStorage.getItem('token');
    
    if (!user || user.role !== 'admin' || !token) {
      navigate('/admin-login');
      return;
    }

    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [users, classes, bookings] = await Promise.all([
          API.get('/admin/users', config),
          API.get('/admin/classes', config),
          API.get('/admin/bookings', config)
        ]);
        setData({ users: users.data, classes: classes.data, bookings: bookings.data });
        setLoading(false);
      } catch (e) {
        console.error('Failed to fetch admin data', e);
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <p>Total Users: {data.users.length}</p>
        <p>Total Instructors: {data.users.filter(u => u.role === 'instructor').length}</p>
        <p>Total Classes: {data.classes.length}</p>
        <p>Total Bookings: {data.bookings.length}</p>
      </div>

      <section>
        <h2>Users</h2>
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>{data.users.map(u => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}</tbody>
        </table>
      </section>
      
      <section>
        <h2>Classes</h2>
        <table>
          <thead><tr><th>Title</th><th>Date</th></tr></thead>
          <tbody>{data.classes.map(c => <tr key={c.id}><td>{c.title}</td><td>{new Date(c.class_date).toLocaleDateString()}</td></tr>)}</tbody>
        </table>
      </section>

      <section>
        <h2>Bookings</h2>
        <table>
          <thead><tr><th>User</th><th>Class</th><th>Status</th></tr></thead>
          <tbody>{data.bookings.map(b => <tr key={b.id}><td>{b.user_name}</td><td>{b.class_title}</td><td>{b.status}</td></tr>)}</tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;

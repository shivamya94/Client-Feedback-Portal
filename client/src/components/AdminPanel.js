import React, { useEffect, useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterRating, setFilterRating] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fetch feedbacks from backend API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/feedbacks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
      }
    };
    fetchFeedbacks();
  }, []);

  // Apply filtering and sorting
  const filteredFeedbacks = feedbacks
    .filter(fb => filterRating === 'All' || fb.rating === parseInt(filterRating))
    .sort((a, b) => {
      return sortOrder === 'desc'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <div className="admin-panel">
      <h2>Admin Feedback Dashboard</h2>

      <div className="controls">
        <label>
          Filter by Rating:
          <select value={filterRating} onChange={e => setFilterRating(e.target.value)}>
            <option>All</option>
            {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Star</option>)}
          </select>
        </label>

        <label>
          Sort by Date:
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </label>
      </div>

      <div className="feedback-list">
        {filteredFeedbacks.length === 0 ? (
          <p>No feedback found.</p>
        ) : (
          filteredFeedbacks.map(fb => (
            <div className="feedback-card" key={fb._id}>
              <div className="feedback-header">
                <span><strong>User:</strong> {fb.username || 'Anonymous'}</span>
                <span>⭐ {fb.rating}</span>
              </div>
              <p>{fb.message}</p>
              {fb.image && <img src={fb.image} alt="Feedback" className="feedback-image" />}
              <small>{new Date(fb.createdAt).toLocaleString()}</small>

              <button className="reply-btn">Reply</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

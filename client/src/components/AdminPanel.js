import React, { useEffect, useState, useMemo } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterRating, setFilterRating] = useState('All');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch feedbacks from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Unauthorized. Please log in again.');
          return;
        }

        const res = await fetch('http://localhost:5000/api/feedbacks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || 'Something went wrong');
        }

        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Memoize filtered/sorted feedbacks for performance
  const displayedFeedbacks = useMemo(() => {
    let result = [...feedbacks];

    if (filterRating !== 'All') {
      result = result.filter(fb => fb.rating === parseInt(filterRating));
    }

    result.sort((a, b) =>
      sortOrder === 'desc'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

    return result;
  }, [feedbacks, filterRating, sortOrder]);

  return (
    <div className="admin-panel">
      <h2>Admin Feedback Dashboard</h2>

      <div className="controls">
        <label htmlFor="filterRating">
          Filter by Rating:
          <select id="filterRating" value={filterRating} onChange={e => setFilterRating(e.target.value)}>
            <option value="All">All</option>
            {[1, 2, 3, 4, 5].map(r => (
              <option key={r} value={r}>{r} Star</option>
            ))}
          </select>
        </label>

        <label htmlFor="sortOrder">
          Sort by Date:
          <select id="sortOrder" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p>Loading feedbacks...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : displayedFeedbacks.length === 0 ? (
        <p>No feedback found for the selected criteria.</p>
      ) : (
        <div className="feedback-list">
          {displayedFeedbacks.map(fb => (
            <div className="feedback-card" key={fb._id}>
              <div className="feedback-header">
                <strong>User:</strong> {fb.username || 'Anonymous'}
                <span>⭐ {fb.rating}</span>
              </div>
              <p>{fb.message}</p>
              {fb.image && <img src={fb.image} alt="Feedback" className="feedback-image" />}
              <small>{new Date(fb.createdAt).toLocaleString()}</small>

              <button className="reply-btn">Reply</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

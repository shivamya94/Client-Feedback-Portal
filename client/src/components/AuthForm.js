import React, { useState } from 'react';
import axios from '../api/axios'; // assuming you created src/api/axios.js
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(url, payload);

      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role); // optional for role-based access
        navigate('/dashboard'); // redirect after login
      } else {
        alert('Registered successfully! Please log in.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="auth-link">
          {isLogin ? (
            <p>Don't have an account? <a href="/register">Register</a></p>
          ) : (
            <p>Already have an account? <a href="/login">Login</a></p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
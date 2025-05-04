import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/Header';
import RegisterPage from './pages/RegisterPage';
import AdminPanel from './components/AdminPanel';
import ApiTest from './components/ApiTest';

function App() {
  return (
    <>
      <Header />
      <ApiTest />


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
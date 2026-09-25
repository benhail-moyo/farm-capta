import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

// Pages
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Farms from './pages/Farms';
import Financing from './pages/Financing';
import AgriNews from './pages/AgriNews';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Main App Component
function App() {
  const [role, setRole] = useState(null);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  const handlePageChange = (newRole) => {
    setRole(newRole);
  };

  // If user is logged in, show the dashboard for all authenticated routes
  if (role) {
    return <Dashboard role={role} onLogout={handleLogout} onPageChange={handlePageChange} />;
  }

  // Otherwise show public pages with routing
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/farms" element={<Farms />} />
      <Route path="/financing" element={<Financing />} />
      <Route path="/agri-news" element={<AgriNews />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

// Render the app
const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
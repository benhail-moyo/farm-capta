import React from 'react';
import { Sprout } from 'lucide-react';

export function PublicNavigation({ onNavigate, currentPage }) {
  return (
    <header className="public-top">
      <div className="nav-wrap">
        <div className="brand">
          <div className="brand-mark"><Sprout size={21}/></div>
          <a href="/" style={{textDecoration:'none',color:'inherit'}}>FarmLink Zimbabwe</a>
        </div>
        <nav className="public-links">
          <a href="/" className={currentPage === 'home' ? 'active' : ''}>Home</a>
          <a href="/how-it-works" className={currentPage === 'how-it-works' ? 'active' : ''}>How it works</a>
          <a href="/farms" className={currentPage === 'farms' ? 'active' : ''}>Farms</a>
          <a href="/financing" className={currentPage === 'financing' ? 'active' : ''}>Financing</a>
          <a href="/agri-news" className={currentPage === 'agri-news' ? 'active' : ''}>Agri News</a>
          <a href="/about" className={currentPage === 'about' ? 'active' : ''}>About</a>
        </nav>
        <div className="actions">
          <button className="btn ghost" onClick={() => onNavigate('login')}>Sign In</button>
          <button className="btn primary" onClick={() => onNavigate('farmer', 'onboarding')}>Get Started</button>
        </div>
      </div>
    </header>
  );
}
import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-section">
      <div className="footer-glow" />

      <div className="footer-inner">
        <div className="footer-rings">
          <div className="ring ring-1" />
          <div className="ring ring-2" />
          <div className="ring ring-3" />
          <span className="footer-monogram">D &amp; C</span>
        </div>

        <h3 className="footer-tagline">Two Souls, One Story</h3>
        <p className="footer-date">August 11, 2030 · Senuri Grand Hotel, Sri Lanka</p>

        <div className="footer-divider" />

        <p className="footer-copy">&copy; {year} Dinusha &amp; Chamini. Made with ❤️ for our special day.</p>
      </div>
    </footer>
  );
}

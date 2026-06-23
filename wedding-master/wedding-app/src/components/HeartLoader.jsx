import React, { useEffect, useState } from 'react';
import { WEDDING } from '../weddingData';
import './HeartLoader.css';

export default function HeartLoader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let fadeTimeout;

    // We enforce a minimum loading display time of 2500ms to allow the drawing
    // and pulsing animations to play fully, providing a premium intro experience.
    const minTimer = new Promise((resolve) => setTimeout(resolve, 2500));

    // Also wait for the page to be fully loaded (assets, images, fonts)
    const pageLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve, { once: true });
      }
    });

    // Once both conditions are met, trigger the fade-out sequence
    Promise.all([minTimer, pageLoaded]).then(() => {
      setLoading(false);
      // Restore scrolling as soon as the loader starts fading out
      document.body.style.overflow = '';
      
      // Wait for the fade-out CSS transition (800ms) to complete before unmounting
      fadeTimeout = setTimeout(() => {
        setVisible(false);
      }, 800);
    });

    // Clean up scrolls and timeouts during loading/unmounting
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`heart-loader-overlay ${!loading ? 'fade-out' : ''}`}>
      <div className="heart-loader-content">
        {/* Decorative sparkles */}
        <div className="loader-sparkle sparkle-1">✦</div>
        <div className="loader-sparkle sparkle-2">✦</div>
        <div className="loader-sparkle sparkle-3">✦</div>
        
        {/* Double Interlocking Heart SVG */}
        <div className="heart-svg-container">
          <svg
            viewBox="0 0 160 130"
            className="interlocking-hearts"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--gold-light)" />
                <stop offset="100%" stopColor="var(--gold)" />
              </linearGradient>
            </defs>
            {/* Left Heart (Groom) */}
            <path
              className="heart-path groom-heart"
              d="M 60 37 C 60 20, 30 20, 30 45 C 30 70, 60 90, 60 102 C 60 90, 90 70, 90 45 C 90 20, 60 20, 60 37 Z"
              fill="url(#heartGrad)"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Right Heart (Bride) */}
            <path
              className="heart-path bride-heart"
              d="M 100 47 C 100 30, 70 30, 70 55 C 70 80, 100 100, 100 112 C 100 100, 130 80, 130 55 C 130 30, 100 30, 100 47 Z"
              fill="url(#heartGrad)"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Calligraphy Typography and Subtext */}
        <div className="loader-text-wrapper">
          <h2 className="loader-couple-names">
            {WEDDING.groomName} <span className="ampersand">&amp;</span> {WEDDING.brideName}
          </h2>
          <div className="loader-divider">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
          <p className="loader-status">Preparing Invitation...</p>
        </div>
      </div>
    </div>
  );
}

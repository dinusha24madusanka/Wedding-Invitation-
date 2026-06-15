import React, { useState, useEffect } from 'react';
import './ThemeSelector.css';

const THEMES = [
  { id: 'enchanted', label: '🌿 Forest', bodyClass: '' },
  { id: 'celestial', label: '✨ Celestial', bodyClass: 'theme-celestial' },
  { id: 'synthwave', label: '👾 Retro-Tech', bodyClass: 'theme-synthwave' },
];

export default function ThemeSelector({ activeTheme, onThemeChange }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Sync class to body
    const body = document.body;
    THEMES.forEach((theme) => {
      if (theme.bodyClass) body.classList.remove(theme.bodyClass);
    });
    const selected = THEMES.find((t) => t.id === activeTheme);
    if (selected && selected.bodyClass) {
      body.classList.add(selected.bodyClass);
    }
  }, [activeTheme]);

  return (
    <div className={`theme-selector-container ${open ? 'open' : ''}`}>
      <button 
        className="theme-selector-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Switch Theme Universe"
      >
        🎭
      </button>
      <div className="theme-options">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            className={`theme-option-btn ${activeTheme === theme.id ? 'active' : ''}`}
            onClick={() => {
              onThemeChange(theme.id);
              setOpen(false);
            }}
          >
            {theme.label}
          </button>
        ))}
      </div>
    </div>
  );
}

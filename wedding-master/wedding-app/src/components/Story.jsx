import React, { useState } from 'react';
import { WEDDING } from '../weddingData';
import './Story.css';

const ICONS = ['🎪', '🌹', '💍'];

export default function Story() {
  const [active, setActive] = useState(0);

  return (
    <section id="story" className="story-section">
      <div className="story-bg-glow" />

      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">We Love Each Other</span>
          <h2 className="section-title">Our Story</h2>
        </div>

        {/* Chapter tabs */}
        <div className="story-tabs" role="tablist">
          {WEDDING.story.map((item, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={active === idx}
              className={`story-tab ${active === idx ? 'story-tab--active' : ''}`}
              onClick={() => setActive(idx)}
            >
              <span className="tab-icon">{ICONS[idx]}</span>
              <span className="tab-label">{item.title}</span>
              <span className="tab-date">{item.date}</span>
            </button>
          ))}
        </div>

        {/* Active chapter panel */}
        <div className="story-panel" key={active}>
          <div className="panel-icon-ring">
            <span>{ICONS[active]}</span>
          </div>
          <div className="panel-body">
            <h3 className="panel-title">{WEDDING.story[active].title}</h3>
            <time className="panel-date">{WEDDING.story[active].date}</time>
            <p className="panel-text">{WEDDING.story[active].body}</p>
          </div>
        </div>

        {/* Dot navigation */}
        <div className="story-dots">
          {WEDDING.story.map((_, idx) => (
            <button
              key={idx}
              className={`story-dot ${active === idx ? 'story-dot--active' : ''}`}
              onClick={() => setActive(idx)}
              aria-label={`Chapter ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

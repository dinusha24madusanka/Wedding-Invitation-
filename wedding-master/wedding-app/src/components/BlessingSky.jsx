import React, { useState, useEffect } from 'react';
import { WEDDING } from '../weddingData';
import './BlessingSky.css';

export default function BlessingSky() {
  const [wishes, setWishes] = useState(
    WEDDING.wishes.map((w, idx) => ({
      id: idx,
      name: w.name,
      text: w.text,
      photo: w.photo.replace(/^\.\.\//, '/'),
      // Random coordinates and speed
      left: Math.random() * 85 + 5, // 5% to 90%
      delay: Math.random() * 8, // seconds
      speed: Math.random() * 12 + 10, // seconds to float up
    }))
  );

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [activeWish, setActiveWish] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newWish = {
      id: Date.now(),
      name: name.trim(),
      text: `"${text.trim()}"`,
      photo: '/images/couple-1.jpg',
      left: Math.random() * 85 + 5,
      delay: 0,
      speed: Math.random() * 12 + 10,
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="wishes" className="blessing-sky-section">
      <div className="container relative-z flex-layout">
        
        {/* Interactive Sky Canvas */}
        <div className="sky-canvas">
          <div className="sky-stars" />
          <h3 className="sky-canvas-title">Lanterns of Blessings</h3>
          <p className="sky-canvas-desc">Click on any floating lantern to read a blessing</p>
          
          <div className="lanterns-container">
            {wishes.map((wish) => (
              <button
                key={wish.id}
                className="lantern-item"
                style={{
                  left: `${wish.left}%`,
                  animationDelay: `${wish.delay}s`,
                  animationDuration: `${wish.speed}s`,
                }}
                onClick={() => setActiveWish(wish)}
                aria-label={`Read blessing from ${wish.name}`}
              >
                <span className="lantern-glow" />
                <span className="lantern-icon">🏮</span>
                <span className="lantern-sender">{wish.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Wish Form */}
        <div className="sky-form-box">
          <h3>Send Your Blessings</h3>
          <p className="form-info">Submit a blessing and watch your custom lantern float into the sky!</p>
          <form onSubmit={handleSubmit} className="sky-form">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="sky-control"
            />
            <textarea
              placeholder="Write your blessings to Dinusha & Chamini..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="4"
              required
              className="sky-control text-area"
            />
            <button type="submit" className="sky-btn">
              Release Lantern 🏮
            </button>
          </form>
          {submitted && (
            <div className="sky-success-msg">
              Lantern released! Look at the sky canvas!
            </div>
          )}
        </div>
      </div>

      {/* Blessing Detail Modal */}
      {activeWish && (
        <div className="blessing-modal" onClick={() => setActiveWish(null)}>
          <div className="blessing-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="blessing-modal-close" onClick={() => setActiveWish(null)}>&times;</button>
            <div className="blessing-modal-profile">
              <img src={activeWish.photo} alt={activeWish.name} className="blessing-modal-avatar" />
              <h4>{activeWish.name}</h4>
            </div>
            <p className="blessing-modal-text">{activeWish.text}</p>
          </div>
        </div>
      )}
    </section>
  );
}

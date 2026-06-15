import React, { useState } from 'react';
import { WEDDING } from '../weddingData';
import './Wishes.css';

export default function Wishes() {
  const [wishes, setWishes] = useState(
    WEDDING.wishes.map(wish => ({
      ...wish,
      photo: wish.photo.replace(/^\.\.\//, '/')
    }))
  );
  
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newWish = {
      name: name.trim(),
      photo: '/images/couple-1.jpg', // Default profile image
      text: `"${text.trim()}"`
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="wishes" className="wishes-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Best Wishes</span>
          <h2 className="section-title">Wishes from Friends</h2>
        </div>

        <div className="wishes-layout">
          {/* Wishes List */}
          <div className="wishes-list">
            {wishes.map((wish, index) => (
              <div key={index} className="wish-card">
                <div className="wish-profile">
                  <img src={wish.photo} alt={wish.name} className="wish-avatar" />
                  <span className="wish-author">{wish.name}</span>
                </div>
                <blockquote className="wish-text">{wish.text}</blockquote>
              </div>
            ))}
          </div>

          {/* Leave a Wish Form */}
          <div className="wish-form-container">
            <h3>Send Your Blessings</h3>
            <form onSubmit={handleSubmit} className="wish-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Write your wishes..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows="4"
                  required
                  className="form-control text-area"
                />
              </div>
              <button type="submit" className="wish-submit-btn">
                Send Wishes
              </button>
            </form>
            {submitted && (
              <div className="wish-success-alert">
                Thank you for your warm wishes and blessings!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

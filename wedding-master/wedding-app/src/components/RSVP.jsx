import React, { useState } from 'react';
import TicketGenerator from './TicketGenerator';
import './RSVP.css';

export default function RSVP({ activeTheme }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState('1');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setAttending('yes');
    setGuests('1');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-overlay" />
      <div className="container relative-z">
        <div className="rsvp-box">
          {!submitted ? (
            <>
              <div className="section-header">
                <span className="section-subtitle text-gold">Are You Attending?</span>
                <h2 className="section-title text-white">Join Our Celebration</h2>
                <p className="rsvp-description">
                  Please fill out the form below to let us know if you can make it. We look forward to celebrating with you!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="rsvp-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="rsvp-name">Full Name</label>
                    <input
                      type="text"
                      id="rsvp-name"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="rsvp-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rsvp-email">Email Address</label>
                    <input
                      type="email"
                      id="rsvp-email"
                      placeholder="e.g. john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rsvp-control"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="rsvp-attending">Will you attend?</label>
                    <select
                      id="rsvp-attending"
                      value={attending}
                      onChange={(e) => setAttending(e.target.value)}
                      className="rsvp-control"
                    >
                      <option value="yes">Yes, I am attending</option>
                      <option value="no">No, I cannot make it</option>
                    </select>
                  </div>
                  {attending === 'yes' && (
                    <div className="form-group">
                      <label htmlFor="rsvp-guests">Number of Guests</label>
                      <select
                        id="rsvp-guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="rsvp-control"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4+ Guests</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="rsvp-message">Message to the Couple</label>
                  <textarea
                    id="rsvp-message"
                    placeholder="Optional message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="3"
                    className="rsvp-control"
                  />
                </div>

                <button type="submit" className="rsvp-btn">
                  Submit RSVP
                </button>
              </form>
            </>
          ) : (
            <div className="rsvp-success-state">
              <span className="success-icon">🎉</span>
              <h3>RSVP Confirmed!</h3>
              <p>Thank you for submitting your response. Here is your digital ticket pass:</p>
              
              <TicketGenerator 
                rsvpData={{ name, attending, guests }} 
                activeTheme={activeTheme} 
              />

              <button onClick={handleReset} className="rsvp-reset-btn">
                Change RSVP / Submit Another
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

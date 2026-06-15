import React from 'react';
import { WEDDING } from '../weddingData';
import './Events.css';

export default function Events() {
  const formattedDate = WEDDING.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section id="events" className="events-section">
      <div className="events-overlay" />
      <div className="container relative-z">
        <div className="section-header">
          <span className="section-subtitle">Our Special Day</span>
          <h2 className="section-title text-white">Wedding Events</h2>
        </div>

        <div className="events-grid">
          {/* Ceremony Card */}
          <div className="event-card">
            <h3 className="event-title">Main Ceremony</h3>
            <div className="event-time">
              <span className="icon">⏰</span>
              <span>{WEDDING.ceremonyTime} &mdash; {WEDDING.ceremonyEndTime}</span>
            </div>
            <div className="event-date">
              <span className="icon">📅</span>
              <span>{formattedDate}</span>
            </div>
            <p className="event-description">
              We are delighted to invite you to witness our vows and celebrate the beginning of our new life together. Your presence is our greatest blessing.
            </p>
          </div>

          {/* Reception Card */}
          <div className="event-card">
            <h3 className="event-title">Wedding Reception</h3>
            <div className="event-time">
              <span className="icon">⏰</span>
              <span>{WEDDING.receptionTime} &mdash; {WEDDING.receptionEndTime}</span>
            </div>
            <div className="event-date">
              <span className="icon">📅</span>
              <span>{formattedDate}</span>
            </div>
            <p className="event-description">
              Join us for a wonderful reception filled with laughter, delicious food, and celebration. Let's make memories that will last a lifetime.
            </p>
          </div>
        </div>

        <div className="venue-info-box">
          <h4 className="venue-title">Venue Details</h4>
          <p className="venue-name">{WEDDING.venue}</p>
          <p className="venue-address">{WEDDING.address}</p>
          <p className="dress-code"><strong>Dress Code:</strong> {WEDDING.dressCode}</p>
          <a
            href={WEDDING.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="maps-link"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

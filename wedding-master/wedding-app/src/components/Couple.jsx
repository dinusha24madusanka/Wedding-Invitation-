import React from 'react';
import { WEDDING } from '../weddingData';
import couplePhoto from '../images/img_bg_2.jpg';
import './Couple.css';

export default function Couple() {
  return (
    <section id="couple" className="couple-section">
      {/* Decorative blobs */}
      <div className="couple-blob couple-blob--left" />
      <div className="couple-blob couple-blob--right" />

      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">The Happy Couple</span>
          <h2 className="section-title">Dinusha &amp; Chamini</h2>
          <p className="section-lead">August 11, 2030 · {WEDDING.venue}</p>
        </div>

        <div className="couple-cards">
          <div className="couple-card">
            <div className="card-image-ring card-image-ring--groom">
              <img src={couplePhoto} alt={WEDDING.groomFullName} />
            </div>
            <div className="card-badge">Groom</div>
            <h3>{WEDDING.groomFullName}</h3>
            <p>{WEDDING.groomBio}</p>
          </div>

          <div className="heart-separator">
            <div className="hs-ring"><span>♥</span></div>
          </div>

          <div className="couple-card">
            <div className="card-image-ring card-image-ring--bride">
              <img src={couplePhoto} alt={WEDDING.brideFullName} />
            </div>
            <div className="card-badge card-badge--bride">Bride</div>
            <h3>{WEDDING.brideFullName}</h3>
            <p>{WEDDING.brideBio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

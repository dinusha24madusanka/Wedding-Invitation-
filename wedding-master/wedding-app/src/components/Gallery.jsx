import React, { useState } from 'react';
import { WEDDING } from '../weddingData';
import './Gallery.css';

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState(null);

  const cleanSrc = (src) => {
    // Translate template paths like "../images/gallery-1.jpg" to "/images/gallery-1.jpg"
    return src.replace(/^\.\.\//, '/');
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = WEDDING.gallery.findIndex(item => cleanSrc(item.src) === activePhoto.src);
    const prevIndex = (currentIndex - 1 + WEDDING.gallery.length) % WEDDING.gallery.length;
    setActivePhoto({
      src: cleanSrc(WEDDING.gallery[prevIndex].src),
      caption: WEDDING.gallery[prevIndex].caption
    });
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = WEDDING.gallery.findIndex(item => cleanSrc(item.src) === activePhoto.src);
    const nextIndex = (currentIndex + 1) % WEDDING.gallery.length;
    setActivePhoto({
      src: cleanSrc(WEDDING.gallery[nextIndex].src),
      caption: WEDDING.gallery[nextIndex].caption
    });
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Memories</span>
          <h2 className="section-title">Wedding Gallery</h2>
        </div>

        <div className="gallery-grid">
          {WEDDING.gallery.map((photo, index) => {
            const imgSrc = cleanSrc(photo.src);
            return (
              <div 
                key={index} 
                className="gallery-item"
                onClick={() => setActivePhoto({ src: imgSrc, caption: photo.caption })}
              >
                <div className="gallery-img-container">
                  <img src={imgSrc} alt={photo.caption} className="gallery-img" />
                  <div className="gallery-hover-overlay">
                    <span className="overlay-plus">+</span>
                    <span className="overlay-caption">{photo.caption}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="lightbox-modal" onClick={() => setActivePhoto(null)}>
          <button className="lightbox-close" onClick={() => setActivePhoto(null)}>&times;</button>
          
          <button className="lightbox-arrow lightbox-arrow--left" onClick={handlePrev}>
            &#8249;
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activePhoto.src} alt={activePhoto.caption} className="lightbox-img" />
            <p className="lightbox-caption">{activePhoto.caption}</p>
          </div>
          
          <button className="lightbox-arrow lightbox-arrow--right" onClick={handleNext}>
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}

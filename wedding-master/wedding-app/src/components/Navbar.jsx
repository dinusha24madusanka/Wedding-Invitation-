import React, { useState, useEffect } from 'react';
import './Navbar.css';

const LINKS = [
  { label: 'Home',      href: '#hero' },
  { label: 'Our Story', href: '#story' },
  { label: 'Events',   href: '#events' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Blessings',href: '#wishes' },
  { label: 'RSVP',     href: '#rsvp' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('#hero');

  // Shrink on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const ids = LINKS.map(l => l.href.slice(1));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const handleLink = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${open ? 'navbar--open' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => handleLink('#hero')} aria-label="Back to top">
          D <span>&amp;</span> C
        </button>

        <ul className="navbar__links" role="menubar">
          {LINKS.map(({ label, href }) => (
            <li key={href} role="none">
              <button
                role="menuitem"
                className={`navbar__link ${active === href ? 'navbar__link--active' : ''}`}
                onClick={() => handleLink(href)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="navbar__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className="navbar__drawer" aria-hidden={!open}>
        <ul role="menu">
          {LINKS.map(({ label, href }) => (
            <li key={href} role="none">
              <button
                role="menuitem"
                className={`navbar__drawer-link ${active === href ? 'navbar__drawer-link--active' : ''}`}
                onClick={() => handleLink(href)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

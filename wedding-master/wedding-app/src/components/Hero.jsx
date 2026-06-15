import React, { useEffect, useRef, useState } from 'react';
import { WEDDING } from '../weddingData';
import './Hero.css';

function useCountdown(targetDate) {
  const [t, setT] = useState({});
  useEffect(() => {
    const calc = () => {
      const d = +new Date(targetDate) - +new Date();
      setT(d > 0 ? {
        days: Math.floor(d / 86400000),
        hours: Math.floor((d / 3600000) % 24),
        minutes: Math.floor((d / 60000) % 60),
        seconds: Math.floor((d / 1000) % 60),
      } : { days: 0, hours: 0, minutes: 0, seconds: 0 });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return t;
}

export default function Hero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeLeft = useCountdown(WEDDING.date);

  /* ─── Particle canvas ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars + floating hearts
    const STAR_COUNT  = 220;
    const HEART_COUNT = 18;

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.2,
      a: Math.random(),
      da: (Math.random() * 0.006 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const hearts = Array.from({ length: HEART_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height + canvas.height,
      size: Math.random() * 14 + 6,
      speed: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 0.5,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    function drawHeart(ctx, x, y, size, rot, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#e8d5a3';
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.3);
      ctx.bezierCurveTo( size * 0.5, -size, size,  -size * 0.5, 0, size * 0.4);
      ctx.bezierCurveTo(-size, -size * 0.5, -size * 0.5, -size, 0, -size * 0.3);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(s => {
        s.a += s.da;
        if (s.a > 1 || s.a < 0) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,213,163,${s.a.toFixed(2)})`;
        ctx.fill();
      });

      // Draw floating hearts
      hearts.forEach(h => {
        h.y    -= h.speed;
        h.x    += h.drift;
        h.rot  += h.rotSpeed;
        if (h.y < -40) {
          h.y = canvas.height + 40;
          h.x = Math.random() * canvas.width;
        }
        drawHeart(ctx, h.x, h.y, h.size, h.rot, h.alpha);
      });

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ─── 3D parallax on mouse move ─── */
  useEffect(() => {
    const hero = document.querySelector('.hero-scene');
    if (!hero) return;
    const move = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      mouseRef.current = { dx, dy };
      hero.style.transform = `rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg)`;
    };
    const leave = () => { hero.style.transform = 'rotateY(0deg) rotateX(0deg)'; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <header id="hero" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-bg-grad" />

      {/* Decorative 3D rings */}
      <div className="hero-rings" aria-hidden>
        <div className="hring hring-1" />
        <div className="hring hring-2" />
        <div className="hring hring-3" />
        <div className="hring hring-4" />
      </div>

      {/* Main content with 3D depth */}
      <div className="hero-perspective">
        <div className="hero-scene">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            <span>You Are Cordially Invited</span>
            <span className="eyebrow-line" />
          </div>

          <h1 className="hero-title">
            <span className="hero-name hero-name--groom">{WEDDING.groomName}</span>
            <span className="hero-and">
              <span className="and-inner">&amp;</span>
            </span>
            <span className="hero-name hero-name--bride">{WEDDING.brideName}</span>
          </h1>

          <p className="hero-subtitle">
            {WEDDING.date.toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            })} · {WEDDING.venue}
          </p>

          <div className="countdown-row">
            {[['days', timeLeft.days], ['hours', timeLeft.hours], ['minutes', timeLeft.minutes], ['seconds', timeLeft.seconds]].map(([lbl, val]) => (
              <div className="cd-box" key={lbl}>
                <div className="cd-face cd-face--front">
                  <span className="cd-val">{String(val ?? 0).padStart(2, '0')}</span>
                </div>
                <span className="cd-lbl">{lbl}</span>
              </div>
            ))}
          </div>

          <div className="hero-ctas">
            <button className="cta cta--fill" onClick={() => document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })}>
              RSVP Now ✦
            </button>
            <button className="cta cta--ghost" onClick={() => document.getElementById('couple')?.scrollIntoView({ behavior: 'smooth' })}>
              Meet the Couple ↓
            </button>
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue" aria-hidden>
        <span className="scroll-bar" />
        <span className="scroll-word">Scroll</span>
      </div>
    </header>
  );
}

import { useEffect, useRef } from 'react';
import './Hero.css';
import heroImg from '../assets/hero-master.jpg';

const STATS = [
  { value: '2013', label: 'Established' },
  { value: '50+',  label: 'Medals'      },
  { value: '1000+',label: 'Students'    },
  { value: '5+',   label: 'Coaches'     },
];

const PILLS = [
  '✦ Kukkiwon Certified',
  'National Players',
  'State Gold Medalists',
];

export default function Hero() {
  const imgRef = useRef(null);

  /* ── Subtle parallax on scroll (3-5px) ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const scrollY = window.scrollY;
      const shift = Math.min(scrollY * 0.04, 16); // max 16px shift
      imgRef.current.style.transform = `translateY(${shift}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="home" aria-label="Hero section">
      {/* Background watermark */}
      <div className="hero__watermark" aria-hidden="true">TMA</div>

      {/* ── LEFT COLUMN ── */}
      <div className="hero__left">
        {/* Tag line */}
        <div className="hero__tag">
          <span className="hero__tag-line" />
          HYDERABAD'S PREMIER MARTIAL ARTS ACADEMY
        </div>

        {/* Heading */}
        <h1 className="hero__heading">
          TEMPLE OF<br />
          <span className="hero__heading-red">MARTIAL</span><br />
          ARTS
        </h1>

        {/* Sub */}
        <p className="hero__sub">
          Train Like A Champion.<br />
          <strong>Build Discipline For Life.</strong>
        </p>

        {/* Description */}
        <p className="hero__desc">
          Professional Taekwondo, Kickboxing, MMA &amp; Self-Defence training
          under national-level coaches and certified referees since 2013.
        </p>

        {/* Buttons */}
        <div className="hero__btns">
          <a href="#contact" className="btn btn--primary" id="hero-book-trial-btn">
            <span>BOOK FREE TRIAL</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#programs" className="btn btn--outline" id="hero-explore-btn">
            <span>EXPLORE PROGRAMS</span>
          </a>
        </div>

        {/* Achievement pills */}
        <div className="hero__pills">
          {PILLS.map(p => (
            <span key={p} className={`hero__pill${p.startsWith('✦') ? ' hero__pill--red' : ''}`}>
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="hero__right">
        <div className="hero__img-wrap">
          <img
            ref={imgRef}
            src={heroImg}
            alt="Master Pradeep Kumar performing a flying kick – Head Coach at Temple of Martial Arts"
            className="hero__img"
            loading="eager"
          />
          <div className="hero__img-bar" aria-hidden="true" />
        </div>

        {/* Floating stats card */}
        <div className="hero__stats-card">
          {STATS.map((s, i) => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
              {i < STATS.length - 1 && <div className="hero__stat-divider" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

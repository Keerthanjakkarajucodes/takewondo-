import { useEffect, useRef, useState } from 'react';
import './WhyChoose.css';

const REASONS = [
  {
    num: '01',
    icon: 'shield',
    title: 'National-Level Coaches',
    bullets: [
      'Black Belt 4th DAN instructors',
      'State Gold Medalists',
      'National Players',
      'Kukkiwon-certified mentorship',
    ],
  },
  {
    num: '02',
    icon: 'brain',
    title: 'Discipline & Confidence',
    bullets: [
      'Character building',
      'Focus development',
      'Leadership mindset',
      'Self-defence confidence',
    ],
  },
  {
    num: '03',
    icon: 'trophy',
    title: 'Tournament Training',
    bullets: [
      'National-level preparation',
      'Kyorugi & Poomsae',
      'Referee-guided training',
      'Competitive pathway',
    ],
  },
  {
    num: '04',
    icon: 'heart',
    title: 'Fitness For All Ages',
    bullets: [
      'Kids & Adults',
      'Weight-loss programmes',
      'Personal coaching',
      'Home tuition available',
    ],
  },
];

const ICONS = {
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"/>
    </svg>
  ),
  brain: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="4"/><path d="M4 22c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  trophy: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  heart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
};

function WhyCard({ reason, index, isMobile }) {
  const cardRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(card);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--spot-x', `${x}px`);
    card.style.setProperty('--spot-y', `${y}px`);
    // Subtle 3D tilt ±2deg
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 2;
    const rotX = -((y - cy) / cy) * 2;
    card.style.setProperty('--rot-x', `${rotX}deg`);
    card.style.setProperty('--rot-y', `${rotY}deg`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rot-x', '0deg');
    card.style.setProperty('--rot-y', '0deg');
    card.style.setProperty('--spot-x', '50%');
    card.style.setProperty('--spot-y', '50%');
    setIsActive(false);
  };

  return (
    <div
      ref={cardRef}
      className={`wc-card ${isRevealed ? 'in' : ''}${isActive ? ' wc-card--active' : ''}`}
      style={{ '--delay': `${index * 0.18}s` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="wc-card__bar" />
      <div className="wc-card__numeral" aria-hidden="true">{reason.num}</div>
      <div className="wc-card__grain" aria-hidden="true" />
      {!isMobile && <div className="wc-card__spot" aria-hidden="true" />}
      <div className="wc-card__icon">{ICONS[reason.icon]}</div>
      <h3 className="wc-card__title">{reason.title}</h3>
      <ul className="wc-card__bullets">
        {reason.bullets.map((b) => (
          <li key={b} className="wc-card__bullet">
            <span className="wc-card__bullet-dot" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhyChoose() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse), (max-width: 820px)').matches
      : false
  );

  /* Detect mobile/touch */
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse), (max-width: 820px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* IntersectionObserver — heading reveal only */
  useEffect(() => {
    const heading = headingRef.current;
    if (heading) {
      const trigger = () => heading.classList.add('wc-header--in');
      const rect = heading.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        trigger();
      } else {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              trigger();
              obs.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        obs.observe(heading);
      }
    }
  }, []);


  return (
    <>
      {/* ── Section Divider ── */}
      <div className="wc-divider" aria-hidden="true">
        <span className="wc-divider__line" />
        <span className="wc-divider__dot" />
        <span className="wc-divider__line" />
      </div>

      <section ref={sectionRef} className="wc-section" aria-label="Why Choose Temple of Martial Arts">

        {/* Header */}
        <div ref={headingRef} className="wc-header">
          <div className="wc-label">
            <span className="wc-label-line" />
            <span className="wc-label-text">Our Edge</span>
          </div>
          <h2 className="wc-heading">
            <span className="wc-head-line">Why Students</span>
            <br />
            <span className="wc-head-line wc-head-line--red">Choose Temple</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="wc-grid">
          {REASONS.map((r, i) => (
            <WhyCard
              key={r.num}
              reason={r}
              index={i}
              isMobile={isMobile}
            />
          ))}
        </div>

      </section>
    </>
  );
}

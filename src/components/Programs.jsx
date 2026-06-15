import { useEffect, useRef, useState } from 'react';
import './Programs.css';
import imgTKD  from '../assets/prog-taekwondo.jpg';
import imgKick from '../assets/prog-kickboxing.jpg';
import imgMMA  from '../assets/prog-mma.jpg';
import imgSD   from '../assets/prog-selfdefence.jpg';

const PROGRAMS = [
  {
    id: 'taekwondo',
    title: 'Taekwondo',
    subtitle: 'Olympic Discipline',
    desc: 'Kukkiwon-certified training in kicks, forms and sparring. From white belt to black belt under national-level coaches.',
    tag: 'ALL AGES',
    img: imgTKD,
  },
  {
    id: 'kickboxing',
    title: 'Kickboxing',
    subtitle: 'Striking & Fitness',
    desc: 'High-intensity combinations of punches and kicks. Build explosive power, cardio and confidence in every session.',
    tag: 'ADULTS',
    img: imgKick,
  },
  {
    id: 'mma',
    title: 'MMA',
    subtitle: 'Mixed Martial Arts',
    desc: 'Stand-up striking meets ground control. A complete combat programme for serious athletes ready to compete.',
    tag: 'ADVANCED',
    img: imgMMA,
  },
  {
    id: 'selfdefence',
    title: 'Self Defence',
    subtitle: 'Real-World Skills',
    desc: 'Practical escapes, awareness and response drills. Designed for all levels — no prior experience needed.',
    tag: 'ALL AGES',
    img: imgSD,
  },
];

export default function Programs() {
  const sectionRef = useRef(null);
  const [revealedIndices, setRevealedIndices] = useState(new Set());

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.prog-card');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const index = parseInt(e.target.getAttribute('data-index') || '0', 10);
            setRevealedIndices((prev) => {
              const next = new Set(prev);
              next.add(index);
              return next;
            });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards?.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="programs" id="programs" ref={sectionRef} aria-label="Training programmes">

      {/* Header */}
      <div className="programs__header">
        <div className="programs__label">
          <span className="programs__label-line" />
          OUR PROGRAMMES
        </div>
        <h2 className="programs__heading">
          Train in What<br />
          <em>Moves You.</em>
        </h2>
        <p className="programs__sub">
          Four disciplines. One academy. World-class coaching from day one.
        </p>
      </div>

      {/* Cards grid */}
      <div className="programs__grid">
        {PROGRAMS.map((p, i) => (
          <article
            key={p.id}
            data-index={i}
            className={`prog-card ${revealedIndices.has(i) ? 'in' : ''}`}
            style={{ '--delay': `${i * 0.18}s` }}
            id={`program-${p.id}`}
          >
            {/* Photo */}
            <div className="prog-card__img-wrap">
              <img src={p.img} alt={`${p.title} training at Temple of Martial Arts`} loading="lazy" />
              {/* Hover overlay */}
              <div className="prog-card__overlay" />
              {/* Tag */}
              <span className="prog-card__tag">{p.tag}</span>
            </div>

            {/* Content */}
            <div className="prog-card__content">
              <div className="prog-card__subtitle">{p.subtitle}</div>
              <h3 className="prog-card__title">{p.title}</h3>
              <p className="prog-card__desc">{p.desc}</p>
              <a href="#contact" className="prog-card__link" aria-label={`Enquire about ${p.title}`}>
                Enquire Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            {/* Bottom accent bar */}
            <div className="prog-card__bar" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}

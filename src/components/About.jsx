import { useEffect, useRef } from 'react';
import './About.css';
import aboutImg from '../assets/hero-master.jpg';

const CREDENTIALS = [
  { num: '01', title: 'KUKKIWON GLOBAL RECOGNITION' },
  { num: '02', title: 'STATE GOLD MEDALISTS' },
  { num: '03', title: 'NATIONAL PLAYERS' },
  { num: '04', title: 'CLASS-1 NATIONAL KYORUGI & POOMSAE REFEREES' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="b" className="panel">
      <section className="about-section" id="about" aria-label="About the Academy" ref={sectionRef}>
        {/* Heading row */}
        <div className="b-top">
          <div>
            <div className="b-label rv">
              <span className="b-label-line" />
              About the Academy
            </div>
            <h2 className="b-h2 rv d1">
              Built on<br />
              Discipline.<br />
              <em>Proven by<br />Champions.</em>
            </h2>
          </div>
          <p className="b-intro rv d2">
            Since <strong>2013</strong>, every milestone at Temple of Martial Arts has been earned on the mat — through <strong>National Players</strong>, <strong>State Gold Medalists</strong>, and <strong>Kukkiwon-certified</strong> coaching standards.
          </p>
        </div>

        {/* Body row */}
        <div className="b-body">
          {/* Image */}
          <div className="b-img-wrap">
            <div className="b-corner-tl rv d2" />
            <div className="b-img-frame rv-img">
              <img src={aboutImg} alt="Taekwondo Student" loading="lazy" />
            </div>
            <div className="b-corner-br rv d3" />
            <div className="b-img-tag rv d4">
              BLACK BELT 4TH DAN
              <span>MASTER PRADEEP KUMAR — FOUNDER</span>
            </div>
          </div>

          {/* Text / Quote */}
          <div className="b-text-wrap">
            <blockquote className="b-quote rv d2">
              "Every champion you see on the mat started exactly where you are — on their first day."
            </blockquote>
            <p className="b-story rv d3">
              Founded by <strong>Master Pradeep Kumar</strong>, Temple of Martial Arts has built one of Hyderabad's most respected martial arts programmes since <strong>2013</strong>. Our coaches don't just teach — they've competed, won, and refereed at the national level.
            </p>

            <div className="b-creds">
              {CREDENTIALS.map((c) => (
                <div key={c.num} className="b-cred rv">
                  <span className="b-cred-num">{c.num}</span>
                  <div className="b-cred-text">
                    <div className="b-cred-title">{c.title}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="#story" className="b-btn rv">
              READ OUR STORY &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GalleryPreview.css';

/* ── Local martial arts images ── */
import imgTKD  from '../assets/prog-taekwondo.jpg';
import imgKick from '../assets/prog-kickboxing.jpg';
import imgMMA  from '../assets/prog-mma.jpg';
import imgSD   from '../assets/prog-selfdefence.jpg';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { id: 'g1', src: imgTKD,  tag: '01', label: 'TRAINING',     title: 'Jump Kick Training' },
  { id: 'g2', src: imgKick, tag: '02', label: 'COMPETITION',  title: 'Championship'        },
  { id: 'g3', src: imgMMA,  tag: '03', label: 'JUNIORS',      title: 'Junior Training'     },
  { id: 'g4', src: imgSD,   tag: '04', label: 'NATIONAL',     title: 'Team India'          },
];

const FALLBACKS = ['#1a1a2e', '#16213e', '#0f3460', '#533483'];

export default function GalleryPreview() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const bentoRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1. Header stagger */
      const headerEls = headerRef.current?.querySelectorAll('.gp-anim') || [];
      gsap.fromTo(headerEls,
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true },
        }
      );

      /* 2. Clip-path reveal per cell */
      const cells = bentoRef.current?.querySelectorAll('.gp-cell') || [];
      cells.forEach((cell, i) => {
        gsap.fromTo(cell,
          { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0 0% 0)', opacity: 1,
            duration: 1.1, delay: i * 0.12, ease: 'power4.out',
            scrollTrigger: { trigger: cell, start: 'top 88%', once: true },
          }
        );
      });

      /* 3. Subtle parallax */
      cells.forEach((cell, i) => {
        const img = cell.querySelector('.gp-cell-img');
        if (!img) return;
        gsap.to(img, {
          y: i === 0 ? 20 : 10, ease: 'none',
          scrollTrigger: { trigger: cell, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, idx) => {
    const cell = bentoRef.current?.querySelector(`.gp-cell[data-idx="${idx}"]`);
    if (!cell) return;
    const r  = cell.getBoundingClientRect();
    cell.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
    cell.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
    const inner = cell.querySelector('.gp-cell-inner');
    if (!inner) return;
    const rx = -((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * 1.8;
    const ry =  ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) * 1.8;
    gsap.to(inner, { rotateX: rx, rotateY: ry, duration: 0.4, ease: 'power2.out', transformPerspective: 900 });
  };

  const handleMouseLeave = (idx) => {
    const cell  = bentoRef.current?.querySelector(`.gp-cell[data-idx="${idx}"]`);
    const inner = cell?.querySelector('.gp-cell-inner');
    if (inner) gsap.to(inner, { rotateX: 0, rotateY: 0, duration: 0.55, ease: 'power3.out' });
  };

  return (
    <section ref={sectionRef} className="gp-section" id="gallery" aria-label="Gallery Preview">

      {/* ── Header ── */}
      <div ref={headerRef} className="gp-header gp-wrap">
        <div className="gp-header-left">
          <div className="gp-eyebrow gp-anim">
            <span className="gp-eyebrow-line" />
            FROM THE ACADEMY
          </div>
          <h2 className="gp-heading gp-anim">
            Every Moment<br /><em>Earned.</em>
          </h2>
        </div>

        <div className="gp-header-right">
          {/* Sub-text inline, separated by dots */}
          <p className="gp-sub gp-anim">
            Real training.&nbsp;&nbsp;·&nbsp;&nbsp;Real competition.&nbsp;&nbsp;·&nbsp;&nbsp;Real champions.
          </p>
          <p className="gp-sub-desc gp-anim">
            From first kicks to national medals — every stage of your journey, captured.
          </p>
          <a href="#gallery-full" className="gp-btn gp-anim" aria-label="View Full Gallery">
            <span className="gp-btn-text">VIEW FULL GALLERY</span>
            <span className="gp-btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* ── Bento Grid ── */}
      <div ref={bentoRef} className="gp-wrap">
        <div className="gp-bento">
          {IMAGES.map((img, i) => (
            <div
              key={img.id}
              className={`gp-cell gp-cell--${i + 1}`}
              data-idx={i}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className="gp-cell-inner">
                <img
                  className="gp-cell-img"
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.closest('.gp-cell-inner').style.background = FALLBACKS[i];
                  }}
                />
                <div className="gp-spot"    aria-hidden="true" />
                <div className="gp-overlay" aria-hidden="true" />
                <div className="gp-border"  aria-hidden="true" />

                {/* Overlay content — always visible, animates on hover */}
                <div className="gp-content">
                  <span className="gp-cell-num">{img.tag} —</span>
                  <span className="gp-cell-label">{img.label}</span>
                  <h3 className="gp-cell-title">{img.title}</h3>
                  <div className="gp-cell-line" aria-hidden="true" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
}

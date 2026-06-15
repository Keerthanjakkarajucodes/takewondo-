import { useEffect, useRef, useState } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'HOME',     href: '#home' },
  { label: 'PROGRAMS', href: '#programs' },
  { label: 'ABOUT',    href: '#about' },
  { label: 'GALLERY',  href: '#gallery' },
  { label: 'CONTACT',  href: '#contact' },
];

const LOGO_URL =
  'https://res.cloudinary.com/dbjqazmbs/image/upload/WhatsApp_Image_2026-06-12_at_8.17.33_AM_j1hsqd.jpg';

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [activeLink, setActiveLink] = useState('HOME');
  const [menuOpen,   setMenuOpen]   = useState(false);
  const headerRef = useRef(null);

  /* ── Scroll glassmorphism ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Magnetic hover on links ── */
  const handleMouseMove = (e, el) => {
    const rect   = el.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) * 0.28;
    const dy     = (e.clientY - cy) * 0.28;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const handleMouseLeave = (el) => {
    el.style.transform = '';
    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
  };
  const handleMouseEnter = (el) => {
    el.style.transition = 'transform 0.15s ease';
  };

  /* ── Active link on click ── */
  const handleLinkClick = (label) => {
    setActiveLink(label);
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--open' : ''}`}
    >
      {/* ── Logo ── */}
      <a href="#home" className="navbar__logo" aria-label="Temple of Martial Arts Home">
        <div className="navbar__logo-emblem">
          <img
            src={LOGO_URL}
            alt="PR Sports Club Logo"
            className="navbar__logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback badge */}
          <div className="navbar__logo-fallback" style={{ display: 'none' }}>
            <span>PR</span>
          </div>
        </div>

        <div className="navbar__logo-wordmark">
          <span className="navbar__logo-title">TEMPLE OF MARTIAL ARTS</span>
          <span className="navbar__logo-rule" />
          <span className="navbar__logo-sub">PR SPORTS CLUB</span>
        </div>
      </a>

      {/* ── Center Nav ── */}
      <nav className="navbar__center" aria-label="Primary navigation">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={`navbar__link${activeLink === label ? ' navbar__link--active' : ''}`}
            onClick={() => handleLinkClick(label)}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseMove={(e)  => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <span className="navbar__link-text">{label}</span>
            <span className="navbar__link-line" aria-hidden="true" />
          </a>
        ))}
      </nav>

      {/* ── CTA ── */}
      <a
        href="#contact"
        className="navbar__cta"
        id="nav-free-trial-btn"
        onClick={() => handleLinkClick('CONTACT')}
      >
        <span className="navbar__cta-label">FREE TRIAL</span>
        <span className="navbar__cta-arrow" aria-hidden="true">→</span>
      </a>

      {/* ── Hamburger ── */}
      <button
        className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /><span /><span />
      </button>

      {/* ── Mobile drawer ── */}
      <div className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={`navbar__drawer-link${activeLink === label ? ' navbar__drawer-link--active' : ''}`}
            onClick={() => handleLinkClick(label)}
          >
            {label}
          </a>
        ))}
        <a href="#contact" className="navbar__drawer-cta" onClick={() => setMenuOpen(false)}>
          FREE TRIAL
        </a>
      </div>

      {/* ── Mobile overlay ── */}
      {menuOpen && (
        <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}

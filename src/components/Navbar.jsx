import './Navbar.css';

const NAV_LINKS = ['HOME', 'PROGRAMS', 'ABOUT', 'COACH', 'GALLERY', 'CONTACT'];

export default function Navbar() {
  return (
    <header className="navbar">
      {/* Logo */}
      <a href="#" className="navbar__logo" aria-label="Temple of Martial Arts Home">
        <div className="navbar__logo-circle">
          <span>PR</span>
        </div>
        <div className="navbar__logo-text">
          <span className="navbar__logo-title">TEMPLE OF MARTIAL ARTS</span>
          <span className="navbar__logo-sub">PR Sports Club</span>
        </div>
      </a>

      {/* Links */}
      <nav className="navbar__links" aria-label="Primary navigation">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className={`navbar__link${i === 0 ? ' navbar__link--active' : ''}`}
          >
            {link}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a href="#contact" className="navbar__cta" id="nav-free-trial-btn">
        FREE TRIAL
      </a>

      {/* Mobile hamburger */}
      <button className="navbar__hamburger" aria-label="Open menu">
        <span /><span /><span />
      </button>
    </header>
  );
}

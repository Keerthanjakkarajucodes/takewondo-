import { useEffect, useRef, useState } from "react";
import "./Footer.css";

/* ── SVG social icons ──────────────────────────────────────── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);

const SOCIAL = [
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "WhatsApp",  Icon: WhatsAppIcon,  href: "#" },
  { label: "YouTube",   Icon: YouTubeIcon,   href: "#" },
  { label: "Facebook",  Icon: FacebookIcon,  href: "#" },
];

const QUICK_LINKS = ["Home", "About", "Programs", "Gallery", "Contact"];
const PROGRAMS    = ["Taekwondo", "Kickboxing", "MMA", "Self Defence"];

/* ── Scroll-reveal hook ────────────────────────────────────── */
function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("ft-in"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

export default function Footer() {
  const footerRef = useRef(null);
  const [atTop, setAtTop]   = useState(true);

  useReveal(footerRef);

  /* Back-to-top visibility */
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={footerRef} className="ft-root">

      {/* ── Main grid ──────────────────────────────────────── */}
      <div className="ft-inner">

        {/* Column 1 — Brand */}
        <div className="ft-col ft-col--brand">
          {/* Real PR Sports logo */}
          <div className="ft-logo">
            <div className="ft-logo-emblem">
              <img
                src="https://res.cloudinary.com/dbjqazmbs/image/upload/WhatsApp_Image_2026-06-12_at_8.17.33_AM_j1hsqd.jpg"
                alt="PR Sports Club Logo"
                className="ft-logo-img"
              />
            </div>
            <div className="ft-logo-text">
              <span className="ft-logo-top">PR Sports Club</span>
              <span className="ft-logo-sub">Temple Of Martial Arts</span>
            </div>
          </div>

          <p className="ft-desc">
            Hyderabad's premier martial arts academy. Building discipline,
            confidence and champions since 2013 through nationally recognised
            coaching.
          </p>

          {/* Social icons */}
          <div className="ft-socials">
            {SOCIAL.map(({ label, Icon, href }) => (
              <a key={label} href={href} className="ft-social" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="ft-col">
          <h3 className="ft-col-head">Quick Links</h3>
          <ul className="ft-links">
            {QUICK_LINKS.map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="ft-link">
                  <span className="ft-link-arrow" aria-hidden="true">→</span>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Programs */}
        <div className="ft-col">
          <h3 className="ft-col-head">Programs</h3>
          <ul className="ft-links">
            {PROGRAMS.map((p) => (
              <li key={p}>
                <a href="#programs" className="ft-link">
                  <span className="ft-link-arrow" aria-hidden="true">→</span>
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact + Training Hours side by side */}
        <div className="ft-col ft-col--contact">

          {/* Contact sub-column */}
          <div className="ft-contact-sub">
            <h3 className="ft-col-head">Contact</h3>
            <ul className="ft-contact-list">
              <li>
                <span className="ft-contact-label">Location</span>
                <span className="ft-contact-val">Hyderabad, Telangana</span>
              </li>
              <li>
                <span className="ft-contact-label">Phone</span>
                <a href="tel:+919999999999" className="ft-contact-val ft-contact-link">+91 99999 99999</a>
              </li>
              <li>
                <span className="ft-contact-label">WhatsApp</span>
                <a href="https://wa.me/919999999999" className="ft-contact-val ft-contact-link">+91 99999 99999</a>
              </li>
              <li>
                <span className="ft-contact-label">Email</span>
                <a href="mailto:info@templeofmartialarts.in" className="ft-contact-val ft-contact-link">
                  info@templeofmartialarts.in
                </a>
              </li>
            </ul>
          </div>

          {/* Training Hours sub-column */}
          <div className="ft-hours-sub">
            <h4 className="ft-hours-head">Training Hours</h4>
            <div className="ft-hours-block">
              <div className="ft-hours-entry">
                <span className="ft-hours-label">Morning</span>
                <span className="ft-hours-time">5:30 AM – 11:00 AM</span>
              </div>
              <div className="ft-hours-entry">
                <span className="ft-hours-label">Evening</span>
                <span className="ft-hours-time">5:00 PM – 9:00 PM</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────────── */}
      <div className="ft-divider" />

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div className="ft-bottom">
        {/* Left — copyright */}
        <p className="ft-copy">
          © 2026 Temple Of Martial Arts. All rights reserved.
        </p>

        {/* Center — motto only */}
        <div className="ft-bottom-center">
          <p className="ft-motto">
            Built On <span className="ft-motto-red">Discipline.</span>&nbsp;
            Proven By <span className="ft-motto-red">Champions.</span>
          </p>
        </div>

        {/* Right — back to top */}
        <button
          className={`ft-top-btn${atTop ? "" : " ft-top-btn--visible"}`}
          onClick={scrollTop}
          aria-label="Back to top"
        >
          <span className="ft-top-icon"><ArrowUpIcon /></span>
          Back to Top
        </button>
      </div>


    </footer>
  );
}

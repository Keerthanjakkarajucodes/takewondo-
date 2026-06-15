import { useEffect, useRef } from "react";
import "./CallToAction.css";

/* ─── stats data ────────────────────────────────────────────── */
const stats = [
  [2013, "",  "Established"],
  [1000, "+", "Students"],
  [50,   "+", "Medals"],
  [5,    "+", "Coaches"],
];

/* ─── scroll-reveal hook ────────────────────────────────────── */
function useReveal(containerRef) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".fc-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ─── count-up hook ─────────────────────────────────────────── */
function useCountUp(containerRef) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-count]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || "";
          const dur = 1400;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ══════════════════════════════════════════════════════════════
   VARIANT 2 — Compact: headline left-aligned, single row at the
   bottom holds buttons (left) + stats (right).
══════════════════════════════════════════════════════════════ */
function Variant2() {
  const ref = useRef(null);
  useReveal(ref);
  useCountUp(ref);
  return (
    <section ref={ref} className="v2-section">
      <div className="fc-grain" />
      <div className="v2-bgword">DISCIPLINE</div>
      <div className="v2-inner">
        <div className="v2-label fc-reveal">
          <span className="v2-label-line" />
          Ready to Start?
        </div>
        <h2 className="v2-head fc-reveal" style={{ transitionDelay: "0.06s" }}>
          Every Champion Was Once A <span className="red">Beginner.</span>
        </h2>
        <p className="v2-sub fc-reveal" style={{ transitionDelay: "0.12s" }}>
          <strong>Your first class is completely free.</strong> Train with
          national-level coaches and start your journey today.
        </p>
        <div className="v2-bottom fc-reveal" style={{ transitionDelay: "0.18s" }}>
          <div className="v2-btns">
            <button className="fc-btn-primary">Book Free Trial →</button>
            <button className="fc-btn-secondary">WhatsApp Us</button>
          </div>
          <div className="v2-stats">
            {stats.map(([n, suf, l]) => (
              <div key={l} className="fc-stat">
                <div className="fc-stat-num" data-count={n} data-suffix={suf}>
                  0{suf}
                </div>
                <div className="fc-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CallToAction() {
  return <Variant2 />;
}

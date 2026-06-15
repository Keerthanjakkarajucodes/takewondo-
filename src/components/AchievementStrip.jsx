import "./AchievementStrip.css";

const ITEMS = [
  "KUKKIWON CERTIFIED",
  "NATIONAL PLAYERS",
  "STATE GOLD MEDALISTS",
  "CLASS-1 REFEREES",
  "1000+ STUDENTS",
  "EST. 2013",
];

/* Duplicate for seamless loop */
const TRACK = [...ITEMS, ...ITEMS, ...ITEMS];

export default function AchievementStrip() {
  return (
    <div className="as-root" aria-label="Achievements">
      <div className="as-track">
        {TRACK.map((item, i) => (
          <span key={i} className="as-item">
            <span className="as-star" aria-hidden="true">★</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

import './Marquee.css';

const ITEMS = [
  { icon: '🥋', text: 'Kukkiwon Certified'      },
  { icon: '✦',  text: null, sep: true           },
  { icon: '🏆', text: 'National Players'         },
  { icon: '✦',  text: null, sep: true           },
  { icon: '🥇', text: 'State Gold Medalists'     },
  { icon: '✦',  text: null, sep: true           },
  { icon: '⚡', text: 'Class-1 Referees'         },
  { icon: '✦',  text: null, sep: true           },
  { icon: '🎽', text: '4th Dan Black Belt Coach' },
  { icon: '✦',  text: null, sep: true           },
  { icon: '📅', text: 'Established 2013'         },
  { icon: '✦',  text: null, sep: true           },
  { icon: '👊', text: '1000+ Students'           },
  { icon: '✦',  text: null, sep: true           },
];

// Triple-duplicate for a perfectly seamless loop
const TRACK = [...ITEMS, ...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className="mq-wrap" aria-label="Academy credentials">
      <div className="mq-track">
        {TRACK.map((item, i) =>
          item.sep ? (
            <span key={i} className="mq-sep" aria-hidden="true">✦</span>
          ) : (
            <span key={i} className="mq-item">
              <span className="mq-icon" aria-hidden="true">{item.icon}</span>
              <span className="mq-text">{item.text}</span>
            </span>
          )
        )}
      </div>
    </div>
  );
}

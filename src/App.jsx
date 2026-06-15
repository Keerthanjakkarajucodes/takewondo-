import './index.css';
import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import Marquee  from './components/Marquee';
import About    from './components/About';
import Programs from './components/Programs';

export default function App() {
  return (
    <>
      {/* ── Fixed navbar ── */}
      <Navbar />

      {/* ── Hero viewport (exactly 100vh, no scroll) ── */}
      <div
        id="home"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          paddingTop: 'var(--nav-h)',
        }}
      >
        <Hero />
        <Marquee />
      </div>

      {/* ── Below-fold content (natural scroll) ── */}
      <main>
        <About />
      </main>
    </>
  );
}

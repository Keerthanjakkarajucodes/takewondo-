import './index.css';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import Marquee    from './components/Marquee';
import About      from './components/About';
import Programs   from './components/Programs';
import WhyChoose       from './components/WhyChoose';
import GalleryPreview  from './components/GalleryPreview';
import CallToAction    from './components/CallToAction';
import AchievementStrip from './components/AchievementStrip';
import Footer           from './components/Footer';

export default function App() {
  return (
    <>
      {/* ── Fixed navbar ── */}
      <Navbar />

      {/* ── Hero viewport (exactly 100vh, no scroll) ── */}
      <div
        id="home"
        className="home-viewport"
      >
        {/* Spacing and layout handled in index.css */}
        <Hero />
        <Marquee />
      </div>

      {/* ── Below-fold content (natural scroll) ── */}
      <main>
        <About />
        <Programs />
        <WhyChoose />
        <GalleryPreview />
        <CallToAction />
      </main>

      <AchievementStrip />
      <Footer />
    </>
  );
}

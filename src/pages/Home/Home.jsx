import Hero from '../../sections/hero/Hero.jsx';
import Transformation from '../../sections/transformation/Transformation.jsx';
import ServicesPreview from '../../sections/services/ServicesPreview.jsx';
import WhyRiyadvi from '../../sections/whyRiyadvi/WhyRiyadvi.jsx';
import Technology from '../../sections/technology/Technology.jsx';
import PortfolioPreview from '../../sections/portfolio/PortfolioPreview.jsx';
import Testimonials from '../../sections/testimonials/Testimonials.jsx';
import CTA from '../../sections/CTA/CTA.jsx';

function Home() {
  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <Hero />

      {/* =====================================================
          DIGITAL TRANSFORMATION
      ===================================================== */}

      <Transformation />

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <ServicesPreview />

      {/* =====================================================
          WHY RIYADVI
      ===================================================== */}

      <WhyRiyadvi />

      {/* =====================================================
          TECHNOLOGY ECOSYSTEM
      ===================================================== */}

      <Technology />

      {/* =====================================================
          SELECTED WORK
      ===================================================== */}

      <PortfolioPreview />

      {/* =====================================================
          CLIENT PERSPECTIVES
      ===================================================== */}

      <Testimonials />

      {/* =====================================================
          FINAL CONSULTATION CTA
      ===================================================== */}

      <CTA />
    </>
  );
}

export default Home;
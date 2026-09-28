import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import ThreeSceneLoader from '../../components/loaders/ThreeSceneLoader.jsx';
import styles from './Hero.module.css';

const HeroScene = lazy(() => import('../../three/scenes/HeroScene.jsx'));

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* =====================================================
            HERO CONTENT
        ===================================================== */}

        <div className={styles.content}>
          <div className={styles.intro}>
            <span className={styles.introLine} />

            <p className={styles.eyebrow}>
              RIYADVI SOFTWARE TECHNOLOGIES
            </p>
          </div>

          <h1 className={styles.title}>
            Custom Software &amp; Digital Solutions to Grow Your
            <span className={styles.titleAccent}> Business</span>
          </h1>

          <div className={styles.lowerContent}>
            <p className={styles.description}>
              Web &amp; App Development, UI/UX Design, and Business
              Strategy — all tailored to your needs.
            </p>

            <div className={styles.actions}>
              <Link
                to="/contact"
                className={styles.primaryButton}
              >
                <span>Book a Free Consultation</span>
                <span
                  className={styles.buttonArrow}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>

              <Link
                to="/services"
                className={styles.secondaryButton}
              >
                <span>Explore Our Solutions</span>
                <span
                  className={styles.secondaryArrow}
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className={styles.heroMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaNumber}>01</span>
              <span className={styles.metaLabel}>
                DIGITAL
                <br />
                SOLUTIONS
              </span>
            </div>

            <div className={styles.metaDivider} />

            <div className={styles.metaItem}>
              <span className={styles.metaNumber}>02</span>
              <span className={styles.metaLabel}>
                SOFTWARE
                <br />
                DEVELOPMENT
              </span>
            </div>

            <div className={styles.metaDivider} />

            <div className={styles.metaItem}>
              <span className={styles.metaNumber}>03</span>
              <span className={styles.metaLabel}>
                DIGITAL
                <br />
                EXPERIENCE
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            3D EXPERIENCE
        ===================================================== */}

        <div className={styles.visualArea}>
          <div className={styles.visualHeader}>
            <span>INTERACTIVE SYSTEM</span>
            <span>RIYADVI / 01</span>
          </div>

          <div className={styles.visual}>
            <Suspense fallback={<ThreeSceneLoader label="Loading interactive system" />}><HeroScene /></Suspense>
          </div>

          <div className={styles.visualFooter}>
            <span className={styles.visualStatus}>
              <span className={styles.statusDot} />
              DIGITAL EXPERIENCE
            </span>

            <span className={styles.visualHint}>
              MOVE TO EXPLORE
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollNumber}>01</span>

        <span className={styles.scrollLine} />

        <span className={styles.scrollText}>
          Scroll to explore
        </span>
      </div>
    </section>
  );
}

export default Hero;
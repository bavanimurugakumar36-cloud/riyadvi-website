import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

import ThreeSceneLoader from '../../components/loaders/ThreeSceneLoader.jsx';
import styles from './Hero.module.css';

const HeroScene = lazy(
  () => import('../../three/scenes/HeroScene.jsx'),
);

function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background */}
      <div
        className={styles.backgroundGlow}
        aria-hidden="true"
      />

      <div
        className={styles.grid}
        aria-hidden="true"
      />

      <div className={styles.container}>
        {/* ==================================================
            LEFT CONTENT
        ================================================== */}

        <div className={styles.content}>
          {/* Company name */}

          <div className={styles.brandLabel}>
            <span className={styles.brandLine} />

            <span>
              RIYADVI SOFTWARE TECHNOLOGIES
            </span>
          </div>

          {/* Main heading */}

          <h1 className={styles.title}>
            <span>
              Custom Software &amp;
            </span>

            <span>
              Digital Solutions to Grow
            </span>

            <span>
              Your <em>Business</em>
            </span>
          </h1>

          {/* Description */}

          <p className={styles.description}>
            Web &amp; App Development, UI/UX Design,
            and Business Strategy — all tailored to
            your needs.
          </p>

          {/* CTA buttons */}

          <div className={styles.actions}>
            <Link
              to="/contact"
              className={`${styles.actionButton} ${styles.primaryButton}`}
            >
              <span className={styles.buttonText}>
                Book a Free Consultation
              </span>

              <span
                className={styles.buttonArrow}
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            <Link
              to="/services"
              className={`${styles.actionButton} ${styles.secondaryButton}`}
            >
              <span className={styles.buttonText}>
                Explore Our Solutions
              </span>

              <span
                className={styles.buttonArrow}
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>

          {/* ==================================================
              FEATURE ROW
          ================================================== */}

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLine} />

              <div className={styles.statContent}>
                <span className={styles.statNumber}>
                  01
                </span>

                <span className={styles.statLabel}>
                  DIGITAL
                  <br />
                  SOLUTIONS
                </span>
              </div>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.stat}>
              <span className={styles.statLine} />

              <div className={styles.statContent}>
                <span className={styles.statNumber}>
                  02
                </span>

                <span className={styles.statLabel}>
                  SOFTWARE
                  <br />
                  DEVELOPMENT
                </span>
              </div>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.stat}>
              <span className={styles.statLine} />

              <div className={styles.statContent}>
                <span className={styles.statNumber}>
                  03
                </span>

                <span className={styles.statLabel}>
                  DIGITAL
                  <br />
                  EXPERIENCE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            RIGHT 3D VISUAL
        ================================================== */}

        <div className={styles.visualArea}>
          <div className={styles.visual}>
            <Suspense
              fallback={
                <ThreeSceneLoader
                  label="Loading digital experience"
                />
              }
            >
              <HeroScene />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
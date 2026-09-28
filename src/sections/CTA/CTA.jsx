import { Link } from 'react-router-dom';

import styles from './CTA.module.css';

function CTA() {
  return (
    <section
      className={styles.section}
      aria-labelledby="cta-title"
    >
      <div className={styles.container}>
        {/* =====================================================
            TOP LABEL
        ===================================================== */}

        <div className={styles.label}>
          <span className={styles.labelLine} />
          <span>START A CONVERSATION</span>
        </div>

        {/* =====================================================
            MAIN CTA
        ===================================================== */}

        <div className={styles.main}>
          <div className={styles.copy}>
            <h2 id="cta-title" className={styles.title}>
              Have an idea?
              <br />
              <span>Let's build it.</span>
            </h2>

            <p className={styles.description}>
              Whether you are planning a new digital
              product, improving an existing business
              system or exploring your next technology
              initiative, let's start with the challenge
              and work towards the right solution.
            </p>
          </div>

          {/* =================================================
              VISUAL
          ================================================= */}

          <div
            className={styles.visual}
            aria-hidden="true"
          >
            <div className={styles.visualGrid} />

            <div className={styles.outerRing}>
              <span className={styles.ringPoint} />
            </div>

            <div className={styles.middleRing}>
              <span className={styles.ringPoint} />
            </div>

            <div className={styles.innerRing} />

            <div className={styles.core}>
              <span>R</span>
            </div>

            <div className={styles.orbitText}>
              <span>STRATEGY</span>
              <span>DESIGN</span>
              <span>TECHNOLOGY</span>
            </div>
          </div>
        </div>

        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className={styles.actions}>
          <Link
            to="/contact"
            className={styles.primaryAction}
          >
            <span>Book a Free Consultation</span>

            <span
              className={styles.actionArrow}
              aria-hidden="true"
            >
              ↗
            </span>
          </Link>

          <Link
            to="/services"
            className={styles.secondaryAction}
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

        {/* =====================================================
            BOTTOM INFORMATION
        ===================================================== */}

        <div className={styles.bottom}>
          <span className={styles.bottomNumber}>
            06
          </span>

          <div className={styles.bottomText}>
            <span>RIYADVI SOFTWARE TECHNOLOGIES</span>

            <p>
              From strategy and design to development
              and growth, we create digital solutions
              around real business needs.
            </p>
          </div>

          <Link
            to="/business-health-checkup"
            className={styles.healthLink}
          >
            <span>Check your digital health</span>

            <span
              className={styles.healthArrow}
              aria-hidden="true"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTA;
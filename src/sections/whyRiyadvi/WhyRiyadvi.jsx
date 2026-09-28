import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './WhyRiyadvi.module.css';

function WhyRiyadvi() {
  const principles = [
    {
      number: '01',
      title: 'Business First',
      description:
        'We begin with your business goals, challenges and opportunities before selecting the technology that supports them.',
    },
    {
      number: '02',
      title: 'Purposeful Technology',
      description:
        'Technology should solve a real problem. Every solution is shaped around functionality, scalability and measurable business value.',
    },
    {
      number: '03',
      title: 'Human Experiences',
      description:
        'We combine thoughtful design with technology to create digital experiences that feel intuitive, engaging and meaningful.',
    },
    {
      number: '04',
      title: 'Built to Evolve',
      description:
        'Our solutions are designed with future growth in mind, making it easier to adapt, improve and scale over time.',
    },
  ];

  const [activePrinciple, setActivePrinciple] = useState(0);

  const selectedPrinciple = principles[activePrinciple];

  return (
    <section
      className={styles.section}
      aria-labelledby="why-riyadvi-title"
    >
      <div className={styles.container}>
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles.labelLine} />

            <span>WHY RIYADVI</span>
          </div>

          <div className={styles.headerGrid}>
            <div>
              <h2
                id="why-riyadvi-title"
                className={styles.title}
              >
                Technology with
                <br />
                <span>purpose.</span>
              </h2>
            </div>

            <div className={styles.headerCopy}>
              <p>
                We believe great digital products are
                created when business strategy,
                technology and human experience work
                together.
              </p>

              <Link
                to="/about"
                className={styles.aboutLink}
              >
                <span>Discover Riyadvi</span>

                <span
                  className={styles.aboutArrow}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================
            EXPERIENCE
        ===================================================== */}

        <div className={styles.experience}>
          {/* ===================================================
              VISUAL
          =================================================== */}

          <div className={styles.visual}>
            <div
              className={styles.grid}
              aria-hidden="true"
            />

            <div
              className={`${styles.orbit} ${styles.orbitOuter}`}
              aria-hidden="true"
            >
              <span
                className={`${styles.orbitPoint} ${styles.pointTop}`}
              />

              <span
                className={`${styles.orbitPoint} ${styles.pointRight}`}
              />

              <span
                className={`${styles.orbitPoint} ${styles.pointBottom}`}
              />

              <span
                className={`${styles.orbitPoint} ${styles.pointLeft}`}
              />
            </div>

            <div
              className={`${styles.orbit} ${styles.orbitMiddle}`}
              aria-hidden="true"
            >
              <span className={styles.orbitAccent} />
            </div>

            <div
              className={`${styles.orbit} ${styles.orbitInner}`}
              aria-hidden="true"
            />

            <div className={styles.core}>
              <span>
                {selectedPrinciple.number}
              </span>
            </div>

            <div className={styles.visualMeta}>
              <span>STRATEGY</span>
              <span>DESIGN</span>
              <span>TECHNOLOGY</span>
            </div>
          </div>

          {/* ===================================================
              CONTENT
          =================================================== */}

          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <span className={styles.index}>
                {selectedPrinciple.number}
              </span>

              <span className={styles.hint}>
                WHY RIYADVI
              </span>
            </div>

            <div className={styles.copy}>
              <span className={styles.smallLabel}>
                PRINCIPLE {selectedPrinciple.number}
              </span>

              <h3 key={selectedPrinciple.number}>
                {selectedPrinciple.title}
              </h3>

              <p key={`description-${selectedPrinciple.number}`}>
                {selectedPrinciple.description}
              </p>
            </div>

            {/* =================================================
                PRINCIPLE SELECTOR
            ================================================= */}

            <div className={styles.selector}>
              {principles.map((principle, index) => {
                const isActive =
                  index === activePrinciple;

                return (
                  <button
                    key={principle.number}
                    type="button"
                    className={`${styles.selectorItem} ${
                      isActive
                        ? styles.selectorItemActive
                        : ''
                    }`}
                    onClick={() =>
                      setActivePrinciple(index)
                    }
                    aria-pressed={isActive}
                  >
                    <span className={styles.selectorNumber}>
                      {principle.number}
                    </span>

                    <span className={styles.selectorTitle}>
                      {principle.title}
                    </span>

                    <span
                      className={styles.selectorArrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div className={styles.statement}>
          <span className={styles.statementNumber}>
            04
          </span>

          <div className={styles.statementContent}>
            <span className={styles.statementLabel}>
              OUR APPROACH
            </span>

            <p>
              From the first idea to the final product,
              we focus on creating technology that
              moves businesses forward.
            </p>
          </div>

          <Link
            to="/about"
            className={styles.aboutLink}
          >
            <span>Learn more about Riyadvi</span>

            <span
              className={styles.aboutArrow}
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

export default WhyRiyadvi;
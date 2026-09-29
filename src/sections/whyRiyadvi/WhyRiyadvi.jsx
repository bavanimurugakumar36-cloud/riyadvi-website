import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './WhyRiyadvi.module.css';

const principles = [
  {
    number: '01',
    year: '2021',
    title: 'Business First',
    shortTitle: 'Understand',
    description:
      'We begin by understanding the business, its challenges, opportunities and goals before deciding what technology should do.',
    outcome: 'Clarity before execution',
  },
  {
    number: '02',
    year: '2022',
    title: 'Purposeful Technology',
    shortTitle: 'Build',
    description:
      'Technology is selected around the problem it needs to solve, creating solutions that are practical, scalable and measurable.',
    outcome: 'Technology with purpose',
  },
  {
    number: '03',
    year: '2024',
    title: 'Human Experiences',
    shortTitle: 'Experience',
    description:
      'We combine design, interaction and engineering to create digital products that people can understand, use and remember.',
    outcome: 'Experiences people value',
  },
  {
    number: '04',
    year: '2026',
    title: 'Built to Evolve',
    shortTitle: 'Grow',
    description:
      'Products should not stop at launch. We design foundations that can adapt, improve and scale as the business grows.',
    outcome: 'Ready for what comes next',
  },
];

const journey = [
  {
    number: '01',
    title: 'Strategy',
    description: 'Define the opportunity, objectives and direction.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Shape experiences around real people and real needs.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Turn the product vision into reliable technology.',
  },
  {
    number: '04',
    title: 'Marketing',
    description: 'Connect the product with the right audience.',
  },
  {
    number: '05',
    title: 'Optimization',
    description: 'Use insight and feedback to continuously improve.',
  },
  {
    number: '06',
    title: 'Growth',
    description: 'Build momentum and create long-term business value.',
  },
];

function WhyRiyadvi() {
  const [activePrinciple, setActivePrinciple] = useState(0);

  const selected = principles[activePrinciple];

  return (
    <section
      className={styles.section}
      id="why-riyadvi"
      aria-labelledby="why-riyadvi-title"
    >
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.container}>
        {/* =====================================================
            INTRO
        ===================================================== */}

        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              WHY RIYADVI
            </div>

            <span className={styles.since}>
              SINCE <strong>2021</strong>
            </span>
          </div>

          <div className={styles.headerMain}>
            <h2
              id="why-riyadvi-title"
              className={styles.title}
            >
              Technology
              <span>with purpose.</span>
            </h2>

            <div className={styles.headerSide}>
              <p>
                Great digital products happen when business strategy,
                technology and human experience move in the same
                direction.
              </p>

              <Link
                to="/about"
                className={styles.textLink}
              >
                Discover Riyadvi
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </header>

        {/* =====================================================
            PRINCIPLES EXPERIENCE
        ===================================================== */}

        <div className={styles.principlesSection}>
          <div className={styles.principleIntro}>
            <span>01 — 04</span>

            <p>
              Four principles guide the way we think,
              build and evolve digital products.
            </p>
          </div>

          <div className={styles.principleExperience}>
            {/* ---------------------------------------------
                TIMELINE
            --------------------------------------------- */}

            <div className={styles.timeline}>
              <div className={styles.timelineTrack} />

              {principles.map((principle, index) => {
                const active = index === activePrinciple;

                return (
                  <button
                    key={principle.number}
                    type="button"
                    className={`${styles.timelineItem} ${
                      active ? styles.timelineItemActive : ''
                    }`}
                    onClick={() => setActivePrinciple(index)}
                    aria-pressed={active}
                  >
                    <span className={styles.timelineYear}>
                      {principle.year}
                    </span>

                    <span className={styles.timelineDot}>
                      {principle.number}
                    </span>

                    <span className={styles.timelineName}>
                      {principle.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ---------------------------------------------
                ACTIVE PRINCIPLE
            --------------------------------------------- */}

            <div className={styles.principlePanel}>
              <div className={styles.panelNumber}>
                {selected.number}
              </div>

              <div className={styles.panelContent}>
                <span className={styles.panelLabel}>
                  PRINCIPLE / {selected.year}
                </span>

                <h3 key={selected.number}>
                  {selected.title}
                </h3>

                <p key={`${selected.number}-description`}>
                  {selected.description}
                </p>

                <div className={styles.panelOutcome}>
                  <span />
                  <div>
                    <small>THE OUTCOME</small>
                    <strong>{selected.outcome}</strong>
                  </div>
                </div>
              </div>

              <div className={styles.panelProgress}>
                <span
                  style={{
                    width: `${((activePrinciple + 1) / principles.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            END-TO-END JOURNEY
        ===================================================== */}

        <section className={styles.journeySection}>
          <div className={styles.journeyHeader}>
            <div>
              <span className={styles.sectionLabel}>
                THE RIYADVI JOURNEY
              </span>

              <h3>
                From first idea
                <span>to continuous growth.</span>
              </h3>
            </div>

            <p>
              Strategy, design, technology and growth work
              together as one continuous process.
            </p>
          </div>

          <div className={styles.journeyTrack}>
            {journey.map((step, index) => (
              <article
                key={step.number}
                className={styles.journeyCard}
              >
                <div className={styles.journeyCardTop}>
                  <span>{step.number}</span>

                  {index < journey.length - 1 && (
                    <span
                      className={styles.journeyArrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>

                <h4>{step.title}</h4>

                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================
            HEALTH CHECKUP / APPROACH
        ===================================================== */}

        <div className={styles.approach}>
          <div className={styles.approachMark}>
            <span>R</span>
          </div>

          <div className={styles.approachContent}>
            <span className={styles.sectionLabel}>
              BUSINESS-FIRST APPROACH
            </span>

            <h3>
              Before building,
              <span> understand.</span>
            </h3>

            <p>
              Our Business Health Checkup helps identify digital
              opportunities, operational gaps and areas where
              technology can create meaningful business value.
            </p>
          </div>

          <Link
            to="/business-health-checkup"
            className={styles.approachLink}
          >
            <span>Explore Health Checkup</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* =====================================================
            FINAL STATEMENT
        ===================================================== */}

        <div className={styles.bottomStatement}>
          <span className={styles.bottomLine} />

          <p>
            We don't start with technology.
            <strong> We start with what needs to change.</strong>
          </p>

          <span className={styles.bottomLine} />
        </div>
      </div>
    </section>
  );
}

export default WhyRiyadvi;
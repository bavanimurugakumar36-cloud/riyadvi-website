import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Transformation.module.css';

const JOURNEY = [
  {
    number: '01',
    title: 'Challenge',
    label: 'UNDERSTAND',
    description:
      'We begin by understanding the business problem, existing workflows, customer expectations, and the opportunities hidden inside them.',
    points: [
      'Business objectives',
      'Existing systems',
      'Customer needs',
    ],
  },
  {
    number: '02',
    title: 'Strategy',
    label: 'DEFINE',
    description:
      'We translate business goals into a clear digital strategy with the right priorities, technology direction, and measurable outcomes.',
    points: [
      'Product direction',
      'Technology roadmap',
      'Growth opportunities',
    ],
  },
  {
    number: '03',
    title: 'Design',
    label: 'EXPERIENCE',
    description:
      'We design intuitive digital experiences that connect business requirements with how real people interact with the product.',
    points: [
      'UX architecture',
      'Visual systems',
      'Interaction design',
    ],
  },
  {
    number: '04',
    title: 'Technology',
    label: 'ENGINEER',
    description:
      'We build the software foundation using modern technologies, scalable architecture, APIs, databases, and intelligent systems.',
    points: [
      'Custom software',
      'APIs & databases',
      'AI & automation',
    ],
  },
  {
    number: '05',
    title: 'Launch',
    label: 'DELIVER',
    description:
      'We move the product from development into a reliable production environment with testing, deployment, and performance considerations.',
    points: [
      'Quality assurance',
      'Cloud deployment',
      'Performance',
    ],
  },
  {
    number: '06',
    title: 'Growth',
    label: 'EVOLVE',
    description:
      'Launch is not the end. We continue improving the digital product using data, feedback, automation, and new opportunities.',
    points: [
      'Continuous improvement',
      'Analytics & insights',
      'Long-term evolution',
    ],
  },
];

function Transformation() {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        },
        {
          threshold: 0.12,
        },
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = sectionRef.current;

      if (!element) {
        return;
      }

      const rect =
        element.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const sectionHeight =
        element.offsetHeight;

      const travelled =
        viewportHeight - rect.top;

      const usableHeight =
        sectionHeight - viewportHeight;

      if (usableHeight <= 0) {
        return;
      }

      const progress = Math.min(
        1,
        Math.max(
          0,
          (travelled -
            viewportHeight * 0.2) /
            usableHeight,
        ),
      );

      const nextIndex = Math.min(
        JOURNEY.length - 1,
        Math.floor(
          progress *
            JOURNEY.length,
        ),
      );

      setActiveIndex(nextIndex);
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, []);

  const active =
    JOURNEY[activeIndex];

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${
        visible
          ? styles.visible
          : ''
      }`}
      aria-labelledby="transformation-title"
    >
      <div className={styles.backgroundGrid} />

      <div className={styles.container}>
        {/* =================================================
            HEADER
        ================================================= */}

        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span
              className={
                styles.eyebrowLine
              }
            />

            <span>
              HOW WE CREATE VALUE
            </span>
          </div>

          <div className={styles.headingRow}>
            <div>
              <h2
                id="transformation-title"
                className={styles.title}
              >
                From business challenge
                <br />
                to{' '}
                <span>
                  digital growth.
                </span>
              </h2>
            </div>

            <p className={styles.intro}>
              A structured transformation
              process that connects
              strategy, experience,
              technology and measurable
              business outcomes.
            </p>
          </div>
        </header>

        {/* =================================================
            JOURNEY
        ================================================= */}

        <div className={styles.journey}>
          {/* Progress rail */}

          <div
            className={
              styles.progressRail
            }
          >
            <div
              className={
                styles.progressTrack
              }
            >
              <div
                className={
                  styles.progressFill
                }
                style={{
                  height: `${
                    (activeIndex /
                      (JOURNEY.length -
                        1)) *
                    100
                  }%`,
                }}
              />
            </div>

            {JOURNEY.map(
              (item, index) => (
                <button
                  key={item.number}
                  type="button"
                  className={`${styles.progressNode} ${
                    index ===
                    activeIndex
                      ? styles.progressNodeActive
                      : ''
                  } ${
                    index <
                    activeIndex
                      ? styles.progressNodeComplete
                      : ''
                  }`}
                  onClick={() =>
                    setActiveIndex(
                      index,
                    )
                  }
                  aria-label={`View ${item.title} stage`}
                >
                  <span>
                    {item.number}
                  </span>
                </button>
              ),
            )}
          </div>

          {/* Main experience */}

          <div className={styles.experience}>
            <div className={styles.stageMeta}>
              <span>
                DIGITAL
                TRANSFORMATION
              </span>

              <span>
                {String(
                  active.number,
                )}{' '}
                / 06
              </span>
            </div>

            <div className={styles.stage}>
              {/* Decorative number */}

              <div
                className={
                  styles.largeNumber
                }
                aria-hidden="true"
              >
                {active.number}
              </div>

              {/* Main stage content */}

              <div
                className={
                  styles.stageContent
                }
              >
                <div
                  className={
                    styles.stageLabel
                  }
                >
                  <span
                    className={
                      styles.activeDot
                    }
                  />

                  {active.label}
                </div>

                <h3
                  className={
                    styles.stageTitle
                  }
                >
                  {active.title}
                </h3>

                <p
                  className={
                    styles.stageDescription
                  }
                >
                  {active.description}
                </p>

                <div
                  className={
                    styles.points
                  }
                >
                  {active.points.map(
                    (point) => (
                      <div
                        key={point}
                        className={
                          styles.point
                        }
                      >
                        <span>
                          +
                        </span>

                        <span>
                          {point}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Visual system */}

              <div
                className={
                  styles.stageVisual
                }
                aria-hidden="true"
              >
                <div
                  className={
                    styles.visualCircleOuter
                  }
                />

                <div
                  className={
                    styles.visualCircleMiddle
                  }
                />

                <div
                  className={
                    styles.visualCircleInner
                  }
                />

                <div
                  className={
                    styles.visualCore
                  }
                >
                  <span>
                    {active.number}
                  </span>
                </div>

                <div
                  className={
                    styles.visualOrbit
                  }
                >
                  <span />
                </div>

                <div
                  className={
                    styles.visualLineOne
                  }
                />

                <div
                  className={
                    styles.visualLineTwo
                  }
                />
              </div>
            </div>

            {/* Stage navigation */}

            <div
              className={
                styles.stageNavigation
              }
            >
              <button
                type="button"
                disabled={
                  activeIndex === 0
                }
                onClick={() =>
                  setActiveIndex(
                    (current) =>
                      Math.max(
                        0,
                        current - 1,
                      ),
                  )
                }
              >
                ← Previous
              </button>

              <div
                className={
                  styles.stageCounter
                }
              >
                <span>
                  {activeIndex + 1}
                </span>

                <span>/</span>

                <span>06</span>
              </div>

              <button
                type="button"
                disabled={
                  activeIndex ===
                  JOURNEY.length - 1
                }
                onClick={() =>
                  setActiveIndex(
                    (current) =>
                      Math.min(
                        JOURNEY.length -
                          1,
                        current + 1,
                      ),
                  )
                }
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div className={styles.bottom}>
          <div className={styles.bottomLine} />

          <div
            className={
              styles.bottomContent
            }
          >
            <p>
              We don't just build digital
              products. We connect
              technology to the business
              outcomes that matter.
            </p>

            <Link
              to="/services"
              className={
                styles.bottomLink
              }
            >
              Explore our capabilities
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transformation;
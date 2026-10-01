import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import styles from './About.module.css';

const AboutScene = lazy(
  () => import('../../three/scenes/AboutScene.jsx')
);

/* =========================================================
   RESPONSIVE / MOTION HOOK
========================================================= */

function useMediaQuery(query) {
  const getValue = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getValue);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener(
      'change',
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        handleChange
      );
    };
  }, [query]);

  return matches;
}

/* =========================================================
   COUNT UP
========================================================= */

function useCountUp(
  target,
  duration = 1800,
  enabled = true
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return undefined;
    }

    let animationFrame;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed =
        currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      setValue(
        Math.round(
          target * eased
        )
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(
            animate
          );
      }
    };

    animationFrame =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );
    };
  }, [
    target,
    duration,
    enabled,
  ]);

  return value;
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  target,
  suffix = '',
  label,
  delay = 0,
}) {
  const reducedMotion =
    useMediaQuery(
      '(prefers-reduced-motion: reduce)'
    );

  const [started, setStarted] =
    useState(reducedMotion);

  const value = useCountUp(
    target,
    1800 + delay,
    started
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div className={styles.statItem}>
      <div className={styles.statValue}>
        {value}
        {suffix}
      </div>

      <div className={styles.statLabel}>
        {label}
      </div>
    </div>
  );
}

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({
  number,
  label,
}) {
  return (
    <div className={styles.sectionLabel}>
      {number && (
        <span
          className={
            styles.sectionNumber
          }
        >
          {number}
        </span>
      )}

      <span
        className={
          styles.sectionLabelText
        }
      >
        {label}
      </span>

      <span
        className={
          styles.sectionLabelLine
        }
      />
    </div>
  );
}

/* =========================================================
   ABOUT PAGE
========================================================= */

function About() {
  const isMobile = useMediaQuery(
    '(max-width: 768px)'
  );

  const reducedMotion =
    useMediaQuery(
      '(prefers-reduced-motion: reduce)'
    );

  /* =======================================================
     JOURNEY DATA
  ======================================================= */

  const journey = [
    {
      year: '2021',
      number: '01',
      title: 'Company Foundation',
      description:
        'Riyadvi Software Technologies was founded with a vision focused on delivering technology solutions for businesses.',
    },
    {
      year: '2022',
      number: '02',
      title: 'Market Expansion',
      description:
        'The company expanded its service capabilities, including application development and digital marketing.',
    },
    {
      year: '2023',
      number: '03',
      title: 'International Markets',
      description:
        'Riyadvi expanded into international markets and began working with clients beyond India, including Australia.',
    },
    {
      year: '2024',
      number: '04',
      title: 'Global Recognition',
      description:
        "Riyadvi received the 'Star of Excellence' Award from the National Integrity Cultural Academy.",
    },
  ];

  /* =======================================================
     PRINCIPLES
  ======================================================= */

  const principles = [
    {
      number: '01',
      title: 'Business First',
      description:
        'We start by understanding the business challenge, the people involved and the outcome that matters.',
    },
    {
      number: '02',
      title: 'Purposeful Technology',
      description:
        'We use technology to solve real problems and create meaningful opportunities.',
    },
    {
      number: '03',
      title: 'Human Experiences',
      description:
        'We design user-focused solutions that are simple, intuitive and impactful.',
    },
    {
      number: '04',
      title: 'Built to Evolve',
      description:
        'We build scalable solutions that adapt to new opportunities and future needs.',
    },
  ];

  /* =======================================================
     CAPABILITIES
  ======================================================= */

  const capabilities = [
    {
      number: '01',
      title: 'Software Development',
      description:
        'Web platforms, business applications and scalable digital products.',
    },
    {
      number: '02',
      title: 'Digital Experiences',
      description:
        'User-focused interfaces and experiences designed around real needs.',
    },
    {
      number: '03',
      title: 'Immersive Technology',
      description:
        '3D, AR, VR and interactive experiences for engaging digital environments.',
    },
    {
      number: '04',
      title: 'AI & Intelligent Solutions',
      description:
        'AI-powered applications and intelligent workflows designed for practical use cases.',
    },
  ];

  return (
    <main className={styles.page}>

      {/* =====================================================
          01 — HERO
      ===================================================== */}

      <section
        className={`${styles.hero} ${styles.fullScreenSection}`}
      >
        <div className={styles.heroGrid} />

        <div className={styles.heroContent}>

          <SectionLabel
            label="ABOUT RIYADVI"
          />

          <h1 className={styles.heroTitle}>
            Technology
            <br />
            with a
            <br />
            <span>purpose.</span>
          </h1>

          <p
            className={
              styles.heroDescription
            }
          >
            Riyadvi Software Technologies helps
            businesses turn ideas, challenges and
            opportunities into meaningful digital
            experiences.
          </p>

          {/* =================================================
              CORRECT FINAL NUMBERS
          ================================================= */}

          <div className={styles.statsGrid}>

            <StatCard
              target={700}
              suffix="+"
              label={
                <>
                  Completed
                  <br />
                  Project
                </>
              }
              delay={0}
            />

            <StatCard
              target={300}
              suffix="+"
              label={
                <>
                  Project
                  <br />
                  Progress
                </>
              }
              delay={120}
            />

            <StatCard
              target={1000}
              suffix="+"
              label={
                <>
                  Number Of
                  <br />
                  Clients
                </>
              }
              delay={240}
            />

            <StatCard
              target={100}
              suffix="%"
              label={
                <>
                  Client
                  <br />
                  Satisfaction
                </>
              }
              delay={360}
            />

          </div>
        </div>

        <div className={styles.heroScene}>

          <Suspense
            fallback={
              <div
                className={
                  styles.sceneLoading
                }
              >
                <span />
                <span />
                <span />
              </div>
            }
          >
            <AboutScene
              isMobile={isMobile}
              reducedMotion={
                reducedMotion
              }
            />
          </Suspense>

          <div
            className={
              styles.sceneMeta
            }
          >
            <span>
              REAL-TIME
            </span>

            <span>
              3D EXPERIENCE
            </span>
          </div>

        </div>
      </section>

      {/* =====================================================
          02 — OUR JOURNEY
      ===================================================== */}

      <section
        className={`${styles.journey} ${styles.fullScreenSection}`}
      >
        <div
          className={
            styles.sectionContainer
          }
        >

          <div
            className={
              styles.journeyHeader
            }
          >

            <SectionLabel
              number="02"
              label="OUR JOURNEY"
            />

            <span
              className={
                styles.journeyMeta
              }
            >
              A JOURNEY OF GROWTH,
              INNOVATION AND IMPACT
            </span>

          </div>

          <div
            className={
              styles.journeyTimeline
            }
          >

            <div
              className={
                styles.timelineLine
              }
            />

            {journey.map(
              (item) => (
                <article
                  className={
                    styles.journeyItem
                  }
                  key={item.year}
                >

                  <div
                    className={
                      styles.journeyTop
                    }
                  >

                    <span
                      className={
                        styles.timelineDot
                      }
                    />

                    <span
                      className={
                        styles.journeyYear
                      }
                    >
                      {item.year}
                    </span>

                  </div>

                  <div
                    className={
                      styles.journeyBody
                    }
                  >

                    <span
                      className={
                        styles.journeyNumber
                      }
                    >
                      {item.number}
                    </span>

                    <h2>
                      {item.title}
                    </h2>

                    <p>
                      {item.description}
                    </p>

                  </div>

                </article>
              )
            )}

          </div>
        </div>
      </section>

      {/* =====================================================
          03 — OUR VISION
      ===================================================== */}

      <section
        className={`${styles.vision} ${styles.fullScreenSection}`}
      >

        <div
          className={
            styles.splitSection
          }
        >

          <div
            className={
              styles.splitContent
            }
          >

            <SectionLabel
              label="OUR VISION"
            />

            <h2
              className={
                styles.splitTitle
              }
            >
              Build digital experiences
              <br />
              that create{' '}
              <span>
                lasting value.
              </span>
            </h2>

            <p
              className={
                styles.splitDescription
              }
            >
              To be a global technology
              partner known for innovation,
              quality and meaningful impact.
            </p>

          </div>

          <div
            className={
              styles.waveVisual
            }
          >

            {/* FIXED JSX CLASS NAMES */}

            <div
              className={`${styles.wave} ${styles.waveOne}`}
            />

            <div
              className={`${styles.wave} ${styles.waveTwo}`}
            />

            <div
              className={`${styles.wave} ${styles.waveThree}`}
            />

            <div
              className={`${styles.wave} ${styles.waveFour}`}
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          04 — OUR MISSION
      ===================================================== */}

      <section
        className={`${styles.mission} ${styles.fullScreenSection}`}
      >

        <div
          className={
            styles.splitSection
          }
        >

          <div
            className={
              styles.splitContent
            }
          >

            <SectionLabel
              label="OUR MISSION"
            />

            <h2
              className={
                styles.splitTitle
              }
            >
              Help businesses use
              <br />
              technology to
              <br />
              transform, scale and grow.
            </h2>

            <p
              className={
                styles.splitDescription
              }
            >
              We create practical,
              innovative and people-focused
              technology solutions that solve
              real business problems.
            </p>

          </div>

          <div
            className={
              styles.missionVisual
            }
          >

            {/* FIXED JSX CLASS NAMES */}

            <div
              className={`${styles.missionRing} ${styles.ringOne}`}
            />

            <div
              className={`${styles.missionRing} ${styles.ringTwo}`}
            />

            <div
              className={`${styles.missionRing} ${styles.ringThree}`}
            />

            <div
              className={
                styles.missionGlow
              }
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          05 — WHAT GUIDES US
      ===================================================== */}

      <section
        className={`${styles.principles} ${styles.fullScreenSection}`}
      >

        <div
          className={
            styles.principlesLayout
          }
        >

          {/* LEFT */}

          <div
            className={
              styles.principlesIntro
            }
          >

            <SectionLabel
              number="03"
              label="WHAT GUIDES US"
            />

            <h2
              className={
                styles.principlesTitle
              }
            >
              Principles behind
              <br />
              <span>
                every solution.
              </span>
            </h2>

            <p>
              Our work is built on strong
              values that shape how we think,
              design and deliver technology
              solutions.
            </p>

          </div>

          {/* CENTER */}

          <div
            className={
              styles.principlesVisual
            }
          >

            <div
              className={
                styles.principlesGrid
              }
            />

            <div
              className={
                styles.principleCore
              }
            >

              {/* FIXED JSX CLASS NAMES */}

              <div
                className={`${styles.coreRing} ${styles.coreRingOne}`}
              />

              <div
                className={`${styles.coreRing} ${styles.coreRingTwo}`}
              />

              <div
                className={`${styles.coreRing} ${styles.coreRingThree}`}
              />

              <div
                className={
                  styles.coreCenter
                }
              >
                <span>
                  01
                </span>
              </div>

              <div
                className={`${styles.coreOrbitalDot} ${styles.dotOne}`}
              />

              <div
                className={`${styles.coreOrbitalDot} ${styles.dotTwo}`}
              />

              <div
                className={`${styles.coreOrbitalDot} ${styles.dotThree}`}
              />

            </div>

            <span
              className={
                styles.principlesBrand
              }
            >
              RIYADVI
            </span>

            <span
              className={
                styles.principlesText
              }
            >
              PRINCIPLES
            </span>

          </div>

          {/* RIGHT */}

          <div
            className={
              styles.principlesList
            }
          >

            {principles.map(
              (item) => (
                <article
                  className={
                    styles.principleItem
                  }
                  key={item.number}
                >

                  <div
                    className={
                      styles.principleItemNumber
                    }
                  >
                    {item.number}
                  </div>

                  <div
                    className={
                      styles.principleItemMain
                    }
                  >

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                  </div>

                  <span
                    className={
                      styles.principleArrow
                    }
                  >
                    →
                  </span>

                </article>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          06 — WHAT WE DO
      ===================================================== */}

      <section
        className={`${styles.capabilities} ${styles.fullScreenSection}`}
      >

        <div
          className={
            styles.capabilitiesLayout
          }
        >

          <div
            className={
              styles.capabilitiesSide
            }
          >

            <SectionLabel
              number="04"
              label="WHAT WE DO"
            />

          </div>

          <div
            className={
              styles.capabilitiesMain
            }
          >

            <SectionLabel
              label="OUR CAPABILITIES"
            />

            <h2
              className={
                styles.capabilitiesTitle
              }
            >
              Technology built around
              <br />
              business needs.
            </h2>

            <div
              className={
                styles.capabilityList
              }
            >

              {capabilities.map(
                (item) => (
                  <article
                    className={
                      styles.capabilityItem
                    }
                    key={item.number}
                  >

                    <span
                      className={
                        styles.capabilityNumber
                      }
                    >
                      {item.number}
                    </span>

                    <div>

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.description}
                      </p>

                    </div>

                    <span
                      className={
                        styles.capabilityArrow
                      }
                    >
                      ↗
                    </span>

                  </article>
                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          07 — LET'S BUILD SOMETHING
      ===================================================== */}

      <section
        className={`${styles.cta} ${styles.fullScreenSection}`}
      >

        <div
          className={
            styles.ctaGlow
          }
        />

        <div
          className={
            styles.ctaContent
          }
        >

          <SectionLabel
            label="LET'S BUILD SOMETHING"
          />

          <h2
            className={
              styles.ctaTitle
            }
          >
            Have an idea?
            <br />
            <span>
              Let's talk.
            </span>
          </h2>

          <p
            className={
              styles.ctaDescription
            }
          >
            Tell us about your business
            challenge, digital idea or next
            technology initiative. We'll start
            by understanding what you need.
          </p>

          <Link
            to="/contact"
            className={
              styles.ctaButton
            }
          >

            <span>
              Book a Free Consultation
            </span>

            <span
              className={
                styles.ctaArrow
              }
            >
              →
            </span>

          </Link>

        </div>

      </section>

    </main>
  );
}

export default About;
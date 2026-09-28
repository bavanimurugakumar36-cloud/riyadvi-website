import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import ThreeSceneLoader from '../../components/loaders/ThreeSceneLoader.jsx';

import styles from './About.module.css';

const AboutScene = lazy(() => import('../../three/scenes/AboutScene.jsx'));

const values = [
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
      'We choose technology because it creates value, not simply because it is new or popular.',
  },
  {
    number: '03',
    title: 'Human Experiences',
    description:
      'We design digital experiences around the people who use them, keeping interactions clear and meaningful.',
  },
  {
    number: '04',
    title: 'Built to Evolve',
    description:
      'We create solutions with scalability and future growth in mind so they can evolve alongside the business.',
  },
];

const milestones = [
  {
    year: '2021',
    title: 'Company Foundation',
    description:
      'Riyadvi Software Technologies was founded with a vision focused on delivering technology solutions for businesses.',
  },
  {
    year: '2022',
    title: 'Market Expansion',
    description:
      'The company expanded its service capabilities, including areas such as application development and digital marketing.',
  },
  {
    year: '2023',
    title: 'International Markets',
    description:
      'Riyadvi expanded into international markets and began working with clients beyond India, including Australia.',
  },
  {
    year: '2024',
    title: 'Global Recognition',
    description:
      "Riyadvi received the 'Star of Excellence' Award from the National Integrity Cultural Academy.",
    recognition: true,
  },
];

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

function About() {
  const [activeValue, setActiveValue] = useState(0);

  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(
        '(max-width: 768px)',
      ).matches,
  );

  const [reducedMotion, setReducedMotion] =
    useState(
      () =>
        typeof window !== 'undefined' &&
        window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches,
    );

  const selectorRefs = useRef([]);

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      '(max-width: 768px)',
    );

    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const handleMobileChange = (event) => {
      setIsMobile(event.matches);
    };

    const handleMotionChange = (event) => {
      setReducedMotion(event.matches);
    };

    setIsMobile(mobileQuery.matches);
    setReducedMotion(motionQuery.matches);

    mobileQuery.addEventListener(
      'change',
      handleMobileChange,
    );

    motionQuery.addEventListener(
      'change',
      handleMotionChange,
    );

    return () => {
      mobileQuery.removeEventListener(
        'change',
        handleMobileChange,
      );

      motionQuery.removeEventListener(
        'change',
        handleMotionChange,
      );
    };
  }, []);

  const selectedValue = values[activeValue];

  const handleValueKeyDown = (
    event,
    index,
  ) => {
    let nextIndex = index;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIndex =
          (index + 1) % values.length;
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        nextIndex =
          (index - 1 + values.length) %
          values.length;
        break;

      case 'Home':
        nextIndex = 0;
        break;

      case 'End':
        nextIndex = values.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();

    setActiveValue(nextIndex);

    requestAnimationFrame(() => {
      selectorRefs.current[
        nextIndex
      ]?.focus();
    });
  };

  return (
    <div className={styles.page}>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            ABOUT RIYADVI
          </p>

          <h1>
            Technology with a
            <br />
            <span>purpose.</span>
          </h1>

          <p className={styles.heroDescription}>
            Riyadvi Software Technologies helps
            businesses turn ideas, challenges and
            opportunities into meaningful digital
            experiences.
          </p>
        </div>

        {/* =================================================
            3D HERO EXPERIENCE
        ================================================= */}

        <div className={styles.heroVisual}>
          <div className={styles.scene}>
            <Suspense fallback={<ThreeSceneLoader label="Loading interactive experience" />}><AboutScene isMobile={isMobile} reducedMotion={reducedMotion} /></Suspense>
          </div>

          <div className={styles.visualLabel}>
            SOFTWARE
            <br />
            TECHNOLOGIES
          </div>
        </div>
      </section>

      {/* =====================================================
          STORY
      ===================================================== */}

      <section className={styles.story}>
        <div className={styles.sectionLabel}>
          <span>01</span>

          <p>OUR STORY</p>
        </div>

        <div className={styles.storyContent}>
          <h2>
            We believe technology should solve
            problems, not create them.
          </h2>

          <p>
            Businesses today operate in an
            increasingly digital environment. The
            right technology can simplify operations,
            create better customer experiences and
            open new opportunities for growth.
          </p>

          <p>
            Riyadvi brings together software
            development, digital strategy, design and
            emerging technologies to create solutions
            around real business needs.
          </p>
        </div>
      </section>

      {/* =====================================================
          COMPANY JOURNEY
      ===================================================== */}

      <section className={styles.timelineSection}>
        <div className={styles.timelineHeader}>
          <div className={styles.sectionLabel}>
            <span>02</span>

            <p>OUR JOURNEY</p>
          </div>

          <div className={styles.timelineIntro}>
            <p className={styles.eyebrow}>
              SINCE 2021
            </p>

            <h2>
              From a technology vision
              <br />
              to a growing digital partner.
            </h2>

            <p>
              Riyadvi's journey has evolved through
              new capabilities, wider markets and
              continued focus on creating meaningful
              technology solutions for businesses.
            </p>
          </div>
        </div>

        <div className={styles.timeline}>
          {milestones.map(
            (milestone, index) => (
              <article
                key={milestone.year}
                className={styles.timelineItem}
              >
                <div className={styles.timelineYear}>
                  {milestone.year}
                </div>

                <div
                  className={styles.timelineTrack}
                  aria-hidden="true"
                >
                  <span
                    className={
                      styles.timelineMarker
                    }
                  />
                </div>

                <div
                  className={styles.timelineContent}
                >
                  <p
                    className={
                      styles.timelineIndex
                    }
                  >
                    {String(index + 1).padStart(
                      2,
                      '0',
                    )}
                  </p>

                  <h3>
                    {milestone.title}
                  </h3>

                  <p>
                    {milestone.description}
                  </p>

                  {milestone.recognition && (
                    <span
                      className={
                        styles.recognitionBadge
                      }
                    >
                      GLOBAL RECOGNITION
                    </span>
                  )}
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      {/* =====================================================
          VISION / MISSION
      ===================================================== */}

      <section className={styles.direction}>
        <div className={styles.directionCard}>
          <p className={styles.eyebrow}>
            OUR VISION
          </p>

          <h2>
            Build digital experiences that create
            lasting value.
          </h2>
        </div>

        <div className={styles.directionCard}>
          <p className={styles.eyebrow}>
            OUR MISSION
          </p>

          <h2>
            Help businesses use technology to
            transform, scale and grow.
          </h2>
        </div>
      </section>

      {/* =====================================================
          INTERACTIVE VALUES
      ===================================================== */}

      <section className={styles.values}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>
            WHAT GUIDES US
          </p>

          <h2>
            Principles behind
            <br />
            every solution.
          </h2>
        </div>

        <div className={styles.valuesExperience}>
          {/* -------------------------------------------------
              VALUES VISUAL
          ------------------------------------------------- */}

          <div className={styles.valuesVisual}>
            <div
              className={styles.valuesOrb}
              aria-hidden="true"
            >
              <div
                className={
                  styles.valuesOrbInner
                }
              >
                <span>
                  {selectedValue.number}
                </span>
              </div>
            </div>

            <div className={styles.valuesMeta}>
              <span>RIYADVI</span>
              <span>PRINCIPLES</span>
            </div>
          </div>

          {/* -------------------------------------------------
              VALUES CONTENT
          ------------------------------------------------- */}

          <div className={styles.valuesContent}>
            <div className={styles.valuesHeader}>
              <span>
                {selectedValue.number}
              </span>

              <span>
                {String(activeValue + 1).padStart(
                  2,
                  '0',
                )}
                {' / '}
                {String(values.length).padStart(
                  2,
                  '0',
                )}
              </span>
            </div>

            <div className={styles.valuesCopy}>
              <p className={styles.smallLabel}>
                PRINCIPLE{' '}
                {selectedValue.number}
              </p>

              <h3 key={selectedValue.number}>
                {selectedValue.title}
              </h3>

              <p
                key={`${selectedValue.number}-description`}
              >
                {selectedValue.description}
              </p>
            </div>

            <div
              className={styles.valueSelector}
              role="tablist"
              aria-label="Riyadvi principles"
            >
              {values.map(
                (value, index) => {
                  const isActive =
                    index === activeValue;

                  return (
                    <button
                      key={value.number}
                      ref={(element) => {
                        selectorRefs.current[
                          index
                        ] = element;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={
                        isActive ? 0 : -1
                      }
                      className={`${styles.valueButton} ${
                        isActive
                          ? styles.valueButtonActive
                          : ''
                      }`}
                      onClick={() =>
                        setActiveValue(index)
                      }
                      onKeyDown={(event) =>
                        handleValueKeyDown(
                          event,
                          index,
                        )
                      }
                    >
                      <span>
                        {value.number}
                      </span>

                      <strong>
                        {value.title}
                      </strong>

                      <span
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section className={styles.capabilities}>
        <div className={styles.sectionLabel}>
          <span>03</span>

          <p>WHAT WE DO</p>
        </div>

        <div className={styles.capabilityContent}>
          <div className={styles.capabilityIntro}>
            <p className={styles.eyebrow}>
              OUR CAPABILITIES
            </p>

            <h2>
              Technology built around
              <br />
              business needs.
            </h2>
          </div>

          <div className={styles.capabilityList}>
            {capabilities.map(
              (capability) => (
                <article
                  key={capability.number}
                  className={
                    styles.capabilityItem
                  }
                >
                  <span>
                    {capability.number}
                  </span>

                  <div>
                    <h3>
                      {capability.title}
                    </h3>

                    <p>
                      {capability.description}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className={styles.cta}>
        <p className={styles.eyebrow}>
          LET'S BUILD SOMETHING
        </p>

        <h2>
          Have an idea?
          <br />
          <span>Let's talk.</span>
        </h2>

        <p>
          Tell us about your business challenge,
          digital idea or next technology initiative.
          We'll start by understanding what you need.
        </p>

        <Link
          to="/contact"
          className={styles.ctaButton}
        >
          <span>
            Book a Free Consultation
          </span>

          <span aria-hidden="true">
            ↗
          </span>
        </Link>
      </section>
    </div>
  );
}

export default About;
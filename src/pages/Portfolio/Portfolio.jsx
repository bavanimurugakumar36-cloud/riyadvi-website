import {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import caseStudies from '../../data/caseStudies';
import ThreeSceneLoader from '../../components/loaders/ThreeSceneLoader.jsx';

import styles from './Portfolio.module.css';

const PortfolioScene = lazy(
  () => import('../../three/scenes/PortfolioScene.jsx'),
);

function Portfolio() {
  const [activeProject, setActiveProject] =
    useState(0);

  const [contentVisible, setContentVisible] =
    useState(true);

  const selectedProject =
    caseStudies[activeProject] || caseStudies[0];

  useEffect(() => {
    setContentVisible(false);

    const timer = window.setTimeout(() => {
      setContentVisible(true);
    }, 140);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeProject]);

  const handleProjectSelect = (index) => {
    if (index === activeProject) return;

    setActiveProject(index);
  };

  const scrollToProjects = () => {
    document
      .getElementById('portfolio-projects')
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  };

  return (
    <main className={styles.page}>

      {/* =====================================================
          SECTION 01 — HERO / SELECTED WORK
      ====================================================== */}

      <section
        className={`${styles.heroSection} ${styles.snapSection}`}
        id="portfolio-hero"
      >
        <div className={styles.heroGrid} />

        <div className={styles.heroGlow} />

        <div className={styles.heroOrb} />

        <div className={styles.heroContent}>

          {/* LEFT */}
          <div className={styles.heroCopy}>

            <div className={styles.eyebrow}>
              <span>SELECTED WORK</span>
              <i />
            </div>

            <div className={styles.heroIndex}>
              PROJECT /{' '}
              {selectedProject?.number || '01'}
            </div>

            <h1 className={styles.heroTitle}>
              Digital experiences
              <br />
              built to make an
              <br />
              <span>impact.</span>
            </h1>

            <p className={styles.heroDescription}>
              Explore selected projects where strategy,
              design and technology come together to solve
              real business challenges.
            </p>

            <div className={styles.heroActions}>

              <button
                type="button"
                className={styles.primaryButton}
                onClick={scrollToProjects}
              >
                <span>Explore Projects</span>
                <span className={styles.buttonArrow}>
                  ↗
                </span>
              </button>

              <Link
                to={`/portfolio/${selectedProject?.slug}`}
                className={styles.secondaryButton}
              >
                View Case Study
                <span>↗</span>
              </Link>

            </div>

            <div className={styles.heroMeta}>

              <div>
                <span>01</span>
                <small>STRATEGY</small>
              </div>

              <div>
                <span>02</span>
                <small>DESIGN</small>
              </div>

              <div>
                <span>03</span>
                <small>TECHNOLOGY</small>
              </div>

            </div>

          </div>


          {/* RIGHT — 3D */}
          <div className={styles.heroVisual}>

            <div className={styles.visualHeader}>
              <span>INTERACTIVE</span>

              <span>
                3D EXPERIENCE
              </span>
            </div>

            <div className={styles.sceneFrame}>

              <div className={styles.sceneGrid} />

              <div className={styles.sceneCornerTop}>
                <span />
                <span>RIYADVI / 3D</span>
              </div>

              <div className={styles.sceneCornerBottom}>
                <span>
                  REAL-TIME VISUAL SYSTEM
                </span>

                <span>
                  01 — 03
                </span>
              </div>

              <Suspense
                fallback={
                  <ThreeSceneLoader
                    label="Loading portfolio experience"
                  />
                }
              >
                <PortfolioScene
                  project={selectedProject}
                  activeProject={activeProject}
                />
              </Suspense>

            </div>

            {/* PROJECT SELECTOR */}

            <div className={styles.heroProjectSelector}>

              {caseStudies.map(
                (project, index) => (
                  <button
                    key={project.slug}
                    type="button"
                    className={`${styles.heroProjectButton} ${
                      activeProject === index
                        ? styles.heroProjectButtonActive
                        : ''
                    }`}
                    onClick={() =>
                      handleProjectSelect(index)
                    }
                  >
                    <span>
                      {project.number}
                    </span>

                    <span>
                      {project.title}
                    </span>
                  </button>
                ),
              )}

            </div>

          </div>

        </div>

        <div className={styles.scrollHint}>
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>

      </section>


      {/* =====================================================
          SECTION 02 — EXPLORE PROJECTS
      ====================================================== */}

      <section
        className={`${styles.projectsSection} ${styles.snapSection}`}
        id="portfolio-projects"
      >

        <div className={styles.sectionTopLine} />

        <div className={styles.sectionHeader}>

          <div>

            <div className={styles.eyebrow}>
              <span>OUR WORK</span>
              <i />
            </div>

            <h2 className={styles.sectionTitle}>
              Selected
              <br />
              <span>projects.</span>
            </h2>

          </div>

          <div className={styles.sectionCounter}>
            <strong>
              {String(
                caseStudies.length,
              ).padStart(2, '0')}
            </strong>

            <span>PROJECTS</span>
          </div>

        </div>


        {/* PROJECT CARDS */}

        <div className={styles.projectGrid}>

          {caseStudies.map(
            (project, index) => (
              <article
                key={project.slug}
                className={`${styles.projectCard} ${
                  activeProject === index
                    ? styles.projectCardActive
                    : ''
                }`}
                onMouseEnter={() =>
                  handleProjectSelect(index)
                }
              >

                <Link
                  to={`/portfolio/${project.slug}`}
                  className={styles.projectCardLink}
                >

                  <div className={styles.cardVisual}>

                    <div className={styles.cardTop}>

                      <span>
                        {project.number}
                      </span>

                      <span>
                        {project.category}
                      </span>

                    </div>

                    <div
                      className={`${styles.cardShape} ${
                        styles[`cardShape${index + 1}`]
                      }`}
                    >

                      <div
                        className={
                          styles.cardShapeGlow
                        }
                      />

                      <div
                        className={
                          styles.cardShapeRing
                        }
                      />

                      <div
                        className={
                          styles.cardShapeCore
                        }
                      />

                    </div>

                    <div
                      className={
                        styles.cardView
                      }
                    >
                      <span>
                        View Case Study
                      </span>

                      <span>↗</span>
                    </div>

                  </div>


                  <div className={styles.cardContent}>

                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {project.shortDescription}
                    </p>

                    <div
                      className={
                        styles.cardServices
                      }
                    >
                      {project.services
                        .slice(0, 3)
                        .map((service) => (
                          <span key={service}>
                            {service}
                          </span>
                        ))}
                    </div>

                  </div>

                </Link>

              </article>
            ),
          )}

        </div>

      </section>


      {/* =====================================================
          SECTION 03 — PROJECT FOCUS
      ====================================================== */}

      <section
        className={`${styles.focusSection} ${styles.snapSection}`}
        id="portfolio-focus"
      >

        <div className={styles.focusGlow} />

        <div className={styles.focusHeader}>

          <div className={styles.eyebrow}>
            <span>PROJECT FOCUS</span>
            <i />
          </div>

          <span className={styles.focusNumber}>
            {selectedProject?.number}
          </span>

        </div>


        <div
          className={`${styles.focusContent} ${
            contentVisible
              ? styles.focusVisible
              : styles.focusHidden
          }`}
        >

          {/* LEFT */}

          <div className={styles.focusIntro}>

            <span className={styles.focusCategory}>
              {selectedProject?.category}
            </span>

            <h2>
              {selectedProject?.title}
            </h2>

            <p>
              {selectedProject?.heroDescription}
            </p>

            <Link
              to={`/portfolio/${selectedProject?.slug}`}
              className={styles.focusButton}
            >
              <span>
                Explore Full Case Study
              </span>

              <span>↗</span>
            </Link>

          </div>


          {/* RIGHT */}

          <div className={styles.focusDetails}>

            <div className={styles.detailBlock}>

              <span className={styles.detailLabel}>
                THE CHALLENGE
              </span>

              <p>
                {selectedProject?.challenge}
              </p>

            </div>

            <div className={styles.detailBlock}>

              <span className={styles.detailLabel}>
                THE SOLUTION
              </span>

              <p>
                {selectedProject?.solution}
              </p>

            </div>

          </div>

        </div>


        {/* DETAILS ROW */}

        <div className={styles.detailGrid}>

          <div className={styles.detailColumn}>

            <span className={styles.detailLabel}>
              SERVICES
            </span>

            <div className={styles.detailTags}>

              {selectedProject?.services?.map(
                (service) => (
                  <span key={service}>
                    {service}
                  </span>
                ),
              )}

            </div>

          </div>


          <div className={styles.detailColumn}>

            <span className={styles.detailLabel}>
              TECHNOLOGY
            </span>

            <div className={styles.detailTags}>

              {selectedProject?.technologies?.map(
                (technology) => (
                  <span key={technology}>
                    {technology}
                  </span>
                ),
              )}

            </div>

          </div>


          <div className={styles.detailColumn}>

            <span className={styles.detailLabel}>
              PROCESS
            </span>

            <div className={styles.processList}>

              {selectedProject?.process?.map(
                (step, index) => (
                  <div key={step}>

                    <span>
                      {String(
                        index + 1,
                      ).padStart(2, '0')}
                    </span>

                    <strong>
                      {step}
                    </strong>

                  </div>
                ),
              )}

            </div>

          </div>

        </div>


        {/* PROJECT SWITCHER */}

        <div className={styles.focusSwitcher}>

          {caseStudies.map(
            (project, index) => (
              <button
                key={project.slug}
                type="button"
                className={
                  activeProject === index
                    ? styles.focusSwitcherActive
                    : ''
                }
                onClick={() =>
                  handleProjectSelect(index)
                }
              >
                <span>
                  {project.number}
                </span>

                <span>
                  {project.title}
                </span>

                <span>→</span>
              </button>
            ),
          )}

        </div>

      </section>


      {/* =====================================================
          SECTION 04 — CTA
      ====================================================== */}

      <section
        className={`${styles.ctaSection} ${styles.snapSection}`}
      >

        <div className={styles.ctaGrid} />

        <div className={styles.ctaGlow} />

        <div className={styles.ctaContent}>

          <div className={styles.eyebrow}>
            <span>HAVE A PROJECT IN MIND?</span>
            <i />
          </div>

          <h2>
            Let's create
            <br />
            something
            <br />
            <span>remarkable.</span>
          </h2>

          <p>
            Tell us about your business challenge
            and let's explore what technology can
            do for you.
          </p>

          <Link
            to="/contact"
            className={styles.ctaButton}
          >
            <span>
              Start a Conversation
            </span>

            <span>↗</span>
          </Link>

        </div>


        <div className={styles.ctaFooter}>

          <span>
            RIYADVI SOFTWARE TECHNOLOGIES
          </span>

          <span>
            DIGITAL EXPERIENCES / 2026
          </span>

        </div>

      </section>

    </main>
  );
}

export default Portfolio;
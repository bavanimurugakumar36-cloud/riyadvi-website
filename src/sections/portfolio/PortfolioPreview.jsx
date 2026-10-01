import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import caseStudies from '../../data/caseStudies';

import styles from './PortfolioPreview.module.css';

gsap.registerPlugin(ScrollTrigger);

function PortfolioPreview() {
  const [activeProject, setActiveProject] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const projectRef = useRef(null);
  const visualRef = useRef(null);
  const visualCoreRef = useRef(null);
  const contentRef = useRef(null);
  const bottomRef = useRef(null);

  const selectedProject = caseStudies[activeProject];

  const selectedNumber = String(
    selectedProject?.number ?? activeProject + 1,
  ).padStart(2, '0');

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      const elements = [
        headerRef.current,
        projectRef.current,
        bottomRef.current,
      ].filter(Boolean);

      gsap.set(elements, {
        opacity: 0,
        y: 35,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      });

      timeline
        .to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
        })
        .to(
          projectRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.35',
        )
        .to(
          bottomRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
          },
          '-=0.4',
        );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  /* ============================================================
     DESKTOP 3D TILT
  ============================================================ */

  useEffect(() => {
    const visual = visualRef.current;
    const core = visualCoreRef.current;

    if (!visual || !core) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const coarsePointer = window.matchMedia(
      '(pointer: coarse)',
    ).matches;

    if (reducedMotion || coarsePointer) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      const bounds = visual.getBoundingClientRect();

      if (!bounds.width || !bounds.height) {
        return;
      }

      const x =
        (event.clientX - bounds.left) / bounds.width - 0.5;

      const y =
        (event.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(visual, {
        rotateX: -y * 5,
        rotateY: x * 7,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: true,
      });

      gsap.to(core, {
        x: x * 12,
        y: y * 12,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(visual, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: true,
      });

      gsap.to(core, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    visual.addEventListener('mousemove', handleMouseMove);
    visual.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      visual.removeEventListener(
        'mousemove',
        handleMouseMove,
      );

      visual.removeEventListener(
        'mouseleave',
        handleMouseLeave,
      );
    };
  }, []);

  /* ============================================================
     PROJECT CHANGE
  ============================================================ */

  useEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      return undefined;
    }

    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 12,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      },
    );

    return undefined;
  }, [activeProject]);

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="portfolio-preview-title"
    >
      <div className={styles.container}>
        {/* ======================================================
            HEADER
        ====================================================== */}

        <header
          ref={headerRef}
          className={styles.header}
        >
          <div className={styles.headerTop}>
            <div className={styles.label}>
              <span className={styles.labelLine} />
              <span>SELECTED WORK</span>
            </div>

            <span className={styles.headerCount}>
              {String(caseStudies.length).padStart(2, '0')} CASE STUDIES
            </span>
          </div>

          <div className={styles.headerGrid}>
            <h2
              id="portfolio-preview-title"
              className={styles.title}
            >
              Work that turns
              <span>ideas into experiences.</span>
            </h2>

            <div className={styles.headerRight}>
              <p>
                A selection of digital experiences,
                platforms and immersive solutions
                developed around specific business goals.
              </p>

              <Link
                to="/portfolio"
                className={styles.viewAll}
              >
                <span>View all work</span>

                <span
                  className={styles.arrow}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* ======================================================
            FEATURED PROJECT
        ====================================================== */}

        <div
          ref={projectRef}
          className={styles.project}
        >
          {/* ----------------------------------------------------
              PROJECT HEADER
          ---------------------------------------------------- */}

          <div className={styles.projectHeader}>
            <div className={styles.projectIdentity}>
              <span className={styles.projectNumber}>
                {selectedNumber}
              </span>

              <span className={styles.projectCategory}>
                {selectedProject?.category ||
                  selectedProject?.industry ||
                  'CASE STUDY'}
              </span>
            </div>

            <span className={styles.projectStatus}>
              RIYADVI / FEATURED PROJECT
            </span>
          </div>

          {/* ----------------------------------------------------
              MAIN PROJECT AREA
          ---------------------------------------------------- */}

          <div className={styles.projectBody}>
            {/* ================================================
                INFORMATION
            ================================================= */}

            <div
              ref={contentRef}
              className={styles.projectInfo}
            >
              <span className={styles.projectLabel}>
                FEATURED CASE STUDY
              </span>

              <h3>
                {selectedProject?.title}
              </h3>

              <p>
                {selectedProject?.shortDescription ||
                  selectedProject?.description ||
                  'Explore this Riyadvi case study and discover how strategy, technology and design come together to create meaningful digital experiences.'}
              </p>

              <div className={styles.projectMeta}>
                <span>BUSINESS FOCUS</span>

                <div className={styles.metaLine} />

                <strong>
                  Digital experience
                </strong>
              </div>

              {selectedProject?.slug && (
                <Link
                  to={`/portfolio/${selectedProject.slug}`}
                  className={styles.caseStudyLink}
                >
                  <span>View case study</span>

                  <span
                    className={styles.caseStudyArrow}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              )}
            </div>

            {/* ================================================
                PROJECT VISUAL
            ================================================= */}

            <div
              ref={visualRef}
              className={styles.projectVisual}
            >
              <div
                className={styles.visualGrid}
                aria-hidden="true"
              />

              <div
                className={styles.visualGlow}
                aria-hidden="true"
              />

              <div
                className={styles.visualFrame}
                aria-hidden="true"
              />

              <div
                className={styles.visualCircleLarge}
                aria-hidden="true"
              />

              <div
                className={styles.visualCircleSmall}
                aria-hidden="true"
              />

              <div
                ref={visualCoreRef}
                key={selectedProject?.slug}
                className={styles.visualCore}
                aria-hidden="true"
              >
                <span>{selectedNumber}</span>
              </div>

              <div
                className={styles.visualCornerTop}
                aria-hidden="true"
              >
                <span>PROJECT</span>
                <span>0{activeProject + 1}</span>
              </div>

              <div
                className={styles.visualCornerBottom}
                aria-hidden="true"
              >
                <span>RIYADVI</span>
                <span>CASE STUDY</span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------
              PROJECT NAVIGATION
          ---------------------------------------------------- */}

          <div className={styles.projectNavigation}>
            <div className={styles.navigationHeading}>
              <span>EXPLORE WORK</span>
              <span>SELECT A PROJECT</span>
            </div>

            <div className={styles.navigationItems}>
              {caseStudies.map((project, index) => {
                const isActive =
                  index === activeProject;

                const projectNumber = String(
                  project.number ?? index + 1,
                ).padStart(2, '0');

                return (
                  <button
                    key={project.slug}
                    type="button"
                    className={`${styles.projectButton} ${
                      isActive
                        ? styles.projectButtonActive
                        : ''
                    }`}
                    onClick={() =>
                      setActiveProject(index)
                    }
                    aria-pressed={isActive}
                  >
                    <span className={styles.buttonNumber}>
                      {projectNumber}
                    </span>

                    <span className={styles.buttonName}>
                      {project.title}
                    </span>

                    <span
                      className={styles.buttonArrow}
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </button>
                );
              })}
            </div>

            <div className={styles.progressRow}>
              <span>
                {String(activeProject + 1).padStart(2, '0')}
              </span>

              <div className={styles.progress}>
                <span
                  style={{
                    width: `${
                      ((activeProject + 1) /
                        caseStudies.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              <span>
                {String(caseStudies.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================
            BOTTOM STATEMENT
        ====================================================== */}

        <div
          ref={bottomRef}
          className={styles.bottomStatement}
        >
          <span className={styles.bottomNumber}>
            04
          </span>

          <p>
            Every project begins with a business
            challenge and ends with an experience
            designed to create meaningful value.
          </p>

          <Link
            to="/portfolio"
            className={styles.bottomLink}
          >
            Explore portfolio
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PortfolioPreview;
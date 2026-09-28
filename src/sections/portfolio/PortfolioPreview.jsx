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
  const experienceRef = useRef(null);
  const bottomRef = useRef(null);
  const visualRef = useRef(null);
  const visualCoreRef = useRef(null);
  const projectContentRef = useRef(null);

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
        experienceRef.current,
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
          duration: 0.8,
          ease: 'power3.out',
        })
        .to(
          experienceRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.45',
        )
        .to(
          bottomRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.45',
        );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  /* ============================================================
     MOUSE 3D INTERACTION
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

      const x =
        (event.clientX - bounds.left) / bounds.width - 0.5;

      const y =
        (event.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(visual, {
        rotateX: -y * 7,
        rotateY: x * 9,
        transformPerspective: 900,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: true,
      });

      gsap.to(core, {
        x: x * 16,
        y: y * 16,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(visual, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: true,
      });

      gsap.to(core, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    visual.addEventListener(
      'mousemove',
      handleMouseMove,
    );

    visual.addEventListener(
      'mouseleave',
      handleMouseLeave,
    );

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
     PROJECT CHANGE ANIMATION
  ============================================================ */

  useEffect(() => {
    const content = projectContentRef.current;

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
        x: 20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.45,
        ease: 'power3.out',
      },
    );

    return undefined;
  }, [activeProject]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="portfolio-preview-title"
    >
      <div className={styles.container}>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          ref={headerRef}
          className={styles.header}
        >
          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span>SELECTED WORK</span>
          </div>

          <div className={styles.headerGrid}>
            <h2
              id="portfolio-preview-title"
              className={styles.title}
            >
              Work that turns
              <br />
              ideas into experiences.
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
        </div>

        {/* =====================================================
            PROJECT EXPERIENCE
        ===================================================== */}

        <div
          ref={experienceRef}
          className={styles.projectExperience}
        >

          {/* ===================================================
              PROJECT NAVIGATION
          =================================================== */}

          <div className={styles.projectNavigation}>
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
                  <span className={styles.projectNumber}>
                    {projectNumber}
                  </span>

                  <span className={styles.projectName}>
                    {project.title}
                  </span>

                  <span
                    className={styles.projectArrow}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* ===================================================
              PROJECT VISUAL
          =================================================== */}

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
              className={styles.visualScan}
              aria-hidden="true"
            />

            <div
              key={`large-${selectedProject?.slug}`}
              className={`${styles.visualCircleLarge} ${styles.projectSwitch}`}
              aria-hidden="true"
            />

            <div
              key={`small-${selectedProject?.slug}`}
              className={`${styles.visualCircleSmall} ${styles.projectSwitch}`}
              aria-hidden="true"
            />

            <div
              ref={visualCoreRef}
              key={selectedProject?.slug}
              className={`${styles.visualCore} ${styles.coreProjectChange}`}
              aria-hidden="true"
            >
              <span>{selectedNumber}</span>
            </div>

            <div className={styles.visualMeta}>
              <span>RIYADVI / CASE STUDY</span>

              <span>
                {String(activeProject + 1).padStart(
                  2,
                  '0',
                )}
                {' / '}
                {String(caseStudies.length).padStart(
                  2,
                  '0',
                )}
              </span>
            </div>
          </div>

          {/* ===================================================
              PROJECT INFORMATION
          =================================================== */}

          <div
            ref={projectContentRef}
            className={styles.projectContent}
          >
            <div className={styles.contentTop}>
              <span>{selectedNumber}</span>

              <span>
                {selectedProject?.category ||
                  selectedProject?.industry ||
                  'CASE STUDY'}
              </span>
            </div>

            <div className={styles.contentMain}>
              <h3>
                {selectedProject?.title}
              </h3>

              <p>
                {selectedProject?.shortDescription ||
                  selectedProject?.description ||
                  'Explore this Riyadvi case study and discover how technology, design and strategy come together to create meaningful digital experiences.'}
              </p>

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

            {/* =================================================
                PROJECT FOOTER
            ================================================= */}

            <div className={styles.projectFooter}>
              <span className={styles.footerLabel}>
                SELECTED PROJECT
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

              <span className={styles.footerCount}>
                {String(caseStudies.length).padStart(
                  2,
                  '0',
                )}
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div
          ref={bottomRef}
          className={styles.bottomStatement}
        >
          <span>04</span>

          <p>
            Every project begins with a business
            challenge and ends with an experience
            designed to create meaningful value.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PortfolioPreview;
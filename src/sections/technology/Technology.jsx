import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Technology.module.css';

gsap.registerPlugin(ScrollTrigger);

const technologyGroups = [
  {
    id: 'web',
    number: '01',
    label: 'WEB & SOFTWARE',
    title: 'Digital products built for real-world use.',
    description:
      'Modern web technologies help us create responsive, scalable and maintainable digital products around business requirements.',
    technologies: [
      'React',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
    ],
  },
  {
    id: 'immersive',
    number: '02',
    label: '3D & IMMERSIVE',
    title: 'Digital experiences with depth.',
    description:
      'Interactive 3D technologies allow digital experiences to move beyond conventional interfaces and communicate ideas visually.',
    technologies: [
      'Three.js',
      'React Three Fiber',
      'Drei',
      'GSAP',
      'GLTF / GLB',
    ],
  },
  {
    id: 'ai',
    number: '03',
    label: 'AI & INTELLIGENCE',
    title: 'Intelligence connected to useful experiences.',
    description:
      'AI-assisted experiences can connect information, automation and intelligent interfaces to solve specific business problems.',
    technologies: [
      'AI Applications',
      'RAG',
      'Vector Search',
      'Embeddings',
      'LLM Integration',
    ],
  },
  {
    id: 'data',
    number: '04',
    label: 'DATA & BACKEND',
    title: 'Reliable systems behind every experience.',
    description:
      'Backend services and structured data systems provide the foundation required for secure, connected and scalable applications.',
    technologies: [
      'REST APIs',
      'Node.js',
      'Express',
      'MongoDB',
      'Authentication',
    ],
  },
];

function Technology() {
  const [activeTechnology, setActiveTechnology] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const explorerRef = useRef(null);
  const footerRef = useRef(null);
  const visualRef = useRef(null);
  const visualCoreRef = useRef(null);

  const selectedTechnology =
    technologyGroups[activeTechnology];

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const explorer = explorerRef.current;
    const footer = footerRef.current;

    if (!section || !header || !explorer || !footer) {
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(
        [header, explorer, footer],
        {
          opacity: 0,
          y: 35,
        },
      );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      });

      timeline
        .to(header, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .to(
          explorer,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.5',
        )
        .to(
          footer,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.5',
        );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

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
        rotateX: -y * 8,
        rotateY: x * 10,
        transformPerspective: 900,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: true,
      });

      gsap.to(core, {
        x: x * 14,
        y: y * 14,
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

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="technology-title"
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
            <span>TECHNOLOGY</span>
          </div>

          <div className={styles.headerGrid}>
            <h2
              id="technology-title"
              className={styles.title}
            >
              The technology
              <br />
              behind the experience.
            </h2>

            <div className={styles.headerCopy}>
              <p>
                We combine modern development,
                immersive technologies and intelligent
                systems to create purposeful digital
                experiences.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            TECHNOLOGY EXPLORER
        ===================================================== */}

        <div
          ref={explorerRef}
          className={styles.explorer}
        >

          {/* -------------------------------------------------
              NAVIGATION
          ------------------------------------------------- */}

          <div className={styles.navigation}>
            <div className={styles.navigationHeader}>
              <span>CAPABILITY</span>
              <span>04</span>
            </div>

            <div className={styles.navigationList}>
              {technologyGroups.map(
                (technology, index) => {
                  const isActive =
                    activeTechnology === index;

                  return (
                    <button
                      key={technology.id}
                      type="button"
                      className={`${styles.navigationItem} ${
                        isActive
                          ? styles.navigationItemActive
                          : ''
                      }`}
                      onClick={() =>
                        setActiveTechnology(index)
                      }
                      aria-pressed={isActive}
                    >
                      <span
                        className={
                          styles.navigationNumber
                        }
                      >
                        {technology.number}
                      </span>

                      <span
                        className={
                          styles.navigationLabel
                        }
                      >
                        {technology.label}
                      </span>

                      <span
                        className={
                          styles.navigationArrow
                        }
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

          {/* -------------------------------------------------
              VISUAL
          ------------------------------------------------- */}

          <div
            ref={visualRef}
            className={styles.visual}
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
              className={styles.scanLine}
              aria-hidden="true"
            />

            <div
              className={`${styles.orbit} ${styles.orbitOne}`}
              aria-hidden="true"
            />

            <div
              className={`${styles.orbit} ${styles.orbitTwo}`}
              aria-hidden="true"
            />

            <div
              className={`${styles.orbit} ${styles.orbitThree}`}
              aria-hidden="true"
            />

            <div
              ref={visualCoreRef}
              className={styles.visualCore}
              aria-hidden="true"
            >
              <span>
                {selectedTechnology.number}
              </span>
            </div>

            <div
              className={styles.visualCorner}
            >
              <span>RIYADVI SYSTEM</span>
              <span>ACTIVE</span>
            </div>
          </div>

          {/* -------------------------------------------------
              CONTENT
          ------------------------------------------------- */}

          <div className={styles.content}>
            <div className={styles.contentTop}>
              <span>
                {selectedTechnology.number}
              </span>

              <span>
                {selectedTechnology.label}
              </span>
            </div>

            <div
              key={selectedTechnology.id}
              className={styles.contentMain}
            >
              <h3>
                {selectedTechnology.title}
              </h3>

              <p>
                {selectedTechnology.description}
              </p>
            </div>

            <div className={styles.technologyList}>
              <span className={styles.listLabel}>
                TECHNOLOGIES
              </span>

              <div className={styles.tags}>
                {selectedTechnology.technologies.map(
                  (technology) => (
                    <span
                      key={technology}
                      className={styles.tag}
                    >
                      {technology}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FOOTER STATEMENT
        ===================================================== */}

        <div
          ref={footerRef}
          className={styles.footer}
        >
          <div className={styles.footerIndex}>
            03
          </div>

          <p>
            Technology is a means to an outcome. We
            select and combine tools according to the
            experience and business requirement being
            built.
          </p>

          <Link
            to="/services"
            className={styles.footerLink}
          >
            <span>Explore our capabilities</span>

            <span
              className={styles.footerArrow}
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

export default Technology;
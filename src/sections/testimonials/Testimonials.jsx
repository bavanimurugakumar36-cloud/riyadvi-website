import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Testimonials.module.css';

gsap.registerPlugin(ScrollTrigger);

const perspectives = [
  {
    number: '01',
    category: 'STRATEGY',
    title: 'Start with the business problem.',
    quote:
      'Strong digital products begin by understanding the business challenge, the people using the solution and the outcome the organization needs to achieve.',
    focus: 'Business goals',
  },
  {
    number: '02',
    category: 'EXPERIENCE',
    title: 'Make technology feel intuitive.',
    quote:
      'The best technology becomes part of the experience rather than getting in the way. Clear interfaces and purposeful interactions make complex products easier to use.',
    focus: 'Human experience',
  },
  {
    number: '03',
    category: 'GROWTH',
    title: 'Build for what comes next.',
    quote:
      'A digital solution should not stop at launch. Scalable architecture and thoughtful product decisions create a foundation that can evolve with the business.',
    focus: 'Long-term growth',
  },
];

function Testimonials() {
  const [activePerspective, setActivePerspective] = useState(0);

  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);
  const experienceRef = useRef(null);
  const visualRef = useRef(null);
  const coreRef = useRef(null);
  const bottomRef = useRef(null);

  const selectedPerspective =
    perspectives[activePerspective];

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

    const ctx = gsap.context(() => {
      const revealElements = [
        labelRef.current,
        titleRef.current,
        copyRef.current,
        experienceRef.current,
        bottomRef.current,
      ].filter(Boolean);

      gsap.set(revealElements, {
        opacity: 0,
        y: 35,
      });

      gsap.to(revealElements, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.fromTo(
        visualRef.current,
        {
          opacity: 0,
          scale: 0.96,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: experienceRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMouseMove = (event) => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion || !visualRef.current) {
      return;
    }

    const bounds =
      visualRef.current.getBoundingClientRect();

    const relativeX =
      (event.clientX - bounds.left) / bounds.width;

    const relativeY =
      (event.clientY - bounds.top) / bounds.height;

    const rotateY =
      (relativeX - 0.5) * 5;

    const rotateX =
      (relativeY - 0.5) * -5;

    gsap.to(visualRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      transformOrigin: 'center center',
      duration: 0.55,
      ease: 'power3.out',
      overwrite: true,
    });

    if (coreRef.current) {
      gsap.to(coreRef.current, {
        x: (relativeX - 0.5) * 14,
        y: (relativeY - 0.5) * 14,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: true,
      });
    }
  };

  const handleMouseLeave = () => {
    if (visualRef.current) {
      gsap.to(visualRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: true,
      });
    }

    if (coreRef.current) {
      gsap.to(coreRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: true,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.container}>
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className={styles.header}>
          <div
            ref={labelRef}
            className={styles.label}
          >
            <span className={styles.labelLine} />
            <span>CLIENT PERSPECTIVES</span>
          </div>

          <div className={styles.headerGrid}>
            <h2
              ref={titleRef}
              id="testimonials-title"
              className={styles.title}
            >
              Technology should
              <br />
              create <span>momentum.</span>
            </h2>

            <div
              ref={copyRef}
              className={styles.headerCopy}
            >
              <p>
                We approach every engagement around
                business outcomes, meaningful experiences
                and technology that can grow with the
                organization.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN EXPERIENCE
        ===================================================== */}

        <div
          ref={experienceRef}
          className={styles.experience}
        >
          {/* -------------------------------------------------
              LEFT NAVIGATION
          ------------------------------------------------- */}

          <div className={styles.navigation}>
            <div className={styles.navigationHeader}>
              <span>PERSPECTIVES</span>

              <span>
                {String(perspectives.length).padStart(
                  2,
                  '0',
                )}
              </span>
            </div>

            <div className={styles.navigationItems}>
              {perspectives.map(
                (perspective, index) => {
                  const isActive =
                    index === activePerspective;

                  return (
                    <button
                      key={perspective.number}
                      type="button"
                      className={`${styles.navigationItem} ${
                        isActive
                          ? styles.navigationItemActive
                          : ''
                      }`}
                      onClick={() =>
                        setActivePerspective(index)
                      }
                      aria-pressed={isActive}
                    >
                      <span
                        className={
                          styles.navigationNumber
                        }
                      >
                        {perspective.number}
                      </span>

                      <span
                        className={
                          styles.navigationTitle
                        }
                      >
                        {perspective.category}
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
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={styles.visualGrid}
              aria-hidden="true"
            />

            <div
              className={styles.circleOuter}
              aria-hidden="true"
            />

            <div
              className={styles.circleMiddle}
              aria-hidden="true"
            />

            <div
              className={styles.circleInner}
              aria-hidden="true"
            />

            <div
              ref={coreRef}
              className={styles.visualCore}
            >
              <span>
                {selectedPerspective.number}
              </span>
            </div>

            <div className={styles.visualCaption}>
              <span>BUSINESS</span>
              <span>EXPERIENCE</span>
              <span>GROWTH</span>
            </div>
          </div>

          {/* -------------------------------------------------
              CONTENT
          ------------------------------------------------- */}

          <div className={styles.content}>
            <div className={styles.contentTop}>
              <span>
                {selectedPerspective.number}
              </span>

              <span>
                {selectedPerspective.category}
              </span>
            </div>

            <div className={styles.quoteArea}>
              <span className={styles.quoteMark}>
                “
              </span>

              <h3 key={selectedPerspective.number}>
                {selectedPerspective.title}
              </h3>

              <p
                key={`${selectedPerspective.number}-quote`}
              >
                {selectedPerspective.quote}
              </p>

              <div className={styles.focus}>
                <span>FOCUS</span>

                <strong>
                  {selectedPerspective.focus}
                </strong>
              </div>
            </div>

            <div className={styles.contentFooter}>
              <span>
                {String(activePerspective + 1).padStart(
                  2,
                  '0',
                )}
              </span>

              <div className={styles.progress}>
                <span
                  style={{
                    width: `${
                      ((activePerspective + 1) /
                        perspectives.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              <span>
                {String(perspectives.length).padStart(
                  2,
                  '0',
                )}
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <div
          ref={bottomRef}
          className={styles.bottom}
        >
          <div className={styles.bottomNumber}>
            05
          </div>

          <div className={styles.bottomContent}>
            <span>BUILD SOMETHING MEANINGFUL</span>

            <p>
              Have a business challenge or digital idea?
              Let's explore what technology can make
              possible.
            </p>
          </div>

          <Link
            to="/contact"
            className={styles.cta}
          >
            <span>Start a conversation</span>

            <span
              className={styles.ctaArrow}
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

export default Testimonials;
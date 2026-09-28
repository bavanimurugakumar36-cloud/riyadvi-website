import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Transformation.module.css';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: '01',
    title: 'Challenge',
    shortTitle: 'Understand',
    description:
      'We begin by understanding your business challenges, customer needs and opportunities for digital growth.',
  },
  {
    number: '02',
    title: 'Strategy',
    shortTitle: 'Define',
    description:
      'We define a clear technology and digital strategy aligned with your business objectives.',
  },
  {
    number: '03',
    title: 'Design',
    shortTitle: 'Shape',
    description:
      'We transform the strategy into intuitive digital experiences designed around real users.',
  },
  {
    number: '04',
    title: 'Technology',
    shortTitle: 'Build',
    description:
      'We engineer scalable software solutions using modern technologies and robust architecture.',
  },
  {
    number: '05',
    title: 'Launch',
    shortTitle: 'Deliver',
    description:
      'We bring the solution to life, test it thoroughly and prepare it for a reliable production launch.',
  },
  {
    number: '06',
    title: 'Growth',
    shortTitle: 'Evolve',
    description:
      'We continuously optimize the digital experience so your technology can evolve with your business.',
  },
];

function Transformation() {
  const sectionRef = useRef(null);
  const stageRefs = useRef([]);
  const progressRef = useRef(null);
  const introRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stagesElements = stageRefs.current.filter(Boolean);
    const progress = progressRef.current;
    const intro = introRef.current;

    if (
      !section ||
      !stagesElements.length ||
      !progress ||
      !intro
    ) {
      return undefined;
    }

    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      );

      const isMobile = window.matchMedia(
        '(max-width: 900px)',
      );

      if (reducedMotion.matches) {
        gsap.set(
          [
            intro,
            ...stagesElements,
          ],
          {
            opacity: 1,
            y: 0,
          },
        );

        gsap.set(progress, {
          scaleX: 1,
        });

        return;
      }

      /*
       * -----------------------------------------------------
       * INTRO REVEAL
       * -----------------------------------------------------
       */

      gsap.set(intro, {
        opacity: 0,
        y: 35,
      });

      gsap.to(intro, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: intro,
          start: 'top 82%',
          once: true,
        },
      });

      /*
       * -----------------------------------------------------
       * MOBILE / TABLET
       * -----------------------------------------------------
       *
       * Keep the experience simple on smaller screens.
       * The section remains normal document flow.
       */

      if (isMobile.matches) {
        gsap.set(stagesElements, {
          opacity: 0,
          y: 25,
        });

        stagesElements.forEach((stage) => {
          gsap.to(stage, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stage,
              start: 'top 86%',
              once: true,
            },
          });
        });

        return;
      }

      /*
       * -----------------------------------------------------
       * DESKTOP PROCESS REVEAL
       * -----------------------------------------------------
       */

      gsap.set(stagesElements, {
        opacity: 0.35,
        y: 28,
      });

      /*
       * First stage starts active.
       */

      gsap.set(stagesElements[0], {
        opacity: 1,
        y: 0,
      });

      /*
       * -----------------------------------------------------
       * PROGRESS LINE
       * -----------------------------------------------------
       *
       * No pinning.
       * The line simply responds to normal page scrolling.
       */

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: 'left center',
      });

      gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: progress.parentElement,
          start: 'top 82%',
          end: 'bottom 72%',
          scrub: 0.7,
        },
      });

      /*
       * -----------------------------------------------------
       * STAGE REVEALS
       * -----------------------------------------------------
       */

      stagesElements.forEach((stage, index) => {
        if (index === 0) {
          return;
        }

        gsap.to(stage, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stage,
            start: 'top 84%',
            end: 'top 62%',
            scrub: 0.65,
          },
        });
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="transformation-title"
    >
      <div className={styles.container}>

        {/* =================================================
            SECTION INTRO
        ================================================= */}

        <div
          ref={introRef}
          className={styles.intro}
        >
          <div className={styles.introLabel}>
            <span className={styles.introNumber}>
              01
            </span>

            <span className={styles.introLine} />

            <p className={styles.eyebrow}>
              DIGITAL TRANSFORMATION
            </p>
          </div>

          <div className={styles.introGrid}>
            <h2
              id="transformation-title"
              className={styles.title}
            >
              From challenge to growth,
              <span> we build the journey.</span>
            </h2>

            <div className={styles.introAside}>
              <p className={styles.description}>
                Every successful digital product begins with
                understanding the problem and ends with creating
                measurable business value.
              </p>

              <div className={styles.introRule} />

              <p className={styles.asideNote}>
                A practical process.
                <br />
                Built around your business.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            PROCESS
        ================================================= */}

        <div className={styles.process}>

          {/* Desktop progress */}
          <div className={styles.progressHeader}>
            <span>OUR APPROACH</span>

            <span>01 — 06</span>
          </div>

          <div className={styles.progressBar}>
            <span className={styles.progressTrack} />

            <span
              ref={progressRef}
              className={styles.progressFill}
            />
          </div>

          {/* =================================================
              STAGES
          ================================================= */}

          <div className={styles.stageList}>
            {stages.map((stage, index) => (
              <article
                key={stage.number}
                ref={(element) => {
                  stageRefs.current[index] = element;
                }}
                className={styles.stage}
              >
                <div className={styles.stageIndex}>
                  <span className={styles.stageNumber}>
                    {stage.number}
                  </span>

                  <span className={styles.stageConnector} />
                </div>

                <div className={styles.stageMain}>
                  <div className={styles.stageHeading}>
                    <span className={styles.stageKicker}>
                      {stage.shortTitle}
                    </span>

                    <h3 className={styles.stageTitle}>
                      {stage.title}
                    </h3>
                  </div>

                  <p className={styles.stageDescription}>
                    {stage.description}
                  </p>
                </div>

                <div className={styles.stageAction}>
                  <span className={styles.stageActionText}>
                    {stage.number}
                  </span>

                  <span
                    className={styles.stageArrow}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div className={styles.bottomStatement}>
          <span className={styles.bottomLine} />

          <p>
            Technology is the tool.
            <strong>
              Business impact is the goal.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Transformation;
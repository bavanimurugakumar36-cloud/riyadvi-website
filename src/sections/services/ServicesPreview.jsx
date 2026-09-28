import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import services from '../../data/services';

import styles from './ServicesPreview.module.css';

gsap.registerPlugin(ScrollTrigger);

function ServicesPreview() {
  const [activeService, setActiveService] = useState(0);

  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const serviceRowsRef = useRef([]);
  const featureRef = useRef(null);

  const selectedService = services[activeService];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const rows = serviceRowsRef.current.filter(Boolean);
    const feature = featureRef.current;

    if (!section || !intro || !rows.length || !feature) {
      return undefined;
    }

    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      );

      if (reducedMotion.matches) {
        gsap.set([intro, ...rows, feature], {
          opacity: 1,
          y: 0,
          clearProps: 'transform',
        });

        return;
      }

      gsap.fromTo(
        intro,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: intro,
            start: 'top 82%',
            once: true,
          },
        },
      );

      rows.forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            opacity: 0,
            x: index % 2 === 0 ? -24 : 24,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: index * 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        feature,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: feature,
            start: 'top 84%',
            once: true,
          },
        },
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  const handleServiceChange = (index) => {
    if (index === activeService) {
      return;
    }

    setActiveService(index);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="services-preview-title"
    >
      <div className={styles.container}>
        {/* =====================================================
            INTRO
        ===================================================== */}

        <div
          ref={introRef}
          className={styles.intro}
        >
          <div className={styles.introMeta}>
            <span className={styles.sectionNumber}>
              02
            </span>

            <span className={styles.sectionLabel}>
              OUR SERVICES
            </span>
          </div>

          <div className={styles.introMain}>
            <h2
              id="services-preview-title"
              className={styles.title}
            >
              Technology solutions
              <br />
              built around your business.
            </h2>

            <div className={styles.introAside}>
              <p className={styles.description}>
                We combine strategy, design and engineering to
                create digital products that solve real business
                problems.
              </p>

              <Link
                to="/services"
                className={styles.viewAll}
              >
                <span>View all services</span>

                <span
                  className={styles.viewAllArrow}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================
            SERVICE EXPERIENCE
        ===================================================== */}

        <div className={styles.experience}>
          {/* -------------------------------------------------
              SERVICE LIST
          ------------------------------------------------- */}

          <div className={styles.serviceList}>
            <div className={styles.listHeader}>
              <span>CAPABILITIES</span>

              <span>
                {String(services.length).padStart(2, '0')}
              </span>
            </div>

            <div className={styles.rows}>
              {services.map((service, index) => {
                const isActive = index === activeService;

                return (
                  <button
                    key={service.slug}
                    type="button"
                    ref={(element) => {
                      serviceRowsRef.current[index] = element;
                    }}
                    className={`${styles.serviceRow} ${
                      isActive
                        ? styles.serviceRowActive
                        : ''
                    }`}
                    onClick={() => handleServiceChange(index)}
                    aria-pressed={isActive}
                  >
                    <span className={styles.rowNumber}>
                      {service.number}
                    </span>

                    <span className={styles.rowTitle}>
                      {service.title}
                    </span>

                    <span className={styles.rowArrow}>
                      {isActive ? '↗' : '→'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------
              FEATURED SERVICE
          ------------------------------------------------- */}

          <article
            ref={featureRef}
            className={styles.feature}
          >
            <div className={styles.featureHeader}>
              <span className={styles.featureEyebrow}>
                SELECTED SERVICE
              </span>

              <span className={styles.featureIndex}>
                {selectedService?.number}
              </span>
            </div>

            <div className={styles.featureBody}>
              <div className={styles.featureHeading}>
                <span className={styles.featureKicker}>
                  Riyadvi capability
                </span>

                <h3 className={styles.featureTitle}>
                  {selectedService?.title}
                </h3>

                <p className={styles.featureDescription}>
                  {selectedService?.shortDescription}
                </p>

                <Link
                  to={`/services/${selectedService?.slug}`}
                  className={styles.featureLink}
                >
                  <span>Explore service</span>

                  <span aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </div>

              <div className={styles.capabilities}>
                <div className={styles.capabilityHeader}>
                  <span>WHAT WE DO</span>
                </div>

                <div className={styles.capabilityList}>
                  {selectedService?.capabilities
                    ?.slice(0, 4)
                    .map((capability, index) => (
                      <div
                        key={capability}
                        className={styles.capability}
                      >
                        <span>
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <p>{capability}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className={styles.featureFooter}>
              <div className={styles.footerStatement}>
                <span className={styles.footerLine} />

                <span>
                  Strategy → Design → Technology
                </span>
              </div>

              <div className={styles.progressInfo}>
                <span>
                  {String(activeService + 1).padStart(2, '0')}
                </span>

                <div className={styles.progress}>
                  <span
                    className={styles.progressActive}
                    style={{
                      width: `${
                        ((activeService + 1) /
                          services.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <span>
                  {String(services.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </article>
        </div>

        {/* =====================================================
            CLOSING STATEMENT
        ===================================================== */}

        <div className={styles.closing}>
          <span className={styles.closingMark}>
            +
          </span>

          <p>
            The right technology should make your business
            simpler, stronger and ready for what comes next.
          </p>

          <span className={styles.closingLine} />
        </div>
      </div>
    </section>
  );
}

export default ServicesPreview;
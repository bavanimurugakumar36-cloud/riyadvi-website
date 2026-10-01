import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import services from '../../data/services';
import ThreeSceneLoader from '../../components/loaders/ThreeSceneLoader.jsx';

import styles from './Services.module.css';

const ServicesScene = lazy(
  () => import('../../three/scenes/ServicesScene.jsx')
);

function Services() {
  const [activeService, setActiveService] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);

  const selectedService = services[activeService];

  useEffect(() => {
    setContentVisible(false);

    const timer = window.setTimeout(() => {
      setContentVisible(true);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [activeService]);

  const handleServiceSelect = (index) => {
    if (index === activeService) return;
    setActiveService(index);
  };

  return (
    <main className={styles.page}>

      {/* =========================================================
          HERO / INTERACTIVE SERVICES EXPERIENCE
      ========================================================== */}

      <section className={styles.heroSection}>

        {/* Background decoration */}
        <div className={styles.backgroundGrid} />
        <div className={styles.backgroundGlow} />
        <div className={styles.backgroundOrb} />

        <div className={styles.heroInner}>

          {/* LEFT CONTENT */}
          <div className={styles.leftColumn}>

            <div className={styles.sectionLabel}>
              <span>WHAT WE BUILD</span>
              <i />
            </div>

            <h1 className={styles.heroTitle}>
              Technology built
              <br />
              around your{' '}
              <span>business.</span>
            </h1>

            <p className={styles.heroDescription}>
              From custom software and digital experiences to
              emerging technologies, we create solutions designed
              around real business needs.
            </p>

            {/* SERVICE SELECTOR */}
            <div className={styles.serviceSelector}>

              {services.map((service, index) => (
                <button
                  key={service.slug}
                  type="button"
                  className={`${styles.selectorItem} ${
                    activeService === index
                      ? styles.selectorItemActive
                      : ''
                  }`}
                  onClick={() => handleServiceSelect(index)}
                  aria-label={`View ${service.title}`}
                  aria-pressed={activeService === index}
                >
                  <span className={styles.selectorNumber}>
                    {service.number}
                  </span>

                  <span className={styles.selectorTitle}>
                    {service.title}
                  </span>

                  <span className={styles.selectorArrow}>
                    →
                  </span>
                </button>
              ))}

            </div>
          </div>

          {/* CENTER 3D VISUAL */}
          <div className={styles.visualColumn}>

            <div className={styles.visualTopLabel}>
              <span>INTERACTIVE</span>
              <span>3D EXPERIENCE</span>
            </div>

            <div className={styles.sceneWrapper}>

              <div className={styles.sceneGlow} />

              <Suspense
                fallback={
                  <ThreeSceneLoader
                    label="Loading interactive technology"
                  />
                }
              >
                <ServicesScene
                  activeService={activeService}
                />
              </Suspense>

            </div>

            <div className={styles.visualBottomLabel}>
              <span>RIYADVI</span>
              <span>01 — 06</span>
            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div
            className={`${styles.rightColumn} ${
              contentVisible
                ? styles.contentVisible
                : styles.contentHidden
            }`}
          >

            <div className={styles.serviceNumber}>
              {selectedService?.number}
              <span />
            </div>

            <h2 className={styles.selectedTitle}>
              {selectedService?.title}
            </h2>

            <p className={styles.selectedDescription}>
              {selectedService?.shortDescription}
            </p>

            {/* CAPABILITIES */}
            {selectedService?.capabilities?.length > 0 && (
              <div className={styles.capabilities}>

                {selectedService.capabilities
                  .slice(0, 4)
                  .map((capability, index) => (
                    <div
                      key={`${capability}-${index}`}
                      className={styles.capability}
                    >
                      <span />
                      <span>{capability}</span>
                    </div>
                  ))}

              </div>
            )}

            <Link
              to={`/services/${selectedService?.slug}`}
              className={styles.exploreLink}
            >
              <span>Explore service</span>

              <span className={styles.exploreIcon}>
                ↗
              </span>
            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          OUR SERVICES
      ========================================================== */}

      <section className={styles.servicesSection}>

        <div className={styles.servicesHeader}>

          <div>

            <div className={styles.sectionLabel}>
              <span>OUR SERVICES</span>
              <i />
            </div>

            <h2 className={styles.servicesTitle}>
              Solutions designed to move
              <br />
              businesses forward.
            </h2>

          </div>

          <p className={styles.servicesIntro}>
            From strategy to execution, we build
            solutions that create real impact
            across industries.
          </p>

        </div>


        {/* SERVICE CARDS */}

        <div className={styles.servicesGrid}>

          {services.map((service, index) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className={`${styles.serviceCard} ${
                activeService === index
                  ? styles.serviceCardActive
                  : ''
              }`}
              onMouseEnter={() => handleServiceSelect(index)}
            >

              {/* Card top */}
              <div className={styles.cardTop}>

                <span className={styles.cardNumber}>
                  {service.number}
                </span>

                <span className={styles.cardArrow}>
                  ↗
                </span>

              </div>


              {/* Card content */}
              <div className={styles.cardContent}>

                <h3>{service.title}</h3>

                <p>
                  {service.shortDescription}
                </p>

              </div>


              {/* Decorative visual */}
              <div className={styles.cardVisual}>

                <div
                  className={`${styles.cardShape} ${
                    styles[`shape${index + 1}`]
                  }`}
                >

                  <span />
                  <span />
                  <span />
                  <span />

                </div>

              </div>


              {/* Bottom line */}
              <div className={styles.cardBottomLine} />

            </Link>
          ))}

        </div>

      </section>


      {/* =========================================================
          BOTTOM CTA
      ========================================================== */}

      <section className={styles.ctaSection}>

        <div className={styles.ctaGlow} />

        <div className={styles.ctaContent}>

          <div className={styles.sectionLabel}>
            <span>READY TO BUILD?</span>
            <i />
          </div>

          <h2>
            Let's create something
            <br />
            <span>remarkable.</span>
          </h2>

          <p>
            Tell us what you are building and
            let's turn your idea into a digital
            experience.
          </p>

          <Link
            to="/contact"
            className={styles.ctaButton}
          >
            <span>Start a conversation</span>
            <span>↗</span>
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Services;
import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import services from '../../data/services';
import ThreeSceneLoader from '../../components/loaders/ThreeSceneLoader.jsx';

import styles from './Services.module.css';

const ServicesScene = lazy(() => import('../../three/scenes/ServicesScene.jsx'));

function Services() {
  const [activeService, setActiveService] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);

  const selectedService = services[activeService];

  useEffect(() => {
    setContentVisible(false);

    const timer = window.setTimeout(() => {
      setContentVisible(true);
    }, 160);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeService]);

  const handleServiceSelect = (index) => {
    if (index === activeService) {
      return;
    }

    setActiveService(index);
  };

  return (
    <main className={styles.page}>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.hero}>
        <p className={styles.eyebrow}>
          WHAT WE BUILD
        </p>

        <h1 className={styles.title}>
          Technology built
          <br />
          around your business.
        </h1>

        <p className={styles.description}>
          From custom software and digital experiences to
          emerging technologies, we create solutions designed
          around real business needs.
        </p>
      </section>

      {/* =====================================================
          INTERACTIVE EXPERIENCE
      ===================================================== */}

      <section className={styles.experience}>
        {/* 3D VISUAL */}

        <div className={styles.experienceVisual}>
          <div className={styles.scene}>
            <Suspense fallback={<ThreeSceneLoader label="Loading interactive technology" />}><ServicesScene activeService={activeService} /></Suspense>
          </div>

          <div className={styles.sceneLabel}>
            <span>01</span>
            <span>INTERACTIVE TECHNOLOGY</span>
          </div>
        </div>

        {/* SERVICE CONTENT */}

        <div
          className={`${styles.experienceContent} ${
            contentVisible
              ? styles.experienceContentVisible
              : styles.experienceContentHidden
          }`}
        >
          <p className={styles.experienceEyebrow}>
            {selectedService?.number}
          </p>

          <h2 className={styles.experienceTitle}>
            {selectedService?.title}
          </h2>

          <p className={styles.experienceDescription}>
            {selectedService?.shortDescription}
          </p>

          <Link
            to={`/services/${selectedService?.slug}`}
            className={styles.experienceLink}
          >
            <span>Explore service</span>

            <span aria-hidden="true">
              ↗
            </span>
          </Link>

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
                <span>
                  {service.number}
                </span>

                <span>
                  {service.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES GRID
      ===================================================== */}

      <section className={styles.services}>
        <div className={styles.servicesHeader}>
          <div>
            <p className={styles.eyebrow}>
              OUR SERVICES
            </p>

            <h2 className={styles.servicesTitle}>
              Solutions designed
              <br />
              to move businesses forward.
            </h2>
          </div>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className={styles.card}
            >
              <span className={styles.number}>
                {service.number}
              </span>

              <div className={styles.cardContent}>
                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.shortDescription}
                </p>
              </div>

              <span
                className={styles.arrow}
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Services;
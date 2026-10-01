import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';

import services from '../../data/services';
import ThreeSceneLoader from '../../components/loaders/ThreeSceneLoader.jsx';

import styles from './ServiceDetail.module.css';

const ServicesScene = lazy(
  () => import('../../three/scenes/ServicesScene.jsx')
);

function ServiceDetail() {
  const { slug } = useParams();

  const serviceIndex = services.findIndex(
    (item) => item.slug === slug
  );

  const service =
    serviceIndex >= 0 ? services[serviceIndex] : null;

  if (!service) {
    return (
      <main className={styles.notFound}>
        <div className={styles.notFoundInner}>
          <p className={styles.eyebrow}>
            SERVICE NOT FOUND
          </p>

          <h1>
            The service you are looking for
            <br />
            does not exist.
          </h1>

          <Link
            to="/services"
            className={styles.backButton}
          >
            <span>←</span>
            Back to Services
          </Link>
        </div>
      </main>
    );
  }

  const technologies =
    service.technologies?.slice(0, 6) || [];

  const capabilities =
    service.capabilities || [];

  const industries =
    service.industries || [];

  const process =
    service.process || [];

  return (
    <main className={styles.page}>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.hero}>

        <div className={styles.heroGrid} />

        <div className={styles.heroGlow} />

        <div className={styles.heroOrb} />

        <div className={styles.heroInner}>

          {/* LEFT */}
          <div className={styles.heroContent}>

            <div className={styles.heroMeta}>
              <span>
                {service.number}
              </span>

              <i />

              <span>
                {service.heroLabel}
              </span>
            </div>

            <h1 className={styles.heroTitle}>
              {service.heroTitle}
            </h1>

            <p className={styles.heroDescription}>
              {service.heroDescription}
            </p>

            <div className={styles.heroActions}>

              <Link
                to="/contact"
                className={styles.primaryButton}
              >
                <span>
                  Start a Conversation
                </span>

                <span
                  className={styles.buttonArrow}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>

              <Link
                to="/services"
                className={styles.secondaryButton}
              >
                View all services
              </Link>

            </div>

            {/* HERO SERVICE FEATURES */}

            <div className={styles.heroFeatures}>

              <div className={styles.heroFeature}>
                <span />
                <p>
                  Strategy driven
                </p>
              </div>

              <div className={styles.heroFeature}>
                <span />
                <p>
                  Scalable architecture
                </p>
              </div>

              <div className={styles.heroFeature}>
                <span />
                <p>
                  Business focused
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT / 3D */}

          <div className={styles.heroVisual}>

            <div className={styles.visualHeader}>
              <span>
                INTERACTIVE
              </span>

              <span>
                3D / {service.number}
              </span>
            </div>

            <div className={styles.visualFrame}>

              <div className={styles.visualGlow} />

              <div className={styles.visualGrid} />

              <Suspense
                fallback={
                  <ThreeSceneLoader
                    label="Loading interactive technology"
                  />
                }
              >
                <ServicesScene
                  activeService={serviceIndex}
                />
              </Suspense>

              {/* CORNER MARKERS */}

              <span
                className={`${styles.corner} ${styles.cornerTopLeft}`}
              />

              <span
                className={`${styles.corner} ${styles.cornerTopRight}`}
              />

              <span
                className={`${styles.corner} ${styles.cornerBottomLeft}`}
              />

              <span
                className={`${styles.corner} ${styles.cornerBottomRight}`}
              />

            </div>

            <div className={styles.visualFooter}>

              <span>
                RIYADVI
              </span>

              <span>
                {String(serviceIndex + 1).padStart(2, '0')}
                {' '}
                —
                {' '}
                {String(services.length).padStart(2, '0')}
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CHALLENGE
      ===================================================== */}

      <section className={styles.splitSection}>

        <div className={styles.sectionMarker}>

          <span>
            01
          </span>

          <p>
            THE CHALLENGE
          </p>

        </div>

        <div className={styles.splitContent}>

          <div className={styles.contentHeading}>

            <span className={styles.smallLabel}>
              UNDERSTAND FIRST
            </span>

            <h2>
              Understanding the problem
              <br />
              before building the solution.
            </h2>

          </div>

          <p className={styles.largeParagraph}>
            {service.challenge}
          </p>

        </div>

      </section>


      {/* =====================================================
          SOLUTION
      ===================================================== */}

      <section className={styles.solutionSection}>

        <div className={styles.sectionMarker}>

          <span>
            02
          </span>

          <p>
            OUR SOLUTION
          </p>

        </div>

        <div className={styles.solutionContent}>

          <div className={styles.solutionHeading}>

            <span className={styles.smallLabel}>
              BUILT AROUND YOUR BUSINESS
            </span>

            <h2>
              Technology designed
              <br />
              around your business.
            </h2>

          </div>

          <p className={styles.largeParagraph}>
            {service.solution}
          </p>

        </div>

      </section>


      {/* =====================================================
          CAPABILITIES
      ===================================================== */}

      <section className={styles.capabilitiesSection}>

        <div className={styles.sectionIntro}>

          <div className={styles.introMeta}>
            <span>
              WHAT WE DELIVER
            </span>

            <i />
          </div>

          <h2>
            Capabilities built
            <br />
            for real-world needs.
          </h2>

          <p>
            Practical capabilities designed to turn
            strategy into measurable digital outcomes.
          </p>

        </div>


        <div className={styles.capabilityGrid}>

          {capabilities.map(
            (capability, index) => (
              <article
                key={`${capability}-${index}`}
                className={styles.capabilityCard}
              >

                <div className={styles.cardTop}>

                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span>
                    ↗
                  </span>

                </div>

                <div className={styles.cardBody}>

                  <div className={styles.cardIcon}>
                    +
                  </div>

                  <h3>
                    {capability}
                  </h3>

                </div>

                <div className={styles.cardLine} />

              </article>
            )
          )}

        </div>

      </section>


      {/* =====================================================
          INDUSTRIES
      ===================================================== */}

      <section className={styles.industriesSection}>

        <div className={styles.sectionMarker}>

          <span>
            03
          </span>

          <p>
            INDUSTRIES
          </p>

        </div>

        <div className={styles.industryContent}>

          <div className={styles.industryHeading}>

            <span className={styles.smallLabel}>
              WHERE WE CREATE IMPACT
            </span>

            <h2>
              Built for different
              <br />
              business environments.
            </h2>

          </div>

          <div className={styles.industryList}>

            {industries.map(
              (industry, index) => (
                <div
                  key={`${industry}-${index}`}
                  className={styles.industryItem}
                >

                  <span className={styles.industryNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className={styles.industryName}>
                    {industry}
                  </span>

                  <span className={styles.industryArrow}>
                    ↗
                  </span>

                </div>
              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          TECHNOLOGY
      ===================================================== */}

      <section className={styles.technologySection}>

        <div className={styles.sectionIntro}>

          <div className={styles.introMeta}>
            <span>
              TECHNOLOGY
            </span>

            <i />
          </div>

          <h2>
            The tools behind
            <br />
            the experience.
          </h2>

        </div>


        <div className={styles.technologyGrid}>

          {technologies.map(
            (technology, index) => (
              <div
                key={`${technology}-${index}`}
                className={styles.technologyItem}
              >

                <span className={styles.techNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className={styles.techIcon}>
                  ◇
                </div>

                <strong>
                  {technology}
                </strong>

                <span className={styles.techArrow}>
                  ↗
                </span>

              </div>
            )
          )}

        </div>

      </section>


      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className={styles.processSection}>

        <div className={styles.sectionIntro}>

          <div className={styles.introMeta}>
            <span>
              OUR PROCESS
            </span>

            <i />
          </div>

          <h2>
            From first conversation
            <br />
            to measurable results.
          </h2>

        </div>


        <div className={styles.processList}>

          {process.map(
            (step, index) => (
              <div
                key={`${step}-${index}`}
                className={styles.processItem}
              >

                <div className={styles.processNumber}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className={styles.processStep}>
                  {step}
                </div>

                <div className={styles.processArrow}>
                  →
                </div>

              </div>
            )
          )}

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className={styles.cta}>

        <div className={styles.ctaGrid} />

        <div className={styles.ctaGlow} />

        <div className={styles.ctaInner}>

          <div className={styles.ctaMeta}>
            <span>
              LET'S BUILD SOMETHING
            </span>

            <i />
          </div>

          <h2>
            Have a project
            <br />
            <span>in mind?</span>
          </h2>

          <p>
            Let's discuss your goals and explore
            how technology can help move your
            business forward.
          </p>

          <Link
            to="/contact"
            className={styles.ctaButton}
          >
            <span>
              Book a Free Consultation
            </span>

            <span>
              ↗
            </span>
          </Link>

        </div>

      </section>

    </main>
  );
}

export default ServiceDetail;
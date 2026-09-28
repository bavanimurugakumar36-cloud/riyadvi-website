import { Link, useParams } from 'react-router-dom';

import services from '../../data/services';
import styles from './ServiceDetail.module.css';

function ServiceDetail() {
  const { slug } = useParams();

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return (
      <main className={styles.notFound}>
        <p className={styles.eyebrow}>SERVICE NOT FOUND</p>

        <h1>
          The service you are looking for
          does not exist.
        </h1>

        <Link
          to="/services"
          className={styles.backButton}
        >
          ← Back to Services
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {/* =========================================
          HERO
      ========================================= */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            {service.number} / {service.heroLabel}
          </p>

          <h1 className={styles.heroTitle}>
            {service.heroTitle}
          </h1>

          <p className={styles.heroDescription}>
            {service.heroDescription}
          </p>

          <Link
            to="/contact"
            className={styles.primaryButton}
          >
            Start a Conversation
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualGlow} />

          <div className={styles.visualOrb}>
            <span>{service.number}</span>
          </div>

          <div className={styles.visualLabel}>
            {service.title}
          </div>
        </div>
      </section>

      {/* =========================================
          CHALLENGE / SOLUTION
      ========================================= */}

      <section className={styles.splitSection}>
        <div className={styles.sectionLabel}>
          <span>01</span>
          <p>THE CHALLENGE</p>
        </div>

        <div className={styles.sectionContent}>
          <h2>
            Understanding the problem
            before building the solution.
          </h2>

          <p>{service.challenge}</p>
        </div>
      </section>

      <section className={styles.splitSection}>
        <div className={styles.sectionLabel}>
          <span>02</span>
          <p>OUR SOLUTION</p>
        </div>

        <div className={styles.sectionContent}>
          <h2>
            Technology designed around
            your business.
          </h2>

          <p>{service.solution}</p>
        </div>
      </section>

      {/* =========================================
          CAPABILITIES
      ========================================= */}

      <section className={styles.capabilitiesSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>
            WHAT WE DELIVER
          </p>

          <h2>
            Capabilities built for
            real-world needs.
          </h2>
        </div>

        <div className={styles.capabilityGrid}>
          {service.capabilities.map(
            (capability, index) => (
              <article
                key={capability}
                className={styles.capabilityCard}
              >
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3>{capability}</h3>

                <div aria-hidden="true">↗</div>
              </article>
            )
          )}
        </div>
      </section>

      {/* =========================================
          INDUSTRIES
      ========================================= */}

      <section className={styles.industriesSection}>
        <div className={styles.sectionLabel}>
          <span>03</span>
          <p>INDUSTRIES</p>
        </div>

        <div className={styles.industryContent}>
          <h2>
            Built for different
            business environments.
          </h2>

          <div className={styles.industryList}>
            {service.industries.map(
              (industry, index) => (
                <div
                  key={industry}
                  className={styles.industryItem}
                >
                  <span>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <p>{industry}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================================
          TECHNOLOGY STACK
      ========================================= */}

      <section className={styles.technologySection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>
            TECHNOLOGY
          </p>

          <h2>
            The tools behind
            the experience.
          </h2>
        </div>

        <div className={styles.technologyGrid}>
          {service.technologies.map(
            (technology, index) => (
              <div
                key={technology}
                className={styles.technologyItem}
              >
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <strong>{technology}</strong>
              </div>
            )
          )}
        </div>
      </section>

      {/* =========================================
          PROCESS
      ========================================= */}

      <section className={styles.processSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>
            OUR PROCESS
          </p>

          <h2>
            From first conversation
            to measurable results.
          </h2>
        </div>

        <div className={styles.processList}>
          {service.process.map(
            (step, index) => (
              <div
                key={step}
                className={styles.processItem}
              >
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3>{step}</h3>

                <div aria-hidden="true">
                  →
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================= */}

      <section className={styles.cta}>
        <p className={styles.eyebrow}>
          LET'S BUILD SOMETHING
        </p>

        <h2>
          Have a project
          in mind?
        </h2>

        <p>
          Let's discuss your goals and explore
          how technology can help move your
          business forward.
        </p>

        <Link
          to="/contact"
          className={styles.primaryButton}
        >
          Book a Free Consultation
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}

export default ServiceDetail;
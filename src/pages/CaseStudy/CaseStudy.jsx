import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';

import caseStudies from '../../data/caseStudies';
import ThreeSceneLoader from '../../components/loaders/ThreeSceneLoader.jsx';
import styles from './CaseStudy.module.css';

const CaseStudyExperience = lazy(() => import('../../three/components/CaseStudyExperience.jsx'));

function CaseStudy() {
  const { slug } = useParams();

  const project = caseStudies.find(
    (item) => item.slug === slug
  );

  if (!project) {
    return (
      <div className={styles.notFound}>
        <p className={styles.eyebrow}>
          PROJECT NOT FOUND
        </p>

        <h1>
          The case study you are looking for
          does not exist.
        </h1>

        <Link
          to="/portfolio"
          className={styles.backButton}
        >
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* HERO */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            {project.number} / {project.category}
          </p>

          <h1 className={styles.title}>
            {project.title}
          </h1>

          <p className={styles.description}>
            {project.heroDescription}
          </p>

          <Link
            to="/contact"
            className={styles.primaryButton}
          >
            Start a Conversation
            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>

        <div
          className={styles.heroVisual}
          aria-hidden="true"
        >
          <div className={styles.visualGlow} />

          <div className={styles.visualShape}>
            <span>{project.number}</span>
          </div>

          <p>{project.category}</p>
        </div>
      </section>

      {/* OVERVIEW */}

      <section className={styles.overview}>
        <div className={styles.sectionLabel}>
          <span>01</span>
          <p>PROJECT OVERVIEW</p>
        </div>

        <div className={styles.overviewContent}>
          <h2>
            Turning a business challenge into
            a digital opportunity.
          </h2>

          <p>{project.challenge}</p>

          <p>{project.solution}</p>
        </div>
      </section>

      {/* INTERACTIVE 3D EXPERIENCE */}

      <Suspense fallback={<ThreeSceneLoader label="Loading project experience" />}><CaseStudyExperience project={project} /></Suspense>

      {/* RESULTS */}

      <section className={styles.results}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>
            OUTCOMES
          </p>

          <h2>
            What the project was designed
            to achieve.
          </h2>
        </div>

        <div className={styles.resultGrid}>
          {project.results.map(
            (result, index) => (
              <article
                key={result}
                className={styles.resultCard}
              >
                <span>
                  {String(index + 1).padStart(
                    2,
                    '0'
                  )}
                </span>

                <h3>{result}</h3>
              </article>
            )
          )}
        </div>
      </section>

      {/* SERVICES */}

      <section className={styles.servicesSection}>
        <div className={styles.sectionLabel}>
          <span>02</span>
          <p>SERVICES</p>
        </div>

        <div className={styles.servicesContent}>
          <h2>
            The capabilities behind the project.
          </h2>

          <div className={styles.tagGrid}>
            {project.services.map(
              (service) => (
                <div
                  key={service}
                  className={styles.tag}
                >
                  {service}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}

      <section className={styles.technology}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>
            TECHNOLOGY
          </p>

          <h2>
            The technology behind the experience.
          </h2>
        </div>

        <div className={styles.technologyGrid}>
          {project.technologies.map(
            (technology, index) => (
              <div
                key={technology}
                className={styles.technologyItem}
              >
                <span>
                  {String(index + 1).padStart(
                    2,
                    '0'
                  )}
                </span>

                <strong>{technology}</strong>
              </div>
            )
          )}
        </div>
      </section>

      {/* PROCESS */}

      <section className={styles.process}>
        <div className={styles.sectionLabel}>
          <span>03</span>
          <p>PROCESS</p>
        </div>

        <div className={styles.processContent}>
          <h2>
            From idea to digital experience.
          </h2>

          <div className={styles.processList}>
            {project.process.map(
              (step, index) => (
                <div
                  key={step}
                  className={styles.processItem}
                >
                  <span>
                    {String(index + 1).padStart(
                      2,
                      '0'
                    )}
                  </span>

                  <h3>{step}</h3>

                  <span aria-hidden="true">
                    →
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className={styles.cta}>
        <p className={styles.eyebrow}>
          HAVE A PROJECT IN MIND?
        </p>

        <h2>
          Let's build your next
          <br />
          digital experience.
        </h2>

        <p>
          Tell us about your challenge and
          let's explore what we can create
          together.
        </p>

        <div className={styles.ctaActions}>
          <Link
            to="/contact"
            className={styles.primaryButton}
          >
            Book a Free Consultation
            <span aria-hidden="true">
              ↗
            </span>
          </Link>

          <Link
            to="/portfolio"
            className={styles.secondaryButton}
          >
            View More Work
            <span aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default CaseStudy;
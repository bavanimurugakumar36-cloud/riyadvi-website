import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import caseStudies from '../../data/caseStudies';
import styles from './Portfolio.module.css';

function Portfolio() {
  const [activeProject, setActiveProject] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);

  const selectedProject = caseStudies[activeProject];

  useEffect(() => {
    setContentVisible(false);

    const timer = window.setTimeout(() => {
      setContentVisible(true);
    }, 140);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeProject]);

  const handleProjectSelect = (index) => {
    if (index === activeProject) {
      return;
    }

    setActiveProject(index);
  };

  return (
    <main className={styles.page}>
      {/* =========================
          HERO
      ========================== */}

      <section className={styles.hero}>
        <p className={styles.eyebrow}>
          SELECTED WORK
        </p>

        <h1 className={styles.title}>
          Digital experiences
          <br />
          built to make an impact.
        </h1>

        <p className={styles.description}>
          Explore selected projects where strategy, design and
          technology come together to solve real business challenges.
        </p>
      </section>

      {/* =========================
          INTERACTIVE PROJECT EXPERIENCE
      ========================== */}

      <section className={styles.experience}>
        {/* PROJECT VISUAL */}

        <div className={styles.experienceVisual}>
          <div className={styles.visualGrid} />

          <div
            className={`${styles.visualObject} ${
              styles[`visualObject${activeProject + 1}`]
            }`}
          >
            <div className={styles.objectOuter}>
              <div className={styles.objectMiddle}>
                <div className={styles.objectInner}>
                  <span>
                    {selectedProject?.number}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.experienceMeta}>
            <span>
              {selectedProject?.number}
            </span>

            <span>
              {selectedProject?.category}
            </span>
          </div>

          <span className={styles.experienceHint}>
            SELECT PROJECT
          </span>
        </div>

        {/* PROJECT INFORMATION */}

        <div
          className={`${styles.experienceContent} ${
            contentVisible
              ? styles.experienceContentVisible
              : styles.experienceContentHidden
          }`}
        >
          <p className={styles.experienceEyebrow}>
            {selectedProject?.number}
          </p>

          <h2 className={styles.experienceTitle}>
            {selectedProject?.title}
          </h2>

          <p className={styles.experienceDescription}>
            {selectedProject?.shortDescription}
          </p>

          <Link
            to={`/portfolio/${selectedProject?.slug}`}
            className={styles.experienceLink}
          >
            <span>View case study</span>

            <span aria-hidden="true">
              ↗
            </span>
          </Link>

          {/* PROJECT SELECTOR */}

          <div className={styles.projectSelector}>
            {caseStudies.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                className={`${styles.selectorItem} ${
                  activeProject === index
                    ? styles.selectorItemActive
                    : ''
                }`}
                onClick={() => handleProjectSelect(index)}
                aria-label={`View ${project.title}`}
                aria-pressed={activeProject === index}
              >
                <span>
                  {project.number}
                </span>

                <span>
                  {project.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          PROJECT GRID
      ========================== */}

      <section className={styles.projects}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>
              OUR WORK
            </p>

            <h2 className={styles.sectionTitle}>
              Selected projects.
            </h2>
          </div>

          <span>
            {String(caseStudies.length).padStart(2, '0')} PROJECTS
          </span>
        </div>

        <div className={styles.grid}>
          {caseStudies.map((project, index) => (
            <Link
  key={project.slug}
  to={`/portfolio/${project.slug}`}
  className={styles.card}
  onMouseEnter={() => handleProjectSelect(index)}
  onFocus={() => handleProjectSelect(index)}
>
              <div className={styles.cardVisual}>
                <span className={styles.projectNumber}>
                  {project.number}
                </span>

                <span className={styles.projectCategory}>
                  {project.category}
                </span>

                <div
                  className={`${styles.visualShape} ${
                    styles[`shape${index + 1}`]
                  }`}
                >
                  <div className={styles.shapeInner} />
                </div>

                <span className={styles.viewProject}>
                  View Case Study
                  <span aria-hidden="true">
                    ↗
                  </span>
                </span>
              </div>

              <div className={styles.cardContent}>
                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.shortDescription}
                </p>

                <div className={styles.services}>
                  {project.services.map((service) => (
                    <span key={service}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================
          CTA
      ========================== */}

      <section className={styles.cta}>
        <p className={styles.eyebrow}>
          HAVE A PROJECT IN MIND?
        </p>

        <h2>
          Let's create something
          <br />
          meaningful together.
        </h2>

        <p>
          Tell us about your business challenge and let's explore
          what technology can do for you.
        </p>

        <Link
          to="/contact"
          className={styles.ctaButton}
        >
          Start a Conversation

          <span aria-hidden="true">
            ↗
          </span>
        </Link>
      </section>
    </main>
  );
}

export default Portfolio;
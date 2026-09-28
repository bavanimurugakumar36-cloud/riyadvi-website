import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import jobs from '../../data/jobs';

import styles from './Careers.module.css';

function Careers() {
  const [activeDepartment, setActiveDepartment] =
    useState('All');

  const [activeDesignation, setActiveDesignation] =
    useState('All');

  const [activeType, setActiveType] =
    useState('All');

  const [activeExperience, setActiveExperience] =
    useState('All');

  /*
   * =========================================================
   * FILTER OPTIONS
   * =========================================================
   */

  const departments = useMemo(() => {
    const uniqueDepartments = [
      ...new Set(
        jobs
          .map((job) => job.department)
          .filter(Boolean)
      ),
    ];

    return ['All', ...uniqueDepartments];
  }, []);

  const designations = useMemo(() => {
    const uniqueDesignations = [
      ...new Set(
        jobs
          .map((job) => job.title)
          .filter(Boolean)
      ),
    ];

    return ['All', ...uniqueDesignations];
  }, []);

  const jobTypes = useMemo(() => {
    const uniqueTypes = [
      ...new Set(
        jobs
          .map((job) => job.type)
          .filter(Boolean)
      ),
    ];

    return ['All', ...uniqueTypes];
  }, []);

  const experienceLevels = useMemo(() => {
    const uniqueExperienceLevels = [
      ...new Set(
        jobs
          .map((job) => job.experience)
          .filter(Boolean)
      ),
    ];

    return ['All', ...uniqueExperienceLevels];
  }, []);

  /*
   * =========================================================
   * FILTERED JOBS
   * =========================================================
   */

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const departmentMatch =
        activeDepartment === 'All' ||
        job.department === activeDepartment;

      const designationMatch =
        activeDesignation === 'All' ||
        job.title === activeDesignation;

      const typeMatch =
        activeType === 'All' ||
        job.type === activeType;

      const experienceMatch =
        activeExperience === 'All' ||
        job.experience === activeExperience;

      return (
        departmentMatch &&
        designationMatch &&
        typeMatch &&
        experienceMatch
      );
    });
  }, [
    activeDepartment,
    activeDesignation,
    activeType,
    activeExperience,
  ]);

  /*
   * =========================================================
   * RESET FILTERS
   * =========================================================
   */

  const hasActiveFilters =
    activeDepartment !== 'All' ||
    activeDesignation !== 'All' ||
    activeType !== 'All' ||
    activeExperience !== 'All';

  const resetFilters = () => {
    setActiveDepartment('All');
    setActiveDesignation('All');
    setActiveType('All');
    setActiveExperience('All');
  };

  return (
    <main className={styles.page}>
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className={styles.hero}>
        <div
          className={styles.heroGrid}
          aria-hidden="true"
        />

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />

              <span>
                CAREERS AT RIYADVI
              </span>
            </div>

            <h1 className={styles.heroTitle}>
              Build what&apos;s next.
              <br />
              <span>Build it with us.</span>
            </h1>

            <p className={styles.heroDescription}>
              Join a team building software, digital
              experiences, immersive technology and
              intelligent solutions for businesses
              ready to move forward.
            </p>

            <div className={styles.heroActions}>
              <a
                href="#open-positions"
                className={styles.primaryButton}
              >
                <span>
                  View Open Positions
                </span>

                <span aria-hidden="true">
                  ↓
                </span>
              </a>

              <Link
                to="/contact"
                className={styles.secondaryButton}
              >
                <span>
                  Talk to Riyadvi
                </span>

                <span aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          </div>

          {/* HERO VISUAL */}

          <div
            className={styles.heroVisual}
            aria-hidden="true"
          >
            <div className={styles.visualGrid} />

            <div
              className={`${styles.visualRing} ${styles.visualRingLarge}`}
            >
              <span />
            </div>

            <div
              className={`${styles.visualRing} ${styles.visualRingMedium}`}
            >
              <span />
            </div>

            <div
              className={`${styles.visualRing} ${styles.visualRingSmall}`}
            >
              <span />
            </div>

            <div className={styles.visualCore}>
              <span>R</span>
            </div>

            <div
              className={`${styles.visualCorner} ${styles.visualCornerTop}`}
            >
              <span>01</span>

              <span>CREATE</span>
            </div>

            <div
              className={`${styles.visualCorner} ${styles.visualCornerBottom}`}
            >
              <span>RIYADVI</span>

              <span>CAREERS</span>
            </div>
          </div>
        </div>

        {/* HERO STATS */}

        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNumber}>
              {String(jobs.length).padStart(2, '0')}
            </span>

            <span className={styles.heroStatLabel}>
              OPEN ROLES
            </span>
          </div>

          <div className={styles.heroStat}>
            <span className={styles.heroStatNumber}>
              {String(departments.length - 1).padStart(
                2,
                '0'
              )}
            </span>

            <span className={styles.heroStatLabel}>
              CORE AREAS
            </span>
          </div>

          <div className={styles.heroStat}>
            <span className={styles.heroStatNumber}>
              01
            </span>

            <span className={styles.heroStatLabel}>
              SHARED VISION
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          OPEN POSITIONS
      ====================================================== */}

      <section
        id="open-positions"
        className={styles.positions}
        aria-labelledby="careers-positions-title"
      >
        <div className={styles.container}>
          {/* SECTION HEADER */}

          <div className={styles.sectionHeader}>
            <div className={styles.sectionLabel}>
              <span
                className={styles.sectionLabelLine}
              />

              <span>
                OPEN POSITIONS
              </span>
            </div>

            <div className={styles.sectionHeaderGrid}>
              <div>
                <h2
                  id="careers-positions-title"
                  className={styles.sectionTitle}
                >
                  Find your place
                  <br />
                  <span>at Riyadvi.</span>
                </h2>
              </div>

              <div className={styles.sectionHeaderCopy}>
                <p>
                  Explore current opportunities across
                  engineering, design and immersive
                  technology. Find a role where your
                  skills can contribute to meaningful
                  digital experiences.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              FILTERS
          ================================================== */}

          <div className={styles.filters}>
            <div className={styles.filterHeader}>
              <span className={styles.filterTitle}>
                FILTER OPPORTUNITIES
              </span>

              <span className={styles.resultCount}>
                {filteredJobs.length}{' '}
                {filteredJobs.length === 1
                  ? 'ROLE'
                  : 'ROLES'}
              </span>
            </div>

            {/* DEPARTMENT */}

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>
                DEPARTMENT
              </span>

              <div
                className={styles.filterOptions}
                role="group"
                aria-label="Filter by department"
              >
                {departments.map((department) => {
                  const isActive =
                    activeDepartment ===
                    department;

                  return (
                    <button
                      key={department}
                      type="button"
                      className={`${styles.filterButton} ${
                        isActive
                          ? styles.filterButtonActive
                          : ''
                      }`}
                      onClick={() =>
                        setActiveDepartment(
                          department
                        )
                      }
                      aria-pressed={isActive}
                    >
                      {department}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DESIGNATION */}

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>
                DESIGNATION
              </span>

              <div
                className={styles.filterOptions}
                role="group"
                aria-label="Filter by designation"
              >
                {designations.map(
                  (designation) => {
                    const isActive =
                      activeDesignation ===
                      designation;

                    return (
                      <button
                        key={designation}
                        type="button"
                        className={`${styles.filterButton} ${
                          isActive
                            ? styles.filterButtonActive
                            : ''
                        }`}
                        onClick={() =>
                          setActiveDesignation(
                            designation
                          )
                        }
                        aria-pressed={
                          isActive
                        }
                      >
                        {designation}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* WORK TYPE */}

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>
                WORK TYPE
              </span>

              <div
                className={styles.filterOptions}
                role="group"
                aria-label="Filter by work type"
              >
                {jobTypes.map((type) => {
                  const isActive =
                    activeType === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      className={`${styles.filterButton} ${
                        isActive
                          ? styles.filterButtonActive
                          : ''
                      }`}
                      onClick={() =>
                        setActiveType(type)
                      }
                      aria-pressed={isActive}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* EXPERIENCE */}

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>
                EXPERIENCE
              </span>

              <div
                className={styles.filterOptions}
                role="group"
                aria-label="Filter by experience"
              >
                {experienceLevels.map(
                  (experience) => {
                    const isActive =
                      activeExperience ===
                      experience;

                    return (
                      <button
                        key={experience}
                        type="button"
                        className={`${styles.filterButton} ${
                          isActive
                            ? styles.filterButtonActive
                            : ''
                        }`}
                        onClick={() =>
                          setActiveExperience(
                            experience
                          )
                        }
                        aria-pressed={
                          isActive
                        }
                      >
                        {experience}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* RESET */}

            {hasActiveFilters && (
              <div className={styles.resetRow}>
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={resetFilters}
                >
                  <span>
                    Reset all filters
                  </span>

                  <span aria-hidden="true">
                    ↺
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* =================================================
              JOB LIST
          ================================================== */}

          <div className={styles.jobList}>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <article
                  key={job.slug}
                  className={styles.jobCard}
                >
                  <div className={styles.jobIndex}>
                    {String(index + 1).padStart(
                      2,
                      '0'
                    )}
                  </div>

                  <div className={styles.jobMain}>
                    <div className={styles.jobTop}>
                      <span
                        className={
                          styles.jobDepartment
                        }
                      >
                        {job.department}
                      </span>

                      <span
                        className={
                          styles.jobLocation
                        }
                      >
                        {job.location}
                      </span>
                    </div>

                    <h3 className={styles.jobTitle}>
                      {job.title}
                    </h3>

                    <p
                      className={
                        styles.jobDescription
                      }
                    >
                      {job.shortDescription ||
                        job.description}
                    </p>

                    <div className={styles.jobMeta}>
                      <span>
                        {job.type}
                      </span>

                      {job.experience && (
                        <span>
                          {job.experience}
                        </span>
                      )}

                      <span>
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <div className={styles.jobAction}>
                    <Link
                      to={`/careers/${job.slug}`}
                      className={styles.viewRole}
                      aria-label={`View ${job.title} position`}
                    >
                      <span>
                        View role
                      </span>

                      <span
                        className={
                          styles.viewRoleArrow
                        }
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyNumber}>
                  00
                </div>

                <div>
                  <h3>
                    No roles match these
                    filters.
                  </h3>

                  <p>
                    Try changing one or more
                    filters to explore the
                    available opportunities.
                  </p>

                  <button
                    type="button"
                    className={
                      styles.emptyReset
                    }
                    onClick={resetFilters}
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* =================================================
              CULTURE
          ================================================== */}

          <div className={styles.culture}>
            <div className={styles.cultureLabel}>
              <span
                className={styles.sectionLabelLine}
              />

              <span>
                HOW WE WORK
              </span>
            </div>

            <div className={styles.cultureGrid}>
              <div className={styles.cultureIntro}>
                <h2>
                  Bring curiosity.
                  <br />
                  <span>Make an impact.</span>
                </h2>
              </div>

              <div className={styles.cultureContent}>
                <p>
                  We work across software, design,
                  immersive technology and emerging
                  digital experiences. The best work
                  happens when different perspectives
                  come together around a clear business
                  problem.
                </p>

                <div className={styles.culturePoints}>
                  <div className={styles.culturePoint}>
                    <span>01</span>

                    <div>
                      <h3>
                        Think beyond the brief
                      </h3>

                      <p>
                        Understand the problem
                        before jumping to the
                        solution.
                      </p>
                    </div>
                  </div>

                  <div className={styles.culturePoint}>
                    <span>02</span>

                    <div>
                      <h3>
                        Build with intent
                      </h3>

                      <p>
                        Every interaction,
                        component and technical
                        decision should have a
                        purpose.
                      </p>
                    </div>
                  </div>

                  <div className={styles.culturePoint}>
                    <span>03</span>

                    <div>
                      <h3>
                        Keep learning
                      </h3>

                      <p>
                        Explore new technologies
                        and continuously improve
                        how we create.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              CTA
          ================================================== */}

          <div className={styles.cta}>
            <div
              className={styles.ctaVisual}
              aria-hidden="true"
            >
              <div
                className={
                  styles.ctaCircleLarge
                }
              />

              <div
                className={
                  styles.ctaCircleSmall
                }
              />

              <div className={styles.ctaCore}>
                R
              </div>
            </div>

            <div className={styles.ctaContent}>
              <div className={styles.ctaLabel}>
                <span
                  className={
                    styles.sectionLabelLine
                  }
                />

                <span>
                  DON&apos;T SEE YOUR ROLE?
                </span>
              </div>

              <h2>
                Have something
                <br />
                <span>
                  to build together?
                </span>
              </h2>

              <p>
                Even if you do not see the exact
                role you are looking for, we are
                always interested in hearing from
                people who can bring something
                valuable to Riyadvi.
              </p>

              <Link
                to="/contact"
                className={styles.ctaButton}
              >
                <span>
                  Start a conversation
                </span>

                <span aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Careers;
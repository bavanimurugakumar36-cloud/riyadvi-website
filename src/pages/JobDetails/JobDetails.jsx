import {
  Link,
  useParams,
} from 'react-router-dom';

import {
  useForm,
} from 'react-hook-form';

import {
  zodResolver,
} from '@hookform/resolvers/zod';

import {
  z,
} from 'zod';

import {
  useState,
} from 'react';

import jobs from '../../data/jobs';
import submitApplication from '../../services/applicationService';

import styles from './JobDetails.module.css';

const applicationSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(
        2,
        'Please enter your full name.',
      )
      .max(
        100,
        'Name is too long.',
      ),

    email: z
      .string()
      .trim()
      .email(
        'Please enter a valid email address.',
      )
      .max(
        150,
        'Email is too long.',
      ),

    phone: z
      .string()
      .trim()
      .min(
        10,
        'Please enter a valid phone number.',
      )
      .max(
        30,
        'Phone number is too long.',
      )
      .regex(
        /^[+()\d\s.-]+$/,
        'Please enter a valid phone number.',
      ),

    portfolio: z
      .string()
      .trim()
      .url(
        'Please enter a valid URL.',
      )
      .max(
        500,
        'Portfolio URL is too long.',
      )
      .optional()
      .or(z.literal('')),

    resumeUrl: z
      .string()
      .trim()
      .url(
        'Please enter a valid resume URL.',
      )
      .max(
        500,
        'Resume URL is too long.',
      )
      .optional()
      .or(z.literal('')),

    coverLetter: z
      .string()
      .trim()
      .min(
        30,
        'Please tell us a little about yourself.',
      )
      .max(
        3000,
        'Cover letter is too long.',
      ),
  });

function JobDetails() {
  const { slug } = useParams();

  const job = jobs.find(
    (item) => item.slug === slug,
  );

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const [
    submitError,
    setSubmitError,
  ] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver:
      zodResolver(
        applicationSchema,
      ),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      resumeUrl: '',
      coverLetter: '',
    },
  });

  if (!job) {
    return (
      <div
        className={styles.notFound}
      >
        <p className={styles.eyebrow}>
          ROLE NOT FOUND
        </p>

        <h1>
          The position you are looking
          for does not exist.
        </h1>

        <Link
          to="/careers"
          className={styles.backButton}
          aria-label="Return to Careers"
        >
          ← Back to Careers
        </Link>
      </div>
    );
  }

  const onSubmit =
    async (formData) => {
      setSubmitError('');

      try {
        await submitApplication({
          ...formData,
          jobSlug: job.slug,
          jobTitle: job.title,
          department:
            job.department,
          location:
            job.location,
        });

        setSubmitted(true);
        reset();
      } catch (error) {
        setSubmitError(
          error?.message ||
            'Unable to submit your application right now. Please try again.',
        );
      }
    };

  return (
    <div className={styles.page}>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className={styles.hero}
      >
        <div
          className={
            styles.heroContent
          }
        >
          <div className={styles.meta}>
            <span>
              {job.number}
            </span>

            <span>
              {job.department}
            </span>

            <span>
              {job.type}
            </span>

            {job.experience && (
              <span>
                {job.experience}
              </span>
            )}
          </div>

          <h1>{job.title}</h1>

          <p>
            {job.description}
          </p>

          <div
            className={styles.location}
          >
            <span>
              LOCATION
            </span>

            <strong>
              {job.location}
            </strong>
          </div>
        </div>

        <div
          className={
            styles.heroVisual
          }
        >
          <div
            className={
              styles.visualGlow
            }
          />

          <div
            className={
              styles.visualShape
            }
          >
            <span>
              {job.number}
            </span>
          </div>

          <p>
            RIYADVI / CAREERS
          </p>
        </div>
      </section>

      {/* =====================================================
          RESPONSIBILITIES
      ===================================================== */}

      <section
        className={styles.section}
      >
        <div
          className={
            styles.sectionLabel
          }
        >
          <span>01</span>

          <p>
            RESPONSIBILITIES
          </p>
        </div>

        <div
          className={
            styles.sectionContent
          }
        >
          <h2>
            What you will
            <br />
            work on.
          </h2>

          <div
            className={styles.list}
          >
            {job.responsibilities.map(
              (
                responsibility,
                index,
              ) => (
                <div
                  key={
                    responsibility
                  }
                  className={
                    styles.listItem
                  }
                >
                  <span>
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      '0',
                    )}
                  </span>

                  <p>
                    {
                      responsibility
                    }
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          SKILLS
      ===================================================== */}

      <section
        className={
          styles.skillsSection
        }
      >
        <div
          className={
            styles.sectionIntro
          }
        >
          <p
            className={
              styles.eyebrow
            }
          >
            WHAT WE'RE LOOKING FOR
          </p>

          <h2>
            Skills that will help
            you succeed.
          </h2>
        </div>

        <div
          className={
            styles.skillGrid
          }
        >
          {job.skills.map(
            (skill, index) => (
              <div
                key={skill}
                className={
                  styles.skill
                }
              >
                <span>
                  {String(
                    index + 1,
                  ).padStart(
                    2,
                    '0',
                  )}
                </span>

                <strong>
                  {skill}
                </strong>
              </div>
            ),
          )}
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section
        className={styles.section}
      >
        <div
          className={
            styles.sectionLabel
          }
        >
          <span>02</span>

          <p>
            HIRING PROCESS
          </p>
        </div>

        <div
          className={
            styles.sectionContent
          }
        >
          <h2>
            A simple process
            <br />
            from application to offer.
          </h2>

          <div
            className={styles.process}
          >
            {job.process.map(
              (step, index) => (
                <div
                  key={step}
                  className={
                    styles.processItem
                  }
                >
                  <span>
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      '0',
                    )}
                  </span>

                  <h3>{step}</h3>

                  <span
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          APPLICATION
      ===================================================== */}

      <section
        className={
          styles.application
        }
        aria-labelledby="application-title"
      >
        <div
          className={
            styles.applicationHeader
          }
        >
          <p
            className={
              styles.eyebrow
            }
          >
            APPLY FOR THIS POSITION
          </p>

          <h2 id="application-title">
            Let's build what's
            <br />
            next.
          </h2>

          <p>
            Tell us about yourself and
            why you would like to join
            Riyadvi.
          </p>
        </div>

        {submitted ? (
          <div
            className={
              styles.success
            }
            role="status"
            aria-live="polite"
          >
            <span
              className={
                styles.successNumber
              }
            >
              ✓
            </span>

            <div>
              <h3>
                Application received.
              </h3>

              <p>
                Thank you for applying
                for the{' '}
                <strong>
                  {job.title}
                </strong>{' '}
                position. Our team will
                review your application.
              </p>

              <button
                type="button"
                className={
                  styles.secondaryButton
                }
                onClick={() =>
                  setSubmitted(false)
                }
              >
                Submit another application
              </button>
            </div>
          </div>
        ) : (
          <form
            className={
              styles.applicationForm
            }
            onSubmit={handleSubmit(
              onSubmit,
            )}
            noValidate
          >
            <div
              className={
                styles.formGrid
              }
            >
              {/* NAME */}

              <div
                className={
                  styles.field
                }
              >
                <label htmlFor="name">
                  Full Name *
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  {...register('name')}
                  aria-invalid={
                    Boolean(
                      errors.name,
                    )
                  }
                  aria-describedby={
                    errors.name
                      ? 'name-error'
                      : undefined
                  }
                />

                {errors.name && (
                  <span
                    id="name-error"
                    className={
                      styles.error
                    }
                  >
                    {
                      errors.name
                        .message
                    }
                  </span>
                )}
              </div>

              {/* EMAIL */}

              <div
                className={
                  styles.field
                }
              >
                <label htmlFor="email">
                  Email Address *
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register(
                    'email',
                  )}
                  aria-invalid={
                    Boolean(
                      errors.email,
                    )
                  }
                  aria-describedby={
                    errors.email
                      ? 'email-error'
                      : undefined
                  }
                />

                {errors.email && (
                  <span
                    id="email-error"
                    className={
                      styles.error
                    }
                  >
                    {
                      errors.email
                        .message
                    }
                  </span>
                )}
              </div>

              {/* PHONE */}

              <div
                className={
                  styles.field
                }
              >
                <label htmlFor="phone">
                  Phone Number *
                </label>

                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  {...register(
                    'phone',
                  )}
                  aria-invalid={
                    Boolean(
                      errors.phone,
                    )
                  }
                  aria-describedby={
                    errors.phone
                      ? 'phone-error'
                      : undefined
                  }
                />

                {errors.phone && (
                  <span
                    id="phone-error"
                    className={
                      styles.error
                    }
                  >
                    {
                      errors.phone
                        .message
                    }
                  </span>
                )}
              </div>

              {/* PORTFOLIO */}

              <div
                className={
                  styles.field
                }
              >
                <label htmlFor="portfolio">
                  Portfolio / LinkedIn
                </label>

                <input
                  id="portfolio"
                  type="url"
                  placeholder="https://..."
                  {...register(
                    'portfolio',
                  )}
                  aria-invalid={
                    Boolean(
                      errors.portfolio,
                    )
                  }
                  aria-describedby={
                    errors.portfolio
                      ? 'portfolio-error'
                      : undefined
                  }
                />

                {errors.portfolio && (
                  <span
                    id="portfolio-error"
                    className={
                      styles.error
                    }
                  >
                    {
                      errors.portfolio
                        .message
                    }
                  </span>
                )}
              </div>

              {/* RESUME URL */}

              <div
                className={
                  styles.field
                }
              >
                <label htmlFor="resumeUrl">
                  Resume URL
                </label>

                <input
                  id="resumeUrl"
                  type="url"
                  placeholder="https://..."
                  {...register(
                    'resumeUrl',
                  )}
                  aria-invalid={
                    Boolean(
                      errors.resumeUrl,
                    )
                  }
                  aria-describedby={
                    errors.resumeUrl
                      ? 'resume-error'
                      : undefined
                  }
                />

                <span
                  className={
                    styles.fieldHint
                  }
                >
                  Upload your resume
                  somewhere accessible
                  and paste the link.
                </span>

                {errors.resumeUrl && (
                  <span
                    id="resume-error"
                    className={
                      styles.error
                    }
                  >
                    {
                      errors.resumeUrl
                        .message
                    }
                  </span>
                )}
              </div>
            </div>

            {/* COVER LETTER */}

            <div
              className={
                styles.field
              }
            >
              <label htmlFor="coverLetter">
                Why Riyadvi? *
              </label>

              <textarea
                id="coverLetter"
                rows="7"
                placeholder="Tell us about yourself, your experience and why you would like to join Riyadvi."
                {...register(
                  'coverLetter',
                )}
                aria-invalid={
                  Boolean(
                    errors.coverLetter,
                  )
                }
                aria-describedby={
                  errors.coverLetter
                    ? 'cover-letter-error'
                    : undefined
                }
              />

              {errors.coverLetter && (
                <span
                  id="cover-letter-error"
                  className={
                    styles.error
                  }
                >
                  {
                    errors.coverLetter
                      .message
                  }
                </span>
              )}
            </div>

            {/* ERROR */}

            {submitError && (
              <div
                className={
                  styles.submitError
                }
                role="alert"
              >
                {submitError}
              </div>
            )}

            {/* SUBMIT */}

            <div
              className={
                styles.formFooter
              }
            >
              <p>
                By submitting this
                application, you confirm
                that the information
                provided is accurate.
              </p>

              <button
                type="submit"
                className={
                  styles.applyButton
                }
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting
                  ? 'Submitting...'
                  : 'Submit Application'}

                <span aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default JobDetails;
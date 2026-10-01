import {
  lazy,
  Suspense,
  useState,
} from 'react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import submitLead from '../../services/leadService.js';

import styles from './Contact.module.css';

const ContactScene = lazy(
  () => import('../../three/scenes/ContactScene.jsx')
);

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(100, 'Name is too long.'),

  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(150, 'Email is too long.'),

  phone: z
    .string()
    .trim()
    .max(30, 'Phone number is too long.')
    .optional()
    .or(z.literal('')),

  company: z
    .string()
    .trim()
    .max(150, 'Company name is too long.')
    .optional()
    .or(z.literal('')),

  service: z
    .string()
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .trim()
    .max(2000, 'Message is too long.')
    .optional()
    .or(z.literal('')),
});

function Contact() {
  const [submitStatus, setSubmitStatus] = useState('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (formData) => {
    setSubmitStatus('idle');

    try {
      await submitLead({
        ...formData,
        leadType: 'contact',
      });

      setSubmitStatus('success');

      reset();
    } catch (error) {
      console.error(
        'Lead submission failed:',
        error
      );

      setSubmitStatus('error');
    }
  };

  return (
    <main className={styles.page}>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGrid}>

          {/* =================================================
              LEFT HERO CONTENT
          ================================================= */}

          <div className={styles.heroContent}>

            <div className={styles.heroEyebrow}>
              <span className={styles.eyebrowLine} />

              <span>
                LET&apos;S BUILD SOMETHING
              </span>
            </div>

            <h1 className={styles.heroTitle}>
              <span>Turn your next idea</span>

              <span className={styles.heroTitleAccent}>
                into something real.
              </span>
            </h1>

            <p className={styles.heroDescription}>
              Tell us what you are building, what you want
              to improve, or where your business needs to go
              next.
            </p>

            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className={styles.stats}>

              <div className={styles.stat}>
                <strong>700+</strong>

                <span>
                  COMPLETED
                  <br />
                  PROJECTS
                </span>
              </div>

              <div className={styles.stat}>
                <strong>300+</strong>

                <span>
                  PROJECT
                  <br />
                  PROGRESS
                </span>
              </div>

              <div className={styles.stat}>
                <strong>1,000+</strong>

                <span>
                  NUMBER OF
                  <br />
                  CLIENTS
                </span>
              </div>

              <div className={styles.stat}>
                <strong>100%</strong>

                <span>
                  CLIENT
                  <br />
                  SATISFACTION
                </span>
              </div>

            </div>

            {/* =================================================
                HERO FOOTER
            ================================================= */}

            <div className={styles.heroFooter}>

              <span>
                RIYADVI SOFTWARE TECHNOLOGIES
              </span>

              <span>
                START A CONVERSATION ↗
              </span>

            </div>

          </div>

          {/* =================================================
              3D VISUAL
          ================================================= */}

          <div className={styles.heroVisual}>

            <div className={styles.visualFrame}>

              <div className={`${styles.frameCorner} ${styles.frameTopLeft}`} />
              <div className={`${styles.frameCorner} ${styles.frameTopRight}`} />
              <div className={`${styles.frameCorner} ${styles.frameBottomLeft}`} />
              <div className={`${styles.frameCorner} ${styles.frameBottomRight}`} />

              <div className={styles.visualHeader}>
                <span>RIYADVI</span>

                <span>
                  01 / CONTACT
                </span>
              </div>

              <Suspense
                fallback={
                  <div className={styles.sceneLoading}>
                    <span />
                    LOADING SYSTEM
                  </div>
                }
              >
                <ContactScene />
              </Suspense>

              <div className={`${styles.visualLabel} ${styles.labelIdeas}`}>
                <span />
                IDEAS
              </div>

              <div className={`${styles.visualLabel} ${styles.labelTechnology}`}>
                TECHNOLOGY
                <span />
              </div>

              <div className={`${styles.visualLabel} ${styles.labelSolutions}`}>
                <span />
                SOLUTIONS
              </div>

              <div className={`${styles.visualLabel} ${styles.labelGrowth}`}>
                GROWTH
                <span />
              </div>

              <div className={styles.visualFooter}>
                <span>CONNECTED SYSTEM</span>
                <span>REAL-TIME 3D</span>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT FORM SECTION
      ===================================================== */}

      <section
        className={styles.contactSection}
        aria-labelledby="contact-project-title"
      >

        <div className={styles.sectionHeader}>

          <div>
            <p className={styles.sectionLabel}>
              START A CONVERSATION
            </p>

            <h2>
              Let&apos;s talk about
              <br />
              <span>your project.</span>
            </h2>
          </div>

          <p className={styles.sectionIntro}>
            Whether you need a new digital product, a better
            web experience or a technology strategy, tell us
            what you have in mind.
          </p>

        </div>


        <div className={styles.contactGrid}>

          {/* =================================================
              INFORMATION
          ================================================= */}

          <div className={styles.info}>

            <div className={styles.contactDetails}>

              <div className={styles.contactDetail}>

                <p className={styles.contactDetailLabel}>
                  ADDRESS
                </p>

                <address className={styles.contactDetailText}>
                  17, Aarti Arcade, Dr. Radha Krishnan Salai,
                  <br />
                  opposite AVM Rajeshwari Kalyana Mandapam,
                  <br />
                  Krishnapuram, Mylapore,
                  <br />
                  Chennai, Tamil Nadu 600004
                </address>

              </div>


              <div className={styles.contactDetail}>

                <p className={styles.contactDetailLabel}>
                  MOBILE
                </p>

                <a
                  className={styles.contactDetailLink}
                  href="tel:+918072487427"
                >
                  +91 8072487427
                </a>

              </div>


              <div className={styles.contactDetail}>

                <p className={styles.contactDetailLabel}>
                  EMAIL
                </p>

                <a
                  className={styles.contactDetailLink}
                  href="mailto:info@riyadvisoftwaretechnologies.com"
                >
                  info@riyadvisoftwaretechnologies.com
                </a>

              </div>

            </div>


            <div className={styles.infoItems}>

              <div className={styles.infoItem}>

                <span
                  className={styles.infoNumber}
                  aria-hidden="true"
                >
                  01
                </span>

                <div>
                  <h3>Consultation</h3>

                  <p>
                    Discuss your goals, challenges and project
                    requirements with our team.
                  </p>
                </div>

              </div>


              <div className={styles.infoItem}>

                <span
                  className={styles.infoNumber}
                  aria-hidden="true"
                >
                  02
                </span>

                <div>
                  <h3>Strategy</h3>

                  <p>
                    Explore the right technology and digital
                    approach for your business.
                  </p>
                </div>

              </div>


              <div className={styles.infoItem}>

                <span
                  className={styles.infoNumber}
                  aria-hidden="true"
                >
                  03
                </span>

                <div>
                  <h3>Build</h3>

                  <p>
                    Turn the agreed direction into a scalable
                    digital solution.
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <div className={styles.formWrapper}>

            <div className={styles.formCornerTopLeft} />
            <div className={styles.formCornerTopRight} />
            <div className={styles.formCornerBottomLeft} />
            <div className={styles.formCornerBottomRight} />


            <div className={styles.formHeader}>

              <p className={styles.sectionLabel}>
                PROJECT ENQUIRY
              </p>

              <h2 id="contact-project-title">
                Tell us about your project.
              </h2>

              <p>
                Fill in the details below and our team can
                understand how to help.
              </p>

            </div>


            {submitStatus === 'success' && (
              <div
                className={styles.successMessage}
                role="status"
                aria-live="polite"
              >
                <strong>
                  Enquiry received.
                </strong>

                <span>
                  Thank you. Your project details have been
                  submitted successfully.
                </span>
              </div>
            )}


            {submitStatus === 'error' && (
              <div
                className={styles.errorMessage}
                role="alert"
                aria-live="assertive"
              >
                Something went wrong while submitting your
                enquiry. Please try again.
              </div>
            )}


            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >

              {/* NAME */}

              <div className={styles.field}>

                <label htmlFor="contact-name">
                  Name
                  <span aria-hidden="true">
                    *
                  </span>
                </label>

                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name
                      ? 'contact-name-error'
                      : undefined
                  }
                  {...register('name')}
                />

                {errors.name && (
                  <p
                    id="contact-name-error"
                    className={styles.fieldError}
                    role="alert"
                  >
                    {errors.name.message}
                  </p>
                )}

              </div>


              {/* EMAIL */}

              <div className={styles.field}>

                <label htmlFor="contact-email">
                  Email
                  <span aria-hidden="true">
                    *
                  </span>
                </label>

                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email
                      ? 'contact-email-error'
                      : undefined
                  }
                  {...register('email')}
                />

                {errors.email && (
                  <p
                    id="contact-email-error"
                    className={styles.fieldError}
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}

              </div>


              {/* PHONE + COMPANY */}

              <div className={styles.row}>

                <div className={styles.field}>

                  <label htmlFor="contact-phone">
                    Phone
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone
                        ? 'contact-phone-error'
                        : undefined
                    }
                    {...register('phone')}
                  />

                  {errors.phone && (
                    <p
                      id="contact-phone-error"
                      className={styles.fieldError}
                      role="alert"
                    >
                      {errors.phone.message}
                    </p>
                  )}

                </div>


                <div className={styles.field}>

                  <label htmlFor="contact-company">
                    Company
                  </label>

                  <input
                    id="contact-company"
                    type="text"
                    placeholder="Company name"
                    autoComplete="organization"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={
                      errors.company
                        ? 'contact-company-error'
                        : undefined
                    }
                    {...register('company')}
                  />

                  {errors.company && (
                    <p
                      id="contact-company-error"
                      className={styles.fieldError}
                      role="alert"
                    >
                      {errors.company.message}
                    </p>
                  )}

                </div>

              </div>


              {/* SERVICE */}

              <div className={styles.field}>

                <label htmlFor="contact-service">
                  What do you need?
                </label>

                <select
                  id="contact-service"
                  defaultValue=""
                  {...register('service')}
                >

                  <option
                    value=""
                    disabled
                  >
                    Select a service
                  </option>

                  <option value="Web Development">
                    Web Development
                  </option>

                  <option value="App Development">
                    App Development
                  </option>

                  <option value="Digital Marketing">
                    Digital Marketing
                  </option>

                  <option value="AR / VR">
                    AR / VR
                  </option>

                  <option value="3D Modeling">
                    3D Modeling
                  </option>

                  <option value="UI / UX Design">
                    UI / UX Design
                  </option>

                </select>

              </div>


              {/* MESSAGE */}

              <div className={styles.field}>

                <label htmlFor="contact-message">
                  Project details
                </label>

                <textarea
                  id="contact-message"
                  rows="6"
                  placeholder="Tell us about your project, goals or challenges..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message
                      ? 'contact-message-error'
                      : undefined
                  }
                  {...register('message')}
                />

                {errors.message && (
                  <p
                    id="contact-message-error"
                    className={styles.fieldError}
                    role="alert"
                  >
                    {errors.message.message}
                  </p>
                )}

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >

                <span>
                  {isSubmitting
                    ? 'Sending...'
                    : 'Send Enquiry'}
                </span>

                {!isSubmitting && (
                  <span aria-hidden="true">
                    ↗
                  </span>
                )}

              </button>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Contact;
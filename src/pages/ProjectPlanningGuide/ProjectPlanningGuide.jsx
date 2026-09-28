import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import projectPlanningQuestions from '../../data/projectPlanningQuestions.js';

import {
  getPlanningSummary,
  createLeadSummary,
} from '../../utils/projectPlanning.js';

import submitLead from '../../services/leadService.js';

import styles from './ProjectPlanningGuide.module.css';

const leadSchema = z.object({
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
    .min(10, 'Please enter a valid phone number.')
    .max(30, 'Phone number is too long.')
    .regex(
      /^[+()\d\s-]+$/,
      'Please enter a valid phone number.'
    ),

  company: z
    .string()
    .trim()
    .max(150, 'Company name is too long.')
    .optional(),
});

/*
 * --------------------------------------------------
 * PDF GENERATION
 * --------------------------------------------------
 */


function ProjectPlanningGuide() {
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState({});

  const [isComplete, setIsComplete] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isGeneratingPdf, setIsGeneratingPdf] =
    useState(false);

  const [submitSuccess, setSubmitSuccess] =
    useState(false);

  const [submitError, setSubmitError] =
    useState('');

  const [submittedName, setSubmittedName] =
    useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),

    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
    },
  });

  const question =
    projectPlanningQuestions[currentQuestion];

  const selectedAnswer =
    answers[question.id];

  const progress = Math.round(
    ((currentQuestion + 1) /
      projectPlanningQuestions.length) *
      100
  );

  /*
   * --------------------------------------------------
   * ANSWER HANDLING
   * --------------------------------------------------
   */

  const handleAnswer = (optionId) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionId,
    }));
  };

  /*
   * --------------------------------------------------
   * NAVIGATION
   * --------------------------------------------------
   */

  const handleNext = () => {
    if (!selectedAnswer) {
      return;
    }

    if (
      currentQuestion <
      projectPlanningQuestions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );

      return;
    }

    setIsComplete(true);
    setSubmitError('');
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) {
      return;
    }

    setCurrentQuestion(
      (previous) => previous - 1
    );
  };

  /*
   * --------------------------------------------------
   * PLANNING SUMMARY
   * --------------------------------------------------
   */

  const getSummary = () => {
    return getPlanningSummary(
      answers,
      projectPlanningQuestions
    );
  };

  /*
   * --------------------------------------------------
   * LEAD SUBMISSION
   * --------------------------------------------------
   */

  const handleLeadSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      const leadMessage =
        createLeadSummary(
          answers,
          projectPlanningQuestions
        );

      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || '',
        service:
          'Software Project Planning Guide',
        message: leadMessage,
        leadType: 'project-planning',
      });

      setSubmittedName(formData.name);
      setSubmitSuccess(true);
      setSubmitError('');
    } catch (error) {
      console.error(
        'Project planning submission failed:',
        error
      );

      setSubmitError(
        error?.response?.data?.message ||
          'Something went wrong while submitting your project details. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!submitSuccess || isGeneratingPdf) {
      return;
    }

    setIsGeneratingPdf(true);
    setSubmitError('');

    try {
      const { default: downloadProjectPlanPdf } =
        await import('../../utils/downloadProjectPlanPdf.js');

      await downloadProjectPlanPdf(
        getSummary(),
        submittedName
      );
    } catch (error) {
      console.error(
        'Project plan PDF generation failed:',
        error
      );

      setSubmitError(
        'We could not generate the PDF right now. Please try again.'
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  /*
   * --------------------------------------------------
   * START AGAIN
   * --------------------------------------------------
   */

  const handleStartAgain = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsComplete(false);
    setSubmitSuccess(false);
    setSubmitError('');
    setSubmittedName('');

    reset({
      name: '',
      email: '',
      phone: '',
      company: '',
    });
  };

  /*
   * --------------------------------------------------
   * RESULT SCREEN
   * --------------------------------------------------
   */

  if (isComplete) {
    const summary = getSummary();

    return (
      <div className={styles.page}>
        <section
          className={styles.resultSection}
          aria-labelledby="planning-result-title"
        >
          <div className={styles.resultContainer}>
            <header
              className={styles.resultHeader}
            >
              <p className={styles.eyebrow}>
                YOUR PROJECT PLAN
              </p>

              <h1
                id="planning-result-title"
                className={styles.resultTitle}
              >
                A clearer direction
                <br />
                for your software project.
              </h1>

              <p
                className={
                  styles.resultDescription
                }
              >
                Based on your answers, here is an
                initial view of your project's
                complexity, timeline and
                recommended planning approach.
              </p>
            </header>

            {/* PROJECT SNAPSHOT */}

            <section
              className={styles.snapshotGrid}
              aria-label="Project planning snapshot"
            >
              <article
                className={styles.snapshotCard}
              >
                <span>
                  PROJECT COMPLEXITY
                </span>

                <strong>
                  {summary.complexity.label}
                </strong>

                <small>
                  Planning score:{' '}
                  {summary.complexity.totalScore}
                </small>
              </article>

              <article
                className={styles.snapshotCard}
              >
                <span>
                  TARGET TIMELINE
                </span>

                <strong>
                  {summary.timeline}
                </strong>

                <small>
                  Based on your selected
                  launch preference
                </small>
              </article>
            </section>

            {/* SELECTED REQUIREMENTS */}

            <section
              className={styles.summarySection}
              aria-labelledby="requirements-title"
            >
              <div
                className={styles.sectionHeading}
              >
                <p id="requirements-title">
                  PROJECT REQUIREMENTS
                </p>

                <span>
                  Your selected direction
                </span>
              </div>

              <div
                className={styles.requirementsList}
              >
                {summary.selectedOptions.map(
                  (item) => {
                    const questionItem =
                      projectPlanningQuestions.find(
                        (questionData) =>
                          questionData.id ===
                          item.questionId
                      );

                    return (
                      <article
                        key={item.questionId}
                        className={
                          styles.requirementItem
                        }
                      >
                        <div
                          className={
                            styles.requirementMeta
                          }
                        >
                          <span>
                            {questionItem?.number}
                          </span>

                          <small>
                            {item.category}
                          </small>
                        </div>

                        <div
                          className={
                            styles.requirementContent
                          }
                        >
                          <strong>
                            {item.optionLabel}
                          </strong>

                          <p>
                            {item.optionDescription}
                          </p>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            </section>

            {/* RECOMMENDED APPROACH */}

            <section
              className={styles.approachSection}
              aria-labelledby="approach-title"
            >
              <div
                className={styles.sectionHeading}
              >
                <p id="approach-title">
                  RECOMMENDED APPROACH
                </p>

                <span>
                  Initial planning
                  considerations
                </span>
              </div>

              <div
                className={styles.approachList}
              >
                {summary.approach.map(
                  (recommendation, index) => (
                    <article
                      key={recommendation}
                      className={
                        styles.approachItem
                      }
                    >
                      <span>
                        {String(index + 1).padStart(
                          2,
                          '0'
                        )}
                      </span>

                      <p>
                        {recommendation}
                      </p>
                    </article>
                  )
                )}
              </div>
            </section>

            {/* LEAD CAPTURE */}

            {!submitSuccess ? (
              <section
                className={styles.leadCapture}
                aria-labelledby="lead-title"
              >
                <div
                  className={styles.leadHeader}
                >
                  <p
                    className={
                      styles.leadEyebrow
                    }
                  >
                    TAKE THE NEXT STEP
                  </p>

                  <h2 id="lead-title">
                    Want to turn this plan
                    <br />
                    into a real project?
                  </h2>

                  <p>
                    Share your details and our
                    team can help refine your
                    requirements, scope and
                    development roadmap.
                  </p>
                </div>

                <form
                  className={styles.leadForm}
                  onSubmit={handleSubmit(
                    handleLeadSubmit
                  )}
                  noValidate
                >
                  {/* NAME */}

                  <div
                    className={styles.formField}
                  >
                    <label htmlFor="planning-name">
                      Name *
                    </label>

                    <input
                      id="planning-name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      aria-invalid={Boolean(
                        errors.name
                      )}
                      aria-describedby={
                        errors.name
                          ? 'planning-name-error'
                          : undefined
                      }
                      {...register('name')}
                    />

                    {errors.name && (
                      <p
                        id="planning-name-error"
                        className={
                          styles.fieldError
                        }
                        role="alert"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}

                  <div
                    className={styles.formField}
                  >
                    <label htmlFor="planning-email">
                      Email *
                    </label>

                    <input
                      id="planning-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={Boolean(
                        errors.email
                      )}
                      aria-describedby={
                        errors.email
                          ? 'planning-email-error'
                          : undefined
                      }
                      {...register('email')}
                    />

                    {errors.email && (
                      <p
                        id="planning-email-error"
                        className={
                          styles.fieldError
                        }
                        role="alert"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}

                  <div
                    className={styles.formField}
                  >
                    <label htmlFor="planning-phone">
                      Phone *
                    </label>

                    <input
                      id="planning-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      inputMode="tel"
                      aria-invalid={Boolean(
                        errors.phone
                      )}
                      aria-describedby={
                        errors.phone
                          ? 'planning-phone-error'
                          : undefined
                      }
                      {...register('phone')}
                    />

                    {errors.phone && (
                      <p
                        id="planning-phone-error"
                        className={
                          styles.fieldError
                        }
                        role="alert"
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* COMPANY */}

                  <div
                    className={styles.formField}
                  >
                    <label htmlFor="planning-company">
                      Company
                    </label>

                    <input
                      id="planning-company"
                      type="text"
                      placeholder="Company name"
                      autoComplete="organization"
                      aria-invalid={Boolean(
                        errors.company
                      )}
                      aria-describedby={
                        errors.company
                          ? 'planning-company-error'
                          : undefined
                      }
                      {...register('company')}
                    />

                    {errors.company && (
                      <p
                        id="planning-company-error"
                        className={
                          styles.fieldError
                        }
                        role="alert"
                      >
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* SUBMISSION ERROR */}

                  {submitError && (
                    <div
                      className={
                        styles.submitError
                      }
                      role="alert"
                      aria-live="assertive"
                    >
                      {submitError}
                    </div>
                  )}

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className={
                      styles.submitButton
                    }
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting
                      ? 'Submitting...'
                      : 'Get My Project Plan'}

                    {!isSubmitting && (
                      <span aria-hidden="true">
                        →
                      </span>
                    )}
                  </button>
                </form>
              </section>
            ) : (
              <div
                className={
                  styles.successMessage
                }
                role="status"
                aria-live="polite"
              >
                <span
                  className={
                    styles.successIcon
                  }
                  aria-hidden="true"
                >
                  ✓
                </span>

                <div>
                  <strong>
                    Thank you, {submittedName}.
                  </strong>

                  <p>
                    Your project planning
                    details have been submitted
                    successfully. Your
                    personalized project plan
                    is now ready to save.
                  </p>
                </div>
              </div>
            )}

            {/* RESULT ACTIONS */}

            <div
              className={styles.resultActions}
            >
              {submitSuccess && (
                <button
                  type="button"
                  className={
                    styles.downloadButton
                  }
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  aria-busy={isGeneratingPdf}
                >
                  <span aria-hidden="true">
                    ↓
                  </span>

                  {isGeneratingPdf
                    ? 'Preparing PDF...'
                    : 'Save Project Plan as PDF'}
                </button>
              )}

              <button
                type="button"
                className={
                  styles.backButton
                }
                onClick={handleStartAgain}
              >
                ↻ Start Again
              </button>
            </div>

            {submitSuccess && (
              <p
                className={
                  styles.downloadHint
                }
              >
                Your PDF will download
                automatically to your browser's
                default downloads folder.
              </p>
            )}
          </div>
        </section>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * QUESTIONNAIRE SCREEN
   * --------------------------------------------------
   */

  return (
    <div className={styles.page}>
      {/* HERO */}

      <section
        className={styles.hero}
        aria-labelledby="planning-title"
      >
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            SOFTWARE PROJECT PLANNING
          </p>

          <h1
            id="planning-title"
            className={styles.title}
          >
            Turn your idea into
            <br />
            a clearer project plan.
          </h1>

          <p className={styles.description}>
            Answer a few questions about your
            software idea, business goals and
            requirements. We'll create an initial
            planning direction to help you take
            the next step.
          </p>

          <div
            className={styles.heroMeta}
            aria-label="Planning guide information"
          >
            <span>
              {projectPlanningQuestions.length}{' '}
              QUESTIONS
            </span>

            <span aria-hidden="true">•</span>

            <span>~5 MINUTES</span>
          </div>
        </div>
      </section>

      {/* QUESTIONNAIRE */}

      <section
        className={styles.planningSection}
        aria-labelledby={`planning-question-${question.id}`}
      >
        <div
          className={styles.planningContainer}
        >
          {/* PROGRESS HEADER */}

          <div
            className={styles.progressHeader}
          >
            <div>
              <span
                className={
                  styles.questionNumber
                }
              >
                {question.number}
              </span>

              <span
                className={styles.category}
              >
                {question.category}
              </span>
            </div>

            <span
              className={styles.progressText}
            >
              {currentQuestion + 1} /{' '}
              {projectPlanningQuestions.length}
            </span>
          </div>

          {/* PROGRESS BAR */}

          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={
              projectPlanningQuestions.length
            }
            aria-valuenow={
              currentQuestion + 1
            }
            aria-label="Project planning progress"
          >
            <div
              className={styles.progressBar}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* QUESTION */}

          <div className={styles.questionArea}>
            <h2
              id={`planning-question-${question.id}`}
            >
              {question.question}
            </h2>

            <p
              className={
                styles.questionDescription
              }
            >
              {question.description}
            </p>

            {/* OPTIONS */}

            <div
              className={styles.options}
              role="group"
              aria-label={`Options for ${question.category}`}
            >
              {question.options.map(
                (option) => {
                  const isSelected =
                    selectedAnswer ===
                    option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`
                        ${styles.option}
                        ${
                          isSelected
                            ? styles.optionSelected
                            : ''
                        }
                      `}
                      onClick={() =>
                        handleAnswer(
                          option.id
                        )
                      }
                      aria-pressed={isSelected}
                    >
                      <span
                        className={
                          styles.optionIndicator
                        }
                        aria-hidden="true"
                      >
                        {isSelected ? '✓' : ''}
                      </span>

                      <span
                        className={
                          styles.optionContent
                        }
                      >
                        <strong>
                          {option.label}
                        </strong>

                        <small>
                          {option.description}
                        </small>
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* NAVIGATION */}

          <div className={styles.navigation}>
            <button
              type="button"
              className={styles.backButton}
              disabled={currentQuestion === 0}
              onClick={handlePrevious}
            >
              ← Previous
            </button>

            <button
              type="button"
              className={styles.nextButton}
              disabled={!selectedAnswer}
              onClick={handleNext}
            >
              {currentQuestion ===
              projectPlanningQuestions.length - 1
                ? 'Create My Plan'
                : 'Continue'}

              <span aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectPlanningGuide;
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import healthCheckupQuestions from '../../data/healthCheckupQuestions.js';

import {
  calculateHealthScore,
  calculateCategoryScores,
  getHealthResult,
} from '../../utils/healthCheckup.js';

import submitLead from '../../services/leadService.js';

import styles from './BusinessHealthCheckup.module.css';

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
    .max(30, 'Phone number is too long.'),
});

function BusinessHealthCheckup() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedName, setSubmittedName] = useState('');

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
    },
  });

  const question = healthCheckupQuestions[currentQuestion];

  const selectedAnswer = answers[question.id];

  /* =====================================================
     ANSWER HANDLING
  ===================================================== */

  const handleAnswer = (optionId) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionId,
    }));
  };

  /* =====================================================
     RESULT CALCULATION
  ===================================================== */

  const getResultData = () => {
    const scoreData = calculateHealthScore(
      answers,
      healthCheckupQuestions
    );

    const result = getHealthResult(
      scoreData.totalScore
    );

    return {
      ...scoreData,
      result,
    };
  };

  /* =====================================================
     LEAD SUBMISSION
  ===================================================== */

  const handleLeadSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      const {
        totalScore,
        maxScore,
        percentage,
        result,
      } = getResultData();

      const categoryScores =
        calculateCategoryScores(
          answers,
          healthCheckupQuestions
        );

      const categorySummary = categoryScores
        .map(
          (category) =>
            `${category.category}: ${category.score}/${category.maxScore}`
        )
        .join('\n');

      const leadMessage = [
        'Business Health Checkup submission.',
        '',
        `Digital Score: ${percentage}%`,
        `Score: ${totalScore}/${maxScore}`,
        `Assessment Level: ${result.level}`,
        '',
        `Result: ${result.title}`,
        '',
        result.description,
        '',
        'Category Scores:',
        categorySummary,
      ].join('\n');

      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: '',
        service: 'Business Health Checkup',
        message: leadMessage,
        leadType: 'health-checkup',
      });

      setSubmittedName(formData.name);
      setSubmitSuccess(true);
      setSubmitError('');
    } catch (error) {
      console.error(
        'Health checkup submission failed:',
        error
      );

      setSubmitError(
        error?.response?.data?.message ||
          'Something went wrong while submitting your details. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =====================================================
     RETAKE ASSESSMENT
  ===================================================== */

  const handleRetake = () => {
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
    });
  };

  /* =====================================================
     RESULT SCREEN
  ===================================================== */

  if (isComplete) {
    const {
      totalScore,
      maxScore,
      percentage,
      result,
    } = getResultData();

    const categoryScores =
      calculateCategoryScores(
        answers,
        healthCheckupQuestions
      );

    return (
      <div className={styles.page}>
        <section className={styles.resultSection}>
          <div className={styles.resultContainer}>
            {/* RESULT EYEBROW */}

            <p className={styles.eyebrow}>
              YOUR BUSINESS HEALTH RESULT
            </p>

            {/* SCORE */}

            <div
              className={styles.scoreCircle}
              aria-label={`Digital score ${percentage} percent`}
            >
              <span className={styles.scorePercentage}>
                {percentage}%
              </span>

              <span className={styles.scoreLabel}>
                DIGITAL SCORE
              </span>
            </div>

            {/* RESULT LEVEL */}

            <p className={styles.resultLevel}>
              {result.level}
            </p>

            {/* RESULT TITLE */}

            <h1 className={styles.resultTitle}>
              {result.title}
            </h1>

            {/* RESULT DESCRIPTION */}

            <p className={styles.resultDescription}>
              {result.description}
            </p>

            {/* SCORE DETAILS */}

            <div className={styles.scoreDetails}>
              <div>
                <span>YOUR SCORE</span>

                <strong>
                  {totalScore} / {maxScore}
                </strong>
              </div>

              <div>
                <span>AREAS ASSESSED</span>

                <strong>
                  {healthCheckupQuestions.length}
                </strong>
              </div>
            </div>

            {/* CATEGORY BREAKDOWN */}

            <div className={styles.categoryBreakdown}>
              <div className={styles.categoryHeader}>
                <p>YOUR DIGITAL AREAS</p>

                <span>
                  Based on your assessment responses
                </span>
              </div>

              <div className={styles.categoryList}>
                {categoryScores.map((category) => (
                  <div
                    key={category.id}
                    className={styles.categoryItem}
                  >
                    <div
                      className={styles.categoryInfo}
                    >
                      <span
                        className={
                          styles.categoryNumber
                        }
                      >
                        {category.number}
                      </span>

                      <span
                        className={
                          styles.categoryName
                        }
                      >
                        {category.category}
                      </span>
                    </div>

                    <div
                      className={
                        styles.categoryScore
                      }
                    >
                      <div
                        className={
                          styles.categoryTrack
                        }
                        aria-hidden="true"
                      >
                        <div
                          className={
                            styles.categoryBar
                          }
                          style={{
                            width: `${category.percentage}%`,
                          }}
                        />
                      </div>

                      <span>
                        {category.score}/
                        {category.maxScore}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LEAD CAPTURE */}

            {!submitSuccess ? (
              <div className={styles.leadCapture}>
                <div className={styles.leadHeader}>
                  <p className={styles.leadEyebrow}>
                    GET YOUR RESULTS
                  </p>

                  <h2>
                    Want to discuss your
                    <br />
                    digital opportunities?
                  </h2>

                  <p>
                    Share your details and our team
                    can help you understand the areas
                    identified in your assessment.
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

                  <div className={styles.formField}>
                    <label htmlFor="health-name">
                      Name{' '}
                      <span aria-hidden="true">*</span>
                    </label>

                    <input
                      id="health-name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      aria-invalid={Boolean(
                        errors.name
                      )}
                      aria-describedby={
                        errors.name
                          ? 'health-name-error'
                          : undefined
                      }
                      {...register('name')}
                    />

                    {errors.name && (
                      <p
                        id="health-name-error"
                        className={styles.fieldError}
                        role="alert"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}

                  <div className={styles.formField}>
                    <label htmlFor="health-email">
                      Email{' '}
                      <span aria-hidden="true">*</span>
                    </label>

                    <input
                      id="health-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={Boolean(
                        errors.email
                      )}
                      aria-describedby={
                        errors.email
                          ? 'health-email-error'
                          : undefined
                      }
                      {...register('email')}
                    />

                    {errors.email && (
                      <p
                        id="health-email-error"
                        className={styles.fieldError}
                        role="alert"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* PHONE */}

                  <div className={styles.formField}>
                    <label htmlFor="health-phone">
                      Phone{' '}
                      <span aria-hidden="true">*</span>
                    </label>

                    <input
                      id="health-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      inputMode="tel"
                      aria-invalid={Boolean(
                        errors.phone
                      )}
                      aria-describedby={
                        errors.phone
                          ? 'health-phone-error'
                          : undefined
                      }
                      {...register('phone')}
                    />

                    {errors.phone && (
                      <p
                        id="health-phone-error"
                        className={styles.fieldError}
                        role="alert"
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* SUBMISSION ERROR */}

                  {submitError && (
                    <div
                      className={styles.submitError}
                      role="alert"
                      aria-live="assertive"
                    >
                      {submitError}
                    </div>
                  )}

                  {/* SUBMIT BUTTON */}

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    <span>
                      {isSubmitting
                        ? 'Submitting...'
                        : 'Get My Results'}
                    </span>

                    {!isSubmitting && (
                      <span aria-hidden="true">
                        →
                      </span>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* SUCCESS STATE */

              <div
                className={styles.successMessage}
                role="status"
                aria-live="polite"
              >
                <span
                  className={styles.successIcon}
                  aria-hidden="true"
                >
                  ✓
                </span>

                <div>
                  <strong>
                    Thank you, {submittedName}.
                  </strong>

                  <p>
                    Your business health assessment
                    has been submitted successfully.
                    Our team can use your results to
                    understand how we may help.
                  </p>
                </div>
              </div>
            )}

            {/* RESULT ACTIONS */}

            <div className={styles.resultActions}>
              <button
                type="button"
                className={styles.backButton}
                onClick={handleRetake}
              >
                ↻ Retake Assessment
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* =====================================================
     QUESTIONNAIRE SCREEN
  ===================================================== */

  const progressPercentage =
    ((currentQuestion + 1) /
      healthCheckupQuestions.length) *
    100;

  return (
    <div className={styles.page}>
      {/* HERO */}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            BUSINESS HEALTH CHECKUP
          </p>

          <h1 className={styles.title}>
            Understand where your
            <br />
            business stands digitally.
          </h1>

          <p className={styles.description}>
            Answer a few questions about your business
            and technology environment to identify areas
            that may be ready for improvement.
          </p>

          <div className={styles.heroMeta}>
            <span>
              {String(
                healthCheckupQuestions.length
              ).padStart(2, '0')}{' '}
              QUESTIONS
            </span>

            <span aria-hidden="true">•</span>

            <span>~3 MINUTES</span>
          </div>
        </div>
      </section>

      {/* QUESTIONNAIRE */}

      <section
        className={styles.checkupSection}
        aria-labelledby="health-checkup-question"
      >
        <div className={styles.checkupContainer}>
          {/* PROGRESS HEADER */}

          <div
            className={styles.progressHeader}
            aria-label={`Question ${
              currentQuestion + 1
            } of ${healthCheckupQuestions.length}`}
          >
            <div>
              <span
                className={styles.questionNumber}
              >
                {question.number}
              </span>

              <span className={styles.category}>
                {question.category}
              </span>
            </div>

            <span className={styles.progressText}>
              {currentQuestion + 1} /{' '}
              {healthCheckupQuestions.length}
            </span>
          </div>

          {/* PROGRESS BAR */}

          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuemin="1"
            aria-valuemax={
              healthCheckupQuestions.length
            }
            aria-valuenow={currentQuestion + 1}
            aria-label="Assessment progress"
          >
            <div
              className={styles.progressBar}
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          {/* QUESTION */}

          <div
            className={styles.questionArea}
            role="group"
            aria-labelledby="health-checkup-question"
          >
            <h2 id="health-checkup-question">
              {question.question}
            </h2>

            {/* OPTIONS */}

            <div className={styles.options}>
              {question.options.map((option) => {
                const isSelected =
                  selectedAnswer === option.id;

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
                    aria-pressed={isSelected}
                    onClick={() =>
                      handleAnswer(option.id)
                    }
                  >
                    <span
                      className={
                        styles.optionIndicator
                      }
                      aria-hidden="true"
                    >
                      {isSelected ? '✓' : ''}
                    </span>

                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* NAVIGATION */}

          <div className={styles.navigation}>
            {/* PREVIOUS */}

            <button
              type="button"
              className={styles.backButton}
              disabled={currentQuestion === 0}
              onClick={() =>
                setCurrentQuestion(
                  (previous) => previous - 1
                )
              }
            >
              ← Previous
            </button>

            {/* NEXT / RESULT */}

            <button
              type="button"
              className={styles.nextButton}
              disabled={!selectedAnswer}
              onClick={() => {
                if (
                  currentQuestion <
                  healthCheckupQuestions.length - 1
                ) {
                  setCurrentQuestion(
                    (previous) => previous + 1
                  );

                  return;
                }

                setIsComplete(true);
              }}
            >
              <span>
                {currentQuestion ===
                healthCheckupQuestions.length - 1
                  ? 'View My Results'
                  : 'Next'}
              </span>

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

export default BusinessHealthCheckup;
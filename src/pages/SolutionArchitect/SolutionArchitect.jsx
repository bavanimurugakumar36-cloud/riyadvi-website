import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers3,
  Cpu,
  Target,
  Globe,
  RefreshCw,
  Workflow,
  Users,
  Brain,
  Box,
  Palette,
  Clock3,
  ServerCog,
  TrendingUp,
  Bot,
  PanelsTopLeft,
  Smartphone,
  Database,
  WandSparkles,
  Building2,
  Rocket,
  CheckCircle2,
  Mail,
  Phone,
  User,
  Send,
  X,
} from 'lucide-react';

import submitLead from '../../services/leadService.js';

import styles from './SolutionArchitect.module.css';

const steps = [
  {
    id: 1,
    label: 'Business Goal',
  },
  {
    id: 2,
    label: 'Challenge',
  },
  {
    id: 3,
    label: 'Experience',
  },
  {
    id: 4,
    label: 'Business Stage',
  },
];

const goalOptions = [
  {
    id: 'new-product',
    title: 'Build a new digital product',
    description:
      'Create a new website, web application, mobile application or digital platform.',
    icon: Globe,
  },
  {
    id: 'improve-product',
    title: 'Improve an existing product',
    description:
      'Modernize, redesign or improve the performance and usability of an existing product.',
    icon: RefreshCw,
  },
  {
    id: 'automate',
    title: 'Automate business processes',
    description:
      'Reduce repetitive manual work and create more efficient digital workflows.',
    icon: Workflow,
  },
  {
    id: 'engagement',
    title: 'Increase customer engagement',
    description:
      'Create better digital experiences that attract, engage and convert customers.',
    icon: Users,
  },
  {
    id: 'ai',
    title: 'Add AI or intelligent features',
    description:
      'Use AI, automation or intelligent systems to create new business capabilities.',
    icon: Brain,
  },
  {
    id: 'immersive',
    title: 'Create an immersive experience',
    description:
      'Explore 3D, AR, VR or interactive digital experiences for your business.',
    icon: Box,
  },
];

const challengeOptions = [
  {
    id: 'user-experience',
    title: 'Our user experience needs improvement',
    description:
      'Users struggle with navigation, usability, interfaces or completing important actions.',
    icon: Palette,
  },
  {
    id: 'manual-processes',
    title: 'Too many manual processes',
    description:
      'Repetitive tasks are taking time and creating unnecessary operational effort.',
    icon: Clock3,
  },
  {
    id: 'outdated-technology',
    title: 'Our technology is outdated',
    description:
      'Existing systems are difficult to maintain, scale or integrate with modern technology.',
    icon: ServerCog,
  },
  {
    id: 'customer-engagement',
    title: 'We need better customer engagement',
    description:
      'The current digital experience is not generating enough attention, interaction or leads.',
    icon: TrendingUp,
  },
  {
    id: 'intelligent-automation',
    title: 'We need intelligent automation',
    description:
      'We want to use AI or intelligent systems to improve decisions, workflows or customer experiences.',
    icon: Bot,
  },
  {
    id: 'digital-presence',
    title: 'Our digital presence needs improvement',
    description:
      'Our website or digital platform does not represent the business effectively.',
    icon: PanelsTopLeft,
  },
];

const experienceOptions = [
  {
    id: 'web',
    title: 'Web',
    description:
      'Websites, web applications, portals and digital platforms.',
    icon: Globe,
  },
  {
    id: 'mobile',
    title: 'Mobile',
    description:
      'Customer-facing or internal mobile application experiences.',
    icon: Smartphone,
  },
  {
    id: 'ai',
    title: 'AI-powered',
    description:
      'AI assistants, intelligent automation, recommendations or AI features.',
    icon: Brain,
  },
  {
    id: 'immersive',
    title: '3D / AR / VR',
    description:
      'Interactive 3D experiences, immersive interfaces and visualization.',
    icon: Box,
  },
  {
    id: 'data',
    title: 'Data / Backend',
    description:
      'APIs, databases, integrations, dashboards and backend systems.',
    icon: Database,
  },
  {
    id: 'multiple',
    title: 'Multiple experiences',
    description:
      'A connected solution combining multiple digital experiences.',
    icon: WandSparkles,
  },
];

const stageOptions = [
  {
    id: 'idea',
    title: 'Idea',
    description:
      'We are validating an idea and deciding what to build.',
    icon: Sparkles,
  },
  {
    id: 'early-stage',
    title: 'Early Stage',
    description:
      'We have started and need a strong digital foundation.',
    icon: Rocket,
  },
  {
    id: 'growing',
    title: 'Growing Business',
    description:
      'We are growing and need technology that can scale with us.',
    icon: TrendingUp,
  },
  {
    id: 'established',
    title: 'Established Business',
    description:
      'We have established operations and want to modernize or expand.',
    icon: Building2,
  },
];

function getOptionTitle(options, id) {
  return options.find((option) => option.id === id)?.title || '';
}

function buildRecommendation(answers) {
  const {
    businessGoal,
    challenge,
    experience,
    businessStage,
  } = answers;

  let primarySolution = 'Digital Business Platform';

  let services = [
    'Web Development',
    'UI / UX Design',
  ];

  let technologies = [
    'React',
    'Node.js',
    'MongoDB',
  ];

  let complexity = 'MEDIUM';

  let reason =
    'A focused digital solution can bring your business goal, user experience and technology direction together into one scalable platform.';

  if (businessGoal === 'ai') {
    primarySolution = 'AI-Powered Business Solution';

    services = [
      'AI & Intelligent Systems',
      'Web Development',
      'UI / UX Design',
    ];

    technologies = [
      'React',
      'Node.js',
      'AI Integration',
      'APIs',
      'MongoDB',
    ];

    reason =
      'Your goal indicates that intelligent capabilities should be part of the product itself, supported by a usable interface and scalable application architecture.';

    complexity = 'HIGH';
  }

  if (businessGoal === 'automate') {
    primarySolution = 'Business Automation Platform';

    services = [
      'Web Development',
      'AI & Intelligent Systems',
      'UI / UX Design',
    ];

    technologies = [
      'React',
      'Node.js',
      'REST APIs',
      'MongoDB',
      'Automation',
    ];

    reason =
      'Your primary goal is operational efficiency, so the solution should connect workflows, data and automation into a reliable digital system.';

    complexity = 'MEDIUM';
  }

  if (businessGoal === 'engagement') {
    primarySolution = 'Customer Experience Platform';

    services = [
      'UI / UX Design',
      'Web Development',
      'Digital Marketing',
    ];

    technologies = [
      'React',
      'JavaScript',
      'Analytics',
      'REST APIs',
      'MongoDB',
    ];

    reason =
      'Improving engagement requires a strong experience layer supported by measurable digital interactions and a platform designed around users.';

    complexity = 'MEDIUM';
  }

  if (businessGoal === 'immersive') {
    primarySolution = 'Immersive Digital Experience';

    services = [
      'AR / VR',
      '3D Modeling',
      'Web Development',
    ];

    technologies = [
      'Three.js',
      'React Three Fiber',
      'WebGL',
      'Blender',
      'GLTF / GLB',
    ];

    reason =
      'Your goal calls for a visual and interactive experience where 3D technology can communicate products, spaces or ideas beyond traditional interfaces.';

    complexity = 'HIGH';
  }

  if (businessGoal === 'improve-product') {
    primarySolution = 'Digital Product Modernization';

    services = [
      'UI / UX Design',
      'Web Development',
      'Performance Optimization',
    ];

    technologies = [
      'React',
      'Node.js',
      'REST APIs',
      'MongoDB',
      'Modern UI Architecture',
    ];

    reason =
      'An existing product can be improved by combining experience redesign, modern development practices and a stronger technical foundation.';

    complexity = 'MEDIUM';
  }

  if (experience === 'mobile') {
    services = [
      'App Development',
      'UI / UX Design',
      ...services.filter(
        (service) =>
          service !== 'App Development' &&
          service !== 'UI / UX Design',
      ),
    ].slice(0, 3);

    technologies = [
      'React',
      'Node.js',
      'REST APIs',
      'MongoDB',
    ];
  }

  if (experience === 'immersive') {
    services = [
      'AR / VR',
      '3D Modeling',
      'Web Development',
    ];

    technologies = [
      'Three.js',
      'React Three Fiber',
      'WebGL',
      'Blender',
      'GLTF / GLB',
    ];

    complexity = 'HIGH';
  }

  if (experience === 'ai') {
    technologies = [
      'React',
      'Node.js',
      'AI Integration',
      'REST APIs',
      'MongoDB',
    ];

    if (!services.includes('AI & Intelligent Systems')) {
      services.unshift('AI & Intelligent Systems');
    }

    services = services.slice(0, 3);

    complexity = 'HIGH';
  }

  if (experience === 'data') {
    primarySolution = 'Data & Backend Platform';

    services = [
      'Web Development',
      'AI & Intelligent Systems',
      'UI / UX Design',
    ];

    technologies = [
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'Data Architecture',
    ];
  }

  if (challenge === 'user-experience') {
    if (!services.includes('UI / UX Design')) {
      services.unshift('UI / UX Design');
    }

    services = services.slice(0, 3);
  }

  if (
    challenge === 'manual-processes' ||
    challenge === 'intelligent-automation'
  ) {
    if (!services.includes('AI & Intelligent Systems')) {
      services.unshift('AI & Intelligent Systems');
    }

    services = services.slice(0, 3);

    complexity = 'HIGH';
  }

  if (challenge === 'outdated-technology') {
    primarySolution = 'Technology Modernization Platform';

    if (!services.includes('Web Development')) {
      services.unshift('Web Development');
    }

    services = services.slice(0, 3);
  }

  if (challenge === 'customer-engagement') {
    if (!services.includes('Digital Marketing')) {
      services.push('Digital Marketing');
    }

    services = services.slice(0, 3);
  }

  if (challenge === 'digital-presence') {
    primarySolution = 'Modern Digital Presence';

    services = [
      'Web Development',
      'UI / UX Design',
      'Digital Marketing',
    ];

    technologies = [
      'React',
      'JavaScript',
      'SEO',
      'Analytics',
      'REST APIs',
    ];
  }

  if (businessStage === 'idea') {
    complexity =
      complexity === 'HIGH' ? 'HIGH' : 'FOUNDATION';
  }

  if (businessStage === 'growing') {
    if (complexity === 'FOUNDATION') {
      complexity = 'MEDIUM';
    }
  }

  if (businessStage === 'established') {
    if (complexity !== 'HIGH') {
      complexity = 'MEDIUM';
    }
  }

  return {
    primarySolution,
    services,
    technologies,
    complexity,
    reason,
  };
}

function SolutionArchitect() {
  const questionnaireRef = useRef(null);
  const consultationRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(0);

  const [answers, setAnswers] = useState({
    businessGoal: '',
    challenge: '',
    experience: '',
    businessStage: '',
  });

  const [showConsultation, setShowConsultation] =
    useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: '',
  });

  useEffect(() => {
    if (currentStep <= 0) {
      return;
    }

    window.requestAnimationFrame(() => {
      questionnaireRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [currentStep]);

  const handleStart = () => {
    setAnswers({
      businessGoal: '',
      challenge: '',
      experience: '',
      businessStage: '',
    });

    setShowConsultation(false);

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
    });

    setFormStatus({
      loading: false,
      success: false,
      error: '',
    });

    setCurrentStep(1);
  };

  const handleSelect = (field, value) => {
    setAnswers((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !answers.businessGoal) {
      return;
    }

    if (currentStep === 2 && !answers.challenge) {
      return;
    }

    if (currentStep === 3 && !answers.experience) {
      return;
    }

    if (currentStep === 4 && !answers.businessStage) {
      return;
    }

    setCurrentStep((previous) =>
      Math.min(previous + 1, 5),
    );
  };

  const handleBack = () => {
    setCurrentStep((previous) =>
      Math.max(previous - 1, 1),
    );
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleConsultationOpen = () => {
    setShowConsultation(true);

    window.requestAnimationFrame(() => {
      consultationRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  };

  const handleConsultationClose = () => {
    if (formStatus.loading) {
      return;
    }

    setShowConsultation(false);

    setFormStatus({
      loading: false,
      success: false,
      error: '',
    });
  };

  const handleConsultationSubmit = async (event) => {
    event.preventDefault();

    setFormStatus({
      loading: true,
      success: false,
      error: '',
    });

    const recommendation = buildRecommendation(answers);

    const message = `
Solution Architect Consultation

Business Goal:
${getOptionTitle(goalOptions, answers.businessGoal)}

Challenge:
${getOptionTitle(challengeOptions, answers.challenge)}

Experience:
${getOptionTitle(experienceOptions, answers.experience)}

Business Stage:
${getOptionTitle(stageOptions, answers.businessStage)}

Primary Solution:
${recommendation.primarySolution}

Recommended Riyadvi Services:
${recommendation.services.join(', ')}

Supporting Technologies:
${recommendation.technologies.join(', ')}

Project Complexity:
${recommendation.complexity}

Architecture Reason:
${recommendation.reason}
    `.trim();

    try {
      await submitLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: 'Solution Architect',
        message,
        leadType: 'contact',
      });

      setFormStatus({
        loading: false,
        success: true,
        error: '',
      });
    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error:
          error?.response?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again.',
      });
    }
  };

  const isQuestionnaireVisible = currentStep > 0;

  const recommendation =
    currentStep === 5
      ? buildRecommendation(answers)
      : null;

  return (
    <div className={styles.page}>
      {/* =========================================
          HERO
      ========================================= */}

      <section className={styles.hero}>
        <div className={styles.heroGrid} />

        <div className={styles.heroOrb} />

        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />

            <span>RIYADVI SOLUTION ARCHITECT™</span>
          </div>

          <h1 className={styles.heroTitle}>
            Discover the
            <span>right technology</span>
            for your business.
          </h1>

          <p className={styles.heroDescription}>
            Tell us about your business, your challenges and what you
            want to achieve. Our Solution Architect will map your needs
            to a personalized digital solution.
          </p>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleStart}
          >
            <span>
              {isQuestionnaireVisible
                ? 'Restart Solution'
                : 'Build My Solution'}
            </span>

            <ArrowRight size={18} strokeWidth={1.8} />
          </button>

          <div className={styles.heroNote}>
            <Sparkles size={14} />

            <span>Takes approximately 2 minutes</span>
          </div>
        </div>

        <div className={styles.architectureVisual}>
          <div
            className={`${styles.orbit} ${styles.orbitOne}`}
          />

          <div
            className={`${styles.orbit} ${styles.orbitTwo}`}
          />

          <div
            className={`${styles.orbit} ${styles.orbitThree}`}
          />

          <div className={styles.centerCore}>
            <div className={styles.coreGlow} />

            <span>R</span>
          </div>

          <div
            className={`${styles.node} ${styles.nodeTop}`}
          >
            <Target size={17} />

            <span>GOAL</span>
          </div>

          <div
            className={`${styles.node} ${styles.nodeRight}`}
          >
            <Cpu size={17} />

            <span>TECH</span>
          </div>

          <div
            className={`${styles.node} ${styles.nodeBottom}`}
          >
            <Layers3 size={17} />

            <span>SOLUTION</span>
          </div>

          <div
            className={`${styles.node} ${styles.nodeLeft}`}
          >
            <Sparkles size={17} />

            <span>EXPERIENCE</span>
          </div>
        </div>
      </section>

      {/* =========================================
          QUESTIONNAIRE
      ========================================= */}

      {isQuestionnaireVisible && currentStep < 5 && (
        <section
          ref={questionnaireRef}
          className={styles.questionnaire}
        >
          <div className={styles.questionnaireInner}>
            <div className={styles.questionnaireHeader}>
              <div>
                <span className={styles.sectionLabel}>
                  SOLUTION ARCHITECT
                </span>

                <h2>
                  Let&apos;s understand your business.
                </h2>
              </div>

              <span className={styles.stepCounter}>
                STEP {currentStep} / {steps.length}
              </span>
            </div>

            <div className={styles.progress}>
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`${styles.progressItem} ${
                    index < currentStep
                      ? styles.progressItemActive
                      : ''
                  }`}
                >
                  <span className={styles.progressNumber}>
                    {String(step.id).padStart(2, '0')}
                  </span>

                  <span className={styles.progressLabel}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1 */}

            {currentStep === 1 && (
              <div className={styles.questionArea}>
                <div className={styles.questionIntro}>
                  <span className={styles.questionNumber}>
                    01
                  </span>

                  <div>
                    <h3>
                      What are you trying to achieve?
                    </h3>

                    <p>
                      Start with the business outcome you want to create.
                      You don&apos;t need to know the technology yet.
                    </p>
                  </div>
                </div>

                <div className={styles.optionGrid}>
                  {goalOptions.map((option) => {
                    const Icon = option.icon;

                    const isSelected =
                      answers.businessGoal === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`${styles.optionCard} ${
                          isSelected
                            ? styles.optionCardSelected
                            : ''
                        }`}
                        onClick={() =>
                          handleSelect(
                            'businessGoal',
                            option.id,
                          )
                        }
                        aria-pressed={isSelected}
                      >
                        <div className={styles.optionIcon}>
                          <Icon
                            size={21}
                            strokeWidth={1.7}
                          />
                        </div>

                        <div className={styles.optionContent}>
                          <h4>{option.title}</h4>

                          <p>{option.description}</p>
                        </div>

                        <span
                          className={styles.optionIndicator}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className={styles.questionActions}>
                  <button
                    type="button"
                    className={styles.nextButton}
                    onClick={handleNext}
                    disabled={!answers.businessGoal}
                  >
                    <span>Continue</span>

                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}

            {currentStep === 2 && (
              <div className={styles.questionArea}>
                <div className={styles.questionIntro}>
                  <span className={styles.questionNumber}>
                    02
                  </span>

                  <div>
                    <h3>
                      What is your biggest challenge?
                    </h3>

                    <p>
                      Understanding the main obstacle helps us identify
                      the type of solution your business actually needs.
                    </p>
                  </div>
                </div>

                <div className={styles.optionGrid}>
                  {challengeOptions.map((option) => {
                    const Icon = option.icon;

                    const isSelected =
                      answers.challenge === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`${styles.optionCard} ${
                          isSelected
                            ? styles.optionCardSelected
                            : ''
                        }`}
                        onClick={() =>
                          handleSelect(
                            'challenge',
                            option.id,
                          )
                        }
                        aria-pressed={isSelected}
                      >
                        <div className={styles.optionIcon}>
                          <Icon
                            size={21}
                            strokeWidth={1.7}
                          />
                        </div>

                        <div className={styles.optionContent}>
                          <h4>{option.title}</h4>

                          <p>{option.description}</p>
                        </div>

                        <span
                          className={styles.optionIndicator}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className={styles.questionActions}>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={handleBack}
                  >
                    <ArrowLeft size={17} />

                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    className={styles.nextButton}
                    onClick={handleNext}
                    disabled={!answers.challenge}
                  >
                    <span>Continue</span>

                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}

            {currentStep === 3 && (
              <div className={styles.questionArea}>
                <div className={styles.questionIntro}>
                  <span className={styles.questionNumber}>
                    03
                  </span>

                  <div>
                    <h3>
                      What kind of experience do you need?
                    </h3>

                    <p>
                      Choose the digital experience that best represents
                      what you want to create.
                    </p>
                  </div>
                </div>

                <div className={styles.optionGrid}>
                  {experienceOptions.map((option) => {
                    const Icon = option.icon;

                    const isSelected =
                      answers.experience === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`${styles.optionCard} ${
                          isSelected
                            ? styles.optionCardSelected
                            : ''
                        }`}
                        onClick={() =>
                          handleSelect(
                            'experience',
                            option.id,
                          )
                        }
                        aria-pressed={isSelected}
                      >
                        <div className={styles.optionIcon}>
                          <Icon
                            size={21}
                            strokeWidth={1.7}
                          />
                        </div>

                        <div className={styles.optionContent}>
                          <h4>{option.title}</h4>

                          <p>{option.description}</p>
                        </div>

                        <span
                          className={styles.optionIndicator}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className={styles.questionActions}>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={handleBack}
                  >
                    <ArrowLeft size={17} />

                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    className={styles.nextButton}
                    onClick={handleNext}
                    disabled={!answers.experience}
                  >
                    <span>Continue</span>

                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 */}

            {currentStep === 4 && (
              <div className={styles.questionArea}>
                <div className={styles.questionIntro}>
                  <span className={styles.questionNumber}>
                    04
                  </span>

                  <div>
                    <h3>
                      Where is your business today?
                    </h3>

                    <p>
                      Your business stage helps us shape the scale,
                      complexity and direction of the recommended solution.
                    </p>
                  </div>
                </div>

                <div className={styles.optionGrid}>
                  {stageOptions.map((option) => {
                    const Icon = option.icon;

                    const isSelected =
                      answers.businessStage === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`${styles.optionCard} ${
                          isSelected
                            ? styles.optionCardSelected
                            : ''
                        }`}
                        onClick={() =>
                          handleSelect(
                            'businessStage',
                            option.id,
                          )
                        }
                        aria-pressed={isSelected}
                      >
                        <div className={styles.optionIcon}>
                          <Icon
                            size={21}
                            strokeWidth={1.7}
                          />
                        </div>

                        <div className={styles.optionContent}>
                          <h4>{option.title}</h4>

                          <p>{option.description}</p>
                        </div>

                        <span
                          className={styles.optionIndicator}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className={styles.questionActions}>
                  <button
                    type="button"
                    className={styles.backButton}
                    onClick={handleBack}
                  >
                    <ArrowLeft size={17} />

                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    className={styles.nextButton}
                    onClick={handleNext}
                    disabled={!answers.businessStage}
                  >
                    <span>Build My Architecture</span>

                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================
          RESULT
      ========================================= */}

      {currentStep === 5 && recommendation && (
        <section
          ref={questionnaireRef}
          className={styles.resultSection}
        >
          <div className={styles.resultInner}>
            <div className={styles.resultHeader}>
              <div>
                <span className={styles.sectionLabel}>
                  YOUR SOLUTION ARCHITECTURE
                </span>

                <h2>
                  Here&apos;s a technology direction
                  <span>built around your needs.</span>
                </h2>
              </div>

              <div className={styles.resultBadge}>
                <CheckCircle2 size={17} />

                <span>ANALYSIS COMPLETE</span>
              </div>
            </div>

            <div className={styles.solutionMap}>
              <div className={styles.solutionMapLine} />

              <div className={styles.solutionNode}>
                <span className={styles.solutionNodeLabel}>
                  BUSINESS GOAL
                </span>

                <strong>
                  {getOptionTitle(
                    goalOptions,
                    answers.businessGoal,
                  )}
                </strong>
              </div>

              <div className={styles.solutionArrow}>
                <ArrowRight size={18} />
              </div>

              <div className={styles.solutionNode}>
                <span className={styles.solutionNodeLabel}>
                  CHALLENGE
                </span>

                <strong>
                  {getOptionTitle(
                    challengeOptions,
                    answers.challenge,
                  )}
                </strong>
              </div>

              <div className={styles.solutionArrow}>
                <ArrowRight size={18} />
              </div>

              <div className={styles.solutionNode}>
                <span className={styles.solutionNodeLabel}>
                  EXPERIENCE
                </span>

                <strong>
                  {getOptionTitle(
                    experienceOptions,
                    answers.experience,
                  )}
                </strong>
              </div>

              <div className={styles.solutionArrow}>
                <ArrowRight size={18} />
              </div>

              <div
                className={`${styles.solutionNode} ${styles.solutionNodeFinal}`}
              >
                <span className={styles.solutionNodeLabel}>
                  RIYADVI SOLUTION
                </span>

                <strong>
                  {recommendation.primarySolution}
                </strong>
              </div>
            </div>

            <div className={styles.primarySolution}>
              <span className={styles.sectionLabel}>
                PRIMARY SOLUTION
              </span>

              <h3>
                {recommendation.primarySolution}
              </h3>

              <p>{recommendation.reason}</p>
            </div>

            <div className={styles.resultGrid}>
              <div className={styles.resultCard}>
                <span className={styles.resultCardLabel}>
                  RECOMMENDED RIYADVI SERVICES
                </span>

                <div className={styles.resultList}>
                  {recommendation.services.map(
                    (service, index) => (
                      <div
                        key={service}
                        className={styles.resultListItem}
                      >
                        <span>
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <strong>{service}</strong>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className={styles.resultCard}>
                <span className={styles.resultCardLabel}>
                  SUPPORTING TECHNOLOGIES
                </span>

                <div className={styles.techList}>
                  {recommendation.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                        className={styles.techTag}
                      >
                        {technology}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className={styles.resultCard}>
                <span className={styles.resultCardLabel}>
                  PROJECT COMPLEXITY
                </span>

                <div className={styles.complexityValue}>
                  {recommendation.complexity}
                </div>

                <p>
                  Complexity is estimated from your selected business
                  objective, challenge, experience and business stage.
                </p>
              </div>
            </div>

            {/* =====================================
                CONSULTATION CTA
            ===================================== */}

            <div className={styles.resultCta}>
              <div>
                <span className={styles.sectionLabel}>
                  RECOMMENDED NEXT STEP
                </span>

                <h3>
                  Let&apos;s turn the architecture into a real project.
                </h3>

                <p>
                  Share your details and the Riyadvi team can review
                  your personalized solution architecture.
                </p>
              </div>

              <div className={styles.resultActions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleConsultationOpen}
                >
                  <span>Book a Free Consultation</span>

                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={handleStart}
                >
                  <RefreshCw size={17} />

                  <span>Start Again</span>
                </button>
              </div>
            </div>

            {/* =====================================
                CONSULTATION FORM
            ===================================== */}

            {showConsultation && (
              <div
                ref={consultationRef}
                className={styles.consultationPanel}
              >
                <div className={styles.consultationHeader}>
                  <div>
                    <span className={styles.sectionLabel}>
                      FREE CONSULTATION
                    </span>

                    <h3>
                      Send your solution architecture.
                    </h3>

                    <p>
                      We&apos;ll receive your selected requirements
                      together with your contact details.
                    </p>
                  </div>

                  {!formStatus.loading && (
                    <button
                      type="button"
                      className={styles.closeButton}
                      onClick={handleConsultationClose}
                      aria-label="Close consultation form"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>

                {formStatus.success ? (
                  <div className={styles.successState}>
                    <div className={styles.successIcon}>
                      <CheckCircle2 size={34} />
                    </div>

                    <span className={styles.sectionLabel}>
                      REQUEST RECEIVED
                    </span>

                    <h3>
                      Your solution architecture has been sent.
                    </h3>

                    <p>
                      Thank you, {formData.name}. The Riyadvi team can
                      now review the solution direction you created.
                    </p>

                    <Link
                      to="/contact"
                      className={styles.secondaryButton}
                    >
                      <span>Visit Contact Page</span>

                      <ArrowRight size={17} />
                    </Link>
                  </div>
                ) : (
                  <form
                    className={styles.consultationForm}
                    onSubmit={handleConsultationSubmit}
                  >
                    <div className={styles.formGrid}>
                      <label className={styles.formField}>
                        <span>
                          <User size={14} />
                          Name
                        </span>

                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="Your name"
                          required
                          minLength={2}
                          maxLength={100}
                        />
                      </label>

                      <label className={styles.formField}>
                        <span>
                          <Mail size={14} />
                          Business Email
                        </span>

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="you@company.com"
                          required
                        />
                      </label>

                      <label className={styles.formField}>
                        <span>
                          <Phone size={14} />
                          Phone
                        </span>

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="+91 XXXXX XXXXX"
                          maxLength={30}
                        />
                      </label>

                      <label className={styles.formField}>
                        <span>
                          <Building2 size={14} />
                          Company
                        </span>

                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleFormChange}
                          placeholder="Company name"
                          maxLength={150}
                        />
                      </label>
                    </div>

                    <div className={styles.architectureSummary}>
                      <span className={styles.resultCardLabel}>
                        ARCHITECTURE BEING SUBMITTED
                      </span>

                      <div className={styles.summaryGrid}>
                        <div>
                          <small>Solution</small>

                          <strong>
                            {recommendation.primarySolution}
                          </strong>
                        </div>

                        <div>
                          <small>Complexity</small>

                          <strong>
                            {recommendation.complexity}
                          </strong>
                        </div>

                        <div>
                          <small>Experience</small>

                          <strong>
                            {getOptionTitle(
                              experienceOptions,
                              answers.experience,
                            )}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {formStatus.error && (
                      <div className={styles.formError}>
                        {formStatus.error}
                      </div>
                    )}

                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={formStatus.loading}
                    >
                      {formStatus.loading ? (
                        <>
                          <span className={styles.spinner} />

                          <span>Sending Architecture...</span>
                        </>
                      ) : (
                        <>
                          <Send size={17} />

                          <span>
                            Send My Solution Architecture
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default SolutionArchitect;
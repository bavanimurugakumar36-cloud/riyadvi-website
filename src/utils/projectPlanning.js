const COMPLEXITY_SCORES = {
  basic: 1,
  moderate: 2,
  advanced: 3,
  ai: 4,
  'not-sure': 2,
};

const INTEGRATION_SCORES = {
  none: 0,
  few: 1,
  multiple: 2,
  payments: 2,
  enterprise: 3,
};

const DESIGN_SCORES = {
  simple: 1,
  professional: 2,
  premium: 3,
  existing: 1,
  'need-guidance': 2,
};

const PLATFORM_SCORES = {
  web: 1,
  mobile: 2,
  'web-mobile': 3,
  desktop: 2,
  multiple: 3,
};

const PROJECT_TYPE_SCORES = {
  website: 1,
  mobile: 1,
  'business-software': 2,
  ecommerce: 2,
  custom: 2,
};

const TIMELINE_LABELS = {
  urgent: 'Accelerated',
  'one-three': '1–3 Months',
  'three-six': '3–6 Months',
  'six-plus': '6+ Months',
  flexible: 'Flexible',
};

const COMPLEXITY_LABELS = {
  low: 'Focused Project',
  medium: 'Moderate Complexity',
  high: 'Advanced Project',
  veryHigh: 'High-Complexity Solution',
};

const getOption = (questions = [], questionId, answerId) => {
  const question = questions.find(
    (item) => item.id === questionId
  );

  if (!question || !Array.isArray(question.options)) {
    return null;
  }

  return (
    question.options.find(
      (option) => option.id === answerId
    ) || null
  );
};

export function calculateProjectComplexity(answers = {}) {
  const featureScore =
    COMPLEXITY_SCORES[answers.features] || 0;

  const integrationScore =
    INTEGRATION_SCORES[answers.integrations] || 0;

  const designScore =
    DESIGN_SCORES[answers.design] || 0;

  const platformScore =
    PLATFORM_SCORES[answers.platforms] || 0;

  const projectTypeScore =
    PROJECT_TYPE_SCORES[answers.projectType] || 0;

  const totalScore =
    featureScore +
    integrationScore +
    designScore +
    platformScore +
    projectTypeScore;

  let level;

  if (totalScore <= 6) {
    level = 'low';
  } else if (totalScore <= 10) {
    level = 'medium';
  } else if (totalScore <= 14) {
    level = 'high';
  } else {
    level = 'veryHigh';
  }

  return {
    totalScore,
    level,
    label: COMPLEXITY_LABELS[level],
  };
}

export function getTimelineCategory(answer) {
  return (
    TIMELINE_LABELS[answer] ||
    'To Be Determined'
  );
}

export function getRecommendedApproach(answers = {}) {
  const recommendations = [];

  /*
   * PROJECT TYPE
   */
  if (answers.projectType === 'website') {
    recommendations.push(
      'A responsive web architecture should be planned around the primary user journey, content structure, performance and future scalability.'
    );
  }

  if (answers.projectType === 'mobile') {
    recommendations.push(
      'A mobile-first product strategy should be considered, with API architecture designed to support future expansion.'
    );
  }

  if (answers.projectType === 'business-software') {
    recommendations.push(
      'The solution should focus on workflow efficiency, role-based access, operational visibility and scalable business processes.'
    );
  }

  if (answers.projectType === 'ecommerce') {
    recommendations.push(
      'The architecture should prioritize product management, customer journeys, secure payments, order processing and scalable commerce workflows.'
    );
  }

  if (answers.projectType === 'custom') {
    recommendations.push(
      'A discovery-led approach is recommended to translate the specific business requirement into a clear product scope and technical architecture.'
    );
  }

  /*
   * PLATFORM
   */
  if (
    answers.platforms === 'web-mobile' ||
    answers.platforms === 'multiple'
  ) {
    recommendations.push(
      'A shared backend and reusable service architecture can help support multiple platforms efficiently.'
    );
  }

  if (answers.platforms === 'desktop') {
    recommendations.push(
      'The technical approach should account for desktop-specific application requirements while keeping the backend architecture maintainable and extensible.'
    );
  }

  /*
   * FEATURES
   */
  if (answers.features === 'ai') {
    recommendations.push(
      'The solution may benefit from an AI-enabled architecture with dedicated AI services, data processing and model integration.'
    );
  }

  if (answers.features === 'advanced') {
    recommendations.push(
      'The project should be divided into clearly defined modules with phased development and testing.'
    );
  }

  if (answers.features === 'moderate') {
    recommendations.push(
      'A modular architecture should be used so core features can be delivered progressively while keeping the product ready for future expansion.'
    );
  }

  if (answers.features === 'not-sure') {
    recommendations.push(
      'A requirements discovery phase should be used to identify the essential features before finalizing the development scope.'
    );
  }

  /*
   * INTEGRATIONS
   */
  if (answers.integrations === 'payments') {
    recommendations.push(
      'Payment architecture should include secure transaction handling, gateway integration and appropriate error and reconciliation flows.'
    );
  }

  if (answers.integrations === 'enterprise') {
    recommendations.push(
      'Integration planning should account for enterprise APIs, authentication, data synchronization and security requirements.'
    );
  }

  if (answers.integrations === 'multiple') {
    recommendations.push(
      'Third-party integrations should be planned as independent services where appropriate, with clear API contracts and failure handling.'
    );
  }

  if (answers.integrations === 'few') {
    recommendations.push(
      'External APIs should be documented and isolated behind maintainable integration services to reduce future dependency issues.'
    );
  }

  /*
   * DESIGN
   */
  if (answers.design === 'premium') {
    recommendations.push(
      'A dedicated UX/UI design phase is recommended to establish the interaction system and visual direction before development.'
    );
  }

  if (answers.design === 'need-guidance') {
    recommendations.push(
      'The project would benefit from an initial discovery and UX planning phase before the development scope is finalized.'
    );
  }

  if (answers.design === 'existing') {
    recommendations.push(
      'The existing UI/UX system should be translated into a reusable component and design system before development begins.'
    );
  }

  /*
   * BUSINESS OBJECTIVE
   */
  if (answers.businessGoal === 'new-business') {
    recommendations.push(
      'The initial roadmap should focus on validating the core product proposition and delivering the essential user journey before expanding the feature set.'
    );
  }

  if (answers.businessGoal === 'improve-process') {
    recommendations.push(
      'Workflow mapping and process automation should be considered early so the software addresses the underlying business process.'
    );
  }

  if (answers.businessGoal === 'increase-sales') {
    recommendations.push(
      'The product should prioritize conversion paths, analytics and measurable customer journeys.'
    );
  }

  if (answers.businessGoal === 'customer-experience') {
    recommendations.push(
      'User research and experience design should be prioritized to make the customer journey clear and consistent.'
    );
  }

  if (answers.businessGoal === 'scale') {
    recommendations.push(
      'The existing solution should be assessed for architecture, performance and maintainability before planning the next stage of expansion.'
    );
  }

  /*
   * TARGET USERS
   */
  if (answers.targetUsers === 'customers') {
    recommendations.push(
      'The experience should prioritize customer usability, accessibility, performance and clear conversion or task-completion paths.'
    );
  }

  if (answers.targetUsers === 'employees') {
    recommendations.push(
      'The product should prioritize efficient workflows, permissions, dashboards and productivity for internal teams.'
    );
  }

  if (answers.targetUsers === 'businesses') {
    recommendations.push(
      'The product should emphasize scalable B2B workflows, account management, permissions and integration capabilities.'
    );
  }

  if (answers.targetUsers === 'mixed') {
    recommendations.push(
      'Separate customer-facing and internal workflows should be considered while maintaining a shared and consistent backend architecture.'
    );
  }

  /*
   * TIMELINE
   */
  if (answers.timeline === 'urgent') {
    recommendations.push(
      'An accelerated delivery plan should prioritize an MVP scope, critical dependencies and clearly defined milestones before secondary features.'
    );
  }

  if (answers.timeline === 'one-three') {
    recommendations.push(
      'A focused MVP and phased implementation plan should be used to keep the initial launch scope achievable within the target window.'
    );
  }

  if (answers.timeline === 'three-six') {
    recommendations.push(
      'The project can be structured into discovery, design, development, testing and launch phases with room for iterative refinement.'
    );
  }

  if (answers.timeline === 'six-plus') {
    recommendations.push(
      'The longer timeline allows for a phased roadmap covering deeper product development, testing, optimization and future scalability.'
    );
  }

  /*
   * BUDGET
   */
  if (answers.budget === 'under-5') {
    recommendations.push(
      'A tightly controlled MVP scope should be prioritized so the most important business outcomes can be delivered within the available budget.'
    );
  }

  if (answers.budget === '5-10') {
    recommendations.push(
      'The project should prioritize core functionality first while keeping the architecture ready for later feature expansion.'
    );
  }

  if (answers.budget === '10-25') {
    recommendations.push(
      'The available scope can support a broader custom solution with structured UX, backend services, integrations and phased delivery.'
    );
  }

  if (answers.budget === '25-plus') {
    recommendations.push(
      'The project can be planned as a broader product initiative with scalable architecture, advanced integrations and a structured long-term roadmap.'
    );
  }

  if (answers.budget === 'not-decided') {
    recommendations.push(
      'A discovery phase should be used to define scope and priorities before establishing the final project budget.'
    );
  }

  /*
   * FALLBACK
   */
  if (recommendations.length === 0) {
    recommendations.push(
      'A discovery phase can be used to validate requirements, define the technical architecture and establish the development roadmap.'
    );
  }

  return recommendations;
}

export function getPlanningSummary(
  answers = {},
  questions = []
) {
  const complexity =
    calculateProjectComplexity(answers);

  const timeline = getTimelineCategory(
    answers.timeline
  );

  const approach =
    getRecommendedApproach(answers);

  const selectedOptions = questions
    .map((question) => {
      const option = getOption(
        questions,
        question.id,
        answers[question.id]
      );

      if (!option) {
        return null;
      }

      return {
        questionId: question.id,
        category: question.category,
        question: question.question,
        optionId: option.id,
        optionLabel: option.label,
        optionDescription:
          option.description,
      };
    })
    .filter(Boolean);

  return {
    complexity,
    timeline,
    approach,
    selectedOptions,
  };
}

export function createLeadSummary(
  answers = {},
  questions = []
) {
  const summary = getPlanningSummary(
    answers,
    questions
  );

  const selectedRequirements =
    summary.selectedOptions
      .map(
        (item) =>
          `${item.category}: ${item.optionLabel}`
      )
      .join('\n');

  const recommendations =
    summary.approach
      .map(
        (recommendation, index) =>
          `${index + 1}. ${recommendation}`
      )
      .join('\n');

  return [
    'Software Project Planning Guide submission.',
    '',
    `Project Complexity: ${summary.complexity.label}`,
    `Complexity Score: ${summary.complexity.totalScore}`,
    `Timeline: ${summary.timeline}`,
    '',
    'Selected Requirements:',
    selectedRequirements || 'No requirements selected.',
    '',
    'Recommended Approach:',
    recommendations,
  ].join('\n');
}
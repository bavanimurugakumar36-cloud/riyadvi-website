const projectPlanningQuestions = [
  {
    id: 'projectType',
    number: '01',
    category: 'PROJECT TYPE',
    question: 'What type of software project are you planning?',
    description:
      'Choose the option that best describes what you want to build.',
    options: [
      {
        id: 'website',
        label: 'Website / Web Application',
        description:
          'Corporate website, customer portal, SaaS platform or web-based application.',
      },
      {
        id: 'mobile',
        label: 'Mobile Application',
        description:
          'A mobile application for iOS, Android or both platforms.',
      },
      {
        id: 'business-software',
        label: 'Business Software',
        description:
          'Internal systems, management platforms, dashboards or workflow software.',
      },
      {
        id: 'ecommerce',
        label: 'E-commerce Platform',
        description:
          'Online store, marketplace or digital commerce platform.',
      },
      {
        id: 'custom',
        label: 'Custom Software Solution',
        description:
          'A specialized software product built around a specific business requirement.',
      },
    ],
  },

  {
    id: 'businessGoal',
    number: '02',
    category: 'BUSINESS OBJECTIVE',
    question: 'What is the primary goal of your project?',
    description:
      'Understanding the business objective helps shape the right solution.',
    options: [
      {
        id: 'new-business',
        label: 'Launch a New Digital Business',
        description:
          'Create a new digital product, platform or business opportunity.',
      },
      {
        id: 'improve-process',
        label: 'Improve Business Processes',
        description:
          'Automate manual work and make internal operations more efficient.',
      },
      {
        id: 'customer-experience',
        label: 'Improve Customer Experience',
        description:
          'Create better digital experiences for customers and users.',
      },
      {
        id: 'increase-sales',
        label: 'Increase Sales & Revenue',
        description:
          'Use technology to generate more leads, conversions or revenue.',
      },
      {
        id: 'scale',
        label: 'Scale an Existing Solution',
        description:
          'Improve or expand an existing digital product or platform.',
      },
    ],
  },

  {
    id: 'targetUsers',
    number: '03',
    category: 'TARGET USERS',
    question: 'Who will primarily use your software?',
    description:
      'Your users influence the product experience, architecture and feature requirements.',
    options: [
      {
        id: 'customers',
        label: 'Customers / Consumers',
        description:
          'A customer-facing application used by the general public or clients.',
      },
      {
        id: 'employees',
        label: 'Employees / Internal Teams',
        description:
          'An internal system used by employees or business teams.',
      },
      {
        id: 'businesses',
        label: 'Other Businesses',
        description:
          'A B2B product designed for other companies or organizations.',
      },
      {
        id: 'mixed',
        label: 'Customers & Internal Teams',
        description:
          'A solution with both customer-facing and internal experiences.',
      },
      {
        id: 'unknown',
        label: 'Not Decided Yet',
        description:
          'The target users are still being defined.',
      },
    ],
  },

  {
    id: 'platforms',
    number: '04',
    category: 'PLATFORMS',
    question: 'Which platforms do you need?',
    description:
      'Select the platform direction you currently have in mind.',
    options: [
      {
        id: 'web',
        label: 'Web',
        description:
          'A responsive website or web application.',
      },
      {
        id: 'mobile',
        label: 'Mobile',
        description:
          'A mobile application for smartphones or tablets.',
      },
      {
        id: 'web-mobile',
        label: 'Web + Mobile',
        description:
          'A web application together with mobile applications.',
      },
      {
        id: 'desktop',
        label: 'Desktop',
        description:
          'Software intended for desktop computers.',
      },
      {
        id: 'multiple',
        label: 'Multiple Platforms',
        description:
          'A solution that needs to operate across several platforms.',
      },
    ],
  },

  {
    id: 'features',
    number: '05',
    category: 'FEATURES',
    question: 'How complex are the features you need?',
    description:
      'This gives us an initial indication of the product complexity.',
    options: [
      {
        id: 'basic',
        label: 'Basic',
        description:
          'Core pages, forms, content and straightforward functionality.',
      },
      {
        id: 'moderate',
        label: 'Moderate',
        description:
          'User accounts, dashboards, workflows and multiple business features.',
      },
      {
        id: 'advanced',
        label: 'Advanced',
        description:
          'Complex workflows, automation, analytics or business logic.',
      },
      {
        id: 'ai',
        label: 'AI-Powered',
        description:
          'AI, machine learning, conversational interfaces or intelligent automation.',
      },
      {
        id: 'not-sure',
        label: 'Not Sure Yet',
        description:
          'You need help defining the right feature set.',
      },
    ],
  },

  {
    id: 'integrations',
    number: '06',
    category: 'INTEGRATIONS',
    question: 'Will your project need third-party integrations?',
    description:
      'Integrations can affect architecture, development effort and project planning.',
    options: [
      {
        id: 'none',
        label: 'No Integrations',
        description:
          'The product can operate independently.',
      },
      {
        id: 'few',
        label: 'A Few Integrations',
        description:
          'A small number of external services or APIs.',
      },
      {
        id: 'multiple',
        label: 'Multiple Integrations',
        description:
          'Several third-party systems, APIs or business platforms.',
      },
      {
        id: 'payments',
        label: 'Payments / Commerce',
        description:
          'Payment gateways, subscriptions or commerce-related services.',
      },
      {
        id: 'enterprise',
        label: 'Enterprise Systems',
        description:
          'ERP, CRM, authentication or other enterprise systems.',
      },
    ],
  },

  {
    id: 'design',
    number: '07',
    category: 'DESIGN',
    question: 'What level of design experience are you looking for?',
    description:
      'Design requirements help determine the UX/UI effort needed for the project.',
    options: [
      {
        id: 'simple',
        label: 'Simple & Functional',
        description:
          'A clean interface focused primarily on usability.',
      },
      {
        id: 'professional',
        label: 'Professional & Modern',
        description:
          'A polished interface aligned with a professional brand.',
      },
      {
        id: 'premium',
        label: 'Premium & Highly Interactive',
        description:
          'A distinctive experience with advanced interactions and visual design.',
      },
      {
        id: 'existing',
        label: 'I Already Have a Design',
        description:
          'Existing UI/UX designs or brand guidelines are available.',
      },
      {
        id: 'need-guidance',
        label: 'I Need Design Guidance',
        description:
          'You need help defining the user experience and visual direction.',
      },
    ],
  },

  {
    id: 'timeline',
    number: '08',
    category: 'TIMELINE',
    question: 'When would you like to launch your project?',
    description:
      'The timeline helps determine the appropriate project planning approach.',
    options: [
      {
        id: 'urgent',
        label: 'As Soon As Possible',
        description:
          'The project has an urgent business requirement.',
      },
      {
        id: 'one-three',
        label: '1–3 Months',
        description:
          'You are targeting an initial launch within one to three months.',
      },
      {
        id: 'three-six',
        label: '3–6 Months',
        description:
          'You have a medium-term project timeline.',
      },
      {
        id: 'six-plus',
        label: '6+ Months',
        description:
          'The project can be planned and developed over a longer period.',
      },
      {
        id: 'flexible',
        label: 'Flexible',
        description:
          'There is no fixed launch deadline at the moment.',
      },
    ],
  },

  {
    id: 'budget',
    number: '09',
    category: 'BUDGET',
    question: 'What is your approximate project budget?',
    description:
      'A budget range helps align the scope and implementation approach.',
    options: [
      {
        id: 'under-5',
        label: 'Under ₹5 Lakhs',
        description:
          'Suitable for focused projects with a controlled scope.',
      },
      {
        id: '5-10',
        label: '₹5–10 Lakhs',
        description:
          'Suitable for moderate custom software projects.',
      },
      {
        id: '10-25',
        label: '₹10–25 Lakhs',
        description:
          'Suitable for larger products with broader requirements.',
      },
      {
        id: '25-plus',
        label: '₹25 Lakhs+',
        description:
          'Suitable for complex or enterprise-scale initiatives.',
      },
      {
        id: 'not-decided',
        label: 'Not Decided Yet',
        description:
          'You would like guidance before defining the budget.',
      },
    ],
  },
];

export default projectPlanningQuestions;
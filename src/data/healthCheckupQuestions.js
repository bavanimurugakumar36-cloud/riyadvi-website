const healthCheckupQuestions = [
  {
    id: 'digital-presence',
    number: '01',
    category: 'Digital Presence',
    question: 'How would you describe your current digital presence?',
    options: [
      {
        id: 'limited',
        label: 'Limited or mostly offline',
        score: 1,
      },
      {
        id: 'basic',
        label: 'Basic website or social presence',
        score: 2,
      },
      {
        id: 'growing',
        label: 'Strong digital presence with room to improve',
        score: 3,
      },
      {
        id: 'advanced',
        label: 'Well-established and continuously optimized',
        score: 4,
      },
    ],
  },

  {
    id: 'business-processes',
    number: '02',
    category: 'Business Processes',
    question: 'How much of your business workflow is digitally managed?',
    options: [
      {
        id: 'manual',
        label: 'Mostly manual processes',
        score: 1,
      },
      {
        id: 'partial',
        label: 'Some processes are digital',
        score: 2,
      },
      {
        id: 'integrated',
        label: 'Most important processes are digital',
        score: 3,
      },
      {
        id: 'automated',
        label: 'Highly integrated and automated',
        score: 4,
      },
    ],
  },

  {
    id: 'customer-experience',
    number: '03',
    category: 'Customer Experience',
    question: 'How effectively does your technology support your customers?',
    options: [
      {
        id: 'low',
        label: 'We rely mainly on manual interaction',
        score: 1,
      },
      {
        id: 'basic',
        label: 'We have basic digital customer touchpoints',
        score: 2,
      },
      {
        id: 'good',
        label: 'Customers can complete many tasks digitally',
        score: 3,
      },
      {
        id: 'excellent',
        label: 'We provide a connected digital experience',
        score: 4,
      },
    ],
  },

  {
    id: 'technology',
    number: '04',
    category: 'Technology',
    question: 'How well does your current technology support business growth?',
    options: [
      {
        id: 'outdated',
        label: 'Our technology limits our growth',
        score: 1,
      },
      {
        id: 'adequate',
        label: 'It works but has limitations',
        score: 2,
      },
      {
        id: 'scalable',
        label: 'It supports our current growth',
        score: 3,
      },
      {
        id: 'future-ready',
        label: 'It is scalable and ready for future needs',
        score: 4,
      },
    ],
  },

  {
    id: 'data',
    number: '05',
    category: 'Data & Insights',
    question: 'How effectively do you use data to make business decisions?',
    options: [
      {
        id: 'minimal',
        label: 'We rarely use data',
        score: 1,
      },
      {
        id: 'basic',
        label: 'We use basic reports and metrics',
        score: 2,
      },
      {
        id: 'regular',
        label: 'We regularly use business data',
        score: 3,
      },
      {
        id: 'data-driven',
        label: 'Data is central to our decision-making',
        score: 4,
      },
    ],
  },

  {
    id: 'security',
    number: '06',
    category: 'Security & Reliability',
    question: 'How confident are you in your current digital security and reliability?',
    options: [
      {
        id: 'low',
        label: 'We have significant concerns',
        score: 1,
      },
      {
        id: 'basic',
        label: 'We have basic protection',
        score: 2,
      },
      {
        id: 'good',
        label: 'We have established security practices',
        score: 3,
      },
      {
        id: 'strong',
        label: 'Security and reliability are continuously managed',
        score: 4,
      },
    ],
  },
];

export default healthCheckupQuestions;
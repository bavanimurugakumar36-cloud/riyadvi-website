const services = [
  {
    slug: 'web-development',
    number: '01',
    title: 'Web Development',
    shortDescription:
      'High-performance websites and web applications designed to turn digital presence into business growth.',

    heroLabel: 'WEB DEVELOPMENT',
    heroTitle: 'Digital experiences engineered for growth.',
    heroDescription:
      'We design and develop high-performance websites and web applications that combine strong technology, intuitive experiences and measurable business objectives.',

    challenge:
      'Businesses need digital platforms that are fast, reliable, easy to use and capable of evolving as their requirements grow.',

    solution:
      'We combine strategy, UX design, modern frontend development and scalable backend architecture to create digital products built around real business needs.',

    capabilities: [
      'Corporate Websites',
      'Web Applications',
      'E-commerce Platforms',
      'Custom Business Platforms',
      'API Development',
      'Performance Optimization',
    ],

    industries: [
      'Technology',
      'Healthcare',
      'Education',
      'Real Estate',
      'Retail & E-commerce',
      'Professional Services',
    ],

    technologies: [
      'React',
      'Next.js',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
    ],

    process: [
      'Discovery',
      'Strategy',
      'UX & UI Design',
      'Development',
      'Testing',
      'Launch & Growth',
    ],
  },

  {
    slug: 'app-development',
    number: '02',
    title: 'App Development',
    shortDescription:
      'Mobile applications that connect businesses with their customers through intuitive digital experiences.',

    heroLabel: 'APP DEVELOPMENT',
    heroTitle: 'Mobile experiences built around your users.',
    heroDescription:
      'We create intuitive and scalable mobile applications that help businesses connect with customers, streamline operations and deliver better digital experiences.',

    challenge:
      'Businesses need mobile experiences that are simple for customers to use while remaining reliable, scalable and connected to their existing systems.',

    solution:
      'We transform business requirements into user-focused mobile applications supported by robust APIs, secure data handling and scalable architecture.',

    capabilities: [
      'Business Applications',
      'Customer Applications',
      'Cross-platform Development',
      'API Integration',
      'Authentication & Security',
      'App Performance Optimization',
    ],

    industries: [
      'Healthcare',
      'Retail',
      'Education',
      'Finance',
      'Real Estate',
      'Business Services',
    ],

    technologies: [
      'React',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
    ],

    process: [
      'Requirement Discovery',
      'Product Strategy',
      'UX & UI Design',
      'Application Development',
      'Testing',
      'Deployment & Optimization',
    ],
  },

  {
    slug: 'digital-marketing',
    number: '03',
    title: 'Digital Marketing',
    shortDescription:
      'Data-driven digital marketing strategies designed to increase visibility, engagement and qualified leads.',

    heroLabel: 'DIGITAL MARKETING',
    heroTitle: 'Digital strategies that move businesses forward.',
    heroDescription:
      'We build focused digital marketing strategies designed to improve visibility, strengthen digital presence and create meaningful opportunities for business growth.',

    challenge:
      'Businesses often struggle to turn digital visibility into consistent engagement, qualified leads and measurable business outcomes.',

    solution:
      'We combine strategy, content, search, campaigns and performance measurement to create a digital presence aligned with business objectives.',

    capabilities: [
      'Search Engine Optimization',
      'Content Strategy',
      'Social Media Marketing',
      'Paid Campaigns',
      'Lead Generation',
      'Performance Analytics',
    ],

    industries: [
      'Healthcare',
      'Real Estate',
      'Education',
      'Retail',
      'Technology',
      'Professional Services',
    ],

    technologies: [
      'Google Analytics',
      'Google Search Console',
      'Google Ads',
      'Meta Ads',
      'SEO Tools',
      'Analytics Platforms',
    ],

    process: [
      'Business & Market Analysis',
      'Digital Strategy',
      'Content Planning',
      'Campaign Execution',
      'Performance Tracking',
      'Continuous Optimization',
    ],
  },

  {
    slug: 'ar-vr',
    number: '04',
    title: 'AR / VR',
    shortDescription:
      'Immersive augmented and virtual reality experiences that bring products, spaces and ideas to life.',

    heroLabel: 'AR / VR',
    heroTitle: 'Immersive experiences beyond the screen.',
    heroDescription:
      'We create interactive AR and VR experiences that help businesses present products, spaces and ideas through immersive digital environments.',

    challenge:
      'Traditional digital experiences can make it difficult for customers to understand products, environments and concepts before making decisions.',

    solution:
      'We use immersive technologies and interactive experiences to create more engaging ways for users to explore, understand and interact with digital content.',

    capabilities: [
      'Augmented Reality Experiences',
      'Virtual Reality Experiences',
      'Interactive Product Experiences',
      'Virtual Showrooms',
      '3D Product Visualization',
      'Immersive Presentations',
    ],

    industries: [
      'Real Estate',
      'Architecture',
      'Retail',
      'Education',
      'Healthcare',
      'Manufacturing',
    ],

    technologies: [
      'Three.js',
      'React Three Fiber',
      'WebGL',
      'Blender',
      'GLTF / GLB',
      'WebXR',
    ],

    process: [
      'Concept Discovery',
      'Experience Planning',
      '3D Design',
      'Interactive Development',
      'Testing',
      'Launch & Optimization',
    ],
  },

  {
    slug: '3d-modeling',
    number: '05',
    title: '3D Modeling',
    shortDescription:
      'Detailed 3D assets and interactive visual experiences for products, architecture and digital platforms.',

    heroLabel: '3D MODELING',
    heroTitle: 'Digital worlds designed in three dimensions.',
    heroDescription:
      'We create detailed 3D assets and interactive visual experiences that help businesses communicate products, spaces and concepts with greater depth.',

    challenge:
      'Complex products, environments and concepts are often difficult to communicate effectively through traditional two-dimensional content.',

    solution:
      'We create optimized 3D assets and interactive visual experiences that can be used across websites, presentations, product experiences and immersive applications.',

    capabilities: [
      'Product Modeling',
      'Architectural Visualization',
      '3D Web Experiences',
      'Interactive 3D Assets',
      'Product Visualization',
      '3D Motion & Animation',
    ],

    industries: [
      'Architecture',
      'Real Estate',
      'Manufacturing',
      'Retail',
      'Automotive',
      'Technology',
    ],

    technologies: [
      'Blender',
      'Three.js',
      'React Three Fiber',
      'Drei',
      'WebGL',
      'GLTF / GLB',
    ],

    process: [
      'Concept & Reference',
      '3D Modeling',
      'Materials & Lighting',
      'Optimization',
      'Interactive Development',
      'Delivery',
    ],
  },

  {
    slug: 'ui-ux-design',
    number: '06',
    title: 'UI / UX Design',
    shortDescription:
      'User-centered digital experiences that combine visual quality, usability and business objectives.',

    heroLabel: 'UI / UX DESIGN',
    heroTitle: 'Experiences designed around real people.',
    heroDescription:
      'We design digital experiences that balance user needs, visual quality and business objectives to create products that are intuitive and engaging.',

    challenge:
      'A visually attractive product can still fail when users cannot understand it, navigate it or complete important tasks easily.',

    solution:
      'We combine user research, information architecture, interaction design and visual systems to create clear and purposeful digital experiences.',

    capabilities: [
      'UX Research',
      'Information Architecture',
      'Wireframing',
      'UI Design',
      'Design Systems',
      'Prototyping',
    ],

    industries: [
      'Technology',
      'Healthcare',
      'Finance',
      'Education',
      'Retail',
      'Professional Services',
    ],

    technologies: [
      'Figma',
      'FigJam',
      'Prototyping',
      'Design Systems',
      'React',
      'Responsive Design',
    ],

    process: [
      'Research',
      'Information Architecture',
      'Wireframing',
      'Visual Design',
      'Prototype & Test',
      'Design Handoff',
    ],
  },
];

export default services;
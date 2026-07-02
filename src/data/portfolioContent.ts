import type { AIAestheticTheme } from '../types';

export interface PortfolioContent {
  name: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  about: string;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    metrics: string;
    stack: string[];
  }>;
  certifications: string[];
  contact: {
    email: string;
    location: string;
    availability: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    resume: string;
  };
}

export const portfolioContent: PortfolioContent = {
  name: 'Harshjeet Chauhan',
  title: 'Data Analyst',
  heroTitle: 'Transforming Raw Data into Meaningful Business Insights.',
  heroSubtitle:
    'I turn complex datasets into clear dashboards, actionable insights, and measurable business impact with Python, SQL, Excel, Power BI, and thoughtful visualization.',
  about:
    'I am a data-focused professional who enjoys building reliable analysis pipelines, communicating insights clearly, and translating business questions into measurable outcomes. My work blends analytics, experimentation, and storytelling to support smarter decisions.',
  skills: [
    'Python',
    'SQL',
    'Excel',
    'Power BI',
    'Pandas',
    'NumPy',
    'Statistics',
    'Data Visualization'
  ],
  projects: [
    {
      title: 'Sales Performance Dashboard',
      description: 'Designed a KPI-driven Power BI dashboard that surfaced weekly revenue trends, top-performing regions, and conversion gaps.',
      metrics: '+24% faster reporting cycle',
      stack: ['Power BI', 'SQL', 'DAX']
    },
    {
      title: 'Student Performance Analysis',
      description: 'Used Python and Pandas to analyze academic outcomes, detect patterns, and present actionable recommendations.',
      metrics: 'Improved insight clarity for stakeholders',
      stack: ['Python', 'Pandas', 'NumPy']
    },
    {
      title: 'Excel Business Analytics Suite',
      description: 'Built reusable Excel models with pivot tables, charts, and forecasting logic for decision-ready reporting.',
      metrics: 'Reduced manual analysis effort',
      stack: ['Excel', 'Charts', 'Formulas']
    }
  ],
  certifications: [
    'Google Data Analytics',
    'Microsoft Power BI Data Analyst',
    'Advanced Excel for Business Analysis'
  ],
  contact: {
    email: 'harshjeetthakur66@gmail.com',
    location: 'India',
    availability: 'Available for analytics and reporting opportunities'
  },
  socialLinks: {
    github: 'https://github.com/Harsh827385',
    linkedin: 'https://www.linkedin.com/in/harsh-thakur-7a14ab348',
    resume: '/resume.pdf'
  }
};

export const portfolioTheme: AIAestheticTheme = {
  id: 'harshjeet-portfolio',
  name: 'Harshjeet Analytical',
  moodDescription:
    'A modern, recruiter-ready portfolio system with crisp typography, thoughtful spacing, and clear data-first storytelling.',
  colors: {
    primary: '#2563eb',
    secondary: '#0f172a',
    accent: '#06b6d4',
    background: '#f8fafc',
    surface: '#ffffff',
    border: '#dbe7f2',
    text: '#0f172a',
    subtext: '#475569'
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    headingStyle: 'font-semibold tracking-tight'
  },
  imageryKeywords: ['data dashboard', 'analytics', 'business intelligence'],
  brandCopy: {
    tagline: 'Data Analyst',
    elevatorPitch: 'Transforming Raw Data into Meaningful Business Insights.',
    coreValues: [
      {
        title: 'Clarity',
        description: 'I simplify complex data into precise, practical narratives.'
      },
      {
        title: 'Accuracy',
        description: 'I build analysis with careful validation and reliable structure.'
      },
      {
        title: 'Business Focus',
        description: 'Every insight is tailored to support better decisions.'
      }
    ],
    heroTitle: 'Transforming Raw Data into Meaningful Business Insights.',
    heroSubtitle:
      'I build dashboards, reports, and analytical workflows that make data easier to understand and act on.'
  },
  uiMockup: {
    layoutType: 'split',
    navigation: ['About', 'Skills', 'Projects', 'Contact'],
    callToAction: 'View Projects',
    features: [
      {
        title: 'Dashboard Design',
        description: 'Clear, executive-friendly visuals for operational and strategic reporting.',
        iconName: 'BarChart3'
      },
      {
        title: 'Data Preparation',
        description: 'Reliable cleaning, transformation, and validation for business datasets.',
        iconName: 'Database'
      },
      {
        title: 'Insight Delivery',
        description: 'Actionable recommendations that connect analysis to business outcomes.',
        iconName: 'Sparkles'
      }
    ]
  },
  createdAt: Date.now()
};

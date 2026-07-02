export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  image: string;
  completionDate: string;
  status: 'Completed' | 'In Progress';
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'sales-performance-dashboard',
    title: 'Sales Performance Dashboard',
    description: 'A KPI-driven Power BI experience that surfaces weekly revenue trends, regional performance, and conversion gaps in a single executive view.',
    technologies: ['Power BI', 'SQL', 'DAX'],
    category: 'Power BI',
    githubUrl: 'https://github.com/Harsh827385',
    liveDemoUrl: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2025',
    status: 'Completed',
    featured: true
  },
  {
    id: 'student-performance-analysis',
    title: 'Student Performance Analysis',
    description: 'A Python-based analytics workflow that investigates academic outcomes, highlights patterns, and translates insights into action.',
    technologies: ['Python', 'Pandas', 'NumPy'],
    category: 'Python',
    githubUrl: 'https://github.com/Harsh827385',
    liveDemoUrl: '',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2024',
    status: 'Completed'
  },
  {
    id: 'excel-business-suite',
    title: 'Excel Business Analytics Suite',
    description: 'Reusable Excel models with pivot tables, charts, and forecasting logic designed to support faster, decision-ready reporting.',
    technologies: ['Excel', 'Charts', 'Formulas'],
    category: 'Excel',
    githubUrl: '',
    liveDemoUrl: '',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2024',
    status: 'In Progress'
  },
  {
    id: 'customer-churn-insights',
    title: 'Customer Churn Insight Pipeline',
    description: 'An SQL and Python workflow that identifies churn signals and supports retention-focused reporting for business teams.',
    technologies: ['SQL', 'Python', 'Statistics'],
    category: 'SQL',
    githubUrl: 'https://github.com/Harsh827385',
    liveDemoUrl: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2025',
    status: 'Completed'
  },
  {
    id: 'portfolio-analytics-site',
    title: 'Portfolio Analytics Site',
    description: 'A polished portfolio experience built with React and TypeScript that showcases projects, skills, and professional storytelling.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    category: 'Web Development',
    githubUrl: 'https://github.com/Harsh827385',
    liveDemoUrl: 'https://example.com',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2026',
    status: 'Completed',
    featured: true
  },
  {
    id: 'ml-forecasting-model',
    title: 'Demand Forecasting Model',
    description: 'A machine learning prototype for forecasting demand trends using historical patterns and lightweight statistical modeling.',
    technologies: ['Python', 'Machine Learning', 'Scikit-learn'],
    category: 'Machine Learning',
    githubUrl: 'https://github.com/Harsh827385',
    liveDemoUrl: '',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80',
    completionDate: '2026',
    status: 'In Progress'
  }
];

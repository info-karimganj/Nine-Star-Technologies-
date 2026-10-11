export interface ProductFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProductUseCase {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  problem: string;
  features: ProductFeature[];
  media: string[]; // URLs or paths to screenshots/videos
  useCases: ProductUseCase[];
  technology: string[];
  availability: 'Available' | 'In Development' | 'Beta' | 'Coming Soon';
  ctaText?: string;
}

// Sample Data (Data)
export const products: Product[] = [
  {
    id: 'prod-1',
    slug: 'nexus-portal',
    title: 'Nexus Portal',
    shortDescription: 'A unified digital workspace for team collaboration and document management.',
    overview: 'Nexus Portal brings all your fragmented documents, communications, and workflows into one centralized, secure hub.',
    problem: 'Teams waste hours searching for files across different platforms, leading to duplicated work, miscommunication, and lost productivity.',
    features: [
      { title: 'Unified Search', description: 'Find any document across all connected platforms instantly.' },
      { title: 'Secure Access', description: 'Enterprise-grade permission controls and auditing.' },
      { title: 'Workflow Automation', description: 'Automate repetitive document approval processes.' }
    ],
    media: ['/placeholder-ui-1.jpg'],
    useCases: [
      { title: 'Remote Teams', description: 'Keep distributed teams aligned with a single source of truth.' },
      { title: 'Compliance', description: 'Maintain strict audit logs for regulated industries.' }
    ],
    technology: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    availability: 'Available',
    ctaText: 'Request a Demo'
  },
  {
    id: 'prod-2',
    slug: 'automate-x',
    title: 'AutomateX',
    shortDescription: 'Intelligent process automation engine for small businesses.',
    overview: 'AutomateX simplifies complex business operations by connecting your existing tools and automating data transfer between them.',
    problem: 'Small businesses struggle with manual data entry between incompatible software, leading to human error and wasted time.',
    features: [
      { title: 'Visual Builder', description: 'Drag-and-drop interface for creating workflows.' },
      { title: 'Pre-built Connectors', description: 'Integrates with over 50 popular business tools.' },
      { title: 'Error Handling', description: 'Intelligent alerts when a workflow needs human intervention.' }
    ],
    media: ['/placeholder-ui-2.jpg'],
    useCases: [
      { title: 'E-commerce', description: 'Sync inventory and orders across multiple storefronts.' },
      { title: 'Accounting', description: 'Automatically generate invoices from CRM deals.' }
    ],
    technology: ['Python', 'Vue.js', 'GraphQL'],
    availability: 'Beta',
    ctaText: 'Join the Beta'
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

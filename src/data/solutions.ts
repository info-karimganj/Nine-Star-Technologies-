export interface SolutionWorkflowStep {
  title: string;
  description: string;
}

export interface Solution {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  problem: string;
  whoNeedsIt: string[];
  solution: string;
  workflow: SolutionWorkflowStep[];
  benefits: string[];
  implementation: string;
  ctaText?: string;
}

// Sample Data (Data)
export const solutions: Solution[] = [
  {
    id: 'sol-1',
    slug: 'digital-transformation',
    title: 'Enterprise Digital Transformation',
    shortDescription: 'Modernize legacy systems and digitize paper-based workflows.',
    problem: 'Relying on outdated software and manual paper processes slows down operations, increases costs, and creates data silos that prevent informed decision-making.',
    whoNeedsIt: [
      'Traditional businesses moving online',
      'Organizations with heavy paper workflows',
      'Companies outgrowing their current software'
    ],
    solution: 'We conduct a full audit of your current processes and systematically replace inefficient legacy systems with modern, integrated digital alternatives tailored to your specific operational needs.',
    workflow: [
      { title: 'Discovery & Audit', description: 'Map out existing workflows and identify bottlenecks.' },
      { title: 'Strategy Design', description: 'Create a phased modernization roadmap.' },
      { title: 'Development & Integration', description: 'Build and connect the new digital infrastructure.' },
      { title: 'Training & Handoff', description: 'Ensure your team is comfortable with the new systems.' }
    ],
    benefits: [
      'Reduced operational costs',
      'Real-time data visibility',
      'Improved employee productivity',
      'Enhanced security and compliance'
    ],
    implementation: 'Typically 3-6 months depending on the scale of modernization required. We use a phased approach to minimize disruption to your daily operations.',
    ctaText: 'Discuss Your Transformation'
  },
  {
    id: 'sol-2',
    slug: 'custom-automation',
    title: 'Custom Business Automation',
    shortDescription: 'Bespoke automation systems to eliminate repetitive manual tasks.',
    problem: 'Your team spends hours every week copying data between systems, formatting reports, and performing repetitive tasks that a computer should be doing.',
    whoNeedsIt: [
      'Data-heavy operational teams',
      'Agencies managing multiple client platforms',
      'E-commerce businesses with complex fulfillment'
    ],
    solution: 'We build custom middleware and scripts that connect your disparate systems, allowing data to flow freely and automatically without human intervention.',
    workflow: [
      { title: 'Process Mapping', description: 'Identify the exact steps of the manual task.' },
      { title: 'API Integration', description: 'Connect the required software platforms.' },
      { title: 'Logic Implementation', description: 'Code the business rules and error handling.' },
      { title: 'Monitoring Setup', description: 'Deploy dashboards to track automated tasks.' }
    ],
    benefits: [
      'Eliminate human error in data entry',
      'Free up staff for high-value work',
      'Speed up processing times',
      'Highly scalable as volume increases'
    ],
    implementation: 'Typically 4-8 weeks. We start with the highest-ROI tasks first to deliver immediate value.',
    ctaText: 'Start Automating'
  }
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find(s => s.slug === slug);
}

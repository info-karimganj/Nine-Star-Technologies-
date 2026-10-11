export interface CaseStudyProcessStep {
  title: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  clientName: string; // Project or Client Name
  industry: string;
  shortDescription: string;
  problem: string;
  challenge: string;
  solution: string;
  process: CaseStudyProcessStep[];
  technology: string[];
  outcome: string[];
  screenshots: string[]; // Main media (hero)
  gallery: string[]; // Additional media
  relatedServices: string[]; // Array of service slugs/IDs
}

// Data Array with Datas (No Fake Social Proof)
export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-placeholder-1',
    slug: 'cms-placeholder-project',
    clientName: 'Global Logistics Corp',
    industry: '[ Industry Type ]',
    shortDescription: 'This is a clean structure placeholder. Real case studies will automatically populate this template once entered into the CMS.',
    problem: 'Explain the fundamental problem the client or project was facing before engaging 9STAR Technologies.',
    challenge: 'Detail the specific technical, timeline, or operational hurdles that made this problem difficult to solve.',
    solution: 'Describe how 9STAR Technologies approached the problem and the specific architecture or strategy that was implemented.',
    process: [
      { title: 'Discovery', description: 'Placeholder description for the initial analysis phase.' },
      { title: 'Architecture', description: 'Placeholder description for the technical planning phase.' },
      { title: 'Execution', description: 'Placeholder description for the build phase.' },
      { title: 'Delivery', description: 'Placeholder description for handoff and launch.' }
    ],
    technology: ['[ Tech 1 ]', '[ Tech 2 ]', '[ Tech 3 ]'],
    outcome: [
      '[ Tangible Result Placeholder 1 ]',
      '[ Tangible Result Placeholder 2 ]',
      '[ Tangible Result Placeholder 3 ]'
    ],
    screenshots: [],
    gallery: [],
    relatedServices: []
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug);
}

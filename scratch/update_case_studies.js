const fs = require('fs');

const caseStudies = [
  {
    id: 'cs-placeholder-1',
    slug: 'cms-placeholder-project',
    clientName: '[ CMS Placeholder: Client Name ]',
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

const caseStudiesDict = {};
caseStudies.forEach(cs => {
  const { id, ...rest } = cs;
  caseStudiesDict[id] = rest;
});

const caseStudiesPage = {
  hero: {
    title: "Our Work",
    description: "We focus on delivering tangible results. Explore our case studies to see how we tackle complex challenges and deliver robust technology solutions."
  },
  emptyState: {
    title: "No Case Studies Published Yet",
    description: "Check back later as we update our portfolio with recent projects."
  },
  list: {
    projectThumbnail: "[ Project Thumbnail ]",
    readCaseStudy: "Read Case Study"
  }
};

['en', 'bn', 'ar'].forEach(lang => {
  const path = 'src/i18n/dictionaries/' + lang + '.json';
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  data.caseStudiesData = { items: caseStudiesDict };
  data.caseStudiesPage = caseStudiesPage;
  
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
});

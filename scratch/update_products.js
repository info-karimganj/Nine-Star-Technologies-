const fs = require('fs');

const products = [
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

const productsDict = {};
products.forEach(p => {
  const { id, ...rest } = p;
  productsDict[id] = rest;
});

const productsPage = {
  hero: {
    title: "Our Products",
    description: "Software platforms and digital products designed to streamline your workflows, secure your data, and scale your operations."
  },
  list: {
    interfacePreview: "Interface Preview",
    viewDetails: "View Product Details"
  }
};

['en', 'bn', 'ar'].forEach(lang => {
  const path = 'src/i18n/dictionaries/' + lang + '.json';
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  data.productsData = { items: productsDict };
  data.productsPage = productsPage;
  
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
});

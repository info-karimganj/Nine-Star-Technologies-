const fs = require('fs');

const serviceCategories = [
  {
    id: 'documents-online',
    title: 'Documents & Online Services',
    shortDescription: 'Secure, structured document processing and online management solutions.'
  },
  {
    id: 'business-digital',
    title: 'Business & Digital Services',
    shortDescription: 'End-to-end digital transformation for modern business operations.'
  },
  {
    id: 'web-development',
    title: 'Web Development',
    shortDescription: 'High-performance, accessible, and scalable web platforms.'
  },
  {
    id: 'app-development',
    title: 'App Development',
    shortDescription: 'Native and cross-platform applications for all devices.'
  },
  {
    id: 'automation-ai',
    title: 'Automation & AI',
    shortDescription: 'Intelligent workflows and AI integrations to save time.'
  },
  {
    id: 'digital-problem-solving',
    title: 'Digital Problem Solving',
    shortDescription: 'Strategic consulting to overcome your toughest tech hurdles.'
  }
];

const services = [
  { id: 'doc-1', title: 'Digital Archiving', description: 'Convert physical documents to secure, searchable digital formats.' },
  { id: 'doc-2', title: 'Secure Cloud Storage', description: 'Encrypted, redundant cloud storage for sensitive business data.' },
  { id: 'doc-3', title: 'Document Workflows', description: 'Automated routing and approval systems for online documentation.' },
  { id: 'doc-4', title: 'Compliance Management', description: 'Ensure your documents meet regulatory and legal standards.' },
  { id: 'biz-1', title: 'Digital Transformation', description: 'Comprehensive strategies to modernize your business operations.' },
  { id: 'biz-2', title: 'IT Consulting', description: 'Expert advice on infrastructure, software, and tech investments.' },
  { id: 'biz-3', title: 'Cloud Migration', description: 'Seamless transition of your operations to cloud environments.' },
  { id: 'biz-4', title: 'Data Analytics', description: 'Turn raw business data into actionable, visual insights.' },
  { id: 'biz-5', title: 'Cybersecurity Audits', description: 'Identify and resolve security vulnerabilities in your business.' },
  { 
    id: 'web-1', 
    title: 'Corporate Websites', 
    description: 'Professional, fast, and SEO-optimized sites for your brand.', 
    longDescription: 'A corporate website is the digital face of your business. We build custom, high-performance web platforms tailored to your specific goals, ensuring maximum speed, accessibility, and reliability.',
    problemSolved: 'You have an outdated, slow, or poorly converting website that doesn\'t accurately reflect the quality of your brand or services.',
    targetAudience: 'Established businesses, growing startups, and enterprises looking for a premium online presence.',
    whatYouGet: {
      included: ['Custom UI/UX Design', 'Responsive Development', 'SEO Fundamentals', 'CMS Integration', 'Analytics Setup', 'Security Hardening'],
      notIncluded: ['Content Writing', 'Domain Name Registration', 'Ongoing Marketing']
    },
    requirements: {
      documents: ['Brand Guidelines (Logo, Colors)', 'Sitemap / Page Structure', 'Initial Copywriting (Text)'],
      prerequisites: ['Clear understanding of business goals']
    },
    process: [
      { title: 'Discovery', description: 'We analyze your business, competitors, and target audience.' },
      { title: 'Design', description: 'We create wireframes and high-fidelity mockups for your approval.' },
      { title: 'Development', description: 'We build the site using modern, fast technologies.' },
      { title: 'Testing & Launch', description: 'Rigorous quality assurance before pushing your site live.' }
    ],
    estimatedTime: '4 - 8 Weeks',
    pricing: {
      packages: [
        { name: 'Essential', description: 'Perfect for small businesses.', features: ['Up to 5 Pages', 'Custom Design', 'Mobile Responsive', 'Basic SEO'] },
        { name: 'Professional', description: 'Ideal for growing companies.', features: ['Up to 15 Pages', 'Advanced Animations', 'CMS Integration', 'Advanced SEO'] }
      ],
      addons: [
        { name: 'Additional Pages', description: 'Price per additional custom page.' },
        { name: 'E-Commerce Integration', description: 'Add a store to your corporate site.' }
      ]
    },
    faqs: [
      { question: 'Will I be able to edit the site myself?', answer: 'Yes, we integrate a user-friendly CMS so you can edit text and images easily.' },
      { question: 'Do you provide hosting?', answer: 'We can recommend hosting providers or handle the hosting for an additional monthly fee.' }
    ]
  },
  { id: 'web-2', title: 'E-Commerce Platforms', description: 'Scalable online stores with seamless payment integrations.' },
  { id: 'web-3', title: 'Custom Web Applications', description: 'Complex, interactive web apps tailored to your unique needs.' },
  { id: 'web-4', title: 'CMS Development', description: 'Easy-to-manage content systems like WordPress or Headless CMS.' },
  { id: 'web-5', title: 'Website Maintenance', description: 'Ongoing updates, security patches, and performance tuning.' },
  { id: 'web-6', title: 'UI/UX Design', description: 'User-centric interface design focused on conversions.' },
  { id: 'app-1', title: 'iOS App Development', description: 'Native applications built specifically for the Apple ecosystem.' },
  { id: 'app-2', title: 'Android App Development', description: 'High-performance applications for Android devices.' },
  { id: 'app-3', title: 'Cross-Platform Apps', description: 'React Native and Flutter apps that work on both platforms.' },
  { id: 'app-4', title: 'Enterprise Mobility', description: 'Internal apps designed to empower your mobile workforce.' },
  { id: 'ai-1', title: 'Workflow Automation', description: 'Connect your apps and automate repetitive daily tasks.' },
  { id: 'ai-2', title: 'AI Chatbots & Assistants', description: 'Intelligent conversational agents for customer support.' },
  { id: 'ai-3', title: 'Process Mining', description: 'Analyze your operations to find automation opportunities.' },
  { id: 'ai-4', title: 'Custom AI Models', description: 'Machine learning models trained on your proprietary data.' },
  { id: 'ai-5', title: 'RPA (Robotic Process Automation)', description: 'Software robots that emulate human interaction with digital systems.' },
  { id: 'prob-1', title: 'Technical Rescue', description: 'We fix broken projects, legacy codebases, and failing systems.' },
  { id: 'prob-2', title: 'Architecture Review', description: 'Evaluate and redesign your technical infrastructure.' },
  { id: 'prob-3', title: 'Emergency Support', description: 'Rapid response for critical downtime or data loss scenarios.' }
];

const categoryDict = {};
serviceCategories.forEach(c => {
  categoryDict[c.id] = { title: c.title, shortDescription: c.shortDescription };
});

const serviceDict = {};
services.forEach(s => {
  const { id, ...rest } = s;
  serviceDict[id] = rest;
});

const servicesData = {
  categories: categoryDict,
  items: serviceDict,
  common: {
    viewAllServices: 'View All Services',
    popularAndRecommended: 'Popular & Recommended',
    noServicesFound: 'No services found',
    noServicesFoundDesc: 'We couldn\'t find any services matching your search for',
    filterAll: 'All Categories',
    searchPlaceholder: 'Search services...'
  }
};

['en', 'bn', 'ar'].forEach(lang => {
  const path = 'src/i18n/dictionaries/' + lang + '.json';
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  data.servicesData = servicesData;
  
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
});

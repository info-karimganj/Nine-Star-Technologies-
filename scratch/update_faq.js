const fs = require('fs');
const path = require('path');

const dictsPath = path.join(__dirname, '../src/i18n/dictionaries');
const locales = ['en', 'bn', 'ar'];

const faqContent = {
  meta: {
    title: 'Frequently Asked Questions | 9STAR Technologies',
    description: 'Find quick answers to common questions about our services, pricing, and processes.'
  },
  hero: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find quick answers to common questions about our services, pricing, and processes.'
  },
  sidebar: {
    categories: 'Categories',
    allQuestions: 'All Questions'
  },
  emptyState: 'No questions currently populated for this category. (CMS Placeholder)',
  categories: {
    general: 'General',
    services: 'Services',
    pricing: 'Pricing',
    documents: 'Documents',
    websites: 'Websites',
    apps: 'Apps',
    automation: 'Automation',
    payments: 'Payments',
    support: 'Support',
    security: 'Security'
  },
  items: {
    general1: { category: 'general', question: 'What is 9STAR Technologies?', answer: 'We are a digital services and technology solutions provider focusing on practical problem-solving.' },
    services1: { category: 'services', question: 'Do you offer ongoing support?', answer: 'Yes, we offer maintenance and support packages for all of our deployments.' },
    pricing1: { category: 'pricing', question: 'Do you charge hourly or per project?', answer: 'We offer both depending on the project scope. Most full builds are fixed-price.' },
    websites1: { category: 'websites', question: 'Do you build custom CMS solutions?', answer: 'Yes, we build scalable architectures using modern frameworks.' },
    security1: { category: 'security', question: 'How do you handle data privacy?', answer: 'We follow strict security protocols and compliance guidelines tailored to your industry.' }
  }
};

locales.forEach(locale => {
  const filePath = path.join(dictsPath, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.faq) {
    data.faq = {};
  }
  
  if (locale === 'en' || !data.faq.meta) {
    data.faq = faqContent;
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json with faq data`);
});

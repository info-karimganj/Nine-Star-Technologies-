const fs = require('fs');
const path = require('path');

const dictsPath = path.join(__dirname, '../src/i18n/dictionaries');
const locales = ['en', 'bn', 'ar'];

const processContent = {
  meta: {
    title: 'Our Process | 9STAR Technologies',
    description: 'Learn exactly how we work, from discovery to delivery. A transparent process designed to reduce risk and guarantee results.'
  },
  hero: {
    title: 'How We Work',
    subtitle: 'We believe in total transparency. Our structured 8-step process is designed to reduce anxiety, minimize risk, and ensure you always know exactly what happens next.'
  },
  timeline: {
    title: 'The 9STAR Methodology',
    subtitle: 'A predictable, repeatable path from your initial idea to a launched solution.'
  },
  steps: {
    '01': { title: 'Discover', description: 'We start by learning about your organization, your goals, and identifying your core challenges without technical jargon.' },
    '02': { title: 'Understand', description: 'We dive deep into the specific problem to ensure we are treating the root cause, not just the symptoms.' },
    '03': { title: 'Plan', description: 'We map out a clear, step-by-step strategy including timelines, technical architecture, and exact deliverables.' },
    '04': { title: 'Request', description: 'Once the plan is approved, we formalize the project requirements and gather any necessary assets from your team.' },
    '05': { title: 'Execute', description: 'Our team builds the solution. You receive regular updates and maintain full visibility into our progress.' },
    '06': { title: 'Review', description: 'We test thoroughly and present the work for your feedback, ensuring it matches the agreed-upon specifications.' },
    '07': { title: 'Deliver', description: 'We hand over the finalized project, handle deployment, and provide necessary training for your team.' },
    '08': { title: 'Support', description: 'We provide ongoing assistance, monitoring, and maintenance to keep your systems running smoothly long-term.' }
  },
  faqSection: {
    title: 'Common Questions',
    subtitle: 'Everything you need to know before we begin.'
  },
  faqs: {
    afterContact: { question: 'What happens after I contact you?', answer: 'We typically schedule a brief, no-pressure introductory call. The goal is simply to discuss your needs, answer your initial questions, and determine if we are the right fit for your project.' },
    informationNeeded: { question: 'What information do you need?', answer: 'Initially, just a general idea of your goal or problem. Once a project begins, we will provide a clear checklist of specific assets, access credentials, or documentation required.' },
    responseWhen: { question: 'When will you respond?', answer: 'We respect your time. Our team aims to respond to all new inquiries and service requests within 1 to 2 business days.' },
    pricing: { question: 'How does pricing work?', answer: 'We believe in transparent, upfront pricing. Depending on the nature of the work, we provide a fixed project fee, a structured package, or a clear hourly estimate. No hidden surprises.' },
    revisions: { question: 'How are revisions handled?', answer: 'Each project phase includes designated review cycles. We ensure you are completely satisfied with the progress before we lock it in and move to the next phase.' },
    receiveResult: { question: 'How do I receive the final result?', answer: 'We handle the technical deployment and data migration. Upon completion, we hand off all ownership, source files (if applicable), and documentation via secure channels.' },
    afterCompletion: { question: 'What happens after completion?', answer: 'Technology requires upkeep. We offer optional support and maintenance plans to ensure your solution remains secure, updated, and optimized as your business grows.' }
  },
  cta: {
    title: 'Ready to start the process?',
    subtitle: "Submit a service request today and we'll guide you through the rest.",
    viewServices: 'View Services',
    contactUs: 'Contact Us'
  }
};

locales.forEach(locale => {
  const filePath = path.join(dictsPath, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.process) {
    data.process = {};
  }
  
  // Only override if not already present or if it's English (to ensure updates are applied)
  if (locale === 'en' || !data.process.meta) {
    data.process = processContent;
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated ${locale}.json with process data`);
});

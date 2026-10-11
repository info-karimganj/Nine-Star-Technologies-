export interface ServiceCategory {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  serviceCount: number;
}

export interface Pricing {
  type: 'FIXED' | 'STARTING_FROM' | 'CUSTOM' | 'PACKAGE' | 'ADD_ON';
  amount?: number;
  currency?: string;
  label?: string;
  packages?: { name: string; price: number; description: string; features: string[] }[];
  addons?: { name: string; price: number; description: string }[];
}

export interface Service {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  longDescription?: string;
  problemSolved?: string;
  targetAudience?: string;
  whatYouGet?: {
    included: string[];
    notIncluded: string[];
  };
  requirements?: {
    documents: string[];
    prerequisites?: string[];
  };
  process?: {
    step: number;
    title: string;
    description: string;
  }[];
  estimatedTime?: string;
  pricing?: Pricing;
  faqs?: { question: string; answer: string }[];
  relatedServiceIds?: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "documents-online",
    title: "Documents & Online Services",
    shortDescription: "Secure, structured document processing and online management solutions.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    serviceCount: 4,
  },
  {
    id: "business-digital",
    title: "Business & Digital Services",
    shortDescription: "End-to-end digital transformation for modern business operations.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    serviceCount: 5,
  },
  {
    id: "web-development",
    title: "Web Development",
    shortDescription: "High-performance, accessible, and scalable web platforms.",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    serviceCount: 6,
  },
  {
    id: "app-development",
    title: "App Development",
    shortDescription: "Native and cross-platform applications for all devices.",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    serviceCount: 4,
  },
  {
    id: "automation-ai",
    title: "Automation & AI",
    shortDescription: "Intelligent workflows and AI integrations to save time.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    serviceCount: 5,
  },
  {
    id: "digital-problem-solving",
    title: "Digital Problem Solving",
    shortDescription: "Strategic consulting to overcome your toughest tech hurdles.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    serviceCount: 3,
  }
];

export const services: Service[] = [
  // Documents & Online
  { id: "doc-1", categoryId: "documents-online", title: "Digital Archiving", description: "Convert physical documents to secure, searchable digital formats.", isPopular: true },
  { id: "doc-2", categoryId: "documents-online", title: "Secure Cloud Storage", description: "Encrypted, redundant cloud storage for sensitive business data." },
  { id: "doc-3", categoryId: "documents-online", title: "Document Workflows", description: "Automated routing and approval systems for online documentation." },
  { id: "doc-4", categoryId: "documents-online", title: "Compliance Management", description: "Ensure your documents meet regulatory and legal standards." },
  
  // Business & Digital Services
  { id: "biz-1", categoryId: "business-digital", title: "Digital Transformation", description: "Comprehensive strategies to modernize your business operations.", isRecommended: true },
  { id: "biz-2", categoryId: "business-digital", title: "IT Consulting", description: "Expert advice on infrastructure, software, and tech investments." },
  { id: "biz-3", categoryId: "business-digital", title: "Cloud Migration", description: "Seamless transition of your operations to cloud environments.", isPopular: true },
  { id: "biz-4", categoryId: "business-digital", title: "Data Analytics", description: "Turn raw business data into actionable, visual insights." },
  { id: "biz-5", categoryId: "business-digital", title: "Cybersecurity Audits", description: "Identify and resolve security vulnerabilities in your business." },
  
  // Web Development
  { 
    id: "web-1", 
    categoryId: "web-development", 
    title: "Corporate Websites", 
    description: "Professional, fast, and SEO-optimized sites for your brand.", 
    isPopular: true,
    longDescription: "A corporate website is the digital face of your business. We build custom, high-performance web platforms tailored to your specific goals, ensuring maximum speed, accessibility, and reliability.",
    problemSolved: "You have an outdated, slow, or poorly converting website that doesn't accurately reflect the quality of your brand or services.",
    targetAudience: "Established businesses, growing startups, and enterprises looking for a premium online presence.",
    whatYouGet: {
      included: ["Custom UI/UX Design", "Responsive Development", "SEO Fundamentals", "CMS Integration", "Analytics Setup", "Security Hardening"],
      notIncluded: ["Content Writing", "Domain Name Registration", "Ongoing Marketing"]
    },
    requirements: {
      documents: ["Brand Guidelines (Logo, Colors)", "Sitemap / Page Structure", "Initial Copywriting (Text)"],
      prerequisites: ["Clear understanding of business goals"]
    },
    process: [
      { step: 1, title: "Discovery", description: "We analyze your business, competitors, and target audience." },
      { step: 2, title: "Design", description: "We create wireframes and high-fidelity mockups for your approval." },
      { step: 3, title: "Development", description: "We build the site using modern, fast technologies." },
      { step: 4, title: "Testing & Launch", description: "Rigorous quality assurance before pushing your site live." }
    ],
    estimatedTime: "4 - 8 Weeks",
    pricing: {
      type: 'STARTING_FROM',
      amount: 4999,
      currency: '$',
      label: 'project',
      packages: [
        { name: "Essential", price: 4999, description: "Perfect for small businesses.", features: ["Up to 5 Pages", "Custom Design", "Mobile Responsive", "Basic SEO"] },
        { name: "Professional", price: 8999, description: "Ideal for growing companies.", features: ["Up to 15 Pages", "Advanced Animations", "CMS Integration", "Advanced SEO"] }
      ],
      addons: [
        { name: "Additional Pages", price: 300, description: "Price per additional custom page." },
        { name: "E-Commerce Integration", price: 2500, description: "Add a store to your corporate site." }
      ]
    },
    faqs: [
      { question: "Will I be able to edit the site myself?", answer: "Yes, we integrate a user-friendly CMS so you can edit text and images easily." },
      { question: "Do you provide hosting?", answer: "We can recommend hosting providers or handle the hosting for an additional monthly fee." }
    ],
    relatedServiceIds: ["web-3", "web-6", "biz-1"]
  },
  { id: "web-2", categoryId: "web-development", title: "E-Commerce Platforms", description: "Scalable online stores with seamless payment integrations." },
  { id: "web-3", categoryId: "web-development", title: "Custom Web Applications", description: "Complex, interactive web apps tailored to your unique needs.", isRecommended: true },
  { id: "web-4", categoryId: "web-development", title: "CMS Development", description: "Easy-to-manage content systems like WordPress or Headless CMS." },
  { id: "web-5", categoryId: "web-development", title: "Website Maintenance", description: "Ongoing updates, security patches, and performance tuning." },
  { id: "web-6", categoryId: "web-development", title: "UI/UX Design", description: "User-centric interface design focused on conversions." },
  
  // App Development
  { id: "app-1", categoryId: "app-development", title: "iOS App Development", description: "Native applications built specifically for the Apple ecosystem." },
  { id: "app-2", categoryId: "app-development", title: "Android App Development", description: "High-performance applications for Android devices." },
  { id: "app-3", categoryId: "app-development", title: "Cross-Platform Apps", description: "React Native and Flutter apps that work on both platforms.", isPopular: true },
  { id: "app-4", categoryId: "app-development", title: "Enterprise Mobility", description: "Internal apps designed to empower your mobile workforce." },
  
  // Automation & AI
  { id: "ai-1", categoryId: "automation-ai", title: "Workflow Automation", description: "Connect your apps and automate repetitive daily tasks.", isPopular: true, isRecommended: true },
  { id: "ai-2", categoryId: "automation-ai", title: "AI Chatbots & Assistants", description: "Intelligent conversational agents for customer support." },
  { id: "ai-3", categoryId: "automation-ai", title: "Process Mining", description: "Analyze your operations to find automation opportunities." },
  { id: "ai-4", categoryId: "automation-ai", title: "Custom AI Models", description: "Machine learning models trained on your proprietary data." },
  { id: "ai-5", categoryId: "automation-ai", title: "RPA (Robotic Process Automation)", description: "Software robots that emulate human interaction with digital systems." },
  
  // Digital Problem Solving
  { id: "prob-1", categoryId: "digital-problem-solving", title: "Technical Rescue", description: "We fix broken projects, legacy codebases, and failing systems.", isRecommended: true },
  { id: "prob-2", categoryId: "digital-problem-solving", title: "Architecture Review", description: "Evaluate and redesign your technical infrastructure." },
  { id: "prob-3", categoryId: "digital-problem-solving", title: "Emergency Support", description: "Rapid response for critical downtime or data loss scenarios." }
];

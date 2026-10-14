import { cache } from 'react';
import {
  Service,
  Product,
  Solution,
  CaseStudy,
  BlogPost,
  SiteSettings,
  FAQ,
  Testimonial,
  Category,
} from '@/types/cms';

/**
 * Clean Local/Mock Data Layer
 * 
 * This module acts as the boundary between the application and the CMS.
 * Currently, it uses mock data to power the public website.
 * When a real CMS is connected (e.g., Sanity, Strapi, Contentful), 
 * simply replace the implementation of these functions with actual API/GraphQL calls.
 * 
 * All functions return Promises to simulate network requests.
 */

// --- Mock Data Storage (Replace with real DB/CMS later) ---
export const mockCategories: Category[] = [
  {
    "id": "documents-online",
    "slug": "documents-online",
    "title": {
      "en": "Documents & Online Services"
    },
    "description": {
      "en": "Secure, structured document processing and online management solutions."
    },
    "icon": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    "order": 0,
    "isActive": true
  },
  {
    "id": "business-digital",
    "slug": "business-digital",
    "title": {
      "en": "Business & Digital Services"
    },
    "description": {
      "en": "End-to-end digital transformation for modern business operations."
    },
    "icon": "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    "order": 1,
    "isActive": true
  },
  {
    "id": "web-development",
    "slug": "web-development",
    "title": {
      "en": "Web Development"
    },
    "description": {
      "en": "High-performance, accessible, and scalable web platforms."
    },
    "icon": "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    "order": 2,
    "isActive": true
  },
  {
    "id": "app-development",
    "slug": "app-development",
    "title": {
      "en": "App Development"
    },
    "description": {
      "en": "Native and cross-platform applications for all devices."
    },
    "icon": "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    "order": 3,
    "isActive": true
  },
  {
    "id": "automation-ai",
    "slug": "automation-ai",
    "title": {
      "en": "Automation & AI"
    },
    "description": {
      "en": "Intelligent workflows and AI integrations to save time."
    },
    "icon": "M13 10V3L4 14h7v7l9-11h-7z",
    "order": 4,
    "isActive": true
  },
  {
    "id": "digital-problem-solving",
    "slug": "digital-problem-solving",
    "title": {
      "en": "Digital Problem Solving"
    },
    "description": {
      "en": "Strategic consulting to overcome your toughest tech hurdles."
    },
    "icon": "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    "order": 5,
    "isActive": true
  }
];
const mockServices: Service[] = [
  {
    "id": "doc-1",
    "slug": "doc-1",
    "categoryId": "documents-online",
    "title": {
      "en": "Digital Archiving"
    },
    "shortDescription": {
      "en": "Convert physical documents to secure, searchable digital formats."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.496Z",
    "updatedAt": "2026-10-09T02:37:06.497Z",
    "isPopular": true
  },
  {
    "id": "doc-2",
    "slug": "doc-2",
    "categoryId": "documents-online",
    "title": {
      "en": "Secure Cloud Storage"
    },
    "shortDescription": {
      "en": "Encrypted, redundant cloud storage for sensitive business data."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "doc-3",
    "slug": "doc-3",
    "categoryId": "documents-online",
    "title": {
      "en": "Document Workflows"
    },
    "shortDescription": {
      "en": "Automated routing and approval systems for online documentation."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "doc-4",
    "slug": "doc-4",
    "categoryId": "documents-online",
    "title": {
      "en": "Compliance Management"
    },
    "shortDescription": {
      "en": "Ensure your documents meet regulatory and legal standards."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "biz-1",
    "slug": "biz-1",
    "categoryId": "business-digital",
    "title": {
      "en": "Digital Transformation"
    },
    "shortDescription": {
      "en": "Comprehensive strategies to modernize your business operations."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z",
    "isRecommended": true
  },
  {
    "id": "biz-2",
    "slug": "biz-2",
    "categoryId": "business-digital",
    "title": {
      "en": "IT Consulting"
    },
    "shortDescription": {
      "en": "Expert advice on infrastructure, software, and tech investments."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "biz-3",
    "slug": "biz-3",
    "categoryId": "business-digital",
    "title": {
      "en": "Cloud Migration"
    },
    "shortDescription": {
      "en": "Seamless transition of your operations to cloud environments."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z",
    "isPopular": true
  },
  {
    "id": "biz-4",
    "slug": "biz-4",
    "categoryId": "business-digital",
    "title": {
      "en": "Data Analytics"
    },
    "shortDescription": {
      "en": "Turn raw business data into actionable, visual insights."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "biz-5",
    "slug": "biz-5",
    "categoryId": "business-digital",
    "title": {
      "en": "Cybersecurity Audits"
    },
    "shortDescription": {
      "en": "Identify and resolve security vulnerabilities in your business."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "web-1",
    "slug": "web-1",
    "categoryId": "web-development",
    "title": {
      "en": "Corporate Websites"
    },
    "shortDescription": {
      "en": "Professional, fast, and SEO-optimized sites for your brand."
    },
    "problemSolved": {
      "en": "You have an outdated, slow, or poorly converting website that doesn't accurately reflect the quality of your brand or services."
    },
    "whoIsThisFor": [
      {
        "en": "Established businesses, growing startups, and enterprises looking for a premium online presence."
      }
    ],
    "whatYouGet": [],
    "whatsIncluded": [
      {
        "en": "Custom UI/UX Design"
      },
      {
        "en": "Responsive Development"
      },
      {
        "en": "SEO Fundamentals"
      },
      {
        "en": "CMS Integration"
      },
      {
        "en": "Analytics Setup"
      },
      {
        "en": "Security Hardening"
      }
    ],
    "whatsNotIncluded": [
      {
        "en": "Content Writing"
      },
      {
        "en": "Domain Name Registration"
      },
      {
        "en": "Ongoing Marketing"
      }
    ],
    "requirements": [
      {
        "id": "req-doc-0",
        "title": {
          "en": "Document"
        },
        "description": {
          "en": "Brand Guidelines (Logo, Colors)"
        },
        "isRequired": true,
        "type": "FILE"
      },
      {
        "id": "req-doc-1",
        "title": {
          "en": "Document"
        },
        "description": {
          "en": "Sitemap / Page Structure"
        },
        "isRequired": true,
        "type": "FILE"
      },
      {
        "id": "req-doc-2",
        "title": {
          "en": "Document"
        },
        "description": {
          "en": "Initial Copywriting (Text)"
        },
        "isRequired": true,
        "type": "FILE"
      },
      {
        "id": "req-pre-0",
        "title": {
          "en": "Prerequisite"
        },
        "description": {
          "en": "Clear understanding of business goals"
        },
        "isRequired": true,
        "type": "TEXT"
      }
    ],
    "process": [
      {
        "id": "proc-1",
        "title": {
          "en": "Discovery"
        },
        "description": {
          "en": "We analyze your business, competitors, and target audience."
        },
        "order": 1
      },
      {
        "id": "proc-2",
        "title": {
          "en": "Design"
        },
        "description": {
          "en": "We create wireframes and high-fidelity mockups for your approval."
        },
        "order": 2
      },
      {
        "id": "proc-3",
        "title": {
          "en": "Development"
        },
        "description": {
          "en": "We build the site using modern, fast technologies."
        },
        "order": 3
      },
      {
        "id": "proc-4",
        "title": {
          "en": "Testing & Launch"
        },
        "description": {
          "en": "Rigorous quality assurance before pushing your site live."
        },
        "order": 4
      }
    ],
    "estimatedDeliveryTime": {
      "en": "4 - 8 Weeks"
    },
    "pricing": {
      "type": "STARTING_FROM",
      "amount": 4999,
      "currency": "$",
      "packages": [
        {
          "id": "pkg-0",
          "name": {
            "en": "Essential"
          },
          "description": {
            "en": "Perfect for small businesses."
          },
          "price": 4999,
          "currency": "$",
          "features": [
            {
              "en": "Up to 5 Pages"
            },
            {
              "en": "Custom Design"
            },
            {
              "en": "Mobile Responsive"
            },
            {
              "en": "Basic SEO"
            }
          ]
        },
        {
          "id": "pkg-1",
          "name": {
            "en": "Professional"
          },
          "description": {
            "en": "Ideal for growing companies."
          },
          "price": 8999,
          "currency": "$",
          "features": [
            {
              "en": "Up to 15 Pages"
            },
            {
              "en": "Advanced Animations"
            },
            {
              "en": "CMS Integration"
            },
            {
              "en": "Advanced SEO"
            }
          ]
        }
      ],
      "addons": [
        {
          "id": "addon-0",
          "name": {
            "en": "Additional Pages"
          },
          "description": {
            "en": "Price per additional custom page."
          },
          "price": 300,
          "currency": "$"
        },
        {
          "id": "addon-1",
          "name": {
            "en": "E-Commerce Integration"
          },
          "description": {
            "en": "Add a store to your corporate site."
          },
          "price": 2500,
          "currency": "$"
        }
      ]
    },
    "faqs": [
      {
        "id": "faq-0",
        "question": {
          "en": "Will I be able to edit the site myself?"
        },
        "answer": {
          "en": "Yes, we integrate a user-friendly CMS so you can edit text and images easily."
        }
      },
      {
        "id": "faq-1",
        "question": {
          "en": "Do you provide hosting?"
        },
        "answer": {
          "en": "We can recommend hosting providers or handle the hosting for an additional monthly fee."
        }
      }
    ],
    "relatedServiceIds": [
      "web-3",
      "web-6",
      "biz-1"
    ],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z",
    "isPopular": true
  },
  {
    "id": "web-2",
    "slug": "web-2",
    "categoryId": "web-development",
    "title": {
      "en": "E-Commerce Platforms"
    },
    "shortDescription": {
      "en": "Scalable online stores with seamless payment integrations."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "web-3",
    "slug": "web-3",
    "categoryId": "web-development",
    "title": {
      "en": "Custom Web Applications"
    },
    "shortDescription": {
      "en": "Complex, interactive web apps tailored to your unique needs."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z",
    "isRecommended": true
  },
  {
    "id": "web-4",
    "slug": "web-4",
    "categoryId": "web-development",
    "title": {
      "en": "CMS Development"
    },
    "shortDescription": {
      "en": "Easy-to-manage content systems like WordPress or Headless CMS."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "web-5",
    "slug": "web-5",
    "categoryId": "web-development",
    "title": {
      "en": "Website Maintenance"
    },
    "shortDescription": {
      "en": "Ongoing updates, security patches, and performance tuning."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "web-6",
    "slug": "web-6",
    "categoryId": "web-development",
    "title": {
      "en": "UI/UX Design"
    },
    "shortDescription": {
      "en": "User-centric interface design focused on conversions."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "app-1",
    "slug": "app-1",
    "categoryId": "app-development",
    "title": {
      "en": "iOS App Development"
    },
    "shortDescription": {
      "en": "Native applications built specifically for the Apple ecosystem."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "app-2",
    "slug": "app-2",
    "categoryId": "app-development",
    "title": {
      "en": "Android App Development"
    },
    "shortDescription": {
      "en": "High-performance applications for Android devices."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "app-3",
    "slug": "app-3",
    "categoryId": "app-development",
    "title": {
      "en": "Cross-Platform Apps"
    },
    "shortDescription": {
      "en": "React Native and Flutter apps that work on both platforms."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z",
    "isPopular": true
  },
  {
    "id": "app-4",
    "slug": "app-4",
    "categoryId": "app-development",
    "title": {
      "en": "Enterprise Mobility"
    },
    "shortDescription": {
      "en": "Internal apps designed to empower your mobile workforce."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "ai-1",
    "slug": "ai-1",
    "categoryId": "automation-ai",
    "title": {
      "en": "Workflow Automation"
    },
    "shortDescription": {
      "en": "Connect your apps and automate repetitive daily tasks."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z",
    "isPopular": true,
    "isRecommended": true
  },
  {
    "id": "ai-2",
    "slug": "ai-2",
    "categoryId": "automation-ai",
    "title": {
      "en": "AI Chatbots & Assistants"
    },
    "shortDescription": {
      "en": "Intelligent conversational agents for customer support."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "ai-3",
    "slug": "ai-3",
    "categoryId": "automation-ai",
    "title": {
      "en": "Process Mining"
    },
    "shortDescription": {
      "en": "Analyze your operations to find automation opportunities."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "ai-4",
    "slug": "ai-4",
    "categoryId": "automation-ai",
    "title": {
      "en": "Custom AI Models"
    },
    "shortDescription": {
      "en": "Machine learning models trained on your proprietary data."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "ai-5",
    "slug": "ai-5",
    "categoryId": "automation-ai",
    "title": {
      "en": "RPA (Robotic Process Automation)"
    },
    "shortDescription": {
      "en": "Software robots that emulate human interaction with digital systems."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "prob-1",
    "slug": "prob-1",
    "categoryId": "digital-problem-solving",
    "title": {
      "en": "Technical Rescue"
    },
    "shortDescription": {
      "en": "We fix broken projects, legacy codebases, and failing systems."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z",
    "isRecommended": true
  },
  {
    "id": "prob-2",
    "slug": "prob-2",
    "categoryId": "digital-problem-solving",
    "title": {
      "en": "Architecture Review"
    },
    "shortDescription": {
      "en": "Evaluate and redesign your technical infrastructure."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  },
  {
    "id": "prob-3",
    "slug": "prob-3",
    "categoryId": "digital-problem-solving",
    "title": {
      "en": "Emergency Support"
    },
    "shortDescription": {
      "en": "Rapid response for critical downtime or data loss scenarios."
    },
    "problemSolved": {
      "en": ""
    },
    "whoIsThisFor": [],
    "whatYouGet": [],
    "whatsIncluded": [],
    "whatsNotIncluded": [],
    "requirements": [],
    "process": [],
    "estimatedDeliveryTime": {
      "en": ""
    },
    "pricing": {
      "type": "CUSTOM_QUOTE",
      "packages": [],
      "addons": []
    },
    "faqs": [],
    "relatedServiceIds": [],
    "supportInformation": {
      "en": ""
    },
    "isActive": true,
    "createdAt": "2026-10-09T02:37:06.497Z",
    "updatedAt": "2026-10-09T02:37:06.497Z"
  }
];
const mockProducts: Product[] = [];
const mockSolutions: Solution[] = [];
const mockCaseStudies: CaseStudy[] = [
  {
    "id": "cs-placeholder-1",
    "slug": "cms-placeholder-project",
    "clientName": "Global Logistics Corp",
    "industry": {
      "en": "[ Industry Type ]"
    },
    "problem": {
      "en": "Explain the fundamental problem the client or project was facing before engaging 9STAR Technologies."
    },
    "challenge": {
      "en": "Detail the specific technical, timeline, or operational hurdles that made this problem difficult to solve."
    },
    "solution": {
      "en": "Describe how 9STAR Technologies approached the problem and the specific architecture or strategy that was implemented."
    },
    "process": [
      {
        "id": "cs-proc-0",
        "title": {
          "en": "Discovery"
        },
        "description": {
          "en": "Placeholder description for the initial analysis phase."
        },
        "order": 0
      },
      {
        "id": "cs-proc-1",
        "title": {
          "en": "Architecture"
        },
        "description": {
          "en": "Placeholder description for the technical planning phase."
        },
        "order": 1
      },
      {
        "id": "cs-proc-2",
        "title": {
          "en": "Execution"
        },
        "description": {
          "en": "Placeholder description for the build phase."
        },
        "order": 2
      },
      {
        "id": "cs-proc-3",
        "title": {
          "en": "Delivery"
        },
        "description": {
          "en": "Placeholder description for handoff and launch."
        },
        "order": 3
      }
    ],
    "technology": [
      "[ Tech 1 ]",
      "[ Tech 2 ]",
      "[ Tech 3 ]"
    ],
    "outcome": [
      {
        "en": "[ Tangible Result Placeholder 1 ]"
      },
      {
        "en": "[ Tangible Result Placeholder 2 ]"
      },
      {
        "en": "[ Tangible Result Placeholder 3 ]"
      }
    ],
    "screenshots": [],
    "gallery": [],
    "relatedServiceIds": [],
    "isPublished": true,
    "publishDate": "2026-10-09T02:37:06.497Z"
  }
];
const mockBlogPosts: BlogPost[] = [];
const mockFaqs: FAQ[] = [];
const mockTestimonials: Testimonial[] = [];

const mockSiteSettings: SiteSettings = {
  contactEmail: 'mdyasinarafath20@gmail.com',
  contactPhone: '+8801988941753',
  whatsappNumber: '+8801988941753',
  supportEmail: 'mdyasinarafath20@gmail.com',
  businessHours: {
    en: 'Mon - Fri: 9:00 AM - 6:00 PM (BST)',
    bn: 'সোম - শুক্র (অফিস সময়)',
    ar: 'الاثنين - الجمعة (ساعات العمل الرسمية)',
  },
  officeAddress: {
    en: 'Dhaka · Singapore · London',
    bn: 'ঢাকা · সিঙ্গাপুর · লন্ডন',
    ar: 'دكا · سنغافورة · لندن',
  },
  socialLinks: {
    facebook: 'https://facebook.com/9star',
    twitter: 'https://twitter.com/9star',
    linkedin: 'https://linkedin.com/company/9star',
  },
  globalSeo: {
    title: {
      en: '9STAR Technologies',
      bn: 'নাইনস্টার টেকনোলজিস',
      ar: 'ناين ستار للتقنية',
    },
    description: {
      en: 'Empowering businesses with cutting-edge software and automation.',
      bn: 'অত্যাধুনিক সফটওয়্যার এবং অটোমেশনের মাধ্যমে ব্যবসাকে শক্তিশালী করা।',
      ar: 'تمكين الشركات بأحدث البرمجيات والأتمتة.',
    },
  },
};

// --- API Methods ---

import { db } from '@/lib/db';

// Categories
export const getCategories = cache(async function() {
  try {
    const { getSupabaseServerClient } = await import('@/lib/supabase');
    const supabase = getSupabaseServerClient();
    const { data } = await supabase.from('categories').select('*').eq('is_active', true).order('sort_order', { ascending: true });
    if (data && data.length > 0) {
      const existingIds = new Set(data.map((c: any) => c.id));
      const dbCats = data.map((c: any) => ({
        id: c.id,
        slug: c.slug,
        title: typeof c.title === 'string' ? JSON.parse(c.title) : c.title,
        description: typeof c.description === 'string' ? JSON.parse(c.description) : c.description,
        icon: c.icon,
        order: c.sort_order ?? 0,
        isActive: c.is_active ?? true,
      }));
      const remainingMocks = mockCategories.filter((m) => !existingIds.has(m.id));
      return [...dbCats, ...remainingMocks];
    }
  } catch (_) {}

  try {
    const list = db.categories.getAll();
    return list.length > 0 ? list : mockCategories;
  } catch {
    return mockCategories;
  }
});

// Services
export const getServices = cache(async function() {
  // 1. Fetch live from Supabase cloud database
  try {
    const { getSupabaseServices } = await import('@/lib/supabase-services');
    const supabaseServices = await getSupabaseServices(false);
    if (supabaseServices && supabaseServices.length > 0) {
      const existingIds = new Set(supabaseServices.map((s) => s.id));
      const existingSlugs = new Set(supabaseServices.map((s) => s.slug));
      const remainingMocks = mockServices.filter((m) => !existingIds.has(m.id) && !existingSlugs.has(m.slug));
      return [...supabaseServices, ...remainingMocks];
    }
  } catch (_) {}

  // 2. Fallback to local db or mock
  try {
    const list = db.services.getAll(false);
    return list.length > 0 ? list : mockServices;
  } catch {
    return mockServices;
  }
});

export const getServiceBySlug = cache(async function(slug: string) {
  // 1. Fetch live from Supabase
  try {
    const { getSupabaseServiceByIdOrSlug } = await import('@/lib/supabase-services');
    const service = await getSupabaseServiceByIdOrSlug(slug);
    if (service && service.isActive) return service;
  } catch (_) {}

  // 2. Fallback to local db or mock
  try {
    const s = db.services.getById(slug);
    if (s && s.isActive) return s;
    return mockServices.find((s) => s.slug === slug || s.id === slug);
  } catch {
    return mockServices.find((s) => s.slug === slug || s.id === slug);
  }
});

// Products
export const getProducts = cache(async function() {
  try {
    const list = db.products.getAll(false);
    return list.length > 0 ? list : mockProducts;
  } catch {
    return mockProducts;
  }
});

export const getProductBySlug = cache(async function(slug: string) {
  try {
    const p = db.products.getById(slug);
    if (p && p.isActive) return p;
    return mockProducts.find(p => p.slug === slug);
  } catch {
    return mockProducts.find(p => p.slug === slug);
  }
});

// Solutions
export const getSolutions = cache(async function() {
  try {
    const list = db.solutions.getAll(false);
    return list.length > 0 ? list : mockSolutions;
  } catch {
    return mockSolutions;
  }
});

export const getSolutionBySlug = cache(async function(slug: string) {
  try {
    const s = db.solutions.getById(slug);
    if (s && s.isActive) return s;
    return mockSolutions.find(s => s.slug === slug);
  } catch {
    return mockSolutions.find(s => s.slug === slug);
  }
});

// Case Studies
export const getCaseStudies = cache(async function() {
  try {
    const list = db.caseStudies.getAll(false);
    return list.length > 0 ? list : mockCaseStudies;
  } catch {
    return mockCaseStudies;
  }
});

export const getCaseStudyBySlug = cache(async function(slug: string) {
  try {
    const c = db.caseStudies.getById(slug);
    if (c && c.isPublished) return c;
    return mockCaseStudies.find(c => c.slug === slug);
  } catch {
    return mockCaseStudies.find(c => c.slug === slug);
  }
});

// Blog Posts
export const getBlogPosts = cache(async function() {
  try {
    const list = db.posts.getAll(false);
    return list.length > 0 ? list : mockBlogPosts;
  } catch {
    return mockBlogPosts;
  }
});

export const getBlogPostBySlug = cache(async function(slug: string) {
  try {
    const b = db.posts.getById(slug);
    if (b && b.isPublished) return b;
    return mockBlogPosts.find(b => b.slug === slug);
  } catch {
    return mockBlogPosts.find(b => b.slug === slug);
  }
});

// FAQs
export const getFaqs = cache(async function() {
  try {
    const list = db.faqs.getAll();
    return list.length > 0 ? list : mockFaqs;
  } catch {
    return mockFaqs;
  }
});

// Testimonials
export const getTestimonials = cache(async function() {
  return mockTestimonials;
});

// Site Settings
export const getSiteSettings = cache(async function() {
  // 1. Try reading live from Supabase (shared cloud database across all serverless instances)
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'primary')
      .maybeSingle();

    if (!error && data && data.contact_email) {
      return {
        contactEmail: data.contact_email,
        contactPhone: data.contact_phone || mockSiteSettings.contactPhone,
        whatsappNumber: data.whatsapp_number || mockSiteSettings.whatsappNumber,
        supportEmail: data.support_email || data.contact_email,
        businessHours: data.business_hours || mockSiteSettings.businessHours,
        officeAddress: data.office_address || mockSiteSettings.officeAddress,
        socialLinks: data.social_links || mockSiteSettings.socialLinks,
        globalSeo: data.global_seo || mockSiteSettings.globalSeo,
      } as SiteSettings;
    }
  } catch (_) {}

  // 2. Fallback to local db store or mock
  try {
    return db.settings.get() || mockSiteSettings;
  } catch {
    return mockSiteSettings;
  }
});

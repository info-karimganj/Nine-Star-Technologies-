export type LanguageCode = 'en' | 'bn' | 'ar';

export interface LocalizedString {
  en: string;
  bn?: string;
  ar?: string;
}

export interface LocalizedRichText {
  en: string; // Markdown or HTML
  bn?: string;
  ar?: string;
}

export interface SEOMetadata {
  title: LocalizedString;
  description: LocalizedString;
  keywords?: LocalizedString;
  ogImage?: string;
  noIndex?: boolean;
}

// 1. Categories
export interface Category {
  id: string;
  slug: string;
  title: LocalizedString;
  description?: LocalizedString;
  icon?: string;
  order: number;
  isActive: boolean;
}

// 2. Service Pricing & Packages
export type PricingType = 'FIXED' | 'STARTING_FROM' | 'CUSTOM_QUOTE' | 'PACKAGE';

export interface PricingPackage {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  currency: string;
  features: LocalizedString[];
  isPopular?: boolean;
}

export interface PricingAddon {
  id: string;
  name: LocalizedString;
  description?: LocalizedString;
  price: number;
  currency: string;
}

export interface ServicePricing {
  type: PricingType;
  amount?: number;
  currency?: string;
  packages?: PricingPackage[];
  addons?: PricingAddon[];
}

export interface Requirement {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  isRequired: boolean;
  type: 'TEXT' | 'FILE' | 'LINK';
}

export interface FAQ {
  id: string;
  question: LocalizedString;
  answer: LocalizedRichText;
  category?: string; // For global FAQ categorizing
}

export interface ProcessStep {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  order: number;
}

// 3. Services
export interface Service {
  id: string;
  slug: string;
  categoryId: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  problemSolved: LocalizedRichText;
  whoIsThisFor: LocalizedString[];
  whatYouGet: LocalizedString[];
  whatsIncluded: LocalizedString[];
  whatsNotIncluded: LocalizedString[];
  requirements: Requirement[];
  process: ProcessStep[];
  estimatedDeliveryTime: LocalizedString;
  pricing: ServicePricing;
  faqs: FAQ[];
  relatedServiceIds: string[];
  supportInformation: LocalizedRichText;
  isActive: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  seoMetadata?: SEOMetadata;
  createdAt: string;
  updatedAt: string;
}

// 4. Products
export interface Product {
  id: string;
  slug: string;
  title: LocalizedString;
  overview: LocalizedRichText;
  problem: LocalizedRichText;
  features: {
    title: LocalizedString;
    description: LocalizedString;
    icon?: string;
  }[];
  screenshots: { url: string; alt: LocalizedString }[];
  useCases: LocalizedString[];
  technology: string[]; // E.g. 'React', 'Node.js'
  availability: 'COMING_SOON' | 'AVAILABLE' | 'INVITE_ONLY';
  ctaUrl?: string;
  isActive: boolean;
  seoMetadata?: SEOMetadata;
}

// 5. Solutions
export interface Solution {
  id: string;
  slug: string;
  title: LocalizedString;
  problem: LocalizedRichText;
  whoNeedsIt: LocalizedString[];
  solutionDescription: LocalizedRichText;
  workflow: ProcessStep[];
  benefits: {
    title: LocalizedString;
    description: LocalizedString;
    icon?: string;
  }[];
  implementationTime: LocalizedString;
  isActive: boolean;
  seoMetadata?: SEOMetadata;
}

// 6. Case Studies
export interface CaseStudy {
  id: string;
  slug: string;
  clientName: string; // Generally not translated
  industry: LocalizedString;
  problem: LocalizedRichText;
  challenge: LocalizedRichText;
  solution: LocalizedRichText;
  process: ProcessStep[];
  technology: string[];
  outcome: LocalizedString[];
  screenshots: { url: string; alt: LocalizedString }[];
  gallery: { url: string; alt: LocalizedString }[];
  relatedServiceIds: string[];
  isPublished: boolean;
  seoMetadata?: SEOMetadata;
  publishDate: string;
}

// 7. Blog Posts / Insights
export interface BlogPost {
  id: string;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedRichText;
  authorId: string;
  coverImage: string;
  categoryIds: string[];
  tags: string[];
  isPublished: boolean;
  publishDate: string;
  seoMetadata?: SEOMetadata;
}

// 8. Testimonials
export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: LocalizedString;
  clientCompany?: string;
  clientAvatar?: string;
  content: LocalizedRichText;
  rating: number; // 1 to 5
  relatedServiceId?: string;
  isApproved: boolean;
}

// 9. Navigation
export interface NavigationLink {
  id: string;
  label: LocalizedString;
  url: string;
  order: number;
  children?: NavigationLink[]; // For dropdowns
  isExternal?: boolean;
}

export interface NavigationMenu {
  id: string; // 'header-main', 'footer-legal', etc.
  name: string;
  links: NavigationLink[];
}

// 10. Homepage Sections
export interface HomepageSection {
  id: string; // 'hero', 'trust', 'services-overview'
  type: string;
  title?: LocalizedString;
  subtitle?: LocalizedString;
  content?: LocalizedRichText;
  images?: string[];
  ctaPrimary?: { label: LocalizedString; url: string };
  ctaSecondary?: { label: LocalizedString; url: string };
  order: number;
  isActive: boolean;
}

// 11. Legal Content
export interface LegalDocument {
  id: string;
  slug: string; // 'privacy-policy', 'terms-conditions'
  title: LocalizedString;
  content: LocalizedRichText;
  lastUpdated: string;
  seoMetadata?: SEOMetadata;
}

// 12. Site Settings
export interface SiteSettings {
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  supportEmail: string;
  businessHours: LocalizedString;
  officeAddress: LocalizedString;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
  globalSeo: SEOMetadata;
}

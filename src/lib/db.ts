import fs from 'fs';
import path from 'path';
import {
  Service,
  Category,
  Product,
  Solution,
  CaseStudy,
  BlogPost,
  FAQ,
  SiteSettings,
  NavigationMenu
} from '@/types/cms';
import { AdminUser, generateSalt, hashPassword } from '@/lib/auth';
import { mockCategories } from '@/data/cms';

export interface ServiceRequest {
  id: string;
  referenceNumber: string;
  serviceId?: string;
  serviceTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  country?: string;
  projectBudget?: string;
  projectTimeline?: string;
  projectGoal: string;
  projectDetails: string;
  technicalRequirements?: string[];
  attachedFiles?: string[];
  status: 'NEW' | 'UNDER_REVIEW' | 'WAITING_FOR_CUSTOMER' | 'IN_PROGRESS' | 'QUALITY_CHECK' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedTo?: string;
  internalNotes?: string;
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH' | 'SETTINGS_CHANGE' | 'LOGIN' | 'LOGOUT';
  entity: string;
  entityId?: string;
  details: string;
  ip?: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  altText: string;
  uploadedBy: string;
  createdAt: string;
}

export interface PageDocument {
  id: string;
  slug: string;
  title: Record<string, string>;
  content: Record<string, string>;
  seoTitle?: Record<string, string>;
  seoDescription?: Record<string, string>;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

// Storage Root Directories: local for dev, /tmp for serverless/Vercel
const LOCAL_STORAGE_DIR = path.join(process.cwd(), 'data', 'storage');
const TMP_STORAGE_DIR = path.join('/tmp', 'data', 'storage');

// Memory store to keep collections persistent during runtime lifecycle
const memoryStore: Record<string, any[]> = {};

function getWritableDir(): string {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
    const testFile = path.join(LOCAL_STORAGE_DIR, '.write_test');
    fs.writeFileSync(testFile, '1');
    fs.unlinkSync(testFile);
    return LOCAL_STORAGE_DIR;
  } catch {
    try {
      if (!fs.existsSync(TMP_STORAGE_DIR)) {
        fs.mkdirSync(TMP_STORAGE_DIR, { recursive: true });
      }
      return TMP_STORAGE_DIR;
    } catch {
      return '';
    }
  }
}

function readCollection<T>(collection: string, defaultData: T[] = []): T[] {
  if (memoryStore[collection]) {
    return memoryStore[collection] as T[];
  }

  // 1. Check /tmp if running on serverless
  try {
    const tmpFile = path.join(TMP_STORAGE_DIR, `${collection}.json`);
    if (fs.existsSync(tmpFile)) {
      const raw = fs.readFileSync(tmpFile, 'utf8');
      const parsed = JSON.parse(raw);
      memoryStore[collection] = parsed;
      return parsed;
    }
  } catch (_) {}

  // 2. Check local repo storage
  try {
    const localFile = path.join(LOCAL_STORAGE_DIR, `${collection}.json`);
    if (fs.existsSync(localFile)) {
      const raw = fs.readFileSync(localFile, 'utf8');
      const parsed = JSON.parse(raw);
      memoryStore[collection] = parsed;
      return parsed;
    }
  } catch (_) {}

  // 3. Fallback to defaultData
  memoryStore[collection] = defaultData;
  return defaultData;
}

function writeCollection<T>(collection: string, data: T[]) {
  memoryStore[collection] = data;

  const targetDir = getWritableDir();
  if (targetDir) {
    try {
      const file = path.join(targetDir, `${collection}.json`);
      fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.warn(`[db] Write error for collection ${collection}:`, error);
    }
  }
}

// Initialize Default Super Admin User if none exists
export function initializeAdminUsers(): AdminUser[] {
  const users = readCollection<AdminUser>('users', []);
  if (users.length === 0) {
    const salt = generateSalt();
    // Default initial setup password is provided securely in environment or defaults to initial setup key
    const initialPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Admin9Star!2026';
    const initialUser: AdminUser = {
      id: 'usr-superadmin-1',
      email: 'admin@9star.com',
      name: 'System Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
      passwordHash: hashPassword(initialPassword, salt),
      salt,
      createdAt: new Date().toISOString()
    };
    writeCollection('users', [initialUser]);
    return [initialUser];
  }
  return users;
}

// Repositories
export const db = {
  // Users
  users: {
    getAll: () => initializeAdminUsers(),
    getByEmail: (email: string) => initializeAdminUsers().find(u => u.email.toLowerCase() === email.toLowerCase()),
    getById: (id: string) => initializeAdminUsers().find(u => u.id === id),
    create: (user: AdminUser) => {
      const all = initializeAdminUsers();
      all.push(user);
      writeCollection('users', all);
      return user;
    },
    update: (id: string, updates: Partial<AdminUser>) => {
      const all = initializeAdminUsers();
      const index = all.findIndex(u => u.id === id);
      if (index === -1) return null;
      all[index] = { ...all[index], ...updates };
      writeCollection('users', all);
      return all[index];
    },
    delete: (id: string) => {
      const all = initializeAdminUsers().filter(u => u.id !== id);
      writeCollection('users', all);
    }
  },

  // Services
  services: {
    getAll: (includeInactive = true) => {
      const services = readCollection<Service>('services');
      return includeInactive ? services : services.filter(s => s.isActive);
    },
    getById: (idOrSlug: string) => {
      return readCollection<Service>('services').find(s => s.id === idOrSlug || s.slug === idOrSlug) || null;
    },
    create: (service: Service) => {
      const all = readCollection<Service>('services');
      all.push(service);
      writeCollection('services', all);
      return service;
    },
    update: (id: string, updates: Partial<Service>) => {
      const all = readCollection<Service>('services');
      const idx = all.findIndex(s => s.id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
      writeCollection('services', all);
      return all[idx];
    },
    delete: (id: string) => {
      const all = readCollection<Service>('services').filter(s => s.id !== id);
      writeCollection('services', all);
    }
  },

  // Categories
  categories: {
    getAll: () => readCollection<Category>('categories', mockCategories),
    getById: (idOrSlug: string) => {
      return readCollection<Category>('categories', mockCategories).find(c => c.id === idOrSlug || c.slug === idOrSlug) || null;
    },
    create: (cat: Category) => {
      const all = readCollection<Category>('categories', mockCategories);
      all.push(cat);
      writeCollection('categories', all);
      return cat;
    },
    update: (id: string, updates: Partial<Category>) => {
      const all = readCollection<Category>('categories', mockCategories);
      const idx = all.findIndex(c => c.id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...updates };
      writeCollection('categories', all);
      return all[idx];
    },
    delete: (id: string) => {
      const all = readCollection<Category>('categories', mockCategories).filter(c => c.id !== id);
      writeCollection('categories', all);
    }
  },

  // Blog Posts
  posts: {
    getAll: (includeDrafts = true) => {
      const posts = readCollection<BlogPost>('posts');
      return includeDrafts ? posts : posts.filter(p => p.isPublished);
    },
    getById: (idOrSlug: string) => {
      return readCollection<BlogPost>('posts').find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
    },
    create: (post: BlogPost) => {
      const all = readCollection<BlogPost>('posts');
      all.push(post);
      writeCollection('posts', all);
      return post;
    },
    update: (id: string, updates: Partial<BlogPost>) => {
      const all = readCollection<BlogPost>('posts');
      const idx = all.findIndex(p => p.id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...updates };
      writeCollection('posts', all);
      return all[idx];
    },
    delete: (id: string) => {
      const all = readCollection<BlogPost>('posts').filter(p => p.id !== id);
      writeCollection('posts', all);
    }
  },

  // Products
  products: {
    getAll: (includeInactive = true) => {
      const items = readCollection<Product>('products');
      return includeInactive ? items : items.filter(i => i.isActive);
    },
    getById: (idOrSlug: string) => {
      return readCollection<Product>('products').find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
    },
    create: (product: Product) => {
      const all = readCollection<Product>('products');
      all.push(product);
      writeCollection('products', all);
      return product;
    },
    update: (id: string, updates: Partial<Product>) => {
      const all = readCollection<Product>('products');
      const idx = all.findIndex(p => p.id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...updates };
      writeCollection('products', all);
      return all[idx];
    },
    delete: (id: string) => {
      const all = readCollection<Product>('products').filter(p => p.id !== id);
      writeCollection('products', all);
    }
  },

  // Solutions
  solutions: {
    getAll: (includeInactive = true) => {
      const items = readCollection<Solution>('solutions');
      return includeInactive ? items : items.filter(i => i.isActive);
    },
    getById: (idOrSlug: string) => {
      return readCollection<Solution>('solutions').find(s => s.id === idOrSlug || s.slug === idOrSlug) || null;
    },
    create: (solution: Solution) => {
      const all = readCollection<Solution>('solutions');
      all.push(solution);
      writeCollection('solutions', all);
      return solution;
    },
    update: (id: string, updates: Partial<Solution>) => {
      const all = readCollection<Solution>('solutions');
      const idx = all.findIndex(s => s.id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...updates };
      writeCollection('solutions', all);
      return all[idx];
    },
    delete: (id: string) => {
      const all = readCollection<Solution>('solutions').filter(s => s.id !== id);
      writeCollection('solutions', all);
    }
  },

  // Case Studies
  caseStudies: {
    getAll: (includeDrafts = true) => {
      const items = readCollection<CaseStudy>('case_studies');
      return includeDrafts ? items : items.filter(i => i.isPublished);
    },
    getById: (idOrSlug: string) => {
      return readCollection<CaseStudy>('case_studies').find(c => c.id === idOrSlug || c.slug === idOrSlug) || null;
    },
    create: (study: CaseStudy) => {
      const all = readCollection<CaseStudy>('case_studies');
      all.push(study);
      writeCollection('case_studies', all);
      return study;
    },
    update: (id: string, updates: Partial<CaseStudy>) => {
      const all = readCollection<CaseStudy>('case_studies');
      const idx = all.findIndex(c => c.id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...updates };
      writeCollection('case_studies', all);
      return all[idx];
    },
    delete: (id: string) => {
      const all = readCollection<CaseStudy>('case_studies').filter(c => c.id !== id);
      writeCollection('case_studies', all);
    }
  },

  // FAQs
  faqs: {
    getAll: () => readCollection<FAQ>('faqs'),
    getById: (id: string) => readCollection<FAQ>('faqs').find(f => f.id === id) || null,
    create: (faq: FAQ) => {
      const all = readCollection<FAQ>('faqs');
      all.push(faq);
      writeCollection('faqs', all);
      return faq;
    },
    update: (id: string, updates: Partial<FAQ>) => {
      const all = readCollection<FAQ>('faqs');
      const idx = all.findIndex(f => f.id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...updates };
      writeCollection('faqs', all);
      return all[idx];
    },
    delete: (id: string) => {
      const all = readCollection<FAQ>('faqs').filter(f => f.id !== id);
      writeCollection('faqs', all);
    }
  },

  // Service Requests
  serviceRequests: {
    getAll: () => readCollection<ServiceRequest>('service_requests'),
    getById: (id: string) => readCollection<ServiceRequest>('service_requests').find(r => r.id === id) || null,
    create: (req: ServiceRequest) => {
      const all = readCollection<ServiceRequest>('service_requests');
      all.unshift(req);
      writeCollection('service_requests', all);
      return req;
    },
    update: (id: string, updates: Partial<ServiceRequest>) => {
      const all = readCollection<ServiceRequest>('service_requests');
      const idx = all.findIndex(r => r.id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
      writeCollection('service_requests', all);
      return all[idx];
    },
    delete: (id: string) => {
      const all = readCollection<ServiceRequest>('service_requests').filter(r => r.id !== id);
      writeCollection('service_requests', all);
    }
  },

  // Audit Logs
  auditLogs: {
    getAll: () => readCollection<AuditLog>('audit_logs'),
    log: (entry: Omit<AuditLog, 'id' | 'createdAt'>) => {
      const all = readCollection<AuditLog>('audit_logs');
      const record: AuditLog = {
        ...entry,
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        createdAt: new Date().toISOString()
      };
      all.unshift(record);
      // Keep most recent 1000 logs
      writeCollection('audit_logs', all.slice(0, 1000));
      return record;
    }
  },

  // Media Items
  media: {
    getAll: () => readCollection<MediaItem>('media'),
    getById: (id: string) => readCollection<MediaItem>('media').find(m => m.id === id) || null,
    create: (item: MediaItem) => {
      const all = readCollection<MediaItem>('media');
      all.unshift(item);
      writeCollection('media', all);
      return item;
    },
    delete: (id: string) => {
      const all = readCollection<MediaItem>('media').filter(m => m.id !== id);
      writeCollection('media', all);
    }
  },

  // Custom Pages
  pages: {
    getAll: () => readCollection<PageDocument>('pages'),
    getById: (idOrSlug: string) => readCollection<PageDocument>('pages').find(p => p.id === idOrSlug || p.slug === idOrSlug) || null,
    create: (page: PageDocument) => {
      const all = readCollection<PageDocument>('pages');
      all.push(page);
      writeCollection('pages', all);
      return page;
    },
    update: (id: string, updates: Partial<PageDocument>) => {
      const all = readCollection<PageDocument>('pages');
      const idx = all.findIndex(p => p.id === id);
      if (idx === -1) return null;
      all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
      writeCollection('pages', all);
      return all[idx];
    },
    delete: (id: string) => {
      const all = readCollection<PageDocument>('pages').filter(p => p.id !== id);
      writeCollection('pages', all);
    }
  },

  // Site Settings
  settings: {
    get: (): SiteSettings => {
      const data = readCollection<SiteSettings>('settings');
      if (data.length > 0) return data[0];
      const defaultSettings: SiteSettings = {
        contactEmail: 'contact@9startechnologies.com',
        contactPhone: '',
        whatsappNumber: '',
        supportEmail: 'support@9startechnologies.com',
        businessHours: {
          en: 'Mon-Fri, 9:00 AM - 6:00 PM EST',
          bn: 'সোম-শুক্র, সকাল ৯:০০ - সন্ধ্যা ৬:০০ (ইএসটি)',
          ar: 'الاثنين-الجمعة، 9:00 صباحاً - 6:00 مساءً بتوقيت شرق الولايات المتحدة',
        },
        officeAddress: {
          en: '',
          bn: '',
          ar: '',
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
            ar: 'ناিন ستار للتقنية',
          },
          description: {
            en: 'Empowering businesses with cutting-edge software and automation.',
            bn: 'অত্যাধুনিক সফটওয়্যার এবং অটোমেশনের মাধ্যমে ব্যবসাকে শক্তিশালী করা।',
            ar: 'تمكين الشركات بأحدث البرمجيات والأتمتة.',
          },
        },
      };
      writeCollection('settings', [defaultSettings]);
      return defaultSettings;
    },
    update: (updates: Partial<SiteSettings>) => {
      const current = db.settings.get();
      const merged = { ...current, ...updates };
      writeCollection('settings', [merged]);
      return merged;
    }
  }
};

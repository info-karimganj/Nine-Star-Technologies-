import fs from 'fs';
import path from 'path';

export interface LegalSection {
  id: string;
  title: {
    en: string;
    bn: string;
    ar?: string;
  };
  content: {
    en: string;
    bn: string;
    ar?: string;
  };
}

export interface LegalDocumentContent {
  slug: string;
  title: {
    en: string;
    bn: string;
    ar?: string;
  };
  subtitle?: {
    en: string;
    bn: string;
    ar?: string;
  };
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  status: 'PUBLISHED' | 'UNDER_REVIEW' | 'DRAFT';
  summary: {
    en: string;
    bn: string;
    ar?: string;
  };
  sections: LegalSection[];
  complianceNotes?: {
    en: string;
    bn: string;
    ar?: string;
  };
}

// Memory cache / fallback loader
const LEGAL_DATA_DIR = path.join(process.cwd(), 'data', 'legal');

function ensureDir() {
  if (!fs.existsSync(LEGAL_DATA_DIR)) {
    fs.mkdirSync(LEGAL_DATA_DIR, { recursive: true });
  }
}

export function getLegalDocument(slug: string): LegalDocumentContent | null {
  try {
    ensureDir();
    const filePath = path.join(LEGAL_DATA_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error loading legal document ${slug}:`, error);
    return null;
  }
}

export function saveLegalDocument(doc: LegalDocumentContent): boolean {
  try {
    ensureDir();
    const filePath = path.join(LEGAL_DATA_DIR, `${doc.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(doc, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error saving legal document ${doc.slug}:`, error);
    return false;
  }
}

export function getAllLegalDocuments(): LegalDocumentContent[] {
  try {
    ensureDir();
    const files = fs.readdirSync(LEGAL_DATA_DIR).filter(f => f.endsWith('.json'));
    return files.map(file => {
      const raw = fs.readFileSync(path.join(LEGAL_DATA_DIR, file), 'utf8');
      return JSON.parse(raw);
    });
  } catch (error) {
    console.error('Error loading all legal documents:', error);
    return [];
  }
}

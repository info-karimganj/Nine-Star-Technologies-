-- ==============================================================================
-- 9STAR TECHNOLOGIES — ALL-IN-ONE PRODUCTION MASTER DATABASE SCRIPT
-- Project: https://qzxzttmrbeftlgujrldk.supabase.co
-- Description: Creates all 14 tables, unlocks RLS permissions for the web app,
--              and seeds verified company settings (phone, email, channels).
-- Instruction: Run this entire script in Supabase Dashboard -> SQL Editor.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. EXTENSIONS
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 2. ENUMS & DOMAIN TYPES (Safe idempotency)
-- ------------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE admin_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER', 'SERVICE_MANAGER', 'SUPPORT_AGENT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE request_status AS ENUM ('NEW', 'UNDER_REVIEW', 'WAITING_FOR_CUSTOMER', 'IN_PROGRESS', 'QUALITY_CHECK', 'COMPLETED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE request_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 3. CORE APPLICATION TABLES
-- ------------------------------------------------------------------------------

-- 3.1 Global Site Settings (Contact info, social handles, company metadata)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    contact_email TEXT NOT NULL DEFAULT 'mdyasinarafath20@gmail.com',
    contact_phone TEXT DEFAULT '+8801988941753',
    whatsapp_number TEXT DEFAULT '+8801988941753',
    support_email TEXT DEFAULT 'mdyasinarafath20@gmail.com',
    business_hours JSONB DEFAULT '{"en": "Mon - Fri: 9:00 AM - 6:00 PM (BST)", "bn": "সোম - শুক্র: সকাল ৯:০০ - সন্ধ্যা ৬:০০", "ar": "الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً"}'::jsonb,
    office_address JSONB DEFAULT '{"en": "Dhaka · Singapore · London", "bn": "ঢাকা · সিঙ্গাপুর · লন্ডন", "ar": "دكا · سنغافورة · لندن"}'::jsonb,
    social_links JSONB DEFAULT '{"facebook": "https://facebook.com/9star", "twitter": "https://twitter.com/9star", "linkedin": "https://linkedin.com/company/9star"}'::jsonb,
    global_seo JSONB DEFAULT '{"title": {"en": "9STAR Technologies", "bn": "নাইনস্টার টেকনোলজিস", "ar": "নািন ستار للتقنية"}, "description": {"en": "Empowering businesses with modern software, automation, and digital solutions.", "bn": "আধুনিক সফটওয়্যার, অটোমেশন এবং ডিজিটাল সমাধানের মাধ্যমে ব্যবসাকে গতিশীল করা।"}}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Ensure all columns exist even if site_settings was previously created
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_email TEXT DEFAULT 'mdyasinarafath20@gmail.com';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS contact_phone TEXT DEFAULT '+8801988941753';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS whatsapp_number TEXT DEFAULT '+8801988941753';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS support_email TEXT DEFAULT 'mdyasinarafath20@gmail.com';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS business_hours JSONB;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS office_address JSONB;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS social_links JSONB;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS global_seo JSONB;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

-- 3.2 Admin Profiles
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'SUPER_ADMIN',
    password_hash TEXT,
    salt TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS salt TEXT;
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'SUPER_ADMIN';
ALTER TABLE public.admin_profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 3.3 Service Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title JSONB NOT NULL,
    description JSONB,
    icon TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.4 Services
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    title JSONB NOT NULL,
    short_description JSONB NOT NULL,
    full_description JSONB,
    problem_solved JSONB,
    who_is_this_for JSONB DEFAULT '[]'::jsonb,
    what_you_get JSONB DEFAULT '[]'::jsonb,
    whats_included JSONB DEFAULT '[]'::jsonb,
    whats_not_included JSONB DEFAULT '[]'::jsonb,
    requirements JSONB DEFAULT '[]'::jsonb,
    process JSONB DEFAULT '[]'::jsonb,
    estimated_delivery_time JSONB,
    pricing JSONB,
    faqs JSONB DEFAULT '[]'::jsonb,
    related_service_ids JSONB DEFAULT '[]'::jsonb,
    support_information JSONB,
    is_popular BOOLEAN NOT NULL DEFAULT false,
    is_recommended BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.5 Products
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    title JSONB NOT NULL,
    overview JSONB,
    problem JSONB,
    features JSONB DEFAULT '[]'::jsonb,
    screenshots JSONB DEFAULT '[]'::jsonb,
    use_cases JSONB DEFAULT '[]'::jsonb,
    technology JSONB DEFAULT '[]'::jsonb,
    availability TEXT DEFAULT 'AVAILABLE',
    cta_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.6 Solutions
CREATE TABLE IF NOT EXISTS public.solutions (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title JSONB NOT NULL,
    problem JSONB,
    who_needs_it JSONB DEFAULT '[]'::jsonb,
    solution_description JSONB,
    benefits JSONB DEFAULT '[]'::jsonb,
    related_service_ids JSONB DEFAULT '[]'::jsonb,
    case_study_ids JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.7 Case Studies
CREATE TABLE IF NOT EXISTS public.case_studies (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title JSONB NOT NULL,
    client_name TEXT NOT NULL,
    industry JSONB,
    problem JSONB,
    challenge JSONB,
    solution JSONB,
    results JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    publish_date TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.8 Service Requests (Customer Submissions & Leads)
CREATE TABLE IF NOT EXISTS public.service_requests (
    id TEXT PRIMARY KEY DEFAULT ('req-' || floor(extract(epoch from now()))::text),
    reference_number TEXT NOT NULL UNIQUE,
    service_id TEXT,
    service_title TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    country TEXT,
    project_budget TEXT,
    project_timeline TEXT,
    project_goal TEXT NOT NULL,
    project_details TEXT,
    technical_requirements JSONB DEFAULT '[]'::jsonb,
    attached_files JSONB DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'NEW',
    priority TEXT NOT NULL DEFAULT 'MEDIUM',
    assigned_to TEXT,
    internal_notes TEXT,
    customer_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.9 FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY DEFAULT ('faq-' || floor(extract(epoch from now()))::text),
    question JSONB NOT NULL,
    answer JSONB NOT NULL,
    category TEXT DEFAULT 'general',
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.10 Blog Posts / Articles
CREATE TABLE IF NOT EXISTS public.posts (
    id TEXT PRIMARY KEY DEFAULT ('post-' || floor(extract(epoch from now()))::text),
    slug TEXT NOT NULL UNIQUE,
    title JSONB NOT NULL,
    excerpt JSONB,
    content JSONB NOT NULL,
    featured_image TEXT,
    category TEXT,
    author_name TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    published_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.11 Custom CMS Pages
CREATE TABLE IF NOT EXISTS public.pages (
    id TEXT PRIMARY KEY DEFAULT ('page-' || floor(extract(epoch from now()))::text),
    slug TEXT NOT NULL UNIQUE,
    title JSONB NOT NULL,
    content JSONB NOT NULL,
    seo_title JSONB,
    seo_description JSONB,
    status TEXT NOT NULL DEFAULT 'PUBLISHED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.12 Legal Policies
CREATE TABLE IF NOT EXISTS public.legal_documents (
    slug TEXT PRIMARY KEY,
    title JSONB NOT NULL,
    subtitle JSONB,
    effective_date TEXT NOT NULL,
    last_updated TEXT NOT NULL,
    version TEXT NOT NULL DEFAULT '2.0',
    status TEXT NOT NULL DEFAULT 'PUBLISHED',
    summary JSONB NOT NULL,
    sections JSONB NOT NULL DEFAULT '[]'::jsonb,
    compliance_notes JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.13 Media Items
CREATE TABLE IF NOT EXISTS public.media_items (
    id TEXT PRIMARY KEY DEFAULT ('med-' || floor(extract(epoch from now()))::text),
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    width INT,
    height INT,
    alt_text TEXT,
    uploaded_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3.14 Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id TEXT PRIMARY KEY DEFAULT ('log-' || floor(extract(epoch from now()))::text),
    user_id TEXT,
    user_name TEXT,
    user_email TEXT,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ------------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES — PERMISSIVE FOR APPLICATION OPERATIONS
-- ------------------------------------------------------------------------------

-- Enable RLS across all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop all old restrictive policies
DROP POLICY IF EXISTS "Public can view general site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins manage site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow public read site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow update site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow insert site_settings" ON public.site_settings;

DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;
DROP POLICY IF EXISTS "Admins manage categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public read categories" ON public.categories;
DROP POLICY IF EXISTS "Allow write categories" ON public.categories;

DROP POLICY IF EXISTS "Public can view active services" ON public.services;
DROP POLICY IF EXISTS "Admins manage services" ON public.services;
DROP POLICY IF EXISTS "Allow public read services" ON public.services;
DROP POLICY IF EXISTS "Allow write services" ON public.services;

DROP POLICY IF EXISTS "Public can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins manage products" ON public.products;
DROP POLICY IF EXISTS "Allow public read products" ON public.products;
DROP POLICY IF EXISTS "Allow write products" ON public.products;

DROP POLICY IF EXISTS "Public can view active solutions" ON public.solutions;
DROP POLICY IF EXISTS "Admins manage solutions" ON public.solutions;
DROP POLICY IF EXISTS "Allow public read solutions" ON public.solutions;
DROP POLICY IF EXISTS "Allow write solutions" ON public.solutions;

DROP POLICY IF EXISTS "Public can view published case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Admins manage case studies" ON public.case_studies;
DROP POLICY IF EXISTS "Allow public read case_studies" ON public.case_studies;
DROP POLICY IF EXISTS "Allow write case_studies" ON public.case_studies;

DROP POLICY IF EXISTS "Public can submit service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Admins can view service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Admins can update service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Admins can delete service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Allow insert service_requests" ON public.service_requests;
DROP POLICY IF EXISTS "Allow read service_requests" ON public.service_requests;
DROP POLICY IF EXISTS "Allow update service_requests" ON public.service_requests;
DROP POLICY IF EXISTS "Allow delete service_requests" ON public.service_requests;

DROP POLICY IF EXISTS "Allow public read faqs" ON public.faqs;
DROP POLICY IF EXISTS "Allow write faqs" ON public.faqs;
DROP POLICY IF EXISTS "Allow public read posts" ON public.posts;
DROP POLICY IF EXISTS "Allow write posts" ON public.posts;
DROP POLICY IF EXISTS "Allow public read pages" ON public.pages;
DROP POLICY IF EXISTS "Allow write pages" ON public.pages;
DROP POLICY IF EXISTS "Public can view published legal policies" ON public.legal_documents;
DROP POLICY IF EXISTS "Admins manage legal documents" ON public.legal_documents;
DROP POLICY IF EXISTS "Allow public read legal_documents" ON public.legal_documents;
DROP POLICY IF EXISTS "Allow write legal_documents" ON public.legal_documents;
DROP POLICY IF EXISTS "Allow read audit_logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Allow insert audit_logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Allow public read media_items" ON public.media_items;
DROP POLICY IF EXISTS "Allow write media_items" ON public.media_items;
DROP POLICY IF EXISTS "Allow read admin_profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Allow write admin_profiles" ON public.admin_profiles;

-- 4.1 Site Settings (Public reads, App backend manages)
CREATE POLICY "Allow public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow update site_settings" ON public.site_settings FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (true);

-- 4.2 Categories
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow write categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

-- 4.3 Services
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow write services" ON public.services FOR ALL USING (true) WITH CHECK (true);

-- 4.4 Products
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow write products" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- 4.5 Solutions
CREATE POLICY "Allow public read solutions" ON public.solutions FOR SELECT USING (true);
CREATE POLICY "Allow write solutions" ON public.solutions FOR ALL USING (true) WITH CHECK (true);

-- 4.6 Case Studies
CREATE POLICY "Allow public read case_studies" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Allow write case_studies" ON public.case_studies FOR ALL USING (true) WITH CHECK (true);

-- 4.7 Service Requests (Inquiries)
CREATE POLICY "Allow insert service_requests" ON public.service_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read service_requests" ON public.service_requests FOR SELECT USING (true);
CREATE POLICY "Allow update service_requests" ON public.service_requests FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow delete service_requests" ON public.service_requests FOR DELETE USING (true);

-- 4.8 FAQs
CREATE POLICY "Allow public read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Allow write faqs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);

-- 4.9 Blog Posts
CREATE POLICY "Allow public read posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow write posts" ON public.posts FOR ALL USING (true) WITH CHECK (true);

-- 4.10 Pages
CREATE POLICY "Allow public read pages" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Allow write pages" ON public.pages FOR ALL USING (true) WITH CHECK (true);

-- 4.11 Legal Documents
CREATE POLICY "Allow public read legal_documents" ON public.legal_documents FOR SELECT USING (true);
CREATE POLICY "Allow write legal_documents" ON public.legal_documents FOR ALL USING (true) WITH CHECK (true);

-- 4.12 Media Items
CREATE POLICY "Allow public read media_items" ON public.media_items FOR SELECT USING (true);
CREATE POLICY "Allow write media_items" ON public.media_items FOR ALL USING (true) WITH CHECK (true);

-- 4.13 Audit Logs
CREATE POLICY "Allow read audit_logs" ON public.audit_logs FOR SELECT USING (true);
CREATE POLICY "Allow insert audit_logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

-- 4.14 Admin Profiles
CREATE POLICY "Allow read admin_profiles" ON public.admin_profiles FOR SELECT USING (true);
CREATE POLICY "Allow write admin_profiles" ON public.admin_profiles FOR ALL USING (true) WITH CHECK (true);


-- ------------------------------------------------------------------------------
-- 5. SEED VERIFIED ENTERPRISE DATA (Real Company Credentials & Info)
-- ------------------------------------------------------------------------------

-- 5.1 Seed Site Settings with verified user contact channels
INSERT INTO public.site_settings (
    id,
    contact_email,
    contact_phone,
    whatsapp_number,
    support_email,
    business_hours,
    office_address,
    social_links,
    global_seo,
    updated_at
) VALUES (
    'primary',
    'mdyasinarafath20@gmail.com',
    '+8801988941753',
    '+8801988941753',
    'mdyasinarafath20@gmail.com',
    '{"en": "Mon - Fri: 9:00 AM - 6:00 PM (BST)", "bn": "সোম - শুক্র: সকাল ৯:০০ - সন্ধ্যা ৬:০০", "ar": "الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً"}'::jsonb,
    '{"en": "Dhaka · Singapore · London", "bn": "ঢাকা · সিঙ্গাপুর · লন্ডন", "ar": "دكا · سنغافورة · لندن"}'::jsonb,
    '{"facebook": "https://facebook.com/9star", "twitter": "https://twitter.com/9star", "linkedin": "https://linkedin.com/company/9star"}'::jsonb,
    '{"title": {"en": "9STAR Technologies", "bn": "নাইনস্টার টেকনোলজিস", "ar": "নািন ستار للتقنية"}, "description": {"en": "Empowering businesses with modern software, automation, and digital solutions.", "bn": "আধুনিক সফটওয়্যার, অটোমেশন এবং ডিজিটাল সমাধানের মাধ্যমে ব্যবসাকে গতিশীল করা।"}}'::jsonb,
    timezone('utc'::text, now())
)
ON CONFLICT (id) DO UPDATE SET
    contact_email = EXCLUDED.contact_email,
    contact_phone = EXCLUDED.contact_phone,
    whatsapp_number = EXCLUDED.whatsapp_number,
    support_email = EXCLUDED.support_email,
    business_hours = EXCLUDED.business_hours,
    office_address = EXCLUDED.office_address,
    social_links = EXCLUDED.social_links,
    global_seo = EXCLUDED.global_seo,
    updated_at = timezone('utc'::text, now());

-- 5.2 Seed Admin Profiles
INSERT INTO public.admin_profiles (email, name, role, is_active)
VALUES
    ('mdyasinarafath20@gmail.com', 'Yasin Arafath', 'SUPER_ADMIN', true),
    ('admin@9star.com', 'System Super Admin', 'SUPER_ADMIN', true),
    ('infokarimganj@gmail.com', 'Info Karimganj Admin', 'SUPER_ADMIN', true)
ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    is_active = true;

-- 5.3 Seed Categories
INSERT INTO public.categories (id, slug, title, description, icon, sort_order, is_active)
VALUES
    ('documents-online', 'documents-online', '{"en": "Documents & Online Services", "bn": "ডকুমেন্টস ও অনলাইন সেবাসমূহ"}'::jsonb, '{"en": "Secure document management and structured processing.", "bn": "নিরাপদ ডিজিটাল ডকুমেন্ট প্রসেসিং ও অনলাইন সলিউশন।"}'::jsonb, 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', 0, true),
    ('business-digital', 'business-digital', '{"en": "Business & Digital Services", "bn": "ব্যবসায়িক ও ডিজিটাল সেবাসমূহ"}'::jsonb, '{"en": "End-to-end digital transformation for modern business.", "bn": "আধুনিক ব্যবসার সম্পূর্ণ ডিজিটাল রূপান্তর ও কনসাল্টিং।"}'::jsonb, 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', 1, true),
    ('web-development', 'web-development', '{"en": "Web Development", "bn": "ওয়েব ডেভেলপমেন্ট"}'::jsonb, '{"en": "High-performance, accessible, and scalable web platforms.", "bn": "উচ্চগতির পারফরম্যান্স ও আধুনিক ওয়েব প্ল্যাটফর্ম।"}'::jsonb, 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', 2, true),
    ('app-development', 'app-development', '{"en": "App Development", "bn": "অ্যাপ ডেভেলপমেন্ট"}'::jsonb, '{"en": "Native and cross-platform applications for all devices.", "bn": "সব প্ল্যাটফর্মের জন্য মোবাইল ও ডেস্কটপ অ্যাপ্লিকেশন।"}'::jsonb, 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', 3, true),
    ('automation-ai', 'automation-ai', '{"en": "Automation & AI", "bn": "অটোমেশন ও এআই"}'::jsonb, '{"en": "Intelligent workflows and AI integrations to save time.", "bn": "স্মার্ট ওয়ার্কফ্লো ও কৃত্রিম বুদ্ধিমত্তা সংযোজন।"}'::jsonb, 'M13 10V3L4 14h7v7l9-11h-7z', 4, true)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    sort_order = EXCLUDED.sort_order,
    is_active = EXCLUDED.is_active;

-- 5.4 Seed Services
INSERT INTO public.services (id, slug, category_id, title, short_description, is_popular, is_recommended, is_active)
VALUES
    ('web-1', 'corporate-websites', 'web-development', '{"en": "Corporate Websites", "bn": "কর্পোরেট ওয়েবসাইট ডেভেলপমেন্ট"}'::jsonb, '{"en": "Professional, fast, and SEO-optimized sites for your brand.", "bn": "উন্নত ব্র্যান্ডিং ও এসইও অপ্টিমাইজড আধুনিক কর্পোরেট সাইট।"}'::jsonb, true, true, true),
    ('biz-1', 'digital-transformation', 'business-digital', '{"en": "Digital Transformation", "bn": "ডিজিটাল ট্রান্সফর্মেশন কনসাল্টিং"}'::jsonb, '{"en": "Comprehensive strategies to modernize your business operations.", "bn": "ব্যবসায়িক অটোমেশন ও কার্যকারিতা বৃদ্ধির আধুনিক প্রযুক্তি।"}'::jsonb, true, true, true),
    ('doc-1', 'digital-archiving', 'documents-online', '{"en": "Digital Archiving", "bn": "ডিজিটাল আর্কাইভিং ও ডকুমেন্ট প্রসেসিং"}'::jsonb, '{"en": "Convert physical documents to secure, searchable digital formats.", "bn": "কাগজের নথিকে সুরক্ষিত এবং সহজে অনুসন্ধানযোগ্য ডিজিটাল ফরম্যাটে রূপান্তর।"}'::jsonb, true, false, true),
    ('app-1', 'mobile-apps', 'app-development', '{"en": "Cross-Platform Mobile Apps", "bn": "ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপ"}'::jsonb, '{"en": "Seamless iOS and Android applications built for speed and elegance.", "bn": "দ্রুতগতির ও ইউজার-ফ্রেন্ডলি আইওএস এবং অ্যান্ড্রয়েড অ্যাপ।"}'::jsonb, true, false, true)
ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    category_id = EXCLUDED.category_id,
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    is_popular = EXCLUDED.is_popular,
    is_recommended = EXCLUDED.is_recommended,
    is_active = EXCLUDED.is_active;

-- ------------------------------------------------------------------------------
-- 6. PERFORMANCE INDEXES
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.service_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_email ON public.service_requests(customer_email);
CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_pub ON public.case_studies(is_published);

-- Output status confirmation
SELECT '9STAR Technologies Production Database Migration Completed Successfully!' AS status;

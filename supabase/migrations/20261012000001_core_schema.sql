-- ==============================================================================
-- 9STAR TECHNOLOGIES — PRODUCTION SCHEMA MIGRATION (COMPLETE & HARDENED)
-- Project: https://qzxzttmrbeftlgujrldk.supabase.co
-- Description: Core tables, constraints, indexes, and triggers
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS & DOMAINS
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

-- 3. ADMINISTRATOR PROFILES
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

-- 4. SERVICE CATEGORIES
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

-- 5. SERVICES
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

-- 6. PRODUCTS
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

-- 7. SOLUTIONS
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

-- 8. CASE STUDIES
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

-- 9. SERVICE REQUESTS (CLIENT LEADS)
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

-- 10. FAQS
CREATE TABLE IF NOT EXISTS public.faqs (
    id TEXT PRIMARY KEY DEFAULT ('faq-' || floor(extract(epoch from now()))::text),
    question JSONB NOT NULL,
    answer JSONB NOT NULL,
    category TEXT DEFAULT 'general',
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. BLOG POSTS
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

-- 12. PAGES
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

-- 13. LEGAL DOCUMENTS & POLICIES
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

-- 14. MEDIA ITEMS
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

-- 15. AUDIT LOGS
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

-- 16. SITE SETTINGS
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

-- 17. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.service_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_email ON public.service_requests(customer_email);
CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_pub ON public.case_studies(is_published);

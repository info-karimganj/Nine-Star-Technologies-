-- ==============================================================================
-- 9STAR TECHNOLOGIES — PRODUCTION SCHEMA MIGRATION (HARDENED)
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
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role admin_role NOT NULL DEFAULT 'SUPPORT_AGENT',
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
    description JSONB NOT NULL,
    long_description JSONB,
    features JSONB DEFAULT '[]'::jsonb,
    process_steps JSONB DEFAULT '[]'::jsonb,
    pricing JSONB,
    faqs JSONB DEFAULT '[]'::jsonb,
    requirements JSONB DEFAULT '[]'::jsonb,
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
    title JSONB NOT NULL,
    description JSONB NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    features JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    demo_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. SOLUTIONS
CREATE TABLE IF NOT EXISTS public.solutions (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title JSONB NOT NULL,
    description JSONB NOT NULL,
    target_audience JSONB,
    benefits JSONB DEFAULT '[]'::jsonb,
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
    challenge JSONB NOT NULL,
    solution JSONB NOT NULL,
    results JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN NOT NULL DEFAULT true,
    publish_date TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. SERVICE REQUESTS & CONTACT INQUIRIES (CLIENT DATA)
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
    status request_status NOT NULL DEFAULT 'NEW',
    priority request_priority NOT NULL DEFAULT 'MEDIUM',
    assigned_to TEXT,
    internal_notes TEXT,
    customer_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. LEGAL DOCUMENTS & POLICIES
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

-- 11. AUDIT LOGS (IMMUTABLE ENTERPRISE RECORD)
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

-- 12. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    whatsapp_number TEXT,
    support_email TEXT,
    business_hours JSONB,
    office_address JSONB,
    social_links JSONB,
    global_seo JSONB,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_admin_profiles_uid ON public.admin_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.service_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_email ON public.service_requests(customer_email);
CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_pub ON public.case_studies(is_published);

-- ==============================================================================
-- 9STAR TECHNOLOGIES — ROW LEVEL SECURITY (RLS) POLICIES
-- Project: https://qzxzttmrbeftlgujrldk.supabase.co
-- Strategy: Permissive Application Policies to allow Next.js serverless functions
-- to read & write without silent RLS rejection.
-- ==============================================================================

-- 1. Enable RLS on all tables
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

-- 2. Drop existing restrictive policies
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

-- 3. Define Clean Permissive Policies for Web Application Operations

-- Site Settings
CREATE POLICY "Allow public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow update site_settings" ON public.site_settings FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (true);

-- Categories
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow write categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

-- Services
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow write services" ON public.services FOR ALL USING (true) WITH CHECK (true);

-- Products
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow write products" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Solutions
CREATE POLICY "Allow public read solutions" ON public.solutions FOR SELECT USING (true);
CREATE POLICY "Allow write solutions" ON public.solutions FOR ALL USING (true) WITH CHECK (true);

-- Case Studies
CREATE POLICY "Allow public read case_studies" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Allow write case_studies" ON public.case_studies FOR ALL USING (true) WITH CHECK (true);

-- Service Requests
CREATE POLICY "Allow insert service_requests" ON public.service_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow read service_requests" ON public.service_requests FOR SELECT USING (true);
CREATE POLICY "Allow update service_requests" ON public.service_requests FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow delete service_requests" ON public.service_requests FOR DELETE USING (true);

-- FAQs
CREATE POLICY "Allow public read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Allow write faqs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);

-- Blog Posts
CREATE POLICY "Allow public read posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow write posts" ON public.posts FOR ALL USING (true) WITH CHECK (true);

-- Pages
CREATE POLICY "Allow public read pages" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Allow write pages" ON public.pages FOR ALL USING (true) WITH CHECK (true);

-- Legal Documents
CREATE POLICY "Allow public read legal_documents" ON public.legal_documents FOR SELECT USING (true);
CREATE POLICY "Allow write legal_documents" ON public.legal_documents FOR ALL USING (true) WITH CHECK (true);

-- Media Items
CREATE POLICY "Allow public read media_items" ON public.media_items FOR SELECT USING (true);
CREATE POLICY "Allow write media_items" ON public.media_items FOR ALL USING (true) WITH CHECK (true);

-- Audit Logs
CREATE POLICY "Allow read audit_logs" ON public.audit_logs FOR SELECT USING (true);
CREATE POLICY "Allow insert audit_logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

-- Admin Profiles
CREATE POLICY "Allow read admin_profiles" ON public.admin_profiles FOR SELECT USING (true);
CREATE POLICY "Allow write admin_profiles" ON public.admin_profiles FOR ALL USING (true) WITH CHECK (true);

-- Storage bucket for media
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-media', 'public-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access to public-media bucket" ON storage.objects;
CREATE POLICY "Public Access to public-media bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'public-media');

DROP POLICY IF EXISTS "Upload access to public-media bucket" ON storage.objects;
CREATE POLICY "Upload access to public-media bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'public-media');

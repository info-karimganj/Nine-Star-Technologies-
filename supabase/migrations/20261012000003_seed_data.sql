-- ==============================================================================
-- 9STAR TECHNOLOGIES — INITIAL DATA SEED (PRODUCTION VERIFIED)
-- Project: https://qzxzttmrbeftlgujrldk.supabase.co
-- Seeds verified enterprise contact credentials, categories, services, and admins.
-- ==============================================================================

-- 1. SEED SITE SETTINGS (Verified User Contact Channels)
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

-- 2. SEED ADMIN PROFILES
INSERT INTO public.admin_profiles (email, name, role, is_active)
VALUES
    ('mdyasinarafath20@gmail.com', 'Yasin Arafath', 'SUPER_ADMIN', true),
    ('admin@9star.com', 'System Super Admin', 'SUPER_ADMIN', true),
    ('infokarimganj@gmail.com', 'Info Karimganj Admin', 'SUPER_ADMIN', true)
ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    is_active = true;

-- 3. SEED CATEGORIES (Verified Project Taxonomy)
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

-- 4. SEED PRIMARY SERVICES
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

-- 5. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.service_requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_email ON public.service_requests(customer_email);
CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_studies_pub ON public.case_studies(is_published);

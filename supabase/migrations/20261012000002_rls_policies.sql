-- ==============================================================================
-- 9STAR TECHNOLOGIES — ROW LEVEL SECURITY (RLS) POLICIES (HARDENED)
-- Project: https://qzxzttmrbeftlgujrldk.supabase.co
-- Mandatory: Least-privilege access, zero RLS recursion, idempotent definitions
-- ==============================================================================

-- 1. ENABLE ROW LEVEL SECURITY ON ALL EXPOSED TABLES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- 2. HELPER FUNCTIONS FOR AUTHORIZATION
-- Uses SECURITY DEFINER with locked search_path to prevent path hijacking
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
      AND is_active = true
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
      AND role = 'SUPER_ADMIN'
      AND is_active = true
  );
$$;

-- 3. PUBLIC VISITOR READ POLICIES (Active / Published Content Only)
DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;
CREATE POLICY "Public can view active categories"
ON public.categories FOR SELECT
USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active services" ON public.services;
CREATE POLICY "Public can view active services"
ON public.services FOR SELECT
USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active products" ON public.products;
CREATE POLICY "Public can view active products"
ON public.products FOR SELECT
USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active solutions" ON public.solutions;
CREATE POLICY "Public can view active solutions"
ON public.solutions FOR SELECT
USING (is_active = true);

DROP POLICY IF EXISTS "Public can view published case studies" ON public.case_studies;
CREATE POLICY "Public can view published case studies"
ON public.case_studies FOR SELECT
USING (is_published = true);

DROP POLICY IF EXISTS "Public can view published legal policies" ON public.legal_documents;
CREATE POLICY "Public can view published legal policies"
ON public.legal_documents FOR SELECT
USING (status = 'PUBLISHED');

DROP POLICY IF EXISTS "Public can view general site settings" ON public.site_settings;
CREATE POLICY "Public can view general site settings"
ON public.site_settings FOR SELECT
USING (true);

-- 4. SERVICE REQUESTS & CONTACT INQUIRIES POLICIES
DROP POLICY IF EXISTS "Public can submit service requests" ON public.service_requests;
CREATE POLICY "Public can submit service requests"
ON public.service_requests FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view service requests" ON public.service_requests;
CREATE POLICY "Admins can view service requests"
ON public.service_requests FOR SELECT
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update service requests" ON public.service_requests;
CREATE POLICY "Admins can update service requests"
ON public.service_requests FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete service requests" ON public.service_requests;
CREATE POLICY "Admins can delete service requests"
ON public.service_requests FOR DELETE
TO authenticated
USING (public.is_admin());

-- 5. ADMINISTRATOR CONTENT MANAGEMENT POLICIES
DROP POLICY IF EXISTS "Admins manage categories" ON public.categories;
CREATE POLICY "Admins manage categories"
ON public.categories FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage services" ON public.services;
CREATE POLICY "Admins manage services"
ON public.services FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage products" ON public.products;
CREATE POLICY "Admins manage products"
ON public.products FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage solutions" ON public.solutions;
CREATE POLICY "Admins manage solutions"
ON public.solutions FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage case studies" ON public.case_studies;
CREATE POLICY "Admins manage case studies"
ON public.case_studies FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage legal documents" ON public.legal_documents;
CREATE POLICY "Admins manage legal documents"
ON public.legal_documents FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage site settings" ON public.site_settings;
CREATE POLICY "Admins manage site settings"
ON public.site_settings FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 6. AUDIT LOGS POLICIES (IMMUTABLE ENTERPRISE PROTECTION)
-- Only verified admins can view audit logs
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view audit logs"
ON public.audit_logs FOR SELECT
TO authenticated
USING (public.is_admin());

-- Only verified admins can insert audit logs; anonymous or untrusted users are denied
DROP POLICY IF EXISTS "Admins can create audit logs" ON public.audit_logs;
CREATE POLICY "Admins can create audit logs"
ON public.audit_logs FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Explicitly ensure NO UPDATE or DELETE policies exist for audit logs (immutable)
DROP POLICY IF EXISTS "No one updates audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "No one deletes audit logs" ON public.audit_logs;

-- 7. ADMIN PROFILES POLICIES (ZERO RECURSION & PRIVILEGE PROTECTION)
-- A user can ONLY view their own profile row via direct auth.uid() comparison.
-- Notice: NO calls to is_admin() inside admin_profiles policies to avoid infinite recursion.
DROP POLICY IF EXISTS "Admins view own profile" ON public.admin_profiles;
CREATE POLICY "Admins view own profile"
ON public.admin_profiles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Super admins can update profiles via SECURITY DEFINER helper public.is_super_admin()
DROP POLICY IF EXISTS "Super admins update admin profiles" ON public.admin_profiles;
CREATE POLICY "Super admins update admin profiles"
ON public.admin_profiles FOR UPDATE
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- Super admins can insert new admin profiles
DROP POLICY IF EXISTS "Super admins insert admin profiles" ON public.admin_profiles;
CREATE POLICY "Super admins insert admin profiles"
ON public.admin_profiles FOR INSERT
TO authenticated
WITH CHECK (public.is_super_admin());

-- Super admins can delete admin profiles
DROP POLICY IF EXISTS "Super admins delete admin profiles" ON public.admin_profiles;
CREATE POLICY "Super admins delete admin profiles"
ON public.admin_profiles FOR DELETE
TO authenticated
USING (public.is_super_admin());

-- 8. STORAGE BUCKET POLICIES (public-media)
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-media', 'public-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access to public-media bucket" ON storage.objects;
CREATE POLICY "Public Access to public-media bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'public-media');

DROP POLICY IF EXISTS "Admins can upload to public-media bucket" ON storage.objects;
CREATE POLICY "Admins can upload to public-media bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'public-media' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can update files in public-media bucket" ON storage.objects;
CREATE POLICY "Admins can update files in public-media bucket"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'public-media' AND public.is_admin())
WITH CHECK (bucket_id = 'public-media' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can delete files in public-media bucket" ON storage.objects;
CREATE POLICY "Admins can delete files in public-media bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'public-media' AND public.is_admin());

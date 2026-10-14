import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('9star_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET() {
  try {
    // 1. Try fetching live from Supabase cloud database
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'primary')
        .maybeSingle();

      if (!error && data && data.contact_email) {
        return NextResponse.json({
          settings: {
            contactEmail: data.contact_email,
            contactPhone: data.contact_phone || '',
            whatsappNumber: data.whatsapp_number || '',
            supportEmail: data.support_email || data.contact_email,
            businessHours: data.business_hours || {},
            officeAddress: data.office_address || {},
            socialLinks: data.social_links || {},
            globalSeo: data.global_seo || {},
          }
        });
      }
    } catch (_) {}

    // 2. Fallback to local storage
    const settings = db.settings.get();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await request.json();
    const updated = db.settings.update(updates);

    // 1. Sync to Supabase site_settings
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qzxzttmrbeftlgujrldk.supabase.co';
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const key = serviceKey || 
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
        'sb_publishable_DQ_bNbJ8tB8plWGrBbRngw_Y7HhXrwi';

      const supabaseClient = createClient(supabaseUrl, key);
      await supabaseClient
        .from('site_settings')
        .upsert({
          id: 'primary',
          contact_email: updates.contactEmail,
          contact_phone: updates.contactPhone || '',
          whatsapp_number: updates.whatsappNumber || '',
          support_email: updates.supportEmail || updates.contactEmail,
          business_hours: updates.businessHours,
          office_address: updates.officeAddress,
          social_links: updates.socialLinks,
          global_seo: updates.globalSeo,
          updated_at: new Date().toISOString()
        });
    } catch (sbErr) {
      console.warn('[Supabase Settings Sync Warning]:', sbErr);
    }

    // 2. Enterprise Audit Logging
    db.auditLogs.log({
      userId: user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'SETTINGS_CHANGE',
      entity: 'SITE_SETTINGS',
      details: 'Updated global site settings & company metadata'
    });

    // 3. Revalidate all public localized layouts and contact pages
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/[lang]', 'layout');
      revalidatePath('/[lang]/contact', 'page');
      revalidatePath('/en/contact');
      revalidatePath('/bn/contact');
      revalidatePath('/ar/contact');
    } catch (_) {}

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

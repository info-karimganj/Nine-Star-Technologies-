import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import {
  getSupabaseServiceByIdOrSlug,
  upsertSupabaseService,
  deleteSupabaseService
} from '@/lib/supabase-services';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('9star_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

// GET single service
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 1. Try Supabase
  try {
    const supabaseService = await getSupabaseServiceByIdOrSlug(id);
    if (supabaseService) {
      return NextResponse.json({ service: supabaseService });
    }
  } catch (_) {}

  // 2. Fallback
  const service = db.services.getById(id);
  if (!service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }
  return NextResponse.json({ service });
}

// PUT update service
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // 1. Local fallback update
    const updated = db.services.update(id, body);

    // 2. Supabase persistent update
    try {
      const existingSupabase = await getSupabaseServiceByIdOrSlug(id);
      const serviceToSave = {
        ...(existingSupabase || {}),
        ...(updated || {}),
        ...body,
        id,
        updatedAt: new Date().toISOString()
      };
      await upsertSupabaseService(serviceToSave);
    } catch (sbErr) {
      console.warn('[Supabase Service Update Warning]:', sbErr);
    }

    db.auditLogs.log({
      userId: user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'UPDATE',
      entity: 'SERVICE',
      entityId: id,
      details: `Updated service: ${body.title?.en || updated?.title?.en || id}`
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/[lang]/services', 'page');
      revalidatePath('/en/services', 'page');
      revalidatePath('/bn/services', 'page');
      revalidatePath('/ar/services', 'page');
      if (updated?.slug) {
        revalidatePath(`/[lang]/services/${updated.slug}`, 'page');
      }
      revalidatePath(`/[lang]/services/${id}`, 'page');
    } catch (_) {}

    return NextResponse.json({ success: true, service: updated || body });
  } catch (error) {
    console.error('Failed to update service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

// DELETE service
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    
    // 1. Local fallback delete
    const existing = db.services.getById(id);
    db.services.delete(id);

    // 2. Supabase persistent delete
    try {
      await deleteSupabaseService(id);
    } catch (sbErr) {
      console.warn('[Supabase Service Delete Warning]:', sbErr);
    }

    db.auditLogs.log({
      userId: user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'DELETE',
      entity: 'SERVICE',
      entityId: id,
      details: `Deleted service: ${existing?.title?.en || id}`
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/[lang]/services', 'page');
      revalidatePath('/en/services', 'page');
      revalidatePath('/bn/services', 'page');
      revalidatePath('/ar/services', 'page');
    } catch (_) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}

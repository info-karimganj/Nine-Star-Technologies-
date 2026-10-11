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

// GET single service
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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

    const updated = db.services.update(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    db.auditLogs.log({
      userId: user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'UPDATE',
      entity: 'SERVICE',
      entityId: id,
      details: `Updated service: ${updated.title.en}`
    });

    revalidatePath('/[lang]/services', 'page');
    revalidatePath(`/[lang]/services/${updated.slug}`, 'page');
    revalidatePath(`/[lang]/services/${id}`, 'page');

    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
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
    const existing = db.services.getById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    db.services.delete(id);

    db.auditLogs.log({
      userId: user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'DELETE',
      entity: 'SERVICE',
      entityId: id,
      details: `Deleted service: ${existing.title.en}`
    });

    revalidatePath('/[lang]/services', 'page');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}

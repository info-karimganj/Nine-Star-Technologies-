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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const faq = db.faqs.getById(id);
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json({ faq });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQ' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const updated = db.faqs.update(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'UPDATE',
      entity: 'faq',
      entityId: id,
      details: `Updated FAQ ${updated.question.en.substring(0, 40)}...`
    });

    try {
      revalidatePath('/[lang]/faq', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ faq: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    db.faqs.delete(id);

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'DELETE',
      entity: 'faq',
      entityId: id,
      details: `Deleted FAQ: ${id}`
    });

    try {
      revalidatePath('/[lang]/faq', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}

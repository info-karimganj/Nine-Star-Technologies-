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
    const caseStudy = db.caseStudies.getById(id);
    if (!caseStudy) {
      return NextResponse.json({ error: 'Case Study not found' }, { status: 404 });
    }
    return NextResponse.json({ caseStudy });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch case study' }, { status: 500 });
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
    const updated = db.caseStudies.update(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Case Study not found' }, { status: 404 });
    }

    db.auditLogs.log({
      userId: user.id || user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'UPDATE',
      entity: 'case_study',
      entityId: id,
      details: `Updated case study ${(updated as any).title?.en || id}`
    });

    try {
      revalidatePath('/[lang]/case-studies', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ caseStudy: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 });
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
    const item = db.caseStudies.getById(id);
    db.caseStudies.delete(id);

    db.auditLogs.log({
      userId: user.id || user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'DELETE',
      entity: 'case_study',
      entityId: id,
      details: `Deleted case study: ${(item as any)?.title?.en || id}`
    });

    try {
      revalidatePath('/[lang]/case-studies', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 });
  }
}

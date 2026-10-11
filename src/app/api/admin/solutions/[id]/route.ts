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
    const solution = db.solutions.getById(id);
    if (!solution) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }
    return NextResponse.json({ solution });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch solution' }, { status: 500 });
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
    const updated = db.solutions.update(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 });
    }

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'UPDATE',
      entity: 'solution',
      entityId: id,
      details: `Updated solution ${updated.title.en}`
    });

    try {
      revalidatePath('/[lang]/solutions', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ solution: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update solution' }, { status: 500 });
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
    const item = db.solutions.getById(id);
    db.solutions.delete(id);

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'DELETE',
      entity: 'solution',
      entityId: id,
      details: `Deleted solution: ${item?.title?.en || id}`
    });

    try {
      revalidatePath('/[lang]/solutions', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete solution' }, { status: 500 });
  }
}

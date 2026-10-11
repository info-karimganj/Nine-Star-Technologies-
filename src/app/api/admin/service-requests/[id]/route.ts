import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('9star_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const updates = await request.json();

    const updated = db.serviceRequests.update(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    db.auditLogs.log({
      userId: user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'UPDATE',
      entity: 'SERVICE_REQUEST',
      entityId: id,
      details: `Updated request ${updated.referenceNumber} status to ${updated.status}`
    });

    return NextResponse.json({ success: true, request: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}

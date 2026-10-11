import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('9star_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
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
    const item = db.media.getById(id);
    if (!item) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    try {
      const filePath = path.join(process.cwd(), 'public', item.url);
      await unlink(filePath);
    } catch (e) {
      // Ignore file missing on disk
    }

    db.media.delete(id);

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'DELETE',
      entity: 'media',
      entityId: id,
      details: `Deleted media file: ${item.filename}`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyToken, hashPassword, generateSalt } from '@/lib/auth';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('9star_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getAuthUser();
    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Super Admin required' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const updates: any = {};
    if (body.name) updates.name = body.name;
    if (body.role) updates.role = body.role;
    if (body.isActive !== undefined) updates.isActive = body.isActive;
    if (body.password) {
      const salt = generateSalt();
      updates.salt = salt;
      updates.passwordHash = hashPassword(body.password, salt);
    }

    const updated = db.users.update(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    db.auditLogs.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: 'UPDATE',
      entity: 'user',
      entityId: id,
      details: `Updated user profile/role for ${updated.email}`
    });

    const { passwordHash: _, salt: __, ...safeUser } = updated;
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getAuthUser();
    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Super Admin required' }, { status: 403 });
    }

    const { id } = await params;
    if (id === currentUser.id) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
    }

    const target = db.users.getById(id);
    db.users.delete(id);

    db.auditLogs.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: 'DELETE',
      entity: 'user',
      entityId: id,
      details: `Deleted user: ${target?.email || id}`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

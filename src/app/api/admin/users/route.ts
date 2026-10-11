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

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Super Admin required' }, { status: 403 });
    }

    const users = db.users.getAll().map(({ passwordHash, salt, ...safe }) => safe);
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getAuthUser();
    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized: Super Admin required' }, { status: 403 });
    }

    const body = await request.json();
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }

    const existing = db.users.getByEmail(body.email);
    if (existing) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const salt = generateSalt();
    const passwordHash = hashPassword(body.password, salt);

    const newUser = {
      id: `usr-${Date.now()}`,
      name: body.name,
      email: body.email.toLowerCase(),
      passwordHash,
      salt,
      role: body.role || 'CONTENT_MANAGER',
      isActive: true,
      createdAt: new Date().toISOString()
    };

    db.users.create(newUser as any);

    db.auditLogs.log({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      action: 'CREATE',
      entity: 'user',
      entityId: newUser.id,
      details: `Created user ${newUser.email} with role ${newUser.role}`
    });

    const { passwordHash: _, salt: __, ...safeUser } = newUser;
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

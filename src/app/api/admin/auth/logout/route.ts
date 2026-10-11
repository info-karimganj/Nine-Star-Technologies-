import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('9star_admin_token')?.value;

    if (token) {
      const session = verifyToken(token);
      if (session) {
        db.auditLogs.log({
          userId: session.userId,
          userName: session.name,
          userEmail: session.email,
          action: 'LOGOUT',
          entity: 'AUTH',
          details: 'User logged out of Admin Panel'
        });
      }
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete('9star_admin_token');
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

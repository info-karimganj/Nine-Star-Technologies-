import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = db.users.getByEmail(email);
    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Update last login
    db.users.update(user.id, { lastLoginAt: new Date().toISOString() });

    // Sign session token
    const token = signToken({
      userId: user.id,
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Record audit log
    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'LOGIN',
      entity: 'AUTH',
      details: 'User logged into Admin Panel'
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

    // Set secure HTTP-only cookie
    response.cookies.set('9star_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

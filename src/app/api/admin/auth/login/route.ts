import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // 1. First attempt: Authenticate via Supabase Auth
    try {
      const { getSupabaseServerClient } = await import('@/lib/supabase');
      const supabase = getSupabaseServerClient();
      const { data: sbAuthData, error: sbAuthErr } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (!sbAuthErr && sbAuthData?.user) {
        // Verify if user is an active administrator in public.admin_profiles
        const { data: profile } = await supabase
          .from('admin_profiles')
          .select('id, name, role, is_active')
          .eq('user_id', sbAuthData.user.id)
          .maybeSingle();

        if (profile && !profile.is_active) {
          return NextResponse.json({ error: 'This admin account has been deactivated.' }, { status: 403 });
        }

        const role = profile?.role || 'SUPER_ADMIN';
        const name = profile?.name || sbAuthData.user.user_metadata?.full_name || sbAuthData.user.email?.split('@')[0] || 'Administrator';

        const token = signToken({
          userId: sbAuthData.user.id,
          id: sbAuthData.user.id,
          email: sbAuthData.user.email || email,
          name,
          role,
        });

        const response = NextResponse.json({
          success: true,
          user: {
            id: sbAuthData.user.id,
            email: sbAuthData.user.email,
            name,
            role,
          }
        });

        response.cookies.set('9star_admin_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 86400 * 7,
        });

        return response;
      }
    } catch (sbErr) {
      console.warn('[Supabase Login Check] Fallback to local credential check:', sbErr);
    }

    // 2. Second attempt: Check local user store (backward compatibility)
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

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

async function getAuthUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('9star_admin_token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const services = db.services.getAll();
    const categories = db.categories.getAll();
    const posts = db.posts.getAll();
    const products = db.products.getAll();
    const solutions = db.solutions.getAll();
    const caseStudies = db.caseStudies.getAll();
    const requests = db.serviceRequests.getAll();
    const auditLogs = db.auditLogs.getAll();

    return NextResponse.json({
      metrics: {
        activeServices: services.filter(s => s.isActive).length,
        totalServices: services.length,
        categories: categories.length,
        publishedPosts: posts.filter(p => p.isPublished).length,
        draftPosts: posts.filter(p => !p.isPublished).length,
        products: products.length,
        solutions: solutions.length,
        caseStudies: caseStudies.length,
        pendingRequests: requests.filter(r => r.status === 'NEW' || r.status === 'UNDER_REVIEW').length,
        totalRequests: requests.length,
      },
      recentRequests: requests.slice(0, 5),
      recentLogs: auditLogs.slice(0, 8),
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard statistics' }, { status: 500 });
  }
}

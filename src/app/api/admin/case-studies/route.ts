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

export async function GET() {
  try {
    const caseStudies = db.caseStudies.getAll(true);
    return NextResponse.json({ caseStudies });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title?.en) {
      return NextResponse.json({ error: 'Case Study title is required' }, { status: 400 });
    }

    const slug = body.slug || body.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existing = db.caseStudies.getById(slug);
    if (existing) {
      return NextResponse.json({ error: 'Case Study with this slug already exists' }, { status: 400 });
    }

    const newCaseStudy = {
      id: body.id || `cs-${Date.now()}`,
      slug,
      title: body.title,
      clientName: body.clientName || 'Confidential Client',
      industry: body.industry || { en: 'Technology' },
      challenge: body.challenge || { en: '' },
      solution: body.solution || { en: '' },
      results: body.results || [],
      technologiesUsed: body.technologiesUsed || [],
      testimonial: body.testimonial,
      relatedServiceId: body.relatedServiceId,
      isPublished: body.isPublished ?? true,
      publishedAt: new Date().toISOString()
    };

    const saved = db.caseStudies.create(newCaseStudy as any);

    db.auditLogs.log({
      userId: user.id || user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'CREATE',
      entity: 'case_study',
      entityId: saved.id,
      details: `Created case study: ${(saved as any).title?.en || saved.slug}`
    });

    try {
      revalidatePath('/[lang]/case-studies', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ caseStudy: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 });
  }
}
